/**
 * CourierMemoryRepository — In-memory implementation
 */
import { Injectable, Logger } from '@nestjs/common';
import type { CourierEntity } from '@domain/entities/courier.entity';
import type {
  CourierRepository,
  CourierListFilter,
  CourierListOptions,
  CourierPaginationResult,
  CourierStats,
} from '@domain/repositories/courier.repository.interface';
import type { CourierIdVO } from '@domain/primitives/courier-id.vo';

@Injectable()
export class CourierMemoryRepository implements CourierRepository {
  private readonly logger = new Logger(CourierMemoryRepository.name);
  private readonly store = new Map<string, CourierEntity>();

  async findById(id: string): Promise<CourierEntity | null> {
    return this.store.get(id) ?? null;
  }
  async findAll(): Promise<readonly CourierEntity[]> {
    return Array.from(this.store.values());
  }
  async save(entity: CourierEntity): Promise<CourierEntity> {
    this.store.set(entity.id, entity);
    return entity;
  }
  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
  async exists(id: string): Promise<boolean> {
    return this.store.has(id);
  }

  async findByIdVO(id: CourierIdVO): Promise<CourierEntity | null> {
    return this.store.get(id.value) ?? null;
  }
  async findByCode(code: string): Promise<CourierEntity | null> {
    for (const e of this.store.values()) if (e.code === code) return e;
    return null;
  }
  async findByStatus(status: string): Promise<readonly CourierEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByType(type: string): Promise<readonly CourierEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.type.value === type);
  }
  async findDefault(): Promise<CourierEntity | null> {
    for (const e of this.store.values()) if (e.isDefault) return e;
    return null;
  }
  async findOperational(): Promise<readonly CourierEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isOperational());
  }
  async findSupportingCOD(): Promise<readonly CourierEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.supportsCOD);
  }
  async findSupportingInsurance(): Promise<readonly CourierEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.supportsInsurance);
  }
  async findSupportingInternational(): Promise<readonly CourierEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.supportsInternational);
  }
  async findByZone(zone: string): Promise<readonly CourierEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.coversZone(zone));
  }

  async findPaginated(options: CourierListOptions): Promise<CourierPaginationResult> {
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

  async getStats(): Promise<CourierStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let codEnabled = 0;
    let insuranceEnabled = 0;
    let internationalEnabled = 0;
    let apiEnabledCount = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      if (e.supportsCOD) codEnabled++;
      if (e.supportsInsurance) insuranceEnabled++;
      if (e.supportsInternational) internationalEnabled++;
      if (e.apiEnabled) apiEnabledCount++;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      codEnabled,
      insuranceEnabled,
      internationalEnabled,
      apiEnabledCount,
    };
  }

  async existsByCode(code: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.code === code) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> {
    this.store.delete(id);
  }

  private applyFilter(
    entities: readonly CourierEntity[],
    filter?: CourierListFilter,
  ): CourierEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.supportsCOD !== undefined && e.supportsCOD !== filter.supportsCOD)
        return false;
      if (
        filter.supportsInsurance !== undefined &&
        e.supportsInsurance !== filter.supportsInsurance
      )
        return false;
      if (
        filter.supportsInternational !== undefined &&
        e.supportsInternational !== filter.supportsInternational
      )
        return false;
      if (filter.apiEnabled !== undefined && e.apiEnabled !== filter.apiEnabled)
        return false;
      if (filter.isDefault !== undefined && e.isDefault !== filter.isDefault)
        return false;
      if (filter.zone && !e.coversZone(filter.zone)) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.code} ${e.displayName}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly CourierEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): CourierEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return (a.priority - b.priority) * dir;
        case 'averageDeliveryDays':
          return (a.averageDeliveryDays - b.averageDeliveryDays) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        case 'createdAt':
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
