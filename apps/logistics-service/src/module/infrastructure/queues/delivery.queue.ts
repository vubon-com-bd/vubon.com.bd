import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export interface DeliveryJobPayload {
  readonly deliveryId: string;
  readonly action: 'schedule' | 'remind' | 'escalate';
  readonly delayMs?: number;
}

@Injectable()
export class DeliveryQueue {
  constructor(private readonly queue: QueueService) {}
  async enqueue(payload: DeliveryJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE_NAME.DELIVERY, `delivery.${payload.action}`, payload, {
      delayMs: payload.delayMs,
    });
  }
}
