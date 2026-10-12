/**
 * VendorStatsPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorStatsRepository } from '../../../../domain/repositories/vendor-stats.repository.interface.js';
import { VendorStatsEntity } from '../../../../domain/entities/vendor-stats.entity.js';
import { VendorStatsPrismaMapper } from '../mappers/vendor-stats.prisma-mapper.js';

@Injectable()
export class VendorStatsPrismaRepository implements VendorStatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorStatsEntity | null> {
    const row = await this.prisma.vendorStats.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorStatsPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorStatsEntity[]> {
    const rows = await this.prisma.vendorStats.findMany({
      where: { deletedAt: null },
      orderBy: { periodEnd: 'desc' },
    });
    return rows.map((r) => VendorStatsPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorStatsEntity[]> {
    const rows = await this.prisma.vendorStats.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { periodEnd: 'desc' },
    });
    return rows.map((r) => VendorStatsPrismaMapper.toDomain(r));
  }

  async findLatestByVendorId(vendorId: string): Promise<VendorStatsEntity | null> {
    const row = await this.prisma.vendorStats.findFirst({
      where: { vendorId, deletedAt: null },
      orderBy: { periodEnd: 'desc' },
    });
    return row ? VendorStatsPrismaMapper.toDomain(row) : null;
  }

  async findByVendorIdAndDate(vendorId: string, at: Date): Promise<VendorStatsEntity | null> {
    const row = await this.prisma.vendorStats.findFirst({
      where: {
        vendorId,
        periodStart: { lte: at },
        periodEnd: { gte: at },
        deletedAt: null,
      },
    });
    return row ? VendorStatsPrismaMapper.toDomain(row) : null;
  }

  async findByVendorIdBetween(
    vendorId: string,
    from: string,
    to: string,
  ): Promise<readonly VendorStatsEntity[]> {
    const rows = await this.prisma.vendorStats.findMany({
      where: {
        vendorId,
        periodStart: { gte: new Date(from) },
        periodEnd: { lte: new Date(to) },
        deletedAt: null,
      },
      orderBy: { periodStart: 'asc' },
    });
    return rows.map((r) => VendorStatsPrismaMapper.toDomain(r));
  }

  async findTopByRevenue(from: string, to: string, limit: number): Promise<readonly VendorStatsEntity[]> {
    const rows = await this.prisma.vendorStats.findMany({
      where: {
        periodStart: { gte: new Date(from) },
        periodEnd: { lte: new Date(to) },
        deletedAt: null,
      },
      orderBy: { totalRevenue: 'desc' },
      take: limit,
    });
    return rows.map((r) => VendorStatsPrismaMapper.toDomain(r));
  }

  async findDecliningVendors(
    from: string,
    to: string,
    minDeclinePercent: number,
  ): Promise<readonly VendorStatsEntity[]> {
    // Simple heuristic: vendors with negative growth (cancellation rate > threshold)
    const rows = await this.prisma.vendorStats.findMany({
      where: {
        periodStart: { gte: new Date(from) },
        periodEnd: { lte: new Date(to) },
        deletedAt: null,
      },
    });
    const entities = rows.map((r) => VendorStatsPrismaMapper.toDomain(r));
    return entities.filter((e) => e.getCancellationRate() >= minDeclinePercent / 100);
  }

  async findHighCancellationRate(threshold: number): Promise<readonly VendorStatsEntity[]> {
    const rows = await this.prisma.vendorStats.findMany({
      where: {
        totalOrders: { gt: 0 },
        deletedAt: null,
      },
    });
    const entities = rows.map((r) => VendorStatsPrismaMapper.toDomain(r));
    return entities.filter((e) => e.getCancellationRate() >= threshold);
  }

  async findHighRefundRate(threshold: number): Promise<readonly VendorStatsEntity[]> {
    const rows = await this.prisma.vendorStats.findMany({
      where: {
        totalRevenue: { gt: 0 },
        deletedAt: null,
      },
    });
    const entities = rows.map((r) => VendorStatsPrismaMapper.toDomain(r));
    return entities.filter((e) => e.getRefundRate() >= threshold);
  }

  async sumRevenueBetween(from: string, to: string): Promise<number> {
    const agg = await this.prisma.vendorStats.aggregate({
      _sum: { totalRevenue: true },
      where: {
        periodStart: { gte: new Date(from) },
        periodEnd: { lte: new Date(to) },
        deletedAt: null,
      },
    });
    return Number(agg._sum.totalRevenue ?? 0);
  }

  async sumCommissionBetween(from: string, to: string): Promise<number> {
    const agg = await this.prisma.vendorStats.aggregate({
      _sum: { totalCommission: true },
      where: {
        periodStart: { gte: new Date(from) },
        periodEnd: { lte: new Date(to) },
        deletedAt: null,
      },
    });
    return Number(agg._sum.totalCommission ?? 0);
  }

  async sumPayoutBetween(from: string, to: string): Promise<number> {
    const agg = await this.prisma.vendorStats.aggregate({
      _sum: { totalPayout: true },
      where: {
        periodStart: { gte: new Date(from) },
        periodEnd: { lte: new Date(to) },
        deletedAt: null,
      },
    });
    return Number(agg._sum.totalPayout ?? 0);
  }

  async upsert(entity: VendorStatsEntity): Promise<VendorStatsEntity> {
    const data = VendorStatsPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorStats.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorStats.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorStats.create({ data: data as never });
    return VendorStatsPrismaMapper.toDomain(row);
  }

  async save(entity: VendorStatsEntity): Promise<VendorStatsEntity> {
    return this.upsert(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorStats.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorStats.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorStats.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
