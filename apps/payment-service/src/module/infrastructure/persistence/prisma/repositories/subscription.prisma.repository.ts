/**
 * SubscriptionPrismaRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  SubscriptionRepository,
  SubscriptionListOptions,
  SubscriptionPaginationResult,
  SubscriptionStats,
} from '@domain/repositories/subscription.repository.interface';
import { SubscriptionEntity } from '@domain/entities/subscription.entity';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  SubscriptionPrismaMapper,
  type PrismaSubscriptionRow,
} from '../mappers/subscription.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaSubscriptionRow | null>;
  findUnique(args: unknown): Promise<PrismaSubscriptionRow | null>;
  findMany(args?: unknown): Promise<PrismaSubscriptionRow[]>;
  create(args: unknown): Promise<PrismaSubscriptionRow>;
  update(args: unknown): Promise<PrismaSubscriptionRow>;
  delete(args: unknown): Promise<PrismaSubscriptionRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class SubscriptionPrismaRepository implements SubscriptionRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.subscription);
  }

  async findById(id: string): Promise<SubscriptionEntity | null> {
    return this.findByIdVO(SubscriptionIdVO.reconstitute(id));
  }

  async findByIdVO(id: SubscriptionIdVO): Promise<SubscriptionEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? SubscriptionPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SubscriptionPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async save(entity: SubscriptionEntity): Promise<SubscriptionEntity> {
    const data = SubscriptionPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as unknown as PrismaSubscriptionRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return SubscriptionPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return SubscriptionPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
  }

  async findByUser(userId: string): Promise<readonly SubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SubscriptionPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly SubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SubscriptionPrismaMapper.toDomain(r));
  }

  async findByPlan(plan: string): Promise<readonly SubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { plan, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SubscriptionPrismaMapper.toDomain(r));
  }

  async findPaginated(
    options: SubscriptionListOptions,
  ): Promise<SubscriptionPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.userId) where['userId'] = f.userId;
    if (f.status) where['status'] = f.status;
    if (f.plan) where['plan'] = f.plan;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => SubscriptionPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(userId?: string): Promise<SubscriptionStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (userId) where['userId'] = userId;
    const rows = (await this.delegate.findMany({
      where: where as never,
      select: { status: true, plan: true, price: true, interval: true, intervalCount: true, currency: true } as never,
    })) as unknown as Array<{
      status: string;
      plan: string;
      price: unknown;
      interval: string;
      intervalCount: number;
      currency: string;
    }>;
    const byPlan: Record<string, number> = {};
    let active = 0;
    let trialing = 0;
    let cancelled = 0;
    let totalMrr = 0;
    let currency = 'BDT';
    for (const r of rows) {
      byPlan[r.plan] = (byPlan[r.plan] ?? 0) + 1;
      if (r.status === 'active') active++;
      if (r.status === 'trialing') trialing++;
      if (r.status === 'cancelled') cancelled++;
      totalMrr += Number(r.price);
      currency = r.currency;
    }
    return {
      total: rows.length,
      active,
      trialing,
      cancelled,
      totalMrr: Math.round(totalMrr * 100) / 100,
      currency,
      byPlan,
    };
  }

  async findExpiringPeriods(withinDays: number): Promise<readonly SubscriptionEntity[]> {
    const cutoff = new Date(Date.now() + withinDays * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        currentPeriodEnd: { lte: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => SubscriptionPrismaMapper.toDomain(r));
  }

  async findExpiredTrials(): Promise<readonly SubscriptionEntity[]> {
    const cutoff = new Date();
    const rows = await this.delegate.findMany({
      where: {
        status: 'trialing',
        trialEndsAt: { lte: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => SubscriptionPrismaMapper.toDomain(r));
  }

  async findPastDue(olderThanDays: number): Promise<readonly SubscriptionEntity[]> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'past_due',
        currentPeriodEnd: { lte: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => SubscriptionPrismaMapper.toDomain(r));
  }
}
