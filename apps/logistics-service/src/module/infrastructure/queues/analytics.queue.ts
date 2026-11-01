import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from './queue.constants.js';

export interface AggregateAnalyticsPayload {
  readonly metric: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

@Injectable()
export class AnalyticsQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueAggregate(payload: AggregateAnalyticsPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.ANALYTICS,
      LOGISTICS_JOB_NAME.AGGREGATE_ANALYTICS,
      payload,
      {
        priority: QUEUE_PRIORITY.LOW,
        delayMs,
        jobId: `analytics:${payload.metric}:${Date.now()}`,
      },
    );
  }

  async enqueueCleanup(delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.ANALYTICS,
      LOGISTICS_JOB_NAME.CLEANUP_STALE,
      {},
      { priority: QUEUE_PRIORITY.BACKGROUND, delayMs, jobId: `cleanup:${Date.now()}` },
    );
  }
}
