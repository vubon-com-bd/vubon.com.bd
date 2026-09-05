/**
 * Subscription Constants
 * সাবস্ক্রিপশন সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const SUBSCRIPTION = {
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    PENDING: STATUS.PENDING,
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    TRIAL: 'trial',
  },
  INTERVALS: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    BI_ANNUAL: 'bi_annual',
    ANNUAL: 'annual',
  },
  DEFAULTS: {
    TRIAL_DAYS: 14,
    GRACE_DAYS: 3,
  },
} as const;

export type SubscriptionStatus = (typeof SUBSCRIPTION.STATUS)[keyof typeof SUBSCRIPTION.STATUS];
export type SubscriptionInterval =
  (typeof SUBSCRIPTION.INTERVALS)[keyof typeof SUBSCRIPTION.INTERVALS];
