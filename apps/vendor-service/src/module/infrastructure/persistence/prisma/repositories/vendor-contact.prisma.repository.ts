/**
 * VendorContactPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorContactRepository,
  VendorContactListOptions,
  VendorContactPaginationResult,
} from '../../../../domain/repositories/vendor-contact.repository.interface.js';
import { VendorContactEntity } from '../../../../domain/entities/vendor-contact.entity.js';
import { ContactIdVO } from '../../../../domain/value-objects/primitives/contact-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorContactPrismaMapper,
  type VendorContactPrismaRow,
} from '../mappers/vendor-contact.prisma.mapper.js';

interface ContactDelegate {
  findFirst(args: unknown): Promise<VendorContactPrismaRow | null>;
  findMany(args: unknown): Promise<VendorContactPrismaRow[]>;
  create(args: unknown): Promise<VendorContactPrismaRow>;
  update(args: unknown): Promise<VendorContactPrismaRow>;
  delete(args: unknown): Promise<VendorContactPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorContactPrismaRepository implements VendorContactRepository {
  private readonly logger = new Logger(VendorContactPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): ContactDelegate {
    return this.prisma.getModel<ContactDelegate>('vendorContact');
  }

  async findById(id: string): Promise<VendorContactEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorContactPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: ContactIdVO): Promise<VendorContactEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorContactEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }],
    });
    return rows.map(VendorContactPrismaMapper.toDomain);
  }

  async findByVendorAndType(
    vendorId: VendorIdVO | string,
    type: string,
  ): Promise<readonly VendorContactEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, type, deletedAt: null },
    });
    return rows.map(VendorContactPrismaMapper.toDomain);
  }

  async findPrimaryByVendor(vendorId: VendorIdVO | string): Promise<VendorContactEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, isPrimary: true, deletedAt: null },
    });
    return raw ? VendorContactPrismaMapper.toDomain(raw) : null;
  }

  async findByValue(value: string): Promise<readonly VendorContactEntity[]> {
    const rows = await this.delegate.findMany({
      where: { value, deletedAt: null },
    });
    return rows.map(VendorContactPrismaMapper.toDomain);
  }

  async findUnverifiedByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorContactEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, isVerified: false, deletedAt: null },
    });
    return rows.map(VendorContactPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorContactEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorContactPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async existsByVendorAndValue(vendorId: string, value: string): Promise<boolean> {
    const count = await this.delegate.count({
      where: { vendorId, value, deletedAt: null },
    });
    return count > 0;
  }

  async save(entity: VendorContactEntity): Promise<VendorContactEntity> {
    const data = VendorContactPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorContactPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorContactPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorContactListOptions): Promise<VendorContactPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.type) {
      where['type'] = Array.isArray(f.type) ? { in: f.type } : f.type;
    }
    if (f.isPrimary !== undefined) where['isPrimary'] = f.isPrimary;
    if (f.isVerified !== undefined) where['isVerified'] = f.isVerified;
    if (f.search) where['value'] = { contains: f.search, mode: 'insensitive' };

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
      items: rows.map(VendorContactPrismaMapper.toDomain),
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
    readonly verified: number;
    readonly byType: Readonly<Record<string, number>>;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({
      where,
      select: { type: true, isVerified: true },
    } as never) as Array<{ type: string; isVerified: boolean }>;

    const byType: Record<string, number> = {};
    let verified = 0;
    for (const r of rows) {
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      if (r.isVerified) verified += 1;
    }
    return { total: rows.length, verified, byType };
  }
}
