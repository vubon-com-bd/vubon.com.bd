/**
 * PricingMapper — Entity → Response DTO
 * @module product-service/application/mappers
 */
import type { ProductPricingEntity } from '../../domain/entities/product-pricing.entity.js';
import type { PricingTypeValue } from '@vubon/shared-types/business/product';
import type {
  PricingResponseDTO,
  PricingPublicResponseDTO,
  PricingListResponseDTO,
  PricingStatsResponseDTO,
  PriceCalculationResponseDTO,
} from '../dtos/responses/pricing-response.dto.js';

export class PricingMapper {
  static toResponse(entity: ProductPricingEntity): PricingResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId.value,
      variantId: vo.variantId?.value,
      type: vo.type.value as PricingTypeValue,
      basePrice: vo.basePrice.value,
      sellingPrice: vo.sellingPrice.value,
      compareAtPrice: vo.compareAtPrice?.value,
      costPrice: vo.costPrice?.value,
      wholesalePrice: vo.wholesalePrice?.value,
      msrp: vo.msrp?.value,
      currency: vo.currency.value,
      taxInclusive: vo.taxInclusive,
      discountPercent: vo.discountPercent,
      discountAmount: vo.hasDiscount() ? vo.discountAmount : undefined,
      marginPercent: vo.hasMargin() ? vo.marginPercent : undefined,
      effectiveFrom: vo.effectiveFrom,
      effectiveTo: vo.effectiveTo,
      updatedAt: vo.updatedAt,
    };
  }

  static toPublicResponse(entity: ProductPricingEntity): PricingPublicResponseDTO {
    const vo = entity.vo;
    return {
      sellingPrice: vo.sellingPrice.value,
      compareAtPrice: vo.compareAtPrice?.value,
      currency: vo.currency.value,
      discountPercent: vo.discountPercent,
    };
  }

  static toListResponse(
    entities: readonly ProductPricingEntity[],
    total: number,
    page: number,
    limit: number,
  ): PricingListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toStatsResponse(stats: {
    total: number;
    averageSellingPrice: number;
    minPrice: number;
    maxPrice: number;
    discountedCount: number;
    byCurrency: Readonly<Record<string, number>>;
  }): PricingStatsResponseDTO {
    return { ...stats };
  }

  static toCalculationResponse(input: {
    basePrice: number;
    discountAmount: number;
    finalPrice: number;
    discountPercent: number;
    vat: number;
    ait: number;
    grossAmount: number;
    netAmount: number;
    currency: string;
  }): PriceCalculationResponseDTO {
    return { ...input };
  }
}
