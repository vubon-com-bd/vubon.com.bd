/**
 * SearchResultCacheRepository — caches product search results.
 * @module product-service/infrastructure/persistence/cache/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

export interface SearchCacheEntry<T = unknown> {
  readonly query: string;
  readonly ids: readonly string[];
  readonly total: number;
  readonly items: readonly T[];
  readonly cachedAt: string;
}

export const SEARCH_RESULT_CACHE_REPOSITORY = Symbol('SEARCH_RESULT_CACHE_REPOSITORY');

@Injectable()
export class SearchResultCacheRepository {
  private readonly ttl: number;
  private readonly scopePrefix = 'search:product';

  constructor(@Inject(RedisService) private readonly redis: RedisService) {
    this.ttl = CACHE_TTL.FIVE_MINUTES;
  }

  private buildKey(query: string, filters: Record<string, unknown> = {}): string {
    const f = Object.entries(filters)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${k}=${String(v)}`)
      .sort()
      .join('&');
    return `${this.scopePrefix}:${query.toLowerCase()}${f ? ':' + f : ''}`;
  }

  async get<T>(query: string, filters?: Record<string, unknown>): Promise<SearchCacheEntry<T> | null> {
    return this.redis.get<SearchCacheEntry<T>>(this.buildKey(query, filters));
  }

  async set<T>(
    query: string,
    entry: SearchCacheEntry<T>,
    filters?: Record<string, unknown>,
  ): Promise<void> {
    await this.redis.set(this.buildKey(query, filters), entry, this.ttl);
  }

  async invalidateAll(): Promise<void> {
    await this.redis.del(`${this.scopePrefix}*`);
  }

  async invalidateQuery(query: string): Promise<void> {
    await this.redis.del(`${this.scopePrefix}:${query.toLowerCase()}*`);
  }
}
