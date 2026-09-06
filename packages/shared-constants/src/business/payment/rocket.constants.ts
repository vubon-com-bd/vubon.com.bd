/**
 * Rocket Constants (EXTENDS common/types)
 * @module shared-constants/business/payment/rocket.constants
 */

import { TYPES } from '../../common/types.constants';

export const ROCKET = {
  // Base types from common
  ...TYPES,

  // Rocket specific
  DEFAULT_CURRENCY: 'BDT',
  ROCKET_CACHE_TTL: 3600,
  MAX_TRANSACTION_AMOUNT: 999999.99,
  MIN_TRANSACTION_AMOUNT: 1,

  // Rocket status
  ROCKET_STATUS: {
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

  // Rocket transaction type
  ROCKET_TRANSACTION_TYPE: {
    SEND_MONEY: 'send_money',
    RECEIVE_MONEY: 'receive_money',
    PAYMENT: 'payment',
    REFUND: 'refund',
    CASH_OUT: 'cash_out',
    CASH_IN: 'cash_in',
    AGENT_PAYMENT: 'agent_payment',
    MERCHANT_PAYMENT: 'merchant_payment',
  } as const,

  // Rocket account type
  ROCKET_ACCOUNT_TYPE: {
    PERSONAL: 'personal',
    MERCHANT: 'merchant',
    AGENT: 'agent',
    CORPORATE: 'corporate',
  } as const,

  // Rocket validation
  ROCKET_VALIDATION: {
    ACCOUNT_FORMAT: /^\d{10,15}$/,
    PIN_LENGTH: 4,
    OTP_LENGTH: 6,
    MAX_ATTEMPTS: 3,
    TIMEOUT_SECONDS: 300,
  } as const,

  // Rocket API endpoints
  ROCKET_ENDPOINTS: {
    TOKEN: '/token/grant',
    PAYMENT: '/payment/create',
    REFUND: '/payment/refund',
    QUERY: '/payment/query',
    TRANSACTION: '/transaction/status',
  } as const,
} as const;

export type RocketStatus = (typeof ROCKET.ROCKET_STATUS)[keyof typeof ROCKET.ROCKET_STATUS];
export type RocketTransactionType =
  (typeof ROCKET.ROCKET_TRANSACTION_TYPE)[keyof typeof ROCKET.ROCKET_TRANSACTION_TYPE];
export type RocketAccountType =
  (typeof ROCKET.ROCKET_ACCOUNT_TYPE)[keyof typeof ROCKET.ROCKET_ACCOUNT_TYPE];

export const ROCKET_STATUS_LABELS: Record<RocketStatus, string> = {
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

export const ROCKET_STATUS_COLORS: Record<RocketStatus, string> = {
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
