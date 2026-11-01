import { Injectable, Logger } from '@nestjs/common';
import type { PackagingEntity } from '@domain/entities/packaging.entity';
import type {
  PackagingRepository,
  PackagingListFilter,
  PackagingListOptions,
  PackagingPaginationResult,
  PackagingStats,
} from '@domain/repositories/packaging.repository.interface';
import type { PackagingIdVO } from '@domain/primitives/packaging-id.vo';

@Injectable()
export class PackagingMemoryRepository implements PackagingRepository {
  private readonly logger = new Logger(PackagingMemoryRepository.name);
  private readonly store = new Map<string, PackagingEntity>();

  async findById(id: string): Promise<PackagingEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly PackagingEntity[]> { return Array.from(this.store.values()); }
  async save(entity: PackagingEntity): Promise<PackagingEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: PackagingIdVO): Promise<PackagingEntity | null> { return this.store.get(id.value) ?? null; }
  async findByCode(code: string): Promise<PackagingEntity | null> {
    for (const e of this.store.values()) if (e.code === code) return e;
    return null;
  }
  async findByStatus(status: string): Promise<readonly PackagingEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByType(type: string): Promise<readonly PackagingEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.type.value === type);
  }
  async findDefault(): Promise<PackagingEntity | null> {
    for (const e of this.store.values()) if (e.isDefault) return e;
    return null;
  }
  async findUsable(): Promise<readonly PackagingEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isUsable());
  }
  async findOutOfStock(): Promise<readonly PackagingEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isOutOfStock() || e.stock === 0);
  }
  async findByMaxWeight(minWeightKg: number): Promise<readonly PackagingEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.size.maxWeightKg >= minWeightKg);
  }

  async findPaginated(options: PackagingListOptions): Promise<PackagingPaginationResult> {
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

  async getStats(): Promise<PackagingStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalStock = 0;
    let outOfStockCount = 0;
    let ecoFriendlyCount = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      totalStock += e.stock;
      if (e.isOutOfStock() || e.stock === 0) outOfStockCount += 1;
      if (e.isRecyclable || e.material.isEcoFriendly()) ecoFriendlyCount += 1;
    }
    return { total: all.length, byStatus, byType, totalStock, outOfStockCount, ecoFriendlyCount };
  }

  async existsByCode(code: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.code === code) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly PackagingEntity[],
    filter?: PackagingListFilter,
  ): PackagingEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.material && e.material.value !== filter.material) return false;
      if (filter.isFragile !== undefined && e.isFragile !== filter.isFragile) return false;
      if (filter.isRecyclable !== undefined && e.isRecyclable !== filter.isRecyclable) return false;
      if (filter.isTemperatureControlled !== undefined && e.isTemperatureControlled !== filter.isTemperatureControlled) return false;
      if (filter.minStock !== undefined && e.stock < filter.minStock) return false;
      if (filter.maxStock !== undefined && e.stock > filter.maxStock) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.code} ${e.name}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly PackagingEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): PackagingEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'stock':
          return (a.stock - b.stock) * dir;
        case 'cost':
          return ((a.cost ?? 0) - (b.cost ?? 0)) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
