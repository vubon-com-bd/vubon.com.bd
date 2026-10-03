/**
 * PricingResponseDTO
 */
import type { ProductId, VariantId, Money } from '@vubon/shared-types/common';

export interface PricingResponseDTO {
  readonly id: string;
  readonly productId: ProductId;
  readonly variantId?: VariantId;
  readonly type: string;
  readonly basePrice: Money;
  readonly sellingPrice: Money;
  readonly compareAtPrice?: Money;
  readonly costPrice?: Money;
  readonly wholesalePrice?: Money;
  readonly msrp?: Money;
  readonly currency: string;
  readonly taxRate: number;
  readonly taxInclusive: boolean;
  readonly discountPercent: number;
  readonly effectiveFrom?: string;
  readonly effectiveTo?: string;
  readonly updatedAt: string;
}
