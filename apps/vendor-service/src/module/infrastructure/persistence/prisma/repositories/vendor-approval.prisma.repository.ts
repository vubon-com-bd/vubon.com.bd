/**
 * VendorApprovalPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorApprovalRepository,
  VendorApprovalListOptions,
  VendorApprovalPaginationResult,
} from '../../../../domain/repositories/vendor-approval.repository.interface.js';
import { VendorApprovalEntity } from '../../../../domain/entities/vendor-approval.entity.js';
import { ApprovalIdVO } from '../../../../domain/value-objects/primitives/approval-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorApprovalPrismaMapper,
  type VendorApprovalPrismaRow,
} from '../mappers/vendor-approval.prisma.mapper.js';

interface ApprovalDelegate {
  findFirst(args: unknown): Promise<VendorApprovalPrismaRow | null>;
  findMany(args: unknown): Promise<VendorApprovalPrismaRow[]>;
  create(args: unknown): Promise<VendorApprovalPrismaRow>;
  update(args: unknown): Promise<VendorApprovalPrismaRow>;
  delete(args: unknown): Promise<VendorApprovalPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorApprovalPrismaRepository implements VendorApprovalRepository {
  private readonly logger = new Logger(VendorApprovalPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): ApprovalDelegate {
    return this.prisma.getModel<ApprovalDelegate>('vendorApproval');
  }

  async findById(id: string): Promise<VendorApprovalEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorApprovalPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: ApprovalIdVO): Promise<VendorApprovalEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorApprovalEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { submittedAt: 'desc' },
    });
    return rows.map(VendorApprovalPrismaMapper.toDomain);
  }

  async findLatestByVendor(vendorId: VendorIdVO | string): Promise<VendorApprovalEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { submittedAt: 'desc' },
    });
    return raw ? VendorApprovalPrismaMapper.toDomain(raw) : null;
  }

  async findPending(limit = 50): Promise<readonly VendorApprovalEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'pending', deletedAt: null },
      orderBy: { submittedAt: 'asc' },
      take: limit,
    });
    return rows.map(VendorApprovalPrismaMapper.toDomain);
  }

  async findUnderAppeal(limit = 50): Promise<readonly VendorApprovalEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'under_appeal', deletedAt: null },
      take: limit,
    });
    return rows.map(VendorApprovalPrismaMapper.toDomain);
  }

  async findApprovedByVendor(vendorId: VendorIdVO | string): Promise<VendorApprovalEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, status: 'approved', deletedAt: null },
    });
    return raw ? VendorApprovalPrismaMapper.toDomain(raw) : null;
  }

  async findRejectedByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorApprovalEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, status: 'rejected', deletedAt: null },
    });
    return rows.map(VendorApprovalPrismaMapper.toDomain);
  }

  async findOverdue(): Promise<readonly VendorApprovalEntity[]> {
    const now = new Date();
    const rows = await this.delegate.findMany({
      where: {
        status: 'pending',
        slaDeadline: { not: null, lt: now },
        deletedAt: null,
      },
    });
    return rows.map(VendorApprovalPrismaMapper.toDomain);
  }

  async findEligibleForAutoApproval(_threshold: number): Promise<readonly VendorApprovalEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'pending', deletedAt: null },
    });
    return rows.map(VendorApprovalPrismaMapper.toDomain);
  }

  async findWithExpiredAppealWindow(): Promise<readonly VendorApprovalEntity[]> {
    const now = new Date();
    const rows = await this.delegate.findMany({
      where: {
        status: 'rejected',
        appealDeadline: { not: null, lt: now },
        deletedAt: null,
      },
    });
    return rows.map(VendorApprovalPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorApprovalEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorApprovalPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorApprovalEntity): Promise<VendorApprovalEntity> {
    const data = VendorApprovalPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorApprovalPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorApprovalPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorApprovalListOptions): Promise<VendorApprovalPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.status) where['status'] = Array.isArray(f.status) ? { in: f.status } : f.status;
    if (f.reason) where['reason'] = Array.isArray(f.reason) ? { in: f.reason } : f.reason;

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
      items: rows.map(VendorApprovalPrismaMapper.toDomain),
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
    readonly byStatus: Readonly<Record<string, number>>;
    readonly byReason: Readonly<Record<string, number>>;
    readonly overdue: number;
    readonly averageScore: number;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { status: true, reason: true },
    } as never) as Array<{ status: string; reason: string | null }>;

    const byStatus: Record<string, number> = {};
    const byReason: Record<string, number> = {};
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      if (r.reason) byReason[r.reason] = (byReason[r.reason] ?? 0) + 1;
    }
    return {
      total: rows.length,
      byStatus,
      byReason,
      overdue: byStatus['pending'] ?? 0,
      averageScore: 0,
    };
  }
}
