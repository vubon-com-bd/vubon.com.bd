/**
 * PayPal Constants (EXTENDS common/types)
 * @module shared-constants/business/payment/paypal.constants
 */

import { TYPES } from '../../common/types.constants';

export const PAYPAL = {
  // Base types from common
  ...TYPES,

  // PayPal specific
  DEFAULT_CURRENCY: 'USD',
  PAYPAL_CACHE_TTL: 3600,
  MAX_PAYMENT_AMOUNT: 999999.99,
  MIN_PAYMENT_AMOUNT: 0.01,

  // PayPal status
  PAYPAL_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_REFUND: 'partial_refund',
    AUTHORIZED: 'authorized',
    CAPTURED: 'captured',
    VOIDED: 'voided',
    DECLINED: 'declined',
  } as const,

  // PayPal payment method
  PAYPAL_PAYMENT_METHOD: {
    PAYPAL: 'paypal',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    BANK_ACCOUNT: 'bank_account',
    PAYPAL_CREDIT: 'paypal_credit',
  } as const,

  // PayPal intent
  PAYPAL_INTENT: {
    SALE: 'sale',
    AUTHORIZE: 'authorize',
    ORDER: 'order',
  } as const,

  // PayPal validation
  PAYPAL_VALIDATION: {
    ALLOWED_CURRENCIES: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    MAX_ATTEMPTS: 3,
    TIMEOUT_SECONDS: 300,
  } as const,
} as const;

export type PayPalStatus = (typeof PAYPAL.PAYPAL_STATUS)[keyof typeof PAYPAL.PAYPAL_STATUS];
export type PayPalPaymentMethod =
  (typeof PAYPAL.PAYPAL_PAYMENT_METHOD)[keyof typeof PAYPAL.PAYPAL_PAYMENT_METHOD];
export type PayPalIntent = (typeof PAYPAL.PAYPAL_INTENT)[keyof typeof PAYPAL.PAYPAL_INTENT];

export const PAYPAL_STATUS_LABELS: Record<PayPalStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  partial_refund: 'Partial Refund',
  authorized: 'Authorized',
  captured: 'Captured',
  voided: 'Voided',
  declined: 'Declined',
};

export const PAYPAL_STATUS_COLORS: Record<PayPalStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  refunded: '#6b7280',
  partial_refund: '#f59e0b',
  authorized: '#8b5cf6',
  captured: '#22c55e',
  voided: '#9ca3af',
  declined: '#ef4444',
};
