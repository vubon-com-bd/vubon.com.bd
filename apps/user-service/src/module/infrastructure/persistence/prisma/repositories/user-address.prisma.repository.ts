/**
 * UserAddressPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { UserAddress as PrismaUserAddress } from '@prisma/client';
import { PrismaService } from '../prisma.service.js';
import type { UserAddressRepository } from '@domain/repositories/user-address.repository.interface';
import { UserAddressEntity } from '@domain/entities/user-address.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo';
import { AddressLabelVO } from '@domain/value-objects/primitives/address-label.vo';
import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo';
import { CityVO } from '@domain/value-objects/primitives/city.vo';
import { DistrictVO } from '@domain/value-objects/primitives/district.vo';
import { DivisionVO } from '@domain/value-objects/primitives/division.vo';
import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo';

@Injectable()
export class UserAddressPrismaRepository implements UserAddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(raw: PrismaUserAddress): UserAddressEntity {
    return UserAddressEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        addressId: AddressIdVO.create(raw.id),
        userId: UserIdVO.create(raw.userId),
        label: AddressLabelVO.create(raw.label ?? 'home'),
        line: AddressLineVO.create(raw.line1 ?? raw.addressLine),
        city: CityVO.create(raw.city ?? raw.district),
        district: DistrictVO.create(raw.district),
        division: DivisionVO.create(raw.division),
        postalCode: PostalCodeVO.create(raw.postalCode ?? '1000'),
        isDefault: raw.isDefault,
      },
    });
  }

  async findById(id: string): Promise<UserAddressEntity | null> {
    const raw = await this.prisma.userAddress.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly UserAddressEntity[]> {
    const raws = await this.prisma.userAddress.findMany({ where: { deletedAt: null } });
    return raws.map((r) => this.toDomain(r));
  }

  async save(entity: UserAddressEntity): Promise<UserAddressEntity> {
    const raw = await this.prisma.userAddress.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        userId: entity.userId.value,
        label: entity.label.value,
        line1: entity.line.value,
          addressLine: entity.line.value,
        city: entity.city.value,
        district: entity.district.value,
        division: entity.division.value,
        postalCode: entity.postalCode.value,
        isDefault: entity.isDefault,
      },
      update: {
        label: entity.label.value,
        line1: entity.line.value,
        city: entity.city.value,
        district: entity.district.value,
        division: entity.division.value,
        postalCode: entity.postalCode.value,
        isDefault: entity.isDefault,
        updatedAt: new Date(),
      },
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userAddress.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.userAddress.count({ where: { id } });
    return count > 0;
  }

  async findByUserId(userId: UserIdVO): Promise<readonly UserAddressEntity[]> {
    const raws = await this.prisma.userAddress.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
    });
    return raws.map((r) => this.toDomain(r));
  }

  async findDefaultByUserId(userId: UserIdVO): Promise<UserAddressEntity | null> {
    const raw = await this.prisma.userAddress.findFirst({
      where: { userId: userId.value, isDefault: true, deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async countByUserId(userId: UserIdVO): Promise<number> {
    return this.prisma.userAddress.count({
      where: { userId: userId.value, deletedAt: null },
    });
  }

  async clearDefaultForUser(userId: UserIdVO): Promise<void> {
    await this.prisma.userAddress.updateMany({
      where: { userId: userId.value, isDefault: true },
      data: { isDefault: false },
    });
  }

  async existsById(id: AddressIdVO): Promise<boolean> {
    const count = await this.prisma.userAddress.count({ where: { id: id.value } });
    return count > 0;
  }
}
