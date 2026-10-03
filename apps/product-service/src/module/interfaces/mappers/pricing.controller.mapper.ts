/**
 * PricingControllerMapper
 */
import type { PricingResponseDTO as AppPricingDTO } from '../../application/dtos/responses/pricing-response.dto.js';
import { PricingResponseDTO } from '../dtos/responses/pricing.response.dto.js';

export class PricingControllerMapper {
  static toHttp(dto: AppPricingDTO): PricingResponseDTO {
    const out = new PricingResponseDTO();
    Object.assign(out, {
      id: dto.id,
      productId: String(dto.productId),
      variantId: dto.variantId ? String(dto.variantId) : undefined,
      type: dto.type,
      basePrice: Number(dto.basePrice),
      sellingPrice: Number(dto.sellingPrice),
      compareAtPrice: dto.compareAtPrice !== undefined ? Number(dto.compareAtPrice) : undefined,
      costPrice: dto.costPrice !== undefined ? Number(dto.costPrice) : undefined,
      wholesalePrice: dto.wholesalePrice !== undefined ? Number(dto.wholesalePrice) : undefined,
      msrp: dto.msrp !== undefined ? Number(dto.msrp) : undefined,
      currency: dto.currency,
      taxRate: dto.taxRate,
      taxInclusive: dto.taxInclusive,
      discountPercent: dto.discountPercent,
      effectiveFrom: dto.effectiveFrom,
      effectiveTo: dto.effectiveTo,
      updatedAt: dto.updatedAt,
    });
    return out;
  }
}
