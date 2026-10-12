/**
 * VendorSlugCacheRepository — fast slug availability + mapping cache
 * @module vendor-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const PREFIX = 'vendor:slug:';
const AVAILABILITY_TTL = CACHE_TTL.FIVE_MINUTES;
const MAPPING_TTL = CACHE_TTL.ONE_HOUR;

export interface CachedSlugAvailability {
  readonly slug: string;
  readonly available: boolean;
  readonly suggestion?: string;
  readonly checkedAt: string;
}

@Injectable()
export class VendorSlugCacheRepository {
  constructor(private readonly redis: RedisService) {}

  private availabilityKey(slug: string): string {
    return `${PREFIX}availability:${slug}`;
  }

  private mappingKey(slug: string): string {
    return `${PREFIX}mapping:${slug}`;
  }

  async getAvailability(slug: string): Promise<CachedSlugAvailability | null> {
    return this.redis.get<CachedSlugAvailability>(this.availabilityKey(slug));
  }

  async setAvailability(result: Omit<CachedSlugAvailability, 'checkedAt'>): Promise<void> {
    const payload: CachedSlugAvailability = {
      ...result,
      checkedAt: new Date().toISOString(),
    };
    await this.redis.set(this.availabilityKey(result.slug), payload, AVAILABILITY_TTL);
  }

  async invalidateAvailability(slug: string): Promise<void> {
    await this.redis.del(this.availabilityKey(slug));
  }

  async getVendorId(slug: string): Promise<string | null> {
    return this.redis.get<string>(this.mappingKey(slug));
  }

  async setVendorId(slug: string, vendorId: string): Promise<void> {
    await this.redis.set(this.mappingKey(slug), vendorId, MAPPING_TTL);
    // Invalidate availability check since slug is now taken
    await this.redis.set(
      this.availabilityKey(slug),
      { slug, available: false, checkedAt: new Date().toISOString() },
      AVAILABILITY_TTL,
    );
  }

  async invalidateMapping(slug: string): Promise<void> {
    await this.redis.del(this.mappingKey(slug));
  }

  async invalidate(slug: string): Promise<void> {
    await this.redis.del(this.availabilityKey(slug));
    await this.redis.del(this.mappingKey(slug));
  }
}
