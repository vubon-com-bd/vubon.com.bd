import { Injectable, Logger } from '@nestjs/common';
import type { ShippingMethodEntity } from '@domain/entities/shipping-method.entity';
import type {
  ShippingMethodRepository,
  ShippingMethodListFilter,
  ShippingMethodListOptions,
  ShippingMethodPaginationResult,
  ShippingMethodStats,
} from '@domain/repositories/shipping-method.repository.interface';
import type { ShippingMethodIdVO } from '@domain/primitives/shipping-method-id.vo';

@Injectable()
export class ShippingMethodMemoryRepository implements ShippingMethodRepository {
  private readonly logger = new Logger(ShippingMethodMemoryRepository.name);
  private readonly store = new Map<string, ShippingMethodEntity>();

  async findById(id: string): Promise<ShippingMethodEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly ShippingMethodEntity[]> { return Array.from(this.store.values()); }
  async save(entity: ShippingMethodEntity): Promise<ShippingMethodEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: ShippingMethodIdVO): Promise<ShippingMethodEntity | null> { return this.store.get(id.value) ?? null; }
  async findByCode(code: string): Promise<ShippingMethodEntity | null> {
    for (const e of this.store.values()) if (e.code === code) return e;
    return null;
  }
  async findByStatus(status: string): Promise<readonly ShippingMethodEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByType(type: string): Promise<readonly ShippingMethodEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.type.value === type);
  }
  async findByZone(zone: string): Promise<readonly ShippingMethodEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.coversZone(zone));
  }
  async findDefault(): Promise<ShippingMethodEntity | null> {
    for (const e of this.store.values()) if (e.isDefault) return e;
    return null;
  }
  async findUsable(): Promise<readonly ShippingMethodEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isUsable());
  }

  async findPaginated(options: ShippingMethodListOptions): Promise<ShippingMethodPaginationResult> {
    const filtered = this.applyFilter(Array.from(this.store.values()), options.filter);
    const sorted = this.applySort(filtered, options.sortBy, options.sortDir);
    const total = sorted.length;
    const start = (options.page - 1) * options.limit;
    const items = sorted.slice(start, start + options.limit);
    return {
      items,
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<ShippingMethodStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let codEnabledCount = 0;
    let trackingEnabledCount = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      if (e.codEnabled) codEnabledCount += 1;
      if (e.trackingEnabled) trackingEnabledCount += 1;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      codEnabledCount,
      trackingEnabledCount,
    };
  }

  async existsByCode(code: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.code === code) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly ShippingMethodEntity[],
    filter?: ShippingMethodListFilter,
  ): ShippingMethodEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.rateType && e.rateType.value !== filter.rateType) return false;
      if (filter.codEnabled !== undefined && e.codEnabled !== filter.codEnabled) return false;
      if (filter.trackingEnabled !== undefined && e.trackingEnabled !== filter.trackingEnabled) return false;
      if (filter.zone && !e.coversZone(filter.zone)) return false;
      if (filter.minWeightKg !== undefined && (e.maxWeightKg ?? 0) < filter.minWeightKg) return false;
      if (filter.maxWeightKg !== undefined && (e.maxWeightKg ?? 0) > filter.maxWeightKg) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.code} ${e.displayName} ${e.name}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly ShippingMethodEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): ShippingMethodEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'baseCost':
          return (a.baseCost - b.baseCost) * dir;
        case 'minDeliveryDays':
          return (a.minDeliveryDays - b.minDeliveryDays) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
