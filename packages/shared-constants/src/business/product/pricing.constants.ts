/**
 * Pricing Constants
 * প্রাইসিং সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const PRICING = {
  // Pricing types (TYPES থেকে ম্যাপিং)
  TYPES: {
    FIXED: TYPES.FIXED || 'fixed',
    VARIABLE: TYPES.VARIABLE || 'variable',
    TIERED: 'tiered',
    DYNAMIC: 'dynamic',
    RENTAL: 'rental',
    SUBSCRIPTION: 'subscription',
    BUNDLE: 'bundle',
    DISCOUNTED: 'discounted',
    WHOLESALE: 'wholesale',
    RETAIL: 'retail',
  },

  // Discount types
  DISCOUNT_TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    BUY_X_GET_Y: 'buy_x_get_y',
    BUNDLE: 'bundle',
    COUPON: 'coupon',
    SEASONAL: 'seasonal',
  },

  // Price calculation
  CALCULATION: {
    BASE: 'base',
    TAX_INCLUSIVE: 'tax_inclusive',
    TAX_EXCLUSIVE: 'tax_exclusive',
    WITH_DISCOUNT: 'with_discount',
    FINAL: 'final',
  },

  // Currency defaults
  CURRENCY: {
    DEFAULT: 'BDT',
    SUPPORTED: ['BDT', 'USD', 'EUR', 'GBP', 'INR'],
  },

  // Default values
  DEFAULTS: {
    MIN_PRICE: 0,
    MAX_PRICE: 99999999,
    DECIMAL_PLACES: 2,
    TAX_RATE: 15,
    DISCOUNT_MAX: 90,
  },
} as const;

export type PricingType = (typeof PRICING.TYPES)[keyof typeof PRICING.TYPES];
export type DiscountType = (typeof PRICING.DISCOUNT_TYPES)[keyof typeof PRICING.DISCOUNT_TYPES];
export type PriceCalculation = (typeof PRICING.CALCULATION)[keyof typeof PRICING.CALCULATION];

export const PRICING_TYPES = PRICING.TYPES;
export const DISCOUNT_TYPES = PRICING.DISCOUNT_TYPES;
export const PRICING_CALCULATION = PRICING.CALCULATION;
