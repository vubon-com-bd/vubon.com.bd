/**
 * VendorReturnPolicyPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorReturnPolicyRepository,
  VendorReturnPolicyListOptions,
  VendorReturnPolicyPaginationResult,
} from '../../../../domain/repositories/vendor-return-policy.repository.interface.js';
import { VendorReturnPolicyEntity } from '../../../../domain/entities/vendor-return-policy.entity.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorReturnPolicyPrismaMapper,
  type VendorReturnPolicyPrismaRow,
} from '../mappers/vendor-return-policy.prisma.mapper.js';

interface ReturnPolicyDelegate {
  findFirst(args: unknown): Promise<VendorReturnPolicyPrismaRow | null>;
  findMany(args: unknown): Promise<VendorReturnPolicyPrismaRow[]>;
  create(args: unknown): Promise<VendorReturnPolicyPrismaRow>;
  update(args: unknown): Promise<VendorReturnPolicyPrismaRow>;
  delete(args: unknown): Promise<VendorReturnPolicyPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorReturnPolicyPrismaRepository implements VendorReturnPolicyRepository {
  private readonly logger = new Logger(VendorReturnPolicyPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): ReturnPolicyDelegate {
    return this.prisma.getModel<ReturnPolicyDelegate>('vendorReturnPolicy');
  }

  async findById(id: string): Promise<VendorReturnPolicyEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorReturnPolicyPrismaMapper.toDomain(raw) : null;
  }

  async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorReturnPolicyEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
    });
    return raw ? VendorReturnPolicyPrismaMapper.toDomain(raw) : null;
  }

  async findByType(type: string): Promise<readonly VendorReturnPolicyEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type, deletedAt: null },
    });
    return rows.map(VendorReturnPolicyPrismaMapper.toDomain);
  }

  async findFreeReturn(): Promise<readonly VendorReturnPolicyEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isFreeReturn: true, deletedAt: null },
    });
    return rows.map(VendorReturnPolicyPrismaMapper.toDomain);
  }

  async findAutoApprove(): Promise<readonly VendorReturnPolicyEntity[]> {
    const rows = await this.delegate.findMany({
      where: { autoApprove: true, deletedAt: null },
    });
    return rows.map(VendorReturnPolicyPrismaMapper.toDomain);
  }

  async findWithExtendedWindow(minDays: number): Promise<readonly VendorReturnPolicyEntity[]> {
    const rows = await this.delegate.findMany({
      where: { windowDays: { gte: minDays }, deletedAt: null },
    });
    return rows.map(VendorReturnPolicyPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorReturnPolicyEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorReturnPolicyPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorReturnPolicyEntity): Promise<VendorReturnPolicyEntity> {
    const data = VendorReturnPolicyPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorReturnPolicyPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorReturnPolicyPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorReturnPolicyListOptions): Promise<VendorReturnPolicyPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.type) where['type'] = Array.isArray(f.type) ? { in: f.type } : f.type;
    if (f.isFreeReturn !== undefined) where['isFreeReturn'] = f.isFreeReturn;
    if (f.autoApprove !== undefined) where['autoApprove'] = f.autoApprove;
    if (f.minWindowDays !== undefined) where['windowDays'] = { gte: f.minWindowDays };
    if (f.maxWindowDays !== undefined) {
      where['windowDays'] = { ...(where['windowDays'] as object ?? {}), lte: f.maxWindowDays };
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
      items: rows.map(VendorReturnPolicyPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<{
    readonly total: number;
    readonly allowsReturn: number;
    readonly freeReturn: number;
    readonly autoApprove: number;
    readonly averageWindowDays: number;
    readonly byType: Readonly<Record<string, number>>;
  }> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const entities = rows.map(VendorReturnPolicyPrismaMapper.toDomain);

    const byType: Record<string, number> = {};
    let allows = 0;
    let free = 0;
    let auto = 0;
    let totalWindow = 0;

    for (const e of entities) {
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      if (e.allowsReturn()) allows += 1;
      if (e.isFreeReturn) free += 1;
      if (e.autoApprove) auto += 1;
      totalWindow += e.windowDays;
    }

    return {
      total: entities.length,
      allowsReturn: allows,
      freeReturn: free,
      autoApprove: auto,
      averageWindowDays: entities.length
        ? Math.round((totalWindow / entities.length) * 10) / 10
        : 0,
      byType,
    };
  }
}
