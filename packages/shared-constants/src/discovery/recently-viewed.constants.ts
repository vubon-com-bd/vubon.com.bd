/**
 * Recently Viewed Constants
 * Recently viewed items configuration and settings
 */

export const DISCOVERY_RECENTLY_VIEWED = {
  // Recently Viewed Types
  TYPES: {
    PRODUCTS: 'products',
    CONTENT: 'content',
    CATEGORIES: 'categories',
    BRANDS: 'brands',
    COLLECTIONS: 'collections',
    CUSTOM: 'custom',
  } as const,

  // Recently Viewed Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    TRACKING: 'tracking',
    PAUSED: 'paused',
  } as const,

  // Recently Viewed Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'products',
    DEFAULT_STATUS: 'active',
    DEFAULT_LIMIT: 10,
    MAX_ITEMS_PER_USER: 50,
    MIN_ITEMS_PER_USER: 1,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_EXPIRY_DAYS: 30,
    MAX_EXPIRY_DAYS: 365,
    MIN_EXPIRY_DAYS: 1,
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  } as const,

  // Recently Viewed Limits
  LIMITS: {
    MAX_ITEMS_PER_USER: 50,
    MIN_ITEMS_PER_USER: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_EXPIRY_DAYS: 365,
    MIN_EXPIRY_DAYS: 1,
    MAX_PAGE_SIZE: 100,
    MIN_PAGE_SIZE: 1,
    DEFAULT_PAGE_SIZE: 20,
  } as const,

  // Recently Viewed Errors
  ERRORS: {
    TRACKING_FAILED: 'tracking_failed',
    RETRIEVAL_FAILED: 'retrieval_failed',
    INVALID_USER: 'invalid_user',
    INVALID_ITEM: 'invalid_item',
    CACHE_ERROR: 'cache_error',
    EXPIRY_ERROR: 'expiry_error',
  } as const,
} as const;

// Recently Viewed Types
export type DiscoveryRecentlyViewedType =
  (typeof DISCOVERY_RECENTLY_VIEWED.TYPES)[keyof typeof DISCOVERY_RECENTLY_VIEWED.TYPES];

// Recently Viewed Statuses
export type DiscoveryRecentlyViewedStatus =
  (typeof DISCOVERY_RECENTLY_VIEWED.STATUSES)[keyof typeof DISCOVERY_RECENTLY_VIEWED.STATUSES];

// Recently Viewed Defaults
export type DiscoveryRecentlyViewedDefault =
  (typeof DISCOVERY_RECENTLY_VIEWED.DEFAULTS)[keyof typeof DISCOVERY_RECENTLY_VIEWED.DEFAULTS];

// Recently Viewed Limits
export type DiscoveryRecentlyViewedLimit =
  (typeof DISCOVERY_RECENTLY_VIEWED.LIMITS)[keyof typeof DISCOVERY_RECENTLY_VIEWED.LIMITS];

// Recently Viewed Errors
export type DiscoveryRecentlyViewedError =
  (typeof DISCOVERY_RECENTLY_VIEWED.ERRORS)[keyof typeof DISCOVERY_RECENTLY_VIEWED.ERRORS];

// Utility Functions
export function discoveryRecentlyViewedGetTypeLabel(type: DiscoveryRecentlyViewedType): string {
  const labels: Record<DiscoveryRecentlyViewedType, string> = {
    [DISCOVERY_RECENTLY_VIEWED.TYPES.PRODUCTS]: 'Products',
    [DISCOVERY_RECENTLY_VIEWED.TYPES.CONTENT]: 'Content',
    [DISCOVERY_RECENTLY_VIEWED.TYPES.CATEGORIES]: 'Categories',
    [DISCOVERY_RECENTLY_VIEWED.TYPES.BRANDS]: 'Brands',
    [DISCOVERY_RECENTLY_VIEWED.TYPES.COLLECTIONS]: 'Collections',
    [DISCOVERY_RECENTLY_VIEWED.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Type';
}

export function discoveryRecentlyViewedGetStatusLabel(
  status: DiscoveryRecentlyViewedStatus
): string {
  const labels: Record<DiscoveryRecentlyViewedStatus, string> = {
    [DISCOVERY_RECENTLY_VIEWED.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_RECENTLY_VIEWED.STATUSES.INACTIVE]: 'Inactive',
    [DISCOVERY_RECENTLY_VIEWED.STATUSES.EXPIRED]: 'Expired',
    [DISCOVERY_RECENTLY_VIEWED.STATUSES.ARCHIVED]: 'Archived',
    [DISCOVERY_RECENTLY_VIEWED.STATUSES.TRACKING]: 'Tracking',
    [DISCOVERY_RECENTLY_VIEWED.STATUSES.PAUSED]: 'Paused',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryRecentlyViewedGetErrorLabel(error: DiscoveryRecentlyViewedError): string {
  const labels: Record<DiscoveryRecentlyViewedError, string> = {
    [DISCOVERY_RECENTLY_VIEWED.ERRORS.TRACKING_FAILED]: 'Tracking Failed',
    [DISCOVERY_RECENTLY_VIEWED.ERRORS.RETRIEVAL_FAILED]: 'Retrieval Failed',
    [DISCOVERY_RECENTLY_VIEWED.ERRORS.INVALID_USER]: 'Invalid User',
    [DISCOVERY_RECENTLY_VIEWED.ERRORS.INVALID_ITEM]: 'Invalid Item',
    [DISCOVERY_RECENTLY_VIEWED.ERRORS.CACHE_ERROR]: 'Cache Error',
    [DISCOVERY_RECENTLY_VIEWED.ERRORS.EXPIRY_ERROR]: 'Expiry Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryRecentlyViewedIsActive(status: DiscoveryRecentlyViewedStatus): boolean {
  return status === DISCOVERY_RECENTLY_VIEWED.STATUSES.ACTIVE;
}

export function discoveryRecentlyViewedIsTracking(status: DiscoveryRecentlyViewedStatus): boolean {
  return status === DISCOVERY_RECENTLY_VIEWED.STATUSES.TRACKING;
}

export function discoveryRecentlyViewedGetDefaultLimit(): number {
  return DISCOVERY_RECENTLY_VIEWED.DEFAULTS.DEFAULT_LIMIT;
}

export function discoveryRecentlyViewedGetMaxItems(): number {
  return DISCOVERY_RECENTLY_VIEWED.DEFAULTS.MAX_ITEMS_PER_USER;
}
