import { Injectable, Logger } from '@nestjs/common';
import type { DriverEntity } from '@domain/entities/driver.entity';
import type {
  DriverRepository,
  DriverListFilter,
  DriverListOptions,
  DriverPaginationResult,
  DriverStats,
} from '@domain/repositories/driver.repository.interface';
import type { DriverIdVO } from '@domain/primitives/driver-id.vo';

@Injectable()
export class DriverMemoryRepository implements DriverRepository {
  private readonly logger = new Logger(DriverMemoryRepository.name);
  private readonly store = new Map<string, DriverEntity>();

  async findById(id: string): Promise<DriverEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly DriverEntity[]> { return Array.from(this.store.values()); }
  async save(entity: DriverEntity): Promise<DriverEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: DriverIdVO): Promise<DriverEntity | null> { return this.store.get(id.value) ?? null; }
  async findByLicenseNumber(license: string): Promise<DriverEntity | null> {
    for (const e of this.store.values()) if (e.license.licenseNumber === license) return e;
    return null;
  }
  async findByUserId(userId: string): Promise<DriverEntity | null> {
    for (const e of this.store.values()) if (e.userId === userId) return e;
    return null;
  }
  async findByPhone(phone: string): Promise<DriverEntity | null> {
    for (const e of this.store.values()) if (e.phone === phone) return e;
    return null;
  }
  async findByStatus(status: string): Promise<readonly DriverEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByWarehouseId(warehouseId: string): Promise<readonly DriverEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.warehouseId === warehouseId);
  }
  async findByVehicleId(vehicleId: string): Promise<DriverEntity | null> {
    for (const e of this.store.values()) if (e.vehicleId === vehicleId) return e;
    return null;
  }
  async findAvailable(): Promise<readonly DriverEntity[]> {
    return Array.from(this.store.values()).filter(
      (e) => e.isAvailable && e.isAvailableStatus() && !e.isLicenseExpired?.(),
    );
  }

  async findPaginated(options: DriverListOptions): Promise<DriverPaginationResult> {
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

  async getStats(): Promise<DriverStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let availableCount = 0;
    let onDutyCount = 0;
    let ratingSum = 0;
    let ratingCount = 0;
    let totalCashInHand = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      if (e.isAvailable) availableCount += 1;
      if (e.isOnDuty()) onDutyCount += 1;
      if (e.rating !== undefined) { ratingSum += e.rating; ratingCount += 1; }
      totalCashInHand += e.cashInHand ?? 0;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      availableCount,
      onDutyCount,
      averageRating: ratingCount > 0 ? ratingSum / ratingCount : 0,
      totalCashInHand,
    };
  }

  async findLicenseExpiring(withinDays: number): Promise<readonly DriverEntity[]> {
    const cutoff = new Date(Date.now() + withinDays * 24 * 60 * 60 * 1000).toISOString();
    return Array.from(this.store.values()).filter(
      (e) => e.license.expiresAt < cutoff,
    );
  }
  async findCashLimitReached(): Promise<readonly DriverEntity[]> {
    return Array.from(this.store.values()).filter(
      (e) => e.cashLimit !== undefined && (e.cashInHand ?? 0) >= e.cashLimit,
    );
  }
  async existsByLicenseNumber(license: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.license.licenseNumber === license) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly DriverEntity[],
    filter?: DriverListFilter,
  ): DriverEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.warehouseId && e.warehouseId !== filter.warehouseId) return false;
      if (filter.vehicleId && e.vehicleId !== filter.vehicleId) return false;
      if (filter.isAvailable !== undefined && e.isAvailable !== filter.isAvailable) return false;
      if (filter.minRating !== undefined && (e.rating ?? 0) < filter.minRating) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.name.value} ${e.phone} ${e.license.licenseNumber}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly DriverEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): DriverEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return ((a.rating ?? 0) - (b.rating ?? 0)) * dir;
        case 'totalDeliveries':
          return (a.totalDeliveries - b.totalDeliveries) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
