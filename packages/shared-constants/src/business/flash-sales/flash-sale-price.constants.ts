/**
 * Flash Sale Price Constants
 * ফ্ল্যাশ সেল মূল্য সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const FLASH_PRICE = {
  // Price types (TYPES থেকে ম্যাপিং)
  TYPES: {
    REGULAR: 'regular',
    FLASH: 'flash',
    DEAL: 'deal',
    BUNDLE: 'bundle',
    DYNAMIC: 'dynamic',
    // TYPES থেকে মান ব্যবহার
    FIXED: TYPES.FIXED || 'fixed',
    VARIABLE: TYPES.VARIABLE || 'variable',
  },

  // Price calculation
  CALCULATION: {
    BASE: 'base',
    DISCOUNTED: 'discounted',
    FINAL: 'final',
    TAX_INCLUSIVE: 'tax_inclusive',
    TAX_EXCLUSIVE: 'tax_exclusive',
  },

  // Price status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    PENDING: 'pending',
  },

  // Default values
  DEFAULTS: {
    MIN_PRICE: 0,
    MAX_PRICE: 99999999,
    DECIMAL_PLACES: 2,
    MIN_DISCOUNT: 1,
    MAX_DISCOUNT: 90,
  },
} as const;

export type FlashPriceType = (typeof FLASH_PRICE.TYPES)[keyof typeof FLASH_PRICE.TYPES];
export type FlashPriceCalculation =
  (typeof FLASH_PRICE.CALCULATION)[keyof typeof FLASH_PRICE.CALCULATION];
export type FlashPriceStatus = (typeof FLASH_PRICE.STATUS)[keyof typeof FLASH_PRICE.STATUS];
