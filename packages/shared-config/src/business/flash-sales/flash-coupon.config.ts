/**
 * Flash Coupon Config
 * ফ্ল্যাশ কুপন কনফিগারেশন
 */

import { FLASH_SALE_COUPON } from '@vubon/shared-constants';

export interface FlashCouponConfig {
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

export const flashCouponConfig: FlashCouponConfig = {
  enabled: true,
  maxDiscount: 50,
  minOrderAmount: 100,
  maxUsage: 100,
  maxPerUser: 1,

  status: {
    active: FLASH_SALE_COUPON.STATUS.ACTIVE,
    inactive: FLASH_SALE_COUPON.STATUS.INACTIVE,
    used: FLASH_SALE_COUPON.STATUS.USED,
    expired: FLASH_SALE_COUPON.STATUS.EXPIRED,
    pending: FLASH_SALE_COUPON.STATUS.PENDING,
    deleted: FLASH_SALE_COUPON.STATUS.DELETED,
  },

  types: {
    discount: FLASH_SALE_COUPON.TYPES.DISCOUNT,
    free_shipping: FLASH_SALE_COUPON.TYPES.FREE_SHIPPING,
    buy_get: FLASH_SALE_COUPON.TYPES.BUY_GET,
    bundle: FLASH_SALE_COUPON.TYPES.BUNDLE,
    flash: FLASH_SALE_COUPON.TYPES.FLASH,
  },

  discountTypes: {
    percentage: FLASH_SALE_COUPON.DISCOUNT_TYPES.PERCENTAGE,
    fixed: FLASH_SALE_COUPON.DISCOUNT_TYPES.FIXED,
    buy_x_get_y: FLASH_SALE_COUPON.DISCOUNT_TYPES.BUY_X_GET_Y,
  },

  defaults: {
    minOrderAmount: FLASH_SALE_COUPON.DEFAULTS.MIN_ORDER_AMOUNT,
    maxDiscountAmount: FLASH_SALE_COUPON.DEFAULTS.MAX_DISCOUNT_AMOUNT,
    usageLimitPerUser: FLASH_SALE_COUPON.DEFAULTS.USAGE_LIMIT_PER_USER,
    usageLimitTotal: FLASH_SALE_COUPON.DEFAULTS.USAGE_LIMIT_TOTAL,
  },
} as const;

export type FlashCouponConfigType = typeof flashCouponConfig;
