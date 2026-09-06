/**
 * bKash Constants (EXTENDS common/types)
 * @module shared-constants/business/payment/bkash.constants
 */

import { TYPES } from '../../common/types.constants';

export const BKASH = {
  // Base types from common
  ...TYPES,

  // bKash specific
  DEFAULT_CURRENCY: 'BDT',
  BKASH_CACHE_TTL: 3600,
  MAX_TRANSACTION_AMOUNT: 999999.99,
  MIN_TRANSACTION_AMOUNT: 1,

  // bKash status
  BKASH_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_REFUND: 'partial_refund',
    REVERSED: 'reversed',
    DECLINED: 'declined',
  } as const,

  // bKash transaction type
  BKASH_TRANSACTION_TYPE: {
    SEND_MONEY: 'send_money',
    RECEIVE_MONEY: 'receive_money',
    PAYMENT: 'payment',
    REFUND: 'refund',
    CASH_OUT: 'cash_out',
    CASH_IN: 'cash_in',
    AGENT_PAYMENT: 'agent_payment',
    MERCHANT_PAYMENT: 'merchant_payment',
  } as const,

  // bKash account type
  BKASH_ACCOUNT_TYPE: {
    PERSONAL: 'personal',
    MERCHANT: 'merchant',
    AGENT: 'agent',
    CORPORATE: 'corporate',
  } as const,

  // bKash validation
  BKASH_VALIDATION: {
    ACCOUNT_FORMAT: /^(?:\+880|0|88)?(1[3-9]\d{8})$/,
    PIN_LENGTH: 4,
    OTP_LENGTH: 6,
    MAX_ATTEMPTS: 3,
    TIMEOUT_SECONDS: 300,
  } as const,

  // bKash API endpoints
  BKASH_ENDPOINTS: {
    TOKEN: '/token/grant',
    PAYMENT: '/payment/create',
    REFUND: '/payment/refund',
    QUERY: '/payment/query',
    TRANSACTION: '/transaction/status',
  } as const,
} as const;

export type BkashStatus = (typeof BKASH.BKASH_STATUS)[keyof typeof BKASH.BKASH_STATUS];
export type BkashTransactionType =
  (typeof BKASH.BKASH_TRANSACTION_TYPE)[keyof typeof BKASH.BKASH_TRANSACTION_TYPE];
export type BkashAccountType =
  (typeof BKASH.BKASH_ACCOUNT_TYPE)[keyof typeof BKASH.BKASH_ACCOUNT_TYPE];

export const BKASH_STATUS_LABELS: Record<BkashStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  partial_refund: 'Partial Refund',
  reversed: 'Reversed',
  declined: 'Declined',
};

export const BKASH_STATUS_COLORS: Record<BkashStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  refunded: '#6b7280',
  partial_refund: '#f59e0b',
  reversed: '#6b7280',
  declined: '#ef4444',
};
