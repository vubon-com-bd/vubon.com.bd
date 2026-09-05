/**
 * SSLCommerz Constants
 * SSLCommerz সম্পর্কিত কনস্ট্যান্টস
 */

export const SSLCOMMERZ = {
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  API_VERSION: '1.0.0',
  DEFAULTS: {
    TIMEOUT: 30,
    RETRY_ATTEMPTS: 3,
  },
} as const;

export type SSLCommerzStatus = (typeof SSLCOMMERZ.STATUS)[keyof typeof SSLCOMMERZ.STATUS];
