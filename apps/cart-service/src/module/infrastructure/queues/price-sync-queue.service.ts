/**
 * PriceSyncQueueService
 * @module cart-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueFactory } from './queue.factory.js';
import { PRICE_SYNC_QUEUE, JOB_TYPES } from './queue.constants.js';

export const PRICE_SYNC_QUEUE_SERVICE = Symbol('PRICE_SYNC_QUEUE_SERVICE');

@Injectable()
export class PriceSyncQueueService {
  constructor(private readonly factory: QueueFactory) {}

  async enqueuePriceSync(cartId: string): Promise<string> {
    const job = await this.factory.get(PRICE_SYNC_QUEUE).add(
      JOB_TYPES.PRICE_SYNC_ONE,
      { cartId },
      { attempts: 3 },
    );
    return job.id ?? '';
  }

  async enqueueBulkPriceSync(): Promise<string> {
    const job = await this.factory.get(PRICE_SYNC_QUEUE).add(
      JOB_TYPES.PRICE_SYNC_BULK,
      {},
      { attempts: 2 },
    );
    return job.id ?? '';
  }

  async enqueueStockSync(cartId: string): Promise<string> {
    const job = await this.factory.get(PRICE_SYNC_QUEUE).add(
      JOB_TYPES.STOCK_SYNC,
      { cartId },
      { attempts: 3 },
    );
    return job.id ?? '';
  }
}
