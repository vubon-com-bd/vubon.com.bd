import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface AnalyticsJobPayload {
  readonly eventType: string;
  readonly entityId: string;
}

@Injectable()
export class AnalyticsQueue {
  readonly queueName = QUEUE_NAME.ANALYTICS;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: AnalyticsJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'analytics-job', payload, {
      priority: QUEUE_PRIORITY.BACKGROUND,
    });
  }
}
