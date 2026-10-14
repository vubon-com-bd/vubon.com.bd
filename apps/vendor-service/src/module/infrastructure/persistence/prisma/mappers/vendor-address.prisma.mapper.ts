/**
 * VendorAddressPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorAddressEntity } from '../../../../domain/entities/vendor-address.entity.js';
import { VendorAddressVO } from '../../../../domain/value-objects/composites/vendor-address.vo.js';
import { AddressIdVO } from '../../../../domain/value-objects/primitives/address-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { AddressLabelVO } from '../../../../domain/value-objects/primitives/address-label.vo.js';

export interface VendorAddressPrismaRow {
  id: string;
  vendorId: string;
  label: string;
  addressType: string;
  line1: string;
  line2: string | null;
  area: string | null;
  city: string;
  district: string;
  division: string;
  postalCode: string | null;
  country: string;
  latitude: unknown | null;
  longitude: unknown | null;
  isPrimary: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNumOrUndefined = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

export class VendorAddressPrismaMapper {
  static toDomain(raw: VendorAddressPrismaRow): VendorAddressEntity {
    const vo = VendorAddressVO.reconstitute({
      id: AddressIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      label: AddressLabelVO.reconstitute(raw.label),
      addressType: raw.addressType as never,
      line1: raw.line1,
      line2: raw.line2 ?? undefined,
      area: raw.area ?? undefined,
      city: raw.city,
      district: raw.district,
      division: raw.division,
      postalCode: raw.postalCode ?? undefined,
      country: raw.country,
      latitude: toNumOrUndefined(raw.latitude),
      longitude: toNumOrUndefined(raw.longitude),
      isPrimary: raw.isPrimary,
      isVerified: raw.isVerified,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorAddressEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorAddressEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      label: vo.label.value,
      addressType: vo.addressType,
      line1: vo.line1,
      line2: vo.line2 ?? null,
      area: vo.area ?? null,
      city: vo.city,
      district: vo.district,
      division: vo.division,
      postalCode: vo.postalCode ?? null,
      country: vo.country,
      latitude: vo.latitude ?? null,
      longitude: vo.longitude ?? null,
      isPrimary: vo.isPrimary,
      isVerified: vo.isVerified,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
