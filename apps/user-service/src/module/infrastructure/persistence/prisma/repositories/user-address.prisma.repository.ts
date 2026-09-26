import { Injectable } from '@nestjs/common';
import { UserAddress as PrismaUserAddress } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { UserAddressEntity } from '../../../../domain/entities/user-address.entity';
import { AddressIdVO } from '../../../../domain/value-objects/primitives/address-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AddressLabelVO } from '../../../../domain/value-objects/primitives/address-label.vo';
import { AddressLineVO } from '../../../../domain/value-objects/primitives/address-line.vo';
import { CityVO } from '../../../../domain/value-objects/primitives/city.vo';
import { DistrictVO } from '../../../../domain/value-objects/primitives/district.vo';
import { DivisionVO } from '../../../../domain/value-objects/primitives/division.vo';
import { PostalCodeVO } from '../../../../domain/value-objects/primitives/postal-code.vo';
import type { UserAddressRepository } from '../../../../domain/repositories/user-address.repository.interface';

@Injectable()
export class UserAddressPrismaRepository
  extends BasePrismaRepository<UserAddressEntity, AddressIdVO>
  implements UserAddressRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaUserAddress): UserAddressEntity {
    return UserAddressEntity.reconstitute(
      AddressIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        label: raw.label ? AddressLabelVO.create(raw.label) : null,
        line1: AddressLineVO.create(raw.line1),
        line2: raw.line2 ? AddressLineVO.create(raw.line2) : null,
        city: CityVO.create(raw.city),
        district: DistrictVO.create(raw.district),
        division: DivisionVO.create(raw.division),
        postalCode: raw.postalCode ? PostalCodeVO.create(raw.postalCode) : null,
        isDefault: raw.isDefault,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: AddressIdVO): Promise<UserAddressEntity | null> {
    const raw = await this.prisma.userAddress.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserAddressEntity[]> {
    const rows = await this.prisma.userAddress.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: UserAddressEntity): Promise<UserAddressEntity> {
    const data = {
      userId: entity.userId.value,
      label: entity.label?.value ?? null,
      line1: entity.line1.value,
      line2: entity.line2?.value ?? null,
      city: entity.city.value,
      district: entity.district.value,
      division: entity.division.value,
      postalCode: entity.postalCode?.value ?? null,
      isDefault: entity.isDefault,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.userAddress.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AddressIdVO): Promise<void> {
    await this.prisma.userAddress.delete({ where: { id: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<readonly UserAddressEntity[]> {
    const rows = await this.prisma.userAddress.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDefault(userId: UserIdVO): Promise<UserAddressEntity | null> {
    const raw = await this.prisma.userAddress.findFirst({
      where: { userId: userId.value, isDefault: true },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async countByUserId(userId: UserIdVO): Promise<number> {
    return this.prisma.userAddress.count({ where: { userId: userId.value } });
  }
}
