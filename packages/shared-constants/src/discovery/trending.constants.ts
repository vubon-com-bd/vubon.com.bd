/**
 * Trending Constants
 * Trending configuration and settings
 */

export const DISCOVERY_TRENDING = {
  // Trending Types
  TYPES: {
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    BRANDS: 'brands',
    SEARCHES: 'searches',
    VIEWS: 'views',
    PURCHASES: 'purchases',
    REVIEWS: 'reviews',
    SOCIAL: 'social',
    CUSTOM: 'custom',
  } as const,

  // Trending Periods
  PERIODS: {
    LAST_HOUR: 'last_hour',
    LAST_24_HOURS: 'last_24_hours',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    CUSTOM: 'custom',
  } as const,

  // Trending Statuses
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

  // Trending Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'products',
    DEFAULT_PERIOD: 'last_24_hours',
    DEFAULT_STATUS: 'active',
    DEFAULT_LIMIT: 10,
    DEFAULT_SCORE_THRESHOLD: 10,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_UPDATE_INTERVAL: 3600,
    MAX_TRENDING_ITEMS: 100,
    MIN_TRENDING_ITEMS: 1,
    DEFAULT_MIN_SCORE: 1,
    DEFAULT_MAX_SCORE: 100,
  } as const,

  // Trending Limits
  LIMITS: {
    MAX_TRENDING_ITEMS: 100,
    MIN_TRENDING_ITEMS: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 86400,
    MIN_UPDATE_INTERVAL: 300,
    DEFAULT_MIN_SCORE: 1,
    DEFAULT_MAX_SCORE: 100,
  } as const,

  // Trending Errors
  ERRORS: {
    CALCULATION_FAILED: 'calculation_failed',
    NO_DATA: 'no_data',
    INVALID_PERIOD: 'invalid_period',
    INVALID_TYPE: 'invalid_type',
    UPDATE_FAILED: 'update_failed',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Trending Types
export type DiscoveryTrendingType =
  (typeof DISCOVERY_TRENDING.TYPES)[keyof typeof DISCOVERY_TRENDING.TYPES];

// Trending Periods
export type DiscoveryTrendingPeriod =
  (typeof DISCOVERY_TRENDING.PERIODS)[keyof typeof DISCOVERY_TRENDING.PERIODS];

// Trending Statuses
export type DiscoveryTrendingStatus =
  (typeof DISCOVERY_TRENDING.STATUSES)[keyof typeof DISCOVERY_TRENDING.STATUSES];

// Trending Defaults
export type DiscoveryTrendingDefault =
  (typeof DISCOVERY_TRENDING.DEFAULTS)[keyof typeof DISCOVERY_TRENDING.DEFAULTS];

// Trending Limits
export type DiscoveryTrendingLimit =
  (typeof DISCOVERY_TRENDING.LIMITS)[keyof typeof DISCOVERY_TRENDING.LIMITS];

// Trending Errors
export type DiscoveryTrendingError =
  (typeof DISCOVERY_TRENDING.ERRORS)[keyof typeof DISCOVERY_TRENDING.ERRORS];

// Utility Functions
export function discoveryTrendingGetTypeLabel(type: DiscoveryTrendingType): string {
  const labels: Record<DiscoveryTrendingType, string> = {
    [DISCOVERY_TRENDING.TYPES.PRODUCTS]: 'Products',
    [DISCOVERY_TRENDING.TYPES.CATEGORIES]: 'Categories',
    [DISCOVERY_TRENDING.TYPES.BRANDS]: 'Brands',
    [DISCOVERY_TRENDING.TYPES.SEARCHES]: 'Searches',
    [DISCOVERY_TRENDING.TYPES.VIEWS]: 'Views',
    [DISCOVERY_TRENDING.TYPES.PURCHASES]: 'Purchases',
    [DISCOVERY_TRENDING.TYPES.REVIEWS]: 'Reviews',
    [DISCOVERY_TRENDING.TYPES.SOCIAL]: 'Social',
    [DISCOVERY_TRENDING.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Trending Type';
}

export function discoveryTrendingGetPeriodLabel(period: DiscoveryTrendingPeriod): string {
  const labels: Record<DiscoveryTrendingPeriod, string> = {
    [DISCOVERY_TRENDING.PERIODS.LAST_HOUR]: 'Last Hour',
    [DISCOVERY_TRENDING.PERIODS.LAST_24_HOURS]: 'Last 24 Hours',
    [DISCOVERY_TRENDING.PERIODS.LAST_7_DAYS]: 'Last 7 Days',
    [DISCOVERY_TRENDING.PERIODS.LAST_30_DAYS]: 'Last 30 Days',
    [DISCOVERY_TRENDING.PERIODS.LAST_90_DAYS]: 'Last 90 Days',
    [DISCOVERY_TRENDING.PERIODS.CUSTOM]: 'Custom',
  };
  return labels[period] || 'Unknown Period';
}

export function discoveryTrendingGetStatusLabel(status: DiscoveryTrendingStatus): string {
  const labels: Record<DiscoveryTrendingStatus, string> = {
    [DISCOVERY_TRENDING.STATUSES.CALCULATING]: 'Calculating',
    [DISCOVERY_TRENDING.STATUSES.CALCULATED]: 'Calculated',
    [DISCOVERY_TRENDING.STATUSES.UPDATING]: 'Updating',
    [DISCOVERY_TRENDING.STATUSES.UPDATED]: 'Updated',
    [DISCOVERY_TRENDING.STATUSES.FAILED]: 'Failed',
    [DISCOVERY_TRENDING.STATUSES.EXPIRED]: 'Expired',
    [DISCOVERY_TRENDING.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_TRENDING.STATUSES.INACTIVE]: 'Inactive',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryTrendingGetErrorLabel(error: DiscoveryTrendingError): string {
  const labels: Record<DiscoveryTrendingError, string> = {
    [DISCOVERY_TRENDING.ERRORS.CALCULATION_FAILED]: 'Calculation Failed',
    [DISCOVERY_TRENDING.ERRORS.NO_DATA]: 'No Data',
    [DISCOVERY_TRENDING.ERRORS.INVALID_PERIOD]: 'Invalid Period',
    [DISCOVERY_TRENDING.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [DISCOVERY_TRENDING.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_TRENDING.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryTrendingIsActive(status: DiscoveryTrendingStatus): boolean {
  return status === DISCOVERY_TRENDING.STATUSES.ACTIVE;
}

export function discoveryTrendingIsCalculated(status: DiscoveryTrendingStatus): boolean {
  const calculatedStatuses: DiscoveryTrendingStatus[] = [
    DISCOVERY_TRENDING.STATUSES.CALCULATED,
    DISCOVERY_TRENDING.STATUSES.UPDATED,
    DISCOVERY_TRENDING.STATUSES.ACTIVE,
  ];
  return calculatedStatuses.includes(status);
}

export function discoveryTrendingGetDefaultLimit(): number {
  return DISCOVERY_TRENDING.DEFAULTS.DEFAULT_LIMIT;
}
