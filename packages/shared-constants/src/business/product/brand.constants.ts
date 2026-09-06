/**
 * Product Brand Constants (EXTENDS common/status)
 * @module shared-constants/business/product/brand.constants
 */

import { STATUS } from '../../common/status.constants';

export const PRODUCT_BRAND = {
  // Base status from common
  STATUS: STATUS,

  // Brand specific
  MAX_BRAND_NAME_LENGTH: 100,
  MIN_BRAND_NAME_LENGTH: 2,
  MAX_BRAND_DESCRIPTION_LENGTH: 500,
  MAX_BRAND_SLUG_LENGTH: 100,
  DEFAULT_BRAND_STATUS: 'active',
  BRAND_CACHE_TTL: 3600,

  // Brand status
  PRODUCT_BRAND_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DRAFT: 'draft',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
    FEATURED: 'featured',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    SUSPENDED: 'suspended',
  } as const,

  // Brand type
  PRODUCT_BRAND_TYPE: {
    LOCAL: 'local',
    INTERNATIONAL: 'international',
    PREMIUM: 'premium',
    BUDGET: 'budget',
    LUXURY: 'luxury',
    SUSTAINABLE: 'sustainable',
    ORGANIC: 'organic',
    HANDMADE: 'handmade',
  } as const,

  // Brand visibility
  PRODUCT_BRAND_VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    RESTRICTED: 'restricted',
    ADMIN_ONLY: 'admin_only',
  } as const,

  // Brand sort
  PRODUCT_BRAND_SORT: {
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

export type ProductBrandStatus =
  (typeof PRODUCT_BRAND.PRODUCT_BRAND_STATUS)[keyof typeof PRODUCT_BRAND.PRODUCT_BRAND_STATUS];
export type ProductBrandType =
  (typeof PRODUCT_BRAND.PRODUCT_BRAND_TYPE)[keyof typeof PRODUCT_BRAND.PRODUCT_BRAND_TYPE];
export type ProductBrandVisibility =
  (typeof PRODUCT_BRAND.PRODUCT_BRAND_VISIBILITY)[keyof typeof PRODUCT_BRAND.PRODUCT_BRAND_VISIBILITY];
export type ProductBrandSort =
  (typeof PRODUCT_BRAND.PRODUCT_BRAND_SORT)[keyof typeof PRODUCT_BRAND.PRODUCT_BRAND_SORT];

export const PRODUCT_BRAND_STATUS_LABELS: Record<ProductBrandStatus, string> = {
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.ACTIVE]: 'Active',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.INACTIVE]: 'Inactive',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.PENDING]: 'Pending',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.DRAFT]: 'Draft',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.ARCHIVED]: 'Archived',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.DELETED]: 'Deleted',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.FEATURED]: 'Featured',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.VERIFIED]: 'Verified',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.UNVERIFIED]: 'Unverified',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.SUSPENDED]: 'Suspended',
};

export const PRODUCT_BRAND_STATUS_COLORS: Record<ProductBrandStatus, string> = {
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.ACTIVE]: '#22c55e',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.INACTIVE]: '#9ca3af',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.PENDING]: '#eab308',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.DRAFT]: '#60a5fa',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.ARCHIVED]: '#6b7280',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.DELETED]: '#ef4444',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.FEATURED]: '#8b5cf6',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.VERIFIED]: '#22c55e',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.UNVERIFIED]: '#f59e0b',
  [PRODUCT_BRAND.PRODUCT_BRAND_STATUS.SUSPENDED]: '#dc2626',
};
