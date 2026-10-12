/**
 * VendorCacheRepository — lightweight cache for vendor snapshots
 * @module vendor-service/infrastructure/persistence/cache/repositories
 *
 * Caches full vendor aggregate snapshots (from VendorMapper.toResponse)
 * to reduce database reads for hot vendors.
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL, CACHE_PREFIX } from '@vubon/shared-constants/infrastructure';
import type { VendorResponseDto } from '../../../../application/dtos/responses/vendor-response.dto.js';

const PREFIX = `${CACHE_PREFIX.USER}vendor:`;
const SNAPSHOT_TTL = CACHE_TTL.FIFTEEN_MINUTES;
const LIST_TTL = CACHE_TTL.FIVE_MINUTES;

export interface CachedVendorList {
  readonly items: readonly string[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

@Injectable()
export class VendorCacheRepository {
  constructor(private readonly redis: RedisService) {}

  private snapshotKey(vendorId: string): string {
    return `${PREFIX}snapshot:${vendorId}`;
  }

  private slugKey(slug: string): string {
    return `${PREFIX}slug:${slug}`;
  }

  private listKey(hashKey: string): string {
    return `${PREFIX}list:${hashKey}`;
  }

  async getSnapshot(vendorId: string): Promise<VendorResponseDto | null> {
    return this.redis.get<VendorResponseDto>(this.snapshotKey(vendorId));
  }

  async setSnapshot(vendor: VendorResponseDto): Promise<void> {
    await this.redis.set(this.snapshotKey(vendor.id), vendor, SNAPSHOT_TTL);
    await this.redis.set(this.slugKey(vendor.slug), vendor.id, SNAPSHOT_TTL);
  }

  async getVendorIdBySlug(slug: string): Promise<string | null> {
    return this.redis.get<string>(this.slugKey(slug));
  }

  async invalidate(vendorId: string, slug?: string): Promise<void> {
    await this.redis.del(this.snapshotKey(vendorId));
    if (slug) await this.redis.del(this.slugKey(slug));
  }

  async invalidateMany(vendorIds: readonly string[]): Promise<void> {
    for (const id of vendorIds) {
      await this.redis.del(this.snapshotKey(id));
    }
  }

  async getList(hashKey: string): Promise<CachedVendorList | null> {
    return this.redis.get<CachedVendorList>(this.listKey(hashKey));
  }

  async setList(hashKey: string, list: CachedVendorList): Promise<void> {
    await this.redis.set(this.listKey(hashKey), list, LIST_TTL);
  }

  async invalidateLists(): Promise<void> {
    // Best-effort: not scanning keys for safety; lists TTL-expire naturally.
  }

  async exists(vendorId: string): Promise<boolean> {
    return this.redis.exists(this.snapshotKey(vendorId));
  }

  async isHealthy(): Promise<boolean> {
    return this.redis.isHealthy();
  }
}
