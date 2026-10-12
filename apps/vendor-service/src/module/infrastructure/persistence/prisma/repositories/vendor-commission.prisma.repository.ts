/**
 * VendorCommissionPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorCommissionRepository } from '../../../../domain/repositories/vendor-commission.repository.interface.js';
import { VendorCommissionEntity } from '../../../../domain/entities/vendor-commission.entity.js';
import type { CommissionTypeValue } from '../../../../domain/entities/vendor-commission.entity.js';
import { VendorCommissionPrismaMapper } from '../mappers/vendor-commission.prisma-mapper.js';

@Injectable()
export class VendorCommissionPrismaRepository implements VendorCommissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorCommissionEntity | null> {
    const row = await this.prisma.vendorCommission.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorCommissionPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorCommissionEntity[]> {
    const rows = await this.prisma.vendorCommission.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorCommissionPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorCommissionEntity[]> {
    const rows = await this.prisma.vendorCommission.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { effectiveFrom: 'desc' },
    });
    return rows.map((r) => VendorCommissionPrismaMapper.toDomain(r));
  }

  async findActiveByVendorId(vendorId: string): Promise<VendorCommissionEntity | null> {
    const now = new Date();
    const row = await this.prisma.vendorCommission.findFirst({
      where: {
        vendorId,
        isActive: true,
        effectiveFrom: { lte: now },
        OR: [{ effectiveTo: null }, { effectiveTo: { gt: now } }],
        deletedAt: null,
      },
      orderBy: { effectiveFrom: 'desc' },
    });
    return row ? VendorCommissionPrismaMapper.toDomain(row) : null;
  }

  async findActiveAt(vendorId: string, at: Date): Promise<VendorCommissionEntity | null> {
    const row = await this.prisma.vendorCommission.findFirst({
      where: {
        vendorId,
        isActive: true,
        effectiveFrom: { lte: at },
        OR: [{ effectiveTo: null }, { effectiveTo: { gt: at } }],
        deletedAt: null,
      },
      orderBy: { effectiveFrom: 'desc' },
    });
    return row ? VendorCommissionPrismaMapper.toDomain(row) : null;
  }

  async findByType(type: CommissionTypeValue): Promise<readonly VendorCommissionEntity[]> {
    const rows = await this.prisma.vendorCommission.findMany({
      where: { type, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorCommissionPrismaMapper.toDomain(r));
  }

  async findHistoryByVendorId(vendorId: string): Promise<readonly VendorCommissionEntity[]> {
    return this.findByVendorId(vendorId);
  }

  async findExpiredButActive(): Promise<readonly VendorCommissionEntity[]> {
    const rows = await this.prisma.vendorCommission.findMany({
      where: {
        isActive: true,
        effectiveTo: { lt: new Date(), not: null },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorCommissionPrismaMapper.toDomain(r));
  }

  async findVendorsWithoutConfig(): Promise<readonly string[]> {
    const allVendors = await this.prisma.vendor.findMany({
      where: { deletedAt: null, status: { in: ['active', 'approved'] } },
      select: { id: true },
    });
    const withConfig = await this.prisma.vendorCommission.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      select: { vendorId: true },
      distinct: ['vendorId'],
    });
    const configSet = new Set(withConfig.map((c) => c.vendorId));
    return allVendors.filter((v) => !configSet.has(v.id)).map((v) => v.id);
  }

  async getAveragePercent(): Promise<number> {
    const agg = await this.prisma.vendorCommission.aggregate({
      _avg: { percent: true },
      where: { isActive: true, deletedAt: null },
    });
    return Number(agg._avg.percent ?? 0);
  }

  async countActiveByVendor(vendorId: string): Promise<number> {
    return this.prisma.vendorCommission.count({
      where: { vendorId, isActive: true, deletedAt: null },
    });
  }

  async deactivateAllForVendor(vendorId: string): Promise<void> {
    await this.prisma.vendorCommission.updateMany({
      where: { vendorId, isActive: true },
      data: { isActive: false },
    });
  }

  async save(entity: VendorCommissionEntity): Promise<VendorCommissionEntity> {
    const data = VendorCommissionPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorCommission.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorCommission.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorCommission.create({ data: data as never });
    return VendorCommissionPrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorCommission.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorCommission.count({ where: { id, deletedAt: null } });
    return c > 0;
  }
}
