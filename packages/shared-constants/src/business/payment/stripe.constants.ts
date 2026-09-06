/**
 * Stripe Constants (EXTENDS common/types)
 * @module shared-constants/business/payment/stripe.constants
 */

import { TYPES } from '../../common/types.constants';

export const STRIPE = {
  // Base types from common
  ...TYPES,

  // Stripe specific
  DEFAULT_CURRENCY: 'USD',
  STRIPE_CACHE_TTL: 3600,
  MAX_PAYMENT_AMOUNT: 999999.99,
  MIN_PAYMENT_AMOUNT: 0.5,

  // Stripe status
  STRIPE_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_REFUND: 'partial_refund',
    REQUIRES_ACTION: 'requires_action',
    REQUIRES_CONFIRMATION: 'requires_confirmation',
    REQUIRES_PAYMENT_METHOD: 'requires_payment_method',
  } as const,

  // Stripe payment method
  STRIPE_PAYMENT_METHOD: {
    CARD: 'card',
    BANK_DEBIT: 'bank_debit',
    BANK_TRANSFER: 'bank_transfer',
    IDEAL: 'ideal',
    SEPADEBIT: 'sepa_debit',
    SOFORT: 'sofort',
    GIROPAY: 'giropay',
    EPS: 'eps',
    P24: 'p24',
    BANCONTACT: 'bancontact',
    WECHAT: 'wechat',
    ALIPAY: 'alipay',
    APPLE_PAY: 'apple_pay',
    GOOGLE_PAY: 'google_pay',
  } as const,

  // Stripe intent status
  STRIPE_INTENT_STATUS: {
    REQUIRES_PAYMENT_METHOD: 'requires_payment_method',
    REQUIRES_CONFIRMATION: 'requires_confirmation',
    REQUIRES_ACTION: 'requires_action',
    PROCESSING: 'processing',
    REQUIRES_CAPTURE: 'requires_capture',
    CANCELLED: 'cancelled',
    SUCCEEDED: 'succeeded',
  } as const,

  // Stripe validation
  STRIPE_VALIDATION: {
    ALLOWED_CURRENCIES: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'BDT'],
    MAX_ATTEMPTS: 3,
    TIMEOUT_SECONDS: 300,
  } as const,
} as const;

export type StripeStatus = (typeof STRIPE.STRIPE_STATUS)[keyof typeof STRIPE.STRIPE_STATUS];
export type StripePaymentMethod =
  (typeof STRIPE.STRIPE_PAYMENT_METHOD)[keyof typeof STRIPE.STRIPE_PAYMENT_METHOD];
export type StripeIntentStatus =
  (typeof STRIPE.STRIPE_INTENT_STATUS)[keyof typeof STRIPE.STRIPE_INTENT_STATUS];

export const STRIPE_STATUS_LABELS: Record<StripeStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  partial_refund: 'Partial Refund',
  requires_action: 'Requires Action',
  requires_confirmation: 'Requires Confirmation',
  requires_payment_method: 'Requires Payment Method',
};

export const STRIPE_STATUS_COLORS: Record<StripeStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  refunded: '#6b7280',
  partial_refund: '#f59e0b',
  requires_action: '#f59e0b',
  requires_confirmation: '#eab308',
  requires_payment_method: '#eab308',
};
