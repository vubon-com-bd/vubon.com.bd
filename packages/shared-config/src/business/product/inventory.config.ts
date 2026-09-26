/**
 * Inventory configuration
 * @module shared-config/business/product
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const INVENTORY_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('INVENTORY_ENABLED', true),
  trackQuantity: getOptionalEnvBool('INVENTORY_TRACK_QUANTITY', true),
  allowBackorder: getOptionalEnvBool('INVENTORY_ALLOW_BACKORDER', false),
  reserveOnOrder: getOptionalEnvBool('INVENTORY_RESERVE_ON_ORDER', true),
  reserveExpiryMinutes: getOptionalEnvInt('INVENTORY_RESERVE_EXPIRY_MIN', 15),
  lowStockThreshold: getOptionalEnvInt('INVENTORY_LOW_STOCK_THRESHOLD', 10),
  criticalStockThreshold: getOptionalEnvInt('INVENTORY_CRITICAL_THRESHOLD', 3),
  autoRestockAlert: getOptionalEnvBool('INVENTORY_AUTO_RESTOCK_ALERT', true),
  syncIntervalSeconds: getOptionalEnvInt('INVENTORY_SYNC_INTERVAL', 30),
});
