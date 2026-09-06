/**
 * Payment Subscription Constants (EXTENDS common/status)
 * @module shared-constants/business/payment/payment-subscription.constants
 */

import { STATUS } from '../../common/status.constants';

export const PAYMENT_SUBSCRIPTION = {
  // Base status from common
  STATUS: STATUS,

  // Subscription specific
  MAX_SUBSCRIPTION_ITEMS: 50,
  SUBSCRIPTION_CACHE_TTL: 3600,

  // Subscription status
  PAYMENT_SUBSCRIPTION_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    TRIAL: 'trial',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    PAUSED: 'paused',
    SUSPENDED: 'suspended',
    GRACE_PERIOD: 'grace_period',
    FAILED: 'failed',
  } as const,

  // Subscription tier
  PAYMENT_SUBSCRIPTION_TIER: {
    BASIC: 'basic',
    STANDARD: 'standard',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    CUSTOM: 'custom',
    FREE: 'free',
  } as const,

  // Subscription billing
  PAYMENT_SUBSCRIPTION_BILLING: {
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    ONE_TIME: 'one_time',
    CUSTOM: 'custom',
  } as const,

  // Subscription features
  PAYMENT_SUBSCRIPTION_FEATURES: {
    BASIC_ACCESS: 'basic_access',
    PREMIUM_CONTENT: 'premium_content',
    PRIORITY_SUPPORT: 'priority_support',
    API_ACCESS: 'api_access',
    ADVANCED_ANALYTICS: 'advanced_analytics',
    CUSTOM_BRANDING: 'custom_branding',
    TEAM_ACCESS: 'team_access',
    UNLIMITED: 'unlimited',
  } as const,
} as const;

export type PaymentSubscriptionStatus =
  (typeof PAYMENT_SUBSCRIPTION.PAYMENT_SUBSCRIPTION_STATUS)[keyof typeof PAYMENT_SUBSCRIPTION.PAYMENT_SUBSCRIPTION_STATUS];
export type PaymentSubscriptionTier =
  (typeof PAYMENT_SUBSCRIPTION.PAYMENT_SUBSCRIPTION_TIER)[keyof typeof PAYMENT_SUBSCRIPTION.PAYMENT_SUBSCRIPTION_TIER];
export type PaymentSubscriptionBilling =
  (typeof PAYMENT_SUBSCRIPTION.PAYMENT_SUBSCRIPTION_BILLING)[keyof typeof PAYMENT_SUBSCRIPTION.PAYMENT_SUBSCRIPTION_BILLING];
export type PaymentSubscriptionFeature =
  (typeof PAYMENT_SUBSCRIPTION.PAYMENT_SUBSCRIPTION_FEATURES)[keyof typeof PAYMENT_SUBSCRIPTION.PAYMENT_SUBSCRIPTION_FEATURES];

export const PAYMENT_SUBSCRIPTION_STATUS_LABELS: Record<PaymentSubscriptionStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  trial: 'Trial',
  expired: 'Expired',
  cancelled: 'Cancelled',
  paused: 'Paused',
  suspended: 'Suspended',
  grace_period: 'Grace Period',
  failed: 'Failed',
};

export const PAYMENT_SUBSCRIPTION_STATUS_COLORS: Record<PaymentSubscriptionStatus, string> = {
  active: '#22c55e',
  inactive: '#9ca3af',
  pending: '#eab308',
  trial: '#60a5fa',
  expired: '#9ca3af',
  cancelled: '#dc2626',
  paused: '#f59e0b',
  suspended: '#f59e0b',
  grace_period: '#eab308',
  failed: '#ef4444',
};
