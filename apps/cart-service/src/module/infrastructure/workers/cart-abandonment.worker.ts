/**
 * CartAbandonmentWorker — detects abandonment
 * @module cart-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { ABANDONMENT_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';
import { CartRedisRepository } from '../persistence/redis/repositories/cart.redis.repository.js';
import { AbandonmentDetectorService } from '../services/internal/abandonment-detector.service.js';

@Injectable()
export class CartAbandonmentWorker extends BaseWorker {
  constructor(
    private readonly cartRepo: CartRedisRepository,
    private readonly detector: AbandonmentDetectorService,
  ) {
    super(ABANDONMENT_QUEUE, CartAbandonmentWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    if (job.name !== JOB_TYPES.ABANDONMENT_DETECT) return;
    const cartId = String(job.data.cartId ?? '');
    if (!cartId) return;
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) return;
    const decision = this.detector.detect(cart);
    if (!decision.abandoned) return;
    this.logger.log(
      `Cart abandonment detected: ${cartId} (hoursSince=${decision.hoursSinceActivity})`,
    );
    // Persistence to abandoned_carts table happens via AbandonedCartService (application layer)
  }
}
