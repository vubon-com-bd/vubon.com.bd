import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from './queue.constants.js';

export interface SyncCourierPayload {
  readonly courierId: string;
  readonly courierCode: string;
}

@Injectable()
export class CourierQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueSync(payload: SyncCourierPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      LOGISTICS_QUEUE_NAME.COURIER_SYNC,
      LOGISTICS_JOB_NAME.SYNC_COURIER_STATUS,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `courier-sync:${payload.courierId}:${Date.now()}`,
      },
    );
  }
}
