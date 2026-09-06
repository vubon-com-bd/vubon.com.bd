/**
 * Flash Sale Price Constants (EXTENDS common/types)
 * @module shared-constants/business/flash-sales/flash-sale-price.constants
 */

import { TYPES } from '../../common/types.constants';

export const FLASH_SALE_PRICE = {
  // Base types from common
  ...TYPES,

  // Price specific
  PRICE_CACHE_TTL: 3600,
  MAX_PRICE_REDUCTION: 90,
  MIN_PRICE_REDUCTION: 0,

  // Price type
  FLASH_SALE_PRICE_TYPE: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    BOGO: 'bogo',
    BUNDLE: 'bundle',
    TIERED: 'tiered',
    DYNAMIC: 'dynamic',
  } as const,

  // Price status
  FLASH_SALE_PRICE_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    SCHEDULED: 'scheduled',
  } as const,

  // Price calculation
  FLASH_SALE_PRICE_CALCULATION: {
    ORIGINAL_PRICE: 'original_price',
    SALE_PRICE: 'sale_price',
    DISCOUNT_AMOUNT: 'discount_amount',
    DISCOUNT_PERCENTAGE: 'discount_percentage',
    FINAL_PRICE: 'final_price',
    SAVINGS: 'savings',
  } as const,

  // Price tier
  FLASH_SALE_PRICE_TIER: {
    EARLY_BIRD: 'early_bird',
    STANDARD: 'standard',
    LATE_BIRD: 'late_bird',
    VIP: 'vip',
    MEMBER: 'member',
  } as const,
} as const;

export type FlashSalePriceType =
  (typeof FLASH_SALE_PRICE.FLASH_SALE_PRICE_TYPE)[keyof typeof FLASH_SALE_PRICE.FLASH_SALE_PRICE_TYPE];
export type FlashSalePriceStatus =
  (typeof FLASH_SALE_PRICE.FLASH_SALE_PRICE_STATUS)[keyof typeof FLASH_SALE_PRICE.FLASH_SALE_PRICE_STATUS];
export type FlashSalePriceCalculation =
  (typeof FLASH_SALE_PRICE.FLASH_SALE_PRICE_CALCULATION)[keyof typeof FLASH_SALE_PRICE.FLASH_SALE_PRICE_CALCULATION];
export type FlashSalePriceTier =
  (typeof FLASH_SALE_PRICE.FLASH_SALE_PRICE_TIER)[keyof typeof FLASH_SALE_PRICE.FLASH_SALE_PRICE_TIER];
