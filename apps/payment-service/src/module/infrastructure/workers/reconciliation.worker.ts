/**
 * ReconciliationWorker — daily reconciliation sweep (no-op placeholder)
 * @module payment-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { PAYMENT_QUEUE_NAME } from '../queues/queue.constants.js';

export interface ReconciliationPayload {
  readonly fromDate: string;
  readonly toDate: string;
}

@Injectable()
export class ReconciliationWorker extends BaseWorker<ReconciliationPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.ANALYTICS;

  constructor(queueService: QueueService) {
    super(queueService, 'reconciliation-worker');
  }

  protected async handle(payload: ReconciliationPayload): Promise<unknown> {
    this.logger.log(
      `Reconciliation sweep: ${payload.fromDate} → ${payload.toDate}`,
    );
    return { reconciled: true };
  }
}
