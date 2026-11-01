/**
 * Cart Service Event Helpers
 * @module cart-service/domain/events
 *
 * Shared builders & constants for domain events (DRY pattern).
 */
import type { Timestamp } from '@vubon/shared-types/common';

export const CART_AGGREGATE_TYPE = {
  CART: 'Cart',
  CART_ITEM: 'CartItem',
  COUPON: 'Coupon',
  VOUCHER: 'Voucher',
  SAVED_FOR_LATER: 'SavedForLater',
  ABANDONED_CART: 'AbandonedCart',
  GUEST_CART: 'GuestCart',
  CART_MERGER: 'CartMerger',
  CART_TAX: 'CartTax',
} as const;

export function newEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function nowTimestamp(): Timestamp {
  return new Date().toISOString() as unknown as Timestamp;
}
