/**
 * AbandonedCartPrismaRepository
 * @module cart-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';

import {
  ABANDONED_CART_REPOSITORY,
  type AbandonedCartRepository,
  type AbandonedCartListOptions,
  type AbandonedCartPaginationResult,
  type AbandonedCartStats,
  type AbandonedCartListFilter,
} from '../../../../domain/repositories/abandoned-cart.repository.interface.js';
import { AbandonedCartEntity } from '../../../../domain/entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '../../../../domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { CartPrismaService } from '../prisma.service.js';
import {
  AbandonedCartPrismaMapper,
  type PrismaAbandonedCartRow,
} from '../mappers/abandoned-cart.prisma.mapper.js';

interface PrismaAbandonedDelegate {
  findFirst(args: unknown): Promise<PrismaAbandonedCartRow | null>;
  findUnique(args: unknown): Promise<PrismaAbandonedCartRow | null>;
  findMany(args: unknown): Promise<PrismaAbandonedCartRow[]>;
  create(args: unknown): Promise<PrismaAbandonedCartRow>;
  update(args: unknown): Promise<PrismaAbandonedCartRow>;
  delete(args: unknown): Promise<PrismaAbandonedCartRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class AbandonedCartPrismaRepository implements AbandonedCartRepository {
  constructor(private readonly prisma: CartPrismaService) {}

  private get delegate(): PrismaAbandonedDelegate {
    return this.prisma.getModel<PrismaAbandonedDelegate>('abandonedCart');
  }

  async findById(id: string): Promise<AbandonedCartEntity | null> {
    return this.findByIdVO(AbandonedCartIdVO.reconstitute(id));
  }

  async findByIdVO(id: AbandonedCartIdVO): Promise<AbandonedCartEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? AbandonedCartPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AbandonedCartEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { abandonedAt: 'desc' },
    });
    return rows.map((r) => AbandonedCartPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }

  async findByCartId(cartId: string): Promise<AbandonedCartEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { cartId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? AbandonedCartPrismaMapper.toDomain(raw) : null;
  }

  async findByUserId(userId: string): Promise<readonly AbandonedCartEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, deletedAt: null },
      orderBy: { abandonedAt: 'desc' },
    });
    return rows.map((r) => AbandonedCartPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly AbandonedCartEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { abandonedAt: 'desc' },
    });
    return rows.map((r) => AbandonedCartPrismaMapper.toDomain(r));
  }

  async findPendingReminders(maxReminders: number): Promise<readonly AbandonedCartEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: { in: ['pending', 'reminded'] },
        remindersSent: { lt: maxReminders },
        deletedAt: null,
      },
      orderBy: { abandonedAt: 'asc' },
    });
    return rows.map((r) => AbandonedCartPrismaMapper.toDomain(r));
  }

  async findLostCandidates(olderThanDays: number): Promise<readonly AbandonedCartEntity[]> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: { status: { in: ['pending', 'reminded'] }, abandonedAt: { lt: cutoff } },
    });
    return rows.map((r) => AbandonedCartPrismaMapper.toDomain(r));
  }

  async findRecoverable(): Promise<readonly AbandonedCartEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: { in: ['pending', 'reminded'] }, deletedAt: null },
    });
    return rows.map((r) => AbandonedCartPrismaMapper.toDomain(r));
  }

  async findRecovered(): Promise<readonly AbandonedCartEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'recovered' },
    });
    return rows.map((r) => AbandonedCartPrismaMapper.toDomain(r));
  }

  async findPaginated(
    options: AbandonedCartListOptions,
  ): Promise<AbandonedCartPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = { [options.sortBy ?? 'abandonedAt']: options.sortDir ?? 'desc' };

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
      items: rows.map((r) => AbandonedCartPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(filter?: AbandonedCartListFilter): Promise<AbandonedCartStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter?.userId) where['userId'] = filter.userId;

    const rows = (await this.delegate.findMany({ where } as unknown as {
      where: unknown;
    })) as unknown as PrismaAbandonedCartRow[];

    const byStatus: Record<string, number> = {};
    let totalValue = 0;
    let recoveredCount = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      totalValue += Number(r.cartValue);
      if (r.status === 'recovered') recoveredCount += 1;
    }

    const count = rows.length;
    return {
      total: count,
      totalValue: Math.round(totalValue * 100) / 100,
      averageValue: count ? Math.round((totalValue / count) * 100) / 100 : 0,
      recoveredCount,
      recoveryRate: count ? Math.round((recoveredCount / count) * 10000) / 100 : 0,
      byStatus,
    };
  }

  async bulkUpdateStatus(ids: readonly string[], status: string): Promise<number> {
    let count = 0;
    for (const id of ids) {
      await this.delegate.update({ where: { id }, data: { status } });
      count += 1;
    }
    return count;
  }

  async save(entity: AbandonedCartEntity): Promise<AbandonedCartEntity> {
    const data = AbandonedCartPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as unknown as { where: unknown });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return AbandonedCartPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return AbandonedCartPrismaMapper.toDomain(created);
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

  private buildWhere(options: AbandonedCartListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.userId) where['userId'] = f.userId;
    if (f.cartId) where['cartId'] = f.cartId;
    if (f.status) where['status'] = f.status;
    return where;
  }
}

export { ABANDONED_CART_REPOSITORY };
