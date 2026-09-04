/**
 * Vendor Subscription Constants
 * ভেন্ডর সাবস্ক্রিপশন সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const VENDOR_SUBSCRIPTION = {
  // Subscription status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    PENDING: STATUS.PENDING,
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
    TRIAL: 'trial',
  },

  // Subscription types
  TYPES: {
    BASIC: 'basic',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    TRIAL: 'trial',
    CUSTOM: 'custom',
  },

  // Subscription billing cycles
  CYCLES: {
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    BI_ANNUAL: 'bi_annual',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
  },

  // Default values
  DEFAULTS: {
    TRIAL_DAYS: 14,
    MIN_CYCLE_DAYS: 30,
    MAX_CYCLE_DAYS: 365,
    GRACE_DAYS: 3,
  },
} as const;

export type VendorSubscriptionStatus =
  (typeof VENDOR_SUBSCRIPTION.STATUS)[keyof typeof VENDOR_SUBSCRIPTION.STATUS];
export type VendorSubscriptionType =
  (typeof VENDOR_SUBSCRIPTION.TYPES)[keyof typeof VENDOR_SUBSCRIPTION.TYPES];
export type VendorSubscriptionCycle =
  (typeof VENDOR_SUBSCRIPTION.CYCLES)[keyof typeof VENDOR_SUBSCRIPTION.CYCLES];
