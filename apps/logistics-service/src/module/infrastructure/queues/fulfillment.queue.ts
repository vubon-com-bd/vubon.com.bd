import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface FulfillmentJobPayload {
  readonly fulfillmentId: string;
  readonly action: string;
}

@Injectable()
export class FulfillmentQueue {
  readonly queueName = QUEUE_NAME.FULFILLMENT;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: FulfillmentJobPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'fulfillment-job', payload, {
      priority: QUEUE_PRIORITY.HIGH,
      delayMs,
    });
  }
}
