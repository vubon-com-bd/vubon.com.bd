/**
 * Payment Refund Constants (EXTENDS common/status)
 * @module shared-constants/business/payment/payment-refund.constants
 */

import { STATUS } from '../../common/status.constants';

export const PAYMENT_REFUND = {
  // Base status from common
  STATUS: STATUS,

  // Refund specific
  REFUND_WINDOW_DAYS: 30,
  MAX_REFUND_AMOUNT: 99999999.99,
  MIN_REFUND_AMOUNT: 0,
  REFUND_CACHE_TTL: 3600,

  // Refund status
  PAYMENT_REFUND_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    PARTIAL: 'partial',
  } as const,

  // Refund reason
  PAYMENT_REFUND_REASON: {
    CUSTOMER_REQUEST: 'customer_request',
    DEFECTIVE_PRODUCT: 'defective_product',
    WRONG_ITEM: 'wrong_item',
    NOT_AS_DESCRIBED: 'not_as_described',
    DELIVERY_ISSUE: 'delivery_issue',
    DUPLICATE_PAYMENT: 'duplicate_payment',
    FRAUD: 'fraud',
    CHARGEBACK: 'chargeback',
    OTHER: 'other',
  } as const,

  // Refund type
  PAYMENT_REFUND_TYPE: {
    FULL: 'full',
    PARTIAL: 'partial',
    STORE_CREDIT: 'store_credit',
    ORIGINAL_METHOD: 'original_method',
    ALTERNATIVE_METHOD: 'alternative_method',
  } as const,

  // Refund method
  PAYMENT_REFUND_METHOD: {
    ORIGINAL_PAYMENT: 'original_payment',
    BANK_TRANSFER: 'bank_transfer',
    MOBILE_MONEY: 'mobile_money',
    STORE_CREDIT: 'store_credit',
    CASH: 'cash',
  } as const,
} as const;

export type PaymentRefundStatus =
  (typeof PAYMENT_REFUND.PAYMENT_REFUND_STATUS)[keyof typeof PAYMENT_REFUND.PAYMENT_REFUND_STATUS];
export type PaymentRefundReason =
  (typeof PAYMENT_REFUND.PAYMENT_REFUND_REASON)[keyof typeof PAYMENT_REFUND.PAYMENT_REFUND_REASON];
export type PaymentRefundType =
  (typeof PAYMENT_REFUND.PAYMENT_REFUND_TYPE)[keyof typeof PAYMENT_REFUND.PAYMENT_REFUND_TYPE];
export type PaymentRefundMethod =
  (typeof PAYMENT_REFUND.PAYMENT_REFUND_METHOD)[keyof typeof PAYMENT_REFUND.PAYMENT_REFUND_METHOD];

export const PAYMENT_REFUND_STATUS_LABELS: Record<PaymentRefundStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  partial: 'Partial',
};

export const PAYMENT_REFUND_STATUS_COLORS: Record<PaymentRefundStatus, string> = {
  pending: '#eab308',
  approved: '#22c55e',
  rejected: '#ef4444',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  partial: '#f59e0b',
};
