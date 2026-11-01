/**
 * VendorFeaturePrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorFeatureEntity } from '../../../../domain/entities/vendor-feature.entity.js';
import { VendorFeatureVO } from '../../../../domain/value-objects/composites/vendor-feature.vo.js';
import { FeatureIdVO } from '../../../../domain/value-objects/primitives/feature-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { FeatureTypeVO } from '../../../../domain/value-objects/primitives/feature-type.vo.js';

export interface VendorFeaturePrismaRow {
  id: string;
  vendorId: string;
  featureKey: string;
  type: string;
  isEnabled: boolean;
  enabledAt: Date | null;
  enabledBy: string | null;
  disabledAt: Date | null;
  disabledBy: string | null;
  limit: number | null;
  usedCount: number;
  config: unknown;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class VendorFeaturePrismaMapper {
  static toDomain(raw: VendorFeaturePrismaRow): VendorFeatureEntity {
    const vo = VendorFeatureVO.reconstitute({
      id: FeatureIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      featureKey: raw.featureKey,
      type: FeatureTypeVO.reconstitute(raw.type),
      isEnabled: raw.isEnabled,
      enabledAt: toIso(raw.enabledAt),
      enabledBy: raw.enabledBy ?? undefined,
      disabledAt: toIso(raw.disabledAt),
      disabledBy: raw.disabledBy ?? undefined,
      limit: raw.limit ?? undefined,
      usedCount: raw.usedCount,
      config: raw.config && typeof raw.config === 'object'
        ? (raw.config as Readonly<Record<string, unknown>>)
        : undefined,
      expiresAt: toIso(raw.expiresAt),
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorFeatureEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorFeatureEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      featureKey: vo.featureKey,
      type: vo.type.value,
      isEnabled: vo.isEnabled,
      enabledAt: vo.enabledAt ? new Date(vo.enabledAt) : null,
      enabledBy: vo.enabledBy ?? null,
      disabledAt: vo.disabledAt ? new Date(vo.disabledAt) : null,
      disabledBy: vo.disabledBy ?? null,
      limit: vo.limit ?? null,
      usedCount: vo.usedCount,
      config: vo.config ?? null,
      expiresAt: vo.expiresAt ? new Date(vo.expiresAt) : null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
