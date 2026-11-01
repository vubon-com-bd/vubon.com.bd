/**
 * VendorDocumentPrismaRepository — implements VendorDocumentRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorDocumentRepository,
  VendorDocumentListOptions,
  VendorDocumentPaginationResult,
} from '../../../../domain/repositories/vendor-document.repository.interface.js';
import { VendorDocumentEntity } from '../../../../domain/entities/vendor-document.entity.js';
import { DocumentIdVO } from '../../../../domain/value-objects/primitives/document-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorDocumentPrismaMapper,
  type VendorDocumentPrismaRow,
} from '../mappers/vendor-document.prisma.mapper.js';

interface DocumentDelegate {
  findFirst(args: unknown): Promise<VendorDocumentPrismaRow | null>;
  findMany(args: unknown): Promise<VendorDocumentPrismaRow[]>;
  create(args: unknown): Promise<VendorDocumentPrismaRow>;
  update(args: unknown): Promise<VendorDocumentPrismaRow>;
  delete(args: unknown): Promise<VendorDocumentPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorDocumentPrismaRepository implements VendorDocumentRepository {
  private readonly logger = new Logger(VendorDocumentPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): DocumentDelegate {
    return this.prisma.getModel<DocumentDelegate>('vendorDocument');
  }

  async findById(id: string): Promise<VendorDocumentEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorDocumentPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: DocumentIdVO): Promise<VendorDocumentEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorDocumentEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { uploadedAt: 'desc' },
    });
    return rows.map(VendorDocumentPrismaMapper.toDomain);
  }

  async findByVendorAndType(
    vendorId: VendorIdVO | string,
    type: string,
  ): Promise<readonly VendorDocumentEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, type, deletedAt: null },
    });
    return rows.map(VendorDocumentPrismaMapper.toDomain);
  }

  async findPendingReview(vendorId?: VendorIdVO | string): Promise<readonly VendorDocumentEntity[]> {
    const where: Record<string, unknown> = {
      status: { in: ['pending', 'resubmitted'] },
      deletedAt: null,
    };
    if (vendorId) {
      where['vendorId'] = typeof vendorId === 'string' ? vendorId : vendorId.value;
    }
    const rows = await this.delegate.findMany({
      where,
      orderBy: { uploadedAt: 'asc' },
    });
    return rows.map(VendorDocumentPrismaMapper.toDomain);
  }

  async findVerifiedByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorDocumentEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, status: 'verified', deletedAt: null },
    });
    return rows.map(VendorDocumentPrismaMapper.toDomain);
  }

  async findExpiringSoon(days: number): Promise<readonly VendorDocumentEntity[]> {
    const now = new Date();
    const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        status: 'verified',
        expiresAt: { not: null, gte: now, lte: cutoff },
      },
    });
    return rows.map(VendorDocumentPrismaMapper.toDomain);
  }

  async findExpired(): Promise<readonly VendorDocumentEntity[]> {
    const now = new Date();
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        expiresAt: { not: null, lt: now },
      },
    });
    return rows.map(VendorDocumentPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorDocumentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorDocumentPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async existsByVendorAndType(vendorId: string, type: string): Promise<boolean> {
    const count = await this.delegate.count({
      where: { vendorId, type, deletedAt: null },
    });
    return count > 0;
  }

  async save(entity: VendorDocumentEntity): Promise<VendorDocumentEntity> {
    const data = VendorDocumentPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorDocumentPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorDocumentPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorDocumentListOptions): Promise<VendorDocumentPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.type) where['type'] = Array.isArray(f.type) ? { in: f.type } : f.type;
    if (f.status) where['status'] = Array.isArray(f.status) ? { in: f.status } : f.status;
    if (f.isExpiringSoon && f.expiringInDays) {
      const now = new Date();
      const cutoff = new Date(now.getTime() + f.expiringInDays * 24 * 60 * 60 * 1000);
      where['expiresAt'] = { not: null, gte: now, lte: cutoff };
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
      items: rows.map(VendorDocumentPrismaMapper.toDomain),
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
    readonly pending: number;
    readonly verified: number;
    readonly rejected: number;
    readonly expired: number;
    readonly byType: Readonly<Record<string, number>>;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { type: true, status: true },
    } as never) as Array<{ type: string; status: string }>;

    const byType: Record<string, number> = {};
    let pending = 0;
    let verified = 0;
    let rejected = 0;
    let expired = 0;
    for (const r of rows) {
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      if (r.status === 'pending' || r.status === 'resubmitted') pending += 1;
      else if (r.status === 'verified') verified += 1;
      else if (r.status === 'rejected') rejected += 1;
      else if (r.status === 'expired') expired += 1;
    }
    return { total: rows.length, pending, verified, rejected, expired, byType };
  }
}
