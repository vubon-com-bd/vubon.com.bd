/**
 * Product Service Event Helpers
 * @module product-service/domain/events
 *
 * DRY helpers — সব event একই pattern follow করে।
 */
import type { Timestamp } from '@vubon/shared-types/common';

// ─── Aggregate Type Constants ──────────────
export const PRODUCT_AGGREGATE_TYPE = {
  PRODUCT: 'Product',
  VARIANT: 'ProductVariant',
  INVENTORY: 'ProductInventory',
  PRICING: 'ProductPricing',
  REVIEW: 'ProductReview',
  COLLECTION: 'ProductCollection',
  BRAND: 'Brand',
  CATEGORY: 'Category',
} as const;

// ─── Event Id / Timestamp Helpers ──────────
export function newEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function now(): Timestamp {
  return new Date().toISOString() as unknown as Timestamp;
}
