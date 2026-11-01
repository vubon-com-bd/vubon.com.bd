import { Injectable, Logger } from '@nestjs/common';
import type { ReturnShipmentEntity } from '@domain/entities/return-shipment.entity';
import type {
  ReturnShipmentRepository,
  ReturnShipmentListFilter,
  ReturnShipmentListOptions,
  ReturnShipmentPaginationResult,
  ReturnShipmentStats,
} from '@domain/repositories/return-shipment.repository.interface';
import type { ReturnShipmentIdVO } from '@domain/primitives/return-shipment-id.vo';

@Injectable()
export class ReturnShipmentMemoryRepository implements ReturnShipmentRepository {
  private readonly logger = new Logger(ReturnShipmentMemoryRepository.name);
  private readonly store = new Map<string, ReturnShipmentEntity>();

  async findById(id: string): Promise<ReturnShipmentEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly ReturnShipmentEntity[]> { return Array.from(this.store.values()); }
  async save(entity: ReturnShipmentEntity): Promise<ReturnShipmentEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: ReturnShipmentIdVO): Promise<ReturnShipmentEntity | null> { return this.store.get(id.value) ?? null; }
  async findByRmaNumber(rma: string): Promise<ReturnShipmentEntity | null> {
    for (const e of this.store.values()) if (e.rmaNumber === rma) return e;
    return null;
  }
  async findByStatus(status: string): Promise<readonly ReturnShipmentEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findByOrderId(orderId: string): Promise<readonly ReturnShipmentEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.orderId === orderId);
  }
  async findByUserId(userId: string): Promise<readonly ReturnShipmentEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.userId === userId);
  }
  async findByOriginalShipmentId(shipmentId: string): Promise<readonly ReturnShipmentEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.originalShipmentId === shipmentId);
  }
  async findPendingApproval(): Promise<readonly ReturnShipmentEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isRequested());
  }

  async findPaginated(options: ReturnShipmentListOptions): Promise<ReturnShipmentPaginationResult> {
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

  async getStats(): Promise<ReturnShipmentStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byReason: Record<string, number> = {};
    let totalRefunded = 0;
    let refundedCount = 0;
    let currency = 'BDT';
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      byReason[e.reason.value] = (byReason[e.reason.value] ?? 0) + 1;
      if (e.refundAmount !== undefined) {
        totalRefunded += e.refundAmount;
        refundedCount += 1;
      }
      if (e.refundCurrency) currency = e.refundCurrency;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      byReason,
      totalRefunded,
      currency,
      averageRefund: refundedCount > 0 ? totalRefunded / refundedCount : 0,
    };
  }

  async findStale(olderThanMinutes: number): Promise<readonly ReturnShipmentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000).toISOString();
    return Array.from(this.store.values()).filter(
      (e) => e.updatedAt < cutoff && !e.isFinal(),
    );
  }
  async existsByRmaNumber(rma: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.rmaNumber === rma) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly ReturnShipmentEntity[],
    filter?: ReturnShipmentListFilter,
  ): ReturnShipmentEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.reason && e.reason.value !== filter.reason) return false;
      if (filter.orderId && e.orderId !== filter.orderId) return false;
      if (filter.userId && e.userId !== filter.userId) return false;
      if (filter.fromDate && e.createdAt < filter.fromDate) return false;
      if (filter.toDate && e.createdAt > filter.toDate) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.rmaNumber} ${e.orderId}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly ReturnShipmentEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): ReturnShipmentEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'refundAmount':
          return ((a.refundAmount ?? 0) - (b.refundAmount ?? 0)) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
