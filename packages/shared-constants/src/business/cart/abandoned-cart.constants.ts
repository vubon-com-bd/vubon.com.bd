/**
 * Abandoned Cart Constants
 * পরিত্যক্ত কার্ট সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const ABANDONED_CART = {
  // Abandoned cart status
  STATUS: {
    PENDING: STATUS.PENDING,
    RECOVERED: 'recovered',
    LOST: 'lost',
    EXPIRED: 'expired',
    IGNORED: 'ignored',
    CONVERTED: 'converted',
  },

  // Recovery status
  RECOVERY_STATUS: {
    NOT_ATTEMPTED: 'not_attempted',
    EMAIL_SENT: 'email_sent',
    SMS_SENT: 'sms_sent',
    PUSH_SENT: 'push_sent',
    REMINDER_SENT: 'reminder_sent',
    RECOVERED: 'recovered',
    FAILED: 'failed',
  },

  // Abandoned reasons
  REASONS: {
    CHECKOUT: 'checkout',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    PRICE: 'price',
    LOGIN: 'login',
    TECHNICAL: 'technical',
    UNKNOWN: 'unknown',
  },

  // Default values
  DEFAULTS: {
    ABANDONED_AFTER: 3600, // 1 hour
    RECOVERY_EMAIL_DELAY: 3600, // 1 hour
    RECOVERY_SMS_DELAY: 7200, // 2 hours
    MAX_RECOVERY_ATTEMPTS: 3,
    RECOVERY_WINDOW: 259200, // 3 days
  },
} as const;

export type AbandonedCartStatus =
  (typeof ABANDONED_CART.STATUS)[keyof typeof ABANDONED_CART.STATUS];
export type RecoveryStatus =
  (typeof ABANDONED_CART.RECOVERY_STATUS)[keyof typeof ABANDONED_CART.RECOVERY_STATUS];
export type AbandonedReason = (typeof ABANDONED_CART.REASONS)[keyof typeof ABANDONED_CART.REASONS];
