/**
 * SavedForLaterPrismaRepository
 * @module cart-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';

import {
  SAVED_FOR_LATER_REPOSITORY,
  type SavedForLaterRepository,
  type SavedForLaterListOptions,
  type SavedForLaterPaginationResult,
  type SavedForLaterStats,
  type SavedForLaterListFilter,
} from '../../../../domain/repositories/saved-for-later.repository.interface.js';
import { SavedForLaterEntity } from '../../../../domain/entities/saved-for-later.entity.js';
import { SavedItemIdVO } from '../../../../domain/value-objects/primitives/saved-item-id.vo.js';
import { CartPrismaService } from '../prisma.service.js';
import {
  SavedItemPrismaMapper,
  type PrismaSavedItemRow,
} from '../mappers/saved-item.prisma.mapper.js';

interface PrismaSavedDelegate {
  findFirst(args: unknown): Promise<PrismaSavedItemRow | null>;
  findUnique(args: unknown): Promise<PrismaSavedItemRow | null>;
  findMany(args: unknown): Promise<PrismaSavedItemRow[]>;
  create(args: unknown): Promise<PrismaSavedItemRow>;
  update(args: unknown): Promise<PrismaSavedItemRow>;
  delete(args: unknown): Promise<PrismaSavedItemRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class SavedForLaterPrismaRepository implements SavedForLaterRepository {
  constructor(private readonly prisma: CartPrismaService) {}

  private get delegate(): PrismaSavedDelegate {
    return this.prisma.getModel<PrismaSavedDelegate>('savedItem');
  }

  async findById(id: string): Promise<SavedForLaterEntity | null> {
    return this.findByIdVO(SavedItemIdVO.reconstitute(id));
  }

  async findByIdVO(id: SavedItemIdVO): Promise<SavedForLaterEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? SavedItemPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SavedForLaterEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SavedItemPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id, deletedAt: null } })) > 0;
  }

  async findByUserId(userId: string): Promise<readonly SavedForLaterEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SavedItemPrismaMapper.toDomain(r));
  }

  async findActiveByUserId(userId: string): Promise<readonly SavedForLaterEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, status: 'active', deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SavedItemPrismaMapper.toDomain(r));
  }

  async findByUserAndProduct(
    userId: string,
    productId: string,
    variantId?: string,
  ): Promise<SavedForLaterEntity | null> {
    const raw = await this.delegate.findFirst({
      where: {
        userId,
        productId,
        variantId: variantId ?? null,
        deletedAt: null,
      },
    });
    return raw ? SavedItemPrismaMapper.toDomain(raw) : null;
  }

  async existsForUser(
    userId: string,
    productId: string,
    variantId?: string,
  ): Promise<boolean> {
    const count = await this.delegate.count({
      where: { userId, productId, variantId: variantId ?? null },
    });
    return count > 0;
  }

  async findByStatus(status: string): Promise<readonly SavedForLaterEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => SavedItemPrismaMapper.toDomain(r));
  }

  async findMovedToCart(): Promise<readonly SavedForLaterEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'moved_to_cart' },
    });
    return rows.map((r) => SavedItemPrismaMapper.toDomain(r));
  }

  async findPaginated(
    options: SavedForLaterListOptions,
  ): Promise<SavedForLaterPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = { [options.sortBy ?? 'savedAt']: options.sortDir ?? 'desc' };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map((r) => SavedItemPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(filter?: SavedForLaterListFilter): Promise<SavedForLaterStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter?.userId) where['userId'] = filter.userId;

    const rows = await this.delegate.findMany({ where } as unknown as { where: unknown });
    const byStatus: Record<string, number> = {};
    let activeCount = 0;
    let movedCount = 0;

    for (const r of rows as unknown as PrismaSavedItemRow[]) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      if (r.status === 'active') activeCount += 1;
      if (r.status === 'moved_to_cart') movedCount += 1;
    }

    return {
      total: rows.length,
      activeCount,
      movedCount,
      byStatus,
    };
  }

  async findStale(inactiveDays: number): Promise<readonly SavedForLaterEntity[]> {
    const cutoff = new Date(Date.now() - inactiveDays * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: { status: 'active', updatedAt: { lt: cutoff }, deletedAt: null },
    });
    return rows.map((r) => SavedItemPrismaMapper.toDomain(r));
  }

  async findPurgeable(olderThanDays: number): Promise<readonly SavedForLaterEntity[]> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: { status: 'removed', updatedAt: { lt: cutoff } },
    });
    return rows.map((r) => SavedItemPrismaMapper.toDomain(r));
  }

  async deleteByUserId(userId: string): Promise<number> {
    const count = await this.delegate.count({ where: { userId } });
    await this.delegate.update({
      where: { userId } as unknown as { id: string },
      data: { deletedAt: new Date() },
    } as unknown as { where: { id: string }; data: unknown });
    return count;
  }

  async bulkUpdateStatus(ids: readonly string[], status: string): Promise<number> {
    let count = 0;
    for (const id of ids) {
      await this.delegate.update({ where: { id }, data: { status } });
      count += 1;
    }
    return count;
  }

  async save(entity: SavedForLaterEntity): Promise<SavedForLaterEntity> {
    const data = SavedItemPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as unknown as { where: unknown });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return SavedItemPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return SavedItemPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  private buildWhere(options: SavedForLaterListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.userId) where['userId'] = f.userId;
    if (f.productId) where['productId'] = f.productId;
    if (f.status) where['status'] = f.status;
    return where;
  }
}

export { SAVED_FOR_LATER_REPOSITORY };
