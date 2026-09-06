/**
 * Payment Main Constants
 * @module shared-constants/business/payment/payment.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { CURRENCY } from '../../common/currency.constants';
import { SECURITY } from '../../common/security.constants';

export const PAYMENT = {
  // Payment status from common
  STATUS: STATUS,

  // Payment types from common
  TYPES: TYPES,

  // Payment verification from common
  VERIFICATION: VERIFICATION,

  // Payment currency from common
  CURRENCY: CURRENCY,

  // Payment security from common
  SECURITY: SECURITY,

  // Payment specific
  DEFAULT_PAYMENT_STATUS: 'pending',
  PAYMENT_CACHE_TTL: 3600,
  MAX_PAYMENT_AMOUNT: 99999999.99,
  MIN_PAYMENT_AMOUNT: 0,
  PAYMENT_TIMEOUT_MINUTES: 15,
  MAX_PAYMENT_ATTEMPTS: 3,
  PAYMENT_SESSION_TIMEOUT: 600,

  // Payment type
  PAYMENT_TYPE: {
    ONE_TIME: 'one_time',
    RECURRING: 'recurring',
    SUBSCRIPTION: 'subscription',
    INSTALLMENT: 'installment',
    SPLIT: 'split',
    REFUND: 'refund',
    PARTIAL: 'partial',
    FULL: 'full',
    ADVANCE: 'advance',
    DEPOSIT: 'deposit',
  } as const,

  // Payment source
  PAYMENT_SOURCE: {
    WEB: 'web',
    MOBILE: 'mobile',
    ADMIN: 'admin',
    API: 'api',
    POS: 'pos',
    AUTOMATED: 'automated',
    SCHEDULED: 'scheduled',
    RECURRING: 'recurring',
  } as const,

  // Payment status values
  PAYMENT_STATUS_VALUES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_REFUND: 'partial_refund',
    AUTHORIZED: 'authorized',
    CAPTURED: 'captured',
    DECLINED: 'declined',
    EXPIRED: 'expired',
    ON_HOLD: 'on_hold',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    REVERSED: 'reversed',
    CHARGEBACK: 'chargeback',
    DISPUTE: 'dispute',
  } as const,

  // Payment gateway
  PAYMENT_GATEWAY: {
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    SSLCOMMERZ: 'sslcommerz',
    AAMARPAY: 'aamarpay',
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
    BANK_TRANSFER: 'bank_transfer',
    CASH_ON_DELIVERY: 'cash_on_delivery',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    CRYPTO: 'crypto',
    STORE_CREDIT: 'store_credit',
    GOOGLE_PAY: 'google_pay',
    APPLE_PAY: 'apple_pay',
  } as const,
} as const;

export type PaymentType = (typeof PAYMENT.PAYMENT_TYPE)[keyof typeof PAYMENT.PAYMENT_TYPE];
export type PaymentSource = (typeof PAYMENT.PAYMENT_SOURCE)[keyof typeof PAYMENT.PAYMENT_SOURCE];
export type PaymentMainStatus =
  (typeof PAYMENT.PAYMENT_STATUS_VALUES)[keyof typeof PAYMENT.PAYMENT_STATUS_VALUES];
export type PaymentGateway = (typeof PAYMENT.PAYMENT_GATEWAY)[keyof typeof PAYMENT.PAYMENT_GATEWAY];
