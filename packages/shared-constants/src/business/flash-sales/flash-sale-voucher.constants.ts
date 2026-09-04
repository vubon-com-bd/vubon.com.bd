/**
 * Flash Sale Voucher Constants
 * ফ্ল্যাশ সেল ভাউচার সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const FLASH_VOUCHER = {
  // Voucher status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    USED: 'used',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    PENDING: STATUS.PENDING,
    DELETED: STATUS.DELETED,
  },

  // Voucher types
  TYPES: {
    DISCOUNT: 'discount',
    GIFT: 'gift',
    COMPLIMENTARY: 'complimentary',
    LOYALTY: 'loyalty',
    FLASH: 'flash',
  },

  // Voucher categories
  CATEGORIES: {
    ALL: 'all',
    ELECTRONICS: 'electronics',
    FASHION: 'fashion',
    HOME: 'home',
    BEAUTY: 'beauty',
    GROCERY: 'grocery',
  },

  // Default values
  DEFAULTS: {
    MIN_ORDER_AMOUNT: 0,
    MAX_DISCOUNT_AMOUNT: 0,
    USAGE_LIMIT_PER_USER: 1,
    USAGE_LIMIT_TOTAL: 50,
    VALIDITY_DAYS: 30,
  },
} as const;

export type FlashVoucherStatus = (typeof FLASH_VOUCHER.STATUS)[keyof typeof FLASH_VOUCHER.STATUS];
export type FlashVoucherType = (typeof FLASH_VOUCHER.TYPES)[keyof typeof FLASH_VOUCHER.TYPES];
export type FlashVoucherCategory =
  (typeof FLASH_VOUCHER.CATEGORIES)[keyof typeof FLASH_VOUCHER.CATEGORIES];
