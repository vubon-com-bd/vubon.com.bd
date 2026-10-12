import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export interface ShipmentJobPayload {
  readonly shipmentId: string;
  readonly action: 'process' | 'notify' | 'sync';
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class ShipmentQueue {
  constructor(private readonly queue: QueueService) {}
  async enqueue(payload: ShipmentJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE_NAME.SHIPPING, `shipment.${payload.action}`, payload);
  }
}
