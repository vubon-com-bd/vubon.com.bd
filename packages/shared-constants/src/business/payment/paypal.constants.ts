/**
 * PayPal Constants
 * PayPal সম্পর্কিত কনস্ট্যান্টস
 */

export const PAYPAL = {
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  API_VERSION: '2.0',
  DEFAULTS: {
    TIMEOUT: 30,
    RETRY_ATTEMPTS: 3,
  },
} as const;

export type PayPalStatus = (typeof PAYPAL.STATUS)[keyof typeof PAYPAL.STATUS];
