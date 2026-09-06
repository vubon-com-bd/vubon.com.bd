/**
 * Order Item Constants (EXTENDS common/status + common/types)
 * @module shared-constants/business/checkout/order-item.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { TAX } from '../../common/tax.constants';
import { DISCOUNT } from '../../common/discount.constants';

export const ORDER_ITEM = {
  // Base status from common
  STATUS: STATUS,

  // Types from common
  TYPES: TYPES,

  // Currency from common
  CURRENCY: CURRENCY,

  // Tax from common
  TAX: TAX,

  // Discount from common
  DISCOUNT: DISCOUNT,

  // Order item specific
  MAX_QUANTITY: 999,
  MIN_QUANTITY: 1,
  MAX_ITEMS_PER_ORDER: 100,

  // Order item status
  ORDER_ITEM_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
    REFUNDED: 'refunded',
    FAILED: 'failed',
  } as const,

  // Order item type
  ORDER_ITEM_TYPE: {
    PRODUCT: 'product',
    VARIANT: 'variant',
    SERVICE: 'service',
    SUBSCRIPTION: 'subscription',
    BUNDLE: 'bundle',
    KIT: 'kit',
    DIGITAL: 'digital',
    CUSTOM: 'custom',
  } as const,

  // Order item discount
  ORDER_ITEM_DISCOUNT: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    BUNDLE: 'bundle',
    BOGO: 'bogo',
  } as const,

  // Order item tax
  ORDER_ITEM_TAX: {
    APPLICABLE: true,
    INCLUDED: false,
    CALCULATION: 'percentage',
  } as const,
} as const;

export type OrderItemStatus =
  (typeof ORDER_ITEM.ORDER_ITEM_STATUS)[keyof typeof ORDER_ITEM.ORDER_ITEM_STATUS];
export type OrderItemType =
  (typeof ORDER_ITEM.ORDER_ITEM_TYPE)[keyof typeof ORDER_ITEM.ORDER_ITEM_TYPE];
export type OrderItemDiscount =
  (typeof ORDER_ITEM.ORDER_ITEM_DISCOUNT)[keyof typeof ORDER_ITEM.ORDER_ITEM_DISCOUNT];
