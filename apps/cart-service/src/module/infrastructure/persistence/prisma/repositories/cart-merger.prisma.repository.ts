/**
 * CartMergerPrismaRepository
 * @module cart-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';

import {
  CART_MERGER_REPOSITORY,
  type CartMergerRepository,
  type CartMergerListOptions,
  type CartMergerPaginationResult,
  type CartMergerStats,
  type CartMergerListFilter,
} from '../../../../domain/repositories/cart-merger.repository.interface.js';
import { CartMergerEntity } from '../../../../domain/entities/cart-merger.entity.js';
import { CartMergerIdVO } from '../../../../domain/value-objects/primitives/cart-merger-id.vo.js';
import { CartPrismaService } from '../prisma.service.js';
import {
  CartMergerPrismaMapper,
  type PrismaCartMergerRow,
} from '../mappers/cart-merger.prisma.mapper.js';

interface PrismaMergerDelegate {
  findFirst(args: unknown): Promise<PrismaCartMergerRow | null>;
  findUnique(args: unknown): Promise<PrismaCartMergerRow | null>;
  findMany(args: unknown): Promise<PrismaCartMergerRow[]>;
  create(args: unknown): Promise<PrismaCartMergerRow>;
  update(args: unknown): Promise<PrismaCartMergerRow>;
  delete(args: unknown): Promise<PrismaCartMergerRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class CartMergerPrismaRepository implements CartMergerRepository {
  constructor(private readonly prisma: CartPrismaService) {}

  private get delegate(): PrismaMergerDelegate {
    return this.prisma.getModel<PrismaMergerDelegate>('cartMerger');
  }

  async findById(id: string): Promise<CartMergerEntity | null> {
    return this.findByIdVO(CartMergerIdVO.reconstitute(id));
  }

  async findByIdVO(id: CartMergerIdVO): Promise<CartMergerEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id: id.value } });
    return raw ? CartMergerPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CartMergerEntity[]> {
    const rows = await this.delegate.findMany({
      orderBy: { mergedAt: 'desc' },
    });
    return rows.map((r) => CartMergerPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }

  async findBySourceCartId(sourceCartId: string): Promise<readonly CartMergerEntity[]> {
    const rows = await this.delegate.findMany({
      where: { sourceCartId },
      orderBy: { mergedAt: 'desc' },
    });
    return rows.map((r) => CartMergerPrismaMapper.toDomain(r));
  }

  async findByTargetCartId(targetCartId: string): Promise<readonly CartMergerEntity[]> {
    const rows = await this.delegate.findMany({
      where: { targetCartId },
      orderBy: { mergedAt: 'desc' },
    });
    return rows.map((r) => CartMergerPrismaMapper.toDomain(r));
  }

  async findByCartId(cartId: string): Promise<readonly CartMergerEntity[]> {
    const rows = await this.delegate.findMany({
      where: { OR: [{ sourceCartId: cartId }, { targetCartId: cartId }] },
      orderBy: { mergedAt: 'desc' },
    });
    return rows.map((r) => CartMergerPrismaMapper.toDomain(r));
  }

  async findCompleted(): Promise<readonly CartMergerEntity[]> {
    const rows = await this.delegate.findMany({
      where: { itemsMerged: { gt: 0 } },
      orderBy: { mergedAt: 'desc' },
    });
    return rows.map((r) => CartMergerPrismaMapper.toDomain(r));
  }

  async findFailed(): Promise<readonly CartMergerEntity[]> {
    return [];
  }

  async findWithConflicts(): Promise<readonly CartMergerEntity[]> {
    const rows = await this.delegate.findMany({
      where: { conflicts: { gt: 0 } },
      orderBy: { mergedAt: 'desc' },
    });
    return rows.map((r) => CartMergerPrismaMapper.toDomain(r));
  }

  async findIncomplete(): Promise<readonly CartMergerEntity[]> {
    const rows = await this.delegate.findMany({ where: { itemsMerged: 0 } });
    return rows.map((r) => CartMergerPrismaMapper.toDomain(r));
  }

  async findPaginated(
    options: CartMergerListOptions,
  ): Promise<CartMergerPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = { [options.sortBy ?? 'mergedAt']: options.sortDir ?? 'desc' };

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
      items: rows.map((r) => CartMergerPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(filter?: CartMergerListFilter): Promise<CartMergerStats> {
    const where: Record<string, unknown> = {};
    if (filter?.sourceCartId) where['sourceCartId'] = filter.sourceCartId;
    if (filter?.targetCartId) where['targetCartId'] = filter.targetCartId;
    if (filter?.strategy) where['strategy'] = filter.strategy;

    const rows = (await this.delegate.findMany({ where } as unknown as {
      where: unknown;
    })) as unknown as PrismaCartMergerRow[];

    let completedCount = 0;
    let totalItemsMerged = 0;
    let totalConflicts = 0;
    const byStrategy: Record<string, number> = {};

    for (const r of rows) {
      if (r.itemsMerged > 0) completedCount += 1;
      totalItemsMerged += r.itemsMerged;
      totalConflicts += r.conflicts;
      byStrategy[r.strategy] = (byStrategy[r.strategy] ?? 0) + 1;
    }

    const count = rows.length;
    return {
      total: count,
      completedCount,
      failedCount: 0,
      totalItemsMerged,
      totalConflicts,
      successRate: count ? Math.round((completedCount / count) * 10000) / 100 : 0,
      byStrategy,
    };
  }

  async findStale(inactiveMinutes: number): Promise<readonly CartMergerEntity[]> {
    const cutoff = new Date(Date.now() - inactiveMinutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: { itemsMerged: 0, mergedAt: { lt: cutoff } },
    });
    return rows.map((r) => CartMergerPrismaMapper.toDomain(r));
  }

  async save(entity: CartMergerEntity): Promise<CartMergerEntity> {
    const data = CartMergerPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as unknown as { where: unknown });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return CartMergerPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return CartMergerPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(_id: string, _deletedBy?: string): Promise<void> {
    // CartMerger has no soft-delete column
  }

  async restore(_id: string): Promise<void> {
    // N/A
  }

  private buildWhere(options: CartMergerListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = {};
    if (f.sourceCartId) where['sourceCartId'] = f.sourceCartId;
    if (f.targetCartId) where['targetCartId'] = f.targetCartId;
    if (f.strategy) where['strategy'] = f.strategy;
    return where;
  }
}

export { CART_MERGER_REPOSITORY };
