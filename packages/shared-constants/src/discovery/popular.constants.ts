/**
 * Popular Constants
 * Popular items configuration and settings
 */

export const DISCOVERY_POPULAR = {
  // Popular Types
  TYPES: {
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    BRANDS: 'brands',
    SEARCHES: 'searches',
    VIEWS: 'views',
    PURCHASES: 'purchases',
    REVIEWS: 'reviews',
    RATINGS: 'ratings',
    WISHLISTS: 'wishlists',
    CUSTOM: 'custom',
  } as const,

  // Popular Metrics
  METRICS: {
    VIEWS: 'views',
    PURCHASES: 'purchases',
    REVIEWS: 'reviews',
    RATINGS: 'ratings',
    WISHLISTS: 'wishlists',
    SHARES: 'shares',
    CLICKS: 'clicks',
    CONVERSIONS: 'conversions',
    REVENUE: 'revenue',
    ENGAGEMENT: 'engagement',
  } as const,

  // Popular Statuses
  STATUSES: {
    CALCULATING: 'calculating',
    CALCULATED: 'calculated',
    UPDATING: 'updating',
    UPDATED: 'updated',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  } as const,

  // Popular Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'products',
    DEFAULT_METRIC: 'purchases',
    DEFAULT_STATUS: 'active',
    DEFAULT_LIMIT: 10,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_UPDATE_INTERVAL: 86400,
    MAX_POPULAR_ITEMS: 100,
    MIN_POPULAR_ITEMS: 1,
    DEFAULT_MIN_SCORE: 1,
    DEFAULT_MAX_SCORE: 100,
  } as const,

  // Popular Limits
  LIMITS: {
    MAX_POPULAR_ITEMS: 100,
    MIN_POPULAR_ITEMS: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 604800,
    MIN_UPDATE_INTERVAL: 3600,
    DEFAULT_MIN_SCORE: 1,
    DEFAULT_MAX_SCORE: 100,
  } as const,

  // Popular Errors
  ERRORS: {
    CALCULATION_FAILED: 'calculation_failed',
    NO_DATA: 'no_data',
    INVALID_METRIC: 'invalid_metric',
    INVALID_TYPE: 'invalid_type',
    UPDATE_FAILED: 'update_failed',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Popular Types
export type DiscoveryPopularType =
  (typeof DISCOVERY_POPULAR.TYPES)[keyof typeof DISCOVERY_POPULAR.TYPES];

// Popular Metrics
export type DiscoveryPopularMetric =
  (typeof DISCOVERY_POPULAR.METRICS)[keyof typeof DISCOVERY_POPULAR.METRICS];

// Popular Statuses
export type DiscoveryPopularStatus =
  (typeof DISCOVERY_POPULAR.STATUSES)[keyof typeof DISCOVERY_POPULAR.STATUSES];

// Popular Defaults
export type DiscoveryPopularDefault =
  (typeof DISCOVERY_POPULAR.DEFAULTS)[keyof typeof DISCOVERY_POPULAR.DEFAULTS];

// Popular Limits
export type DiscoveryPopularLimit =
  (typeof DISCOVERY_POPULAR.LIMITS)[keyof typeof DISCOVERY_POPULAR.LIMITS];

// Popular Errors
export type DiscoveryPopularError =
  (typeof DISCOVERY_POPULAR.ERRORS)[keyof typeof DISCOVERY_POPULAR.ERRORS];

// Utility Functions
export function discoveryPopularGetTypeLabel(type: DiscoveryPopularType): string {
  const labels: Record<DiscoveryPopularType, string> = {
    [DISCOVERY_POPULAR.TYPES.PRODUCTS]: 'Products',
    [DISCOVERY_POPULAR.TYPES.CATEGORIES]: 'Categories',
    [DISCOVERY_POPULAR.TYPES.BRANDS]: 'Brands',
    [DISCOVERY_POPULAR.TYPES.SEARCHES]: 'Searches',
    [DISCOVERY_POPULAR.TYPES.VIEWS]: 'Views',
    [DISCOVERY_POPULAR.TYPES.PURCHASES]: 'Purchases',
    [DISCOVERY_POPULAR.TYPES.REVIEWS]: 'Reviews',
    [DISCOVERY_POPULAR.TYPES.RATINGS]: 'Ratings',
    [DISCOVERY_POPULAR.TYPES.WISHLISTS]: 'Wishlists',
    [DISCOVERY_POPULAR.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Popular Type';
}

export function discoveryPopularGetMetricLabel(metric: DiscoveryPopularMetric): string {
  const labels: Record<DiscoveryPopularMetric, string> = {
    [DISCOVERY_POPULAR.METRICS.VIEWS]: 'Views',
    [DISCOVERY_POPULAR.METRICS.PURCHASES]: 'Purchases',
    [DISCOVERY_POPULAR.METRICS.REVIEWS]: 'Reviews',
    [DISCOVERY_POPULAR.METRICS.RATINGS]: 'Ratings',
    [DISCOVERY_POPULAR.METRICS.WISHLISTS]: 'Wishlists',
    [DISCOVERY_POPULAR.METRICS.SHARES]: 'Shares',
    [DISCOVERY_POPULAR.METRICS.CLICKS]: 'Clicks',
    [DISCOVERY_POPULAR.METRICS.CONVERSIONS]: 'Conversions',
    [DISCOVERY_POPULAR.METRICS.REVENUE]: 'Revenue',
    [DISCOVERY_POPULAR.METRICS.ENGAGEMENT]: 'Engagement',
  };
  return labels[metric] || 'Unknown Metric';
}

export function discoveryPopularGetStatusLabel(status: DiscoveryPopularStatus): string {
  const labels: Record<DiscoveryPopularStatus, string> = {
    [DISCOVERY_POPULAR.STATUSES.CALCULATING]: 'Calculating',
    [DISCOVERY_POPULAR.STATUSES.CALCULATED]: 'Calculated',
    [DISCOVERY_POPULAR.STATUSES.UPDATING]: 'Updating',
    [DISCOVERY_POPULAR.STATUSES.UPDATED]: 'Updated',
    [DISCOVERY_POPULAR.STATUSES.FAILED]: 'Failed',
    [DISCOVERY_POPULAR.STATUSES.EXPIRED]: 'Expired',
    [DISCOVERY_POPULAR.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_POPULAR.STATUSES.INACTIVE]: 'Inactive',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryPopularGetErrorLabel(error: DiscoveryPopularError): string {
  const labels: Record<DiscoveryPopularError, string> = {
    [DISCOVERY_POPULAR.ERRORS.CALCULATION_FAILED]: 'Calculation Failed',
    [DISCOVERY_POPULAR.ERRORS.NO_DATA]: 'No Data',
    [DISCOVERY_POPULAR.ERRORS.INVALID_METRIC]: 'Invalid Metric',
    [DISCOVERY_POPULAR.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [DISCOVERY_POPULAR.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_POPULAR.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryPopularIsActive(status: DiscoveryPopularStatus): boolean {
  return status === DISCOVERY_POPULAR.STATUSES.ACTIVE;
}

export function discoveryPopularIsCalculated(status: DiscoveryPopularStatus): boolean {
  const calculatedStatuses: DiscoveryPopularStatus[] = [
    DISCOVERY_POPULAR.STATUSES.CALCULATED,
    DISCOVERY_POPULAR.STATUSES.UPDATED,
    DISCOVERY_POPULAR.STATUSES.ACTIVE,
  ];
  return calculatedStatuses.includes(status);
}

export function discoveryPopularGetDefaultLimit(): number {
  return DISCOVERY_POPULAR.DEFAULTS.DEFAULT_LIMIT;
}
