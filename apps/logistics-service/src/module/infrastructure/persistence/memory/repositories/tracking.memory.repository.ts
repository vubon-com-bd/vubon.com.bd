/**
 * TrackingMemoryRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import type { TrackingEntity } from '@domain/entities/tracking.entity';
import type {
  TrackingRepository,
  TrackingListFilter,
  TrackingListOptions,
  TrackingPaginationResult,
  TrackingStats,
} from '@domain/repositories/tracking.repository.interface';
import type { TrackingIdVO } from '@domain/primitives/tracking-id.vo';

@Injectable()
export class TrackingMemoryRepository implements TrackingRepository {
  private readonly logger = new Logger(TrackingMemoryRepository.name);
  private readonly store = new Map<string, TrackingEntity>();

  async findById(id: string): Promise<TrackingEntity | null> {
    return this.store.get(id) ?? null;
  }
  async findAll(): Promise<readonly TrackingEntity[]> {
    return Array.from(this.store.values());
  }
  async save(entity: TrackingEntity): Promise<TrackingEntity> {
    this.store.set(entity.id, entity);
    return entity;
  }
  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
  async exists(id: string): Promise<boolean> {
    return this.store.has(id);
  }

  async findByIdVO(id: TrackingIdVO): Promise<TrackingEntity | null> {
    return this.store.get(id.value) ?? null;
  }
  async findByTrackingNumber(trackingNumber: string): Promise<TrackingEntity | null> {
    for (const e of this.store.values()) {
      if (e.trackingNumber.value === trackingNumber) return e;
    }
    return null;
  }
  async findByShipmentId(shipmentId: string): Promise<TrackingEntity | null> {
    for (const e of this.store.values()) if (e.shipmentId === shipmentId) return e;
    return null;
  }
  async findByOrderId(orderId: string): Promise<readonly TrackingEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.orderId === orderId);
  }
  async findByStatus(status: string): Promise<readonly TrackingEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }

  async findPaginated(options: TrackingListOptions): Promise<TrackingPaginationResult> {
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

  async getStats(): Promise<TrackingStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    let totalEvents = 0;
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      bySource[e.source.value] = (bySource[e.source.value] ?? 0) + 1;
      totalEvents += e.eventCount;
    }
    return {
      total: all.length,
      byStatus,
      bySource,
      averageEventCount: all.length > 0 ? totalEvents / all.length : 0,
    };
  }

  async findStale(olderThanMinutes: number): Promise<readonly TrackingEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000).toISOString();
    return Array.from(this.store.values()).filter(
      (e) => e.lastUpdatedAt < cutoff && !e.isFinal(),
    );
  }
  async findExpired(): Promise<readonly TrackingEntity[]> {
    const now = new Date().toISOString();
    return Array.from(this.store.values()).filter(
      (e) => e.expiresAt !== undefined && e.expiresAt < now && !e.isFinal(),
    );
  }

  async existsByTrackingNumber(num: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.trackingNumber.value === num) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> {
    this.store.delete(id);
  }

  private applyFilter(
    entities: readonly TrackingEntity[],
    filter?: TrackingListFilter,
  ): TrackingEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.shipmentId && e.shipmentId !== filter.shipmentId) return false;
      if (filter.orderId && e.orderId !== filter.orderId) return false;
      if (filter.courierCode && e.courierCode !== filter.courierCode) return false;
      if (filter.source && e.source.value !== filter.source) return false;
      if (filter.fromDate && e.createdAt < filter.fromDate) return false;
      if (filter.toDate && e.createdAt > filter.toDate) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.trackingNumber.value} ${e.shipmentId ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly TrackingEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): TrackingEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        case 'lastUpdatedAt':
          return (a.lastUpdatedAt < b.lastUpdatedAt ? -1 : 1) * dir;
        case 'createdAt':
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
