/**
 * WarehousePrismaMapper — row ↔ domain entity
 * @module logistics-service/infrastructure/persistence/prisma
 */
import { WarehouseEntity } from '../../../domain/entities/warehouse.entity.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { WarehouseStatusVO } from '../../../domain/value-objects/primitives/warehouse-status.vo.js';
import { WarehouseCodeVO } from '../../../domain/value-objects/primitives/warehouse-code.vo.js';
import { WarehouseTypeVO } from '../../../domain/value-objects/primitives/warehouse-type.vo.js';
import { AddressDetailsVO } from '../../../domain/value-objects/composites/address-details.vo.js';
import { CapacityVO } from '../../../domain/value-objects/composites/capacity.vo.js';
import { AddressVO } from '@vubon/shared-kernel/domain/primitives';
import type { Address, Phone, Email, UserId } from '@vubon/shared-types/common';

export interface PrismaWarehouseRow {
  id: string;
  code: string;
  name: string;
  type: string;
  status: string;
  zone: string;
  addressLine1: string;
  addressLine2: string | null;
  addressCity: string;
  addressState: string | null;
  addressDistrict: string | null;
  addressDivision: string | null;
  addressPostalCode: string | null;
  addressCountry: string;
  latitude: number | null;
  longitude: number | null;
  contactName: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  managerId: string | null;
  capacityM3: unknown;
  usedM3: unknown;
  capacityKg: unknown;
  usedKg: unknown;
  maxSkus: number;
  operatingHoursStart: number | null;
  operatingHoursEnd: number | null;
  timezone: string;
  isDefault: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v && typeof (v as { toNumber: () => number }).toNumber === 'function') {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

export class WarehousePrismaMapper {
  static toDomain(raw: PrismaWarehouseRow): WarehouseEntity {
    const address = AddressDetailsVO.reconstitute({
      address: AddressVO.of({
        line1: raw.addressLine1,
        line2: raw.addressLine2 ?? undefined,
        city: raw.addressCity,
        state: raw.addressState ?? undefined,
        postalCode: raw.addressPostalCode ?? undefined,
        country: raw.addressCountry,
      } as Address),
      contactName: raw.contactName ?? undefined,
      contactPhone: raw.contactPhone ? (raw.contactPhone as Phone) : undefined,
      latitude: raw.latitude ?? undefined,
      longitude: raw.longitude ?? undefined,
    });

    return WarehouseEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        code: WarehouseCodeVO.reconstitute(raw.code),
        name: raw.name,
        type: WarehouseTypeVO.reconstitute(raw.type),
        status: WarehouseStatusVO.reconstitute(raw.status),
        address,
        contactName: raw.contactName ?? undefined,
        contactPhone: raw.contactPhone ? (raw.contactPhone as Phone) : undefined,
        contactEmail: raw.contactEmail ? (raw.contactEmail as Email) : undefined,
        managerId: raw.managerId ? (raw.managerId as UserId) : undefined,
        capacity: CapacityVO.reconstitute({
          capacityM3: toNum(raw.capacityM3),
          usedM3: toNum(raw.usedM3),
          capacityKg: toNum(raw.capacityKg),
          usedKg: toNum(raw.usedKg),
        }),
        maxSkus: raw.maxSkus,
        zone: raw.zone,
        operatingHoursStart: raw.operatingHoursStart ?? undefined,
        operatingHoursEnd: raw.operatingHoursEnd ?? undefined,
        timezone: raw.timezone,
        isDefault: raw.isDefault,
      },
    });
  }

  static toPersistence(entity: WarehouseEntity): Record<string, unknown> {
    const addr = entity.address.toAddress();
    return {
      id: entity.id,
      code: entity.code.value,
      name: entity.name,
      type: entity.type.value,
      status: entity.status.value,
      zone: entity.zone,
      addressLine1: addr.line1,
      addressLine2: addr.line2 ?? null,
      addressCity: addr.city,
      addressState: addr.state ?? null,
      addressDistrict: (addr as { district?: string }).district ?? null,
      addressDivision: (addr as { division?: string }).division ?? null,
      addressPostalCode: addr.postalCode ?? null,
      addressCountry: addr.country,
      latitude: entity.address.latitude ?? null,
      longitude: entity.address.longitude ?? null,
      contactName: entity.contactName ?? null,
      contactPhone: entity.contactPhone ?? null,
      contactEmail: entity.contactEmail ?? null,
      managerId: entity.managerId ?? null,
      capacityM3: entity.capacity.capacityM3,
      usedM3: entity.capacity.usedM3,
      capacityKg: entity.capacity.capacityKg,
      usedKg: entity.capacity.usedKg,
      maxSkus: entity.maxSkus,
      operatingHoursStart: entity.operatingHoursStart ?? null,
      operatingHoursEnd: entity.operatingHoursEnd ?? null,
      timezone: entity.timezone,
      isDefault: entity.isDefault,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
