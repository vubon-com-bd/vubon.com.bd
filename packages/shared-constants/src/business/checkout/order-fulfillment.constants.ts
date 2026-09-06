/**
 * Order Fulfillment Constants (EXTENDS common/status)
 * @module shared-constants/business/checkout/order-fulfillment.constants
 */

import { STATUS } from '../../common/status.constants';

export const ORDER_FULFILLMENT = {
  // Base status from common
  STATUS: STATUS,

  // Fulfillment specific
  FULFILLMENT_CACHE_TTL: 3600,
  MAX_FULFILLMENT_ATTEMPTS: 3,

  // Fulfillment status
  ORDER_FULFILLMENT_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PARTIAL: 'partial',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
  } as const,

  // Fulfillment type
  ORDER_FULFILLMENT_TYPE: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    HYBRID: 'hybrid',
  } as const,

  // Fulfillment location
  ORDER_FULFILLMENT_LOCATION: {
    WAREHOUSE: 'warehouse',
    STORE: 'store',
    DROP_SHIP: 'drop_ship',
    VENDOR: 'vendor',
    DISTRIBUTION_CENTER: 'distribution_center',
    CUSTOM: 'custom',
  } as const,

  // Fulfillment method
  ORDER_FULFILLMENT_METHOD: {
    PICKUP: 'pickup',
    DELIVERY: 'delivery',
    SHIPPING: 'shipping',
    DROP_SHIPPING: 'drop_shipping',
    DIGITAL: 'digital',
    SERVICE: 'service',
  } as const,
} as const;

export type OrderFulfillmentStatus =
  (typeof ORDER_FULFILLMENT.ORDER_FULFILLMENT_STATUS)[keyof typeof ORDER_FULFILLMENT.ORDER_FULFILLMENT_STATUS];
export type OrderFulfillmentType =
  (typeof ORDER_FULFILLMENT.ORDER_FULFILLMENT_TYPE)[keyof typeof ORDER_FULFILLMENT.ORDER_FULFILLMENT_TYPE];
export type OrderFulfillmentLocation =
  (typeof ORDER_FULFILLMENT.ORDER_FULFILLMENT_LOCATION)[keyof typeof ORDER_FULFILLMENT.ORDER_FULFILLMENT_LOCATION];
export type OrderFulfillmentMethod =
  (typeof ORDER_FULFILLMENT.ORDER_FULFILLMENT_METHOD)[keyof typeof ORDER_FULFILLMENT.ORDER_FULFILLMENT_METHOD];

export const ORDER_FULFILLMENT_STATUS_LABELS: Record<OrderFulfillmentStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  partial: 'Partial',
  cancelled: 'Cancelled',
  on_hold: 'On Hold',
};

export const ORDER_FULFILLMENT_STATUS_COLORS: Record<OrderFulfillmentStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  partial: '#f59e0b',
  cancelled: '#dc2626',
  on_hold: '#f59e0b',
};
