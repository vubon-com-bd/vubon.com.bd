/**
 * VendorCommissionPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorCommission as PrismaVendorCommission } from '@prisma/client';
import { VendorCommissionEntity } from '../../../../domain/entities/vendor-commission.entity.js';
import type { CommissionTypeValue } from '../../../../domain/entities/vendor-commission.entity.js';
import { CommissionPercentVO } from '../../../../domain/value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../../../../domain/value-objects/primitives/commission-amount.vo.js';

export class VendorCommissionPrismaMapper {
  static toDomain(row: PrismaVendorCommission): VendorCommissionEntity {
    return VendorCommissionEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        type: row.type as CommissionTypeValue,
        percent: CommissionPercentVO.create(Number(row.percent)),
        fixedAmount: row.fixedAmount !== null
          ? CommissionAmountVO.create(Number(row.fixedAmount), row.currency)
          : undefined,
        currency: row.currency,
        minPercent: Number(row.minPercent),
        maxPercent: Number(row.maxPercent),
        applyOnShipping: row.applyOnShipping,
        applyOnTax: row.applyOnTax,
        effectiveFrom: row.effectiveFrom.toISOString(),
        effectiveTo: row.effectiveTo?.toISOString(),
        isActive: row.isActive,
      },
    });
  }

  static toPersistence(entity: VendorCommissionEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      type: entity.type,
      percent: entity.percent.value,
      fixedAmount: entity.fixedAmount?.amount ?? null,
      currency: entity.fixedAmount?.currency ?? 'BDT',
      minPercent: entity.minPercent,
      maxPercent: entity.maxPercent,
      applyOnShipping: entity.applyOnShipping,
      applyOnTax: entity.applyOnTax,
      effectiveFrom: new Date(entity.effectiveFrom),
      effectiveTo: entity.effectiveTo ? new Date(entity.effectiveTo) : null,
      isActive: entity.isActive,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
