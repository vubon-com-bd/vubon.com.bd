/**
 * VendorVerificationPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorVerificationRepository,
  VendorVerificationListOptions,
  VendorVerificationPaginationResult,
} from '../../../../domain/repositories/vendor-verification.repository.interface.js';
import { VendorVerificationEntity } from '../../../../domain/entities/vendor-verification.entity.js';
import { VerificationIdVO } from '../../../../domain/value-objects/primitives/verification-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorVerificationPrismaMapper,
  type VendorVerificationPrismaRow,
} from '../mappers/vendor-verification.prisma.mapper.js';

interface VerificationDelegate {
  findFirst(args: unknown): Promise<VendorVerificationPrismaRow | null>;
  findMany(args: unknown): Promise<VendorVerificationPrismaRow[]>;
  create(args: unknown): Promise<VendorVerificationPrismaRow>;
  update(args: unknown): Promise<VendorVerificationPrismaRow>;
  delete(args: unknown): Promise<VendorVerificationPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorVerificationPrismaRepository implements VendorVerificationRepository {
  private readonly logger = new Logger(VendorVerificationPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): VerificationDelegate {
    return this.prisma.getModel<VerificationDelegate>('vendorVerification');
  }

  async findById(id: string): Promise<VendorVerificationEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorVerificationPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: VerificationIdVO): Promise<VendorVerificationEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorVerificationEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
    });
    return rows.map(VendorVerificationPrismaMapper.toDomain);
  }

  async findByVendorAndType(
    vendorId: VendorIdVO | string,
    _type: string,
  ): Promise<VendorVerificationEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
    });
    return raw ? VendorVerificationPrismaMapper.toDomain(raw) : null;
  }

  async findPending(limit = 50): Promise<readonly VendorVerificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: { overallStatus: 'pending', deletedAt: null },
      orderBy: { submittedAt: 'asc' },
      take: limit,
    });
    return rows.map(VendorVerificationPrismaMapper.toDomain);
  }

  async findInReview(limit = 50): Promise<readonly VendorVerificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: { overallStatus: 'in_review', deletedAt: null },
      take: limit,
    });
    return rows.map(VendorVerificationPrismaMapper.toDomain);
  }

  async findApprovedByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorVerificationEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, overallStatus: 'approved', deletedAt: null },
    });
    return rows.map(VendorVerificationPrismaMapper.toDomain);
  }

  async findOverdue(): Promise<readonly VendorVerificationEntity[]> {
    const cutoff = new Date(Date.now() - 72 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        overallStatus: 'pending',
        submittedAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(VendorVerificationPrismaMapper.toDomain);
  }

  async findExpiredByDate(): Promise<readonly VendorVerificationEntity[]> {
    const now = new Date();
    const rows = await this.delegate.findMany({
      where: { expiresAt: { not: null, lt: now }, deletedAt: null },
    });
    return rows.map(VendorVerificationPrismaMapper.toDomain);
  }

  async findExpiringSoon(days: number): Promise<readonly VendorVerificationEntity[]> {
    const now = new Date();
    const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        expiresAt: { not: null, gte: now, lte: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(VendorVerificationPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorVerificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorVerificationPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async existsByVendorAndType(vendorId: string, _type: string): Promise<boolean> {
    const count = await this.delegate.count({
      where: { vendorId, deletedAt: null },
    });
    return count > 0;
  }

  async save(entity: VendorVerificationEntity): Promise<VendorVerificationEntity> {
    const data = VendorVerificationPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorVerificationPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorVerificationPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorVerificationListOptions): Promise<VendorVerificationPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.status) where['overallStatus'] = Array.isArray(f.status) ? { in: f.status } : f.status;

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
      items: rows.map(VendorVerificationPrismaMapper.toDomain),
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
    readonly byType: Readonly<Record<string, number>>;
    readonly overdue: number;
    readonly expiringSoon: number;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { overallStatus: true },
    } as never) as Array<{ overallStatus: string }>;

    const byStatus: Record<string, number> = {};
    for (const r of rows) {
      byStatus[r.overallStatus] = (byStatus[r.overallStatus] ?? 0) + 1;
    }
    return {
      total: rows.length,
      byStatus,
      byType: {},
      overdue: byStatus['pending'] ?? 0,
      expiringSoon: 0,
    };
  }
}
