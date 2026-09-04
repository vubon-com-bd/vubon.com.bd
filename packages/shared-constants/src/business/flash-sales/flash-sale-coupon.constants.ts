/**
 * Flash Sale Coupon Constants
 * ফ্ল্যাশ সেল কুপন সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const FLASH_COUPON = {
  // Coupon status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    USED: 'used',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    PENDING: STATUS.PENDING,
    DELETED: STATUS.DELETED,
  },

  // Coupon types
  TYPES: {
    DISCOUNT: 'discount',
    FREE_SHIPPING: 'free_shipping',
    BUY_GET: 'buy_get',
    BUNDLE: 'bundle',
    FLASH: 'flash',
  },

  // Discount types
  DISCOUNT_TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    BUY_X_GET_Y: 'buy_x_get_y',
  },

  // Default values
  DEFAULTS: {
    MIN_ORDER_AMOUNT: 0,
    MAX_DISCOUNT_AMOUNT: 0,
    USAGE_LIMIT_PER_USER: 1,
    USAGE_LIMIT_TOTAL: 100,
  },
} as const;

export type FlashCouponStatus = (typeof FLASH_COUPON.STATUS)[keyof typeof FLASH_COUPON.STATUS];
export type FlashCouponType = (typeof FLASH_COUPON.TYPES)[keyof typeof FLASH_COUPON.TYPES];
export type FlashCouponDiscountType =
  (typeof FLASH_COUPON.DISCOUNT_TYPES)[keyof typeof FLASH_COUPON.DISCOUNT_TYPES];
