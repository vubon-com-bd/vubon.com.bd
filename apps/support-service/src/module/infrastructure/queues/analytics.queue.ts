import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface TrackEventJobPayload {
  readonly eventType: string;
  readonly entityId: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class AnalyticsQueue {
  readonly queueName = QUEUE_NAME.ANALYTICS;

  constructor(private readonly queueService: QueueService) {}

  async enqueueTrack(payload: TrackEventJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'track-event', payload, {
      priority: QUEUE_PRIORITY.BACKGROUND,
    });
  }
}
