/**
 * Transaction Constants
 * ট্রানজেকশন সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const TRANSACTION = {
  // Transaction status
  STATUS: {
    PENDING: STATUS.PENDING,
    PROCESSING: 'processing',
    SUCCESS: 'success',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    PARTIAL_REFUNDED: 'partial_refunded',
    AUTHORIZED: 'authorized',
    CAPTURED: 'captured',
    VOIDED: 'voided',
    DISPUTED: 'disputed',
    CHARGEBACK: 'chargeback',
    EXPIRED: 'expired',
  },

  // Transaction types
  TYPES: {
    PAYMENT: 'payment',
    REFUND: 'refund',
    CAPTURE: 'capture',
    AUTHORIZE: 'authorize',
    VOID: 'void',
  },

  // Transaction channels
  CHANNELS: {
    ONLINE: 'online',
    POS: 'pos',
    MOBILE: 'mobile',
    WALLET: 'wallet',
    BANK: 'bank',
  },

  // Default values
  DEFAULTS: {
    TIMEOUT: 300, // 5 minutes
    MAX_AMOUNT: 99999999,
    MIN_AMOUNT: 0,
  },
} as const;

export type TransactionStatus = (typeof TRANSACTION.STATUS)[keyof typeof TRANSACTION.STATUS];
export type TransactionType = (typeof TRANSACTION.TYPES)[keyof typeof TRANSACTION.TYPES];
export type TransactionChannel = (typeof TRANSACTION.CHANNELS)[keyof typeof TRANSACTION.CHANNELS];

export const TRANSACTION_STATUS = TRANSACTION.STATUS;
export const TRANSACTION_TYPES = TRANSACTION.TYPES;
export const TRANSACTION_CHANNELS = TRANSACTION.CHANNELS;
