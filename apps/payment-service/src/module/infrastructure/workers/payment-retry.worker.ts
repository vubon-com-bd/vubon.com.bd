/**
 * PaymentRetryWorker — retries failed payments up to max attempts
 * @module payment-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PAYMENT_QUEUE_NAME,
  PAYMENT_JOB_NAME,
  PAYMENT_QUEUE_LIMITS,
} from '../queues/queue.constants.js';
import type { RetryPaymentPayload } from '../queues/payment.queue.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

@Injectable()
export class PaymentRetryWorker extends BaseWorker<RetryPaymentPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING;

  constructor(
    queueService: QueueService,
    @Inject(PAYMENT_REPOSITORY)
    private readonly repo: PaymentRepository,
  ) {
    super(queueService, `${PAYMENT_JOB_NAME.RETRY_PAYMENT}-worker`);
  }

  protected async handle(payload: RetryPaymentPayload): Promise<unknown> {
    if (payload.attempt > PAYMENT_QUEUE_LIMITS.MAX_ATTEMPTS) {
      this.logger.warn(`Payment ${payload.paymentId} retry limit reached`);
      return { skipped: true, reason: 'max_attempts' };
    }

    const vo = PaymentIdVO.create(payload.paymentId);
    const payment = await this.repo.findByIdVO(vo);
    if (!payment) return { skipped: true };
    if (!payment.isRetryable()) {
      return { skipped: true, reason: `status=${payment.status.value}` };
    }

    // Domain method: failed → pending (respects state machine)
    payment.retry(`retry-attempt-${payload.attempt}`);
    await this.repo.save(payment);

    this.logger.log(`Payment ${payment.id} retry attempt ${payload.attempt}`);
    return { processed: true, attempt: payload.attempt };
  }
}
