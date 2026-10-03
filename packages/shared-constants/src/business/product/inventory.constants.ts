export const INVENTORY_STATUS = {
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
  BACKORDER: 'backorder',
  DISCONTINUED: 'discontinued',
} as const;

export const INVENTORY = {
  LOW_STOCK_THRESHOLD: 10,
  CRITICAL_STOCK_THRESHOLD: 3,
  MAX_STOCK_PER_VARIANT: 1000000,
  MIN_STOCK: 0,
  DEFAULT_STOCK: 0,
  RESERVE_ON_ORDER: true,
  RESERVE_EXPIRY_MINUTES: 15,
  TRACK_QUANTITY: true,
  ALLOW_BACKORDER: false,
} as const;

export type InventoryStatusType = (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS];
