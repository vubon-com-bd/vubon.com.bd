/**
 * VendorWarrantyPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorWarrantyRepository,
  VendorWarrantyListOptions,
  VendorWarrantyPaginationResult,
} from '../../../../domain/repositories/vendor-warranty.repository.interface.js';
import { VendorWarrantyEntity } from '../../../../domain/entities/vendor-warranty.entity.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorWarrantyPrismaMapper,
  type VendorWarrantyPrismaRow,
} from '../mappers/vendor-warranty.prisma.mapper.js';

interface WarrantyDelegate {
  findFirst(args: unknown): Promise<VendorWarrantyPrismaRow | null>;
  findMany(args: unknown): Promise<VendorWarrantyPrismaRow[]>;
  create(args: unknown): Promise<VendorWarrantyPrismaRow>;
  update(args: unknown): Promise<VendorWarrantyPrismaRow>;
  delete(args: unknown): Promise<VendorWarrantyPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorWarrantyPrismaRepository implements VendorWarrantyRepository {
  private readonly logger = new Logger(VendorWarrantyPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): WarrantyDelegate {
    return this.prisma.getModel<WarrantyDelegate>('vendorWarranty');
  }

  async findById(id: string): Promise<VendorWarrantyEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorWarrantyPrismaMapper.toDomain(raw) : null;
  }

  async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorWarrantyEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
    });
    return raw ? VendorWarrantyPrismaMapper.toDomain(raw) : null;
  }

  async findByType(type: string): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type, deletedAt: null },
    });
    return rows.map(VendorWarrantyPrismaMapper.toDomain);
  }

  async findProvidingCoverage(): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type: { not: 'none' }, deletedAt: null },
    });
    return rows.map(VendorWarrantyPrismaMapper.toDomain);
  }

  async findExtendedWarranties(): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type: 'extended', deletedAt: null },
    });
    return rows.map(VendorWarrantyPrismaMapper.toDomain);
  }

  async findManufacturerBacked(): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type: { in: ['manufacturer', 'international'] }, deletedAt: null },
    });
    return rows.map(VendorWarrantyPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorWarrantyPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorWarrantyEntity): Promise<VendorWarrantyEntity> {
    const data = VendorWarrantyPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorWarrantyPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorWarrantyPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorWarrantyListOptions): Promise<VendorWarrantyPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.type) where['type'] = Array.isArray(f.type) ? { in: f.type } : f.type;
    if (f.providesCoverage === true) where['type'] = { not: 'none' };
    if (f.coverShipping !== undefined) where['coverShipping'] = f.coverShipping;
    if (f.minPeriodDays !== undefined) where['periodDays'] = { gte: f.minPeriodDays };
    if (f.maxPeriodDays !== undefined) {
      where['periodDays'] = { ...(where['periodDays'] as object ?? {}), lte: f.maxPeriodDays };
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
      items: rows.map(VendorWarrantyPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<{
    readonly total: number;
    readonly withCoverage: number;
    readonly averagePeriodDays: number;
    readonly byType: Readonly<Record<string, number>>;
  }> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const entities = rows.map(VendorWarrantyPrismaMapper.toDomain);

    const byType: Record<string, number> = {};
    let withCoverage = 0;
    let totalDays = 0;
    for (const e of entities) {
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      if (e.providesCoverage()) withCoverage += 1;
      totalDays += e.periodDays;
    }

    return {
      total: entities.length,
      withCoverage,
      averagePeriodDays: entities.length
        ? Math.round((totalDays / entities.length) * 10) / 10
        : 0,
      byType,
    };
  }
}
