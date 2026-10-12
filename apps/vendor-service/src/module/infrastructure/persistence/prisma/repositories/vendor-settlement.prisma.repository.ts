/**
 * VendorSettlementPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorSettlementRepository,
  VendorSettlementFilter,
} from '../../../../domain/repositories/vendor-settlement.repository.interface.js';
import { VendorSettlementEntity } from '../../../../domain/entities/vendor-settlement.entity.js';
import type { SettlementStatus } from '../../../../domain/entities/vendor-settlement.entity.js';
import { VendorSettlementPrismaMapper } from '../mappers/vendor-settlement.prisma-mapper.js';

@Injectable()
export class VendorSettlementPrismaRepository implements VendorSettlementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorSettlementEntity | null> {
    const row = await this.prisma.vendorSettlement.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorSettlementPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.prisma.vendorSettlement.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorSettlementPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.prisma.vendorSettlement.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorSettlementPrismaMapper.toDomain(r));
  }

  async findByStatus(status: SettlementStatus): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.prisma.vendorSettlement.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorSettlementPrismaMapper.toDomain(r));
  }

  async findByNumber(settlementNumber: string): Promise<VendorSettlementEntity | null> {
    const row = await this.prisma.vendorSettlement.findFirst({
      where: { settlementNumber, deletedAt: null },
    });
    return row ? VendorSettlementPrismaMapper.toDomain(row) : null;
  }

  async findByPayoutId(payoutId: string): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.prisma.vendorSettlement.findMany({
      where: { payoutId, deletedAt: null },
    });
    return rows.map((r) => VendorSettlementPrismaMapper.toDomain(r));
  }

  async search(filter: VendorSettlementFilter): Promise<readonly VendorSettlementEntity[]> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter.vendorId) where.vendorId = filter.vendorId;
    if (filter.status) where.status = filter.status;
    if (filter.fromDate || filter.toDate) {
      const range: Record<string, Date> = {};
      if (filter.fromDate) range.gte = new Date(filter.fromDate);
      if (filter.toDate) range.lte = new Date(filter.toDate);
      where.periodStart = range;
    }
    const rows = await this.prisma.vendorSettlement.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorSettlementPrismaMapper.toDomain(r));
  }

  async findPendingReady(): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.prisma.vendorSettlement.findMany({
      where: { status: 'pending', deletedAt: null },
      orderBy: { periodEnd: 'asc' },
    });
    return rows.map((r) => VendorSettlementPrismaMapper.toDomain(r));
  }

  async findProcessingPastSla(hours: number): Promise<readonly VendorSettlementEntity[]> {
    const threshold = new Date(Date.now() - hours * 60 * 60 * 1000);
    const rows = await this.prisma.vendorSettlement.findMany({
      where: {
        status: 'processing',
        updatedAt: { lte: threshold },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorSettlementPrismaMapper.toDomain(r));
  }

  async findLatestByVendorId(vendorId: string): Promise<VendorSettlementEntity | null> {
    const row = await this.prisma.vendorSettlement.findFirst({
      where: { vendorId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return row ? VendorSettlementPrismaMapper.toDomain(row) : null;
  }

  async sumNetBetween(vendorId: string, fromDate: string, toDate: string): Promise<number> {
    const agg = await this.prisma.vendorSettlement.aggregate({
      _sum: { netAmount: true },
      where: {
        vendorId,
        status: 'completed',
        periodStart: { gte: new Date(fromDate), lte: new Date(toDate) },
        deletedAt: null,
      },
    });
    return Number(agg._sum.netAmount ?? 0);
  }

  async countByStatus(status: SettlementStatus): Promise<number> {
    return this.prisma.vendorSettlement.count({
      where: { status, deletedAt: null },
    });
  }

  async save(entity: VendorSettlementEntity): Promise<VendorSettlementEntity> {
    const data = VendorSettlementPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorSettlement.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorSettlement.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorSettlement.create({ data: data as never });
    return VendorSettlementPrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorSettlement.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorSettlement.count({ where: { id, deletedAt: null } });
    return c > 0;
  }
}
