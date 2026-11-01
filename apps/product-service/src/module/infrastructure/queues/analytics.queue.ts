/**
 * AnalyticsQueue — enqueue helpers for product analytics events
 * @module product-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  PRODUCT_QUEUE_NAME,
  PRODUCT_JOB_NAME,
} from './queue.constants.js';

export interface RecordAnalyticsPayload {
  readonly aggregateId: string;
  readonly eventName: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AnalyticsQueue {
  private readonly logger = new Logger(AnalyticsQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: RecordAnalyticsPayload): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.ANALYTICS,
      PRODUCT_JOB_NAME.RECORD_ANALYTICS,
      payload,
      {
        priority: QUEUE_PRIORITY.LOW,
        jobId: `analytics:${payload.aggregateId}:${payload.eventName}:${Date.now()}`,
      },
    );
  }
}
