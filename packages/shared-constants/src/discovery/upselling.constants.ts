/**
 * Upselling Constants
 * Upselling configuration and settings
 */

export const DISCOVERY_UPSELLING = {
  // Upselling Types
  TYPES: {
    PRODUCT: 'product',
    SERVICE: 'service',
    PLAN: 'plan',
    FEATURE: 'feature',
    VERSION: 'version',
    ADDON: 'addon',
    CUSTOM: 'custom',
  } as const,

  // Upselling Strategies
  STRATEGIES: {
    VALUE_BASED: 'value_based',
    FEATURE_BASED: 'feature_based',
    PRICE_BASED: 'price_based',
    NEED_BASED: 'need_based',
    BEHAVIOR_BASED: 'behavior_based',
    AI_DRIVEN: 'ai_driven',
    CUSTOM: 'custom',
  } as const,

  // Upselling Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ANALYZING: 'analyzing',
    ANALYZED: 'analyzed',
    UPDATING: 'updating',
    UPDATED: 'updated',
    FAILED: 'failed',
    EXPIRED: 'expired',
  } as const,

  // Upselling Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'product',
    DEFAULT_STRATEGY: 'value_based',
    DEFAULT_STATUS: 'active',
    DEFAULT_LIMIT: 3,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_UPDATE_INTERVAL: 86400,
    MAX_ITEMS: 10,
    MIN_ITEMS: 1,
    DEFAULT_UPSELL_VALUE_THRESHOLD: 1.2,
    MIN_UPSELL_VALUE_THRESHOLD: 1.0,
    MAX_UPSELL_VALUE_THRESHOLD: 5.0,
    DEFAULT_CONFIDENCE_THRESHOLD: 0.5,
    MIN_CONFIDENCE_THRESHOLD: 0.3,
    MAX_CONFIDENCE_THRESHOLD: 1.0,
  } as const,

  // Upselling Limits
  LIMITS: {
    MAX_ITEMS: 10,
    MIN_ITEMS: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 604800,
    MIN_UPDATE_INTERVAL: 3600,
    MIN_UPSELL_VALUE_THRESHOLD: 1.0,
    MAX_UPSELL_VALUE_THRESHOLD: 5.0,
    MIN_CONFIDENCE_THRESHOLD: 0.3,
    MAX_CONFIDENCE_THRESHOLD: 1.0,
  } as const,

  // Upselling Errors
  ERRORS: {
    ANALYSIS_FAILED: 'analysis_failed',
    NO_UPSELL_ITEMS: 'no_upsell_items',
    INVALID_TYPE: 'invalid_type',
    INVALID_STRATEGY: 'invalid_strategy',
    UPDATE_FAILED: 'update_failed',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Upselling Types
export type DiscoveryUpsellingType =
  (typeof DISCOVERY_UPSELLING.TYPES)[keyof typeof DISCOVERY_UPSELLING.TYPES];

// Upselling Strategies
export type DiscoveryUpsellingStrategy =
  (typeof DISCOVERY_UPSELLING.STRATEGIES)[keyof typeof DISCOVERY_UPSELLING.STRATEGIES];

// Upselling Statuses
export type DiscoveryUpsellingStatus =
  (typeof DISCOVERY_UPSELLING.STATUSES)[keyof typeof DISCOVERY_UPSELLING.STATUSES];

// Upselling Defaults
export type DiscoveryUpsellingDefault =
  (typeof DISCOVERY_UPSELLING.DEFAULTS)[keyof typeof DISCOVERY_UPSELLING.DEFAULTS];

// Upselling Limits
export type DiscoveryUpsellingLimit =
  (typeof DISCOVERY_UPSELLING.LIMITS)[keyof typeof DISCOVERY_UPSELLING.LIMITS];

// Upselling Errors
export type DiscoveryUpsellingError =
  (typeof DISCOVERY_UPSELLING.ERRORS)[keyof typeof DISCOVERY_UPSELLING.ERRORS];

// Utility Functions
export function discoveryUpsellingGetTypeLabel(type: DiscoveryUpsellingType): string {
  const labels: Record<DiscoveryUpsellingType, string> = {
    [DISCOVERY_UPSELLING.TYPES.PRODUCT]: 'Product',
    [DISCOVERY_UPSELLING.TYPES.SERVICE]: 'Service',
    [DISCOVERY_UPSELLING.TYPES.PLAN]: 'Plan',
    [DISCOVERY_UPSELLING.TYPES.FEATURE]: 'Feature',
    [DISCOVERY_UPSELLING.TYPES.VERSION]: 'Version',
    [DISCOVERY_UPSELLING.TYPES.ADDON]: 'Add-on',
    [DISCOVERY_UPSELLING.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Type';
}

export function discoveryUpsellingGetStrategyLabel(strategy: DiscoveryUpsellingStrategy): string {
  const labels: Record<DiscoveryUpsellingStrategy, string> = {
    [DISCOVERY_UPSELLING.STRATEGIES.VALUE_BASED]: 'Value Based',
    [DISCOVERY_UPSELLING.STRATEGIES.FEATURE_BASED]: 'Feature Based',
    [DISCOVERY_UPSELLING.STRATEGIES.PRICE_BASED]: 'Price Based',
    [DISCOVERY_UPSELLING.STRATEGIES.NEED_BASED]: 'Need Based',
    [DISCOVERY_UPSELLING.STRATEGIES.BEHAVIOR_BASED]: 'Behavior Based',
    [DISCOVERY_UPSELLING.STRATEGIES.AI_DRIVEN]: 'AI Driven',
    [DISCOVERY_UPSELLING.STRATEGIES.CUSTOM]: 'Custom',
  };
  return labels[strategy] || 'Unknown Strategy';
}

export function discoveryUpsellingGetStatusLabel(status: DiscoveryUpsellingStatus): string {
  const labels: Record<DiscoveryUpsellingStatus, string> = {
    [DISCOVERY_UPSELLING.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_UPSELLING.STATUSES.INACTIVE]: 'Inactive',
    [DISCOVERY_UPSELLING.STATUSES.ANALYZING]: 'Analyzing',
    [DISCOVERY_UPSELLING.STATUSES.ANALYZED]: 'Analyzed',
    [DISCOVERY_UPSELLING.STATUSES.UPDATING]: 'Updating',
    [DISCOVERY_UPSELLING.STATUSES.UPDATED]: 'Updated',
    [DISCOVERY_UPSELLING.STATUSES.FAILED]: 'Failed',
    [DISCOVERY_UPSELLING.STATUSES.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryUpsellingGetErrorLabel(error: DiscoveryUpsellingError): string {
  const labels: Record<DiscoveryUpsellingError, string> = {
    [DISCOVERY_UPSELLING.ERRORS.ANALYSIS_FAILED]: 'Analysis Failed',
    [DISCOVERY_UPSELLING.ERRORS.NO_UPSELL_ITEMS]: 'No Upsell Items',
    [DISCOVERY_UPSELLING.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [DISCOVERY_UPSELLING.ERRORS.INVALID_STRATEGY]: 'Invalid Strategy',
    [DISCOVERY_UPSELLING.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_UPSELLING.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryUpsellingIsActive(status: DiscoveryUpsellingStatus): boolean {
  return status === DISCOVERY_UPSELLING.STATUSES.ACTIVE;
}

export function discoveryUpsellingIsAnalyzed(status: DiscoveryUpsellingStatus): boolean {
  const analyzedStatuses: DiscoveryUpsellingStatus[] = [
    DISCOVERY_UPSELLING.STATUSES.ANALYZED,
    DISCOVERY_UPSELLING.STATUSES.UPDATED,
    DISCOVERY_UPSELLING.STATUSES.ACTIVE,
  ];
  return analyzedStatuses.includes(status);
}

export function discoveryUpsellingGetDefaultLimit(): number {
  return DISCOVERY_UPSELLING.DEFAULTS.DEFAULT_LIMIT;
}
