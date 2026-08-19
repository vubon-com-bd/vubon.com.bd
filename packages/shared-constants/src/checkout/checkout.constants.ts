// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export const CHECKOUT_CONFIG = {
  SESSION_TIMEOUT: 30, // Minutes
  MAX_ATTEMPTS: 3,
  EXPIRY_TIME: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  DEFAULT_CURRENCY: 'BDT',
  MIN_ORDER_AMOUNT: 100,
  MAX_ORDER_AMOUNT: 100000,
  ALLOWED_CURRENCIES: ['BDT', 'USD'] as const,
} as const;

export type CheckoutConfig = typeof CHECKOUT_CONFIG;
export type AllowedCurrency = (typeof CHECKOUT_CONFIG.ALLOWED_CURRENCIES)[number];

export const CURRENCY_SYMBOLS = {
  BDT: '৳',
  USD: '$',
} as const;

export type CurrencySymbol = (typeof CURRENCY_SYMBOLS)[keyof typeof CURRENCY_SYMBOLS];
