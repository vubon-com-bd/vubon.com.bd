/**
 * PayoutQueue — enqueue helpers for payout processing
 * @module vendor-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  VENDOR_QUEUE_NAME,
  VENDOR_JOB_NAME,
  VENDOR_QUEUE_LIMITS,
} from './queue.constants.js';

export interface ProcessPayoutPayload {
  readonly payoutId: string;
  readonly vendorId: string;
}

export interface RetryPayoutPayload {
  readonly payoutId: string;
  readonly attempt: number;
}

@Injectable()
export class PayoutQueue {
  private readonly logger = new Logger(PayoutQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(
    payload: ProcessPayoutPayload,
    delayMs?: number,
  ): Promise<string> {
    const id = await this.queueService.enqueue(
      VENDOR_QUEUE_NAME.PAYOUT_PROCESSING,
      VENDOR_JOB_NAME.PROCESS_PAYOUT,
      payload,
      {
        priority: QUEUE_PRIORITY.CRITICAL,
        delayMs,
        jobId: `process:${payload.payoutId}`,
      },
    );
    this.logger.log(`Enqueued payout processing for ${payload.payoutId}`);
    return id;
  }

  async enqueueRetry(
    payload: RetryPayoutPayload,
    delayMs: number = VENDOR_QUEUE_LIMITS.RETRY_DELAY_MS,
  ): Promise<string> {
    return this.queueService.enqueue(
      VENDOR_QUEUE_NAME.PAYOUT_PROCESSING,
      VENDOR_JOB_NAME.RETRY_PAYOUT,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `retry:${payload.payoutId}:${payload.attempt}`,
      },
    );
  }
}
