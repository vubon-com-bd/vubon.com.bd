import { PackagingEntity } from '@domain/entities/packaging.entity';
import { PackagingTypeVO } from '@domain/value-objects/primitives/packaging-type.vo';
import { PackagingMaterialVO } from '@domain/value-objects/primitives/packaging-material.vo';
import { PackagingStatusVO } from '@domain/value-objects/primitives/packaging-status.vo';
import { PackagingSizeVO } from '@domain/value-objects/primitives/packaging-size.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsPackagingRow {
  id: string; name: string; code: string; type: string; material: string; status: string;
  lengthCm: unknown; widthCm: unknown; heightCm: unknown; maxWeightKg: unknown;
  cost: unknown; currency: string | null; imageUrl: string | null;
  isFragile: boolean; isTemperatureControlled: boolean; isRecyclable: boolean;
  stock: number; isDefault: boolean; version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  activatedAt: Date | null; deactivatedAt: Date | null; discontinuedAt: Date | null;
  deactivateReason: string | null; discontinueReason: string | null; metadata: unknown;
}

export class PackagingPrismaMapper {
  static toDomain(raw: LogisticsPackagingRow): PackagingEntity {
    return PackagingEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        name: raw.name, code: raw.code,
        type: PackagingTypeVO.reconstitute(raw.type),
        material: PackagingMaterialVO.reconstitute(raw.material),
        status: PackagingStatusVO.reconstitute(raw.status),
        size: PackagingSizeVO.reconstitute({
          lengthCm: toNum(raw.lengthCm) ?? 0,
          widthCm: toNum(raw.widthCm) ?? 0,
          heightCm: toNum(raw.heightCm) ?? 0,
          maxWeightKg: toNum(raw.maxWeightKg) ?? 0,
        }),
        cost: toNum(raw.cost), currency: raw.currency ?? undefined, imageUrl: raw.imageUrl ?? undefined,
        isFragile: raw.isFragile, isTemperatureControlled: raw.isTemperatureControlled,
        isRecyclable: raw.isRecyclable, stock: raw.stock, isDefault: raw.isDefault,
        activatedAt: toIso(raw.activatedAt), deactivatedAt: toIso(raw.deactivatedAt),
        discontinuedAt: toIso(raw.discontinuedAt),
        deactivateReason: raw.deactivateReason ?? undefined,
        discontinueReason: raw.discontinueReason ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: PackagingEntity): Record<string, unknown> {
    return {
      id: entity.id, name: entity.name, code: entity.code,
      type: entity.type.value, material: entity.material.value, status: entity.status.value,
      lengthCm: entity.size.value.lengthCm, widthCm: entity.size.value.widthCm,
      heightCm: entity.size.value.heightCm, maxWeightKg: entity.size.value.maxWeightKg,
      cost: entity.cost ?? null,
      currency: entity.currency ?? null, imageUrl: entity.imageUrl ?? null,
      isFragile: entity.isFragile, isTemperatureControlled: entity.isTemperatureControlled,
      isRecyclable: entity.isRecyclable, stock: entity.stock, isDefault: entity.isDefault,
      activatedAt: entity.activatedAt ? new Date(entity.activatedAt) : null,
      deactivatedAt: entity.deactivatedAt ? new Date(entity.deactivatedAt) : null,
      discontinuedAt: entity.discontinuedAt ? new Date(entity.discontinuedAt) : null,
      deactivateReason: entity.deactivateReason ?? null,
      discontinueReason: entity.discontinueReason ?? null,
      metadata: entity.metadata ?? null, version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
