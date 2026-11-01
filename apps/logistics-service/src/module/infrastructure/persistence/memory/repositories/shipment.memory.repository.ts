/**
 * ShipmentMemoryRepository — In-memory implementation
 * @module logistics-service/infrastructure/persistence/memory/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type { ShipmentEntity } from '@domain/entities/shipment.entity';
import type {
  ShipmentRepository,
  ShipmentListFilter,
  ShipmentListOptions,
  ShipmentPaginationResult,
  ShipmentStats,
} from '@domain/repositories/shipment.repository.interface';
import type { ShipmentIdVO } from '@domain/primitives/shipment-id.vo';

@Injectable()
export class ShipmentMemoryRepository implements ShipmentRepository {
  private readonly logger = new Logger(ShipmentMemoryRepository.name);
  private static readonly STORE = new Map<string, ShipmentEntity>();
  private static readonly IDEMPOTENCY_INDEX = new Map<string, string>();

  // ═══ Base ═══
  async findById(id: string): Promise<ShipmentEntity | null> {
    return ShipmentMemoryRepository.STORE.get(id) ?? null;
  }
  async findAll(): Promise<readonly ShipmentEntity[]> {
    return Array.from(ShipmentMemoryRepository.STORE.values());
  }
  async save(entity: ShipmentEntity): Promise<ShipmentEntity> {
    ShipmentMemoryRepository.STORE.set(entity.id, entity);
    this.logger.debug(`saved shipment ${entity.id}`);
    return entity;
  }
  async delete(id: string): Promise<void> {
    ShipmentMemoryRepository.STORE.delete(id);
  }
  async exists(id: string): Promise<boolean> {
    return ShipmentMemoryRepository.STORE.has(id);
  }

  // ═══ Specialized ═══
  async findByIdVO(id: ShipmentIdVO): Promise<ShipmentEntity | null> {
    return ShipmentMemoryRepository.STORE.get(id.value) ?? null;
  }
  async findByShipmentNumber(n: string): Promise<ShipmentEntity | null> {
    for (const e of ShipmentMemoryRepository.STORE.values()) {
      if (e.shipmentNumber.value === n) return e;
    }
    return null;
  }
  async findByTrackingNumber(t: string): Promise<ShipmentEntity | null> {
    for (const e of ShipmentMemoryRepository.STORE.values()) {
      if (e.trackingNumber === t) return e;
    }
    return null;
  }
  async findByOrderId(orderId: string): Promise<readonly ShipmentEntity[]> {
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter((e) => e.orderId === orderId);
  }
  async findByCourierId(courierId: string): Promise<readonly ShipmentEntity[]> {
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter((e) => e.courierId === courierId);
  }
  async findByWarehouseId(warehouseId: string): Promise<readonly ShipmentEntity[]> {
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter((e) => e.warehouseId === warehouseId);
  }
  async findByUserId(userId: string): Promise<readonly ShipmentEntity[]> {
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter((e) => e.userId === userId);
  }
  async findByStatus(status: string): Promise<readonly ShipmentEntity[]> {
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter((e) => e.status.value === status);
  }
  async findByVendorId(vendorId: string): Promise<readonly ShipmentEntity[]> {
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter((e) => e.vendorId === vendorId);
  }

  async findByIdempotencyKey(key: { value: string }): Promise<ShipmentEntity | null> {
    const id = ShipmentMemoryRepository.IDEMPOTENCY_INDEX.get(key.value);
    return id ? ShipmentMemoryRepository.STORE.get(id) ?? null : null;
  }

  // ═══ Pagination ═══
  async findPaginated(options: ShipmentListOptions): Promise<ShipmentPaginationResult> {
    const filtered = this.applyFilter(Array.from(ShipmentMemoryRepository.STORE.values()), options.filter);
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

  // ═══ Stats ═══
  async getStats(
    warehouseId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<ShipmentStats> {
    let all = Array.from(ShipmentMemoryRepository.STORE.values());
    if (warehouseId) all = all.filter((e) => e.warehouseId === warehouseId);
    if (fromDate) all = all.filter((e) => e.createdAt >= fromDate);
    if (toDate) all = all.filter((e) => e.createdAt <= toDate);

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    let totalRevenue = 0;
    let totalCOD = 0;
    let totalWeight = 0;
    let weightCount = 0;
    let totalItems = 0;
    let currency = 'BDT';

    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      byPriority[e.priority.value] = (byPriority[e.priority.value] ?? 0) + 1;
      totalRevenue += e.shippingCost ?? 0;
      totalCOD += e.codAmount ?? 0;
      totalItems += e.itemCount;
      if (e.totalWeightKg !== undefined) {
        totalWeight += e.totalWeightKg;
        weightCount += 1;
      }
      if (e.currency) currency = e.currency;
    }

    return {
      total: all.length,
      totalRevenue,
      totalCOD,
      currency,
      byStatus,
      byType,
      byPriority,
      averageWeightKg: weightCount > 0 ? totalWeight / weightCount : 0,
      averageItemCount: all.length > 0 ? totalItems / all.length : 0,
    };
  }

  // ═══ Cron ═══
  async findStale(olderThanMinutes: number): Promise<readonly ShipmentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000).toISOString();
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter(
      (e) => e.updatedAt < cutoff && !e.isFinal(),
    );
  }
  async findPendingOlderThan(olderThanMinutes: number): Promise<readonly ShipmentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000).toISOString();
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter(
      (e) => e.isPending() && e.createdAt < cutoff,
    );
  }
  async findInTransit(): Promise<readonly ShipmentEntity[]> {
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter((e) => e.isInTransit());
  }
  async findDelayed(): Promise<readonly ShipmentEntity[]> {
    const now = new Date().toISOString();
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter(
      (e) =>
        !e.isFinal() &&
        e.estimatedDeliveryAt !== undefined &&
        e.estimatedDeliveryAt < now,
    );
  }
  async findRetryable(maxAttempts: number): Promise<readonly ShipmentEntity[]> {
    return Array.from(ShipmentMemoryRepository.STORE.values()).filter((e) => e.isFailed());
  }

  // ═══ Soft delete ═══
  async softDelete(id: string, deletedBy?: string): Promise<void> {
    ShipmentMemoryRepository.STORE.delete(id);
    for (const [key, val] of ShipmentMemoryRepository.IDEMPOTENCY_INDEX) {
      if (val === id) ShipmentMemoryRepository.IDEMPOTENCY_INDEX.delete(key);
    }
  }

  // ═══ Existence ═══
  async existsByShipmentNumber(n: string): Promise<boolean> {
    for (const e of ShipmentMemoryRepository.STORE.values()) {
      if (e.shipmentNumber.value === n) return true;
    }
    return false;
  }
  async existsByTrackingNumber(t: string): Promise<boolean> {
    for (const e of ShipmentMemoryRepository.STORE.values()) {
      if (e.trackingNumber === t) return true;
    }
    return false;
  }

  // ═══ Helpers ═══
  private applyFilter(
    entities: readonly ShipmentEntity[],
    filter?: ShipmentListFilter,
  ): ShipmentEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.priority && e.priority.value !== filter.priority) return false;
      if (filter.orderId && e.orderId !== filter.orderId) return false;
      if (filter.userId && e.userId !== filter.userId) return false;
      if (filter.vendorId && e.vendorId !== filter.vendorId) return false;
      if (filter.warehouseId && e.warehouseId !== filter.warehouseId) return false;
      if (filter.courierId && e.courierId !== filter.courierId) return false;
      if (filter.isCOD !== undefined && e.isCOD !== filter.isCOD) return false;
      if (filter.isInsured !== undefined && e.isInsured !== filter.isInsured) return false;
      if (filter.fromDate && e.createdAt < filter.fromDate) return false;
      if (filter.toDate && e.createdAt > filter.toDate) return false;
      if (filter.minWeightKg !== undefined) {
        if ((e.totalWeightKg ?? 0) < filter.minWeightKg) return false;
      }
      if (filter.maxWeightKg !== undefined) {
        if ((e.totalWeightKg ?? 0) > filter.maxWeightKg) return false;
      }
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay =
          `${e.shipmentNumber.value} ${e.trackingNumber} ${e.orderId ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly ShipmentEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): ShipmentEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return (a.priority.rank - b.priority.rank) * dir;
        case 'estimatedDeliveryAt':
          return ((a.estimatedDeliveryAt ?? '') < (b.estimatedDeliveryAt ?? '') ? -1 : 1) * dir;
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
