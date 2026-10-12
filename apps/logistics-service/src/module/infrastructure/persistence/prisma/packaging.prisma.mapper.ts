import { PackagingEntity } from '../../../domain/entities/packaging.entity.js';
import { PackagingIdVO } from '../../../domain/value-objects/primitives/packaging-id.vo.js';
import { PackagingStatusVO } from '../../../domain/value-objects/primitives/packaging-status.vo.js';
import { PackagingTypeVO } from '../../../domain/value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '../../../domain/value-objects/primitives/packaging-material.vo.js';
import { DimensionCmVO } from '../../../domain/value-objects/primitives/dimension-cm.vo.js';
import { WeightKgVO } from '../../../domain/value-objects/primitives/weight-kg.vo.js';
import { ShippingCostVO } from '../../../domain/value-objects/primitives/shipping-cost.vo.js';
import type { Url } from '@vubon/shared-types/common';

export interface PrismaPackagingRow {
  id: string; name: string; code: string; type: string; material: string; status: string;
  lengthCm: unknown; widthCm: unknown; heightCm: unknown; maxWeightKg: unknown;
  cost: unknown; currency: string | null; imageUrl: string | null;
  isFragile: boolean; isTemperatureControlled: boolean; isRecyclable: boolean;
  stock: number; isDefault: boolean;
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

export class PackagingPrismaMapper {
  static toDomain(raw: PrismaPackagingRow): PackagingEntity {
    return PackagingEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        name: raw.name, code: raw.code,
        type: PackagingTypeVO.reconstitute(raw.type),
        material: PackagingMaterialVO.reconstitute(raw.material),
        status: PackagingStatusVO.reconstitute(raw.status),
        dimensions: DimensionCmVO.reconstitute({
          lengthCm: toNum(raw.lengthCm), widthCm: toNum(raw.widthCm), heightCm: toNum(raw.heightCm),
        }),
        maxWeightKg: WeightKgVO.reconstitute(toNum(raw.maxWeightKg)),
        cost: raw.cost !== null && raw.currency ? ShippingCostVO.reconstitute(toNum(raw.cost), raw.currency) : undefined,
        imageUrl: raw.imageUrl ? (raw.imageUrl as Url) : undefined,
        isFragile: raw.isFragile, isTemperatureControlled: raw.isTemperatureControlled, isRecyclable: raw.isRecyclable,
        stock: raw.stock, isDefault: raw.isDefault,
      },
    });
  }

  static toPersistence(entity: PackagingEntity): Record<string, unknown> {
    return {
      id: entity.id, name: entity.name, code: entity.code,
      type: entity.type.value, material: entity.material.value, status: entity.status.value,
      lengthCm: entity.dimensions.lengthCm, widthCm: entity.dimensions.widthCm, heightCm: entity.dimensions.heightCm,
      maxWeightKg: entity.maxWeightKg.value,
      cost: entity.cost?.amount ?? null, currency: entity.cost?.currency ?? null,
      imageUrl: entity.imageUrl ?? null,
      isFragile: entity.isFragile, isTemperatureControlled: entity.isTemperatureControlled, isRecyclable: entity.isRecyclable,
      stock: entity.stock, isDefault: entity.isDefault,
      version: entity.version, updatedAt: new Date(entity.updatedAt),
    };
  }
}
