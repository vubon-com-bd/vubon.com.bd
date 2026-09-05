/**
 * Card Payment Constants
 * কার্ড পেমেন্ট সম্পর্কিত কনস্ট্যান্টস
 */

export const CARD_PAYMENT = {
  // Card brands
  BRANDS: {
    VISA: 'visa',
    MASTERCARD: 'mastercard',
    AMEX: 'amex',
    DISCOVER: 'discover',
    DINERS: 'diners',
    JCB: 'jcb',
    RUPAY: 'rupay',
    OTHER: 'other',
  },

  // Card types
  TYPES: {
    CREDIT: 'credit',
    DEBIT: 'debit',
    PREPAID: 'prepaid',
  },

  // Card status
  STATUS: {
    PENDING: 'pending',
    AUTHORIZED: 'authorized',
    CAPTURED: 'captured',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    EXPIRED: 'expired',
  },

  // Validation
  VALIDATION: {
    MIN_CVV_LENGTH: 3,
    MAX_CVV_LENGTH: 4,
    MIN_CARD_LENGTH: 13,
    MAX_CARD_LENGTH: 19,
    MIN_EXPIRY_YEAR: 2024,
    MAX_EXPIRY_YEAR: 2035,
  },

  // Default values
  DEFAULTS: {
    CVV_REQUIRED: true,
    SAVE_CARD: true,
    REQUIRE_BILLING_ADDRESS: true,
    REQUIRE_CARD_HOLDER_NAME: true,
    MIN_AMOUNT: 1,
    MAX_AMOUNT: 999999,
  },
} as const;

export type CardBrand = (typeof CARD_PAYMENT.BRANDS)[keyof typeof CARD_PAYMENT.BRANDS];
export type CardType = (typeof CARD_PAYMENT.TYPES)[keyof typeof CARD_PAYMENT.TYPES];
export type CardStatus = (typeof CARD_PAYMENT.STATUS)[keyof typeof CARD_PAYMENT.STATUS];
