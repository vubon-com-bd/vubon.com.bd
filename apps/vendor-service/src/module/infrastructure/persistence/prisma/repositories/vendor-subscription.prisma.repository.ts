/**
 * VendorSubscriptionPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorSubscriptionRepository,
  VendorSubscriptionFilter,
  SubscriptionStats,
} from '../../../../domain/repositories/vendor-subscription.repository.interface.js';
import { VendorSubscriptionEntity } from '../../../../domain/entities/vendor-subscription.entity.js';
import { SubscriptionStatusVO } from '../../../../domain/value-objects/primitives/subscription-status.vo.js';
import { SubscriptionPlanVO } from '../../../../domain/value-objects/primitives/subscription-plan.vo.js';
import { VendorSubscriptionPrismaMapper } from '../mappers/vendor-subscription.prisma-mapper.js';

@Injectable()
export class VendorSubscriptionPrismaRepository implements VendorSubscriptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorSubscriptionEntity | null> {
    const row = await this.prisma.vendorSubscription.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorSubscriptionPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.prisma.vendorSubscription.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorSubscriptionPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<VendorSubscriptionEntity | null> {
    const row = await this.prisma.vendorSubscription.findFirst({
      where: { vendorId, deletedAt: null },
    });
    return row ? VendorSubscriptionPrismaMapper.toDomain(row) : null;
  }

  async existsByVendorId(vendorId: string): Promise<boolean> {
    const c = await this.prisma.vendorSubscription.count({
      where: { vendorId, deletedAt: null },
    });
    return c > 0;
  }

  async findByStatus(status: SubscriptionStatusVO): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.prisma.vendorSubscription.findMany({
      where: { status: status.value, deletedAt: null },
    });
    return rows.map((r) => VendorSubscriptionPrismaMapper.toDomain(r));
  }

  async findByPlan(plan: SubscriptionPlanVO): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.prisma.vendorSubscription.findMany({
      where: { plan: plan.value, deletedAt: null },
    });
    return rows.map((r) => VendorSubscriptionPrismaMapper.toDomain(r));
  }

  async search(filter: VendorSubscriptionFilter): Promise<readonly VendorSubscriptionEntity[]> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter.plan) where.plan = filter.plan;
    if (filter.status) where.status = filter.status;
    if (filter.autoRenew !== undefined) where.autoRenew = filter.autoRenew;
    const rows = await this.prisma.vendorSubscription.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorSubscriptionPrismaMapper.toDomain(r));
  }

  async findRenewingWithin(days: number): Promise<readonly VendorSubscriptionEntity[]> {
    const now = new Date();
    const threshold = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.vendorSubscription.findMany({
      where: {
        status: 'active',
        currentPeriodEnd: { gte: now, lte: threshold },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorSubscriptionPrismaMapper.toDomain(r));
  }

  async findTrialsEndingWithin(days: number): Promise<readonly VendorSubscriptionEntity[]> {
    const now = new Date();
    const threshold = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.vendorSubscription.findMany({
      where: {
        status: 'trial',
        trialEndsAt: { gte: now, lte: threshold },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorSubscriptionPrismaMapper.toDomain(r));
  }

  async findExpiredButActive(): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.prisma.vendorSubscription.findMany({
      where: {
        status: { in: ['active', 'trial', 'past_due'] },
        currentPeriodEnd: { lt: new Date() },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorSubscriptionPrismaMapper.toDomain(r));
  }

  async findPastDue(): Promise<readonly VendorSubscriptionEntity[]> {
    const rows = await this.prisma.vendorSubscription.findMany({
      where: { status: 'past_due', deletedAt: null },
    });
    return rows.map((r) => VendorSubscriptionPrismaMapper.toDomain(r));
  }

  async countByStatus(status: SubscriptionStatusVO): Promise<number> {
    return this.prisma.vendorSubscription.count({
      where: { status: status.value, deletedAt: null },
    });
  }

  async countByPlan(plan: SubscriptionPlanVO): Promise<number> {
    return this.prisma.vendorSubscription.count({
      where: { plan: plan.value, deletedAt: null },
    });
  }

  async getStats(): Promise<SubscriptionStats> {
    const [totalActive, totalTrial, totalPastDue, planGroups, mrrAgg] = await Promise.all([
      this.prisma.vendorSubscription.count({ where: { status: 'active', deletedAt: null } }),
      this.prisma.vendorSubscription.count({ where: { status: 'trial', deletedAt: null } }),
      this.prisma.vendorSubscription.count({ where: { status: 'past_due', deletedAt: null } }),
      this.prisma.vendorSubscription.groupBy({
        by: ['plan'],
        _count: { _all: true },
        where: { deletedAt: null },
      }),
      this.prisma.vendorSubscription.aggregate({
        _sum: { price: true },
        where: { status: 'active', deletedAt: null },
      }),
    ]);

    const byPlan: Record<string, number> = {};
    for (const g of planGroups) byPlan[g.plan] = g._count._all;

    return {
      totalActive,
      totalTrial,
      totalPastDue,
      byPlan,
      mrr: Number(mrrAgg._sum.price ?? 0),
    };
  }

  async upsert(entity: VendorSubscriptionEntity): Promise<VendorSubscriptionEntity> {
    const data = VendorSubscriptionPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorSubscription.findFirst({
      where: { vendorId: entity.vendorId },
    });
    const row = existing
      ? await this.prisma.vendorSubscription.update({ where: { id: existing.id }, data })
      : await this.prisma.vendorSubscription.create({ data: data as never });
    return VendorSubscriptionPrismaMapper.toDomain(row);
  }

  async save(entity: VendorSubscriptionEntity): Promise<VendorSubscriptionEntity> {
    return this.upsert(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorSubscription.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorSubscription.count({ where: { id, deletedAt: null } });
    return c > 0;
  }
}
