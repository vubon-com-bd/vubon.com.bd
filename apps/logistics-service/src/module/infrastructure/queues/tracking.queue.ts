import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export interface TrackingJobPayload {
  readonly trackingId: string;
  readonly action: 'sync' | 'notify';
}

@Injectable()
export class TrackingQueue {
  constructor(private readonly queue: QueueService) {}
  async enqueue(payload: TrackingJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE_NAME.TRACKING, `tracking.${payload.action}`, payload);
  }
}
