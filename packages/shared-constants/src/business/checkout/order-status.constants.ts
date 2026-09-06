/**
 * Order Status Constants (EXTENDS common/status)
 * @module shared-constants/business/checkout/order-status.constants
 */

import { STATUS } from '../../common/status.constants';

export const ORDER_STATUS = {
  // Base status from common
  ...STATUS,

  // Order specific status
  ORDER_PENDING: 'order_pending',
  ORDER_CONFIRMED: 'order_confirmed',
  ORDER_PROCESSING: 'order_processing',
  ORDER_SHIPPED: 'order_shipped',
  ORDER_DELIVERED: 'order_delivered',
  ORDER_CANCELLED: 'order_cancelled',
  ORDER_RETURNED: 'order_returned',
  ORDER_REFUNDED: 'order_refunded',
  ORDER_PARTIAL_SHIPPED: 'order_partial_shipped',
  ORDER_READY_TO_SHIP: 'order_ready_to_ship',
  ORDER_ON_HOLD: 'order_on_hold',
  ORDER_FAILED: 'order_failed',
  ORDER_PAYMENT_PENDING: 'order_payment_pending',
  ORDER_PAYMENT_COMPLETED: 'order_payment_completed',
  ORDER_PAYMENT_FAILED: 'order_payment_failed',
  ORDER_FULFILLED: 'order_fulfilled',
  ORDER_UNFULFILLED: 'order_unfulfilled',
  ORDER_PARTIALLY_FULFILLED: 'order_partially_fulfilled',
  ORDER_IN_TRANSIT: 'order_in_transit',
  ORDER_OUT_FOR_DELIVERY: 'order_out_for_delivery',
  ORDER_READY_FOR_PICKUP: 'order_ready_for_pickup',
  ORDER_PICKED_UP: 'order_picked_up',
} as const;

// Use keyof typeof for Record keys
export type OrderStatusKey = keyof typeof ORDER_STATUS;
export type CheckoutOrderStatus = (typeof ORDER_STATUS)[OrderStatusKey];

// Only include order specific status keys for labels and colors
export type OrderExtendedStatusKey =
  | 'ORDER_PENDING'
  | 'ORDER_CONFIRMED'
  | 'ORDER_PROCESSING'
  | 'ORDER_SHIPPED'
  | 'ORDER_DELIVERED'
  | 'ORDER_CANCELLED'
  | 'ORDER_RETURNED'
  | 'ORDER_REFUNDED'
  | 'ORDER_PARTIAL_SHIPPED'
  | 'ORDER_READY_TO_SHIP'
  | 'ORDER_ON_HOLD'
  | 'ORDER_FAILED'
  | 'ORDER_PAYMENT_PENDING'
  | 'ORDER_PAYMENT_COMPLETED'
  | 'ORDER_PAYMENT_FAILED'
  | 'ORDER_FULFILLED'
  | 'ORDER_UNFULFILLED'
  | 'ORDER_PARTIALLY_FULFILLED'
  | 'ORDER_IN_TRANSIT'
  | 'ORDER_OUT_FOR_DELIVERY'
  | 'ORDER_READY_FOR_PICKUP'
  | 'ORDER_PICKED_UP';

export const ORDER_STATUS_LABELS: Record<OrderExtendedStatusKey, string> = {
  ORDER_PENDING: 'Order Pending',
  ORDER_CONFIRMED: 'Order Confirmed',
  ORDER_PROCESSING: 'Processing',
  ORDER_SHIPPED: 'Shipped',
  ORDER_DELIVERED: 'Delivered',
  ORDER_CANCELLED: 'Cancelled',
  ORDER_RETURNED: 'Returned',
  ORDER_REFUNDED: 'Refunded',
  ORDER_PARTIAL_SHIPPED: 'Partial Shipped',
  ORDER_READY_TO_SHIP: 'Ready to Ship',
  ORDER_ON_HOLD: 'On Hold',
  ORDER_FAILED: 'Failed',
  ORDER_PAYMENT_PENDING: 'Payment Pending',
  ORDER_PAYMENT_COMPLETED: 'Payment Completed',
  ORDER_PAYMENT_FAILED: 'Payment Failed',
  ORDER_FULFILLED: 'Fulfilled',
  ORDER_UNFULFILLED: 'Unfulfilled',
  ORDER_PARTIALLY_FULFILLED: 'Partially Fulfilled',
  ORDER_IN_TRANSIT: 'In Transit',
  ORDER_OUT_FOR_DELIVERY: 'Out for Delivery',
  ORDER_READY_FOR_PICKUP: 'Ready for Pickup',
  ORDER_PICKED_UP: 'Picked Up',
};

