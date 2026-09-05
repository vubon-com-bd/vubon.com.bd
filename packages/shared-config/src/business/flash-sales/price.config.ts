/**
 * Price Config
 * মূল্য কনফিগারেশন
 */

import { FLASH_SALE_PRICE } from '@vubon/shared-constants';

export interface PriceConfig {
  enabled: boolean;
  minPrice: number;
  maxPrice: number;
  types: Record<string, string>;
  calculationTypes: Record<string, string>;
  status: Record<string, string>;
  defaults: {
    minPrice: number;
    maxPrice: number;
    decimalPlaces: number;
    minDiscount: number;
    maxDiscount: number;
  };
}

export const priceConfig: PriceConfig = {
  enabled: true,
  minPrice: 1,
  maxPrice: 1000000,

  types: {
    regular: FLASH_SALE_PRICE.TYPES.REGULAR,
    flash: FLASH_SALE_PRICE.TYPES.FLASH,
    deal: FLASH_SALE_PRICE.TYPES.DEAL,
    bundle: FLASH_SALE_PRICE.TYPES.BUNDLE,
    dynamic: FLASH_SALE_PRICE.TYPES.DYNAMIC,
  },

  calculationTypes: {
    base: FLASH_SALE_PRICE.CALCULATION.BASE,
    discounted: FLASH_SALE_PRICE.CALCULATION.DISCOUNTED,
    final: FLASH_SALE_PRICE.CALCULATION.FINAL,
    tax_inclusive: FLASH_SALE_PRICE.CALCULATION.TAX_INCLUSIVE,
    tax_exclusive: FLASH_SALE_PRICE.CALCULATION.TAX_EXCLUSIVE,
  },

  status: {
    active: FLASH_SALE_PRICE.STATUS.ACTIVE,
    inactive: FLASH_SALE_PRICE.STATUS.INACTIVE,
    expired: FLASH_SALE_PRICE.STATUS.EXPIRED,
    pending: FLASH_SALE_PRICE.STATUS.PENDING,
  },

  defaults: {
    minPrice: 0,
    maxPrice: 99999999,
    decimalPlaces: 2,
    minDiscount: 1,
    maxDiscount: 90,
  },
} as const;

export type PriceConfigType = typeof priceConfig;
