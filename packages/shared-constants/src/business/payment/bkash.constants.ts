/**
 * bKash Constants
 * bKash সম্পর্কিত কনস্ট্যান্টস
 */

export const BKASH = {
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  API_VERSION: '1.2.0',
  DEFAULTS: {
    TIMEOUT: 30,
    RETRY_ATTEMPTS: 3,
  },
} as const;

export type BkashStatus = (typeof BKASH.STATUS)[keyof typeof BKASH.STATUS];
