/**
 * CartTotalsCacheRepository — Redis-backed totals cache
 * @module cart-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { CartTotalsResponseDTO } from '../../../../application/dtos/responses/cart-totals-response.dto.js';

const PREFIX = 'cart:totals:';

@Injectable()
export class CartTotalsCacheRepository {
  private readonly logger = new Logger(CartTotalsCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(cartId: string): Promise<CartTotalsResponseDTO | null> {
    return this.redis.get<CartTotalsResponseDTO>(`${PREFIX}${cartId}`);
  }

  async set(cartId: string, totals: CartTotalsResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${cartId}`, totals, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidate(cartId: string): Promise<void> {
    await this.redis.del(`${PREFIX}${cartId}`);
    this.logger.debug(`Totals cache invalidated: ${cartId}`);
  }

  async invalidateMany(cartIds: readonly string[]): Promise<void> {
    for (const id of cartIds) {
      await this.redis.del(`${PREFIX}${id}`);
    }
  }
}
