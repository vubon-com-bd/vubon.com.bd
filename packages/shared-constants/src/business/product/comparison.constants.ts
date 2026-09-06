/**
 * Product Comparison Constants (EXTENDS common/types)
 * @module shared-constants/business/product/comparison.constants
 */

import { TYPES } from '../../common/types.constants';

export const PRODUCT_COMPARISON = {
  // Base types from common
  ...TYPES,

  // Comparison specific
  MAX_COMPARE_PRODUCTS: 4,
  MIN_COMPARE_PRODUCTS: 2,
  COMPARISON_CACHE_TTL: 3600,

  // Comparison type
  PRODUCT_COMPARISON_TYPE: {
    PRODUCT: 'product',
    BRAND: 'brand',
    CATEGORY: 'category',
    PRICE: 'price',
    FEATURES: 'features',
    SPECIFICATIONS: 'specifications',
    REVIEWS: 'reviews',
    RATINGS: 'ratings',
    CUSTOM: 'custom',
  } as const,

  // Comparison status
  PRODUCT_COMPARISON_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    EXPIRED: 'expired',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  } as const,

  // Comparison attribute
  PRODUCT_COMPARISON_ATTRIBUTE: {
    NAME: 'name',
    BRAND: 'brand',
    CATEGORY: 'category',
    PRICE: 'price',
    RATING: 'rating',
    REVIEWS: 'reviews',
    STOCK: 'stock',
    STATUS: 'status',
    WEIGHT: 'weight',
    DIMENSIONS: 'dimensions',
    COLOR: 'color',
    SIZE: 'size',
    MATERIAL: 'material',
    FEATURES: 'features',
    SPECIFICATIONS: 'specifications',
    WARRANTY: 'warranty',
    RETURN_POLICY: 'return_policy',
    SHIPPING: 'shipping',
    PAYMENT: 'payment',
    CUSTOM: 'custom',
  } as const,

  // Comparison view
  PRODUCT_COMPARISON_VIEW: {
    TABLE: 'table',
    GRID: 'grid',
    LIST: 'list',
    SIDEBAR: 'sidebar',
    MOBILE: 'mobile',
  } as const,

  // Comparison sort
  PRODUCT_COMPARISON_SORT: {
    PRICE: 'price',
    PRICE_DESC: 'price_desc',
    RATING: 'rating',
    RATING_DESC: 'rating_desc',
    NAME: 'name',
    NAME_DESC: 'name_desc',
    RELEVANCE: 'relevance',
    RELEVANCE_DESC: 'relevance_desc',
    POPULARITY: 'popularity',
    POPULARITY_DESC: 'popularity_desc',
  } as const,
} as const;

export type ProductComparisonType =
  (typeof PRODUCT_COMPARISON.PRODUCT_COMPARISON_TYPE)[keyof typeof PRODUCT_COMPARISON.PRODUCT_COMPARISON_TYPE];
export type ProductComparisonStatus =
  (typeof PRODUCT_COMPARISON.PRODUCT_COMPARISON_STATUS)[keyof typeof PRODUCT_COMPARISON.PRODUCT_COMPARISON_STATUS];
export type ProductComparisonAttribute =
  (typeof PRODUCT_COMPARISON.PRODUCT_COMPARISON_ATTRIBUTE)[keyof typeof PRODUCT_COMPARISON.PRODUCT_COMPARISON_ATTRIBUTE];
export type ProductComparisonView =
  (typeof PRODUCT_COMPARISON.PRODUCT_COMPARISON_VIEW)[keyof typeof PRODUCT_COMPARISON.PRODUCT_COMPARISON_VIEW];
export type ProductComparisonSort =
  (typeof PRODUCT_COMPARISON.PRODUCT_COMPARISON_SORT)[keyof typeof PRODUCT_COMPARISON.PRODUCT_COMPARISON_SORT];
