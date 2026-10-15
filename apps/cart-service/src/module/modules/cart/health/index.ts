/**
 * Cart Health Indicator
 * @module cart-service/modules/cart/health
 */
import { Injectable, Logger } from '@nestjs/common';
import { CartRedisRepository } from '../../../infrastructure/persistence/redis/repositories/cart.redis.repository.js';

export interface CartFeatureHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class CartFeatureHealthIndicator {
  private readonly logger = new Logger(CartFeatureHealthIndicator.name);

  constructor(private readonly repo: CartRedisRepository) {}

  async check(): Promise<CartFeatureHealthReport> {
    try {
      const rows = await this.repo.findAll();
      return {
        name: 'cart-repository',
        healthy: true,
        message: `${rows.length} carts`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Cart feature health failed: ${msg}`);
      return { name: 'cart-repository', healthy: false, message: msg };
    }
  }
}
