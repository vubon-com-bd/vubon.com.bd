import { getOptionalEnvInt } from '@vubon/shared-config/common';
import { ORDER_ITEM_LIMIT } from '@vubon/shared-constants/business/order';

export const ORDER_ITEM_CONFIG = Object.freeze({
  MIN_QUANTITY: getOptionalEnvInt('ORDER_ITEM_MIN_QTY', ORDER_ITEM_LIMIT.MIN_QUANTITY),
  MAX_QUANTITY: getOptionalEnvInt('ORDER_ITEM_MAX_QTY', ORDER_ITEM_LIMIT.MAX_QUANTITY),
  MAX_ITEMS_PER_ORDER: getOptionalEnvInt(
    'ORDER_ITEM_MAX_PER_ORDER',
    ORDER_ITEM_LIMIT.MAX_ITEMS_PER_ORDER,
  ),
  MAX_NOTES_LENGTH: getOptionalEnvInt(
    'ORDER_ITEM_MAX_NOTES',
    ORDER_ITEM_LIMIT.MAX_NOTES_LENGTH,
  ),
  SKU_MAX_LENGTH: getOptionalEnvInt('ORDER_ITEM_SKU_MAX', ORDER_ITEM_LIMIT.SKU_MAX_LENGTH),
});

export type OrderItemConfigType = typeof ORDER_ITEM_CONFIG;
