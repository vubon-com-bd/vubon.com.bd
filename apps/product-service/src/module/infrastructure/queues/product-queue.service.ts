/**
 * ProductQueueService — enqueue product-related jobs.
 * @module product-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueFactory } from './queue.factory.js';
import { PRODUCT_QUEUE, JOB_TYPES } from './queue.constants.js';

export const PRODUCT_QUEUE_SERVICE = Symbol('PRODUCT_QUEUE_SERVICE');

@Injectable()
export class ProductQueueService {
  constructor(private readonly factory: QueueFactory) {}

  async scheduleReindex(productId: string): Promise<void> {
    await this.factory.enqueue(
      PRODUCT_QUEUE,
      JOB_TYPES.PRODUCT_INDEX_ONE,
      { productId },
      `product-index-${productId}`,
    );
  }

  async scheduleRemoval(productId: string): Promise<void> {
    await this.factory.enqueue(
      PRODUCT_QUEUE,
      JOB_TYPES.PRODUCT_REMOVE_INDEX,
      { productId },
      `product-remove-${productId}`,
    );
  }

  async scheduleFullReindex(): Promise<void> {
    await this.factory.enqueue(PRODUCT_QUEUE, JOB_TYPES.PRODUCT_REINDEX, {});
  }
}
