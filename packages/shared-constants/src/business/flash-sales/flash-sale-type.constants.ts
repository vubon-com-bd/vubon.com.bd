export const FLASH_SALE_TYPE = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  SEASONAL: 'seasonal',
  FESTIVAL: 'festival',
  FLASH_HOUR: 'flash_hour',
  MIDNIGHT: 'midnight',
  WEEKEND: 'weekend',
  CLEARANCE: 'clearance',
  LIMITED_STOCK: 'limited_stock',
} as const;

export type FlashSaleTypeType = (typeof FLASH_SALE_TYPE)[keyof typeof FLASH_SALE_TYPE];
