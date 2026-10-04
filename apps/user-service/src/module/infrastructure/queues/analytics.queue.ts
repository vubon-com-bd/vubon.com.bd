/**
 * Analytics Queue
 */
import { Injectable } from '@nestjs/common';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface AnalyticsJobPayload {
  readonly userId: string;
  readonly eventName: string;
  readonly metadata: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AnalyticsQueue {
  static readonly name = QUEUE_NAME.ANALYTICS;

  constructor(private readonly queues: QueueService) {}

  async enqueue(payload: AnalyticsJobPayload): Promise<void> {
    await this.queues.enqueue(
      AnalyticsQueue.name,
      'analytics.process',
      {
        userId: payload.userId,
        eventName: payload.eventName,
        metadata: payload.metadata as Record<string, unknown>,
      },
      {
        priority: QUEUE_PRIORITY.BACKGROUND,
      }
    );
  }
}
