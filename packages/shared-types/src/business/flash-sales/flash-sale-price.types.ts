/**
 * Flash Sale Price Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/flash-sale-price.constants থেকে।
 */

import type { FLASH_SALE_PRICE_TYPE } from '@vubon/shared-constants/business';
import type { ProductId, Money } from '../../common/primitives';

export type FlashSalePriceTypeValue =
  (typeof FLASH_SALE_PRICE_TYPE)[keyof typeof FLASH_SALE_PRICE_TYPE];

export interface FlashSalePrice {
  readonly id: string;
  readonly flashSaleId: string;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly type: FlashSalePriceTypeValue;
  readonly originalPrice: Money;
  readonly salePrice: Money;
  readonly discountAmount: Money;
  readonly discountPercent: number;
  readonly currency: string;
  readonly maxQuantity?: number;
  readonly minQuantity?: number;
  readonly tierPrices?: readonly FlashSalePriceTier[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface FlashSalePriceTier {
  readonly minQuantity: number;
  readonly maxQuantity?: number;
  readonly unitPrice: Money;
  readonly discountPercent: number;
}

export interface FlashSalePricePublic {
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly originalPrice: Money;
  readonly salePrice: Money;
  readonly discountPercent: number;
  readonly currency: string;
}
