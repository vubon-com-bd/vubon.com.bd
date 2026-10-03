/**
 * Event helpers — ID generation, timestamp, aggregate type constants
 * @module order-service/domain/events
 */
import { randomUUID } from 'node:crypto';
import type { Timestamp } from '@vubon/shared-types/common';

export function newEventId(): string {
  return randomUUID();
}

/** Current timestamp as epoch milliseconds (branded). */
export function now(): Timestamp {
  return Date.now() as Timestamp;
}

// ═══ Aggregate type identifiers ═══
export const ORDER_AGGREGATE_TYPE = 'Order';
export const ORDER_ITEM_AGGREGATE_TYPE = 'OrderItem';
export const CHECKOUT_AGGREGATE_TYPE = 'Checkout';
export const CHECKOUT_SESSION_AGGREGATE_TYPE = 'CheckoutSession';
export const DELIVERY_AGGREGATE_TYPE = 'Delivery';
export const DELIVERY_METHOD_AGGREGATE_TYPE = 'DeliveryMethod';
export const SHIPPING_ADDRESS_AGGREGATE_TYPE = 'ShippingAddress';
export const BILLING_ADDRESS_AGGREGATE_TYPE = 'BillingAddress';
export const ORDER_CANCEL_AGGREGATE_TYPE = 'OrderCancel';
export const ORDER_RETURN_AGGREGATE_TYPE = 'OrderReturn';
export const ORDER_FULFILLMENT_AGGREGATE_TYPE = 'OrderFulfillment';
export const ORDER_HISTORY_AGGREGATE_TYPE = 'OrderHistory';
export const ORDER_TRACKING_AGGREGATE_TYPE = 'OrderTracking';
