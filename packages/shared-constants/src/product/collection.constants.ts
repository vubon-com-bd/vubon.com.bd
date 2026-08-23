/**
 * Collection Constants
 * Product collection configuration and settings
 */

export const PRODUCTCOLLECTION = {
  // Collection Types
  TYPES: {
    MANUAL: 'manual',
    AUTOMATED: 'automated',
    CURATED: 'curated',
    SEASONAL: 'seasonal',
    THEMED: 'themed',
    TRENDING: 'trending',
    BEST_SELLING: 'best_selling',
    NEW_ARRIVALS: 'new_arrivals',
    DISCOUNTED: 'discounted',
    FEATURED: 'featured',
    RECOMMENDED: 'recommended',
    CUSTOM: 'custom',
  } as const,

  // Collection Statuses
  STATUSES: {
    DRAFT: 'draft',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
    SCHEDULED: 'scheduled',
    EXPIRED: 'expired',
  } as const,

  // Collection Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    HIDDEN: 'hidden',
    MEMBERS_ONLY: 'members_only',
    PASSWORD: 'password',
  } as const,

  // Collection Conditions
  CONDITIONS: {
    ALL: 'all',
    ANY: 'any',
    NONE: 'none',
    CUSTOM: 'custom',
  } as const,

  // Collection Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'manual',
    DEFAULT_STATUS: 'active',
    DEFAULT_VISIBILITY: 'public',
    DEFAULT_CONDITION: 'all',
    DEFAULT_SORT_BY: 'manual',
    DEFAULT_SORT_ORDER: 'asc',
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    MAX_PRODUCTS: 1000,
    MAX_CONDITIONS: 10,
    DEFAULT_SCHEDULE_DAYS: 30,
  } as const,

  // Collection Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_PRODUCTS: 1000,
    MAX_CONDITIONS: 10,
    MAX_RULES: 20,
    MAX_SCHEDULES: 5,
    MAX_SLUG_LENGTH: 100,
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  } as const,
} as const;

// Collection Types
export type ProductCollectionType =
  (typeof PRODUCTCOLLECTION.TYPES)[keyof typeof PRODUCTCOLLECTION.TYPES];

// Collection Statuses
export type ProductCollectionStatus =
  (typeof PRODUCTCOLLECTION.STATUSES)[keyof typeof PRODUCTCOLLECTION.STATUSES];

// Collection Visibility
export type ProductCollectionVisibility =
  (typeof PRODUCTCOLLECTION.VISIBILITY)[keyof typeof PRODUCTCOLLECTION.VISIBILITY];

// Collection Conditions
export type ProductCollectionCondition =
  (typeof PRODUCTCOLLECTION.CONDITIONS)[keyof typeof PRODUCTCOLLECTION.CONDITIONS];

// Collection Defaults
export type ProductCollectionDefault =
  (typeof PRODUCTCOLLECTION.DEFAULTS)[keyof typeof PRODUCTCOLLECTION.DEFAULTS];

// Collection Limits
export type ProductCollectionLimit =
  (typeof PRODUCTCOLLECTION.LIMITS)[keyof typeof PRODUCTCOLLECTION.LIMITS];

// Utility Functions
export function productcollectionGetTypeLabel(type: ProductCollectionType): string {
  const labels: Record<ProductCollectionType, string> = {
    [PRODUCTCOLLECTION.TYPES.MANUAL]: 'Manual',
    [PRODUCTCOLLECTION.TYPES.AUTOMATED]: 'Automated',
    [PRODUCTCOLLECTION.TYPES.CURATED]: 'Curated',
    [PRODUCTCOLLECTION.TYPES.SEASONAL]: 'Seasonal',
    [PRODUCTCOLLECTION.TYPES.THEMED]: 'Themed',
    [PRODUCTCOLLECTION.TYPES.TRENDING]: 'Trending',
    [PRODUCTCOLLECTION.TYPES.BEST_SELLING]: 'Best Selling',
    [PRODUCTCOLLECTION.TYPES.NEW_ARRIVALS]: 'New Arrivals',
    [PRODUCTCOLLECTION.TYPES.DISCOUNTED]: 'Discounted',
    [PRODUCTCOLLECTION.TYPES.FEATURED]: 'Featured',
    [PRODUCTCOLLECTION.TYPES.RECOMMENDED]: 'Recommended',
    [PRODUCTCOLLECTION.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Collection Type';
}

export function productcollectionGetStatusLabel(status: ProductCollectionStatus): string {
  const labels: Record<ProductCollectionStatus, string> = {
    [PRODUCTCOLLECTION.STATUSES.DRAFT]: 'Draft',
    [PRODUCTCOLLECTION.STATUSES.ACTIVE]: 'Active',
    [PRODUCTCOLLECTION.STATUSES.INACTIVE]: 'Inactive',
    [PRODUCTCOLLECTION.STATUSES.ARCHIVED]: 'Archived',
    [PRODUCTCOLLECTION.STATUSES.SCHEDULED]: 'Scheduled',
    [PRODUCTCOLLECTION.STATUSES.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown Status';
}

export function productcollectionGetVisibilityLabel(
  visibility: ProductCollectionVisibility
): string {
  const labels: Record<ProductCollectionVisibility, string> = {
    [PRODUCTCOLLECTION.VISIBILITY.PUBLIC]: 'Public',
    [PRODUCTCOLLECTION.VISIBILITY.PRIVATE]: 'Private',
    [PRODUCTCOLLECTION.VISIBILITY.HIDDEN]: 'Hidden',
    [PRODUCTCOLLECTION.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [PRODUCTCOLLECTION.VISIBILITY.PASSWORD]: 'Password Protected',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function productcollectionGetConditionLabel(condition: ProductCollectionCondition): string {
  const labels: Record<ProductCollectionCondition, string> = {
    [PRODUCTCOLLECTION.CONDITIONS.ALL]: 'All',
    [PRODUCTCOLLECTION.CONDITIONS.ANY]: 'Any',
    [PRODUCTCOLLECTION.CONDITIONS.NONE]: 'None',
    [PRODUCTCOLLECTION.CONDITIONS.CUSTOM]: 'Custom',
  };
  return labels[condition] || 'Unknown Condition';
}

export function productcollectionIsActive(status: ProductCollectionStatus): boolean {
  const activeStatuses: ProductCollectionStatus[] = [
    PRODUCTCOLLECTION.STATUSES.ACTIVE,
    PRODUCTCOLLECTION.STATUSES.SCHEDULED,
  ];
  return activeStatuses.includes(status);
}

export function productcollectionIsManual(type: ProductCollectionType): boolean {
  return type === PRODUCTCOLLECTION.TYPES.MANUAL;
}

export function productcollectionIsAutomated(type: ProductCollectionType): boolean {
  return type === PRODUCTCOLLECTION.TYPES.AUTOMATED;
}

export function productcollectionGetDefaultPageSize(): number {
  return PRODUCTCOLLECTION.DEFAULTS.DEFAULT_PAGE_SIZE;
}

export function productcollectionGetMaxPageSize(): number {
  return PRODUCTCOLLECTION.DEFAULTS.MAX_PAGE_SIZE;
}

export function productcollectionGetMaxProducts(): number {
  return PRODUCTCOLLECTION.DEFAULTS.MAX_PRODUCTS;
}
