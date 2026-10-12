/**
 * VendorReportPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorReportRepository,
  VendorReportFilter,
} from '../../../../domain/repositories/vendor-report.repository.interface.js';
import { VendorReportEntity } from '../../../../domain/entities/vendor-report.entity.js';
import { VendorReportStatusVO } from '../../../../domain/value-objects/primitives/vendor-report-status.vo.js';
import { VendorReportTypeVO } from '../../../../domain/value-objects/primitives/vendor-report-type.vo.js';
import { VendorReportPrismaMapper } from '../mappers/vendor-report.prisma-mapper.js';

@Injectable()
export class VendorReportPrismaRepository implements VendorReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorReportEntity | null> {
    const row = await this.prisma.vendorReport.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorReportPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorReportEntity[]> {
    const rows = await this.prisma.vendorReport.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorReportPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorReportEntity[]> {
    const rows = await this.prisma.vendorReport.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorReportPrismaMapper.toDomain(r));
  }

  async findByStatus(status: VendorReportStatusVO): Promise<readonly VendorReportEntity[]> {
    const rows = await this.prisma.vendorReport.findMany({
      where: { status: status.value, deletedAt: null },
    });
    return rows.map((r) => VendorReportPrismaMapper.toDomain(r));
  }

  async findByType(type: VendorReportTypeVO): Promise<readonly VendorReportEntity[]> {
    const rows = await this.prisma.vendorReport.findMany({
      where: { type: type.value, deletedAt: null },
    });
    return rows.map((r) => VendorReportPrismaMapper.toDomain(r));
  }

  async search(filter: VendorReportFilter): Promise<readonly VendorReportEntity[]> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter.vendorId) where.vendorId = filter.vendorId;
    if (filter.type) where.type = filter.type;
    if (filter.status) where.status = filter.status;
    if (filter.format) where.format = filter.format;
    if (filter.fromDate || filter.toDate) {
      const range: Record<string, Date> = {};
      if (filter.fromDate) range.gte = new Date(filter.fromDate);
      if (filter.toDate) range.lte = new Date(filter.toDate);
      where.createdAt = range;
    }
    const rows = await this.prisma.vendorReport.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorReportPrismaMapper.toDomain(r));
  }

  async findInProgress(): Promise<readonly VendorReportEntity[]> {
    const rows = await this.prisma.vendorReport.findMany({
      where: {
        status: { in: ['pending', 'generating'] },
        deletedAt: null,
      },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => VendorReportPrismaMapper.toDomain(r));
  }

  async findExpiredReady(): Promise<readonly VendorReportEntity[]> {
    const rows = await this.prisma.vendorReport.findMany({
      where: {
        status: 'ready',
        expiresAt: { lt: new Date() },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorReportPrismaMapper.toDomain(r));
  }

  async findDownloadableByVendorId(vendorId: string): Promise<readonly VendorReportEntity[]> {
    const rows = await this.prisma.vendorReport.findMany({
      where: {
        vendorId,
        status: 'ready',
        expiresAt: { gt: new Date() },
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorReportPrismaMapper.toDomain(r));
  }

  async countByVendor(vendorId: string): Promise<number> {
    return this.prisma.vendorReport.count({
      where: { vendorId, deletedAt: null },
    });
  }

  async countByStatus(status: VendorReportStatusVO): Promise<number> {
    return this.prisma.vendorReport.count({
      where: { status: status.value, deletedAt: null },
    });
  }

  async countRecentByVendorId(vendorId: string, hours: number): Promise<number> {
    const threshold = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.prisma.vendorReport.count({
      where: {
        vendorId,
        createdAt: { gte: threshold },
        deletedAt: null,
      },
    });
  }

  async save(entity: VendorReportEntity): Promise<VendorReportEntity> {
    const data = VendorReportPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorReport.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorReport.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorReport.create({ data: data as never });
    return VendorReportPrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorReport.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorReport.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorReport.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
