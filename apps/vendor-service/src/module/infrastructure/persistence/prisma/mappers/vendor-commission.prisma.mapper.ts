/**
 * VendorCommissionPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 *
 * Note: DB stores `percent` (Decimal) + minPercent/maxPercent constraints.
 * Domain VO uses `rate` (CommissionRateVO) + optional min/max amounts.
 * We map percent ↔ rate and derive minAmount/maxAmount from percent bounds
 * (kept as undefined since DB stores percent not amount bounds).
 */
import { VendorCommissionEntity } from '../../../../domain/entities/vendor-commission.entity.js';
import { VendorCommissionVO } from '../../../../domain/value-objects/composites/vendor-commission.vo.js';
import { CommissionIdVO } from '../../../../domain/value-objects/primitives/commission-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { CommissionTypeVO } from '../../../../domain/value-objects/primitives/commission-type.vo.js';
import { CommissionRateVO } from '../../../../domain/value-objects/primitives/commission-rate.vo.js';

export interface VendorCommissionPrismaRow {
  id: string;
  vendorId: string;
  type: string;
  percent: unknown;
  fixedAmount: unknown | null;
  currency: string;
  minPercent: unknown;
  maxPercent: unknown;
  applyOnShipping: boolean;
  applyOnTax: boolean;
  effectiveFrom: Date;
  effectiveTo: Date | null;
  isActive: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v ?? 0);
};

const toNumOrUndefined = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  return toNum(v);
};

export class VendorCommissionPrismaMapper {
  static toDomain(raw: VendorCommissionPrismaRow): VendorCommissionEntity {
    const vo = VendorCommissionVO.reconstitute({
      id: CommissionIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      type: CommissionTypeVO.reconstitute(raw.type),
      rate: CommissionRateVO.reconstitute(toNum(raw.percent)),
      fixedAmount: toNumOrUndefined(raw.fixedAmount),
      minAmount: undefined, // DB stores minPercent, not minAmount
      maxAmount: undefined, // DB stores maxPercent, not maxAmount
      categoryOverrides: undefined,
      effectiveFrom: new Date(raw.effectiveFrom).toISOString(),
      effectiveTo: raw.effectiveTo ? new Date(raw.effectiveTo).toISOString() : undefined,
      isActive: raw.isActive,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorCommissionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorCommissionEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      type: vo.type.value,
      percent: vo.rate.percent,
      fixedAmount: vo.fixedAmount ?? null,
      currency: 'BDT',
      minPercent: 0,
      maxPercent: 50,
      applyOnShipping: false,
      applyOnTax: false,
      effectiveFrom: new Date(vo.effectiveFrom),
      effectiveTo: vo.effectiveTo ? new Date(vo.effectiveTo) : null,
      isActive: vo.isActive,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
