/**
 * Payment Settings Constants
 * পেমেন্ট সেটিংস সম্পর্কিত কনস্ট্যান্টস
 */

export const PAYMENT_SETTINGS = {
  DEFAULT_METHOD: 'bkash',
  DEFAULT_CURRENCY: 'BDT',
  SUPPORTED_CURRENCIES: ['BDT', 'USD', 'EUR', 'GBP', 'INR'],
  TAX_RATE: 15,
  FEE_PERCENTAGE: 2.5,
  FEE_FIXED: 0,
  MAX_RETRIES: 3,
  RETRY_DELAY: 60,
  TIMEOUT: 30,
} as const;

export type PaymentSettingsDefaults = typeof PAYMENT_SETTINGS;
