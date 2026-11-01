import { Injectable, Logger } from '@nestjs/common';
import type { InventoryLocationEntity } from '@domain/entities/inventory-location.entity';
import type {
  InventoryLocationRepository,
  InventoryLocationListFilter,
  InventoryLocationListOptions,
  InventoryLocationPaginationResult,
  InventoryLocationStats,
} from '@domain/repositories/inventory-location.repository.interface';
import type { InventoryLocationIdVO } from '@domain/primitives/inventory-location-id.vo';

@Injectable()
export class InventoryLocationMemoryRepository implements InventoryLocationRepository {
  private readonly logger = new Logger(InventoryLocationMemoryRepository.name);
  private readonly store = new Map<string, InventoryLocationEntity>();

  async findById(id: string): Promise<InventoryLocationEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly InventoryLocationEntity[]> { return Array.from(this.store.values()); }
  async save(entity: InventoryLocationEntity): Promise<InventoryLocationEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: InventoryLocationIdVO): Promise<InventoryLocationEntity | null> { return this.store.get(id.value) ?? null; }
  async findByWarehouseId(warehouseId: string): Promise<readonly InventoryLocationEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.warehouseId === warehouseId);
  }
  async findByCode(code: string): Promise<InventoryLocationEntity | null> {
    for (const e of this.store.values()) if (e.code.value === code) return e;
    return null;
  }
  async findByBarcode(barcode: string): Promise<InventoryLocationEntity | null> {
    for (const e of this.store.values()) if (e.barcode === barcode) return e;
    return null;
  }
  async findByZone(warehouseId: string, zone: string): Promise<readonly InventoryLocationEntity[]> {
    return Array.from(this.store.values()).filter(
      (e) => e.warehouseId === warehouseId && e.zone === zone,
    );
  }
  async findPickable(warehouseId: string): Promise<readonly InventoryLocationEntity[]> {
    return Array.from(this.store.values()).filter(
      (e) => e.warehouseId === warehouseId && e.isPickable && e.isUsable,
    );
  }

  async findPaginated(options: InventoryLocationListOptions): Promise<InventoryLocationPaginationResult> {
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

  async getStats(warehouseId?: string): Promise<InventoryLocationStats> {
    let all = Array.from(this.store.values());
    if (warehouseId) all = all.filter((e) => e.warehouseId === warehouseId);
    const byZone: Record<string, number> = {};
    let activeCount = 0;
    let pickableCount = 0;
    let quarantineCount = 0;
    for (const e of all) {
      byZone[e.zone] = (byZone[e.zone] ?? 0) + 1;
      if (e.isActive) activeCount++;
      if (e.isPickable) pickableCount++;
      if (e.isQuarantine) quarantineCount++;
    }
    return { total: all.length, byZone, activeCount, pickableCount, quarantineCount };
  }

  async existsByCode(code: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.code.value === code) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly InventoryLocationEntity[],
    filter?: InventoryLocationListFilter,
  ): InventoryLocationEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.warehouseId && e.warehouseId !== filter.warehouseId) return false;
      if (filter.zone && e.zone !== filter.zone) return false;
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.isActive !== undefined && e.isActive !== filter.isActive) return false;
      if (filter.isPickable !== undefined && e.isPickable !== filter.isPickable) return false;
      if (filter.isQuarantine !== undefined && e.isQuarantine !== filter.isQuarantine) return false;
      if (filter.minCapacityKg !== undefined && (e.maxCapacityKg ?? 0) < filter.minCapacityKg) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.code.value} ${e.name.value}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly InventoryLocationEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): InventoryLocationEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return (a.priority - b.priority) * dir;
        case 'currentKg':
          return (a.currentKg - b.currentKg) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
