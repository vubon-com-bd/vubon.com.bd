/**
 * VendorShippingPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorShippingRepository,
  VendorShippingListOptions,
  VendorShippingPaginationResult,
} from '../../../../domain/repositories/vendor-shipping.repository.interface.js';
import { VendorShippingEntity } from '../../../../domain/entities/vendor-shipping.entity.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorShippingPrismaMapper,
  type VendorShippingPrismaRow,
} from '../mappers/vendor-shipping.prisma.mapper.js';

interface ShippingDelegate {
  findFirst(args: unknown): Promise<VendorShippingPrismaRow | null>;
  findMany(args: unknown): Promise<VendorShippingPrismaRow[]>;
  create(args: unknown): Promise<VendorShippingPrismaRow>;
  update(args: unknown): Promise<VendorShippingPrismaRow>;
  delete(args: unknown): Promise<VendorShippingPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorShippingPrismaRepository implements VendorShippingRepository {
  private readonly logger = new Logger(VendorShippingPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): ShippingDelegate {
    return this.prisma.getModel<ShippingDelegate>('vendorShipping');
  }

  async findById(id: string): Promise<VendorShippingEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorShippingPrismaMapper.toDomain(raw) : null;
  }

  async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorShippingEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
    });
    return raw ? VendorShippingPrismaMapper.toDomain(raw) : null;
  }

  async findSupportingMethod(method: string): Promise<readonly VendorShippingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
    });
    return rows
      .map(VendorShippingPrismaMapper.toDomain)
      .filter((e) => e.supportsMethod(method));
  }

  async findSupportingZone(zone: string): Promise<readonly VendorShippingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
    });
    return rows
      .map(VendorShippingPrismaMapper.toDomain)
      .filter((e) => e.supportsZone(zone));
  }

  async findWithFreeShipping(): Promise<readonly VendorShippingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { freeShippingThreshold: { not: null }, deletedAt: null },
    });
    return rows.map(VendorShippingPrismaMapper.toDomain);
  }

  async findWithExpressShipping(): Promise<readonly VendorShippingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
    });
    return rows
      .map(VendorShippingPrismaMapper.toDomain)
      .filter((e) => e.hasExpressShipping());
  }

  async findShipsInternationally(): Promise<readonly VendorShippingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
    });
    return rows
      .map(VendorShippingPrismaMapper.toDomain)
      .filter((e) => e.shipsInternationally());
  }

  async findAll(): Promise<readonly VendorShippingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorShippingPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorShippingEntity): Promise<VendorShippingEntity> {
    const data = VendorShippingPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorShippingPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorShippingPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorShippingListOptions): Promise<VendorShippingPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.hasFreeShipping) where['freeShippingThreshold'] = { not: null };
    if (f.allowsPickup !== undefined) where['allowsPickup'] = f.allowsPickup;
    if (f.allowsCourier !== undefined) where['allowsCourier'] = f.allowsCourier;
    if (f.maxProcessingDays !== undefined) where['processingDays'] = { lte: f.maxProcessingDays };

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
      items: rows.map(VendorShippingPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<{
    readonly total: number;
    readonly withFreeShipping: number;
    readonly withExpress: number;
    readonly withInternational: number;
    readonly averageProcessingDays: number;
    readonly byMethodUsage: Readonly<Record<string, number>>;
    readonly byZoneUsage: Readonly<Record<string, number>>;
  }> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    const entities = rows.map(VendorShippingPrismaMapper.toDomain);

    const byMethodUsage: Record<string, number> = {};
    const byZoneUsage: Record<string, number> = {};
    let freeShipping = 0;
    let express = 0;
    let international = 0;
    let totalProcessing = 0;

    for (const e of entities) {
      for (const m of e.methods) {
        byMethodUsage[m.value] = (byMethodUsage[m.value] ?? 0) + 1;
      }
      for (const z of e.zones) {
        byZoneUsage[z.zone] = (byZoneUsage[z.zone] ?? 0) + 1;
      }
      if (e.hasFreeShipping()) freeShipping += 1;
      if (e.hasExpressShipping()) express += 1;
      if (e.shipsInternationally()) international += 1;
      totalProcessing += e.processingDays;
    }

    return {
      total: entities.length,
      withFreeShipping: freeShipping,
      withExpress: express,
      withInternational: international,
      averageProcessingDays: entities.length
        ? Math.round((totalProcessing / entities.length) * 10) / 10
        : 0,
      byMethodUsage,
      byZoneUsage,
    };
  }

  async calculateShippingCost(vendorId: string, zone: string, orderAmount: number): Promise<number> {
    const entity = await this.findByVendorId(vendorId);
    if (!entity) return 0;
    return entity.calculateCost(zone, orderAmount);
  }
}
