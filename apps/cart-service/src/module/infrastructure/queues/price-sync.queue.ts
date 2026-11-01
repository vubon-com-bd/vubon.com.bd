/**
 * PriceSyncQueue
 * @module cart-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { CART_QUEUE_NAME, CART_JOB_NAME } from './queue.constants.js';

export interface SyncPricePayload {
  readonly cartId: string;
  readonly productIds: readonly string[];
}

@Injectable()
export class PriceSyncQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueSync(payload: SyncPricePayload): Promise<string> {
    return this.queueService.enqueue(
      CART_QUEUE_NAME.CART_PRICE_SYNC,
      CART_JOB_NAME.SYNC_PRICE,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `price-sync:${payload.cartId}`,
      },
    );
  }
}
