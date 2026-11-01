/**
 * VendorCommissionPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorCommissionRepository,
  VendorCommissionListOptions,
  VendorCommissionPaginationResult,
} from '../../../../domain/repositories/vendor-commission.repository.interface.js';
import { VendorCommissionEntity } from '../../../../domain/entities/vendor-commission.entity.js';
import { CommissionIdVO } from '../../../../domain/value-objects/primitives/commission-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorCommissionPrismaMapper,
  type VendorCommissionPrismaRow,
} from '../mappers/vendor-commission.prisma.mapper.js';

interface CommissionDelegate {
  findFirst(args: unknown): Promise<VendorCommissionPrismaRow | null>;
  findMany(args: unknown): Promise<VendorCommissionPrismaRow[]>;
  create(args: unknown): Promise<VendorCommissionPrismaRow>;
  update(args: unknown): Promise<VendorCommissionPrismaRow>;
  updateMany(args: unknown): Promise<{ count: number }>;
  delete(args: unknown): Promise<VendorCommissionPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorCommissionPrismaRepository implements VendorCommissionRepository {
  private readonly logger = new Logger(VendorCommissionPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): CommissionDelegate {
    return this.prisma.getModel<CommissionDelegate>('vendorCommission');
  }

  async findById(id: string): Promise<VendorCommissionEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorCommissionPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: CommissionIdVO): Promise<VendorCommissionEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorCommissionEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { effectiveFrom: 'desc' },
    });
    return rows.map(VendorCommissionPrismaMapper.toDomain);
  }

  async findActiveByVendor(vendorId: VendorIdVO | string): Promise<VendorCommissionEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, isActive: true, deletedAt: null },
      orderBy: { effectiveFrom: 'desc' },
    });
    return raw ? VendorCommissionPrismaMapper.toDomain(raw) : null;
  }

  async findEffectiveForDate(
    vendorId: string,
    effectiveDate: string,
  ): Promise<VendorCommissionEntity | null> {
    const date = new Date(effectiveDate);
    const raw = await this.delegate.findFirst({
      where: {
        vendorId,
        deletedAt: null,
        effectiveFrom: { lte: date },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: date } }],
      },
      orderBy: { effectiveFrom: 'desc' },
    });
    return raw ? VendorCommissionPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorCommissionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorCommissionPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorCommissionEntity): Promise<VendorCommissionEntity> {
    const data = VendorCommissionPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorCommissionPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorCommissionPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorCommissionListOptions): Promise<VendorCommissionPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.type) where['type'] = Array.isArray(f.type) ? { in: f.type } : f.type;
    if (f.isActive !== undefined) where['isActive'] = f.isActive;
    if (f.isExpired === true) where['effectiveTo'] = { lt: new Date() };
    if (f.minRate !== undefined) where['percent'] = { gte: f.minRate };
    if (f.effectiveOn) {
      const date = new Date(f.effectiveOn);
      where['effectiveFrom'] = { lte: date };
      where['OR'] = [{ effectiveTo: null }, { effectiveTo: { gte: date } }];
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
      items: rows.map(VendorCommissionPrismaMapper.toDomain),
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
    readonly expired: number;
    readonly averageRate: number;
    readonly byType: Readonly<Record<string, number>>;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { type: true, percent: true, isActive: true, effectiveTo: true },
    } as never) as Array<{ type: string; percent: unknown; isActive: boolean; effectiveTo: Date | null }>;

    const byType: Record<string, number> = {};
    let active = 0;
    let expired = 0;
    let totalRate = 0;
    const now = Date.now();

    for (const r of rows) {
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      if (r.isActive) active += 1;
      if (r.effectiveTo && new Date(r.effectiveTo).getTime() < now) expired += 1;
      totalRate += Number(r.percent) || 0;
    }

    return {
      total: rows.length,
      active,
      expired,
      averageRate: rows.length ? Math.round((totalRate / rows.length) * 100) / 100 : 0,
      byType,
    };
  }
}
