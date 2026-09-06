/**
 * Checkout Status Constants (EXTENDS common/status)
 * @module shared-constants/business/checkout/checkout-status.constants
 */

import { STATUS } from '../../common/status.constants';

export const CHECKOUT_STATUS = {
  // Base status from common
  ...STATUS,

  // Checkout specific status
  CHECKOUT_PENDING: 'checkout_pending',
  CHECKOUT_IN_PROGRESS: 'checkout_in_progress',
  CHECKOUT_COMPLETED: 'checkout_completed',
  CHECKOUT_FAILED: 'checkout_failed',
  CHECKOUT_CANCELLED: 'checkout_cancelled',
  CHECKOUT_EXPIRED: 'checkout_expired',
  CHECKOUT_ABANDONED: 'checkout_abandoned',
  CHECKOUT_RECOVERED: 'checkout_recovered',
  CHECKOUT_PAYMENT_PENDING: 'checkout_payment_pending',
  CHECKOUT_PAYMENT_COMPLETED: 'checkout_payment_completed',
  CHECKOUT_PAYMENT_FAILED: 'checkout_payment_failed',
  CHECKOUT_VERIFICATION_PENDING: 'checkout_verification_pending',
  CHECKOUT_VERIFICATION_COMPLETED: 'checkout_verification_completed',
  CHECKOUT_VERIFICATION_FAILED: 'checkout_verification_failed',
} as const;

// Use keyof typeof for Record keys
export type CheckoutStatusKey = keyof typeof CHECKOUT_STATUS;
export type CheckoutStatus = (typeof CHECKOUT_STATUS)[CheckoutStatusKey];

// Only include checkout specific status keys for labels and colors
export type CheckoutExtendedStatusKey =
  | 'CHECKOUT_PENDING'
  | 'CHECKOUT_IN_PROGRESS'
  | 'CHECKOUT_COMPLETED'
  | 'CHECKOUT_FAILED'
  | 'CHECKOUT_CANCELLED'
  | 'CHECKOUT_EXPIRED'
  | 'CHECKOUT_ABANDONED'
  | 'CHECKOUT_RECOVERED'
  | 'CHECKOUT_PAYMENT_PENDING'
  | 'CHECKOUT_PAYMENT_COMPLETED'
  | 'CHECKOUT_PAYMENT_FAILED'
  | 'CHECKOUT_VERIFICATION_PENDING'
  | 'CHECKOUT_VERIFICATION_COMPLETED'
  | 'CHECKOUT_VERIFICATION_FAILED';

export const CHECKOUT_STATUS_LABELS: Record<CheckoutExtendedStatusKey, string> = {
  CHECKOUT_PENDING: 'Checkout Pending',
  CHECKOUT_IN_PROGRESS: 'Checkout In Progress',
  CHECKOUT_COMPLETED: 'Checkout Completed',
  CHECKOUT_FAILED: 'Checkout Failed',
  CHECKOUT_CANCELLED: 'Checkout Cancelled',
  CHECKOUT_EXPIRED: 'Checkout Expired',
  CHECKOUT_ABANDONED: 'Checkout Abandoned',
  CHECKOUT_RECOVERED: 'Checkout Recovered',
  CHECKOUT_PAYMENT_PENDING: 'Payment Pending',
  CHECKOUT_PAYMENT_COMPLETED: 'Payment Completed',
  CHECKOUT_PAYMENT_FAILED: 'Payment Failed',
  CHECKOUT_VERIFICATION_PENDING: 'Verification Pending',
  CHECKOUT_VERIFICATION_COMPLETED: 'Verification Completed',
  CHECKOUT_VERIFICATION_FAILED: 'Verification Failed',
};

export const CHECKOUT_STATUS_COLORS: Record<CheckoutExtendedStatusKey, string> = {
  CHECKOUT_PENDING: '#eab308',
  CHECKOUT_IN_PROGRESS: '#60a5fa',
  CHECKOUT_COMPLETED: '#22c55e',
  CHECKOUT_FAILED: '#ef4444',
  CHECKOUT_CANCELLED: '#dc2626',
  CHECKOUT_EXPIRED: '#9ca3af',
  CHECKOUT_ABANDONED: '#ef4444',
  CHECKOUT_RECOVERED: '#22c55e',
  CHECKOUT_PAYMENT_PENDING: '#eab308',
  CHECKOUT_PAYMENT_COMPLETED: '#22c55e',
  CHECKOUT_PAYMENT_FAILED: '#ef4444',
  CHECKOUT_VERIFICATION_PENDING: '#eab308',
  CHECKOUT_VERIFICATION_COMPLETED: '#22c55e',
  CHECKOUT_VERIFICATION_FAILED: '#ef4444',
};

export const CHECKOUT_STATUS_GROUPS = {
  PENDING: [
    CHECKOUT_STATUS.PENDING,
    CHECKOUT_STATUS.CHECKOUT_PENDING,
    CHECKOUT_STATUS.CHECKOUT_PAYMENT_PENDING,
    CHECKOUT_STATUS.CHECKOUT_VERIFICATION_PENDING,
  ] as const,

  IN_PROGRESS: [CHECKOUT_STATUS.CHECKOUT_IN_PROGRESS] as const,

  COMPLETED: [
    CHECKOUT_STATUS.CHECKOUT_COMPLETED,
    CHECKOUT_STATUS.CHECKOUT_PAYMENT_COMPLETED,
    CHECKOUT_STATUS.CHECKOUT_VERIFICATION_COMPLETED,
  ] as const,

  FAILED: [
    CHECKOUT_STATUS.CHECKOUT_FAILED,
    CHECKOUT_STATUS.CHECKOUT_PAYMENT_FAILED,
    CHECKOUT_STATUS.CHECKOUT_VERIFICATION_FAILED,
  ] as const,

  CANCELLED: [CHECKOUT_STATUS.CHECKOUT_CANCELLED, CHECKOUT_STATUS.CHECKOUT_ABANDONED] as const,

  EXPIRED: [CHECKOUT_STATUS.CHECKOUT_EXPIRED] as const,

  RECOVERED: [CHECKOUT_STATUS.CHECKOUT_RECOVERED] as const,
} as const;
