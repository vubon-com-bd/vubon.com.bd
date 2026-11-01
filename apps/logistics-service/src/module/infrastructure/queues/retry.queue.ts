import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME, LOGISTICS_QUEUE_LIMITS } from './queue.constants.js';

export interface RetryOperationPayload {
  readonly operation: string;
  readonly aggregateId: string;
  readonly attempt: number;
  readonly context?: Record<string, unknown>;
}

@Injectable()
export class RetryQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: RetryOperationPayload, delayMs: number = LOGISTICS_QUEUE_LIMITS.RETRY_DELAY_MS): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.RETRY,
      LOGISTICS_JOB_NAME.RETRY_OPERATION,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `retry:${payload.operation}:${payload.aggregateId}:${payload.attempt}`,
      },
    );
  }
}
