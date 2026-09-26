import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface CourierJobPayload {
  readonly courierId: string;
  readonly action: string;
}

@Injectable()
export class CourierQueue {
  readonly queueName = QUEUE_NAME.COURIER;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: CourierJobPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'courier-job', payload, {
      priority: QUEUE_PRIORITY.LOW,
      delayMs,
    });
  }
}
