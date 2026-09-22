import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface CheckoutCleanupJobPayload {
  readonly olderThanMs: number;
}

@Injectable()
export class CheckoutQueue {
  readonly queueName = QUEUE_NAME.CLEANUP;

  constructor(private readonly queueService: QueueService) {}

  async enqueueCleanup(payload: CheckoutCleanupJobPayload): Promise<string> {
    return this.queueService.enqueue(this.queueName, 'checkout-cleanup', payload, {
      priority: QUEUE_PRIORITY.LOW,
    });
  }
}
