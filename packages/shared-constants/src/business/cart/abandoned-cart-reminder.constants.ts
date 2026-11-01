/**
 * Abandoned Cart Reminder Constants
 * @module shared-constants/business/cart
 */
export const ABANDONED_CART_REMINDER = {
  NONE: 'none',
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  MULTI: 'multi',
} as const;

export type AbandonedCartReminderType =
  (typeof ABANDONED_CART_REMINDER)[keyof typeof ABANDONED_CART_REMINDER];
