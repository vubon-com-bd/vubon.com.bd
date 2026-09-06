/**
 * Product Pricing Constants (EXTENDS common/types + common/currency + common/tax)
 * @module shared-constants/business/product/pricing.constants
 */

import { TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { TAX } from '../../common/tax.constants';
import { DISCOUNT } from '../../common/discount.constants';
import { STATUS } from '../../common/status.constants';

export const PRODUCT_PRICING = {
  // Base types from common
  ...TYPES,

  // Currency from common
  CURRENCY: CURRENCY,

  // Tax from common
  TAX: TAX,

  // Discount from common
  DISCOUNT: DISCOUNT,

  // Status from common
  STATUS: STATUS,

  // Pricing specific
  DEFAULT_CURRENCY: 'BDT',
  MAX_DISCOUNT_PERCENTAGE: 90,
  MIN_DISCOUNT_PERCENTAGE: 0,
  MAX_PRICE: 99999999.99,
  MIN_PRICE: 0,
  PRICE_PRECISION: 2,
  PRICING_CACHE_TTL: 3600,

  // Pricing type
  PRODUCT_PRICING_TYPE: {
    FIXED: 'fixed',
    TIERED: 'tiered',
    DYNAMIC: 'dynamic',
    BUNDLE: 'bundle',
    PROMOTIONAL: 'promotional',
    SEASONAL: 'seasonal',
    CLEARANCE: 'clearance',
    PREMIUM: 'premium',
    ECONOMY: 'economy',
    CUSTOM: 'custom',
  } as const,

  // Discount type
  PRODUCT_DISCOUNT_TYPE: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    BUY_X_GET_Y: 'buy_x_get_y',
    BUNDLE: 'bundle',
    VOLUME: 'volume',
    SEASONAL: 'seasonal',
    COUPON: 'coupon',
    VOUCHER: 'voucher',
    FLASH_SALE: 'flash_sale',
  } as const,

  // Price calculation
  PRODUCT_PRICE_CALCULATION: {
    EXCLUDING_TAX: 'excluding_tax',
    INCLUDING_TAX: 'including_tax',
    EXCLUDING_SHIPPING: 'excluding_shipping',
    INCLUDING_SHIPPING: 'including_shipping',
    EXCLUDING_DISCOUNT: 'excluding_discount',
    INCLUDING_DISCOUNT: 'including_discount',
    FINAL: 'final',
  } as const,

  // Pricing status
  PRODUCT_PRICING_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    SCHEDULED: 'scheduled',
  } as const,

  // Price tier
  PRODUCT_PRICE_TIER: {
    RETAIL: 'retail',
    WHOLESALE: 'wholesale',
    BULK: 'bulk',
    MEMBER: 'member',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    STUDENT: 'student',
    NON_PROFIT: 'non_profit',
  } as const,

  // Price validation
  PRODUCT_PRICE_VALIDATION: {
    REQUIRES_PRICE: true,
    REQUIRES_CURRENCY: true,
    REQUIRES_TAX: false,
    MIN_AMOUNT: 0,
    MAX_AMOUNT: 99999999.99,
  } as const,
} as const;

export type ProductPricingType =
  (typeof PRODUCT_PRICING.PRODUCT_PRICING_TYPE)[keyof typeof PRODUCT_PRICING.PRODUCT_PRICING_TYPE];
export type ProductDiscountType =
  (typeof PRODUCT_PRICING.PRODUCT_DISCOUNT_TYPE)[keyof typeof PRODUCT_PRICING.PRODUCT_DISCOUNT_TYPE];
export type ProductPriceCalculation =
  (typeof PRODUCT_PRICING.PRODUCT_PRICE_CALCULATION)[keyof typeof PRODUCT_PRICING.PRODUCT_PRICE_CALCULATION];
export type ProductPricingStatus =
  (typeof PRODUCT_PRICING.PRODUCT_PRICING_STATUS)[keyof typeof PRODUCT_PRICING.PRODUCT_PRICING_STATUS];
export type ProductPriceTier =
  (typeof PRODUCT_PRICING.PRODUCT_PRICE_TIER)[keyof typeof PRODUCT_PRICING.PRODUCT_PRICE_TIER];
