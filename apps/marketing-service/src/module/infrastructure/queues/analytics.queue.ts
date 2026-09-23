import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export interface AnalyticsJobPayload {
  readonly eventType: string;
  readonly entityId: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AnalyticsQueue {
  readonly queueName = 'marketing-analytics';

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: AnalyticsJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, payload.eventType, payload);
  }
}
