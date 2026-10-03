/**
 * ProductListCacheRepository — caches paginated product list responses.
 * @module product-service/infrastructure/persistence/cache/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

export interface ProductListCacheEntry<T = unknown> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export const PRODUCT_LIST_CACHE_REPOSITORY = Symbol('PRODUCT_LIST_CACHE_REPOSITORY');

@Injectable()
export class ProductListCacheRepository {
  private readonly ttl: number;
  private readonly scopePrefix = 'product:list';

  constructor(@Inject(RedisService) private readonly redis: RedisService) {
    this.ttl = CACHE_TTL.FIVE_MINUTES;
  }

  private buildKey(options: Record<string, unknown>): string {
    const parts = Object.entries(options)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${k}=${String(v)}`)
      .sort();
    return `${this.scopePrefix}:${parts.join('&')}`;
  }

  async get<T>(options: Record<string, unknown>): Promise<ProductListCacheEntry<T> | null> {
    return this.redis.get<ProductListCacheEntry<T>>(this.buildKey(options));
  }

  async set<T>(options: Record<string, unknown>, entry: ProductListCacheEntry<T>): Promise<void> {
    await this.redis.set(this.buildKey(options), entry, this.ttl);
  }

  async invalidateAll(): Promise<void> {
    await this.redis.del(`${this.scopePrefix}*`);
  }
}
