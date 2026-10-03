export const FLASH_SALE_PRICE_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
  FIXED_PRICE: 'fixed_price',
  TIERED: 'tiered',
  BOGO: 'bogo',
} as const;

export const FLASH_SALE_PRICE = {
  MIN_DISCOUNT_PERCENT: 1,
  MAX_DISCOUNT_PERCENT: 90,
  MIN_PRICE: 1,
  MAX_PRICE: 10000000,
  DECIMAL_PLACES: 2,
  SHOW_ORIGINAL_PRICE: true,
  SHOW_DISCOUNT_BADGE: true,
  PRICE_DROP_ALERT: true,
} as const;

export type FlashSalePriceTypeType =
  (typeof FLASH_SALE_PRICE_TYPE)[keyof typeof FLASH_SALE_PRICE_TYPE];
