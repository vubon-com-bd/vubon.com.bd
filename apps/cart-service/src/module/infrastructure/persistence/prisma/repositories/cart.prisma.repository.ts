/**
 * CartPrismaRepository — implements CartRepository
 * @module cart-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import {
  CART_REPOSITORY,
  type CartRepository,
  type CartListOptions,
  type CartPaginationResult,
  type CartStats,
  type CartListFilter,
} from '../../../../domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../../domain/entities/cart.entity.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { IdempotencyKeyVO } from '../../../../domain/value-objects/primitives/idempotency-key.vo.js';
import { CartPrismaService } from '../prisma.service.js';
import {
  CartPrismaMapper,
  type PrismaCartRow,
} from '../mappers/cart.prisma.mapper.js';

interface PrismaCartDelegate {
  findFirst(args: unknown): Promise<PrismaCartRow | null>;
  findUnique(args: unknown): Promise<PrismaCartRow | null>;
  findMany(args: unknown): Promise<PrismaCartRow[]>;
  create(args: unknown): Promise<PrismaCartRow>;
  update(args: unknown): Promise<PrismaCartRow>;
  delete(args: unknown): Promise<PrismaCartRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class CartPrismaRepository implements CartRepository {
  private readonly logger = new Logger(CartPrismaRepository.name);

  constructor(private readonly prisma: CartPrismaService) {}

  private get delegate(): PrismaCartDelegate {
    return this.prisma.getModel<PrismaCartDelegate>('cart');
  }

  // ═══════════════ FIND ═══════════════

  async findById(id: string): Promise<CartEntity | null> {
    return this.findByIdVO(CartIdVO.reconstitute(id));
  }

  async findByIdVO(id: CartIdVO): Promise<CartEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? CartPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CartEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => CartPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async findByUserId(userId: string): Promise<readonly CartEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => CartPrismaMapper.toDomain(r));
  }

  async findActiveByUserId(userId: string): Promise<CartEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { userId, status: 'active', deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? CartPrismaMapper.toDomain(raw) : null;
  }

  async findBySessionId(sessionId: string): Promise<readonly CartEntity[]> {
    const rows = await this.delegate.findMany({
      where: { sessionId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => CartPrismaMapper.toDomain(r));
  }

  async findActiveBySessionId(sessionId: string): Promise<CartEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { sessionId, status: 'active', deletedAt: null },
    });
    return raw ? CartPrismaMapper.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly CartEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => CartPrismaMapper.toDomain(r));
  }

  async findByIdempotencyKey(key: IdempotencyKeyVO): Promise<CartEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { idempotencyKey: key.value },
    });
    return raw ? CartPrismaMapper.toDomain(raw) : null;
  }

  // ═══════════════ PAGINATION ═══════════════

  async findPaginated(options: CartListOptions): Promise<CartPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = this.buildOrderBy(options);

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
      items: rows.map((r) => CartPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  // ═══════════════ STATS ═══════════════

  async getStats(filter?: CartListFilter): Promise<CartStats> {
    const where = this.buildStatsWhere(filter);
    const rows = await this.delegate.findMany({
      where,
      select: { status: true, type: true, total: true, itemCount: true },
    } as unknown as { where: unknown });

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalValue = 0;
    let totalItems = 0;

    for (const r of rows as unknown as Array<{
      status: string;
      type: string;
      total: unknown;
      itemCount: number;
    }>) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      totalValue += Number(r.total);
      totalItems += r.itemCount;
    }

    const count = rows.length;
    return {
      total: count,
      totalValue: Math.round(totalValue * 100) / 100,
      averageValue: count ? Math.round((totalValue / count) * 100) / 100 : 0,
      averageItemCount: count ? Math.round((totalItems / count) * 100) / 100 : 0,
      byStatus,
      byType,
    };
  }

  // ═══════════════ CRON ═══════════════

  async findStale(inactiveMinutes: number): Promise<readonly CartEntity[]> {
    const cutoff = new Date(Date.now() - inactiveMinutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: { status: 'active', lastActivityAt: { lt: cutoff }, deletedAt: null },
      orderBy: { lastActivityAt: 'asc' },
    });
    return rows.map((r) => CartPrismaMapper.toDomain(r));
  }

  async findExpired(beforeDate: Date): Promise<readonly CartEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: { notIn: ['expired', 'cleared', 'converted'] },
        expiresAt: { lte: beforeDate },
        deletedAt: null,
      },
    });
    return rows.map((r) => CartPrismaMapper.toDomain(r));
  }

  async findAbandonable(thresholdHours: number): Promise<readonly CartEntity[]> {
    const cutoff = new Date(Date.now() - thresholdHours * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        itemCount: { gt: 0 },
        lastActivityAt: { lt: cutoff },
        deletedAt: null,
      },
      orderBy: { lastActivityAt: 'asc' },
    });
    return rows.map((r) => CartPrismaMapper.toDomain(r));
  }

  async findRetryable(_maxRetries?: number): Promise<readonly CartEntity[]> {
    return [];
  }

  // ═══════════════ COUNT ═══════════════

  async countByUserId(userId: string): Promise<number> {
    return this.delegate.count({ where: { userId, deletedAt: null } });
  }

  async countByStatus(status: string): Promise<number> {
    return this.delegate.count({ where: { status, deletedAt: null } });
  }

  async countActiveByUserId(userId: string): Promise<number> {
    return this.delegate.count({
      where: { userId, status: 'active', deletedAt: null },
    });
  }

  // ═══════════════ SAVE / DELETE ═══════════════

  async save(entity: CartEntity): Promise<CartEntity> {
    const data = CartPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return CartPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return CartPrismaMapper.toDomain(created);
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

  async bulkUpdateStatus(ids: readonly string[], status: string): Promise<number> {
    let count = 0;
    for (const id of ids) {
      await this.delegate.update({ where: { id }, data: { status } });
      count += 1;
    }
    return count;
  }

  // ═══════════════ HELPERS ═══════════════

  private buildWhere(options: CartListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };

    if (f.userId) where['userId'] = f.userId;
    if (f.sessionId) where['sessionId'] = f.sessionId;
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.currency) where['currency'] = f.currency;

    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    return where;
  }

  private buildStatsWhere(filter?: CartListFilter): Record<string, unknown> {
    return this.buildWhere({ page: 1, limit: 0, filter });
  }

  private buildOrderBy(options: CartListOptions): Record<string, 'asc' | 'desc'> {
    const dir = options.sortDir ?? 'desc';
    const field = options.sortBy ?? 'createdAt';
    return { [field]: dir };
  }
}

export { CART_REPOSITORY };
