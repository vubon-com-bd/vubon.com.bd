import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export interface FulfillmentJobPayload {
  readonly fulfillmentId: string;
  readonly action: 'process' | 'timeout-check';
}

@Injectable()
export class FulfillmentQueue {
  constructor(private readonly queue: QueueService) {}
  async enqueue(payload: FulfillmentJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE_NAME.FULFILLMENT, `fulfillment.${payload.action}`, payload);
  }
}
