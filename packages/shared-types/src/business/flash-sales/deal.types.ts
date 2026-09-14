/**
 * Deal Core Types
 * @module shared-types/business/flash-sales
 *
 * Deal entity — flash sale-এর ভিতরে একেকটা deal।
 */

import type { Money } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { DealStatusValue } from './deal-status.types';
import type { DealDiscountTypeValue } from './deal-discount-type.types';

export type DealTypeValue = 'product' | 'bundle' | 'category' | 'brand' | 'cart' | 'order';

export interface Deal extends BaseEntity<string> {
  readonly flashSaleId: string;
  readonly name: string;
  readonly description?: string;
  readonly type: DealTypeValue;
  readonly status: DealStatusValue;
  readonly discountType: DealDiscountTypeValue;
  readonly discountValue: number;
  readonly maxDiscountAmount?: Money;
  readonly minOrderAmount?: Money;
  readonly applicableProductIds?: readonly string[];
  readonly applicableCategoryIds?: readonly string[];
  readonly applicableBrandIds?: readonly string[];
  readonly excludedProductIds?: readonly string[];
  readonly perUserLimit: number;
  readonly totalQuantityLimit?: number;
  readonly soldQuantity: number;
  readonly priority: number;
  readonly isStackable: boolean;
  readonly startAt: string;
  readonly endAt: string;
}

export interface DealPublic {
  readonly id: string;
  readonly flashSaleId: string;
  readonly name: string;
  readonly type: DealTypeValue;
  readonly discountType: DealDiscountTypeValue;
  readonly discountValue: number;
  readonly maxDiscountAmount?: Money;
  readonly minOrderAmount?: Money;
  readonly startAt: string;
  readonly endAt: string;
}

export interface DealApplyInput {
  readonly dealId: string;
  readonly userId: string;
  readonly cartTotal: Money;
  readonly itemIds: readonly string[];
}

export interface DealApplyResult {
  readonly applied: boolean;
  readonly dealId?: string;
  readonly discountAmount?: Money;
  readonly reason?: string;
}
