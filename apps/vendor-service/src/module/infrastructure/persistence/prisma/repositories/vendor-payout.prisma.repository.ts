/**
 * VendorPayoutPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorPayoutRepository,
  VendorPayoutListOptions,
  VendorPayoutPaginationResult,
  VendorPayoutSummary,
  VendorPayoutFilter,
} from '../../../../domain/repositories/vendor-payout.repository.interface.js';
import { VendorPayoutEntity } from '../../../../domain/entities/vendor-payout.entity.js';
import { PayoutStatusVO } from '../../../../domain/value-objects/primitives/payout-status.vo.js';
import { PayoutMethodVO } from '../../../../domain/value-objects/primitives/payout-method.vo.js';
import { VendorPayoutPrismaMapper } from '../mappers/vendor-payout.prisma-mapper.js';

@Injectable()
export class VendorPayoutPrismaRepository implements VendorPayoutRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorPayoutEntity | null> {
    const row = await this.prisma.vendorPayout.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorPayoutPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.prisma.vendorPayout.findMany({
      where: { deletedAt: null },
      orderBy: { requestedAt: 'desc' },
    });
    return rows.map((r) => VendorPayoutPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.prisma.vendorPayout.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { requestedAt: 'desc' },
    });
    return rows.map((r) => VendorPayoutPrismaMapper.toDomain(r));
  }

  async findByStatus(status: PayoutStatusVO): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.prisma.vendorPayout.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { requestedAt: 'desc' },
    });
    return rows.map((r) => VendorPayoutPrismaMapper.toDomain(r));
  }

  async findByMethod(method: PayoutMethodVO): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.prisma.vendorPayout.findMany({
      where: { method: method.value, deletedAt: null },
      orderBy: { requestedAt: 'desc' },
    });
    return rows.map((r) => VendorPayoutPrismaMapper.toDomain(r));
  }

  async findByNumber(payoutNumber: string): Promise<VendorPayoutEntity | null> {
    const row = await this.prisma.vendorPayout.findFirst({
      where: { payoutNumber, deletedAt: null },
    });
    return row ? VendorPayoutPrismaMapper.toDomain(row) : null;
  }

  async findPaginated(options: VendorPayoutListOptions): Promise<VendorPayoutPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter;
    if (f) {
      if (f.vendorId) where.vendorId = f.vendorId;
      if (f.status) where.status = f.status;
      if (f.method) where.method = f.method;
      if (f.fromDate || f.toDate) {
        const range: Record<string, Date> = {};
        if (f.fromDate) range.gte = new Date(f.fromDate);
        if (f.toDate) range.lte = new Date(f.toDate);
        where.requestedAt = range;
      }
      if (f.minAmount !== undefined || f.maxAmount !== undefined) {
        const range: Record<string, number> = {};
        if (f.minAmount !== undefined) range.gte = f.minAmount;
        if (f.maxAmount !== undefined) range.lte = f.maxAmount;
        where.amount = range;
      }
    }
    const sortBy = options.sortBy ?? 'createdAt';
    const sortDir = options.sortDir ?? 'desc';
    const skip = (options.page - 1) * options.limit;
    const [rows, total] = await Promise.all([
      this.prisma.vendorPayout.findMany({
        where,
        orderBy: { [sortBy]: sortDir },
        skip,
        take: options.limit,
      }),
      this.prisma.vendorPayout.count({ where }),
    ]);
    return {
      items: rows.map((r) => VendorPayoutPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async search(filter: VendorPayoutFilter): Promise<readonly VendorPayoutEntity[]> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter.vendorId) where.vendorId = filter.vendorId;
    if (filter.status) where.status = filter.status;
    if (filter.method) where.method = filter.method;
    const rows = await this.prisma.vendorPayout.findMany({
      where,
      orderBy: { requestedAt: 'desc' },
    });
    return rows.map((r) => VendorPayoutPrismaMapper.toDomain(r));
  }

  async findActive(): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.prisma.vendorPayout.findMany({
      where: {
        status: { in: ['pending', 'processing', 'approved', 'on_hold'] },
        deletedAt: null,
      },
      orderBy: { requestedAt: 'desc' },
    });
    return rows.map((r) => VendorPayoutPrismaMapper.toDomain(r));
  }

  async findProcessingPastSla(hours: number): Promise<readonly VendorPayoutEntity[]> {
    const threshold = new Date(Date.now() - hours * 60 * 60 * 1000);
    const rows = await this.prisma.vendorPayout.findMany({
      where: {
        status: 'processing',
        approvedAt: { lte: threshold },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorPayoutPrismaMapper.toDomain(r));
  }

  async countTodayByVendor(vendorId: string): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return this.prisma.vendorPayout.count({
      where: {
        vendorId,
        requestedAt: { gte: start },
        deletedAt: null,
      },
    });
  }

  async getSummary(vendorId: string): Promise<VendorPayoutSummary> {
    const [paidAgg, pendingAgg, lastPayout] = await Promise.all([
      this.prisma.vendorPayout.aggregate({
        _sum: { netAmount: true },
        where: { vendorId, status: 'paid', deletedAt: null },
      }),
      this.prisma.vendorPayout.aggregate({
        _sum: { netAmount: true },
        where: {
          vendorId,
          status: { in: ['pending', 'processing', 'approved', 'on_hold'] },
          deletedAt: null,
        },
      }),
      this.prisma.vendorPayout.findFirst({
        where: { vendorId, status: 'paid', deletedAt: null },
        orderBy: { paidAt: 'desc' },
      }),
    ]);

    return {
      vendorId,
      totalPaid: Number(paidAgg._sum.netAmount ?? 0),
      totalPending: Number(pendingAgg._sum.netAmount ?? 0),
      currency: lastPayout?.currency ?? 'BDT',
      lastPayoutAt: lastPayout?.paidAt?.toISOString(),
    };
  }

  async sumPaidBetween(vendorId: string, fromDate: string, toDate: string): Promise<number> {
    const agg = await this.prisma.vendorPayout.aggregate({
      _sum: { netAmount: true },
      where: {
        vendorId,
        status: 'paid',
        paidAt: { gte: new Date(fromDate), lte: new Date(toDate) },
        deletedAt: null,
      },
    });
    return Number(agg._sum.netAmount ?? 0);
  }

  async countByStatus(status: PayoutStatusVO): Promise<number> {
    return this.prisma.vendorPayout.count({
      where: { status: status.value, deletedAt: null },
    });
  }

  async save(entity: VendorPayoutEntity): Promise<VendorPayoutEntity> {
    const data = VendorPayoutPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorPayout.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorPayout.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorPayout.create({ data: data as never });
    return VendorPayoutPrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorPayout.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorPayout.count({ where: { id, deletedAt: null } });
    return c > 0;
  }
}
