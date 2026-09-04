/**
 * Coupon Discount Type Constants
 * কুপন ডিসকাউন্ট টাইপ সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';
import { COUPON } from './coupon.constants';

export const COUPON_DISCOUNT_TYPES = {
  // Common types
  ...TYPES,

  // Discount specific types
  PERCENTAGE: COUPON.DISCOUNT_TYPES.PERCENTAGE,
  FIXED: COUPON.DISCOUNT_TYPES.FIXED,
  BUY_X_GET_Y: COUPON.DISCOUNT_TYPES.BUY_X_GET_Y,
  BUNDLE: COUPON.DISCOUNT_TYPES.BUNDLE,

  // Additional discount types
  TIERED: 'tiered',
  VOLUME: 'volume',
  MEMBERSHIP: 'membership',
} as const;

export type CouponDiscountTypeValue =
  (typeof COUPON_DISCOUNT_TYPES)[keyof typeof COUPON_DISCOUNT_TYPES];
