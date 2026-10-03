import { getOptionalEnvInt, getOptionalEnvBool } from './_helpers.js';
import { INVENTORY } from '@vubon/shared-constants/business/product';

const INVENTORY_CONFIG = Object.freeze({
  LOW_STOCK_THRESHOLD: INVENTORY.LOW_STOCK_THRESHOLD,
  CRITICAL_STOCK_THRESHOLD: INVENTORY.CRITICAL_STOCK_THRESHOLD,
  RESERVE_EXPIRY_MINUTES: INVENTORY.RESERVE_EXPIRY_MINUTES,
  ALLOW_BACKORDER: INVENTORY.ALLOW_BACKORDER,
  CACHE_TTL_SECONDS: getOptionalEnvInt('INVENTORY_CACHE_TTL', 60),
  ENABLE_LOW_STOCK_ALERTS: getOptionalEnvBool('INVENTORY_LOW_STOCK_ALERTS', true),
} as const);

export type InventoryConfig = typeof INVENTORY_CONFIG;
export const inventoryConfig = INVENTORY_CONFIG;
export function getInventoryConfig(): InventoryConfig { return INVENTORY_CONFIG; }
