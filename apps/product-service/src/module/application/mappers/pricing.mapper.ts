/**
 * PricingMapper
 */
import { ProductPricingEntity } from '../../domain/entities/product-pricing.entity.js';
import type { PricingResponseDTO } from '../dtos/responses/pricing-response.dto.js';
import type { ProductId, VariantId, Money } from '@vubon/shared-types/common';

export class PricingMapper {
  static toResponse(p: ProductPricingEntity): PricingResponseDTO {
    return {
      id: p.id,
      productId: p.productId.value as ProductId,
      variantId: p.variantId?.value as VariantId | undefined,
      type: p.type,
      basePrice: p.basePrice.amount as Money,
      sellingPrice: p.sellingPrice.amount as Money,
      compareAtPrice: p.compareAtPrice ? (p.compareAtPrice.amount as Money) : undefined,
      costPrice: p.costPrice ? (p.costPrice.amount as Money) : undefined,
      wholesalePrice: p.wholesalePrice ? (p.wholesalePrice.amount as Money) : undefined,
      msrp: p.msrp ? (p.msrp.amount as Money) : undefined,
      currency: p.sellingPrice.currency,
      taxRate: p.taxRate.value,
      taxInclusive: p.taxInclusive,
      discountPercent: p.discountPercent.value,
      effectiveFrom: p.effectiveFrom,
      effectiveTo: p.effectiveTo,
      updatedAt: p.updatedAt,
    };
  }
}
