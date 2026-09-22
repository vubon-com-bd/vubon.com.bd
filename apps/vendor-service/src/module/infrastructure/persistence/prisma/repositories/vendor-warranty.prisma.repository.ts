import { Injectable } from '@nestjs/common';
import { VendorWarranty as PrismaVendorWarranty } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorWarrantyEntity } from '../../../../domain/entities/vendor-warranty.entity';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { WarrantyTypeVO } from '../../../../domain/value-objects/primitives/warranty-type.vo';
import type { VendorWarrantyRepository } from '../../../../domain/repositories/vendor-warranty.repository.interface';

@Injectable()
export class VendorWarrantyPrismaRepository
  extends BasePrismaRepository<VendorWarrantyEntity, VendorIdVO>
  implements VendorWarrantyRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorWarranty): VendorWarrantyEntity {
    return VendorWarrantyEntity.reconstitute(
      VendorIdVO.create(raw.vendorId),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        type: WarrantyTypeVO.create(raw.type),
        durationDays: raw.durationDays,
        terms: raw.terms,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VendorIdVO): Promise<VendorWarrantyEntity | null> {
    const raw = await this.prisma.vendorWarranty.findUnique({
      where: { vendorId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorWarrantyEntity[]> {
    const rows = await this.prisma.vendorWarranty.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorWarrantyEntity): Promise<VendorWarrantyEntity> {
    const data = {
      type: entity.type.value,
      durationDays: entity.durationDays,
      terms: entity.terms,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorWarranty.upsert({
      where: { vendorId: entity.vendorId.value },
      create: { id: entity.id.value, vendorId: entity.vendorId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VendorIdVO): Promise<void> {
    await this.prisma.vendorWarranty.delete({ where: { vendorId: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorWarrantyEntity | null> {
    const raw = await this.prisma.vendorWarranty.findUnique({
      where: { vendorId: vendorId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
