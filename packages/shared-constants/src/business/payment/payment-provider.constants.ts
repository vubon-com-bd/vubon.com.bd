/**
 * Payment Provider Constants
 * পেমেন্ট প্রোভাইডার সম্পর্কিত কনস্ট্যান্টস
 */

export const PAYMENT_PROVIDERS = {
  BKASH: 'bkash',
  NAGAD: 'nagad',
  ROCKET: 'rocket',
  DBBL: 'dbbl',
  CITY_BANK: 'city_bank',
  BRAC_BANK: 'brac_bank',
  EBL: 'ebl',
  MTB: 'mtb',
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  SSLCOMMERZ: 'sslcommerz',
} as const;

export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[keyof typeof PAYMENT_PROVIDERS];
