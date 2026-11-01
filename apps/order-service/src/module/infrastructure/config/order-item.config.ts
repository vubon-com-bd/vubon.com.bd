/**
 * OrderItem Configuration
 * @module order-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const ORDER_ITEM_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_SERVICE_ORDER_ITEM_ENABLED', true),
  minQuantity: getOptionalEnvInt('ORDER_SERVICE_ITEM_MIN_QTY', 1),
  maxQuantity: getOptionalEnvInt('ORDER_SERVICE_ITEM_MAX_QTY', 999),
  maxNotesLength: getOptionalEnvInt('ORDER_SERVICE_ITEM_MAX_NOTES', 500),
  maxSkuLength: getOptionalEnvInt('ORDER_SERVICE_ITEM_MAX_SKU', 64),
  allowOutOfStock: getOptionalEnvBool('ORDER_SERVICE_ITEM_ALLOW_OOS', false),
});

export type OrderItemConfig = typeof ORDER_ITEM_CONFIG;
