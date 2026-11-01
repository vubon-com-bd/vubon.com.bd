/**
 * PaymentExpiryWorker — expires stale pending/authorized payments
 * @module payment-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { PAYMENT_QUEUE_NAME, PAYMENT_JOB_NAME } from '../queues/queue.constants.js';
import type { ProcessPaymentPayload } from '../queues/payment.queue.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

@Injectable()
export class PaymentExpiryWorker extends BaseWorker<ProcessPaymentPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING;

  constructor(
    queueService: QueueService,
    @Inject(PAYMENT_REPOSITORY)
    private readonly repo: PaymentRepository,
  ) {
    super(queueService, `${PAYMENT_JOB_NAME.EXPIRE_PAYMENT}-worker`);
  }

  protected async handle(payload: ProcessPaymentPayload): Promise<unknown> {
    const vo = PaymentIdVO.create(payload.paymentId);
    const payment = await this.repo.findByIdVO(vo);
    if (!payment) return { skipped: true };
    if (payment.isFinal()) return { skipped: true, reason: 'already_final' };

    payment.fail('expired', 'PAYMENT_EXPIRED');
    await this.repo.save(payment);
    this.logger.log(`Payment ${payment.id} expired`);
    return { expired: true };
  }
}
