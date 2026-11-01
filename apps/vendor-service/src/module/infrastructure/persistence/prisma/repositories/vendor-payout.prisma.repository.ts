/**
 * VendorPayoutPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorPayoutRepository,
  VendorPayoutListOptions,
  VendorPayoutPaginationResult,
  VendorPayoutStats,
} from '../../../../domain/repositories/vendor-payout.repository.interface.js';
import { VendorPayoutEntity } from '../../../../domain/entities/vendor-payout.entity.js';
import { PayoutIdVO } from '../../../../domain/value-objects/primitives/payout-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorPayoutPrismaMapper,
  type VendorPayoutPrismaRow,
} from '../mappers/vendor-payout.prisma.mapper.js';

interface PayoutDelegate {
  findFirst(args: unknown): Promise<VendorPayoutPrismaRow | null>;
  findMany(args: unknown): Promise<VendorPayoutPrismaRow[]>;
  create(args: unknown): Promise<VendorPayoutPrismaRow>;
  update(args: unknown): Promise<VendorPayoutPrismaRow>;
  delete(args: unknown): Promise<VendorPayoutPrismaRow>;
  count(args?: unknown): Promise<number>;
  aggregate(args: unknown): Promise<{ _sum?: { amount?: unknown; netAmount?: unknown } }>;
}

@Injectable()
export class VendorPayoutPrismaRepository implements VendorPayoutRepository {
  private readonly logger = new Logger(VendorPayoutPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): PayoutDelegate {
    return this.prisma.getModel<PayoutDelegate>('vendorPayout');
  }

  async findById(id: string): Promise<VendorPayoutEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorPayoutPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: PayoutIdVO): Promise<VendorPayoutEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorPayoutEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { requestedAt: 'desc' },
    });
    return rows.map(VendorPayoutPrismaMapper.toDomain);
  }

  async findByVendorAndStatus(
    vendorId: VendorIdVO | string,
    status: string,
  ): Promise<readonly VendorPayoutEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, status, deletedAt: null },
    });
    return rows.map(VendorPayoutPrismaMapper.toDomain);
  }

  async findPending(limit = 50): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'pending', deletedAt: null },
      orderBy: { requestedAt: 'asc' },
      take: limit,
    });
    return rows.map(VendorPayoutPrismaMapper.toDomain);
  }

  async findProcessing(limit = 50): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'processing', deletedAt: null },
      take: limit,
    });
    return rows.map(VendorPayoutPrismaMapper.toDomain);
  }

  async findOnHold(limit = 50): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'on_hold', deletedAt: null },
      take: limit,
    });
    return rows.map(VendorPayoutPrismaMapper.toDomain);
  }

  async findOverdue(): Promise<readonly VendorPayoutEntity[]> {
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'pending',
        requestedAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(VendorPayoutPrismaMapper.toDomain);
  }

  async findByTransactionId(transactionId: string): Promise<VendorPayoutEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { transactionId, deletedAt: null },
    });
    return raw ? VendorPayoutPrismaMapper.toDomain(raw) : null;
  }

  async findLatestByVendor(vendorId: VendorIdVO | string): Promise<VendorPayoutEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { requestedAt: 'desc' },
    });
    return raw ? VendorPayoutPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorPayoutEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorPayoutPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorPayoutEntity): Promise<VendorPayoutEntity> {
    const data = VendorPayoutPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorPayoutPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorPayoutPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorPayoutListOptions): Promise<VendorPayoutPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.status) where['status'] = Array.isArray(f.status) ? { in: f.status } : f.status;
    if (f.method) where['method'] = Array.isArray(f.method) ? { in: f.method } : f.method;
    if (f.currency) where['currency'] = f.currency;
    if (f.minAmount !== undefined || f.maxAmount !== undefined) {
      where['amount'] = {
        ...(f.minAmount !== undefined ? { gte: f.minAmount } : {}),
        ...(f.maxAmount !== undefined ? { lte: f.maxAmount } : {}),
      };
    }
    if (f.requestedFrom || f.requestedTo) {
      where['requestedAt'] = {
        ...(f.requestedFrom ? { gte: new Date(f.requestedFrom) } : {}),
        ...(f.requestedTo ? { lte: new Date(f.requestedTo) } : {}),
      };
    }

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
      items: rows.map(VendorPayoutPrismaMapper.toDomain),
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

  async countByVendorAndStatus(vendorId: string, status: string): Promise<number> {
    return this.delegate.count({ where: { vendorId, status, deletedAt: null } });
  }

  async sumPaidAmountByVendor(
    vendorId: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<number> {
    const where: Record<string, unknown> = {
      vendorId,
      status: 'paid',
      deletedAt: null,
    };
    if (fromDate || toDate) {
      where['paidAt'] = {
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

  async sumPendingAmountByVendor(vendorId: string): Promise<number> {
    const agg = await this.delegate.aggregate({
      where: {
        vendorId,
        status: { in: ['pending', 'processing', 'on_hold'] },
        deletedAt: null,
      },
      _sum: { netAmount: true },
    });
    return Math.round(Number(agg._sum?.netAmount ?? 0) * 100) / 100;
  }

  async getStats(vendorId?: string, fromDate?: string, toDate?: string): Promise<VendorPayoutStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;
    if (fromDate || toDate) {
      where['requestedAt'] = {
        ...(fromDate ? { gte: new Date(fromDate) } : {}),
        ...(toDate ? { lte: new Date(toDate) } : {}),
      };
    }

    const rows = await this.delegate.findMany({
      where,
      select: { status: true, method: true, amount: true, netAmount: true },
    } as never) as Array<{ status: string; method: string; amount: unknown; netAmount: unknown }>;

    const byStatus: Record<string, number> = {};
    const byMethod: Record<string, number> = {};
    let totalAmount = 0;
    let totalPaidAmount = 0;
    let totalPendingAmount = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byMethod[r.method] = (byMethod[r.method] ?? 0) + 1;
      totalAmount += Number(r.amount) || 0;
      if (r.status === 'paid') totalPaidAmount += Number(r.netAmount) || 0;
      if (r.status === 'pending' || r.status === 'processing') {
        totalPendingAmount += Number(r.netAmount) || 0;
      }
    }

    return {
      total: rows.length,
      totalAmount: Math.round(totalAmount * 100) / 100,
      totalPaidAmount: Math.round(totalPaidAmount * 100) / 100,
      totalPendingAmount: Math.round(totalPendingAmount * 100) / 100,
      averageAmount: rows.length ? Math.round((totalAmount / rows.length) * 100) / 100 : 0,
      byStatus,
      byMethod,
    };
  }
}
