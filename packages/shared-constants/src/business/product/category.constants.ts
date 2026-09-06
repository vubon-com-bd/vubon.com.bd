/**
 * Product Category Constants (EXTENDS common/status + common/types)
 * @module shared-constants/business/product/category.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { PERMISSIONS } from '../../common/permissions.constants';

export const PRODUCT_CATEGORY = {
  // Base status from common
  STATUS: STATUS,

  // Types from common
  TYPES: TYPES,

  // Permissions from common
  PERMISSIONS: PERMISSIONS,

  // Category specific
  MAX_CATEGORY_NAME_LENGTH: 100,
  MIN_CATEGORY_NAME_LENGTH: 2,
  MAX_CATEGORY_DESCRIPTION_LENGTH: 500,
  MAX_CATEGORY_SLUG_LENGTH: 100,
  MAX_CATEGORY_DEPTH: 10,
  MAX_CATEGORIES_PER_LEVEL: 50,
  DEFAULT_CATEGORY_STATUS: 'active',
  CATEGORY_CACHE_TTL: 3600,

  // Category types
  PRODUCT_CATEGORY_TYPE: {
    PRODUCT: 'product',
    SERVICE: 'service',
    DIGITAL: 'digital',
    PHYSICAL: 'physical',
    SUBSCRIPTION: 'subscription',
    BUNDLE: 'bundle',
    KIT: 'kit',
  } as const,

  // Category status
  PRODUCT_CATEGORY_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DRAFT: 'draft',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
    HIDDEN: 'hidden',
    FEATURED: 'featured',
  } as const,

  // Category visibility
  PRODUCT_CATEGORY_VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    RESTRICTED: 'restricted',
    MEMBERS_ONLY: 'members_only',
    ADMIN_ONLY: 'admin_only',
  } as const,

  // Category sort options
  PRODUCT_CATEGORY_SORT: {
    NAME: 'name',
    NAME_DESC: 'name_desc',
    CREATED_AT: 'created_at',
    CREATED_AT_DESC: 'created_at_desc',
    UPDATED_AT: 'updated_at',
    UPDATED_AT_DESC: 'updated_at_desc',
    PRODUCT_COUNT: 'product_count',
    PRODUCT_COUNT_DESC: 'product_count_desc',
    POSITION: 'position',
    POSITION_DESC: 'position_desc',
  } as const,
} as const;

export type ProductCategoryType =
  (typeof PRODUCT_CATEGORY.PRODUCT_CATEGORY_TYPE)[keyof typeof PRODUCT_CATEGORY.PRODUCT_CATEGORY_TYPE];
export type ProductCategoryStatus =
  (typeof PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS)[keyof typeof PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS];
export type ProductCategoryVisibility =
  (typeof PRODUCT_CATEGORY.PRODUCT_CATEGORY_VISIBILITY)[keyof typeof PRODUCT_CATEGORY.PRODUCT_CATEGORY_VISIBILITY];
export type ProductCategorySort =
  (typeof PRODUCT_CATEGORY.PRODUCT_CATEGORY_SORT)[keyof typeof PRODUCT_CATEGORY.PRODUCT_CATEGORY_SORT];

export const PRODUCT_CATEGORY_STATUS_LABELS: Record<ProductCategoryStatus, string> = {
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.ACTIVE]: 'Active',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.INACTIVE]: 'Inactive',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.PENDING]: 'Pending',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.DRAFT]: 'Draft',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.ARCHIVED]: 'Archived',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.DELETED]: 'Deleted',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.HIDDEN]: 'Hidden',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.FEATURED]: 'Featured',
};

export const PRODUCT_CATEGORY_STATUS_COLORS: Record<ProductCategoryStatus, string> = {
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.ACTIVE]: '#22c55e',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.INACTIVE]: '#9ca3af',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.PENDING]: '#eab308',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.DRAFT]: '#60a5fa',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.ARCHIVED]: '#6b7280',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.DELETED]: '#ef4444',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.HIDDEN]: '#6b7280',
  [PRODUCT_CATEGORY.PRODUCT_CATEGORY_STATUS.FEATURED]: '#8b5cf6',
};
