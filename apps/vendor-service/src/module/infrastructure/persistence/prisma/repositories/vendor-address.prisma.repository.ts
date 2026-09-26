import { Injectable } from '@nestjs/common';
import { VendorAddress as PrismaVendorAddress } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorAddressEntity } from '../../../../domain/entities/vendor-address.entity';
import { AddressIdVO } from '../../../../domain/value-objects/primitives/address-id.vo';
import { AddressLabelVO } from '../../../../domain/value-objects/primitives/address-label.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import type { VendorAddressRepository } from '../../../../domain/repositories/vendor-address.repository.interface';

@Injectable()
export class VendorAddressPrismaRepository
  extends BasePrismaRepository<VendorAddressEntity, AddressIdVO>
  implements VendorAddressRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorAddress): VendorAddressEntity {
    return VendorAddressEntity.reconstitute(
      AddressIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        label: AddressLabelVO.create(raw.label),
        division: raw.division,
        district: raw.district,
        upazila: raw.upazila,
        addressLine: raw.addressLine,
        postalCode: raw.postalCode,
        isDefault: raw.isDefault,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: AddressIdVO): Promise<VendorAddressEntity | null> {
    const raw = await this.prisma.vendorAddress.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorAddressEntity[]> {
    const rows = await this.prisma.vendorAddress.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorAddressEntity): Promise<VendorAddressEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      label: entity.label.value,
      division: entity.division,
      district: entity.district,
      upazila: entity.upazila,
      addressLine: entity.addressLine,
      postalCode: entity.postalCode,
      isDefault: entity.isDefault,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorAddress.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AddressIdVO): Promise<void> {
    await this.prisma.vendorAddress.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorAddressEntity[]> {
    const rows = await this.prisma.vendorAddress.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDefault(vendorId: VendorIdVO): Promise<VendorAddressEntity | null> {
    const raw = await this.prisma.vendorAddress.findFirst({
      where: { vendorId: vendorId.value, isDefault: true },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
