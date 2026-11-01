/**
 * VendorSettlementPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorSettlementRepository,
  VendorSettlementListOptions,
  VendorSettlementPaginationResult,
  VendorSettlementStats,
} from '../../../../domain/repositories/vendor-settlement.repository.interface.js';
import { VendorSettlementEntity } from '../../../../domain/entities/vendor-settlement.entity.js';
import { SettlementIdVO } from '../../../../domain/value-objects/primitives/settlement-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorSettlementPrismaMapper,
  type VendorSettlementPrismaRow,
} from '../mappers/vendor-settlement.prisma.mapper.js';

interface SettlementDelegate {
  findFirst(args: unknown): Promise<VendorSettlementPrismaRow | null>;
  findMany(args: unknown): Promise<VendorSettlementPrismaRow[]>;
  create(args: unknown): Promise<VendorSettlementPrismaRow>;
  update(args: unknown): Promise<VendorSettlementPrismaRow>;
  delete(args: unknown): Promise<VendorSettlementPrismaRow>;
  count(args?: unknown): Promise<number>;
  aggregate(args: unknown): Promise<{ _sum?: { netAmount?: unknown } }>;
}

@Injectable()
export class VendorSettlementPrismaRepository implements VendorSettlementRepository {
  private readonly logger = new Logger(VendorSettlementPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): SettlementDelegate {
    return this.prisma.getModel<SettlementDelegate>('vendorSettlement');
  }

  async findById(id: string): Promise<VendorSettlementEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorSettlementPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: SettlementIdVO): Promise<VendorSettlementEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorSettlementEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { periodEnd: 'desc' },
    });
    return rows.map(VendorSettlementPrismaMapper.toDomain);
  }

  async findByPayoutId(payoutId: string): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.delegate.findMany({
      where: { payoutId, deletedAt: null },
    });
    return rows.map(VendorSettlementPrismaMapper.toDomain);
  }

  async findPending(limit = 50): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'pending', deletedAt: null },
      orderBy: { periodEnd: 'asc' },
      take: limit,
    });
    return rows.map(VendorSettlementPrismaMapper.toDomain);
  }

  async findProcessing(limit = 50): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'processing', deletedAt: null },
      take: limit,
    });
    return rows.map(VendorSettlementPrismaMapper.toDomain);
  }

  async findOnHold(limit = 50): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'on_hold', deletedAt: null },
      take: limit,
    });
    return rows.map(VendorSettlementPrismaMapper.toDomain);
  }

  async findOverdue(): Promise<readonly VendorSettlementEntity[]> {
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'pending',
        periodEnd: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(VendorSettlementPrismaMapper.toDomain);
  }

  async findByPeriod(
    vendorId: string,
    periodStart: string,
    periodEnd: string,
  ): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        vendorId,
        periodStart: { gte: new Date(periodStart) },
        periodEnd: { lte: new Date(periodEnd) },
        deletedAt: null,
      },
    });
    return rows.map(VendorSettlementPrismaMapper.toDomain);
  }

  async findLatestByVendor(vendorId: VendorIdVO | string): Promise<VendorSettlementEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { periodEnd: 'desc' },
    });
    return raw ? VendorSettlementPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorSettlementEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorSettlementPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorSettlementEntity): Promise<VendorSettlementEntity> {
    const data = VendorSettlementPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorSettlementPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorSettlementPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorSettlementListOptions): Promise<VendorSettlementPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.status) where['status'] = Array.isArray(f.status) ? { in: f.status } : f.status;
    if (f.currency) where['currency'] = f.currency;
    if (f.periodStartFrom) where['periodStart'] = { gte: new Date(f.periodStartFrom) };
    if (f.periodEndTo) where['periodEnd'] = { lte: new Date(f.periodEndTo) };
    if (f.hasPayout === true) where['payoutId'] = { not: null };
    if (f.hasPayout === false) where['payoutId'] = null;

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
      items: rows.map(VendorSettlementPrismaMapper.toDomain),
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

  async sumNetAmountByVendor(
    vendorId: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<number> {
    const where: Record<string, unknown> = {
      vendorId,
      status: 'completed',
      deletedAt: null,
    };
    if (fromDate || toDate) {
      where['processedAt'] = {
        ...(fromDate ? { gte: new Date(fromDate) } : {}),
        ...(toDate ? { lte: new Date(toDate) } : {}),
      };
    }
    const agg = await this.delegate.aggregate({
      where,
      _sum: { netAmount: true },
    });
    return Math.round(Number(agg._sum?.netAmount ?? 0) * 100) / 100;
  }

  async getStats(vendorId?: string, fromDate?: string, toDate?: string): Promise<VendorSettlementStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;
    if (fromDate || toDate) {
      where['periodEnd'] = {
        ...(fromDate ? { gte: new Date(fromDate) } : {}),
        ...(toDate ? { lte: new Date(toDate) } : {}),
      };
    }

    const rows = await this.delegate.findMany({
      where,
      select: { status: true, grossAmount: true, netAmount: true, commissionAmount: true },
    } as never) as Array<{
      status: string;
      grossAmount: unknown;
      netAmount: unknown;
      commissionAmount: unknown;
    }>;

    const byStatus: Record<string, number> = {};
    let totalGross = 0;
    let totalNet = 0;
    let totalCommission = 0;
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      totalGross += Number(r.grossAmount) || 0;
      totalNet += Number(r.netAmount) || 0;
      totalCommission += Number(r.commissionAmount) || 0;
    }

    return {
      total: rows.length,
      totalGross: Math.round(totalGross * 100) / 100,
      totalNet: Math.round(totalNet * 100) / 100,
      totalCommission: Math.round(totalCommission * 100) / 100,
      totalRefunds: 0,
      averageNetAmount: rows.length ? Math.round((totalNet / rows.length) * 100) / 100 : 0,
      byStatus,
    };
  }
}
