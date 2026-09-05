/**
 * Refund Constants
 * রিফান্ড সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const REFUND = {
  STATUS: {
    PENDING: STATUS.PENDING,
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PROCESSED: 'processed',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },
  TYPES: {
    FULL: 'full',
    PARTIAL: 'partial',
  },
  DEFAULTS: {
    PROCESSING_TIME: 72,
    MAX_AMOUNT: 9999999,
    MIN_AMOUNT: 0,
  },
} as const;

export type RefundStatus = (typeof REFUND.STATUS)[keyof typeof REFUND.STATUS];
export type RefundType = (typeof REFUND.TYPES)[keyof typeof REFUND.TYPES];
