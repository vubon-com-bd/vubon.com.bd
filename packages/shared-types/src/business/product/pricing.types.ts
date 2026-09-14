/**
 * Pricing Types
 * @module shared-types/business/product
 *
 * Values আসে shared-constants/business/product/pricing.constants থেকে।
 */

import type { PRICING_TYPE, COST_TYPE } from '@vubon/shared-constants/business';
import type { ProductId, Money } from '../../common/primitives';

export type PricingTypeValue = (typeof PRICING_TYPE)[keyof typeof PRICING_TYPE];

export type CostTypeValue = (typeof COST_TYPE)[keyof typeof COST_TYPE];

export interface Pricing {
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly type: PricingTypeValue;
  readonly basePrice: Money;
  readonly sellingPrice: Money;
  readonly compareAtPrice?: Money;
  readonly costPrice?: Money;
  readonly wholesalePrice?: Money;
  readonly msrp?: Money;
  readonly currency: string;
  readonly taxInclusive: boolean;
  readonly discountPercent?: number;
  readonly discountAmount?: Money;
  readonly effectiveFrom?: string;
  readonly effectiveTo?: string;
  readonly updatedAt: string;
}

export interface PriceTier {
  readonly minQuantity: number;
  readonly maxQuantity?: number;
  readonly unitPrice: Money;
  readonly discountPercent?: number;
}

export interface PricingRule {
  readonly id: string;
  readonly name: string;
  readonly type: PricingTypeValue;
  readonly conditions: Readonly<Record<string, unknown>>;
  readonly priceAdjustment: number;
  readonly isActive: boolean;
}
