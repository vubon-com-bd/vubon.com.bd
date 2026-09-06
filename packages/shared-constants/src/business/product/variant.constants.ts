/**
 * Product Variant Constants (EXTENDS common/status)
 * @module shared-constants/business/product/variant.constants
 */

import { STATUS } from '../../common/status.constants';

export const PRODUCT_VARIANT = {
  // Base status from common
  STATUS: STATUS,

  // Variant specific
  MAX_VARIANT_NAME_LENGTH: 255,
  MIN_VARIANT_NAME_LENGTH: 2,
  MAX_VARIANT_SKU_LENGTH: 50,
  MIN_VARIANT_SKU_LENGTH: 3,
  DEFAULT_VARIANT_STATUS: 'active',
  VARIANT_CACHE_TTL: 3600,

  // Variant status
  PRODUCT_VARIANT_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DRAFT: 'draft',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued',
    PRE_ORDER: 'pre_order',
    BACK_ORDER: 'back_order',
  } as const,

  // Variant type
  PRODUCT_VARIANT_TYPE: {
    SIZE: 'size',
    COLOR: 'color',
    MATERIAL: 'material',
    STYLE: 'style',
    PACKAGE: 'package',
    WEIGHT: 'weight',
    DIMENSION: 'dimension',
    CUSTOM: 'custom',
  } as const,

  // Variant stock
  PRODUCT_VARIANT_STOCK: {
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    LOW_STOCK: 'low_stock',
    PRE_ORDER: 'pre_order',
    BACK_ORDER: 'back_order',
    DISCONTINUED: 'discontinued',
    COMING_SOON: 'coming_soon',
  } as const,

  // Variant pricing
  PRODUCT_VARIANT_PRICING: {
    SAME_AS_PARENT: 'same_as_parent',
    DIFFERENT: 'different',
    TIERED: 'tiered',
    DYNAMIC: 'dynamic',
  } as const,
} as const;

export type ProductVariantStatus =
  (typeof PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS)[keyof typeof PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS];
export type ProductVariantType =
  (typeof PRODUCT_VARIANT.PRODUCT_VARIANT_TYPE)[keyof typeof PRODUCT_VARIANT.PRODUCT_VARIANT_TYPE];
export type ProductVariantStock =
  (typeof PRODUCT_VARIANT.PRODUCT_VARIANT_STOCK)[keyof typeof PRODUCT_VARIANT.PRODUCT_VARIANT_STOCK];
export type ProductVariantPricing =
  (typeof PRODUCT_VARIANT.PRODUCT_VARIANT_PRICING)[keyof typeof PRODUCT_VARIANT.PRODUCT_VARIANT_PRICING];

export const PRODUCT_VARIANT_STATUS_LABELS: Record<ProductVariantStatus, string> = {
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.ACTIVE]: 'Active',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.INACTIVE]: 'Inactive',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.PENDING]: 'Pending',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.DRAFT]: 'Draft',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.ARCHIVED]: 'Archived',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.DELETED]: 'Deleted',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.OUT_OF_STOCK]: 'Out of Stock',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.DISCONTINUED]: 'Discontinued',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.PRE_ORDER]: 'Pre-Order',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.BACK_ORDER]: 'Back Order',
};

export const PRODUCT_VARIANT_STATUS_COLORS: Record<ProductVariantStatus, string> = {
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.ACTIVE]: '#22c55e',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.INACTIVE]: '#9ca3af',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.PENDING]: '#eab308',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.DRAFT]: '#60a5fa',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.ARCHIVED]: '#6b7280',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.DELETED]: '#ef4444',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.OUT_OF_STOCK]: '#ef4444',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.DISCONTINUED]: '#6b7280',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.PRE_ORDER]: '#eab308',
  [PRODUCT_VARIANT.PRODUCT_VARIANT_STATUS.BACK_ORDER]: '#f59e0b',
};
