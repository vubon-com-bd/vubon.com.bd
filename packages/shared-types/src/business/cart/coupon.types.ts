/**
 * Coupon Types
 * @module shared-types/business/cart
 *
 * Values আসে shared-constants/business/cart/coupon.constants থেকে।
 */

import type { COUPON_STATUS } from '@vubon/shared-constants/business';
import type { CouponId, Money, UserId } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { CouponTypeValue } from './coupon-type.types';
import type { CouponDiscountTypeValue, CouponAppliesToValue } from './coupon-discount-type.types';

export type CouponStatusValue = (typeof COUPON_STATUS)[keyof typeof COUPON_STATUS];

export interface Coupon extends BaseEntity<CouponId> {
  readonly code: string;
  readonly name: string;
  readonly description?: string;
  readonly type: CouponTypeValue;
  readonly discountType: CouponDiscountTypeValue;
  readonly appliesTo: CouponAppliesToValue;
  readonly status: CouponStatusValue;
  readonly discountValue: number;
  readonly maxDiscountAmount?: Money;
  readonly minOrderAmount?: Money;
  readonly maxUses: number;
  readonly usedCount: number;
  readonly maxUsesPerUser: number;
  readonly applicableIds?: readonly string[];
  readonly excludedIds?: readonly string[];
  readonly startAt: string;
  readonly endAt: string;
  readonly isStackable: boolean;
  readonly isActive: boolean;
}

export interface CouponPublic {
  readonly id: CouponId;
  readonly code: string;
  readonly name: string;
  readonly type: CouponTypeValue;
  readonly discountType: CouponDiscountTypeValue;
  readonly discountValue: number;
  readonly maxDiscountAmount?: Money;
  readonly minOrderAmount?: Money;
  readonly endAt: string;
}

export interface CouponValidationInput {
  readonly code: string;
  readonly userId: UserId;
  readonly cartTotal: Money;
  readonly itemIds: readonly string[];
}

export interface CouponValidationResult {
  readonly valid: boolean;
  readonly coupon?: CouponPublic;
  readonly discountAmount?: Money;
  readonly reason?: string;
  readonly errorCode?: string;
}

export interface CouponUsage {
  readonly couponId: CouponId;
  readonly userId: UserId;
  readonly orderId: string;
  readonly discountAmount: Money;
  readonly usedAt: string;
}
