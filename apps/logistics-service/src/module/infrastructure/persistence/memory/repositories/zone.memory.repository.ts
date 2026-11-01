import { Injectable, Logger } from '@nestjs/common';
import type { ZoneEntity } from '@domain/entities/zone.entity';
import type {
  ZoneRepository,
  ZoneListFilter,
  ZoneListOptions,
  ZonePaginationResult,
  ZoneStats,
} from '@domain/repositories/zone.repository.interface';
import type { ZoneIdVO } from '@domain/primitives/zone-id.vo';

@Injectable()
export class ZoneMemoryRepository implements ZoneRepository {
  private readonly logger = new Logger(ZoneMemoryRepository.name);
  private readonly store = new Map<string, ZoneEntity>();

  async findById(id: string): Promise<ZoneEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly ZoneEntity[]> { return Array.from(this.store.values()); }
  async save(entity: ZoneEntity): Promise<ZoneEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: ZoneIdVO): Promise<ZoneEntity | null> { return this.store.get(id.value) ?? null; }
  async findByCode(code: string): Promise<ZoneEntity | null> {
    for (const e of this.store.values()) if (e.code === code) return e;
    return null;
  }
  async findByStatus(status: string): Promise<readonly ZoneEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByType(type: string): Promise<readonly ZoneEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.type.value === type);
  }
  async findByParentId(parentId: string): Promise<readonly ZoneEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.parentId === parentId);
  }
  async findByPostalCode(postalCode: string): Promise<readonly ZoneEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.coversPostalCode(postalCode));
  }
  async findByDistrict(district: string): Promise<readonly ZoneEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.coversDistrict(district));
  }
  async findByDivision(division: string): Promise<readonly ZoneEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.coversDivision(division));
  }
  async findActive(): Promise<readonly ZoneEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isUsable());
  }

  async findPaginated(options: ZoneListOptions): Promise<ZonePaginationResult> {
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

  async getStats(): Promise<ZoneStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let codEnabled = 0;
    let remoteCount = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      if (e.codEnabled) codEnabled += 1;
      if (e.isRemote) remoteCount += 1;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      codEnabledCount: codEnabled,
      remoteCount,
    };
  }

  async existsByCode(code: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.code === code) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly ZoneEntity[],
    filter?: ZoneListFilter,
  ): ZoneEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.pricingType && e.pricingType.value !== filter.pricingType) return false;
      if (filter.parentId && e.parentId !== filter.parentId) return false;
      if (filter.codEnabled !== undefined && e.codEnabled !== filter.codEnabled) return false;
      if (filter.isRemote !== undefined && e.isRemote !== filter.isRemote) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.code} ${e.name.value}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly ZoneEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): ZoneEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name.value < b.name.value ? -1 : 1) * dir;
        case 'shippingCost':
          return (a.shippingCost - b.shippingCost) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
