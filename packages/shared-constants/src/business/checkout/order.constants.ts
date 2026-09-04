/**
 * Order Constants
 * অর্ডার সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS, OrderStatus as CommonOrderStatus } from '../../common';
import { CHECKOUT } from './checkout.constants';

// Re-export OrderStatus from common
export { CommonOrderStatus as OrderStatus };

export const ORDER = {
  // Order status
  STATUS: {
    PENDING: STATUS.PENDING,
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    READY_TO_SHIP: 'ready_to_ship',
    SHIPPED: 'shipped',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
    REFUNDED: 'refunded',
    PARTIAL_SHIPPED: 'partial_shipped',
    FAILED: 'failed',
    EXPIRED: 'expired',
  },

  // Order types
  TYPES: {
    REGULAR: 'regular',
    EXPRESS: 'express',
    BULK: 'bulk',
    WHOLESALE: 'wholesale',
    RENTAL: 'rental',
    SUBSCRIPTION: 'subscription',
    GIFT: 'gift',
  },

  // Order sources
  SOURCES: {
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    POS: 'pos',
    MARKETPLACE: 'marketplace',
    SOCIAL: 'social',
  },

  // Checkout status (from CHECKOUT)
  CHECKOUT_STATUS: {
    INITIATED: CHECKOUT.STATUS.INITIATED,
    IN_PROGRESS: CHECKOUT.STATUS.IN_PROGRESS,
    COMPLETED: CHECKOUT.STATUS.COMPLETED,
    FAILED: CHECKOUT.STATUS.FAILED,
    CANCELLED: CHECKOUT.STATUS.CANCELLED,
  },

  // Default values
  DEFAULTS: {
    MIN_ITEMS: 1,
    MAX_ITEMS: 100,
    MIN_ORDER_AMOUNT: 0,
    MAX_ORDER_AMOUNT: 99999999,
    PROCESSING_TIME: 24, // hours
    SHIPPING_TIME: 72, // hours
    RETURN_WINDOW: 7, // days
    CANCELLATION_WINDOW: 24, // hours
  },
} as const;

export type OrderStatusType = (typeof ORDER.STATUS)[keyof typeof ORDER.STATUS];
export type OrderType = (typeof ORDER.TYPES)[keyof typeof ORDER.TYPES];
export type OrderSource = (typeof ORDER.SOURCES)[keyof typeof ORDER.SOURCES];

export const ORDER_STATUS = ORDER.STATUS;
export const ORDER_TYPES = ORDER.TYPES;
export const ORDER_SOURCES = ORDER.SOURCES;
