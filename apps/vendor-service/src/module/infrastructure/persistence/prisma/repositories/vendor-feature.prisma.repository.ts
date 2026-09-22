import { Injectable } from '@nestjs/common';
import { VendorFeature as PrismaVendorFeature } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorFeatureEntity } from '../../../../domain/entities/vendor-feature.entity';
import { FeatureIdVO } from '../../../../domain/value-objects/primitives/feature-id.vo';
import { FeatureTypeVO } from '../../../../domain/value-objects/primitives/feature-type.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorFeatureRepository } from '../../../../domain/repositories/vendor-feature.repository.interface';

@Injectable()
export class VendorFeaturePrismaRepository
  extends BasePrismaRepository<VendorFeatureEntity, FeatureIdVO>
  implements VendorFeatureRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorFeature): VendorFeatureEntity {
    return VendorFeatureEntity.reconstitute(
      FeatureIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        type: FeatureTypeVO.create(raw.type),
        enabled: raw.enabled,
        enabledAt: raw.enabledAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: FeatureIdVO): Promise<VendorFeatureEntity | null> {
    const raw = await this.prisma.vendorFeature.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorFeatureEntity[]> {
    const rows = await this.prisma.vendorFeature.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorFeatureEntity): Promise<VendorFeatureEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      type: entity.type.value,
      enabled: entity.enabled,
      enabledAt: entity.enabledAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorFeature.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: FeatureIdVO): Promise<void> {
    await this.prisma.vendorFeature.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorFeatureEntity[]> {
    const rows = await this.prisma.vendorFeature.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(vendorId: VendorIdVO): Promise<readonly VendorFeatureEntity[]> {
    const rows = await this.prisma.vendorFeature.findMany({
      where: { vendorId: vendorId.value, enabled: true },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
