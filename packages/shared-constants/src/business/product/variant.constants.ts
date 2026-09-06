/**
 * Product Variant Constants (EXTENDS common/status + common/types + common/inventory)
 * @module shared-constants/business/product/variant.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { CURRENCY } from '../../common/currency.constants';

export const PRODUCT_VARIANT = {
  // Base status from common
  STATUS: STATUS,

  // Types from common
  TYPES: TYPES,

  // Verification from common
  VERIFICATION: VERIFICATION,

  // Currency from common
  CURRENCY: CURRENCY,

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

  // Variant validation
  PRODUCT_VARIANT_VALIDATION: {
    REQUIRES_SKU: true,
    REQUIRES_PRICE: false,
    REQUIRES_WEIGHT: false,
    REQUIRES_DIMENSIONS: false,
    MAX_OPTIONS: 100,
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
