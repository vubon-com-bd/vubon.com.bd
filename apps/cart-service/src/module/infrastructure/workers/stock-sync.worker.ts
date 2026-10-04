import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { PRICE_SYNC_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';
import { CartRedisRepository } from '../persistence/redis/repositories/cart.redis.repository.js';
import { StockCheckService } from '../services/internal/stock-check.service.js';

@Injectable()
export class StockSyncWorker extends BaseWorker {
  constructor(
    private readonly cartRepo: CartRedisRepository,
    private readonly stock: StockCheckService,
  ) {
    super(PRICE_SYNC_QUEUE, StockSyncWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    if (job.name !== JOB_TYPES.STOCK_SYNC) return;
    const cartId = String(job.data.cartId ?? '');
    if (!cartId) return;
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) return;
    const result = await this.stock.checkCart(cart);
    if (result.allSufficient) return;
    this.logger.warn(
      `Cart ${cartId} has ${result.shortItems.length} short item(s)`,
    );
  }
}
