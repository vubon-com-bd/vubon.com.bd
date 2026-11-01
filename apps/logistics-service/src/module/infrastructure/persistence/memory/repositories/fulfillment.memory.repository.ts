import { Injectable, Logger } from '@nestjs/common';
import type { FulfillmentEntity } from '@domain/entities/fulfillment.entity';
import type {
  FulfillmentRepository,
  FulfillmentListFilter,
  FulfillmentListOptions,
  FulfillmentPaginationResult,
  FulfillmentStats,
} from '@domain/repositories/fulfillment.repository.interface';
import type { FulfillmentIdVO } from '@domain/primitives/fulfillment-id.vo';

@Injectable()
export class FulfillmentMemoryRepository implements FulfillmentRepository {
  private readonly logger = new Logger(FulfillmentMemoryRepository.name);
  private readonly store = new Map<string, FulfillmentEntity>();

  async findById(id: string): Promise<FulfillmentEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly FulfillmentEntity[]> { return Array.from(this.store.values()); }
  async save(entity: FulfillmentEntity): Promise<FulfillmentEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: FulfillmentIdVO): Promise<FulfillmentEntity | null> { return this.store.get(id.value) ?? null; }
  async findByOrderId(orderId: string): Promise<readonly FulfillmentEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.orderId === orderId);
  }
  async findByVendorId(vendorId: string): Promise<readonly FulfillmentEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.vendorId === vendorId);
  }
  async findByWarehouseId(warehouseId: string): Promise<readonly FulfillmentEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.warehouseId === warehouseId);
  }
  async findByStatus(status: string): Promise<readonly FulfillmentEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findPendingByPriority(): Promise<readonly FulfillmentEntity[]> {
    return Array.from(this.store.values())
      .filter((e) => e.isPending())
      .sort((a, b) => b.priority.rank - a.priority.rank);
  }

  async findPaginated(options: FulfillmentListOptions): Promise<FulfillmentPaginationResult> {
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

  async getStats(): Promise<FulfillmentStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    let totalItems = 0;
    let slaBreached = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      byPriority[e.priority.value] = (byPriority[e.priority.value] ?? 0) + 1;
      totalItems += e.itemCount;
      if (e.isSlaBreached()) slaBreached += 1;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      byPriority,
      averageItemCount: all.length > 0 ? totalItems / all.length : 0,
      slaBreachedCount: slaBreached,
    };
  }

  async findSlaBreached(): Promise<readonly FulfillmentEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isSlaBreached());
  }
  async findStale(olderThanMinutes: number): Promise<readonly FulfillmentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000).toISOString();
    return Array.from(this.store.values()).filter(
      (e) => e.updatedAt < cutoff && !e.isFinal(),
    );
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly FulfillmentEntity[],
    filter?: FulfillmentListFilter,
  ): FulfillmentEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.priority && e.priority.value !== filter.priority) return false;
      if (filter.orderId && e.orderId !== filter.orderId) return false;
      if (filter.vendorId && e.vendorId !== filter.vendorId) return false;
      if (filter.warehouseId && e.warehouseId !== filter.warehouseId) return false;
      if (filter.assignedTo && e.assignedTo !== filter.assignedTo) return false;
      if (filter.fromDate && e.createdAt < filter.fromDate) return false;
      if (filter.toDate && e.createdAt > filter.toDate) return false;
      if (filter.slaBreached === true && !e.isSlaBreached()) return false;
      if (filter.slaBreached === false && e.isSlaBreached()) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.id} ${e.orderId}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly FulfillmentEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): FulfillmentEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return (a.priority.rank - b.priority.rank) * dir;
        case 'slaDueAt':
          return ((a.slaDueAt ?? '') < (b.slaDueAt ?? '') ? -1 : 1) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
