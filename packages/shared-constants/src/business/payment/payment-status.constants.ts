/**
 * Payment Status Constants (EXTENDS common/status)
 * @module shared-constants/business/payment/payment-status.constants
 */

import { STATUS } from '../../common/status.constants';

export const PAYMENT_STATUS = {
  // Base status from common
  ...STATUS,

  // Payment specific status - using UPPERCASE keys
  PAYMENT_PENDING: 'payment_pending',
  PAYMENT_PROCESSING: 'payment_processing',
  PAYMENT_COMPLETED: 'payment_completed',
  PAYMENT_FAILED: 'payment_failed',
  PAYMENT_CANCELLED: 'payment_cancelled',
  PAYMENT_REFUNDED: 'payment_refunded',
  PAYMENT_PARTIAL_REFUND: 'payment_partial_refund',
  PAYMENT_AUTHORIZED: 'payment_authorized',
  PAYMENT_CAPTURED: 'payment_captured',
  PAYMENT_DECLINED: 'payment_declined',
  PAYMENT_EXPIRED: 'payment_expired',
  PAYMENT_ON_HOLD: 'payment_on_hold',
  PAYMENT_VERIFICATION_PENDING: 'payment_verification_pending',
  PAYMENT_VERIFICATION_COMPLETED: 'payment_verification_completed',
  PAYMENT_VERIFICATION_FAILED: 'payment_verification_failed',
  PAYMENT_CHARGEBACK: 'payment_chargeback',
  PAYMENT_DISPUTE: 'payment_dispute',
  PAYMENT_REVERSED: 'payment_reversed',
} as const;

// Only define keys for payment specific status (not including common STATUS keys)
export type PaymentExtendedStatusKey =
  | 'PAYMENT_PENDING'
  | 'PAYMENT_PROCESSING'
  | 'PAYMENT_COMPLETED'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_CANCELLED'
  | 'PAYMENT_REFUNDED'
  | 'PAYMENT_PARTIAL_REFUND'
  | 'PAYMENT_AUTHORIZED'
  | 'PAYMENT_CAPTURED'
  | 'PAYMENT_DECLINED'
  | 'PAYMENT_EXPIRED'
  | 'PAYMENT_ON_HOLD'
  | 'PAYMENT_VERIFICATION_PENDING'
  | 'PAYMENT_VERIFICATION_COMPLETED'
  | 'PAYMENT_VERIFICATION_FAILED'
  | 'PAYMENT_CHARGEBACK'
  | 'PAYMENT_DISPUTE'
  | 'PAYMENT_REVERSED';

// Rename to avoid conflict with payment.constants
export type PaymentStatusValueType = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_STATUS_LABELS: Record<PaymentExtendedStatusKey, string> = {
  PAYMENT_PENDING: 'Payment Pending',
  PAYMENT_PROCESSING: 'Payment Processing',
  PAYMENT_COMPLETED: 'Payment Completed',
  PAYMENT_FAILED: 'Payment Failed',
  PAYMENT_CANCELLED: 'Payment Cancelled',
  PAYMENT_REFUNDED: 'Payment Refunded',
  PAYMENT_PARTIAL_REFUND: 'Partial Refund',
  PAYMENT_AUTHORIZED: 'Payment Authorized',
  PAYMENT_CAPTURED: 'Payment Captured',
  PAYMENT_DECLINED: 'Payment Declined',
  PAYMENT_EXPIRED: 'Payment Expired',
  PAYMENT_ON_HOLD: 'Payment On Hold',
  PAYMENT_VERIFICATION_PENDING: 'Verification Pending',
  PAYMENT_VERIFICATION_COMPLETED: 'Verification Completed',
  PAYMENT_VERIFICATION_FAILED: 'Verification Failed',
  PAYMENT_CHARGEBACK: 'Chargeback',
  PAYMENT_DISPUTE: 'Dispute',
  PAYMENT_REVERSED: 'Payment Reversed',
};

export const PAYMENT_STATUS_COLORS: Record<PaymentExtendedStatusKey, string> = {
  PAYMENT_PENDING: '#eab308',
  PAYMENT_PROCESSING: '#60a5fa',
  PAYMENT_COMPLETED: '#22c55e',
  PAYMENT_FAILED: '#ef4444',
  PAYMENT_CANCELLED: '#dc2626',
  PAYMENT_REFUNDED: '#6b7280',
  PAYMENT_PARTIAL_REFUND: '#f59e0b',
  PAYMENT_AUTHORIZED: '#8b5cf6',
  PAYMENT_CAPTURED: '#22c55e',
  PAYMENT_DECLINED: '#ef4444',
  PAYMENT_EXPIRED: '#9ca3af',
  PAYMENT_ON_HOLD: '#f59e0b',
  PAYMENT_VERIFICATION_PENDING: '#eab308',
  PAYMENT_VERIFICATION_COMPLETED: '#22c55e',
  PAYMENT_VERIFICATION_FAILED: '#ef4444',
  PAYMENT_CHARGEBACK: '#dc2626',
  PAYMENT_DISPUTE: '#f59e0b',
  PAYMENT_REVERSED: '#6b7280',
};

export const PAYMENT_STATUS_GROUPS = {
  PENDING: [
    PAYMENT_STATUS.PENDING,
    PAYMENT_STATUS.PAYMENT_PENDING,
    PAYMENT_STATUS.PAYMENT_VERIFICATION_PENDING,
  ] as const,

  PROCESSING: [PAYMENT_STATUS.PAYMENT_PROCESSING, PAYMENT_STATUS.PAYMENT_AUTHORIZED] as const,

  COMPLETED: [
    PAYMENT_STATUS.PAYMENT_COMPLETED,
    PAYMENT_STATUS.PAYMENT_CAPTURED,
    PAYMENT_STATUS.PAYMENT_VERIFICATION_COMPLETED,
  ] as const,

  FAILED: [
    PAYMENT_STATUS.PAYMENT_FAILED,
    PAYMENT_STATUS.PAYMENT_DECLINED,
    PAYMENT_STATUS.PAYMENT_VERIFICATION_FAILED,
  ] as const,

  REFUNDED: [PAYMENT_STATUS.PAYMENT_REFUNDED, PAYMENT_STATUS.PAYMENT_PARTIAL_REFUND] as const,

  CANCELLED: [PAYMENT_STATUS.PAYMENT_CANCELLED, PAYMENT_STATUS.PAYMENT_EXPIRED] as const,

  DISPUTED: [
    PAYMENT_STATUS.PAYMENT_CHARGEBACK,
    PAYMENT_STATUS.PAYMENT_DISPUTE,
    PAYMENT_STATUS.PAYMENT_REVERSED,
  ] as const,

  HOLD: [PAYMENT_STATUS.PAYMENT_ON_HOLD, PAYMENT_STATUS.PAYMENT_VERIFICATION_PENDING] as const,
} as const;
