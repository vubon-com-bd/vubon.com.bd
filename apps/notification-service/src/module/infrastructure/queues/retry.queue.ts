import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';

export const RETRY_QUEUE = 'retry';

export interface RetryJobPayload {
  readonly deliveryId: string;
  readonly attempt: number;
}

@Injectable()
export class RetryQueue {
  readonly queueName = RETRY_QUEUE;

  constructor(private readonly queueService: QueueService) {}

  async enqueue(payload: RetryJobPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'retry', payload, {
      delayMs,
    });
  }
}
