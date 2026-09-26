import { Injectable } from '@nestjs/common';
import { VendorBusiness as PrismaVendorBusiness } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorBusinessEntity } from '../../../../domain/entities/vendor-business.entity';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { BusinessNameVO } from '../../../../domain/value-objects/primitives/business-name.vo';
import { BusinessTypeVO } from '../../../../domain/value-objects/primitives/business-type.vo';
import { BusinessRegistrationVO } from '../../../../domain/value-objects/primitives/business-registration.vo';
import { BusinessDescriptionVO } from '../../../../domain/value-objects/primitives/business-description.vo';
import type { VendorBusinessRepository } from '../../../../domain/repositories/vendor-business.repository.interface';

@Injectable()
export class VendorBusinessPrismaRepository
  extends BasePrismaRepository<VendorBusinessEntity, VendorIdVO>
  implements VendorBusinessRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorBusiness): VendorBusinessEntity {
    return VendorBusinessEntity.reconstitute(
      VendorIdVO.create(raw.vendorId),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        businessName: BusinessNameVO.create(raw.businessName),
        businessType: BusinessTypeVO.create(raw.businessType),
        registrationNumber: BusinessRegistrationVO.create(raw.registrationNumber),
        description: raw.description ? BusinessDescriptionVO.create(raw.description) : null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VendorIdVO): Promise<VendorBusinessEntity | null> {
    const raw = await this.prisma.vendorBusiness.findUnique({
      where: { vendorId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorBusinessEntity[]> {
    const rows = await this.prisma.vendorBusiness.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorBusinessEntity): Promise<VendorBusinessEntity> {
    const data = {
      businessName: entity.businessName.value,
      businessType: entity.businessType.value,
      registrationNumber: entity.registrationNumber.value,
      description: entity.description?.value ?? null,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorBusiness.upsert({
      where: { vendorId: entity.vendorId.value },
      create: { id: entity.id.value, vendorId: entity.vendorId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VendorIdVO): Promise<void> {
    await this.prisma.vendorBusiness.delete({ where: { vendorId: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorBusinessEntity | null> {
    const raw = await this.prisma.vendorBusiness.findUnique({
      where: { vendorId: vendorId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
