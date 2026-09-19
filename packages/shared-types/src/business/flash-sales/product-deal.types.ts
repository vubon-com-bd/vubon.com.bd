/**
 * Product Deal Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/product-deal.constants থেকে।
 */

import type { PRODUCT_DEAL_STATUS } from '@vubon/shared-constants/business';
import type { ProductId, VendorId, Money } from '../../common/primitives';
import type { DealDiscountTypeValue } from './deal-discount-type.types';

export type ProductDealStatusValue = (typeof PRODUCT_DEAL_STATUS)[keyof typeof PRODUCT_DEAL_STATUS];

export interface ProductDeal {
  readonly id: string;
  readonly dealId: string;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly vendorId?: VendorId;
  readonly status: ProductDealStatusValue;
  readonly discountType: DealDiscountTypeValue;
  readonly discountValue: number;
  readonly originalPrice: Money;
  readonly dealPrice: Money;
  readonly currency: string;
  readonly minQuantity: number;
  readonly maxQuantity?: number;
  readonly perUserLimit: number;
  readonly totalQuantityLimit?: number;
  readonly soldQuantity: number;
  readonly startAt: string;
  readonly endAt: string;
}

export interface ProductDealPublic {
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly originalPrice: Money;
  readonly dealPrice: Money;
  readonly discountPercent: number;
  readonly currency: string;
  readonly remaining: number;
}
