/**
 * Coupon Discount Type Value Types
 * @module shared-types/business/cart
 *
 * Values আসে shared-constants/business/cart/coupon-discount-type.constants থেকে।
 */

import type { COUPON_DISCOUNT_TYPE, COUPON_APPLIES_TO } from '@vubon/shared-constants/business';

export type CouponDiscountTypeValue =
  (typeof COUPON_DISCOUNT_TYPE)[keyof typeof COUPON_DISCOUNT_TYPE];

export type CouponAppliesToValue = (typeof COUPON_APPLIES_TO)[keyof typeof COUPON_APPLIES_TO];

export interface CouponDiscountTypeMetadata {
  readonly value: CouponDiscountTypeValue;
  readonly label: string;
  readonly scope: CouponAppliesToValue;
  readonly isStackable: boolean;
}
