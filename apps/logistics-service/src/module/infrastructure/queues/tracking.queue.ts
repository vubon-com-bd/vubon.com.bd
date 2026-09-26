import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface TrackingJobPayload {
  readonly trackingId: string;
  readonly action: string;
}

@Injectable()
export class TrackingQueue {
  readonly queueName = QUEUE_NAME.TRACKING;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: TrackingJobPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'tracking-job', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
      delayMs,
    });
  }
}
