/**
 * Inventory Infrastructure Configuration
 * @module product-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const INVENTORY_INFRA_CONFIG = Object.freeze({
  lowStockThreshold: getOptionalEnvInt('INVENTORY_LOW_STOCK_THRESHOLD', 10),
  criticalStockThreshold: getOptionalEnvInt('INVENTORY_CRITICAL_THRESHOLD', 3),
  reservationTtlMinutes: getOptionalEnvInt('INVENTORY_RESERVATION_TTL_MINUTES', 15),
  syncIntervalMs: getOptionalEnvInt('INVENTORY_SYNC_INTERVAL_MS', 60000),
  allowBackorder: getOptionalEnvBool('INVENTORY_ALLOW_BACKORDER', false),
} as const);

export type InventoryInfraConfig = typeof INVENTORY_INFRA_CONFIG;
