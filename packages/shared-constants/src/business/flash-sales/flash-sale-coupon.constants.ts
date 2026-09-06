/**
 * Flash Sale Coupon Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/flash-sale-coupon.constants
 */

import { STATUS } from '../../common/status.constants';

export const FLASH_SALE_COUPON = {
  // Base status from common
  STATUS: STATUS,

  // Coupon specific
  MAX_COUPONS_PER_SALE: 100,
  COUPON_CACHE_TTL: 3600,
  MAX_USES_PER_COUPON: 1000,

  // Coupon status
  FLASH_SALE_COUPON_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    USED: 'used',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    EXHAUSTED: 'exhausted',
  } as const,

  // Coupon type
  FLASH_SALE_COUPON_TYPE: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    FREE_SHIPPING: 'free_shipping',
    BUNDLE: 'bundle',
    BOGO: 'bogo',
  } as const,

  // Coupon usage
  FLASH_SALE_COUPON_USAGE: {
    SINGLE_USE: 'single_use',
    MULTI_USE: 'multi_use',
    PER_USER: 'per_user',
    PER_ORDER: 'per_order',
  } as const,
} as const;

export type FlashSaleCouponStatus =
  (typeof FLASH_SALE_COUPON.FLASH_SALE_COUPON_STATUS)[keyof typeof FLASH_SALE_COUPON.FLASH_SALE_COUPON_STATUS];
export type FlashSaleCouponType =
  (typeof FLASH_SALE_COUPON.FLASH_SALE_COUPON_TYPE)[keyof typeof FLASH_SALE_COUPON.FLASH_SALE_COUPON_TYPE];
export type FlashSaleCouponUsage =
  (typeof FLASH_SALE_COUPON.FLASH_SALE_COUPON_USAGE)[keyof typeof FLASH_SALE_COUPON.FLASH_SALE_COUPON_USAGE];
