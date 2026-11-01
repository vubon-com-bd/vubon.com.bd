/**
 * AnalyticsQueue
 * @module order-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from './queue.constants.js';

export interface AnalyticsPayload {
  readonly orderId: string;
  readonly event: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AnalyticsQueue {
  private readonly logger = new Logger(AnalyticsQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: AnalyticsPayload): Promise<string> {
    return this.queueService.enqueue(
      ORDER_QUEUE_NAME.ANALYTICS,
      ORDER_JOB_NAME.UPDATE_ANALYTICS,
      payload,
      {
        priority: QUEUE_PRIORITY.BACKGROUND,
        jobId: `analytics:${payload.event}:${payload.orderId}:${Date.now()}`,
      },
    );
  }
}
