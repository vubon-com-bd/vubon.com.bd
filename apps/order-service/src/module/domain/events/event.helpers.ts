/**
 * Order Service Event Helpers
 * @module order-service/domain/events
 *
 * Shared helpers for domain event construction.
 */
import type { Timestamp } from '@vubon/shared-types/common';

export const ORDER_AGGREGATE_TYPE = {
  ORDER: 'Order',
  ORDER_ITEM: 'OrderItem',
  CHECKOUT: 'Checkout',
  CHECKOUT_SESSION: 'CheckoutSession',
  DELIVERY: 'Delivery',
  DELIVERY_METHOD: 'DeliveryMethod',
  ORDER_CANCEL: 'OrderCancel',
  ORDER_RETURN: 'OrderReturn',
  ORDER_FULFILLMENT: 'OrderFulfillment',
  ORDER_TRACKING: 'OrderTracking',
} as const;

export function newEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function now(): Timestamp {
  return new Date().toISOString() as unknown as Timestamp;
}
