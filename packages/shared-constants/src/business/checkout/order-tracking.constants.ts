/**
 * Order Tracking Constants (EXTENDS common/status)
 * @module shared-constants/business/checkout/order-tracking.constants
 */

import { STATUS } from '../../common/status.constants';

export const ORDER_TRACKING = {
  // Base status from common
  STATUS: STATUS,

  // Tracking specific
  MAX_TRACKING_ENTRIES: 50,
  TRACKING_CACHE_TTL: 3600,
  TRACKING_EXPIRY_DAYS: 30,

  // Tracking status
  ORDER_TRACKING_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
    DELAYED: 'delayed',
  } as const,

  // Tracking provider (Bangladesh)
  ORDER_TRACKING_PROVIDER: {
    SA_PARIBAHAN: 'sa_paribahan',
    SUNDARBAN: 'sundarban',
    E_COURIER: 'e_courier',
    REDX: 'redx',
    PATHWAY: 'pathway',
    PAPERFLY: 'paperfly',
    STEADFAST: 'steadfast',
    DHL: 'dhl',
    FEDEX: 'fedex',
    UPS: 'ups',
    ARAMEX: 'aramex',
  } as const,

  // Tracking event
  ORDER_TRACKING_EVENT: {
    ORDER_PLACED: 'order_placed',
    ORDER_CONFIRMED: 'order_confirmed',
    ORDER_PROCESSING: 'order_processing',
    ORDER_SHIPPED: 'order_shipped',
    ORDER_IN_TRANSIT: 'order_in_transit',
    ORDER_OUT_FOR_DELIVERY: 'order_out_for_delivery',
    ORDER_DELIVERED: 'order_delivered',
    ORDER_DELAYED: 'order_delayed',
    ORDER_RETURNED: 'order_returned',
    ORDER_CANCELLED: 'order_cancelled',
  } as const,
} as const;

export type OrderTrackingStatus =
  (typeof ORDER_TRACKING.ORDER_TRACKING_STATUS)[keyof typeof ORDER_TRACKING.ORDER_TRACKING_STATUS];
export type OrderTrackingProvider =
  (typeof ORDER_TRACKING.ORDER_TRACKING_PROVIDER)[keyof typeof ORDER_TRACKING.ORDER_TRACKING_PROVIDER];
export type OrderTrackingEvent =
  (typeof ORDER_TRACKING.ORDER_TRACKING_EVENT)[keyof typeof ORDER_TRACKING.ORDER_TRACKING_EVENT];

export const ORDER_TRACKING_STATUS_LABELS: Record<OrderTrackingStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  in_transit: 'In Transit',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  failed: 'Failed',
  returned: 'Returned',
  cancelled: 'Cancelled',
  on_hold: 'On Hold',
  delayed: 'Delayed',
};

export const ORDER_TRACKING_STATUS_COLORS: Record<OrderTrackingStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  in_transit: '#3b82f6',
  out_for_delivery: '#8b5cf6',
  delivered: '#22c55e',
  failed: '#ef4444',
  returned: '#f59e0b',
  cancelled: '#dc2626',
  on_hold: '#f59e0b',
  delayed: '#ef4444',
};

export const ORDER_TRACKING_EVENT_LABELS: Record<OrderTrackingEvent, string> = {
  order_placed: 'Order Placed',
  order_confirmed: 'Order Confirmed',
  order_processing: 'Order Processing',
  order_shipped: 'Order Shipped',
  order_in_transit: 'Order In Transit',
  order_out_for_delivery: 'Out for Delivery',
  order_delivered: 'Order Delivered',
  order_delayed: 'Order Delayed',
  order_returned: 'Order Returned',
  order_cancelled: 'Order Cancelled',
};
