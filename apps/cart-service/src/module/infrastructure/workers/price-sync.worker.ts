/**
 * PriceSyncWorker — syncs prices from pricing-service
 * @module cart-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { PRICE_SYNC_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';
import { CartRedisRepository } from '../persistence/redis/repositories/cart.redis.repository.js';
import { PricingClient } from '../services/external/pricing.client.js';

@Injectable()
export class PriceSyncWorker extends BaseWorker {
  constructor(
    private readonly cartRepo: CartRedisRepository,
    private readonly pricing: PricingClient,
  ) {
    super(PRICE_SYNC_QUEUE, PriceSyncWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    if (job.name === JOB_TYPES.PRICE_SYNC_ONE) {
      await this.syncOne(String(job.data.cartId ?? ''));
    } else if (job.name === JOB_TYPES.STOCK_SYNC) {
      await this.syncOne(String(job.data.cartId ?? ''));
    }
  }

  private async syncOne(cartId: string): Promise<void> {
    if (!cartId) return;
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) return;
    const prices = await this.pricing.getPrices(
      cart.items.map((i) => ({ productId: i.productId.value, variantId: i.variantId?.value })),
    );
    if (prices.length === 0) return;
    this.logger.log(`Price sync for cart ${cartId}: ${prices.length} items`);
  }
}
