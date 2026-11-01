export const VENDOR_SUBSCRIPTION_PLAN = {
  FREE: 'free',
  BASIC: 'basic',
  STANDARD: 'standard',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

export const VENDOR_SUBSCRIPTION_STATUS = {
  TRIAL: 'trial',
  ACTIVE: 'active',
  PAST_DUE: 'past_due',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
  SUSPENDED: 'suspended',
} as const;

export const VENDOR_SUBSCRIPTION_CYCLE = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  HALF_YEARLY: 'half_yearly',
  YEARLY: 'yearly',
  LIFETIME: 'lifetime',
} as const;

export const VENDOR_SUBSCRIPTION = {
  TRIAL_DAYS: 14,
  GRACE_PERIOD_DAYS: 7,
  AUTO_RENEW: true,
  CANCEL_AT_PERIOD_END: true,
  MAX_PRODUCTS_FREE: 50,
  MAX_PRODUCTS_BASIC: 500,
  MAX_PRODUCTS_STANDARD: 5000,
  MAX_PRODUCTS_PREMIUM: 50000,
  MAX_PRODUCTS_ENTERPRISE: null,
} as const;

export type VendorSubscriptionPlanType =
  (typeof VENDOR_SUBSCRIPTION_PLAN)[keyof typeof VENDOR_SUBSCRIPTION_PLAN];
export type VendorSubscriptionStatusType =
  (typeof VENDOR_SUBSCRIPTION_STATUS)[keyof typeof VENDOR_SUBSCRIPTION_STATUS];
export type VendorSubscriptionCycleType =
  (typeof VENDOR_SUBSCRIPTION_CYCLE)[keyof typeof VENDOR_SUBSCRIPTION_CYCLE];
