/**
 * DeliveryMemoryRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import type { DeliveryEntity } from '@domain/entities/delivery.entity';
import type {
  DeliveryRepository,
  DeliveryListFilter,
  DeliveryListOptions,
  DeliveryPaginationResult,
  DeliveryStats,
} from '@domain/repositories/delivery.repository.interface';
import type { DeliveryIdVO } from '@domain/primitives/delivery-id.vo';

@Injectable()
export class DeliveryMemoryRepository implements DeliveryRepository {
  private readonly logger = new Logger(DeliveryMemoryRepository.name);
  private readonly store = new Map<string, DeliveryEntity>();

  async findById(id: string): Promise<DeliveryEntity | null> {
    return this.store.get(id) ?? null;
  }
  async findAll(): Promise<readonly DeliveryEntity[]> {
    return Array.from(this.store.values());
  }
  async save(entity: DeliveryEntity): Promise<DeliveryEntity> {
    this.store.set(entity.id, entity);
    return entity;
  }
  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
  async exists(id: string): Promise<boolean> {
    return this.store.has(id);
  }

  async findByIdVO(id: DeliveryIdVO): Promise<DeliveryEntity | null> {
    return this.store.get(id.value) ?? null;
  }
  async findByShipmentId(shipmentId: string): Promise<DeliveryEntity | null> {
    for (const e of this.store.values()) if (e.shipmentId === shipmentId) return e;
    return null;
  }
  async findByOrderId(orderId: string): Promise<readonly DeliveryEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.orderId === orderId);
  }
  async findByDriverId(driverId: string): Promise<readonly DeliveryEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.driverId === driverId);
  }
  async findByStatus(status: string): Promise<readonly DeliveryEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByRouteId(routeId: string): Promise<readonly DeliveryEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.routeId === routeId);
  }

  async findPaginated(options: DeliveryListOptions): Promise<DeliveryPaginationResult> {
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

  async getStats(
    driverId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<DeliveryStats> {
    let all = Array.from(this.store.values());
    if (driverId) all = all.filter((e) => e.driverId === driverId);
    if (fromDate) all = all.filter((e) => e.createdAt >= fromDate);
    if (toDate) all = all.filter((e) => e.createdAt <= toDate);

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalDelivered = 0;
    let totalFailed = 0;
    let totalAttempts = 0;

    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      totalAttempts += e.attemptCount;
      if (e.isDelivered()) totalDelivered += 1;
      if (e.isFailed()) totalFailed += 1;
    }

    const successRate =
      all.length > 0 ? (totalDelivered / all.length) * 100 : 0;
    const averageAttempts =
      all.length > 0 ? totalAttempts / all.length : 0;

    return {
      total: all.length,
      totalDelivered,
      totalFailed,
      successRate,
      averageAttempts,
      byStatus,
      byType,
    };
  }

  async findStale(olderThanMinutes: number): Promise<readonly DeliveryEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000).toISOString();
    return Array.from(this.store.values()).filter(
      (e) => e.updatedAt < cutoff && !e.isFinal(),
    );
  }
  async findInTransit(): Promise<readonly DeliveryEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isInTransit() || e.isOutForDelivery());
  }
  async findScheduled(): Promise<readonly DeliveryEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isScheduled() || e.isAssigned());
  }
  async findFailedRetryable(): Promise<readonly DeliveryEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isFailed());
  }

  async softDelete(id: string): Promise<void> {
    this.store.delete(id);
  }

  private applyFilter(
    entities: readonly DeliveryEntity[],
    filter?: DeliveryListFilter,
  ): DeliveryEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.shipmentId && e.shipmentId !== filter.shipmentId) return false;
      if (filter.orderId && e.orderId !== filter.orderId) return false;
      if (filter.userId && e.userId !== filter.userId) return false;
      if (filter.driverId && e.driverId !== filter.driverId) return false;
      if (filter.vehicleId && e.vehicleId !== filter.vehicleId) return false;
      if (filter.routeId && e.routeId !== filter.routeId) return false;
      if (filter.fromDate && e.createdAt < filter.fromDate) return false;
      if (filter.toDate && e.createdAt > filter.toDate) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.shipmentId} ${e.orderId}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly DeliveryEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): DeliveryEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'scheduledAt':
          return ((a.scheduledAt ?? '') < (b.scheduledAt ?? '') ? -1 : 1) * dir;
        case 'deliveredAt':
          return ((a.deliveredAt ?? '') < (b.deliveredAt ?? '') ? -1 : 1) * dir;
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
