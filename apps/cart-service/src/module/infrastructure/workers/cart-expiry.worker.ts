/**
 * CartExpiryWorker — expires old carts
 * @module cart-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { CART_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';
import { CartRedisRepository } from '../persistence/redis/repositories/cart.redis.repository.js';

@Injectable()
export class CartExpiryWorker extends BaseWorker {
  constructor(private readonly cartRepo: CartRedisRepository) {
    super(CART_QUEUE, CartExpiryWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    if (job.name !== JOB_TYPES.CART_EXPIRY) return;
    const cartId = String(job.data.cartId ?? '');
    if (!cartId) return;
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) return;
    if (!cart.isExpired()) return;
    cart.expire();
    await this.cartRepo.save(cart);
    this.logger.log(`Cart expired: ${cartId}`);
  }
}
