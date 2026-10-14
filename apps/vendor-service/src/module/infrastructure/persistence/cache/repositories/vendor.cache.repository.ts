/**
 * VendorCacheRepository — Redis-backed cache for vendor reads
 * @module vendor-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'vendor:vendor:';
const LIST_PREFIX = 'vendor:vendor:list:';
const SLUG_PREFIX = 'vendor:vendor:slug:';
const TTL_SECONDS = 300; // 5 minutes

export interface CachedVendorShape {
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly slug: string;
  readonly status: string;
  readonly tier: string;
  readonly rating: number;
  readonly isVerified: boolean;
  readonly isFeatured: boolean;
  readonly updatedAt: string;
}

@Injectable()
export class VendorCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<CachedVendorShape | null> {
    return this.redis.get<CachedVendorShape>(`${PREFIX}${id}`);
  }

  async getBySlug(slug: string): Promise<CachedVendorShape | null> {
    return this.redis.get<CachedVendorShape>(`${SLUG_PREFIX}${slug}`);
  }

  async set(vendor: CachedVendorShape): Promise<void> {
    const key = `${PREFIX}${vendor.id}`;
    await this.redis.set(key, vendor, TTL_SECONDS);
    await this.redis.set(`${SLUG_PREFIX}${vendor.slug}`, vendor, TTL_SECONDS);
  }

  async invalidate(id: string, slug?: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
    if (slug) await this.redis.del(`${SLUG_PREFIX}${slug}`);
    await this.invalidateAllLists();
  }

  async invalidateAllLists(): Promise<void> {
    // Best-effort pattern delete via known owners — simplified
    await this.redis.del(`${LIST_PREFIX}featured`);
    await this.redis.del(`${LIST_PREFIX}top-rated`);
    await this.redis.del(`${LIST_PREFIX}verified`);
  }

  async getFeatured(): Promise<readonly CachedVendorShape[] | null> {
    return this.redis.get<readonly CachedVendorShape[]>(`${LIST_PREFIX}featured`);
  }

  async setFeatured(vendors: readonly CachedVendorShape[]): Promise<void> {
    await this.redis.set(`${LIST_PREFIX}featured`, vendors, TTL_SECONDS);
  }

  async getTopRated(): Promise<readonly CachedVendorShape[] | null> {
    return this.redis.get<readonly CachedVendorShape[]>(`${LIST_PREFIX}top-rated`);
  }

  async setTopRated(vendors: readonly CachedVendorShape[]): Promise<void> {
    await this.redis.set(`${LIST_PREFIX}top-rated`, vendors, TTL_SECONDS);
  }
}
