/**
 * VendorSubscriptionPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorSubscriptionRepository,
  VendorSubscriptionListOptions,
  VendorSubscriptionPaginationResult,
} from '../../../../domain/repositories/vendor-subscription.repository.interface.js';
import { VendorSubscriptionEntity } from '../../../../domain/entities/vendor-subscription.entity.js';
import { SubscriptionIdVO } from '../../../../domain/value-objects/primitives/subscription-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorSubscriptionPrismaMapper,
  type VendorSubscriptionPrismaRow,
} from '../mappers/vendor-subscription.prisma.mapper.js';

interface SubscriptionDelegate {
  findFirst(args: unknown): Promise<VendorSubscriptionPrismaRow | null>;
  findMany(args: unknown): Promise<VendorSubscriptionPrismaRow[]>;
  create(args: unknown): Promise<VendorSubscriptionPrismaRow>;
  update(args: unknown): Promise<VendorSubscriptionPrismaRow>;
  delete(args: unknown): Promise<VendorSubscriptionPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorSubscriptionPrismaRepository implements VendorSubscriptionRepository {
  private readonly logger = new Logger(VendorSubscriptionPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): SubscriptionDelegate {
    return this.prisma.getModel<SubscriptionDelegate>('vendorSubscription');
  }

  async findById(id: string): Promise<VendorSubscriptionEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorSubscriptionPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: SubscriptionIdVO): Promise<VendorSubscriptionEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorSubscriptionEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { startedAt: 'desc' },
    });
    return rows.map(VendorSubscriptionPrismaMapper.toDomain);
  }

  async findActiveByVendor(vendorId: VendorIdVO | string): Promise<VendorSubscriptionEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: {
        vendorId: idStr,
        status: { in: ['active', 'trial'] },
        deletedAt: null,
      },
      orderBy: { startedAt: 'desc' },
    });
    return raw ? VendorSubscriptionPrismaMapper.toDomain(raw) : null;
  }

  async findLatestByVendor(vendorId: VendorIdVO | string): Promise<VendorSubscriptionEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { startedAt: 'desc' },
    });
    return raw ? VendorSubscriptionPrismaMapper.toDomain(raw) : null;
  }

  async findByPlan(plan: string): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { plan, deletedAt: null },
    });
    return rows.map(VendorSubscriptionPrismaMapper.toDomain);
  }

  async findByStatus(status: string): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map(VendorSubscriptionPrismaMapper.toDomain);
  }

  async findTrials(limit = 50): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'trial', deletedAt: null },
      take: limit,
    });
    return rows.map(VendorSubscriptionPrismaMapper.toDomain);
  }

  async findExpiringSoon(days: number): Promise<readonly VendorSubscriptionEntity[]> {
    const now = new Date();
    const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        currentPeriodEnd: { gte: now, lte: cutoff },
        status: { in: ['active', 'trial'] },
        deletedAt: null,
      },
    });
    return rows.map(VendorSubscriptionPrismaMapper.toDomain);
  }

  async findPastDue(): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'past_due', deletedAt: null },
    });
    return rows.map(VendorSubscriptionPrismaMapper.toDomain);
  }

  async findCancellingAtPeriodEnd(): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { cancelAtPeriodEnd: true, deletedAt: null },
    });
    return rows.map(VendorSubscriptionPrismaMapper.toDomain);
  }

  async findForRenewal(): Promise<readonly VendorSubscriptionEntity[]> {
    const cutoff = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        autoRenew: true,
        currentPeriodEnd: { lte: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(VendorSubscriptionPrismaMapper.toDomain);
  }

  async findExpired(): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'expired', deletedAt: null },
    });
    return rows.map(VendorSubscriptionPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorSubscriptionPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorSubscriptionEntity): Promise<VendorSubscriptionEntity> {
    const data = VendorSubscriptionPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorSubscriptionPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorSubscriptionPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorSubscriptionListOptions): Promise<VendorSubscriptionPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.plan) where['plan'] = Array.isArray(f.plan) ? { in: f.plan } : f.plan;
    if (f.status) where['status'] = Array.isArray(f.status) ? { in: f.status } : f.status;
    if (f.currency) where['currency'] = f.currency;
    if (f.isTrial === true) where['status'] = 'trial';
    if (f.isCancelling === true) where['cancelAtPeriodEnd'] = true;

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map(VendorSubscriptionPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async countByVendor(vendorId: VendorIdVO | string): Promise<number> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    return this.delegate.count({ where: { vendorId: idStr, deletedAt: null } });
  }

  async getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly active: number;
    readonly trial: number;
    readonly pastDue: number;
    readonly cancelled: number;
    readonly expired: number;
    readonly byPlan: Readonly<Record<string, number>>;
    readonly monthlyRevenue: number;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { status: true, plan: true, priceAmount: true, cycle: true },
    } as never) as Array<{ status: string; plan: string; priceAmount: unknown; cycle: string }>;

    const byPlan: Record<string, number> = {};
    let active = 0;
    let trial = 0;
    let pastDue = 0;
    let cancelled = 0;
    let expired = 0;
    let monthlyRevenue = 0;

    for (const r of rows) {
      byPlan[r.plan] = (byPlan[r.plan] ?? 0) + 1;
      if (r.status === 'active') {
        active += 1;
        const price = Number(r.priceAmount) || 0;
        if (r.cycle === 'monthly') monthlyRevenue += price;
        else if (r.cycle === 'yearly' || r.cycle === 'lifetime') monthlyRevenue += price / 12;
        else if (r.cycle === 'quarterly') monthlyRevenue += price / 3;
        else if (r.cycle === 'half_yearly') monthlyRevenue += price / 6;
      } else if (r.status === 'trial') trial += 1;
      else if (r.status === 'past_due') pastDue += 1;
      else if (r.status === 'cancelled') cancelled += 1;
      else if (r.status === 'expired') expired += 1;
    }

    return {
      total: rows.length,
      active,
      trial,
      pastDue,
      cancelled,
      expired,
      byPlan,
      monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
    };
  }

  async getRevenueByPeriod(
    fromDate: string,
    toDate: string,
  ): Promise<{
    readonly totalRevenue: number;
    readonly byPlan: Readonly<Record<string, number>>;
  }> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        startedAt: { gte: new Date(fromDate), lte: new Date(toDate) },
        deletedAt: null,
      },
      select: { plan: true, priceAmount: true },
    } as never) as Array<{ plan: string; priceAmount: unknown }>;

    const byPlan: Record<string, number> = {};
    let totalRevenue = 0;
    for (const r of rows) {
      const price = Number(r.priceAmount) || 0;
      byPlan[r.plan] = (byPlan[r.plan] ?? 0) + price;
      totalRevenue += price;
    }
    return {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      byPlan,
    };
  }
}
