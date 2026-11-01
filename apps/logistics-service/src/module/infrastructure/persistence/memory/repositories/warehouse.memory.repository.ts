import { Injectable, Logger } from '@nestjs/common';
import type { WarehouseEntity } from '@domain/entities/warehouse.entity';
import type {
  WarehouseRepository,
  WarehouseListFilter,
  WarehouseListOptions,
  WarehousePaginationResult,
  WarehouseStats,
} from '@domain/repositories/warehouse.repository.interface';
import type { WarehouseIdVO } from '@domain/primitives/warehouse-id.vo';

@Injectable()
export class WarehouseMemoryRepository implements WarehouseRepository {
  private readonly logger = new Logger(WarehouseMemoryRepository.name);
  private readonly store = new Map<string, WarehouseEntity>();

  async findById(id: string): Promise<WarehouseEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly WarehouseEntity[]> { return Array.from(this.store.values()); }
  async save(entity: WarehouseEntity): Promise<WarehouseEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: WarehouseIdVO): Promise<WarehouseEntity | null> { return this.store.get(id.value) ?? null; }
  async findByCode(code: string): Promise<WarehouseEntity | null> {
    for (const e of this.store.values()) if (e.code.value === code) return e;
    return null;
  }
  async findByStatus(status: string): Promise<readonly WarehouseEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByZone(zone: string): Promise<readonly WarehouseEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.zone === zone);
  }
  async findDefault(): Promise<WarehouseEntity | null> {
    for (const e of this.store.values()) if (e.isDefault) return e;
    return null;
  }
  async findOperational(): Promise<readonly WarehouseEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isOperational());
  }

  async findPaginated(options: WarehouseListOptions): Promise<WarehousePaginationResult> {
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

  async getStats(): Promise<WarehouseStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalCapacityM3 = 0;
    let totalUsedM3 = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type] = (byType[e.type] ?? 0) + 1;
      totalCapacityM3 += e.capacityM3 ?? 0;
      totalUsedM3 += e.usedCapacityM3 ?? 0;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      totalCapacityM3,
      totalUsedM3,
      utilizationPercent:
        totalCapacityM3 > 0 ? (totalUsedM3 / totalCapacityM3) * 100 : 0,
    };
  }

  async existsByCode(code: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.code.value === code) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly WarehouseEntity[],
    filter?: WarehouseListFilter,
  ): WarehouseEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type !== filter.type) return false;
      if (filter.zone && e.zone !== filter.zone) return false;
      if (filter.isDefault !== undefined && e.isDefault !== filter.isDefault) return false;
      if (filter.minCapacityM3 !== undefined) {
        if ((e.capacityM3 ?? 0) < filter.minCapacityM3) return false;
      }
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.code.value} ${e.name.value}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly WarehouseEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): WarehouseEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name.value < b.name.value ? -1 : 1) * dir;
        case 'capacityM3':
          return ((a.capacityM3 ?? 0) - (b.capacityM3 ?? 0)) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
