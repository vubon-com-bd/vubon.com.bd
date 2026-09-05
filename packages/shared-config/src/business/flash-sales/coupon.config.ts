/**
 * Coupon Config
 * কুপন কনফিগারেশন
 */

import { COUPON } from '@vubon/shared-constants';

export interface CouponConfig {
  enabled: boolean;
  maxDiscount: number;
  minOrderAmount: number;
  maxUsage: number;
  maxPerUser: number;
  status: Record<string, string>;
  types: Record<string, string>;
  discountTypes: Record<string, string>;
  defaults: {
    minOrderAmount: number;
    maxDiscountAmount: number;
    usageLimitPerUser: number;
    usageLimitTotal: number;
  };
}

export const couponConfig: CouponConfig = {
  enabled: true,
  maxDiscount: 50,
  minOrderAmount: 100,
  maxUsage: 100,
  maxPerUser: 1,

  status: {
    active: COUPON.STATUS.ACTIVE,
    inactive: COUPON.STATUS.INACTIVE,
    used: COUPON.STATUS.USED,
    expired: COUPON.STATUS.EXPIRED,
    pending: COUPON.STATUS.PENDING,
    deleted: COUPON.STATUS.DELETED,
  },

  types: {
    discount: COUPON.TYPES.DISCOUNT,
    free_shipping: COUPON.TYPES.FREE_SHIPPING,
    buy_get: COUPON.TYPES.BUY_GET,
    gift: COUPON.TYPES.GIFT,
    voucher: COUPON.TYPES.VOUCHER,
  },

  discountTypes: {
    percentage: COUPON.DISCOUNT_TYPES.PERCENTAGE,
    fixed: COUPON.DISCOUNT_TYPES.FIXED,
    buy_x_get_y: COUPON.DISCOUNT_TYPES.BUY_X_GET_Y,
    bundle: COUPON.DISCOUNT_TYPES.BUNDLE,
  },

  defaults: {
    minOrderAmount: COUPON.DEFAULTS.MIN_ORDER_AMOUNT,
    maxDiscountAmount: COUPON.DEFAULTS.MAX_DISCOUNT_AMOUNT,
    usageLimitPerUser: COUPON.DEFAULTS.USAGE_LIMIT_PER_USER,
    usageLimitTotal: COUPON.DEFAULTS.USAGE_LIMIT_TOTAL,
  },
} as const;

export type CouponConfigType = typeof couponConfig;
