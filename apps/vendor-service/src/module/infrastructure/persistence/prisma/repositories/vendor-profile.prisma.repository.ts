import { Injectable } from '@nestjs/common';
import { VendorProfile as PrismaVendorProfile } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorProfileEntity } from '../../../../domain/entities/vendor-profile.entity';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNameVO } from '../../../../domain/value-objects/primitives/vendor-name.vo';
import type { VendorProfileRepository } from '../../../../domain/repositories/vendor-profile.repository.interface';

@Injectable()
export class VendorProfilePrismaRepository
  extends BasePrismaRepository<VendorProfileEntity, VendorIdVO>
  implements VendorProfileRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorProfile): VendorProfileEntity {
    return VendorProfileEntity.reconstitute(
      VendorIdVO.create(raw.vendorId),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        displayName: VendorNameVO.create(raw.displayName),
        bio: raw.bio,
        avatarUrl: raw.avatarUrl,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VendorIdVO): Promise<VendorProfileEntity | null> {
    const raw = await this.prisma.vendorProfile.findUnique({
      where: { vendorId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorProfileEntity[]> {
    const rows = await this.prisma.vendorProfile.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorProfileEntity): Promise<VendorProfileEntity> {
    const data = {
      displayName: entity.displayName.value,
      bio: entity.bio,
      avatarUrl: entity.avatarUrl,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorProfile.upsert({
      where: { vendorId: entity.vendorId.value },
      create: { id: entity.id.value, vendorId: entity.vendorId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VendorIdVO): Promise<void> {
    await this.prisma.vendorProfile.delete({ where: { vendorId: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorProfileEntity | null> {
    const raw = await this.prisma.vendorProfile.findUnique({
      where: { vendorId: vendorId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
