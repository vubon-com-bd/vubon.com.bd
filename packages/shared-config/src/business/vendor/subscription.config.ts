/**
 * Subscription Config
 * সাবস্ক্রিপশন কনফিগারেশন
 */

import { VENDOR_SUBSCRIPTION } from '@vubon/shared-constants';

export interface SubscriptionConfig {
  enabled: boolean;
  status: Record<string, string>;
  types: Record<string, string>;
  cycles: Record<string, string>;
  plans: {
    basic: { price: number; features: string[] };
    premium: { price: number; features: string[] };
    enterprise: { price: number; features: string[] };
  };
  defaults: {
    trialDays: number;
    minCycleDays: number;
    maxCycleDays: number;
    graceDays: number;
  };
}

export const subscriptionConfig: SubscriptionConfig = {
  enabled: true,

  status: {
    active: VENDOR_SUBSCRIPTION.STATUS.ACTIVE,
    inactive: VENDOR_SUBSCRIPTION.STATUS.INACTIVE,
    pending: VENDOR_SUBSCRIPTION.STATUS.PENDING,
    expired: VENDOR_SUBSCRIPTION.STATUS.EXPIRED,
    cancelled: VENDOR_SUBSCRIPTION.STATUS.CANCELLED,
    on_hold: VENDOR_SUBSCRIPTION.STATUS.ON_HOLD,
    trial: VENDOR_SUBSCRIPTION.STATUS.TRIAL,
  },

  types: {
    basic: VENDOR_SUBSCRIPTION.TYPES.BASIC,
    premium: VENDOR_SUBSCRIPTION.TYPES.PREMIUM,
    enterprise: VENDOR_SUBSCRIPTION.TYPES.ENTERPRISE,
    trial: VENDOR_SUBSCRIPTION.TYPES.TRIAL,
    custom: VENDOR_SUBSCRIPTION.TYPES.CUSTOM,
  },

  cycles: {
    monthly: VENDOR_SUBSCRIPTION.CYCLES.MONTHLY,
    quarterly: VENDOR_SUBSCRIPTION.CYCLES.QUARTERLY,
    bi_annual: VENDOR_SUBSCRIPTION.CYCLES.BI_ANNUAL,
    annual: VENDOR_SUBSCRIPTION.CYCLES.ANNUAL,
    custom: VENDOR_SUBSCRIPTION.CYCLES.CUSTOM,
  },

  plans: {
    basic: { price: 0, features: ['basic'] },
    premium: { price: 500, features: ['basic', 'advanced'] },
    enterprise: { price: 1000, features: ['basic', 'advanced', 'api'] },
  },

  defaults: {
    trialDays: VENDOR_SUBSCRIPTION.DEFAULTS.TRIAL_DAYS,
    minCycleDays: VENDOR_SUBSCRIPTION.DEFAULTS.MIN_CYCLE_DAYS,
    maxCycleDays: VENDOR_SUBSCRIPTION.DEFAULTS.MAX_CYCLE_DAYS,
    graceDays: VENDOR_SUBSCRIPTION.DEFAULTS.GRACE_DAYS,
  },
} as const;

export type SubscriptionConfigType = typeof subscriptionConfig;
