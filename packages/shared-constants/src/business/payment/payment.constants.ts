/**
 * Payment Constants - Base
 * পেমেন্ট সম্পর্কিত মূল কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const PAYMENT = {
  // Payment status
  STATUS: {
    PENDING: STATUS.PENDING,
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_REFUNDED: 'partial_refunded',
    AUTHORIZED: 'authorized',
    CAPTURED: 'captured',
    VOIDED: 'voided',
    EXPIRED: 'expired',
    DISPUTED: 'disputed',
    CHARGEBACK: 'chargeback',
  },

  // Payment types
  TYPES: {
    ONE_TIME: 'one_time',
    RECURRING: 'recurring',
    SUBSCRIPTION: 'subscription',
    INSTALLMENT: 'installment',
  },

  // Payment channels
  CHANNELS: {
    ONLINE: 'online',
    POS: 'pos',
    MOBILE: 'mobile',
    WALLET: 'wallet',
    BANK: 'bank',
  },

  // Default values
  DEFAULTS: {
    TIMEOUT: 300,
    MAX_AMOUNT: 99999999,
    MIN_AMOUNT: 0,
    MAX_RETRIES: 3,
    RETRY_DELAY: 60,
  },
} as const;

export type PaymentStatusValue = (typeof PAYMENT.STATUS)[keyof typeof PAYMENT.STATUS];
export type PaymentType = (typeof PAYMENT.TYPES)[keyof typeof PAYMENT.TYPES];
export type PaymentChannel = (typeof PAYMENT.CHANNELS)[keyof typeof PAYMENT.CHANNELS];
