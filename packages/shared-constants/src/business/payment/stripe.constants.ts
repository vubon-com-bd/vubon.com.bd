/**
 * Stripe Constants
 * Stripe সম্পর্কিত কনস্ট্যান্টস
 */

export const STRIPE = {
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  API_VERSION: '2023-10-16',
  DEFAULTS: {
    TIMEOUT: 30,
    RETRY_ATTEMPTS: 3,
  },
} as const;

export type StripeStatus = (typeof STRIPE.STATUS)[keyof typeof STRIPE.STATUS];
