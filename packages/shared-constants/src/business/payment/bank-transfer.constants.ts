/**
 * Bank Transfer Constants
 * ব্যাংক ট্রান্সফার সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const BANK_TRANSFER = {
  STATUS: {
    PENDING: STATUS.PENDING,
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  TYPES: {
    LOCAL: 'local',
    INTERNATIONAL: 'international',
    WIRE: 'wire',
    ACH: 'ach',
  },
  METHODS: {
    ONLINE: 'online',
    OFFLINE: 'offline',
    MOBILE: 'mobile',
  },
  DEFAULTS: {
    PROCESSING_TIME: 24,
    MAX_AMOUNT: 9999999,
    MIN_AMOUNT: 1,
  },
} as const;

export type BankTransferStatus = (typeof BANK_TRANSFER.STATUS)[keyof typeof BANK_TRANSFER.STATUS];
export type BankTransferType = (typeof BANK_TRANSFER.TYPES)[keyof typeof BANK_TRANSFER.TYPES];
export type BankTransferMethod = (typeof BANK_TRANSFER.METHODS)[keyof typeof BANK_TRANSFER.METHODS];
