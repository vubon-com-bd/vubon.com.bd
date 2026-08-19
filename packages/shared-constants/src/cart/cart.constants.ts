/**
 * কার্ট কনফিগারেশন কনস্ট্যান্ট
 * কার্টের মৌলিক কনফিগারেশন এবং সীমাবদ্ধতা সংক্রান্ত কনস্ট্যান্ট
 */

/**
 * কার্টের অবস্থা
 */
export const CART_STATUS = {
  ACTIVE: 'active',
  CHECKED_OUT: 'checked_out',
  ABANDONED: 'abandoned',
  EXPIRED: 'expired',
} as const;

export type CartStatus = (typeof CART_STATUS)[keyof typeof CART_STATUS];

/**
 * কার্টের মেয়াদ (দিনে)
 */
export const CART_EXPIRY_DAYS = 30;

/**
 * সর্বোচ্চ আইটেম সংখ্যা
 */
export const MAX_CART_ITEMS = 50;

/**
 * ন্যূনতম অর্ডার পরিমাণ (BDT)
 */
export const MIN_CART_AMOUNT = 100;

/**
 * সর্বোচ্চ অর্ডার পরিমাণ (BDT)
 */
export const MAX_CART_AMOUNT = 500000;

/**
 * কার্ট লক করার সময়সীমা (মিনিট)
 */
export const CART_LOCK_TIMEOUT = 15;

/**
 * ডিফল্ট কারেন্সি
 */
export const DEFAULT_CURRENCY = 'BDT';

/**
 * সাপোর্টেড কারেন্সি লিস্ট
 */
export const ALLOWED_CURRENCIES = ['BDT', 'USD', 'EUR', 'GBP'] as const;

export type CartAllowedCurrency = (typeof ALLOWED_CURRENCIES)[number];
