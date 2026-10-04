/**
 * Coupon Type Value Types
 * @module shared-types/business/cart
 *
 * Values আসে shared-constants/business/cart/coupon-type.constants থেকে।
 */

import type { COUPON_TYPE } from '@vubon/shared-constants/business';

export type CouponTypeValue = (typeof COUPON_TYPE)[keyof typeof COUPON_TYPE];

export interface CouponTypeMetadata {
  readonly value: CouponTypeValue;
  readonly label: string;
  readonly isPercentage: boolean;
  readonly isFixed: boolean;
  readonly isShipping: boolean;
}
