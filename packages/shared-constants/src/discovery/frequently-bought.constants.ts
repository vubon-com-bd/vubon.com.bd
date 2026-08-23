/**
 * Frequently Bought Constants
 * Frequently bought items configuration and settings
 */

export const DISCOVERY_FREQUENTLY_BOUGHT = {
  // Frequently Bought Types
  TYPES: {
    TOGETHER: 'together',
    RELATED: 'related',
    REPLACEMENT: 'replacement',
    ACCESSORY: 'accessory',
    UPGRADE: 'upgrade',
    CUSTOM: 'custom',
  } as const,

  // Frequently Bought Analysis
  ANALYSIS: {
    ASSOCIATION_RULES: 'association_rules',
    MARKET_BASKET: 'market_basket',
    SEQUENTIAL: 'sequential',
    CO_OCCURRENCE: 'co_occurrence',
    CUSTOM: 'custom',
  } as const,

  // Frequently Bought Statuses
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

  // Frequently Bought Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'together',
    DEFAULT_ANALYSIS: 'association_rules',
    DEFAULT_STATUS: 'active',
    DEFAULT_LIMIT: 5,
    DEFAULT_CONFIDENCE: 0.3,
    DEFAULT_SUPPORT: 0.01,
    DEFAULT_LIFT: 1.0,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_UPDATE_INTERVAL: 86400,
    MAX_ITEMS: 20,
    MIN_ITEMS: 1,
    MIN_CONFIDENCE: 0.01,
    MAX_CONFIDENCE: 1.0,
    MIN_SUPPORT: 0.001,
    MAX_SUPPORT: 1.0,
    MIN_LIFT: 0.0,
    MAX_LIFT: 10.0,
  } as const,

  // Frequently Bought Limits
  LIMITS: {
    MAX_ITEMS: 20,
    MIN_ITEMS: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 604800,
    MIN_UPDATE_INTERVAL: 3600,
    MIN_CONFIDENCE: 0.01,
    MAX_CONFIDENCE: 1.0,
    MIN_SUPPORT: 0.001,
    MAX_SUPPORT: 1.0,
    MIN_LIFT: 0.0,
    MAX_LIFT: 10.0,
  } as const,

  // Frequently Bought Errors
  ERRORS: {
    ANALYSIS_FAILED: 'analysis_failed',
    NO_DATA: 'no_data',
    INVALID_TYPE: 'invalid_type',
    INVALID_ANALYSIS: 'invalid_analysis',
    UPDATE_FAILED: 'update_failed',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Frequently Bought Types
export type DiscoveryFrequentlyBoughtType =
  (typeof DISCOVERY_FREQUENTLY_BOUGHT.TYPES)[keyof typeof DISCOVERY_FREQUENTLY_BOUGHT.TYPES];

// Frequently Bought Analysis
export type DiscoveryFrequentlyBoughtAnalysis =
  (typeof DISCOVERY_FREQUENTLY_BOUGHT.ANALYSIS)[keyof typeof DISCOVERY_FREQUENTLY_BOUGHT.ANALYSIS];

// Frequently Bought Statuses
export type DiscoveryFrequentlyBoughtStatus =
  (typeof DISCOVERY_FREQUENTLY_BOUGHT.STATUSES)[keyof typeof DISCOVERY_FREQUENTLY_BOUGHT.STATUSES];

// Frequently Bought Defaults
export type DiscoveryFrequentlyBoughtDefault =
  (typeof DISCOVERY_FREQUENTLY_BOUGHT.DEFAULTS)[keyof typeof DISCOVERY_FREQUENTLY_BOUGHT.DEFAULTS];

// Frequently Bought Limits
export type DiscoveryFrequentlyBoughtLimit =
  (typeof DISCOVERY_FREQUENTLY_BOUGHT.LIMITS)[keyof typeof DISCOVERY_FREQUENTLY_BOUGHT.LIMITS];

// Frequently Bought Errors
export type DiscoveryFrequentlyBoughtError =
  (typeof DISCOVERY_FREQUENTLY_BOUGHT.ERRORS)[keyof typeof DISCOVERY_FREQUENTLY_BOUGHT.ERRORS];

// Utility Functions
export function discoveryFrequentlyBoughtGetTypeLabel(type: DiscoveryFrequentlyBoughtType): string {
  const labels: Record<DiscoveryFrequentlyBoughtType, string> = {
    [DISCOVERY_FREQUENTLY_BOUGHT.TYPES.TOGETHER]: 'Bought Together',
    [DISCOVERY_FREQUENTLY_BOUGHT.TYPES.RELATED]: 'Related',
    [DISCOVERY_FREQUENTLY_BOUGHT.TYPES.REPLACEMENT]: 'Replacement',
    [DISCOVERY_FREQUENTLY_BOUGHT.TYPES.ACCESSORY]: 'Accessory',
    [DISCOVERY_FREQUENTLY_BOUGHT.TYPES.UPGRADE]: 'Upgrade',
    [DISCOVERY_FREQUENTLY_BOUGHT.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Type';
}

export function discoveryFrequentlyBoughtGetAnalysisLabel(
  analysis: DiscoveryFrequentlyBoughtAnalysis
): string {
  const labels: Record<DiscoveryFrequentlyBoughtAnalysis, string> = {
    [DISCOVERY_FREQUENTLY_BOUGHT.ANALYSIS.ASSOCIATION_RULES]: 'Association Rules',
    [DISCOVERY_FREQUENTLY_BOUGHT.ANALYSIS.MARKET_BASKET]: 'Market Basket Analysis',
    [DISCOVERY_FREQUENTLY_BOUGHT.ANALYSIS.SEQUENTIAL]: 'Sequential Analysis',
    [DISCOVERY_FREQUENTLY_BOUGHT.ANALYSIS.CO_OCCURRENCE]: 'Co-Occurrence Analysis',
    [DISCOVERY_FREQUENTLY_BOUGHT.ANALYSIS.CUSTOM]: 'Custom',
  };
  return labels[analysis] || 'Unknown Analysis';
}

export function discoveryFrequentlyBoughtGetStatusLabel(
  status: DiscoveryFrequentlyBoughtStatus
): string {
  const labels: Record<DiscoveryFrequentlyBoughtStatus, string> = {
    [DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.ANALYZING]: 'Analyzing',
    [DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.ANALYZED]: 'Analyzed',
    [DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.UPDATING]: 'Updating',
    [DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.UPDATED]: 'Updated',
    [DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.FAILED]: 'Failed',
    [DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.EXPIRED]: 'Expired',
    [DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.INACTIVE]: 'Inactive',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryFrequentlyBoughtGetErrorLabel(
  error: DiscoveryFrequentlyBoughtError
): string {
  const labels: Record<DiscoveryFrequentlyBoughtError, string> = {
    [DISCOVERY_FREQUENTLY_BOUGHT.ERRORS.ANALYSIS_FAILED]: 'Analysis Failed',
    [DISCOVERY_FREQUENTLY_BOUGHT.ERRORS.NO_DATA]: 'No Data',
    [DISCOVERY_FREQUENTLY_BOUGHT.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [DISCOVERY_FREQUENTLY_BOUGHT.ERRORS.INVALID_ANALYSIS]: 'Invalid Analysis',
    [DISCOVERY_FREQUENTLY_BOUGHT.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_FREQUENTLY_BOUGHT.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryFrequentlyBoughtIsActive(
  status: DiscoveryFrequentlyBoughtStatus
): boolean {
  return status === DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.ACTIVE;
}

export function discoveryFrequentlyBoughtIsAnalyzed(
  status: DiscoveryFrequentlyBoughtStatus
): boolean {
  const analyzedStatuses: DiscoveryFrequentlyBoughtStatus[] = [
    DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.ANALYZED,
    DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.UPDATED,
    DISCOVERY_FREQUENTLY_BOUGHT.STATUSES.ACTIVE,
  ];
  return analyzedStatuses.includes(status);
}

export function discoveryFrequentlyBoughtGetDefaultLimit(): number {
  return DISCOVERY_FREQUENTLY_BOUGHT.DEFAULTS.DEFAULT_LIMIT;
}

export function discoveryFrequentlyBoughtGetDefaultConfidence(): number {
  return DISCOVERY_FREQUENTLY_BOUGHT.DEFAULTS.DEFAULT_CONFIDENCE;
}
