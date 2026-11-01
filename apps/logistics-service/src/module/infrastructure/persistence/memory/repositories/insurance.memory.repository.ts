import { Injectable, Logger } from '@nestjs/common';
import type { InsuranceEntity } from '@domain/entities/insurance.entity';
import type {
  InsuranceRepository,
  InsuranceListFilter,
  InsuranceListOptions,
  InsurancePaginationResult,
  InsuranceStats,
} from '@domain/repositories/insurance.repository.interface';
import type { InsuranceIdVO } from '@domain/primitives/insurance-id.vo';

@Injectable()
export class InsuranceMemoryRepository implements InsuranceRepository {
  private readonly logger = new Logger(InsuranceMemoryRepository.name);
  private readonly store = new Map<string, InsuranceEntity>();

  async findById(id: string): Promise<InsuranceEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly InsuranceEntity[]> { return Array.from(this.store.values()); }
  async save(entity: InsuranceEntity): Promise<InsuranceEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: InsuranceIdVO): Promise<InsuranceEntity | null> { return this.store.get(id.value) ?? null; }
  async findByPolicyNumber(policy: string): Promise<InsuranceEntity | null> {
    for (const e of this.store.values()) if (e.policyNumber === policy) return e;
    return null;
  }
  async findByShipmentId(shipmentId: string): Promise<InsuranceEntity | null> {
    for (const e of this.store.values()) if (e.shipmentId === shipmentId) return e;
    return null;
  }
  async findByOrderId(orderId: string): Promise<readonly InsuranceEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.orderId === orderId);
  }
  async findByUserId(userId: string): Promise<readonly InsuranceEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.userId === userId);
  }
  async findByStatus(status: string): Promise<readonly InsuranceEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.status.value === status);
  }
  async findClaimable(): Promise<readonly InsuranceEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isClaimable());
  }
  async findExpiringWithinDays(days: number): Promise<readonly InsuranceEntity[]> {
    const cutoff = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
    return Array.from(this.store.values()).filter(
      (e) => e.expiresAt < cutoff && !e.isFinal(),
    );
  }

  async findPaginated(options: InsuranceListOptions): Promise<InsurancePaginationResult> {
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

  async getStats(): Promise<InsuranceStats> {
    const all = Array.from(this.store.values());
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalInsured = 0;
    let totalPremium = 0;
    let claimCount = 0;
    let currency = 'BDT';
    for (const e of all) {
      byStatus[e.status.value] = (byStatus[e.status.value] ?? 0) + 1;
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      totalInsured += e.declaredValue;
      totalPremium += e.premium;
      claimCount += e.claimCount;
      if (e.currency) currency = e.currency;
    }
    return {
      total: all.length,
      byStatus,
      byType,
      totalInsured,
      totalPremium,
      currency,
      claimCount,
      claimRate: all.length > 0 ? (claimCount / all.length) * 100 : 0,
    };
  }

  async existsByPolicyNumber(policy: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.policyNumber === policy) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly InsuranceEntity[],
    filter?: InsuranceListFilter,
  ): InsuranceEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.status && e.status.value !== filter.status) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.shipmentId && e.shipmentId !== filter.shipmentId) return false;
      if (filter.orderId && e.orderId !== filter.orderId) return false;
      if (filter.userId && e.userId !== filter.userId) return false;
      if (filter.isClaimed !== undefined && e.isClaimed !== filter.isClaimed) return false;
      if (filter.minValue !== undefined && e.declaredValue < filter.minValue) return false;
      if (filter.maxValue !== undefined && e.declaredValue > filter.maxValue) return false;
      if (filter.fromDate && e.createdAt < filter.fromDate) return false;
      if (filter.toDate && e.createdAt > filter.toDate) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.policyNumber} ${e.shipmentId ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly InsuranceEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): InsuranceEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'declaredValue':
          return (a.declaredValue - b.declaredValue) * dir;
        case 'expiresAt':
          return (a.expiresAt < b.expiresAt ? -1 : 1) * dir;
        case 'updatedAt':
          return (a.updatedAt < b.updatedAt ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
