/**
 * Comparison Constants
 * Product comparison configuration and settings
 */

export const PRODUCTCOMPARISON = {
  // Comparison Types
  TYPES: {
    PRODUCT: 'product',
    VARIANT: 'variant',
    PRICE: 'price',
    FEATURE: 'feature',
    SPECIFICATION: 'specification',
    REVIEW: 'review',
    RATING: 'rating',
    CUSTOM: 'custom',
  } as const,

  // Comparison Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    COMPLETED: 'completed',
    ARCHIVED: 'archived',
  } as const,

  // Comparison Modes
  MODES: {
    SIDE_BY_SIDE: 'side_by_side',
    TABULAR: 'tabular',
    DETAILED: 'detailed',
    SUMMARY: 'summary',
    VISUAL: 'visual',
    CUSTOM: 'custom',
  } as const,

  // Comparison Criteria
  CRITERIA: {
    PRICE: 'price',
    FEATURES: 'features',
    SPECIFICATIONS: 'specifications',
    REVIEWS: 'reviews',
    RATINGS: 'ratings',
    BRAND: 'brand',
    CATEGORY: 'category',
    AVAILABILITY: 'availability',
    SHIPPING: 'shipping',
    WARRANTY: 'warranty',
    CUSTOM: 'custom',
  } as const,

  // Comparison Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'product',
    DEFAULT_STATUS: 'active',
    DEFAULT_MODE: 'side_by_side',
    DEFAULT_MAX_PRODUCTS: 4,
    DEFAULT_MIN_PRODUCTS: 2,
    DEFAULT_CRITERIA: ['price', 'features', 'specifications', 'reviews', 'ratings'],
    MAX_PRODUCTS: 10,
    MIN_PRODUCTS: 2,
    MAX_SAVED_COMPARISONS: 20,
    MAX_SHARED_COMPARISONS: 100,
  } as const,

  // Comparison Limits
  LIMITS: {
    MIN_PRODUCTS: 2,
    MAX_PRODUCTS: 10,
    MAX_CRITERIA: 20,
    MAX_SAVED: 20,
    MAX_SHARED: 100,
    MAX_VIEWS_PER_COMPARISON: 10000,
    MAX_DURATION_DAYS: 30,
  } as const,
} as const;

// Comparison Types
export type ProductComparisonType =
  (typeof PRODUCTCOMPARISON.TYPES)[keyof typeof PRODUCTCOMPARISON.TYPES];

// Comparison Statuses
export type ProductComparisonStatus =
  (typeof PRODUCTCOMPARISON.STATUSES)[keyof typeof PRODUCTCOMPARISON.STATUSES];

// Comparison Modes
export type ProductComparisonMode =
  (typeof PRODUCTCOMPARISON.MODES)[keyof typeof PRODUCTCOMPARISON.MODES];

// Comparison Criteria
export type ProductComparisonCriteria =
  (typeof PRODUCTCOMPARISON.CRITERIA)[keyof typeof PRODUCTCOMPARISON.CRITERIA];

// Comparison Defaults
export type ProductComparisonDefault =
  (typeof PRODUCTCOMPARISON.DEFAULTS)[keyof typeof PRODUCTCOMPARISON.DEFAULTS];

// Comparison Limits
export type ProductComparisonLimit =
  (typeof PRODUCTCOMPARISON.LIMITS)[keyof typeof PRODUCTCOMPARISON.LIMITS];

// Utility Functions
export function productcomparisonGetTypeLabel(type: ProductComparisonType): string {
  const labels: Record<ProductComparisonType, string> = {
    [PRODUCTCOMPARISON.TYPES.PRODUCT]: 'Product',
    [PRODUCTCOMPARISON.TYPES.VARIANT]: 'Variant',
    [PRODUCTCOMPARISON.TYPES.PRICE]: 'Price',
    [PRODUCTCOMPARISON.TYPES.FEATURE]: 'Feature',
    [PRODUCTCOMPARISON.TYPES.SPECIFICATION]: 'Specification',
    [PRODUCTCOMPARISON.TYPES.REVIEW]: 'Review',
    [PRODUCTCOMPARISON.TYPES.RATING]: 'Rating',
    [PRODUCTCOMPARISON.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Comparison Type';
}

export function productcomparisonGetStatusLabel(status: ProductComparisonStatus): string {
  const labels: Record<ProductComparisonStatus, string> = {
    [PRODUCTCOMPARISON.STATUSES.ACTIVE]: 'Active',
    [PRODUCTCOMPARISON.STATUSES.INACTIVE]: 'Inactive',
    [PRODUCTCOMPARISON.STATUSES.COMPLETED]: 'Completed',
    [PRODUCTCOMPARISON.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function productcomparisonGetModeLabel(mode: ProductComparisonMode): string {
  const labels: Record<ProductComparisonMode, string> = {
    [PRODUCTCOMPARISON.MODES.SIDE_BY_SIDE]: 'Side by Side',
    [PRODUCTCOMPARISON.MODES.TABULAR]: 'Tabular',
    [PRODUCTCOMPARISON.MODES.DETAILED]: 'Detailed',
    [PRODUCTCOMPARISON.MODES.SUMMARY]: 'Summary',
    [PRODUCTCOMPARISON.MODES.VISUAL]: 'Visual',
    [PRODUCTCOMPARISON.MODES.CUSTOM]: 'Custom',
  };
  return labels[mode] || 'Unknown Mode';
}

export function productcomparisonGetCriteriaLabel(criteria: ProductComparisonCriteria): string {
  const labels: Record<ProductComparisonCriteria, string> = {
    [PRODUCTCOMPARISON.CRITERIA.PRICE]: 'Price',
    [PRODUCTCOMPARISON.CRITERIA.FEATURES]: 'Features',
    [PRODUCTCOMPARISON.CRITERIA.SPECIFICATIONS]: 'Specifications',
    [PRODUCTCOMPARISON.CRITERIA.REVIEWS]: 'Reviews',
    [PRODUCTCOMPARISON.CRITERIA.RATINGS]: 'Ratings',
    [PRODUCTCOMPARISON.CRITERIA.BRAND]: 'Brand',
    [PRODUCTCOMPARISON.CRITERIA.CATEGORY]: 'Category',
    [PRODUCTCOMPARISON.CRITERIA.AVAILABILITY]: 'Availability',
    [PRODUCTCOMPARISON.CRITERIA.SHIPPING]: 'Shipping',
    [PRODUCTCOMPARISON.CRITERIA.WARRANTY]: 'Warranty',
    [PRODUCTCOMPARISON.CRITERIA.CUSTOM]: 'Custom',
  };
  return labels[criteria] || 'Unknown Criteria';
}

export function productcomparisonIsActive(status: ProductComparisonStatus): boolean {
  return status === PRODUCTCOMPARISON.STATUSES.ACTIVE;
}

export function productcomparisonGetMaxProducts(): number {
  return PRODUCTCOMPARISON.DEFAULTS.MAX_PRODUCTS;
}

export function productcomparisonGetMinProducts(): number {
  return PRODUCTCOMPARISON.DEFAULTS.MIN_PRODUCTS;
}
