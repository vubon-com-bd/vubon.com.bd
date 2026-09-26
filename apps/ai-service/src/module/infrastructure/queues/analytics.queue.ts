import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const ANALYTICS_QUEUE_NAME = 'ai-analytics';

export interface AnalyticsJobPayload {
  readonly eventType: string;
  readonly userId: string;
  readonly modelId?: string;
}

@Injectable()
export class AnalyticsQueue {
  readonly name = ANALYTICS_QUEUE_NAME;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: AnalyticsJobPayload): Promise<string> {
    return this.queueService.enqueue(this.name, 'track', payload, {
      priority: QUEUE_PRIORITY.BACKGROUND,
    });
  }
}
