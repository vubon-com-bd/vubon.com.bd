export const FLASH_SALE_INVENTORY_STATUS = {
  AVAILABLE: 'available',
  LOW_STOCK: 'low_stock',
  RESERVED: 'reserved',
  SOLD_OUT: 'sold_out',
  BLOCKED: 'blocked',
} as const;

export const FLASH_SALE_INVENTORY = {
  RESERVE_ON_CART: true,
  RESERVE_EXPIRY_MINUTES: 10,
  LOW_STOCK_THRESHOLD: 10,
  CRITICAL_STOCK_THRESHOLD: 3,
  ALLOW_OVERSELL: false,
  SYNC_INTERVAL_SECONDS: 30,
  MAX_RESERVE_PER_USER: 5,
} as const;

export type FlashSaleInventoryStatusType =
  (typeof FLASH_SALE_INVENTORY_STATUS)[keyof typeof FLASH_SALE_INVENTORY_STATUS];
