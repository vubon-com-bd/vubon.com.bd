/**
 * SettlementQueue — enqueue helpers for settlement processing
 * @module vendor-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { VENDOR_QUEUE_NAME, VENDOR_JOB_NAME } from './queue.constants.js';

export interface ProcessSettlementPayload {
  readonly settlementId: string;
  readonly vendorId: string;
}

@Injectable()
export class SettlementQueue {
  private readonly logger = new Logger(SettlementQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(
    payload: ProcessSettlementPayload,
    delayMs?: number,
  ): Promise<string> {
    const id = await this.queueService.enqueue(
      VENDOR_QUEUE_NAME.SETTLEMENT_PROCESSING,
      VENDOR_JOB_NAME.PROCESS_SETTLEMENT,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `settlement:${payload.settlementId}`,
      },
    );
    this.logger.log(`Enqueued settlement processing for ${payload.settlementId}`);
    return id;
  }
}
