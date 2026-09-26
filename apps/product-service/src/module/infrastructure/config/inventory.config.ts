import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const INVENTORY_CONFIG = Object.freeze({
  lowStockThreshold: getOptionalEnvInt('INVENTORY_LOW_STOCK_THRESHOLD', 5),
  criticalThreshold: getOptionalEnvInt('INVENTORY_CRITICAL_THRESHOLD', 1),
  autoReserveOnOrder: true,
  trackReserved: true,
} as const);
