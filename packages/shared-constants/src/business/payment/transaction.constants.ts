/**
 * Transaction Constants (EXTENDS common/status + common/types)
 * @module shared-constants/business/payment/transaction.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { CURRENCY } from '../../common/currency.constants';

export const TRANSACTION = {
  // Base status from common
  STATUS: STATUS,

  // Types from common
  TYPES: TYPES,

  // Verification from common
  VERIFICATION: VERIFICATION,

  // Currency from common
  CURRENCY: CURRENCY,

  // Transaction specific
  MAX_TRANSACTION_AMOUNT: 99999999.99,
  MIN_TRANSACTION_AMOUNT: 0,
  TRANSACTION_CACHE_TTL: 3600,
  TRANSACTION_REFERENCE_LENGTH: 20,
  TRANSACTION_ID_PREFIX: 'TXN',

  // Transaction status
  TRANSACTION_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REVERSED: 'reversed',
    DECLINED: 'declined',
    EXPIRED: 'expired',
    AUTHORIZED: 'authorized',
    CAPTURED: 'captured',
    REFUNDED: 'refunded',
    PARTIAL_REFUND: 'partial_refund',
    CHARGEBACK: 'chargeback',
    DISPUTE: 'dispute',
    ON_HOLD: 'on_hold',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    REJECTED: 'rejected',
    APPROVED: 'approved',
  } as const,

  // Transaction type
  TRANSACTION_TYPE: {
    PAYMENT: 'payment',
    REFUND: 'refund',
    CAPTURE: 'capture',
    AUTHORIZATION: 'authorization',
    VOID: 'void',
    REVERSAL: 'reversal',
    CHARGEBACK: 'chargeback',
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
    TRANSFER: 'transfer',
    FEE: 'fee',
    TAX: 'tax',
    DISCOUNT: 'discount',
    BONUS: 'bonus',
    CASHBACK: 'cashback',
    COMMISSION: 'commission',
  } as const,

  // Transaction source
  TRANSACTION_SOURCE: {
    WEB: 'web',
    MOBILE: 'mobile',
    ADMIN: 'admin',
    API: 'api',
    POS: 'pos',
    AUTOMATED: 'automated',
    SCHEDULED: 'scheduled',
    RECURRING: 'recurring',
    MANUAL: 'manual',
    IMPORTED: 'imported',
  } as const,

  // Transaction method
  TRANSACTION_METHOD: {
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
    SAMSUNG_PAY: 'samsung_pay',
    WISE: 'wise',
    PAYONEER: 'payoneer',
  } as const,

  // Transaction category
  TRANSACTION_CATEGORY: {
    ONLINE: 'online',
    OFFLINE: 'offline',
    INTERNATIONAL: 'international',
    DOMESTIC: 'domestic',
    CROSS_BORDER: 'cross_border',
  } as const,

  // Transaction limits
  TRANSACTION_LIMITS: {
    MAX_DAILY: 500000,
    MAX_MONTHLY: 5000000,
    MAX_PER_HOUR: 50000,
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 99999999.99,
  } as const,
} as const;

export type TransactionStatus =
  (typeof TRANSACTION.TRANSACTION_STATUS)[keyof typeof TRANSACTION.TRANSACTION_STATUS];
export type TransactionType =
  (typeof TRANSACTION.TRANSACTION_TYPE)[keyof typeof TRANSACTION.TRANSACTION_TYPE];
export type TransactionSource =
  (typeof TRANSACTION.TRANSACTION_SOURCE)[keyof typeof TRANSACTION.TRANSACTION_SOURCE];
export type TransactionMethod =
  (typeof TRANSACTION.TRANSACTION_METHOD)[keyof typeof TRANSACTION.TRANSACTION_METHOD];
export type TransactionCategory =
  (typeof TRANSACTION.TRANSACTION_CATEGORY)[keyof typeof TRANSACTION.TRANSACTION_CATEGORY];

export const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  reversed: 'Reversed',
  declined: 'Declined',
  expired: 'Expired',
  authorized: 'Authorized',
  captured: 'Captured',
  refunded: 'Refunded',
  partial_refund: 'Partial Refund',
  chargeback: 'Chargeback',
  dispute: 'Dispute',
  on_hold: 'On Hold',
  verified: 'Verified',
  unverified: 'Unverified',
  rejected: 'Rejected',
  approved: 'Approved',
};

export const TRANSACTION_STATUS_COLORS: Record<TransactionStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  reversed: '#6b7280',
  declined: '#ef4444',
  expired: '#9ca3af',
  authorized: '#8b5cf6',
  captured: '#22c55e',
  refunded: '#6b7280',
  partial_refund: '#f59e0b',
  chargeback: '#dc2626',
  dispute: '#f59e0b',
  on_hold: '#f59e0b',
  verified: '#22c55e',
  unverified: '#f59e0b',
  rejected: '#ef4444',
  approved: '#22c55e',
};
