/**
 * Product Collection Constants (EXTENDS common/status)
 * @module shared-constants/business/product/collection.constants
 */

import { STATUS } from '../../common/status.constants';

export const PRODUCT_COLLECTION = {
  // Base status from common
  STATUS: STATUS,

  // Collection specific
  MAX_COLLECTION_NAME_LENGTH: 100,
  MIN_COLLECTION_NAME_LENGTH: 2,
  MAX_COLLECTION_DESCRIPTION_LENGTH: 500,
  MAX_COLLECTION_SLUG_LENGTH: 100,
  MAX_PRODUCTS_PER_COLLECTION: 1000,
  COLLECTION_CACHE_TTL: 3600,

  // Collection status
  PRODUCT_COLLECTION_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DRAFT: 'draft',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
    FEATURED: 'featured',
    HIDDEN: 'hidden',
  } as const,

  // Collection type
  PRODUCT_COLLECTION_TYPE: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    SMART: 'smart',
    SEASONAL: 'seasonal',
    PROMOTIONAL: 'promotional',
    THEMATIC: 'thematic',
    NEW_ARRIVALS: 'new_arrivals',
    BEST_SELLERS: 'best_sellers',
    CUSTOM: 'custom',
  } as const,

  // Collection visibility
  PRODUCT_COLLECTION_VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    RESTRICTED: 'restricted',
    MEMBERS_ONLY: 'members_only',
    ADMIN_ONLY: 'admin_only',
  } as const,

  // Collection sort
  PRODUCT_COLLECTION_SORT: {
    MANUAL: 'manual',
    NAME: 'name',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    PRODUCT_COUNT: 'product_count',
    POPULARITY: 'popularity',
    RELEVANCE: 'relevance',
  } as const,

  // Collection rules (for automatic collections)
  PRODUCT_COLLECTION_RULE_TYPE: {
    CATEGORY: 'category',
    BRAND: 'brand',
    PRICE_RANGE: 'price_range',
    RATING: 'rating',
    STOCK: 'stock',
    DATE_RANGE: 'date_range',
    TAG: 'tag',
    ATTRIBUTE: 'attribute',
    CUSTOM: 'custom',
  } as const,

  // Collection rule operator
  PRODUCT_COLLECTION_RULE_OPERATOR: {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
  } as const,
} as const;

export type ProductCollectionStatus =
  (typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS)[keyof typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS];
export type ProductCollectionType =
  (typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_TYPE)[keyof typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_TYPE];
export type ProductCollectionVisibility =
  (typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_VISIBILITY)[keyof typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_VISIBILITY];
export type ProductCollectionSort =
  (typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_SORT)[keyof typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_SORT];
export type ProductCollectionRuleType =
  (typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_RULE_TYPE)[keyof typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_RULE_TYPE];
export type ProductCollectionRuleOperator =
  (typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_RULE_OPERATOR)[keyof typeof PRODUCT_COLLECTION.PRODUCT_COLLECTION_RULE_OPERATOR];

export const PRODUCT_COLLECTION_STATUS_LABELS: Record<ProductCollectionStatus, string> = {
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.ACTIVE]: 'Active',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.INACTIVE]: 'Inactive',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.PENDING]: 'Pending',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.DRAFT]: 'Draft',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.ARCHIVED]: 'Archived',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.DELETED]: 'Deleted',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.FEATURED]: 'Featured',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.HIDDEN]: 'Hidden',
};

export const PRODUCT_COLLECTION_STATUS_COLORS: Record<ProductCollectionStatus, string> = {
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.ACTIVE]: '#22c55e',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.INACTIVE]: '#9ca3af',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.PENDING]: '#eab308',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.DRAFT]: '#60a5fa',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.ARCHIVED]: '#6b7280',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.DELETED]: '#ef4444',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.FEATURED]: '#8b5cf6',
  [PRODUCT_COLLECTION.PRODUCT_COLLECTION_STATUS.HIDDEN]: '#6b7280',
};
