/**
 * ZonePrismaMapper
 * @module logistics-service/infrastructure/persistence/prisma
 */
import { ZoneEntity } from '../../../domain/entities/zone.entity.js';
import { ZoneIdVO } from '../../../domain/value-objects/primitives/zone-id.vo.js';
import { ZoneStatusVO } from '../../../domain/value-objects/primitives/zone-status.vo.js';
import { ZoneTypeVO } from '../../../domain/value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '../../../domain/value-objects/primitives/zone-pricing-type.vo.js';
import { ShippingCostVO } from '../../../domain/value-objects/primitives/shipping-cost.vo.js';

export interface PrismaZoneRow {
  id: string; name: string; code: string; type: string; status: string; pricingType: string;
  parentId: string | null; postalCodes: string[]; districts: string[]; divisions: string[];
  shippingCost: unknown; currency: string; minDeliveryDays: number; maxDeliveryDays: number;
  codEnabled: boolean; codCharge: unknown; codMaxAmount: unknown; isRemote: boolean; isActive: boolean;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v && typeof (v as { toNumber: () => number }).toNumber === 'function') {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

export class ZonePrismaMapper {
  static toDomain(raw: PrismaZoneRow): ZoneEntity {
    return ZoneEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        name: raw.name, code: raw.code,
        type: ZoneTypeVO.reconstitute(raw.type),
        status: ZoneStatusVO.reconstitute(raw.status),
        pricingType: ZonePricingTypeVO.reconstitute(raw.pricingType),
        parentId: raw.parentId ? ZoneIdVO.reconstitute(raw.parentId) : undefined,
        postalCodes: raw.postalCodes, districts: raw.districts, divisions: raw.divisions,
        shippingCost: ShippingCostVO.reconstitute(toNum(raw.shippingCost), raw.currency),
        minDeliveryDays: raw.minDeliveryDays, maxDeliveryDays: raw.maxDeliveryDays,
        codEnabled: raw.codEnabled,
        codCharge: raw.codCharge !== null ? toNum(raw.codCharge) : undefined,
        codMaxAmount: raw.codMaxAmount !== null ? toNum(raw.codMaxAmount) : undefined,
        isRemote: raw.isRemote, isActive: raw.isActive,
      },
    });
  }

  static toPersistence(entity: ZoneEntity): Record<string, unknown> {
    return {
      id: entity.id, name: entity.name, code: entity.code,
      type: entity.type.value, status: entity.status.value, pricingType: entity.pricingType.value,
      parentId: entity.parentId?.value ?? null,
      postalCodes: [...entity.postalCodes], districts: [...entity.districts], divisions: [...entity.divisions],
      shippingCost: entity.shippingCost.amount, currency: entity.shippingCost.currency,
      minDeliveryDays: entity.minDeliveryDays, maxDeliveryDays: entity.maxDeliveryDays,
      codEnabled: entity.codEnabled,
      codCharge: entity.codCharge ?? null,
      codMaxAmount: entity.codMaxAmount ?? null,
      isRemote: entity.isRemote, isActive: entity.isActive,
      version: entity.version, updatedAt: new Date(entity.updatedAt),
    };
  }
}