export const ORDER_STATUS_COLORS: Record<OrderExtendedStatusKey, string> = {
  ORDER_PENDING: '#eab308',
  ORDER_CONFIRMED: '#60a5fa',
  ORDER_PROCESSING: '#8b5cf6',
  ORDER_SHIPPED: '#3b82f6',
  ORDER_DELIVERED: '#22c55e',
  ORDER_CANCELLED: '#dc2626',
  ORDER_RETURNED: '#f59e0b',
  ORDER_REFUNDED: '#6b7280',
  ORDER_PARTIAL_SHIPPED: '#8b5cf6',
  ORDER_READY_TO_SHIP: '#60a5fa',
  ORDER_ON_HOLD: '#f59e0b',
  ORDER_FAILED: '#ef4444',
  ORDER_PAYMENT_PENDING: '#eab308',
  ORDER_PAYMENT_COMPLETED: '#22c55e',
  ORDER_PAYMENT_FAILED: '#ef4444',
  ORDER_FULFILLED: '#22c55e',
  ORDER_UNFULFILLED: '#9ca3af',
  ORDER_PARTIALLY_FULFILLED: '#f59e0b',
  ORDER_IN_TRANSIT: '#3b82f6',
  ORDER_OUT_FOR_DELIVERY: '#60a5fa',
  ORDER_READY_FOR_PICKUP: '#60a5fa',
  ORDER_PICKED_UP: '#22c55e',
};

export const ORDER_STATUS_GROUPS = {
  PENDING: [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.ORDER_PENDING,
    ORDER_STATUS.ORDER_PAYMENT_PENDING,
  ] as const,

  PROCESSING: [
    ORDER_STATUS.ORDER_CONFIRMED,
    ORDER_STATUS.ORDER_PROCESSING,
    ORDER_STATUS.ORDER_READY_TO_SHIP,
  ] as const,

  SHIPPED: [
    ORDER_STATUS.ORDER_SHIPPED,
    ORDER_STATUS.ORDER_PARTIAL_SHIPPED,
    ORDER_STATUS.ORDER_IN_TRANSIT,
    ORDER_STATUS.ORDER_OUT_FOR_DELIVERY,
  ] as const,

  DELIVERED: [
    ORDER_STATUS.ORDER_DELIVERED,
    ORDER_STATUS.ORDER_PICKED_UP,
    ORDER_STATUS.ORDER_READY_FOR_PICKUP,
  ] as const,

  COMPLETED: [ORDER_STATUS.ORDER_FULFILLED, ORDER_STATUS.ORDER_PAYMENT_COMPLETED] as const,

  CANCELLED: [
    ORDER_STATUS.ORDER_CANCELLED,
    ORDER_STATUS.ORDER_RETURNED,
    ORDER_STATUS.ORDER_REFUNDED,
  ] as const,

  FAILED: [ORDER_STATUS.ORDER_FAILED, ORDER_STATUS.ORDER_PAYMENT_FAILED] as const,

  HOLD: [
    ORDER_STATUS.ORDER_ON_HOLD,
    ORDER_STATUS.ORDER_UNFULFILLED,
    ORDER_STATUS.ORDER_PARTIALLY_FULFILLED,
  ] as const,
} as const;
