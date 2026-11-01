/**
 * ProductPricingPrismaMapper
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { ProductPricingEntity } from '../../../../domain/entities/product-pricing.entity.js';
import { ProductPricingVO } from '../../../../domain/value-objects/composites/product-pricing.vo.js';
import { PriceIdVO } from '../../../../domain/value-objects/primitives/price-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { PriceAmountVO } from '../../../../domain/value-objects/primitives/price-amount.vo.js';
import { PriceCurrencyVO } from '../../../../domain/value-objects/primitives/price-currency.vo.js';
import { PricingRuleTypeVO } from '../../../../domain/value-objects/primitives/pricing-rule-type.vo.js';

export interface PrismaProductPricingRow {
  id: string;
  productId: string;
  variantId: string | null;
  type: string;
  basePrice: unknown;
  sellingPrice: unknown;
  compareAtPrice: unknown | null;
  costPrice: unknown | null;
  wholesalePrice: unknown | null;
  msrp: unknown | null;
  currency: string;
  taxInclusive: boolean;
  discountPercent: number | null;
  effectiveFrom: Date | null;
  effectiveTo: Date | null;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

const toIso = (d: Date | null): string | undefined => (d ? new Date(d).toISOString() : undefined);

export class ProductPricingPrismaMapper {
  static toDomain(raw: PrismaProductPricingRow): ProductPricingEntity {
    const vo = ProductPricingVO.reconstitute({
      id: PriceIdVO.reconstitute(raw.id),
      productId: ProductIdVO.reconstitute(raw.productId),
      variantId: raw.variantId ? VariantIdVO.reconstitute(raw.variantId) : undefined,
      type: PricingRuleTypeVO.reconstitute(raw.type),
      basePrice: PriceAmountVO.reconstitute(toNum(raw.basePrice)),
      sellingPrice: PriceAmountVO.reconstitute(toNum(raw.sellingPrice)),
      compareAtPrice:
        raw.compareAtPrice !== null
          ? PriceAmountVO.reconstitute(toNum(raw.compareAtPrice))
          : undefined,
      costPrice:
        raw.costPrice !== null ? PriceAmountVO.reconstitute(toNum(raw.costPrice)) : undefined,
      wholesalePrice:
        raw.wholesalePrice !== null
          ? PriceAmountVO.reconstitute(toNum(raw.wholesalePrice))
          : undefined,
      msrp: raw.msrp !== null ? PriceAmountVO.reconstitute(toNum(raw.msrp)) : undefined,
      currency: PriceCurrencyVO.reconstitute(raw.currency),
      taxInclusive: raw.taxInclusive,
      discountPercent: raw.discountPercent ?? undefined,
      effectiveFrom: toIso(raw.effectiveFrom),
      effectiveTo: toIso(raw.effectiveTo),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return ProductPricingEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
    });
  }

  static toPersistence(entity: ProductPricingEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId.value,
      variantId: vo.variantId?.value ?? null,
      type: vo.type.value,
      basePrice: vo.basePrice.value,
      sellingPrice: vo.sellingPrice.value,
      compareAtPrice: vo.compareAtPrice?.value ?? null,
      costPrice: vo.costPrice?.value ?? null,
      wholesalePrice: vo.wholesalePrice?.value ?? null,
      msrp: vo.msrp?.value ?? null,
      currency: vo.currency.value,
      taxInclusive: vo.taxInclusive,
      discountPercent: vo.discountPercent ?? null,
      effectiveFrom: vo.effectiveFrom ? new Date(vo.effectiveFrom) : null,
      effectiveTo: vo.effectiveTo ? new Date(vo.effectiveTo) : null,
      updatedAt: new Date(vo.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
