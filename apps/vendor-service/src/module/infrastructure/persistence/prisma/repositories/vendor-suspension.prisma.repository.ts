/**
 * VendorSuspensionPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorSuspensionRepository } from '../../../../domain/repositories/vendor-suspension.repository.interface.js';
import { VendorSuspensionEntity } from '../../../../domain/entities/vendor-suspension.entity.js';
import { VendorSuspensionPrismaMapper } from '../mappers/vendor-suspension.prisma-mapper.js';

@Injectable()
export class VendorSuspensionPrismaRepository implements VendorSuspensionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorSuspensionEntity | null> {
    const row = await this.prisma.vendorSuspension.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorSuspensionPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.prisma.vendorSuspension.findMany({
      where: { deletedAt: null },
      orderBy: { suspendedAt: 'desc' },
    });
    return rows.map((r) => VendorSuspensionPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.prisma.vendorSuspension.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { suspendedAt: 'desc' },
    });
    return rows.map((r) => VendorSuspensionPrismaMapper.toDomain(r));
  }

  async findActiveByVendorId(vendorId: string): Promise<VendorSuspensionEntity | null> {
    const row = await this.prisma.vendorSuspension.findFirst({
      where: { vendorId, liftedAt: null, deletedAt: null },
      orderBy: { suspendedAt: 'desc' },
    });
    return row ? VendorSuspensionPrismaMapper.toDomain(row) : null;
  }

  async findLatestByVendorId(vendorId: string): Promise<VendorSuspensionEntity | null> {
    const row = await this.prisma.vendorSuspension.findFirst({
      where: { vendorId, deletedAt: null },
      orderBy: { suspendedAt: 'desc' },
    });
    return row ? VendorSuspensionPrismaMapper.toDomain(row) : null;
  }

  async findActive(): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.prisma.vendorSuspension.findMany({
      where: { liftedAt: null, deletedAt: null },
      orderBy: { suspendedAt: 'desc' },
    });
    return rows.map((r) => VendorSuspensionPrismaMapper.toDomain(r));
  }

  async findExpiredButActive(): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.prisma.vendorSuspension.findMany({
      where: { liftedAt: null, deletedAt: null },
    });
    const entities = rows.map((r) => VendorSuspensionPrismaMapper.toDomain(r));
    return entities.filter((e) => e.isExpired() && !e.isLifted);
  }

  async findWithPendingAppeal(): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.prisma.vendorSuspension.findMany({
      where: {
        appealSubmittedAt: { not: null },
        liftedAt: null,
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorSuspensionPrismaMapper.toDomain(r));
  }

  async findAutoLiftCandidates(): Promise<readonly VendorSuspensionEntity[]> {
    const rows = await this.prisma.vendorSuspension.findMany({
      where: {
        liftedAt: null,
        autoLiftOnResolution: true,
        deletedAt: null,
      },
    });
    const entities = rows.map((r) => VendorSuspensionPrismaMapper.toDomain(r));
    return entities.filter((e) => e.isExpired());
  }

  async countActive(): Promise<number> {
    return this.prisma.vendorSuspension.count({
      where: { liftedAt: null, deletedAt: null },
    });
  }

  async countByVendor(vendorId: string): Promise<number> {
    return this.prisma.vendorSuspension.count({
      where: { vendorId, deletedAt: null },
    });
  }

  async save(entity: VendorSuspensionEntity): Promise<VendorSuspensionEntity> {
    const data = VendorSuspensionPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorSuspension.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorSuspension.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorSuspension.create({ data: data as never });
    return VendorSuspensionPrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorSuspension.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorSuspension.count({ where: { id, deletedAt: null } });
    return c > 0;
  }
}
