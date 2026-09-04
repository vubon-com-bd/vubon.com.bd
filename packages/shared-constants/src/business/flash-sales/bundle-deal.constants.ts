/**
 * Bundle Deal Constants
 * বান্ডেল ডিল সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const BUNDLE_DEAL = {
  // Bundle deal status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    EXPIRED: 'expired',
    SOLD_OUT: 'sold_out',
    CANCELLED: 'cancelled',
    PENDING: STATUS.PENDING,
  },

  // Bundle deal types
  TYPES: {
    FIXED: 'fixed',
    CUSTOM: 'custom',
    MIXED: 'mixed',
    SEASONAL: 'seasonal',
  },

  // Discount types
  DISCOUNT_TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    BUY_X_GET_Y: 'buy_x_get_y',
  },

  // Default values
  DEFAULTS: {
    MIN_ITEMS: 2,
    MAX_ITEMS: 10,
    MIN_DISCOUNT: 1,
    MAX_DISCOUNT: 90,
  },
} as const;

export type BundleDealStatus = (typeof BUNDLE_DEAL.STATUS)[keyof typeof BUNDLE_DEAL.STATUS];
export type BundleDealType = (typeof BUNDLE_DEAL.TYPES)[keyof typeof BUNDLE_DEAL.TYPES];
export type BundleDiscountType =
  (typeof BUNDLE_DEAL.DISCOUNT_TYPES)[keyof typeof BUNDLE_DEAL.DISCOUNT_TYPES];
