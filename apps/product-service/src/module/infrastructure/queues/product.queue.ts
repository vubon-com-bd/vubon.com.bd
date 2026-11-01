/**
 * ProductQueue — enqueue helpers for product lifecycle jobs
 * @module product-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  PRODUCT_QUEUE_NAME,
  PRODUCT_JOB_NAME,
  PRODUCT_QUEUE_LIMITS,
} from './queue.constants.js';

export interface ProcessProductPayload {
  readonly productId: string;
}

export interface RetryProductPayload {
  readonly productId: string;
  readonly attempt: number;
}

export interface CleanupStalePayload {
  readonly olderThanHours: number;
}

@Injectable()
export class ProductQueue {
  private readonly logger = new Logger(ProductQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessProductPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.PRODUCT_PROCESSING,
      PRODUCT_JOB_NAME.PROCESS_PRODUCT,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `process:${payload.productId}`,
      },
    );
  }

  async enqueueRetry(
    payload: RetryProductPayload,
    delayMs: number = PRODUCT_QUEUE_LIMITS.RETRY_DELAY_MS,
  ): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.PRODUCT_PROCESSING,
      PRODUCT_JOB_NAME.PROCESS_PRODUCT,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `retry:${payload.productId}:${payload.attempt}`,
      },
    );
  }

  async enqueueCleanup(payload: CleanupStalePayload): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.PRODUCT_PROCESSING,
      PRODUCT_JOB_NAME.CLEANUP_STALE,
      payload,
      { priority: QUEUE_PRIORITY.LOW, jobId: `cleanup:${Date.now()}` },
    );
  }
}
