export const ABANDONED_CART_STATUS = {
  PENDING: 'pending',
  REMINDED: 'reminded',
  RECOVERED: 'recovered',
  LOST: 'lost',
  UNSUBSCRIBED: 'unsubscribed',
} as const;

export const ABANDONED_CART = {
  THRESHOLD_HOURS: 24,
  FIRST_REMINDER_HOURS: 1,
  SECOND_REMINDER_HOURS: 24,
  THIRD_REMINDER_HOURS: 72,
  FINAL_REMINDER_HOURS: 168,
  MAX_REMINDERS: 4,
  DISCOUNT_PERCENTAGE: 10,
  EXPIRY_DAYS: 30,
  TRACK_EMAIL_OPENS: true,
  TRACK_LINK_CLICKS: true,
} as const;

export type AbandonedCartStatusType =
  (typeof ABANDONED_CART_STATUS)[keyof typeof ABANDONED_CART_STATUS];
