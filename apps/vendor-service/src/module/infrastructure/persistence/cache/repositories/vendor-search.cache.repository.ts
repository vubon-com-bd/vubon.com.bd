/**
 * VendorSearchCacheRepository — cached search results
 * @module vendor-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type {
  VendorPublicDto,
  VendorSummaryDto,
} from '../../../../application/dtos/responses/vendor-response.dto.js';

const PREFIX = 'vendor:search:';
const SEARCH_TTL = CACHE_TTL.FIVE_MINUTES;
const TOP_TTL = CACHE_TTL.FIFTEEN_MINUTES;

export interface CachedSearchResult {
  readonly items: readonly VendorSummaryDto[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

@Injectable()
export class VendorSearchCacheRepository {
  constructor(private readonly redis: RedisService) {}

  private searchKey(hash: string): string {
    return `${PREFIX}q:${hash}`;
  }

  private topRatedKey(limit: number): string {
    return `${PREFIX}top_rated:${limit}`;
  }

  private featuredKey(limit: number): string {
    return `${PREFIX}featured:${limit}`;
  }

  async getSearchResult(hash: string): Promise<CachedSearchResult | null> {
    return this.redis.get<CachedSearchResult>(this.searchKey(hash));
  }

  async setSearchResult(hash: string, result: CachedSearchResult): Promise<void> {
    await this.redis.set(this.searchKey(hash), result, SEARCH_TTL);
  }

  async invalidateSearch(hash: string): Promise<void> {
    await this.redis.del(this.searchKey(hash));
  }

  async getTopRated(limit: number): Promise<readonly VendorSummaryDto[] | null> {
    return this.redis.get<readonly VendorSummaryDto[]>(this.topRatedKey(limit));
  }

  async setTopRated(limit: number, items: readonly VendorSummaryDto[]): Promise<void> {
    await this.redis.set(this.topRatedKey(limit), items, TOP_TTL);
  }

  async invalidateTopRated(): Promise<void> {
    // Handled by TTL; explicit invalidation for known limits
    for (const limit of [5, 10, 20, 50]) {
      await this.redis.del(this.topRatedKey(limit));
    }
  }

  async getFeatured(limit: number): Promise<readonly VendorPublicDto[] | null> {
    return this.redis.get<readonly VendorPublicDto[]>(this.featuredKey(limit));
  }

  async setFeatured(limit: number, items: readonly VendorPublicDto[]): Promise<void> {
    await this.redis.set(this.featuredKey(limit), items, TOP_TTL);
  }

  async invalidateFeatured(): Promise<void> {
    for (const limit of [5, 10, 20, 50]) {
      await this.redis.del(this.featuredKey(limit));
    }
  }
}
