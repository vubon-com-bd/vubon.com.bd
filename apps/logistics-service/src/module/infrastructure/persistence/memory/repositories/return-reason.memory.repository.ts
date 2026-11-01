import { Injectable, Logger } from '@nestjs/common';
import type { ReturnReasonEntity } from '@domain/entities/return-reason.entity';
import type {
  ReturnReasonRepository,
  ReturnReasonListFilter,
  ReturnReasonListOptions,
  ReturnReasonPaginationResult,
  ReturnReasonStats,
} from '@domain/repositories/return-reason.repository.interface';
import type { ReturnReasonIdVO } from '@domain/primitives/return-reason-id.vo';

@Injectable()
export class ReturnReasonMemoryRepository implements ReturnReasonRepository {
  private readonly logger = new Logger(ReturnReasonMemoryRepository.name);
  private readonly store = new Map<string, ReturnReasonEntity>();

  async findById(id: string): Promise<ReturnReasonEntity | null> { return this.store.get(id) ?? null; }
  async findAll(): Promise<readonly ReturnReasonEntity[]> { return Array.from(this.store.values()); }
  async save(entity: ReturnReasonEntity): Promise<ReturnReasonEntity> { this.store.set(entity.id, entity); return entity; }
  async delete(id: string): Promise<void> { this.store.delete(id); }
  async exists(id: string): Promise<boolean> { return this.store.has(id); }

  async findByIdVO(id: ReturnReasonIdVO): Promise<ReturnReasonEntity | null> { return this.store.get(id.value) ?? null; }
  async findByCode(code: string): Promise<ReturnReasonEntity | null> {
    for (const e of this.store.values()) if (e.code === code) return e;
    return null;
  }
  async findByType(type: string): Promise<readonly ReturnReasonEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.type.value === type);
  }
  async findActive(): Promise<readonly ReturnReasonEntity[]> {
    return Array.from(this.store.values()).filter((e) => e.isActive);
  }

  async findPaginated(options: ReturnReasonListOptions): Promise<ReturnReasonPaginationResult> {
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

  async getStats(): Promise<ReturnReasonStats> {
    const all = Array.from(this.store.values());
    const byCategory: Record<string, number> = {};
    let activeCount = 0;
    for (const e of all) {
      byCategory[e.type.faultCategory] = (byCategory[e.type.faultCategory] ?? 0) + 1;
      if (e.isActive) activeCount += 1;
    }
    return { total: all.length, activeCount, byCategory };
  }

  async existsByCode(code: string): Promise<boolean> {
    for (const e of this.store.values()) if (e.code === code) return true;
    return false;
  }
  async softDelete(id: string): Promise<void> { this.store.delete(id); }

  private applyFilter(
    entities: readonly ReturnReasonEntity[],
    filter?: ReturnReasonListFilter,
  ): ReturnReasonEntity[] {
    if (!filter) return [...entities];
    return entities.filter((e) => {
      if (filter.isActive !== undefined && e.isActive !== filter.isActive) return false;
      if (filter.type && e.type.value !== filter.type) return false;
      if (filter.faultCategory && e.type.faultCategory !== filter.faultCategory) return false;
      if (filter.requiresPhoto !== undefined && e.requiresPhoto !== filter.requiresPhoto) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        const hay = `${e.code} ${e.label.en} ${e.label.bn ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  private applySort(
    entities: readonly ReturnReasonEntity[],
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): ReturnReasonEntity[] {
    const arr = [...entities];
    const dir = sortDir === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return (a.priority - b.priority) * dir;
        case 'code':
          return (a.code < b.code ? -1 : 1) * dir;
        default:
          return (a.createdAt < b.createdAt ? -1 : 1) * dir;
      }
    });
    return arr;
  }
}
