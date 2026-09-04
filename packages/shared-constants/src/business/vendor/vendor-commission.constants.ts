/**
 * Vendor Commission Constants
 * ভেন্ডর কমিশন সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const COMMISSION = {
  // Commission types (TYPES ব্যবহার করে)
  TYPES: {
    FIXED: TYPES.FIXED,
    PERCENTAGE: TYPES.PERCENTAGE,
    TIERED: TYPES.TIERED,
    DYNAMIC: 'dynamic',
    CATEGORY_BASED: 'category_based',
  },

  // Commission calculation
  CALCULATION: {
    PRODUCT: 'product',
    CATEGORY: 'category',
    ORDER: 'order',
    TOTAL: 'total',
    NET: 'net',
  },

  // Commission status
  STATUS: {
    ACTIVE: TYPES.ACTIVE,
    INACTIVE: TYPES.INACTIVE,
    PENDING: TYPES.PENDING,
    PROCESSED: 'processed',
    PAID: 'paid',
  },

  // Default values
  DEFAULTS: {
    DEFAULT_RATE: 10,
    MIN_RATE: 0,
    MAX_RATE: 50,
    TIERED_THRESHOLDS: [1000, 5000, 10000],
    TIERED_RATES: [10, 8, 6, 4],
  },
} as const;

export type CommissionType = (typeof COMMISSION.TYPES)[keyof typeof COMMISSION.TYPES];
export type CommissionCalculation =
  (typeof COMMISSION.CALCULATION)[keyof typeof COMMISSION.CALCULATION];
export type CommissionStatus = (typeof COMMISSION.STATUS)[keyof typeof COMMISSION.STATUS];
