import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface ShipmentJobPayload {
  readonly shipmentId: string;
  readonly action: string;
}

@Injectable()
export class ShipmentQueue {
  readonly queueName = QUEUE_NAME.SHIPPING;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: ShipmentJobPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'shipment-job', payload, {
      priority: QUEUE_PRIORITY.NORMAL,
      delayMs,
    });
  }
}
