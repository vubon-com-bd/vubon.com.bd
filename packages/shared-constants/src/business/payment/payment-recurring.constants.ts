/**
 * Payment Recurring Constants
 * পেমেন্ট রিকারিং সম্পর্কিত কনস্ট্যান্টস
 */

export const PAYMENT_RECURRING = {
  // Recurring status
  STATUS: {
    ACTIVE: 'active',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },

  // Recurring frequency
  FREQUENCY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    BI_ANNUAL: 'bi_annual',
    ANNUAL: 'annual',
  },

  // Default values
  DEFAULTS: {
    INTERVAL: 1,
    CURRENCY: 'BDT',
  },
} as const;

export type PaymentRecurringStatus =
  (typeof PAYMENT_RECURRING.STATUS)[keyof typeof PAYMENT_RECURRING.STATUS];
export type PaymentRecurringFrequency =
  (typeof PAYMENT_RECURRING.FREQUENCY)[keyof typeof PAYMENT_RECURRING.FREQUENCY];
