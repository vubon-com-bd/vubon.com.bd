/**
 * Flash Sale Inventory Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/flash-sale-inventory.constants
 */

import { STATUS } from '../../common/status.constants';

export const FLASH_SALE_INVENTORY = {
  // Base status from common
  STATUS: STATUS,

  // Inventory specific
  INVENTORY_CACHE_TTL: 3600,
  RESERVATION_TIMEOUT_MINUTES: 5,
  MAX_RESERVATION_PER_USER: 1,

  // Inventory status
  FLASH_SALE_INVENTORY_STATUS: {
    AVAILABLE: 'available',
    RESERVED: 'reserved',
    SOLD: 'sold',
    SOLD_OUT: 'sold_out',
    RESTOCKED: 'restocked',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    ON_HOLD: 'on_hold',
  } as const,

  // Inventory type
  FLASH_SALE_INVENTORY_TYPE: {
    PRODUCT: 'product',
    VARIANT: 'variant',
    BUNDLE: 'bundle',
    KIT: 'kit',
  } as const,

  // Stock management
  FLASH_SALE_STOCK_MANAGEMENT: {
    AUTO: 'auto',
    MANUAL: 'manual',
    HYBRID: 'hybrid',
  } as const,

  // Reserve settings
  FLASH_SALE_RESERVE: {
    TIMEOUT_SECONDS: 300,
    MAX_RESERVES: 1000,
    RELEASE_ON_EXPIRY: true,
  } as const,
} as const;

export type FlashSaleInventoryStatus =
  (typeof FLASH_SALE_INVENTORY.FLASH_SALE_INVENTORY_STATUS)[keyof typeof FLASH_SALE_INVENTORY.FLASH_SALE_INVENTORY_STATUS];
export type FlashSaleInventoryType =
  (typeof FLASH_SALE_INVENTORY.FLASH_SALE_INVENTORY_TYPE)[keyof typeof FLASH_SALE_INVENTORY.FLASH_SALE_INVENTORY_TYPE];
export type FlashSaleStockManagement =
  (typeof FLASH_SALE_INVENTORY.FLASH_SALE_STOCK_MANAGEMENT)[keyof typeof FLASH_SALE_INVENTORY.FLASH_SALE_STOCK_MANAGEMENT];
