/**
 * Product Brand Constants (EXTENDS common/status + common/types + common/permissions)
 * @module shared-constants/business/product/brand.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { VERIFICATION } from '../../common/verification.constants';

export const PRODUCT_BRAND = {
  // Base status from common
  STATUS: STATUS,

  // Types from common
  TYPES: TYPES,

  // Permissions from common
  PERMISSIONS: PERMISSIONS,

  // Verification from common
  VERIFICATION: VERIFICATION,

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
