import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export interface AnalyticsJobPayload {
  readonly metric: string;
  readonly value: number;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AnalyticsQueue {
  constructor(private readonly queue: QueueService) {}
  async enqueue(payload: AnalyticsJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE_NAME.ANALYTICS, 'analytics.record', payload);
  }
}
