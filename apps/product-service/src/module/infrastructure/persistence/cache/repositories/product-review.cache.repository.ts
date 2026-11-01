/**
 * ProductReviewCacheRepository
 * @module product-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { ReviewStatsResponseDTO } from '../../../../application/dtos/responses/review-response.dto.js';

const PREFIX = 'product:review:stats:';

@Injectable()
export class ProductReviewCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async getStats(productId: string): Promise<ReviewStatsResponseDTO | null> {
    return this.redis.get<ReviewStatsResponseDTO>(`${PREFIX}${productId}`);
  }

  async setStats(productId: string, dto: ReviewStatsResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${productId}`, dto, CACHE_TTL.FIFTEEN_MINUTES);
  }

  async invalidate(productId: string): Promise<void> {
    await this.redis.del(`${PREFIX}${productId}`);
  }
}
