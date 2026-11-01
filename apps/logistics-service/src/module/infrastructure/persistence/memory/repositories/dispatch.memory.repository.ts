import { Injectable, Logger } from '@nestjs/common';
import type { DispatchEntity } from '@domain/entities/dispatch.entity';
import type {
  DispatchRepository,
  DispatchListFilter,
  DispatchListOptions,
  DispatchPaginationResult,
  DispatchStats,
} from '@domain/repositories/dispatch.repository.interface';
import type { DispatchIdVO } from '@domain/primitives/dispatch-id.vo';

@Injectable()
export class DispatchMemoryRepository implements DispatchRepository {
  private readonly logger = new Logger(DispatchMemoryRepository.name);
  private readonly store = new Map<string, DispatchEntity>();

  async findById(id: string): Promise<DispatchEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly DispatchEntity[]> { return Array.from(this.store.values()); }
  async save(entity: DispatchEntity): Promise<DispatchEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: DispatchIdVO): Promise<DispatchEntity | null> { return this.store.get(id.value) ?? null; }
  async findByDispatchNumber(num: string): Promise<DispatchEntity | null> {
    for (const e of this.store.values()) if (e.dispatchNumber.value === num) return e;
    return null;
  }
  async findByStatus(status: string): Promise<readonly DispatchEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByCourierId(courierId: string): Promise<readonly DispatchEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.courierId === courierId);
  }
  async findByDriverId(driverId: string): Promise<readonly DispatchEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.driverId === driverId);
  }
  async findByVehicleId(vehicleId: string): Promise<readonly DispatchEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.vehicleId === vehicleId);
  }
  async findContainingShipment(shipmentId: string): Promise<readonly DispatchEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.shipmentIds.includes(shipmentId));
  }
  async findPending(): Promise<readonly DispatchEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isPending());
  }
  async findInTransit(): Promise<readonly DispatchEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isInTransit());
  }

  async findPaginated(options: DispatchListOptions): Promise<DispatchPaginationResult> {
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

  async getStats(): Promise<DispatchStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalShipments = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      totalShipments += e.itemCount;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      totalShipments,
      averageShipmentsPerDispatch: all.length > 0 ? totalShipments / all.length : 0,
    };
  }

  async findStale(olderThanMinutes: number): Promise<readonly DispatchEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000).toISOString();
    return Array.from(this.store.values()).filter(
      (e) => e.updatedAt < cutoff && !e.isFinal(),
    );
  }
  async existsByDispatchNumber(num: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.dispatchNumber.value === num) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly DispatchEntity[],
    filter?: DispatchListFilter,
  ): DispatchEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.courierId && e.courierId !== filter.courierId) return false;
      if (filter.vehicleId && e.vehicleId !== filter.vehicleId) return false;
      if (filter.driverId && e.driverId !== filter.driverId) return false;
      if (filter.warehouseId && e.warehouseId !== filter.warehouseId) return false;
      if (filter.fromDate && e.createdAt < filter.fromDate) return false;
      if (filter.toDate && e.createdAt > filter.toDate) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.dispatchNumber.value}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly DispatchEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): DispatchEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'dispatchedAt':
          return ((a.dispatchedAt ?? '') < (b.dispatchedAt ?? '') ? -1 : 1) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
