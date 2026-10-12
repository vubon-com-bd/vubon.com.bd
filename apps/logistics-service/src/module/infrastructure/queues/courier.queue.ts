import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';

export interface CourierJobPayload {
  readonly courierCode: string;
  readonly action: 'sync' | 'health-check';
  readonly fromDate?: string;
  readonly toDate?: string;
}

@Injectable()
export class CourierQueue {
  constructor(private readonly queue: QueueService) {}
  async enqueue(payload: CourierJobPayload): Promise<string> {
    return this.queue.enqueue(QUEUE_NAME.COURIER, `courier.${payload.action}`, payload);
  }
}
