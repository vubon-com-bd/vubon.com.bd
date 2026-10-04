/**
 * PaymentExpiryWorker — expires pending payments whose session TTL is past,
 * and releases stale authorizations past the capture window.
 * @module payment-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PAYMENT_QUEUE_NAME,
  PAYMENT_JOB_NAME,
} from '../queues/queue.constants.js';
import type { ExpirePaymentPayload } from '../queues/payment.queue.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '../../domain/repositories/payment.repository.interface.js';
import { PaymentIdVO } from '../../domain/value-objects/primitives/payment-id.vo.js';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';

@Injectable()
export class PaymentExpiryWorker extends BaseWorker<ExpirePaymentPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING;
  protected readonly jobNames = [PAYMENT_JOB_NAME.EXPIRE_PAYMENT] as const;

  constructor(
    queueService: QueueService,
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepo: PaymentRepository,
  ) {
    super(queueService, 'PaymentExpiryWorker');
  }

  protected async handle(payload: ExpirePaymentPayload): Promise<unknown> {
    const { paymentId } = payload;
    const vo = PaymentIdVO.create(paymentId);
    const payment = await this.paymentRepo.findByIdVO(vo);
    if (!payment) return { skipped: true };

    // Expire only if it's still not settled and past capture window
    if (payment.status.isSettled() || payment.status.isFinal()) {
      return { skipped: true, reason: 'already_settled' };
    }
    if (payment.isAuthorized() && payment.isCaptureWindowOpen()) {
      this.logger.log(`Payment ${paymentId} still in capture window — skipping expiry`);
      return { skipped: true, reason: 'capture_window_open' };
    }

    const now = new Date().toISOString();
    try {
      if (payment.canBeCancelled()) {
        payment.expire(now);
        await this.paymentRepo.save(payment);
        this.logger.log(`Payment ${paymentId} expired`);
        return { expired: true };
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Expire failed for ${paymentId}: ${msg}`);
    }
    return { skipped: true };
  }

  protected concurrency(): number {
    return 2;
  }
}
