/**
 * User Address Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { UserAddressEntity } from '../../../../domain/entities/user-address.entity.js';
import { AddressIdVO } from '../../../../domain/value-objects/primitives/address-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { AddressTypeVO } from '../../../../domain/value-objects/primitives/address-type.vo.js';
import { AddressLineVO } from '../../../../domain/value-objects/primitives/address-line.vo.js';
import { CityVO } from '../../../../domain/value-objects/primitives/city.vo.js';
import { PostalCodeVO } from '../../../../domain/value-objects/primitives/postal-code.vo.js';

export interface PrismaUserAddressRow {
  id: string;
  userId: string;
  type: string;
  label: string | null;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  division: string;
  district: string;
  upazila: string | null;
  postalCode: string;
  country: string;
  isDefault: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class UserAddressPrismaMapper {
  static toDomain(raw: PrismaUserAddressRow): UserAddressEntity {
    return UserAddressEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        type: this.parseType(raw.type),
        label: raw.label ?? undefined,
        fullName: raw.fullName,
        phone: raw.phone,
        addressLine1: AddressLineVO.reconstitute(raw.addressLine1),
        addressLine2: raw.addressLine2
          ? AddressLineVO.reconstitute(raw.addressLine2)
          : undefined,
        city: CityVO.reconstitute(raw.city),
        state: raw.state,
        division: raw.division,
        district: raw.district,
        upazila: raw.upazila ?? undefined,
        postalCode: PostalCodeVO.reconstitute(raw.postalCode),
        country: raw.country,
        isDefault: raw.isDefault,
        isDefaultShipping: raw.isDefaultShipping,
        isDefaultBilling: raw.isDefaultBilling,
        isVerified: raw.isVerified,
      },
    });
  }

  static toPersistence(entity: UserAddressEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      type: entity.type.value,
      label: entity.label ?? null,
      fullName: entity.fullName,
      phone: entity.phone,
      addressLine1: entity.addressLine1.value,
      addressLine2: entity.addressLine2?.value ?? null,
      city: entity.city.value,
      state: entity.state,
      division: entity.division,
      district: entity.district,
      upazila: entity.upazila ?? null,
      postalCode: entity.postalCode.value,
      country: entity.country,
      isDefault: entity.isDefault,
      isDefaultShipping: entity.isDefaultShipping,
      isDefaultBilling: entity.isDefaultBilling,
      isVerified: entity.isVerified,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseType(v: string): AddressTypeVO {
    try { return AddressTypeVO.reconstitute(v); } catch { return AddressTypeVO.home(); }
  }
}
