import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

@Injectable()
export class AnalyticsQueue {
  readonly queueName = QUEUE_NAME.ANALYTICS;

  constructor(private readonly queueService: QueueService) {}

  async enqueueTrack(eventType: string, payload: Record<string, unknown>): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'track', { eventType, payload }, {
      priority: QUEUE_PRIORITY.BACKGROUND,
    });
  }
}
