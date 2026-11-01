import { Injectable, Logger } from '@nestjs/common';
import type { RouteEntity } from '@domain/entities/route.entity';
import type {
  RouteRepository,
  RouteListFilter,
  RouteListOptions,
  RoutePaginationResult,
  RouteStats,
} from '@domain/repositories/route.repository.interface';
import type { RouteIdVO } from '@domain/primitives/route-id.vo';

@Injectable()
export class RouteMemoryRepository implements RouteRepository {
  private readonly logger = new Logger(RouteMemoryRepository.name);
  private readonly store = new Map<string, RouteEntity>();

  async findById(id: string): Promise<RouteEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly RouteEntity[]> { return Array.from(this.store.values()); }
  async save(entity: RouteEntity): Promise<RouteEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: RouteIdVO): Promise<RouteEntity | null> { return this.store.get(id.value) ?? null; }
  async findByCode(code: string): Promise<RouteEntity | null> {
    for (const e of this.store.values()) if (e.code === code) return e;
    return null;
  }
  async findByStatus(status: string): Promise<readonly RouteEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByWarehouseId(warehouseId: string): Promise<readonly RouteEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.warehouseId === warehouseId);
  }
  async findByDriverId(driverId: string): Promise<readonly RouteEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.driverId === driverId);
  }
  async findByVehicleId(vehicleId: string): Promise<readonly RouteEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.vehicleId === vehicleId);
  }
  async findContainingShipment(shipmentId: string): Promise<readonly RouteEntity[]> {
    return Array.from(this.store.values()).filter((e) =>
      e.stops.some((s) => s.shipmentIds.includes(shipmentId)),
    );
  }
  async findByScheduledDate(date: string): Promise<readonly RouteEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.scheduledDate.startsWith(date));
  }
  async findActive(): Promise<readonly RouteEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isActive());
  }
  async findPendingOptimization(): Promise<readonly RouteEntity[]> {
    return Array.from(this.store.values()).filter(
      (e) => !e.isOptimized && (e.isDraft() || e.isPlanned()),
    );
  }

  async findPaginated(options: RouteListOptions): Promise<RoutePaginationResult> {
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

  async getStats(): Promise<RouteStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalDistance = 0;
    let totalStops = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      totalDistance += e.totalDistanceKm ?? 0;
      totalStops += e.stopCount;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      totalDistanceKm: totalDistance,
      totalStops,
      averageStopsPerRoute: all.length > 0 ? totalStops / all.length : 0,
    };
  }

  async existsByCode(code: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.code === code) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly RouteEntity[],
    filter?: RouteListFilter,
  ): RouteEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.optimization && e.optimization.value !== filter.optimization) return false;
      if (filter.warehouseId && e.warehouseId !== filter.warehouseId) return false;
      if (filter.vehicleId && e.vehicleId !== filter.vehicleId) return false;
      if (filter.driverId && e.driverId !== filter.driverId) return false;
      if (filter.isOptimized !== undefined && e.isOptimized !== filter.isOptimized) return false;
      if (filter.scheduledDateFrom && e.scheduledDate < filter.scheduledDateFrom) return false;
      if (filter.scheduledDateTo && e.scheduledDate > filter.scheduledDateTo) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.code} ${e.name.value}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly RouteEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): RouteEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'scheduledDate':
          return (a.scheduledDate < b.scheduledDate ? -1 : 1) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
