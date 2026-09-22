import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const ORDER_ITEM_CONFIG = Object.freeze({
  minQuantity: getOptionalEnvInt('ORDER_ITEM_MIN_QTY', 1),
  maxQuantity: getOptionalEnvInt('ORDER_ITEM_MAX_QTY', 9999),
  maxItemsPerOrder: getOptionalEnvInt('ORDER_ITEM_MAX_PER_ORDER', 100),
  priceSnapshotRequired: true,
} as const);
