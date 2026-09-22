import { Injectable } from '@nestjs/common';
import { VendorContact as PrismaVendorContact } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorContactEntity } from '../../../../domain/entities/vendor-contact.entity';
import { ContactIdVO } from '../../../../domain/value-objects/primitives/contact-id.vo';
import { ContactTypeVO } from '../../../../domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '../../../../domain/value-objects/primitives/contact-value.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorContactRepository } from '../../../../domain/repositories/vendor-contact.repository.interface';

@Injectable()
export class VendorContactPrismaRepository
  extends BasePrismaRepository<VendorContactEntity, ContactIdVO>
  implements VendorContactRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorContact): VendorContactEntity {
    return VendorContactEntity.reconstitute(
      ContactIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        type: ContactTypeVO.create(raw.type),
        value: ContactValueVO.create(raw.value),
        isPrimary: raw.isPrimary,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ContactIdVO): Promise<VendorContactEntity | null> {
    const raw = await this.prisma.vendorContact.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorContactEntity[]> {
    const rows = await this.prisma.vendorContact.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorContactEntity): Promise<VendorContactEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      type: entity.type.value,
      value: entity.value.value,
      isPrimary: entity.isPrimary,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorContact.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ContactIdVO): Promise<void> {
    await this.prisma.vendorContact.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorContactEntity[]> {
    const rows = await this.prisma.vendorContact.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findPrimary(vendorId: VendorIdVO): Promise<VendorContactEntity | null> {
    const raw = await this.prisma.vendorContact.findFirst({
      where: { vendorId: vendorId.value, isPrimary: true },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
