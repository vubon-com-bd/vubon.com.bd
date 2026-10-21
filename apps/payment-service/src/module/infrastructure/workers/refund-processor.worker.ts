/**
 * RefundProcessorWorker — drives approved refunds through gateway refund
 * @module payment-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { PAYMENT_QUEUE_NAME, PAYMENT_JOB_NAME } from '../queues/queue.constants.js';
import type { ProcessRefundPayload } from '../queues/refund.queue.js';
import {
  REFUND_REPOSITORY,
  type RefundRepository,
} from '@domain/repositories/refund.repository.interface';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';

@Injectable()
export class RefundProcessorWorker extends BaseWorker<ProcessRefundPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.REFUND_PROCESSING;

  constructor(
    queueService: QueueService,
    @Inject(REFUND_REPOSITORY)
    private readonly repo: RefundRepository,
  ) {
    super(queueService, `${PAYMENT_JOB_NAME.PROCESS_REFUND}-worker`);
  }

  protected async handle(payload: ProcessRefundPayload): Promise<unknown> {
    const vo = RefundIdVO.create(payload.refundId);
    const refund = await this.repo.findByIdVO(vo);
    if (!refund) return { skipped: true };
    if (!refund.status.isApproved()) {
      return { skipped: true, reason: `status=${refund.status.value}` };
    }
    refund.startProcessing();
    await this.repo.save(refund);
    this.logger.log(`Refund ${refund.id} → processing`);
    return { processed: true };
  }
}
