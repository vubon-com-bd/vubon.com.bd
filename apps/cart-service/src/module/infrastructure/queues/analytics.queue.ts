/**
 * AnalyticsQueue
 * @module cart-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { CART_QUEUE_NAME, CART_JOB_NAME } from './queue.constants.js';

export interface ProcessAnalyticsPayload {
  readonly eventName: string;
  readonly aggregateId: string;
  readonly data: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AnalyticsQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueEvent(payload: ProcessAnalyticsPayload): Promise<string> {
    return this.queueService.enqueue(
      CART_QUEUE_NAME.CART_ANALYTICS,
      CART_JOB_NAME.PROCESS_ANALYTICS,
      payload,
      {
        priority: QUEUE_PRIORITY.LOW,
        jobId: `analytics:${payload.eventName}:${Date.now()}`,
      },
    );
  }
}
