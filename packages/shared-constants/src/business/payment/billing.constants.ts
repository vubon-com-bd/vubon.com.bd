/**
 * Billing Constants
 * বিলিং সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const BILLING = {
  STATUS: {
    PENDING: STATUS.PENDING,
    PAID: 'paid',
    OVERDUE: 'overdue',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
  },
  CYCLES: {
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    BI_ANNUAL: 'bi_annual',
    ANNUAL: 'annual',
  },
  DEFAULTS: {
    DUE_DAYS: 15,
    TAX_RATE: 15,
  },
} as const;

export type BillingStatus = (typeof BILLING.STATUS)[keyof typeof BILLING.STATUS];
export type BillingCycle = (typeof BILLING.CYCLES)[keyof typeof BILLING.CYCLES];
