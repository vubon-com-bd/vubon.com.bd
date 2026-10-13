/**
 * Pricing Response DTOs
 * @module product-service/application/dtos/responses
 */
import type { PricingTypeValue } from '@vubon/shared-types/business/product';

export interface PricingResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly type: PricingTypeValue;
  readonly basePrice: number;
  readonly sellingPrice: number;
  readonly compareAtPrice?: number;
  readonly costPrice?: number;
  readonly wholesalePrice?: number;
  readonly msrp?: number;
  readonly currency: string;
  readonly taxInclusive: boolean;
  readonly discountPercent?: number;
  readonly discountAmount?: number;
  readonly marginPercent?: number;
  readonly effectiveFrom?: string;
  readonly effectiveTo?: string;
  readonly updatedAt: string;
}

export interface PricingPublicResponseDTO {
  readonly sellingPrice: number;
  readonly compareAtPrice?: number;
  readonly currency: string;
  readonly discountPercent?: number;
}

export interface PricingListResponseDTO {
  readonly items: readonly PricingResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface PricingStatsResponseDTO {
  readonly total: number;
  readonly averageSellingPrice: number;
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly discountedCount: number;
  readonly byCurrency: Readonly<Record<string, number>>;
}

export interface PriceCalculationResponseDTO {
  readonly basePrice: number;
  readonly discountAmount: number;
  readonly finalPrice: number;
  readonly discountPercent: number;
  readonly vat: number;
  readonly ait: number;
  readonly grossAmount: number;
  readonly netAmount: number;
  readonly currency: string;
}
