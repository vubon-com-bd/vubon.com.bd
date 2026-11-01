/**
 * VendorSuspensionPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorSuspensionRepository,
  VendorSuspensionListOptions,
  VendorSuspensionPaginationResult,
} from '../../../../domain/repositories/vendor-suspension.repository.interface.js';
import { VendorSuspensionEntity } from '../../../../domain/entities/vendor-suspension.entity.js';
import { SuspensionIdVO } from '../../../../domain/value-objects/primitives/suspension-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorSuspensionPrismaMapper,
  type VendorSuspensionPrismaRow,
} from '../mappers/vendor-suspension.prisma.mapper.js';

interface SuspensionDelegate {
  findFirst(args: unknown): Promise<VendorSuspensionPrismaRow | null>;
  findMany(args: unknown): Promise<VendorSuspensionPrismaRow[]>;
  create(args: unknown): Promise<VendorSuspensionPrismaRow>;
  update(args: unknown): Promise<VendorSuspensionPrismaRow>;
  delete(args: unknown): Promise<VendorSuspensionPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorSuspensionPrismaRepository implements VendorSuspensionRepository {
  private readonly logger = new Logger(VendorSuspensionPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): SuspensionDelegate {
    return this.prisma.getModel<SuspensionDelegate>('vendorSuspension');
  }

  async findById(id: string): Promise<VendorSuspensionEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorSuspensionPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: SuspensionIdVO): Promise<VendorSuspensionEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorSuspensionEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { suspendedAt: 'desc' },
    });
    return rows.map(VendorSuspensionPrismaMapper.toDomain);
  }

  async findActiveByVendor(vendorId: VendorIdVO | string): Promise<VendorSuspensionEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, status: 'active', deletedAt: null },
      orderBy: { suspendedAt: 'desc' },
    });
    return raw ? VendorSuspensionPrismaMapper.toDomain(raw) : null;
  }

  async findUnderAppealByVendor(vendorId: VendorIdVO | string): Promise<VendorSuspensionEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, status: 'under_appeal', deletedAt: null },
    });
    return raw ? VendorSuspensionPrismaMapper.toDomain(raw) : null;
  }

  async findActive(limit = 50): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'active', deletedAt: null },
      orderBy: { suspendedAt: 'asc' },
      take: limit,
    });
    return rows.map(VendorSuspensionPrismaMapper.toDomain);
  }

  async findPastExpectedLift(): Promise<readonly VendorSuspensionEntity[]> {
    const now = new Date();
    // Simplified: active suspensions where suspendedAt + durationDays has passed
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        suspendedAt: { lt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) },
        deletedAt: null,
      },
    });
    return rows.map(VendorSuspensionPrismaMapper.toDomain);
  }

  async findSevereActive(): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        reason: { in: ['fraud', 'policy_violation'] },
        deletedAt: null,
      },
    });
    return rows.map(VendorSuspensionPrismaMapper.toDomain);
  }

  async findAutoResolvable(): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        reason: { in: ['non_payment', 'document_expired'] },
        deletedAt: null,
      },
    });
    return rows.map(VendorSuspensionPrismaMapper.toDomain);
  }

  async findExpiredAppeals(): Promise<readonly VendorSuspensionEntity[]> {
    const now = new Date();
    const rows = await this.delegate.findMany({
      where: {
        appealDeadline: { not: null, lt: now },
        status: { in: ['active', 'under_appeal'] },
        deletedAt: null,
      },
    });
    return rows.map(VendorSuspensionPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorSuspensionPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorSuspensionEntity): Promise<VendorSuspensionEntity> {
    const data = VendorSuspensionPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorSuspensionPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorSuspensionPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorSuspensionListOptions): Promise<VendorSuspensionPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.status) where['status'] = Array.isArray(f.status) ? { in: f.status } : f.status;
    if (f.reason) where['reason'] = Array.isArray(f.reason) ? { in: f.reason } : f.reason;
    if (f.isSevere) where['reason'] = { in: ['fraud', 'policy_violation'] };

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
      items: rows.map(VendorSuspensionPrismaMapper.toDomain),
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
    readonly active: number;
    readonly lifted: number;
    readonly expired: number;
    readonly underAppeal: number;
    readonly byReason: Readonly<Record<string, number>>;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { status: true, reason: true },
    } as never) as Array<{ status: string; reason: string }>;

    const byReason: Record<string, number> = {};
    let active = 0;
    let lifted = 0;
    let expired = 0;
    let underAppeal = 0;
    for (const r of rows) {
      byReason[r.reason] = (byReason[r.reason] ?? 0) + 1;
      if (r.status === 'active') active += 1;
      else if (r.status === 'lifted') lifted += 1;
      else if (r.status === 'expired') expired += 1;
      else if (r.status === 'under_appeal') underAppeal += 1;
    }
    return { total: rows.length, active, lifted, expired, underAppeal, byReason };
  }
}
