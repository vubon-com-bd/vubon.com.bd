/**
 * VendorProfilePrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorProfileRepository } from '../../../../domain/repositories/vendor-profile.repository.interface.js';
import { VendorProfileEntity } from '../../../../domain/entities/vendor-profile.entity.js';
import { VendorProfilePrismaMapper } from '../mappers/vendor-profile.prisma-mapper.js';

@Injectable()
export class VendorProfilePrismaRepository implements VendorProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorProfileEntity | null> {
    const row = await this.prisma.vendorProfile.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorProfilePrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorProfileEntity[]> {
    const rows = await this.prisma.vendorProfile.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorProfilePrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<VendorProfileEntity | null> {
    const row = await this.prisma.vendorProfile.findFirst({
      where: { vendorId, deletedAt: null },
    });
    return row ? VendorProfilePrismaMapper.toDomain(row) : null;
  }

  async existsByVendorId(vendorId: string): Promise<boolean> {
    const count = await this.prisma.vendorProfile.count({
      where: { vendorId, deletedAt: null },
    });
    return count > 0;
  }

  async upsert(entity: VendorProfileEntity): Promise<VendorProfileEntity> {
    const data = VendorProfilePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorProfile.findFirst({
      where: { vendorId: entity.vendorId },
    });
    const row = existing
      ? await this.prisma.vendorProfile.update({ where: { id: existing.id }, data })
      : await this.prisma.vendorProfile.create({ data: data as never });
    return VendorProfilePrismaMapper.toDomain(row);
  }

  async save(entity: VendorProfileEntity): Promise<VendorProfileEntity> {
    return this.upsert(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorProfile.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.vendorProfile.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorProfile.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }

  async findIncomplete(): Promise<readonly VendorProfileEntity[]> {
    const rows = await this.prisma.vendorProfile.findMany({
      where: {
        deletedAt: null,
        OR: [{ logoUrl: null }, { about: null }],
      },
    });
    return rows.map((r) => VendorProfilePrismaMapper.toDomain(r));
  }

  async findWithoutLogo(): Promise<readonly VendorProfileEntity[]> {
    const rows = await this.prisma.vendorProfile.findMany({
      where: { logoUrl: null, deletedAt: null },
    });
    return rows.map((r) => VendorProfilePrismaMapper.toDomain(r));
  }

  async findByCategory(category: string): Promise<readonly VendorProfileEntity[]> {
    const rows = await this.prisma.vendorProfile.findMany({
      where: { categories: { has: category }, deletedAt: null },
    });
    return rows.map((r) => VendorProfilePrismaMapper.toDomain(r));
  }
}
