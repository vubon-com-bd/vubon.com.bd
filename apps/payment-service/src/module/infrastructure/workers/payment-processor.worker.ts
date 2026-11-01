/**
 * PaymentProcessorWorker — moves payments from pending → processing
 * @module payment-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PAYMENT_QUEUE_NAME,
  PAYMENT_JOB_NAME,
} from '../queues/queue.constants.js';
import type { ProcessPaymentPayload } from '../queues/payment.queue.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

@Injectable()
export class PaymentProcessorWorker extends BaseWorker<ProcessPaymentPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.PAYMENT_PROCESSING;

  constructor(
    queueService: QueueService,
    @Inject(PAYMENT_REPOSITORY)
    private readonly repo: PaymentRepository,
  ) {
    super(queueService, `${PAYMENT_JOB_NAME.PROCESS_PAYMENT}-worker`);
  }

  protected async handle(payload: ProcessPaymentPayload): Promise<unknown> {
    const vo = PaymentIdVO.create(payload.paymentId);
    const payment = await this.repo.findByIdVO(vo);
    if (!payment) {
      this.logger.warn(`Payment ${payload.paymentId} not found`);
      return { skipped: true };
    }
    if (!payment.isPending()) {
      return { skipped: true, reason: `status=${payment.status.value}` };
    }
    payment.startProcessing();
    await this.repo.save(payment);
    this.logger.log(`Payment ${payment.id} → processing`);
    return { processed: true };
  }
}
