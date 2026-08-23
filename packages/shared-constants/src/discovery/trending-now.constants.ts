/**
 * Trending Now Constants
 * Trending now items configuration and settings
 */

export const DISCOVERY_TRENDING_NOW = {
  // Trending Now Types
  TYPES: {
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    BRANDS: 'brands',
    SEARCHES: 'searches',
    VIEWS: 'views',
    PURCHASES: 'purchases',
    SOCIAL: 'social',
    NEWS: 'news',
    CUSTOM: 'custom',
  } as const,

  // Trending Now Statuses
  STATUSES: {
    UPDATING: 'updating',
    UPDATED: 'updated',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  } as const,

  // Trending Now Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'products',
    DEFAULT_STATUS: 'active',
    DEFAULT_LIMIT: 10,
    DEFAULT_CACHE_TTL: 300,
    DEFAULT_UPDATE_INTERVAL: 300,
    MAX_ITEMS: 50,
    MIN_ITEMS: 1,
    DEFAULT_SCORE_THRESHOLD: 10,
  } as const,

  // Trending Now Limits
  LIMITS: {
    MAX_ITEMS: 50,
    MIN_ITEMS: 1,
    MAX_CACHE_TTL: 3600,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 3600,
    MIN_UPDATE_INTERVAL: 60,
  } as const,

  // Trending Now Errors
  ERRORS: {
    UPDATE_FAILED: 'update_failed',
    NO_DATA: 'no_data',
    INVALID_TYPE: 'invalid_type',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Trending Now Types
export type DiscoveryTrendingNowType =
  (typeof DISCOVERY_TRENDING_NOW.TYPES)[keyof typeof DISCOVERY_TRENDING_NOW.TYPES];

// Trending Now Statuses
export type DiscoveryTrendingNowStatus =
  (typeof DISCOVERY_TRENDING_NOW.STATUSES)[keyof typeof DISCOVERY_TRENDING_NOW.STATUSES];

// Trending Now Defaults
export type DiscoveryTrendingNowDefault =
  (typeof DISCOVERY_TRENDING_NOW.DEFAULTS)[keyof typeof DISCOVERY_TRENDING_NOW.DEFAULTS];

// Trending Now Limits
export type DiscoveryTrendingNowLimit =
  (typeof DISCOVERY_TRENDING_NOW.LIMITS)[keyof typeof DISCOVERY_TRENDING_NOW.LIMITS];

// Trending Now Errors
export type DiscoveryTrendingNowError =
  (typeof DISCOVERY_TRENDING_NOW.ERRORS)[keyof typeof DISCOVERY_TRENDING_NOW.ERRORS];

// Utility Functions
export function discoveryTrendingNowGetTypeLabel(type: DiscoveryTrendingNowType): string {
  const labels: Record<DiscoveryTrendingNowType, string> = {
    [DISCOVERY_TRENDING_NOW.TYPES.PRODUCTS]: 'Products',
    [DISCOVERY_TRENDING_NOW.TYPES.CATEGORIES]: 'Categories',
    [DISCOVERY_TRENDING_NOW.TYPES.BRANDS]: 'Brands',
    [DISCOVERY_TRENDING_NOW.TYPES.SEARCHES]: 'Searches',
    [DISCOVERY_TRENDING_NOW.TYPES.VIEWS]: 'Views',
    [DISCOVERY_TRENDING_NOW.TYPES.PURCHASES]: 'Purchases',
    [DISCOVERY_TRENDING_NOW.TYPES.SOCIAL]: 'Social',
    [DISCOVERY_TRENDING_NOW.TYPES.NEWS]: 'News',
    [DISCOVERY_TRENDING_NOW.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Type';
}

export function discoveryTrendingNowGetStatusLabel(status: DiscoveryTrendingNowStatus): string {
  const labels: Record<DiscoveryTrendingNowStatus, string> = {
    [DISCOVERY_TRENDING_NOW.STATUSES.UPDATING]: 'Updating',
    [DISCOVERY_TRENDING_NOW.STATUSES.UPDATED]: 'Updated',
    [DISCOVERY_TRENDING_NOW.STATUSES.FAILED]: 'Failed',
    [DISCOVERY_TRENDING_NOW.STATUSES.EXPIRED]: 'Expired',
    [DISCOVERY_TRENDING_NOW.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_TRENDING_NOW.STATUSES.INACTIVE]: 'Inactive',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryTrendingNowGetErrorLabel(error: DiscoveryTrendingNowError): string {
  const labels: Record<DiscoveryTrendingNowError, string> = {
    [DISCOVERY_TRENDING_NOW.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_TRENDING_NOW.ERRORS.NO_DATA]: 'No Data',
    [DISCOVERY_TRENDING_NOW.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [DISCOVERY_TRENDING_NOW.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryTrendingNowIsActive(status: DiscoveryTrendingNowStatus): boolean {
  return status === DISCOVERY_TRENDING_NOW.STATUSES.ACTIVE;
}

export function discoveryTrendingNowIsUpdated(status: DiscoveryTrendingNowStatus): boolean {
  const updatedStatuses: DiscoveryTrendingNowStatus[] = [
    DISCOVERY_TRENDING_NOW.STATUSES.UPDATED,
    DISCOVERY_TRENDING_NOW.STATUSES.ACTIVE,
  ];
  return updatedStatuses.includes(status);
}

export function discoveryTrendingNowGetDefaultLimit(): number {
  return DISCOVERY_TRENDING_NOW.DEFAULTS.DEFAULT_LIMIT;
}

export function discoveryTrendingNowGetDefaultUpdateInterval(): number {
  return DISCOVERY_TRENDING_NOW.DEFAULTS.DEFAULT_UPDATE_INTERVAL;
}
