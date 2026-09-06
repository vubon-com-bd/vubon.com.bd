/**
 * Product Tag Constants (EXTENDS common/status)
 * @module shared-constants/business/product/tag.constants
 */

import { STATUS } from '../../common/status.constants';

export const PRODUCT_TAG = {
  // Base status from common
  STATUS: STATUS,

  // Tag specific
  MAX_TAG_NAME_LENGTH: 50,
  MIN_TAG_NAME_LENGTH: 2,
  MAX_TAG_SLUG_LENGTH: 50,
  MAX_TAGS_PER_PRODUCT: 20,
  TAG_CACHE_TTL: 3600,

  // Tag status
  PRODUCT_TAG_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DRAFT: 'draft',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
    FEATURED: 'featured',
  } as const,

  // Tag type
  PRODUCT_TAG_TYPE: {
    PRODUCT: 'product',
    CATEGORY: 'category',
    BRAND: 'brand',
    COLLECTION: 'collection',
    SEARCH: 'search',
    SEO: 'seo',
    MARKETING: 'marketing',
    CUSTOM: 'custom',
  } as const,

  // Tag visibility
  PRODUCT_TAG_VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    ADMIN_ONLY: 'admin_only',
  } as const,

  // Tag sort
  PRODUCT_TAG_SORT: {
    NAME: 'name',
    NAME_DESC: 'name_desc',
    CREATED_AT: 'created_at',
    CREATED_AT_DESC: 'created_at_desc',
    PRODUCT_COUNT: 'product_count',
    PRODUCT_COUNT_DESC: 'product_count_desc',
    POPULARITY: 'popularity',
    POPULARITY_DESC: 'popularity_desc',
  } as const,
} as const;

export type ProductTagStatus =
  (typeof PRODUCT_TAG.PRODUCT_TAG_STATUS)[keyof typeof PRODUCT_TAG.PRODUCT_TAG_STATUS];
export type ProductTagType =
  (typeof PRODUCT_TAG.PRODUCT_TAG_TYPE)[keyof typeof PRODUCT_TAG.PRODUCT_TAG_TYPE];
export type ProductTagVisibility =
  (typeof PRODUCT_TAG.PRODUCT_TAG_VISIBILITY)[keyof typeof PRODUCT_TAG.PRODUCT_TAG_VISIBILITY];
export type ProductTagSort =
  (typeof PRODUCT_TAG.PRODUCT_TAG_SORT)[keyof typeof PRODUCT_TAG.PRODUCT_TAG_SORT];

export const PRODUCT_TAG_STATUS_LABELS: Record<ProductTagStatus, string> = {
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.ACTIVE]: 'Active',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.INACTIVE]: 'Inactive',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.PENDING]: 'Pending',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.DRAFT]: 'Draft',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.ARCHIVED]: 'Archived',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.DELETED]: 'Deleted',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.FEATURED]: 'Featured',
};

export const PRODUCT_TAG_STATUS_COLORS: Record<ProductTagStatus, string> = {
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.ACTIVE]: '#22c55e',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.INACTIVE]: '#9ca3af',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.PENDING]: '#eab308',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.DRAFT]: '#60a5fa',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.ARCHIVED]: '#6b7280',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.DELETED]: '#ef4444',
  [PRODUCT_TAG.PRODUCT_TAG_STATUS.FEATURED]: '#8b5cf6',
};
