import { ShippingMethodEntity } from '@domain/entities/shipping-method.entity';
import { ShippingMethodStatusVO } from '@domain/value-objects/primitives/shipping-method-status.vo';
import { ShippingMethodTypeVO } from '@domain/value-objects/primitives/shipping-method-type.vo';
import { ShippingRateTypeVO } from '@domain/value-objects/primitives/shipping-rate-type.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsShippingMethodRow {
  id: string; name: string; code: string; displayName: string; status: string; type: string; rateType: string;
  baseCost: unknown; freeAbove: unknown; currency: string; minDeliveryDays: number; maxDeliveryDays: number;
  maxWeightKg: unknown; maxDimensionsCm: number | null; codEnabled: boolean; trackingEnabled: boolean;
  coverageZones: string[]; couriers: string[]; isDefault: boolean; isActive: boolean;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  activatedAt: Date | null; deactivatedAt: Date | null; suspendedAt: Date | null;
  suspendReason: string | null; deactivateReason: string | null; metadata: unknown;
}

export class ShippingMethodPrismaMapper {
  static toDomain(raw: LogisticsShippingMethodRow): ShippingMethodEntity {
    return ShippingMethodEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        name: raw.name, code: raw.code, displayName: raw.displayName,
        status: ShippingMethodStatusVO.reconstitute(raw.status),
        type: ShippingMethodTypeVO.reconstitute(raw.type),
        rateType: ShippingRateTypeVO.reconstitute(raw.rateType),
        baseCost: toNum(raw.baseCost) ?? 0, freeAbove: toNum(raw.freeAbove),
        currency: raw.currency, minDeliveryDays: raw.minDeliveryDays, maxDeliveryDays: raw.maxDeliveryDays,
        maxWeightKg: toNum(raw.maxWeightKg), maxDimensionsCm: raw.maxDimensionsCm ?? undefined,
        codEnabled: raw.codEnabled, trackingEnabled: raw.trackingEnabled,
        coverageZones: raw.coverageZones, couriers: raw.couriers,
        isDefault: raw.isDefault, isActive: raw.isActive,
        activatedAt: toIso(raw.activatedAt), deactivatedAt: toIso(raw.deactivatedAt),
        suspendedAt: toIso(raw.suspendedAt), suspendReason: raw.suspendReason ?? undefined,
        deactivateReason: raw.deactivateReason ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: ShippingMethodEntity): Record<string, unknown> {
    return {
      id: entity.id, name: entity.name, code: entity.code, displayName: entity.displayName,
      status: entity.status.value, type: entity.type.value, rateType: entity.rateType.value,
      baseCost: entity.baseCost, freeAbove: entity.freeAbove ?? null,
      currency: entity.currency, minDeliveryDays: entity.minDeliveryDays, maxDeliveryDays: entity.maxDeliveryDays,
      maxWeightKg: entity.maxWeightKg ?? null, maxDimensionsCm: entity.maxDimensionsCm ?? null,
      codEnabled: entity.codEnabled, trackingEnabled: entity.trackingEnabled,
      coverageZones: entity.coverageZones ?? [], couriers: entity.couriers ?? [],
      isDefault: entity.isDefault, isActive: entity.isActive,
      activatedAt: entity.activatedAt ? new Date(entity.activatedAt) : null,
      deactivatedAt: entity.deactivatedAt ? new Date(entity.deactivatedAt) : null,
      suspendedAt: entity.suspendedAt ? new Date(entity.suspendedAt) : null,
      suspendReason: entity.suspendReason ?? null, deactivateReason: entity.deactivateReason ?? null,
      metadata: entity.metadata ?? null, version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
