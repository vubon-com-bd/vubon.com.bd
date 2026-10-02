/**
 * ProductCacheRepository — Redis-backed product snapshot cache
 * @module product-service/infrastructure/persistence/cache/repositories
 *
 * Cache keys:
 *   product:byId:<id>
 *   product:bySlug:<slug>
 *   product:bySku:<sku>
 *
 * TTL: PRODUCT_CACHE_TTL (default 300s)
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

export interface ProductCacheSnapshot {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly sku: string;
  readonly type: string;
  readonly status: string;
  readonly price: number;
  readonly currency: string;
  readonly totalStock: number;
  readonly isFeatured: boolean;
  readonly isPublished: boolean;
  readonly images: readonly string[];
  readonly updatedAt: string;
}

export const PRODUCT_CACHE_REPOSITORY = Symbol('PRODUCT_CACHE_REPOSITORY');

@Injectable()
export class ProductCacheRepository {
  private readonly ttl: number;

  constructor(
    @Inject(RedisService) private readonly redis: RedisService,
  ) {
    this.ttl = CACHE_TTL.FIVE_MINUTES;
  }

  private idKey(id: string): string { return `product:byId:${id}`; }
  private slugKey(slug: string): string { return `product:bySlug:${slug}`; }
  private skuKey(sku: string): string { return `product:bySku:${sku}`; }

  async getById(id: string): Promise<ProductCacheSnapshot | null> {
    return this.redis.get<ProductCacheSnapshot>(this.idKey(id));
  }

  async getBySlug(slug: string): Promise<ProductCacheSnapshot | null> {
    return this.redis.get<ProductCacheSnapshot>(this.slugKey(slug));
  }

  async getBySku(sku: string): Promise<ProductCacheSnapshot | null> {
    return this.redis.get<ProductCacheSnapshot>(this.skuKey(sku));
  }

  async set(snapshot: ProductCacheSnapshot): Promise<void> {
    await Promise.all([
      this.redis.set(this.idKey(snapshot.id), snapshot, this.ttl),
      this.redis.set(this.slugKey(snapshot.slug), snapshot, this.ttl),
      this.redis.set(this.skuKey(snapshot.sku), snapshot, this.ttl),
    ]);
  }

  async invalidate(id: string, slug?: string, sku?: string): Promise<void> {
    const keys = [this.idKey(id)];
    if (slug) keys.push(this.slugKey(slug));
    if (sku) keys.push(this.skuKey(sku));
    await Promise.all(keys.map((k) => this.redis.del(k)));
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(this.idKey(id));
  }
}
