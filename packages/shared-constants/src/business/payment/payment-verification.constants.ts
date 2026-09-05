/**
 * Payment Verification Constants
 * পেমেন্ট যাচাই সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const PAYMENT_VERIFICATION = {
  // Verification status
  STATUS: {
    PENDING: STATUS.PENDING,
    VERIFIED: 'verified',
    FAILED: 'failed',
    EXPIRED: 'expired',
  },

  // Verification methods
  METHODS: {
    OTP: 'otp',
    CALLBACK: 'callback',
    WEBHOOK: 'webhook',
    MANUAL: 'manual',
  },

  // Default values
  DEFAULTS: {
    MAX_ATTEMPTS: 3,
  },
} as const;

export type PaymentVerificationStatus =
  (typeof PAYMENT_VERIFICATION.STATUS)[keyof typeof PAYMENT_VERIFICATION.STATUS];
export type PaymentVerificationMethod =
  (typeof PAYMENT_VERIFICATION.METHODS)[keyof typeof PAYMENT_VERIFICATION.METHODS];
