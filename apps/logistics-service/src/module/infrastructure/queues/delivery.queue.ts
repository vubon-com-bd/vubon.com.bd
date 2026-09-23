import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface DeliveryJobPayload {
  readonly deliveryId: string;
  readonly action: string;
}

@Injectable()
export class DeliveryQueue {
  readonly queueName = QUEUE_NAME.DELIVERY;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: DeliveryJobPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'delivery-job', payload, {
      priority: QUEUE_PRIORITY.HIGH,
      delayMs,
    });
  }
}
