/**
 * ProductCacheRepository — Redis-backed cache for product reads
 * @module product-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { ProductResponseDTO } from '../../../../application/dtos/responses/product-response.dto.js';

const PREFIX = 'product:product:';
const LIST_PREFIX = 'product:product:list:';
const SLUG_PREFIX = 'product:product:slug:';

@Injectable()
export class ProductCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<ProductResponseDTO | null> {
    return this.redis.get<ProductResponseDTO>(`${PREFIX}${id}`);
  }

  async set(id: string, dto: ProductResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIVE_MINUTES);
  }

  async getBySlug(slug: string): Promise<ProductResponseDTO | null> {
    return this.redis.get<ProductResponseDTO>(`${SLUG_PREFIX}${slug}`);
  }

  async setBySlug(slug: string, dto: ProductResponseDTO): Promise<void> {
    await this.redis.set(`${SLUG_PREFIX}${slug}`, dto, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
  }

  async invalidateBySlug(slug: string): Promise<void> {
    await this.redis.del(`${SLUG_PREFIX}${slug}`);
  }

  async invalidateList(categoryId?: string): Promise<void> {
    if (categoryId) {
      await this.redis.del(`${LIST_PREFIX}category:${categoryId}`);
    } else {
      await this.redis.del(`${LIST_PREFIX}all`);
    }
  }
}
