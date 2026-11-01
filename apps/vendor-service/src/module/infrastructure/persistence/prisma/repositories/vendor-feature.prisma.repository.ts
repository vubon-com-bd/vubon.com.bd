/**
 * VendorFeaturePrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorFeatureRepository,
  VendorFeatureListOptions,
  VendorFeaturePaginationResult,
} from '../../../../domain/repositories/vendor-feature.repository.interface.js';
import { VendorFeatureEntity } from '../../../../domain/entities/vendor-feature.entity.js';
import { FeatureIdVO } from '../../../../domain/value-objects/primitives/feature-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorFeaturePrismaMapper,
  type VendorFeaturePrismaRow,
} from '../mappers/vendor-feature.prisma.mapper.js';

interface FeatureDelegate {
  findFirst(args: unknown): Promise<VendorFeaturePrismaRow | null>;
  findMany(args: unknown): Promise<VendorFeaturePrismaRow[]>;
  create(args: unknown): Promise<VendorFeaturePrismaRow>;
  update(args: unknown): Promise<VendorFeaturePrismaRow>;
  delete(args: unknown): Promise<VendorFeaturePrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorFeaturePrismaRepository implements VendorFeatureRepository {
  private readonly logger = new Logger(VendorFeaturePrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): FeatureDelegate {
    return this.prisma.getModel<FeatureDelegate>('vendorFeature');
  }

  async findById(id: string): Promise<VendorFeatureEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorFeaturePrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: FeatureIdVO): Promise<VendorFeatureEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorFeatureEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
    });
    return rows.map(VendorFeaturePrismaMapper.toDomain);
  }

  async findByVendorAndKey(vendorId: string, featureKey: string): Promise<VendorFeatureEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { vendorId, featureKey, deletedAt: null },
    });
    return raw ? VendorFeaturePrismaMapper.toDomain(raw) : null;
  }

  async findEnabledByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorFeatureEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, isEnabled: true, deletedAt: null },
    });
    return rows.map(VendorFeaturePrismaMapper.toDomain);
  }

  async findByType(type: string): Promise<readonly VendorFeatureEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type, deletedAt: null },
    });
    return rows.map(VendorFeaturePrismaMapper.toDomain);
  }

  async findExpiringSoon(days: number): Promise<readonly VendorFeatureEntity[]> {
    const now = new Date();
    const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        expiresAt: { not: null, gte: now, lte: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(VendorFeaturePrismaMapper.toDomain);
  }

  async findExpired(): Promise<readonly VendorFeatureEntity[]> {
    const now = new Date();
    const rows = await this.delegate.findMany({
      where: { expiresAt: { not: null, lt: now }, deletedAt: null },
    });
    return rows.map(VendorFeaturePrismaMapper.toDomain);
  }

  async findNearLimit(usagePercent: number): Promise<readonly VendorFeatureEntity[]> {
    const rows = await this.delegate.findMany({
      where: { limit: { not: null }, deletedAt: null },
    });
    return rows
      .map(VendorFeaturePrismaMapper.toDomain)
      .filter((e) => e.usagePercent >= usagePercent);
  }

  async findLimitExceeded(): Promise<readonly VendorFeatureEntity[]> {
    const rows = await this.delegate.findMany({
      where: { limit: { not: null }, deletedAt: null },
    });
    return rows
      .map(VendorFeaturePrismaMapper.toDomain)
      .filter((e) => e.isLimitExceeded());
  }

  async findAll(): Promise<readonly VendorFeatureEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorFeaturePrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async isFeatureEnabled(vendorId: string, featureKey: string): Promise<boolean> {
    const count = await this.delegate.count({
      where: { vendorId, featureKey, isEnabled: true, deletedAt: null },
    });
    return count > 0;
  }

  async save(entity: VendorFeatureEntity): Promise<VendorFeatureEntity> {
    const data = VendorFeaturePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorFeaturePrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorFeaturePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorFeatureListOptions): Promise<VendorFeaturePaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.featureKey) {
      where['featureKey'] = Array.isArray(f.featureKey) ? { in: f.featureKey } : f.featureKey;
    }
    if (f.type) where['type'] = Array.isArray(f.type) ? { in: f.type } : f.type;
    if (f.isEnabled !== undefined) where['isEnabled'] = f.isEnabled;

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
      items: rows.map(VendorFeaturePrismaMapper.toDomain),
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
    readonly enabled: number;
    readonly active: number;
    readonly nearLimit: number;
    readonly limitExceeded: number;
    readonly byType: Readonly<Record<string, number>>;
  }> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;

    const rows = await this.delegate.findMany({ where });
    const entities = rows.map(VendorFeaturePrismaMapper.toDomain);

    const byType: Record<string, number> = {};
    let enabled = 0;
    let active = 0;
    let nearLimit = 0;
    let limitExceeded = 0;
    for (const e of entities) {
      byType[e.type.value] = (byType[e.type.value] ?? 0) + 1;
      if (e.isEnabled) enabled += 1;
      if (e.isActive()) active += 1;
      if (e.usagePercent >= 80) nearLimit += 1;
      if (e.isLimitExceeded()) limitExceeded += 1;
    }

    return { total: entities.length, enabled, active, nearLimit, limitExceeded, byType };
  }
}
