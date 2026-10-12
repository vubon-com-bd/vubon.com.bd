/**
 * VendorShippingPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorShippingRepository } from '../../../../domain/repositories/vendor-shipping.repository.interface.js';
import { VendorShippingEntity } from '../../../../domain/entities/vendor-shipping.entity.js';
import { ShippingZoneVO } from '../../../../domain/value-objects/primitives/shipping-zone.vo.js';
import { ShippingMethodVO } from '../../../../domain/value-objects/primitives/shipping-method.vo.js';
import { VendorShippingPrismaMapper } from '../mappers/vendor-shipping.prisma-mapper.js';

@Injectable()
export class VendorShippingPrismaRepository implements VendorShippingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorShippingEntity | null> {
    const row = await this.prisma.vendorShipping.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorShippingPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorShippingEntity[]> {
    const rows = await this.prisma.vendorShipping.findMany({
      where: { deletedAt: null },
    });
    return rows.map((r) => VendorShippingPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<VendorShippingEntity | null> {
    const row = await this.prisma.vendorShipping.findFirst({
      where: { vendorId, deletedAt: null },
    });
    return row ? VendorShippingPrismaMapper.toDomain(row) : null;
  }

  async existsByVendorId(vendorId: string): Promise<boolean> {
    const c = await this.prisma.vendorShipping.count({
      where: { vendorId, deletedAt: null },
    });
    return c > 0;
  }

  async upsert(entity: VendorShippingEntity): Promise<VendorShippingEntity> {
    const data = VendorShippingPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorShipping.findFirst({
      where: { vendorId: entity.vendorId },
    });
    const row = existing
      ? await this.prisma.vendorShipping.update({ where: { id: existing.id }, data })
      : await this.prisma.vendorShipping.create({ data: data as never });
    return VendorShippingPrismaMapper.toDomain(row);
  }

  async save(entity: VendorShippingEntity): Promise<VendorShippingEntity> {
    return this.upsert(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorShipping.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorShipping.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async findSupportingZone(zone: ShippingZoneVO): Promise<readonly VendorShippingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.supportsZone(zone));
  }

  async findSupportingMethod(method: ShippingMethodVO): Promise<readonly VendorShippingEntity[]> {
    const all = await this.findAll();
    return all.filter((e) => e.supportsMethod(method));
  }

  async findSameDaySupport(): Promise<readonly VendorShippingEntity[]> {
    const method = ShippingMethodVO.create('same_day');
    return this.findSupportingMethod(method);
  }

  async findWithFreeShipping(): Promise<readonly VendorShippingEntity[]> {
    const rows = await this.prisma.vendorShipping.findMany({
      where: { freeShippingThreshold: { not: null }, deletedAt: null },
    });
    return rows.map((r) => VendorShippingPrismaMapper.toDomain(r));
  }

  async findWithoutActiveRates(): Promise<readonly VendorShippingEntity[]> {
    const rows = await this.prisma.vendorShipping.findMany({
      where: { deletedAt: null },
    });
    const entities = rows.map((r) => VendorShippingPrismaMapper.toDomain(r));
    return entities.filter((e) => e.getActiveRates().length === 0);
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorShipping.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
