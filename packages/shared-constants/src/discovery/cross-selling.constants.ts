/**
 * Cross-Selling Constants
 * Cross-selling configuration and settings
 */

export const DISCOVERY_CROSS_SELLING = {
  // Cross-Selling Types
  TYPES: {
    COMPLEMENTARY: 'complementary',
    ACCESSORY: 'accessory',
    RELATED: 'related',
    FREQUENTLY_BOUGHT: 'frequently_bought',
    RECOMMENDED: 'recommended',
    CUSTOM: 'custom',
  } as const,

  // Cross-Selling Strategies
  STRATEGIES: {
    BASKET_ANALYSIS: 'basket_analysis',
    ASSOCIATION_RULES: 'association_rules',
    CO_OCCURRENCE: 'co_occurrence',
    SEQUENTIAL: 'sequential',
    AI_DRIVEN: 'ai_driven',
    CUSTOM: 'custom',
  } as const,

  // Cross-Selling Statuses
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

  // Cross-Selling Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'complementary',
    DEFAULT_STRATEGY: 'basket_analysis',
    DEFAULT_STATUS: 'active',
    DEFAULT_LIMIT: 3,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_UPDATE_INTERVAL: 86400,
    MAX_ITEMS: 10,
    MIN_ITEMS: 1,
    DEFAULT_CONFIDENCE: 0.3,
    DEFAULT_SUPPORT: 0.01,
    DEFAULT_LIFT: 1.0,
    MIN_CONFIDENCE: 0.1,
    MAX_CONFIDENCE: 1.0,
    MIN_SUPPORT: 0.001,
    MAX_SUPPORT: 1.0,
    MIN_LIFT: 0.0,
    MAX_LIFT: 10.0,
  } as const,

  // Cross-Selling Limits
  LIMITS: {
    MAX_ITEMS: 10,
    MIN_ITEMS: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 604800,
    MIN_UPDATE_INTERVAL: 3600,
    MIN_CONFIDENCE: 0.1,
    MAX_CONFIDENCE: 1.0,
    MIN_SUPPORT: 0.001,
    MAX_SUPPORT: 1.0,
    MIN_LIFT: 0.0,
    MAX_LIFT: 10.0,
  } as const,

  // Cross-Selling Errors
  ERRORS: {
    ANALYSIS_FAILED: 'analysis_failed',
    NO_CROSS_SELL_ITEMS: 'no_cross_sell_items',
    INVALID_TYPE: 'invalid_type',
    INVALID_STRATEGY: 'invalid_strategy',
    UPDATE_FAILED: 'update_failed',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Cross-Selling Types
export type DiscoveryCrossSellingType =
  (typeof DISCOVERY_CROSS_SELLING.TYPES)[keyof typeof DISCOVERY_CROSS_SELLING.TYPES];

// Cross-Selling Strategies
export type DiscoveryCrossSellingStrategy =
  (typeof DISCOVERY_CROSS_SELLING.STRATEGIES)[keyof typeof DISCOVERY_CROSS_SELLING.STRATEGIES];

// Cross-Selling Statuses
export type DiscoveryCrossSellingStatus =
  (typeof DISCOVERY_CROSS_SELLING.STATUSES)[keyof typeof DISCOVERY_CROSS_SELLING.STATUSES];

// Cross-Selling Defaults
export type DiscoveryCrossSellingDefault =
  (typeof DISCOVERY_CROSS_SELLING.DEFAULTS)[keyof typeof DISCOVERY_CROSS_SELLING.DEFAULTS];

// Cross-Selling Limits
export type DiscoveryCrossSellingLimit =
  (typeof DISCOVERY_CROSS_SELLING.LIMITS)[keyof typeof DISCOVERY_CROSS_SELLING.LIMITS];

// Cross-Selling Errors
export type DiscoveryCrossSellingError =
  (typeof DISCOVERY_CROSS_SELLING.ERRORS)[keyof typeof DISCOVERY_CROSS_SELLING.ERRORS];

// Utility Functions
export function discoveryCrossSellingGetTypeLabel(type: DiscoveryCrossSellingType): string {
  const labels: Record<DiscoveryCrossSellingType, string> = {
    [DISCOVERY_CROSS_SELLING.TYPES.COMPLEMENTARY]: 'Complementary',
    [DISCOVERY_CROSS_SELLING.TYPES.ACCESSORY]: 'Accessory',
    [DISCOVERY_CROSS_SELLING.TYPES.RELATED]: 'Related',
    [DISCOVERY_CROSS_SELLING.TYPES.FREQUENTLY_BOUGHT]: 'Frequently Bought',
    [DISCOVERY_CROSS_SELLING.TYPES.RECOMMENDED]: 'Recommended',
    [DISCOVERY_CROSS_SELLING.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Type';
}

export function discoveryCrossSellingGetStrategyLabel(
  strategy: DiscoveryCrossSellingStrategy
): string {
  const labels: Record<DiscoveryCrossSellingStrategy, string> = {
    [DISCOVERY_CROSS_SELLING.STRATEGIES.BASKET_ANALYSIS]: 'Basket Analysis',
    [DISCOVERY_CROSS_SELLING.STRATEGIES.ASSOCIATION_RULES]: 'Association Rules',
    [DISCOVERY_CROSS_SELLING.STRATEGIES.CO_OCCURRENCE]: 'Co-Occurrence',
    [DISCOVERY_CROSS_SELLING.STRATEGIES.SEQUENTIAL]: 'Sequential',
    [DISCOVERY_CROSS_SELLING.STRATEGIES.AI_DRIVEN]: 'AI Driven',
    [DISCOVERY_CROSS_SELLING.STRATEGIES.CUSTOM]: 'Custom',
  };
  return labels[strategy] || 'Unknown Strategy';
}

export function discoveryCrossSellingGetStatusLabel(status: DiscoveryCrossSellingStatus): string {
  const labels: Record<DiscoveryCrossSellingStatus, string> = {
    [DISCOVERY_CROSS_SELLING.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_CROSS_SELLING.STATUSES.INACTIVE]: 'Inactive',
    [DISCOVERY_CROSS_SELLING.STATUSES.ANALYZING]: 'Analyzing',
    [DISCOVERY_CROSS_SELLING.STATUSES.ANALYZED]: 'Analyzed',
    [DISCOVERY_CROSS_SELLING.STATUSES.UPDATING]: 'Updating',
    [DISCOVERY_CROSS_SELLING.STATUSES.UPDATED]: 'Updated',
    [DISCOVERY_CROSS_SELLING.STATUSES.FAILED]: 'Failed',
    [DISCOVERY_CROSS_SELLING.STATUSES.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryCrossSellingGetErrorLabel(error: DiscoveryCrossSellingError): string {
  const labels: Record<DiscoveryCrossSellingError, string> = {
    [DISCOVERY_CROSS_SELLING.ERRORS.ANALYSIS_FAILED]: 'Analysis Failed',
    [DISCOVERY_CROSS_SELLING.ERRORS.NO_CROSS_SELL_ITEMS]: 'No Cross-Sell Items',
    [DISCOVERY_CROSS_SELLING.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [DISCOVERY_CROSS_SELLING.ERRORS.INVALID_STRATEGY]: 'Invalid Strategy',
    [DISCOVERY_CROSS_SELLING.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_CROSS_SELLING.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryCrossSellingIsActive(status: DiscoveryCrossSellingStatus): boolean {
  return status === DISCOVERY_CROSS_SELLING.STATUSES.ACTIVE;
}

export function discoveryCrossSellingIsAnalyzed(status: DiscoveryCrossSellingStatus): boolean {
  const analyzedStatuses: DiscoveryCrossSellingStatus[] = [
    DISCOVERY_CROSS_SELLING.STATUSES.ANALYZED,
    DISCOVERY_CROSS_SELLING.STATUSES.UPDATED,
    DISCOVERY_CROSS_SELLING.STATUSES.ACTIVE,
  ];
  return analyzedStatuses.includes(status);
}

export function discoveryCrossSellingGetDefaultLimit(): number {
  return DISCOVERY_CROSS_SELLING.DEFAULTS.DEFAULT_LIMIT;
}

export function discoveryCrossSellingGetDefaultConfidence(): number {
  return DISCOVERY_CROSS_SELLING.DEFAULTS.DEFAULT_CONFIDENCE;
}
