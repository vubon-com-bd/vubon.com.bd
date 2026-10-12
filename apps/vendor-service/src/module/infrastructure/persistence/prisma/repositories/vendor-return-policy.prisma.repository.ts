/**
 * VendorReturnPolicyPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { VendorReturnPolicyRepository } from '../../../../domain/repositories/vendor-return-policy.repository.interface.js';
import { VendorReturnPolicyEntity } from '../../../../domain/entities/vendor-return-policy.entity.js';
import { VendorReturnPolicyPrismaMapper } from '../mappers/vendor-return-policy.prisma-mapper.js';

@Injectable()
export class VendorReturnPolicyPrismaRepository implements VendorReturnPolicyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorReturnPolicyEntity | null> {
    const row = await this.prisma.vendorReturnPolicy.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorReturnPolicyPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorReturnPolicyEntity[]> {
    const rows = await this.prisma.vendorReturnPolicy.findMany({
      where: { deletedAt: null },
    });
    return rows.map((r) => VendorReturnPolicyPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<VendorReturnPolicyEntity | null> {
    const row = await this.prisma.vendorReturnPolicy.findFirst({
      where: { vendorId, deletedAt: null },
    });
    return row ? VendorReturnPolicyPrismaMapper.toDomain(row) : null;
  }

  async existsByVendorId(vendorId: string): Promise<boolean> {
    const c = await this.prisma.vendorReturnPolicy.count({
      where: { vendorId, deletedAt: null },
    });
    return c > 0;
  }

  async upsert(entity: VendorReturnPolicyEntity): Promise<VendorReturnPolicyEntity> {
    const data = VendorReturnPolicyPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorReturnPolicy.findFirst({
      where: { vendorId: entity.vendorId },
    });
    const row = existing
      ? await this.prisma.vendorReturnPolicy.update({ where: { id: existing.id }, data })
      : await this.prisma.vendorReturnPolicy.create({ data: data as never });
    return VendorReturnPolicyPrismaMapper.toDomain(row);
  }

  async save(entity: VendorReturnPolicyEntity): Promise<VendorReturnPolicyEntity> {
    return this.upsert(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorReturnPolicy.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorReturnPolicy.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async findNoReturnPolicies(): Promise<readonly VendorReturnPolicyEntity[]> {
    const rows = await this.prisma.vendorReturnPolicy.findMany({
      where: { type: 'no_return', deletedAt: null },
    });
    return rows.map((r) => VendorReturnPolicyPrismaMapper.toDomain(r));
  }

  async findGenerousPolicies(): Promise<readonly VendorReturnPolicyEntity[]> {
    const rows = await this.prisma.vendorReturnPolicy.findMany({
      where: {
        windowDays: { gte: 14 },
        freeReturn: true,
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorReturnPolicyPrismaMapper.toDomain(r));
  }

  async findRequiringImages(): Promise<readonly VendorReturnPolicyEntity[]> {
    const rows = await this.prisma.vendorReturnPolicy.findMany({
      where: { requireImages: true, deletedAt: null },
    });
    return rows.map((r) => VendorReturnPolicyPrismaMapper.toDomain(r));
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorReturnPolicy.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
