/**
 * ProductPricingCacheRepository
 * @module product-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { PricingResponseDTO } from '../../../../application/dtos/responses/pricing-response.dto.js';

const PREFIX = 'product:pricing:';
const CALC_PREFIX = 'product:pricing:calc:';

@Injectable()
export class ProductPricingCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(productId: string): Promise<PricingResponseDTO | null> {
    return this.redis.get<PricingResponseDTO>(`${PREFIX}${productId}`);
  }

  async set(productId: string, dto: PricingResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${productId}`, dto, CACHE_TTL.FIVE_MINUTES);
  }

  async getCalculation(key: string): Promise<unknown | null> {
    return this.redis.get(`${CALC_PREFIX}${key}`);
  }

  async setCalculation(key: string, value: unknown): Promise<void> {
    await this.redis.set(`${CALC_PREFIX}${key}`, value, CACHE_TTL.ONE_MINUTE);
  }

  async invalidate(productId: string): Promise<void> {
    await this.redis.del(`${PREFIX}${productId}`);
  }
}
