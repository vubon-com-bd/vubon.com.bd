/**
 * পরিত্যক্ত কার্ট কনস্ট্যান্ট
 * পরিত্যক্ত কার্ট এবং রিকভারি সংক্রান্ত কনস্ট্যান্ট
 */

/**
 * কত ঘণ্টা পর পরিত্যক্ত ধরা হবে
 */
export const ABANDONED_AFTER_HOURS = 24;

/**
 * রিকভারি ইমেইল পাঠানোর সময় (ঘণ্টায়)
 */
export const RECOVERY_EMAIL_DELAY = {
  FIRST: 1,
  SECOND: 24,
  THIRD: 48,
  FOURTH: 72,
} as const;

export type RecoveryEmailDelay = typeof RECOVERY_EMAIL_DELAY;

/**
 * সর্বোচ্চ রিকভারি চেষ্টা
 */
export const MAX_RECOVERY_ATTEMPTS = 3;

/**
 * সফলতার হার (পার্সেন্টেজে)
 */
export const RECOVERY_SUCCESS_RATE = 35;

/**
 * পরিত্যক্ত কার্ট স্ট্যাটাস
 */
export const ABANDONED_CART_STATUS = {
  IDENTIFIED: 'identified',
  REMINDED: 'reminded',
  RECOVERED: 'recovered',
  LOST: 'lost',
} as const;

export type AbandonedCartStatus =
  (typeof ABANDONED_CART_STATUS)[keyof typeof ABANDONED_CART_STATUS];

/**
 * ইমেইল টেমপ্লেটের নাম
 */
export const RECOVERY_EMAIL_TEMPLATES = {
  REMINDER: 'cart_reminder',
  URGENT: 'cart_urgent',
  LAST_CHANCE: 'cart_last_chance',
  RECOVERED: 'cart_recovered',
} as const;

export type RecoveryEmailTemplate =
  (typeof RECOVERY_EMAIL_TEMPLATES)[keyof typeof RECOVERY_EMAIL_TEMPLATES];

/**
 * কত দিন পর ক্লিনআপ করবে
 */
export const CLEANUP_AFTER_DAYS = 90;
