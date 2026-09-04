/**
 * Vendor Payout Constants
 * ভেন্ডর পেআউট সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const PAYOUT = {
  // Payout status
  STATUS: {
    PENDING: STATUS.PENDING,
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    DELETED: STATUS.DELETED,
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ON_HOLD: 'on_hold',
  },

  // Payout types
  TYPES: {
    BANK_TRANSFER: 'bank_transfer',
    MOBILE_BANKING: 'mobile_banking',
    PAYMENT_GATEWAY: 'payment_gateway',
    CHECK: 'check',
    CASH: 'cash',
  },

  // Payout methods (Bangladesh)
  METHODS: {
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    BANK: 'bank',
    DBBL: 'dbbl',
    BRAC_BANK: 'brac_bank',
    CITY_BANK: 'city_bank',
  },

  // Default values
  DEFAULTS: {
    MIN_AMOUNT: 500,
    MAX_AMOUNT: 99999999,
    PROCESSING_DAYS: 3,
    CYCLE: 'weekly', // weekly, bi-weekly, monthly
    FEES: 0,
  },
} as const;

export type PayoutStatus = (typeof PAYOUT.STATUS)[keyof typeof PAYOUT.STATUS];
export type PayoutType = (typeof PAYOUT.TYPES)[keyof typeof PAYOUT.TYPES];
export type PayoutMethod = (typeof PAYOUT.METHODS)[keyof typeof PAYOUT.METHODS];
