/**
 * CartQueue — enqueue lifecycle jobs
 * @module cart-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { CART_QUEUE_NAME, CART_JOB_NAME } from './queue.constants.js';

export interface ExpireCartPayload {
  readonly cartId: string;
}

export interface CleanupStalePayload {
  readonly inactiveMinutes: number;
}

@Injectable()
export class CartQueue {
  private readonly logger = new Logger(CartQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueExpiry(payload: ExpireCartPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      CART_QUEUE_NAME.CART_LIFECYCLE,
      CART_JOB_NAME.EXPIRE_CART,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `expire:${payload.cartId}`,
      },
    );
  }

  async enqueueCleanup(payload: CleanupStalePayload, delayMs: number = 0): Promise<string> {
    return this.queueService.enqueue(
      CART_QUEUE_NAME.CART_LIFECYCLE,
      CART_JOB_NAME.CLEANUP_STALE,
      payload,
      {
        priority: QUEUE_PRIORITY.LOW,
        delayMs,
        jobId: `cleanup:${Date.now()}`,
      },
    );
  }
}
