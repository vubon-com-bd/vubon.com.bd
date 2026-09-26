import { Injectable } from '@nestjs/common';
import { Vendor as PrismaVendor } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorEntity } from '../../../../domain/entities/vendor.entity';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNameVO } from '../../../../domain/value-objects/primitives/vendor-name.vo';
import { VendorSlugVO } from '../../../../domain/value-objects/primitives/vendor-slug.vo';
import { VendorStatusVO } from '../../../../domain/value-objects/primitives/vendor-status.vo';
import { VendorTypeVO } from '../../../../domain/value-objects/primitives/vendor-type.vo';
import { VendorTierVO } from '../../../../domain/value-objects/primitives/vendor-tier.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { VendorRepository } from '../../../../domain/repositories/vendor.repository.interface';

@Injectable()
export class VendorPrismaRepository
  extends BasePrismaRepository<VendorEntity, VendorIdVO>
  implements VendorRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendor): VendorEntity {
    return VendorEntity.reconstitute(
      VendorIdVO.create(raw.id),
      {
        ownerId: UserIdVO.create(raw.ownerId),
        name: VendorNameVO.create(raw.name),
        slug: VendorSlugVO.create(raw.slug),
        status: VendorStatusVO.create(raw.status),
        type: VendorTypeVO.create(raw.type),
        tier: VendorTierVO.create(raw.tier),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VendorIdVO): Promise<VendorEntity | null> {
    const raw = await this.prisma.vendor.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorEntity[]> {
    const rows = await this.prisma.vendor.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorEntity): Promise<VendorEntity> {
    const data = {
      ownerId: entity.ownerId.value,
      name: entity.name.value,
      slug: entity.slug.value,
      status: entity.status.value,
      type: entity.type.value,
      tier: entity.tier.value,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.vendor.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VendorIdVO): Promise<void> {
    await this.prisma.vendor.delete({ where: { id: id.value } });
  }

  async findBySlug(slug: VendorSlugVO): Promise<VendorEntity | null> {
    const raw = await this.prisma.vendor.findUnique({
      where: { slug: slug.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByOwnerId(ownerId: UserIdVO): Promise<VendorEntity | null> {
    const raw = await this.prisma.vendor.findFirst({
      where: { ownerId: ownerId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async existsBySlug(slug: VendorSlugVO): Promise<boolean> {
    const count = await this.prisma.vendor.count({
      where: { slug: slug.value },
    });
    return count > 0;
  }
}
