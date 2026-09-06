/**
 * Order Item Constants (EXTENDS common/status)
 * @module shared-constants/business/checkout/order-item.constants
 */

import { STATUS } from '../../common/status.constants';

export const ORDER_ITEM = {
  // Base status from common
  STATUS: STATUS,

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
} as const;

export type OrderItemStatus =
  (typeof ORDER_ITEM.ORDER_ITEM_STATUS)[keyof typeof ORDER_ITEM.ORDER_ITEM_STATUS];
export type OrderItemType =
  (typeof ORDER_ITEM.ORDER_ITEM_TYPE)[keyof typeof ORDER_ITEM.ORDER_ITEM_TYPE];
export type OrderItemDiscount =
  (typeof ORDER_ITEM.ORDER_ITEM_DISCOUNT)[keyof typeof ORDER_ITEM.ORDER_ITEM_DISCOUNT];

export const ORDER_ITEM_STATUS_LABELS: Record<OrderItemStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  returned: 'Returned',
  refunded: 'Refunded',
  failed: 'Failed',
};

export const ORDER_ITEM_STATUS_COLORS: Record<OrderItemStatus, string> = {
  pending: '#eab308',
  confirmed: '#60a5fa',
  processing: '#8b5cf6',
  shipped: '#3b82f6',
  delivered: '#22c55e',
  cancelled: '#dc2626',
  returned: '#f59e0b',
  refunded: '#6b7280',
  failed: '#ef4444',
};
