/**
 * Attribute Constants
 * Attribute configuration and settings
 */

export const PRODUCTATTRIBUTE = {
  // Attribute Types
  TYPES: {
    TEXT: 'text',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    DATE: 'date',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    COLOR: 'color',
    SIZE: 'size',
    WEIGHT: 'weight',
    DIMENSION: 'dimension',
    CUSTOM: 'custom',
  } as const,

  // Attribute Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
  } as const,

  // Attribute Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    FILTER_ONLY: 'filter_only',
    SEARCH_ONLY: 'search_only',
  } as const,

  // Attribute Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'text',
    DEFAULT_STATUS: 'active',
    DEFAULT_VISIBILITY: 'public',
    DEFAULT_IS_FILTERABLE: true,
    DEFAULT_IS_SEARCHABLE: true,
    DEFAULT_IS_REQUIRED: false,
    DEFAULT_IS_UNIQUE: false,
  } as const,

  // Attribute Limits
  LIMITS: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MAX_OPTIONS: 100,
    MAX_DEFAULT_VALUE_LENGTH: 500,
    MAX_DESCRIPTION_LENGTH: 500,
  } as const,
} as const;

// Attribute Types
export type ProductAttributeType =
  (typeof PRODUCTATTRIBUTE.TYPES)[keyof typeof PRODUCTATTRIBUTE.TYPES];

// Attribute Statuses
export type ProductAttributeStatus =
  (typeof PRODUCTATTRIBUTE.STATUSES)[keyof typeof PRODUCTATTRIBUTE.STATUSES];

// Attribute Visibility
export type ProductAttributeVisibility =
  (typeof PRODUCTATTRIBUTE.VISIBILITY)[keyof typeof PRODUCTATTRIBUTE.VISIBILITY];

// Attribute Defaults
export type ProductAttributeDefault =
  (typeof PRODUCTATTRIBUTE.DEFAULTS)[keyof typeof PRODUCTATTRIBUTE.DEFAULTS];

// Attribute Limits
export type ProductAttributeLimit =
  (typeof PRODUCTATTRIBUTE.LIMITS)[keyof typeof PRODUCTATTRIBUTE.LIMITS];

// Utility Functions
export function productattributeGetTypeLabel(type: ProductAttributeType): string {
  const labels: Record<ProductAttributeType, string> = {
    [PRODUCTATTRIBUTE.TYPES.TEXT]: 'Text',
    [PRODUCTATTRIBUTE.TYPES.NUMBER]: 'Number',
    [PRODUCTATTRIBUTE.TYPES.BOOLEAN]: 'Boolean',
    [PRODUCTATTRIBUTE.TYPES.DATE]: 'Date',
    [PRODUCTATTRIBUTE.TYPES.SELECT]: 'Select',
    [PRODUCTATTRIBUTE.TYPES.MULTI_SELECT]: 'Multi-Select',
    [PRODUCTATTRIBUTE.TYPES.COLOR]: 'Color',
    [PRODUCTATTRIBUTE.TYPES.SIZE]: 'Size',
    [PRODUCTATTRIBUTE.TYPES.WEIGHT]: 'Weight',
    [PRODUCTATTRIBUTE.TYPES.DIMENSION]: 'Dimension',
    [PRODUCTATTRIBUTE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Attribute Type';
}

export function productattributeGetStatusLabel(status: ProductAttributeStatus): string {
  const labels: Record<ProductAttributeStatus, string> = {
    [PRODUCTATTRIBUTE.STATUSES.ACTIVE]: 'Active',
    [PRODUCTATTRIBUTE.STATUSES.INACTIVE]: 'Inactive',
    [PRODUCTATTRIBUTE.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function productattributeGetVisibilityLabel(visibility: ProductAttributeVisibility): string {
  const labels: Record<ProductAttributeVisibility, string> = {
    [PRODUCTATTRIBUTE.VISIBILITY.PUBLIC]: 'Public',
    [PRODUCTATTRIBUTE.VISIBILITY.PRIVATE]: 'Private',
    [PRODUCTATTRIBUTE.VISIBILITY.FILTER_ONLY]: 'Filter Only',
    [PRODUCTATTRIBUTE.VISIBILITY.SEARCH_ONLY]: 'Search Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function productattributeIsActive(status: ProductAttributeStatus): boolean {
  return status === PRODUCTATTRIBUTE.STATUSES.ACTIVE;
}

export function productattributeIsFilterable(): boolean {
  return PRODUCTATTRIBUTE.DEFAULTS.DEFAULT_IS_FILTERABLE;
}

export function productattributeIsSearchable(): boolean {
  return PRODUCTATTRIBUTE.DEFAULTS.DEFAULT_IS_SEARCHABLE;
}
