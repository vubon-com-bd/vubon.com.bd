/**
 * Event helpers — ID generation and timestamp utility
 * @module product-service/domain/events
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

export const PRODUCT_AGGREGATE_TYPE = 'Product';
export const VARIANT_AGGREGATE_TYPE = 'ProductVariant';
export const INVENTORY_AGGREGATE_TYPE = 'ProductInventory';
export const PRICING_AGGREGATE_TYPE = 'ProductPricing';
export const REVIEW_AGGREGATE_TYPE = 'ProductReview';
export const MEDIA_AGGREGATE_TYPE = 'ProductMedia';
export const BRAND_AGGREGATE_TYPE = 'Brand';
export const CATEGORY_AGGREGATE_TYPE = 'Category';
