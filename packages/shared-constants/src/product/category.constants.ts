/**
 * Category Constants
 * Category configuration and settings
 */

export const PRODUCTCATEGORY = {
  // Category Types
  TYPES: {
    MAIN: 'main',
    SUB: 'sub',
    SUB_SUB: 'sub_sub',
    CUSTOM: 'custom',
  } as const,

  // Category Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
    PENDING: 'pending',
    DRAFT: 'draft',
  } as const,

  // Category Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    HIDDEN: 'hidden',
  } as const,

  // Category Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'main',
    DEFAULT_STATUS: 'active',
    DEFAULT_VISIBILITY: 'public',
    MAX_DEPTH: 5,
    MAX_CHILDREN: 100,
    DEFAULT_SORT_ORDER: 'asc',
    DEFAULT_SORT_BY: 'name',
  } as const,

  // Category Limits
  LIMITS: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_DEPTH: 5,
    MAX_CHILDREN: 100,
    MAX_SLUG_LENGTH: 100,
  } as const,
} as const;

// Category Types
export type ProductCategoryType =
  (typeof PRODUCTCATEGORY.TYPES)[keyof typeof PRODUCTCATEGORY.TYPES];

// Category Statuses
export type ProductCategoryStatus =
  (typeof PRODUCTCATEGORY.STATUSES)[keyof typeof PRODUCTCATEGORY.STATUSES];

// Category Visibility
export type ProductCategoryVisibility =
  (typeof PRODUCTCATEGORY.VISIBILITY)[keyof typeof PRODUCTCATEGORY.VISIBILITY];

// Category Defaults
export type ProductCategoryDefault =
  (typeof PRODUCTCATEGORY.DEFAULTS)[keyof typeof PRODUCTCATEGORY.DEFAULTS];

// Category Limits
export type ProductCategoryLimit =
  (typeof PRODUCTCATEGORY.LIMITS)[keyof typeof PRODUCTCATEGORY.LIMITS];

// Utility Functions
export function productcategoryGetTypeLabel(type: ProductCategoryType): string {
  const labels: Record<ProductCategoryType, string> = {
    [PRODUCTCATEGORY.TYPES.MAIN]: 'Main Category',
    [PRODUCTCATEGORY.TYPES.SUB]: 'Sub Category',
    [PRODUCTCATEGORY.TYPES.SUB_SUB]: 'Sub-Sub Category',
    [PRODUCTCATEGORY.TYPES.CUSTOM]: 'Custom Category',
  };
  return labels[type] || 'Unknown Category Type';
}

export function productcategoryGetStatusLabel(status: ProductCategoryStatus): string {
  const labels: Record<ProductCategoryStatus, string> = {
    [PRODUCTCATEGORY.STATUSES.ACTIVE]: 'Active',
    [PRODUCTCATEGORY.STATUSES.INACTIVE]: 'Inactive',
    [PRODUCTCATEGORY.STATUSES.ARCHIVED]: 'Archived',
    [PRODUCTCATEGORY.STATUSES.PENDING]: 'Pending',
    [PRODUCTCATEGORY.STATUSES.DRAFT]: 'Draft',
  };
  return labels[status] || 'Unknown Status';
}

export function productcategoryGetVisibilityLabel(visibility: ProductCategoryVisibility): string {
  const labels: Record<ProductCategoryVisibility, string> = {
    [PRODUCTCATEGORY.VISIBILITY.PUBLIC]: 'Public',
    [PRODUCTCATEGORY.VISIBILITY.PRIVATE]: 'Private',
    [PRODUCTCATEGORY.VISIBILITY.HIDDEN]: 'Hidden',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function productcategoryIsActive(status: ProductCategoryStatus): boolean {
  return status === PRODUCTCATEGORY.STATUSES.ACTIVE;
}

export function productcategoryGetMaxDepth(): number {
  return PRODUCTCATEGORY.DEFAULTS.MAX_DEPTH;
}
