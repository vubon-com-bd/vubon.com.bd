/**
 * Payment Recurring Constants (EXTENDS common/status)
 * @module shared-constants/business/payment/payment-recurring.constants
 */

import { STATUS } from '../../common/status.constants';

export const PAYMENT_RECURRING = {
  // Base status from common
  STATUS: STATUS,

  // Recurring specific
  RECURRING_CACHE_TTL: 3600,
  MAX_RECURRING_ATTEMPTS: 3,

  // Recurring status
  PAYMENT_RECURRING_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    FAILED: 'failed',
    COMPLETED: 'completed',
  } as const,

  // Recurring frequency
  PAYMENT_RECURRING_FREQUENCY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    BI_MONTHLY: 'bi_monthly',
    QUARTERLY: 'quarterly',
    HALF_YEARLY: 'half_yearly',
    YEARLY: 'yearly',
    CUSTOM: 'custom',
  } as const,

  // Recurring type
  PAYMENT_RECURRING_TYPE: {
    FIXED: 'fixed',
    VARIABLE: 'variable',
    ESCALATING: 'escalating',
    DEESCALATING: 'deescalating',
  } as const,

  // Recurring billing
  PAYMENT_RECURRING_BILLING: {
    AUTOMATIC: 'automatic',
    MANUAL: 'manual',
    HYBRID: 'hybrid',
  } as const,
} as const;

export type PaymentRecurringStatus =
  (typeof PAYMENT_RECURRING.PAYMENT_RECURRING_STATUS)[keyof typeof PAYMENT_RECURRING.PAYMENT_RECURRING_STATUS];
export type PaymentRecurringFrequency =
  (typeof PAYMENT_RECURRING.PAYMENT_RECURRING_FREQUENCY)[keyof typeof PAYMENT_RECURRING.PAYMENT_RECURRING_FREQUENCY];
export type PaymentRecurringType =
  (typeof PAYMENT_RECURRING.PAYMENT_RECURRING_TYPE)[keyof typeof PAYMENT_RECURRING.PAYMENT_RECURRING_TYPE];
export type PaymentRecurringBilling =
  (typeof PAYMENT_RECURRING.PAYMENT_RECURRING_BILLING)[keyof typeof PAYMENT_RECURRING.PAYMENT_RECURRING_BILLING];

export const PAYMENT_RECURRING_STATUS_LABELS: Record<PaymentRecurringStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  paused: 'Paused',
  cancelled: 'Cancelled',
  expired: 'Expired',
  failed: 'Failed',
  completed: 'Completed',
};

export const PAYMENT_RECURRING_STATUS_COLORS: Record<PaymentRecurringStatus, string> = {
  active: '#22c55e',
  inactive: '#9ca3af',
  pending: '#eab308',
  paused: '#f59e0b',
  cancelled: '#dc2626',
  expired: '#9ca3af',
  failed: '#ef4444',
  completed: '#22c55e',
};
