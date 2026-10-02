/**
 * Event helpers — ID generation and timestamp utility
 * @module cart-service/domain/events
 */
import { randomUUID } from 'node:crypto';
import type { Timestamp } from '@vubon/shared-types/common';

export function newEventId(): string {
  return randomUUID();
}

/**
 * Current timestamp as epoch milliseconds.
 * shared-types Timestamp is a branded number (epoch ms).
 */
export function now(): Timestamp {
  return Date.now() as Timestamp;
}

// Aggregate type identifiers
export const CART_AGGREGATE_TYPE = 'Cart';
export const CART_ITEM_AGGREGATE_TYPE = 'CartItem';
export const COUPON_AGGREGATE_TYPE = 'CartCoupon';
export const VOUCHER_AGGREGATE_TYPE = 'CartVoucher';
export const SAVED_AGGREGATE_TYPE = 'SavedForLater';
export const ABANDONED_CART_AGGREGATE_TYPE = 'AbandonedCart';
export const GUEST_CART_AGGREGATE_TYPE = 'GuestCart';
export const CART_MERGER_AGGREGATE_TYPE = 'CartMerger';
export const CART_TAX_AGGREGATE_TYPE = 'CartTax';
export const CART_SHIPPING_AGGREGATE_TYPE = 'CartShipping';
