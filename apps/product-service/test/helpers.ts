/**
 * Test helpers — common fixtures and utilities
 * @module product-service/test
 */
import type { CurrencyCode } from '@vubon/shared-types/common';

export const NOW = '2025-01-15T10:00:00.000Z';
export const LATER = '2025-01-15T11:00:00.000Z';
export const USER_ID = 'user-11111111-1111-1111-1111-111111111111';
export const ADMIN_ID = 'admin-11111111-1111-1111-1111-111111111111';
export const PRODUCT_ID = 'prod-11111111-1111-1111-1111-111111111111';
export const VARIANT_ID = 'vari-11111111-1111-1111-1111-111111111111';
export const CATEGORY_ID = 'cat-11111111-1111-1111-1111-111111111111';
export const BRAND_ID = 'brnd-11111111-1111-1111-1111-111111111111';
export const REVIEW_ID = 'revw-11111111-1111-1111-1111-111111111111';
export const INVENTORY_ID = 'invt-11111111-1111-1111-1111-111111111111';
export const COLLECTION_ID = 'coll-11111111-1111-1111-1111-111111111111';
export const DEFAULT_CURRENCY: CurrencyCode = 'BDT';

export function mockUuid(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
