/**
 * VendorWarrantyPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorWarranty as PrismaVendorWarranty } from '@prisma/client';
import { VendorWarrantyEntity } from '../../../../domain/entities/vendor-warranty.entity.js';
import { WarrantyTypeVO } from '../../../../domain/value-objects/primitives/warranty-type.vo.js';
import { WarrantyPeriodDaysVO } from '../../../../domain/value-objects/primitives/warranty-period-days.vo.js';

export class VendorWarrantyPrismaMapper {
  static toDomain(row: PrismaVendorWarranty): VendorWarrantyEntity {
    return VendorWarrantyEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      props: {
        vendorId: row.vendorId,
        defaultType: WarrantyTypeVO.create(row.defaultType),
        defaultPeriod: WarrantyPeriodDaysVO.create(row.defaultPeriodDays),
        coversShipping: row.coversShipping,
        requireProof: row.requireProof,
        autoRegister: row.autoRegister,
        terms: row.terms ?? undefined,
        exclusions: row.exclusions,
      },
    });
  }

  static toPersistence(entity: VendorWarrantyEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      defaultType: entity.defaultType.value,
      defaultPeriodDays: entity.defaultPeriod.days,
      coversShipping: entity.coversShipping,
      requireProof: entity.requireProof,
      autoRegister: entity.autoRegister,
      terms: entity.terms,
      exclusions: [...entity.exclusions],
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
