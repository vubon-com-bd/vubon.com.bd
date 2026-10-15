/**
 * CartSummaryCacheRepository — Redis-backed summary cache
 * @module cart-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { CartSummaryResponseDTO } from '../../../../application/dtos/responses/cart-response.dto.js';

const PREFIX = 'cart:summary:';
const USER_PREFIX = 'cart:summary:user:';

@Injectable()
export class CartSummaryCacheRepository {
  private readonly logger = new Logger(CartSummaryCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(cartId: string): Promise<CartSummaryResponseDTO | null> {
    return this.redis.get<CartSummaryResponseDTO>(`${PREFIX}${cartId}`);
  }

  async set(cartId: string, summary: CartSummaryResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${cartId}`, summary, CACHE_TTL.FIVE_MINUTES);
  }

  async getByUser(userId: string): Promise<CartSummaryResponseDTO | null> {
    return this.redis.get<CartSummaryResponseDTO>(`${USER_PREFIX}${userId}`);
  }

  async setByUser(userId: string, summary: CartSummaryResponseDTO): Promise<void> {
    await this.redis.set(
      `${USER_PREFIX}${userId}`,
      summary,
      CACHE_TTL.FIVE_MINUTES,
    );
  }

  async invalidate(cartId: string, userId?: string): Promise<void> {
    await this.redis.del(`${PREFIX}${cartId}`);
    if (userId) {
      await this.redis.del(`${USER_PREFIX}${userId}`);
    }
    this.logger.debug(`Summary cache invalidated: ${cartId}`);
  }
}
