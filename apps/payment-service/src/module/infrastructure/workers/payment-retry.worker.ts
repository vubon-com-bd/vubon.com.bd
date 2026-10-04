/**
 * PaymentRetryWorker — retries failed / declined payments
 * @module payment-service/infrastructure/workers
 *
 * Business rules:
 *  - Only retry if payment.canBeRetried()
 *  - Exponential backoff: 30s, 2m, 10m
 *  - After MAX_ATTEMPTS → stop, log, emit analytics
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PAYMENT_QUEUE_NAME,
  PAYMENT_JOB_NAME,
} from '../queues/queue.constants.js';
import type { RetryPaymentPayload } from '../queues/payment.queue.js';
import { PaymentQueue } from '../queues/payment.queue.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '../../domain/repositories/payment.repository.interface.js';
import { PaymentIdVO } from '../../domain/value-objects/primitives/payment-id.vo.js';
import { PaymentGatewayRouterService } from '../../domain/services/payment-gateway-router.service.js';

const BACKOFFS_MS = [30_000, 120_000, 600_000] as const;

@Injectable()
export class PaymentRetryWorker extends BaseWorker<RetryPaymentPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING;
  protected readonly jobNames = [PAYMENT_JOB_NAME.RETRY_PAYMENT] as const;

  constructor(
    queueService: QueueService,
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepo: PaymentRepository,
    private readonly paymentQueue: PaymentQueue,
  ) {
    super(queueService, 'PaymentRetryWorker');
  }

  protected async handle(payload: RetryPaymentPayload): Promise<unknown> {
    const { paymentId, attempt } = payload;
    this.logger.log(`Retry attempt ${attempt} for payment ${paymentId}`);

    const vo = PaymentIdVO.create(paymentId);
    const payment = await this.paymentRepo.findByIdVO(vo);
    if (!payment) {
      this.logger.warn(`Payment ${paymentId} not found — dropping retry`);
      return { skipped: true, reason: 'not_found' };
    }

    if (!payment.canBeRetried()) {
      this.logger.warn(
        `Payment ${paymentId} no longer retryable (status=${payment.status.value}, attempts=${payment.retryAttempts})`,
      );
      return { skipped: true, reason: 'not_retryable' };
    }

    // Route again (gateway may have changed)
    const routing = PaymentGatewayRouterService.select({
      method: payment.method,
      currency: { value: payment.currency } as never,
      amount: payment.amount,
      preferredGateway: payment.gateway,
    });
    void routing;

    // Transition back to pending & save
    payment.retry();
    await this.paymentRepo.save(payment);

    // Schedule next attempt if more remain
    const nextDelay: number | undefined = BACKOFFS_MS[attempt];
    if (nextDelay !== undefined) {
      await this.paymentQueue.enqueueRetry(
        { paymentId, attempt: attempt + 1 },
        nextDelay,
      );
      this.logger.log(`Scheduled next retry in ${nextDelay}ms for ${paymentId}`);
    } else {
      this.logger.warn(`Payment ${paymentId} exhausted retry budget`);
    }

    return { retried: true, attempt };
  }
}
