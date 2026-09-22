import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface DeliveryTrackJobPayload {
  readonly deliveryId: string;
}

@Injectable()
export class DeliveryQueue {
  readonly queueName = QUEUE_NAME.SYNC;

  constructor(private readonly queueService: QueueService) {}

  async enqueueTrack(payload: DeliveryTrackJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'track-delivery', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
    });
  }
}
