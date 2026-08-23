/**
 * Complementary Constants
 * Complementary items configuration and settings
 */

export const DISCOVERY_COMPLEMENTARY = {
  // Complementary Types
  TYPES: {
    PRODUCTS: 'products',
    SERVICES: 'services',
    ACCESSORIES: 'accessories',
    ADDONS: 'addons',
    BUNDLES: 'bundles',
    CUSTOM: 'custom',
  } as const,

  // Complementary Statuses
  STATUSES: {
    ANALYZING: 'analyzing',
    ANALYZED: 'analyzed',
    UPDATING: 'updating',
    UPDATED: 'updated',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
  } as const,

  // Complementary Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'products',
    DEFAULT_STATUS: 'active',
    DEFAULT_LIMIT: 5,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_UPDATE_INTERVAL: 86400,
    MAX_ITEMS: 20,
    MIN_ITEMS: 1,
    DEFAULT_RELEVANCE_THRESHOLD: 0.5,
    MIN_RELEVANCE_THRESHOLD: 0.1,
    MAX_RELEVANCE_THRESHOLD: 1.0,
  } as const,

  // Complementary Limits
  LIMITS: {
    MAX_ITEMS: 20,
    MIN_ITEMS: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 604800,
    MIN_UPDATE_INTERVAL: 3600,
    MIN_RELEVANCE_THRESHOLD: 0.1,
    MAX_RELEVANCE_THRESHOLD: 1.0,
  } as const,

  // Complementary Errors
  ERRORS: {
    ANALYSIS_FAILED: 'analysis_failed',
    NO_COMPLEMENTARY_ITEMS: 'no_complementary_items',
    INVALID_TYPE: 'invalid_type',
    UPDATE_FAILED: 'update_failed',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Complementary Types
export type DiscoveryComplementaryType =
  (typeof DISCOVERY_COMPLEMENTARY.TYPES)[keyof typeof DISCOVERY_COMPLEMENTARY.TYPES];

// Complementary Statuses
export type DiscoveryComplementaryStatus =
  (typeof DISCOVERY_COMPLEMENTARY.STATUSES)[keyof typeof DISCOVERY_COMPLEMENTARY.STATUSES];

// Complementary Defaults
export type DiscoveryComplementaryDefault =
  (typeof DISCOVERY_COMPLEMENTARY.DEFAULTS)[keyof typeof DISCOVERY_COMPLEMENTARY.DEFAULTS];

// Complementary Limits
export type DiscoveryComplementaryLimit =
  (typeof DISCOVERY_COMPLEMENTARY.LIMITS)[keyof typeof DISCOVERY_COMPLEMENTARY.LIMITS];

// Complementary Errors
export type DiscoveryComplementaryError =
  (typeof DISCOVERY_COMPLEMENTARY.ERRORS)[keyof typeof DISCOVERY_COMPLEMENTARY.ERRORS];

// Utility Functions
export function discoveryComplementaryGetTypeLabel(type: DiscoveryComplementaryType): string {
  const labels: Record<DiscoveryComplementaryType, string> = {
    [DISCOVERY_COMPLEMENTARY.TYPES.PRODUCTS]: 'Products',
    [DISCOVERY_COMPLEMENTARY.TYPES.SERVICES]: 'Services',
    [DISCOVERY_COMPLEMENTARY.TYPES.ACCESSORIES]: 'Accessories',
    [DISCOVERY_COMPLEMENTARY.TYPES.ADDONS]: 'Add-ons',
    [DISCOVERY_COMPLEMENTARY.TYPES.BUNDLES]: 'Bundles',
    [DISCOVERY_COMPLEMENTARY.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Type';
}

export function discoveryComplementaryGetStatusLabel(status: DiscoveryComplementaryStatus): string {
  const labels: Record<DiscoveryComplementaryStatus, string> = {
    [DISCOVERY_COMPLEMENTARY.STATUSES.ANALYZING]: 'Analyzing',
    [DISCOVERY_COMPLEMENTARY.STATUSES.ANALYZED]: 'Analyzed',
    [DISCOVERY_COMPLEMENTARY.STATUSES.UPDATING]: 'Updating',
    [DISCOVERY_COMPLEMENTARY.STATUSES.UPDATED]: 'Updated',
    [DISCOVERY_COMPLEMENTARY.STATUSES.FAILED]: 'Failed',
    [DISCOVERY_COMPLEMENTARY.STATUSES.EXPIRED]: 'Expired',
    [DISCOVERY_COMPLEMENTARY.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_COMPLEMENTARY.STATUSES.INACTIVE]: 'Inactive',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryComplementaryGetErrorLabel(error: DiscoveryComplementaryError): string {
  const labels: Record<DiscoveryComplementaryError, string> = {
    [DISCOVERY_COMPLEMENTARY.ERRORS.ANALYSIS_FAILED]: 'Analysis Failed',
    [DISCOVERY_COMPLEMENTARY.ERRORS.NO_COMPLEMENTARY_ITEMS]: 'No Complementary Items',
    [DISCOVERY_COMPLEMENTARY.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [DISCOVERY_COMPLEMENTARY.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_COMPLEMENTARY.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryComplementaryIsActive(status: DiscoveryComplementaryStatus): boolean {
  return status === DISCOVERY_COMPLEMENTARY.STATUSES.ACTIVE;
}

export function discoveryComplementaryIsAnalyzed(status: DiscoveryComplementaryStatus): boolean {
  const analyzedStatuses: DiscoveryComplementaryStatus[] = [
    DISCOVERY_COMPLEMENTARY.STATUSES.ANALYZED,
    DISCOVERY_COMPLEMENTARY.STATUSES.UPDATED,
    DISCOVERY_COMPLEMENTARY.STATUSES.ACTIVE,
  ];
  return analyzedStatuses.includes(status);
}

export function discoveryComplementaryGetDefaultLimit(): number {
  return DISCOVERY_COMPLEMENTARY.DEFAULTS.DEFAULT_LIMIT;
}
