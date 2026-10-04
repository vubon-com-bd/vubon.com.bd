/**
 * CartQueueService — enqueue cart expiry / cleanup jobs
 * @module cart-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueFactory } from './queue.factory.js';
import { CART_QUEUE, JOB_TYPES } from './queue.constants.js';

export const CART_QUEUE_SERVICE = Symbol('CART_QUEUE_SERVICE');

@Injectable()
export class CartQueueService {
  constructor(private readonly factory: QueueFactory) {}

  async enqueueExpiryCheck(cartId: string): Promise<string> {
    const job = await this.factory.get(CART_QUEUE).add(
      JOB_TYPES.CART_EXPIRY,
      { cartId },
      { attempts: 3, backoff: { type: 'exponential', delay: 2000 } },
    );
    return job.id ?? '';
  }

  async enqueueCleanup(batchSize = 100): Promise<string> {
    const job = await this.factory.get(CART_QUEUE).add(
      JOB_TYPES.CART_CLEANUP,
      { batchSize },
      { attempts: 2 },
    );
    return job.id ?? '';
  }
}
