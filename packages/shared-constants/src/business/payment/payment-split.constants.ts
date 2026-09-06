/**
 * Payment Split Constants (EXTENDS common/status)
 * @module shared-constants/business/payment/payment-split.constants
 */

import { STATUS } from '../../common/status.constants';

export const PAYMENT_SPLIT = {
  // Base status from common
  STATUS: STATUS,

  // Split specific
  MAX_SPLIT_PARTIES: 10,
  MIN_SPLIT_AMOUNT: 0,
  SPLIT_CACHE_TTL: 3600,

  // Split status
  PAYMENT_SPLIT_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    PARTIAL: 'partial',
  } as const,

  // Split type
  PAYMENT_SPLIT_TYPE: {
    EQUAL: 'equal',
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    CUSTOM: 'custom',
  } as const,

  // Split method
  PAYMENT_SPLIT_METHOD: {
    AUTOMATIC: 'automatic',
    MANUAL: 'manual',
    SCHEDULED: 'scheduled',
  } as const,
} as const;

export type PaymentSplitStatus =
  (typeof PAYMENT_SPLIT.PAYMENT_SPLIT_STATUS)[keyof typeof PAYMENT_SPLIT.PAYMENT_SPLIT_STATUS];
export type PaymentSplitType =
  (typeof PAYMENT_SPLIT.PAYMENT_SPLIT_TYPE)[keyof typeof PAYMENT_SPLIT.PAYMENT_SPLIT_TYPE];
export type PaymentSplitMethod =
  (typeof PAYMENT_SPLIT.PAYMENT_SPLIT_METHOD)[keyof typeof PAYMENT_SPLIT.PAYMENT_SPLIT_METHOD];

export const PAYMENT_SPLIT_STATUS_LABELS: Record<PaymentSplitStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  partial: 'Partial',
};

export const PAYMENT_SPLIT_STATUS_COLORS: Record<PaymentSplitStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  partial: '#f59e0b',
};
