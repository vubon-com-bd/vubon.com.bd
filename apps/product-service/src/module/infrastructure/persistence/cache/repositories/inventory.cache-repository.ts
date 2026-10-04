/**
 * InventoryCacheRepository — short-lived cache for stock lookups.
 * @module product-service/infrastructure/persistence/cache/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

export interface InventoryCacheSnapshot {
  readonly inventoryId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly sku: string;
  readonly quantity: number;
  readonly reserved: number;
  readonly available: number;
  readonly status: string;
  readonly updatedAt: string;
}

export const INVENTORY_CACHE_REPOSITORY = Symbol('INVENTORY_CACHE_REPOSITORY');

@Injectable()
export class InventoryCacheRepository {
  private readonly ttl: number;

  constructor(@Inject(RedisService) private readonly redis: RedisService) {
    this.ttl = CACHE_TTL.ONE_MINUTE;
  }

  private key(id: string): string { return `inventory:${id}`; }
  private skuKey(sku: string): string { return `inventory:sku:${sku}`; }

  async get(inventoryId: string): Promise<InventoryCacheSnapshot | null> {
    return this.redis.get<InventoryCacheSnapshot>(this.key(inventoryId));
  }

  async getBySku(sku: string): Promise<InventoryCacheSnapshot | null> {
    return this.redis.get<InventoryCacheSnapshot>(this.skuKey(sku));
  }

  async set(snapshot: InventoryCacheSnapshot): Promise<void> {
    await Promise.all([
      this.redis.set(this.key(snapshot.inventoryId), snapshot, this.ttl),
      this.redis.set(this.skuKey(snapshot.sku), snapshot, this.ttl),
    ]);
  }

  async invalidate(inventoryId: string, sku?: string): Promise<void> {
    const keys = [this.key(inventoryId)];
    if (sku) keys.push(this.skuKey(sku));
    await Promise.all(keys.map((k) => this.redis.del(k)));
  }
}
