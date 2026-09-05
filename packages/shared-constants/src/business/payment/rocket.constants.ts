/**
 * Rocket Constants
 * Rocket সম্পর্কিত কনস্ট্যান্টস
 */

export const ROCKET = {
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

export type RocketStatus = (typeof ROCKET.STATUS)[keyof typeof ROCKET.STATUS];
