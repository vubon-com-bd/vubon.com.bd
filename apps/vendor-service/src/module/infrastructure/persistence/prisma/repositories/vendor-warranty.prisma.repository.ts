/**
 * VendorWarrantyPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorWarrantyRepository } from '../../../../domain/repositories/vendor-warranty.repository.interface.js';
import { VendorWarrantyEntity } from '../../../../domain/entities/vendor-warranty.entity.js';
import { WarrantyTypeVO } from '../../../../domain/value-objects/primitives/warranty-type.vo.js';
import { VendorWarrantyPrismaMapper } from '../mappers/vendor-warranty.prisma-mapper.js';

@Injectable()
export class VendorWarrantyPrismaRepository implements VendorWarrantyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorWarrantyEntity | null> {
    const row = await this.prisma.vendorWarranty.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorWarrantyPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.prisma.vendorWarranty.findMany({
      where: { deletedAt: null },
    });
    return rows.map((r) => VendorWarrantyPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<VendorWarrantyEntity | null> {
    const row = await this.prisma.vendorWarranty.findFirst({
      where: { vendorId, deletedAt: null },
    });
    return row ? VendorWarrantyPrismaMapper.toDomain(row) : null;
  }

  async existsByVendorId(vendorId: string): Promise<boolean> {
    const c = await this.prisma.vendorWarranty.count({
      where: { vendorId, deletedAt: null },
    });
    return c > 0;
  }

  async upsert(entity: VendorWarrantyEntity): Promise<VendorWarrantyEntity> {
    const data = VendorWarrantyPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorWarranty.findFirst({
      where: { vendorId: entity.vendorId },
    });
    const row = existing
      ? await this.prisma.vendorWarranty.update({ where: { id: existing.id }, data })
      : await this.prisma.vendorWarranty.create({ data: data as never });
    return VendorWarrantyPrismaMapper.toDomain(row);
  }

  async save(entity: VendorWarrantyEntity): Promise<VendorWarrantyEntity> {
    return this.upsert(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorWarranty.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorWarranty.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async findWithNoWarranty(): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.prisma.vendorWarranty.findMany({
      where: { defaultType: 'none', deletedAt: null },
    });
    return rows.map((r) => VendorWarrantyPrismaMapper.toDomain(r));
  }

  async findByType(type: WarrantyTypeVO): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.prisma.vendorWarranty.findMany({
      where: { defaultType: type.value, deletedAt: null },
    });
    return rows.map((r) => VendorWarrantyPrismaMapper.toDomain(r));
  }

  async findCoveringShipping(): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.prisma.vendorWarranty.findMany({
      where: { coversShipping: true, deletedAt: null },
    });
    return rows.map((r) => VendorWarrantyPrismaMapper.toDomain(r));
  }

  async findLongTermWarranty(): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.prisma.vendorWarranty.findMany({
      where: { defaultPeriodDays: { gte: 365 }, deletedAt: null },
    });
    return rows.map((r) => VendorWarrantyPrismaMapper.toDomain(r));
  }

  async findWithExclusions(): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.prisma.vendorWarranty.findMany({
      where: { deletedAt: null },
    });
    const entities = rows.map((r) => VendorWarrantyPrismaMapper.toDomain(r));
    return entities.filter((e) => e.exclusions.length > 0);
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorWarranty.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
