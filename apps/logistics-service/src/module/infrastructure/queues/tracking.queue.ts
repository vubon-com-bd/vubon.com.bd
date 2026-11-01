import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from './queue.constants.js';

export interface SyncTrackingPayload {
  readonly trackingId: string;
  readonly courierCode?: string;
}

@Injectable()
export class TrackingQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueSync(payload: SyncTrackingPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.TRACKING_SYNC,
      LOGISTICS_JOB_NAME.SYNC_TRACKING,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `sync:${payload.trackingId}:${Date.now()}`,
      },
    );
  }

  async enqueueFetchEvents(trackingId: string): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.TRACKING_SYNC,
      LOGISTICS_JOB_NAME.FETCH_TRACKING_EVENTS,
      { trackingId },
      { priority: QUEUE_PRIORITY.HIGH, jobId: `fetch-events:${trackingId}:${Date.now()}` },
    );
  }
}
