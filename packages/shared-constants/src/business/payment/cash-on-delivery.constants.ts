/**
 * Cash On Delivery Constants
 * ক্যাশ অন ডেলিভারি সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const CASH_ON_DELIVERY = {
  STATUS: {
    PENDING: STATUS.PENDING,
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  TYPES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
  },
  DEFAULTS: {
    MAX_AMOUNT: 50000,
    MIN_AMOUNT: 0,
  },
} as const;

export type CashOnDeliveryStatus =
  (typeof CASH_ON_DELIVERY.STATUS)[keyof typeof CASH_ON_DELIVERY.STATUS];
export type CashOnDeliveryType =
  (typeof CASH_ON_DELIVERY.TYPES)[keyof typeof CASH_ON_DELIVERY.TYPES];
