/**
 * Payment Split Constants
 * পেমেন্ট স্প্লিট সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const PAYMENT_SPLIT = {
  // Split status
  STATUS: {
    PENDING: STATUS.PENDING,
    PROCESSED: 'processed',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },

  // Default values
  DEFAULTS: {
    CURRENCY: 'BDT',
  },
} as const;

export type PaymentSplitStatus = (typeof PAYMENT_SPLIT.STATUS)[keyof typeof PAYMENT_SPLIT.STATUS];
