/**
 * Abandoned Cart Constants (EXTENDS common/status)
 * @module shared-constants/business/cart/abandoned-cart.constants
 */

import { STATUS } from '../../common/status.constants';

export const ABANDONED_CART = {
  // Base status from common
  STATUS: STATUS,

  // Abandoned cart specific
  ABANDONED_THRESHOLD_MINUTES: 30,
  ABANDONED_EXPIRY_DAYS: 30,
  REMINDER_INTERVAL_HOURS: 24,
  MAX_REMINDERS: 3,
  ABANDONED_CACHE_TTL: 3600,

  // Abandoned cart status
  ABANDONED_CART_STATUS: {
    ABANDONED: 'abandoned',
    RECOVERED: 'recovered',
    CONVERTED: 'converted',
    EXPIRED: 'expired',
    REMOVED: 'removed',
    IN_PROGRESS: 'in_progress',
  } as const,

  // Abandoned cart reason
  ABANDONED_CART_REASON: {
    CHECKOUT_LEFT: 'checkout_left',
    PAYMENT_FAILED: 'payment_failed',
    SHIPPING_COST: 'shipping_cost',
    SIGN_IN_REQUIRED: 'sign_in_required',
    COMPLEX_CHECKOUT: 'complex_checkout',
    DISCOUNT_LIMIT: 'discount_limit',
    SESSION_TIMEOUT: 'session_timeout',
    BROWSER_CLOSED: 'browser_closed',
    DEVICE_CHANGE: 'device_change',
    PRICE_CHANGE: 'price_change',
    STOCK_CHANGE: 'stock_change',
    CUSTOM: 'custom',
  } as const,

  // Abandoned cart reminder
  ABANDONED_CART_REMINDER: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WHATSAPP: 'whatsapp',
  } as const,

  // Abandoned cart recovery
  ABANDONED_CART_RECOVERY: {
    EMAIL_SENT: 'email_sent',
    SMS_SENT: 'sms_sent',
    PUSH_SENT: 'push_sent',
    DISCOUNT_APPLIED: 'discount_applied',
    CART_RESTORED: 'cart_restored',
    ORDER_PLACED: 'order_placed',
  } as const,

  // Abandoned cart analytics
  ABANDONED_CART_ANALYTICS: {
    TRACK_ABANDONMENT: true,
    TRACK_RECOVERY: true,
    TRACK_CONVERSION: true,
    TRACK_REASON: true,
    RETENTION_DAYS: 90,
    MAX_HISTORY: 1000,
  } as const,
} as const;

export type AbandonedCartStatus =
  (typeof ABANDONED_CART.ABANDONED_CART_STATUS)[keyof typeof ABANDONED_CART.ABANDONED_CART_STATUS];
export type AbandonedCartReason =
  (typeof ABANDONED_CART.ABANDONED_CART_REASON)[keyof typeof ABANDONED_CART.ABANDONED_CART_REASON];
export type AbandonedCartReminder =
  (typeof ABANDONED_CART.ABANDONED_CART_REMINDER)[keyof typeof ABANDONED_CART.ABANDONED_CART_REMINDER];

export const ABANDONED_CART_STATUS_LABELS: Record<AbandonedCartStatus, string> = {
  [ABANDONED_CART.ABANDONED_CART_STATUS.ABANDONED]: 'Abandoned',
  [ABANDONED_CART.ABANDONED_CART_STATUS.RECOVERED]: 'Recovered',
  [ABANDONED_CART.ABANDONED_CART_STATUS.CONVERTED]: 'Converted',
  [ABANDONED_CART.ABANDONED_CART_STATUS.EXPIRED]: 'Expired',
  [ABANDONED_CART.ABANDONED_CART_STATUS.REMOVED]: 'Removed',
  [ABANDONED_CART.ABANDONED_CART_STATUS.IN_PROGRESS]: 'In Progress',
};

export const ABANDONED_CART_STATUS_COLORS: Record<AbandonedCartStatus, string> = {
  [ABANDONED_CART.ABANDONED_CART_STATUS.ABANDONED]: '#ef4444',
  [ABANDONED_CART.ABANDONED_CART_STATUS.RECOVERED]: '#22c55e',
  [ABANDONED_CART.ABANDONED_CART_STATUS.CONVERTED]: '#22c55e',
  [ABANDONED_CART.ABANDONED_CART_STATUS.EXPIRED]: '#9ca3af',
  [ABANDONED_CART.ABANDONED_CART_STATUS.REMOVED]: '#ef4444',
  [ABANDONED_CART.ABANDONED_CART_STATUS.IN_PROGRESS]: '#eab308',
};
