/**
 * VendorWarrantyPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorWarrantyEntity } from '../../../../domain/entities/vendor-warranty.entity.js';
import { VendorWarrantyVO } from '../../../../domain/value-objects/composites/vendor-warranty.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { WarrantyTypeVO } from '../../../../domain/value-objects/primitives/warranty-type.vo.js';

export interface VendorWarrantyPrismaRow {
  id: string;
  vendorId: string;
  type: string;
  periodDays: number;
  requireProof: boolean;
  coverShipping: boolean;
  autoRegister: boolean;
  excludedCategories: unknown;
  terms: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class VendorWarrantyPrismaMapper {
  static toDomain(raw: VendorWarrantyPrismaRow): VendorWarrantyEntity {
    const vo = VendorWarrantyVO.reconstitute({
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      type: WarrantyTypeVO.reconstitute(raw.type),
      periodDays: raw.periodDays,
      requireProof: raw.requireProof,
      coverShipping: raw.coverShipping,
      autoRegister: raw.autoRegister,
      excludedCategories: Array.isArray(raw.excludedCategories)
        ? (raw.excludedCategories as string[])
        : [],
      terms: raw.terms ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorWarrantyEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorWarrantyEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      type: vo.type.value,
      periodDays: vo.periodDays,
      requireProof: vo.requireProof,
      coverShipping: vo.coverShipping,
      autoRegister: vo.autoRegister,
      excludedCategories: [...vo.excludedCategories],
      terms: vo.terms ?? null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
