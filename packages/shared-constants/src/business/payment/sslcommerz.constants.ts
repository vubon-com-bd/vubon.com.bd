/**
 * SSLCommerz Constants (EXTENDS common/types)
 * @module shared-constants/business/payment/sslcommerz.constants
 */

import { TYPES } from '../../common/types.constants';

export const SSLCOMMERZ = {
  // Base types from common
  ...TYPES,

  // SSLCommerz specific
  DEFAULT_CURRENCY: 'BDT',
  SSLCOMMERZ_CACHE_TTL: 3600,

  // SSLCommerz status
  SSLCOMMERZ_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_REFUND: 'partial_refund',
  } as const,

  // SSLCommerz transaction type
  SSLCOMMERZ_TRANSACTION_TYPE: {
    SALE: 'sale',
    AUTHORIZATION: 'authorization',
    CAPTURE: 'capture',
    REFUND: 'refund',
    VOID: 'void',
  } as const,

  // SSLCommerz payment option
  SSLCOMMERZ_PAYMENT_OPTION: {
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    UPAY: 'upay',
    TAP: 'tap',
    OK_WALLET: 'ok_wallet',
    MCASH: 'mcash',
    MYCASH: 'mycash',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    BANK_TRANSFER: 'bank_transfer',
  } as const,

  // SSLCommerz API endpoints
  SSLCOMMERZ_ENDPOINTS: {
    INITIATE: '/api/v1/initiate',
    PAYMENT: '/api/v1/payment',
    VERIFY: '/api/v1/verify',
    REFUND: '/api/v1/refund',
    QUERY: '/api/v1/query',
  } as const,

  // SSLCommerz validation
  SSLCOMMERZ_VALIDATION: {
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 99999999.99,
    ALLOWED_CURRENCIES: ['BDT', 'USD', 'EUR', 'GBP'],
  } as const,
} as const;

export type SSLCommerzStatus =
  (typeof SSLCOMMERZ.SSLCOMMERZ_STATUS)[keyof typeof SSLCOMMERZ.SSLCOMMERZ_STATUS];
export type SSLCommerzTransactionType =
  (typeof SSLCOMMERZ.SSLCOMMERZ_TRANSACTION_TYPE)[keyof typeof SSLCOMMERZ.SSLCOMMERZ_TRANSACTION_TYPE];
export type SSLCommerzPaymentOption =
  (typeof SSLCOMMERZ.SSLCOMMERZ_PAYMENT_OPTION)[keyof typeof SSLCOMMERZ.SSLCOMMERZ_PAYMENT_OPTION];

export const SSLCOMMERZ_STATUS_LABELS: Record<SSLCommerzStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  partial_refund: 'Partial Refund',
};

export const SSLCOMMERZ_STATUS_COLORS: Record<SSLCommerzStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  refunded: '#6b7280',
  partial_refund: '#f59e0b',
};
