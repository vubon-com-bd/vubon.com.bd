import { Injectable, Logger } from '@nestjs/common';
import type { VehicleEntity } from '@domain/entities/vehicle.entity';
import type {
  VehicleRepository,
  VehicleListFilter,
  VehicleListOptions,
  VehiclePaginationResult,
  VehicleStats,
} from '@domain/repositories/vehicle.repository.interface';
import type { VehicleIdVO } from '@domain/primitives/vehicle-id.vo';

@Injectable()
export class VehicleMemoryRepository implements VehicleRepository {
  private readonly logger = new Logger(VehicleMemoryRepository.name);
  private readonly store = new Map<string, VehicleEntity>();

  async findById(id: string): Promise<VehicleEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly VehicleEntity[]> { return Array.from(this.store.values()); }
  async save(entity: VehicleEntity): Promise<VehicleEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: VehicleIdVO): Promise<VehicleEntity | null> { return this.store.get(id.value) ?? null; }
  async findByRegistrationNumber(reg: string): Promise<VehicleEntity | null> {
    for (const e of this.store.values()) if (e.registrationNumber.value === reg) return e;
    return null;
  }
  async findByStatus(status: string): Promise<readonly VehicleEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByType(type: string): Promise<readonly VehicleEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.type.value === type);
  }
  async findByWarehouseId(warehouseId: string): Promise<readonly VehicleEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.warehouseId === warehouseId);
  }
  async findByDriverId(driverId: string): Promise<VehicleEntity | null> {
    for (const e of this.store.values()) if (e.assignedDriverId === driverId) return e;
    return null;
  }
  async findAvailable(): Promise<readonly VehicleEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isAvailable());
  }

  async findPaginated(options: VehicleListOptions): Promise<VehiclePaginationResult> {
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

  async getStats(): Promise<VehicleStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byFuelType: Record<string, number> = {};
    let availableCount = 0;
    let inUseCount = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      byFuelType[e.fuelType.value] = (byFuelType[e.fuelType.value] ?? 0) + 1;
      if (e.isAvailable()) availableCount += 1;
      if (e.isInUse()) inUseCount += 1;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      byFuelType,
      availableCount,
      inUseCount,
    };
  }

  async findMaintenanceDue(): Promise<readonly VehicleEntity[]> {
    const now = new Date().toISOString();
    return Array.from(this.store.values()).filter(
      (e) => e.nextServiceAt !== undefined && e.nextServiceAt < now,
    );
  }
  async findExpiringInsurance(withinDays: number): Promise<readonly VehicleEntity[]> {
    const cutoff = new Date(Date.now() + withinDays * 24 * 60 * 60 * 1000).toISOString();
    return Array.from(this.store.values()).filter(
      (e) =>
        e.insuranceExpiresAt !== undefined &&
        e.insuranceExpiresAt < cutoff &&
        !e.isRetired(),
    );
  }
  async existsByRegistrationNumber(reg: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.registrationNumber.value === reg) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly VehicleEntity[],
    filter?: VehicleListFilter,
  ): VehicleEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.fuelType && e.fuelType.value !== filter.fuelType) return false;
      if (filter.warehouseId && e.warehouseId !== filter.warehouseId) return false;
      if (filter.assignedDriverId && e.assignedDriverId !== filter.assignedDriverId) return false;
      if (filter.minWeightKg !== undefined && e.maxWeightKg < filter.minWeightKg) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.registrationNumber.value} ${e.make} ${e.model}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly VehicleEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): VehicleEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return (a.year - b.year) * dir;
        case 'maxWeightKg':
          return (a.maxWeightKg - b.maxWeightKg) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
