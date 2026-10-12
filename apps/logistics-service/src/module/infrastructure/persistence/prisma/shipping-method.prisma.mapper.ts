import { ShippingMethodEntity } from '../../../domain/entities/shipping-method.entity.js';
import { ShippingMethodIdVO } from '../../../domain/value-objects/primitives/shipping-method-id.vo.js';
import { ShippingMethodStatusVO } from '../../../domain/value-objects/primitives/shipping-method-status.vo.js';
import { ShippingMethodValueVO } from '../../../domain/value-objects/primitives/shipping-method-value.vo.js';
import { ShippingRateTypeVO } from '../../../domain/value-objects/primitives/shipping-rate-type.vo.js';
import { ShippingCostVO } from '../../../domain/value-objects/primitives/shipping-cost.vo.js';
import { WeightKgVO } from '../../../domain/value-objects/primitives/weight-kg.vo.js';

export interface PrismaShippingMethodRow {
  id: string; name: string; code: string; displayName: string; status: string; rateType: string;
  baseCost: unknown; freeAbove: unknown; currency: string;
  minDeliveryDays: number; maxDeliveryDays: number; maxWeightKg: unknown; maxDimensionsCm: number | null;
  codEnabled: boolean; trackingEnabled: boolean;
  coverageZones: string[]; couriers: string[]; isDefault: boolean; isActive: boolean;
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

export class ShippingMethodPrismaMapper {
  static toDomain(raw: PrismaShippingMethodRow): ShippingMethodEntity {
    return ShippingMethodEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        name: raw.name,
        code: ShippingMethodValueVO.reconstitute(raw.code),
        displayName: raw.displayName,
        status: ShippingMethodStatusVO.reconstitute(raw.status),
        rateType: ShippingRateTypeVO.reconstitute(raw.rateType),
        baseCost: ShippingCostVO.reconstitute(toNum(raw.baseCost), raw.currency),
        freeAbove: raw.freeAbove !== null ? ShippingCostVO.reconstitute(toNum(raw.freeAbove), raw.currency) : undefined,
        minDeliveryDays: raw.minDeliveryDays, maxDeliveryDays: raw.maxDeliveryDays,
        maxWeightKg: raw.maxWeightKg !== null ? WeightKgVO.reconstitute(toNum(raw.maxWeightKg)) : undefined,
        maxDimensionsCm: raw.maxDimensionsCm ?? undefined,
        codEnabled: raw.codEnabled, trackingEnabled: raw.trackingEnabled,
        coverageZones: raw.coverageZones, couriers: raw.couriers,
        isDefault: raw.isDefault, isActive: raw.isActive,
      },
    });
  }

  static toPersistence(entity: ShippingMethodEntity): Record<string, unknown> {
    return {
      id: entity.id, name: entity.name, code: entity.code.value, displayName: entity.displayName,
      status: entity.status.value, rateType: entity.rateType.value,
      baseCost: entity.baseCost.amount, freeAbove: entity.freeAbove?.amount ?? null,
      currency: entity.baseCost.currency,
      minDeliveryDays: entity.minDeliveryDays, maxDeliveryDays: entity.maxDeliveryDays,
      maxWeightKg: entity.maxWeightKg?.value ?? null,
      maxDimensionsCm: entity.maxDimensionsCm ?? null,
      codEnabled: entity.codEnabled, trackingEnabled: entity.trackingEnabled,
      coverageZones: [...entity.coverageZones], couriers: [...entity.couriers],
      isDefault: entity.isDefault, isActive: entity.isActive,
      version: entity.version, updatedAt: new Date(entity.updatedAt),
    };
  }
}
