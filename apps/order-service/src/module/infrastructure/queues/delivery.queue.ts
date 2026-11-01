/**
 * DeliveryQueue
 * @module order-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from './queue.constants.js';

export interface ScheduleDeliveryPayload {
  readonly orderId: string;
  readonly deliveryId: string;
}

export interface TrackDeliveryPayload {
  readonly trackingNumber: string;
  readonly orderId: string;
}

@Injectable()
export class DeliveryQueue {
  private readonly logger = new Logger(DeliveryQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueSchedule(
    payload: ScheduleDeliveryPayload,
    delayMs?: number,
  ): Promise<string> {
    return this.queueService.enqueue(
      ORDER_QUEUE_NAME.DELIVERY,
      ORDER_JOB_NAME.SCHEDULE_DELIVERY,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `schedule-delivery:${payload.deliveryId}`,
      },
    );
  }

  async enqueueTrack(
    payload: TrackDeliveryPayload,
    delayMs?: number,
  ): Promise<string> {
    return this.queueService.enqueue(
      ORDER_QUEUE_NAME.TRACKING,
      ORDER_JOB_NAME.TRACK_DELIVERY,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `track:${payload.trackingNumber}:${Date.now()}`,
      },
    );
  }
}
