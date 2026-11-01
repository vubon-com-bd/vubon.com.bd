import { ZoneEntity } from '@domain/entities/zone.entity';
import { ZoneNameVO } from '@domain/value-objects/primitives/zone-name.vo';
import { ZoneTypeVO } from '@domain/value-objects/primitives/zone-type.vo';
import { ZoneStatusVO } from '@domain/value-objects/primitives/zone-status.vo';
import { ZonePricingTypeVO } from '@domain/value-objects/primitives/zone-pricing-type.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsZoneRow {
  id: string; name: string; code: string; type: string; status: string; pricingType: string;
  parentId: string | null; postalCodes: string[]; districts: string[]; divisions: string[];
  shippingCost: unknown; freeAbove: unknown; currency: string; minDeliveryDays: number; maxDeliveryDays: number;
  codEnabled: boolean; codCharge: unknown; codMaxAmount: unknown; isRemote: boolean; isActive: boolean;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  activatedAt: Date | null; deactivatedAt: Date | null; restrictedAt: Date | null; suspendedAt: Date | null;
  archivedAt: Date | null; statusReason: string | null; metadata: unknown;
}

export class ZonePrismaMapper {
  static toDomain(raw: LogisticsZoneRow): ZoneEntity {
    return ZoneEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        name: ZoneNameVO.reconstitute(raw.name), code: raw.code,
        type: ZoneTypeVO.reconstitute(raw.type),
        status: ZoneStatusVO.reconstitute(raw.status),
        pricingType: ZonePricingTypeVO.reconstitute(raw.pricingType),
        parentId: raw.parentId ?? undefined,
        postalCodes: raw.postalCodes, districts: raw.districts, divisions: raw.divisions,
        shippingCost: toNum(raw.shippingCost) ?? 0, freeAbove: toNum(raw.freeAbove),
        currency: raw.currency, minDeliveryDays: raw.minDeliveryDays, maxDeliveryDays: raw.maxDeliveryDays,
        codEnabled: raw.codEnabled, codCharge: toNum(raw.codCharge), codMaxAmount: toNum(raw.codMaxAmount),
        isRemote: raw.isRemote, isActive: raw.isActive,
        activatedAt: toIso(raw.activatedAt), deactivatedAt: toIso(raw.deactivatedAt),
        restrictedAt: toIso(raw.restrictedAt), suspendedAt: toIso(raw.suspendedAt),
        archivedAt: toIso(raw.archivedAt), statusReason: raw.statusReason ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: ZoneEntity): Record<string, unknown> {
    return {
      id: entity.id, name: entity.name.value, code: entity.code,
      type: entity.type.value, status: entity.status.value, pricingType: entity.pricingType.value,
      parentId: entity.parentId ?? null,
      postalCodes: entity.postalCodes ?? [], districts: entity.districts ?? [], divisions: entity.divisions ?? [],
      shippingCost: entity.shippingCost, freeAbove: entity.freeAbove ?? null,
      currency: entity.currency, minDeliveryDays: entity.minDeliveryDays, maxDeliveryDays: entity.maxDeliveryDays,
      codEnabled: entity.codEnabled, codCharge: entity.codCharge ?? null, codMaxAmount: entity.codMaxAmount ?? null,
      isRemote: entity.isRemote, isActive: entity.isActive,
      activatedAt: entity.activatedAt ? new Date(entity.activatedAt) : null,
      deactivatedAt: entity.deactivatedAt ? new Date(entity.deactivatedAt) : null,
      restrictedAt: entity.restrictedAt ? new Date(entity.restrictedAt) : null,
      suspendedAt: entity.suspendedAt ? new Date(entity.suspendedAt) : null,
      archivedAt: entity.archivedAt ? new Date(entity.archivedAt) : null,
      statusReason: entity.statusReason ?? null, metadata: entity.metadata ?? null,
      version: entity.version, updatedAt: new Date(entity.updatedAt),
    };
  }
}
