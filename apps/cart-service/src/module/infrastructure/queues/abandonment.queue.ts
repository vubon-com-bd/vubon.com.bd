/**
 * AbandonmentQueue
 * @module cart-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { CART_QUEUE_NAME, CART_JOB_NAME } from './queue.constants.js';

export interface AbandonCartPayload {
  readonly cartId: string;
}

@Injectable()
export class AbandonmentQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueAbandon(payload: AbandonCartPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      CART_QUEUE_NAME.CART_ABANDONMENT,
      CART_JOB_NAME.ABANDON_CART,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `abandon:${payload.cartId}`,
      },
    );
  }
}
