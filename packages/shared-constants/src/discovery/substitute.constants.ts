/**
 * Substitute Constants
 * Substitute items configuration and settings
 */

export const DISCOVERY_SUBSTITUTE = {
  // Substitute Types
  TYPES: {
    EXACT: 'exact',
    SIMILAR: 'similar',
    ALTERNATIVE: 'alternative',
    CHEAPER: 'cheaper',
    PREMIUM: 'premium',
    CUSTOM: 'custom',
  } as const,

  // Substitute Statuses
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

  // Substitute Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'similar',
    DEFAULT_STATUS: 'active',
    DEFAULT_LIMIT: 5,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_UPDATE_INTERVAL: 86400,
    MAX_ITEMS: 20,
    MIN_ITEMS: 1,
    DEFAULT_SIMILARITY_THRESHOLD: 0.7,
    MIN_SIMILARITY_THRESHOLD: 0.3,
    MAX_SIMILARITY_THRESHOLD: 1.0,
  } as const,

  // Substitute Limits
  LIMITS: {
    MAX_ITEMS: 20,
    MIN_ITEMS: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 604800,
    MIN_UPDATE_INTERVAL: 3600,
    MIN_SIMILARITY_THRESHOLD: 0.3,
    MAX_SIMILARITY_THRESHOLD: 1.0,
  } as const,

  // Substitute Errors
  ERRORS: {
    ANALYSIS_FAILED: 'analysis_failed',
    NO_SUBSTITUTES: 'no_substitutes',
    INVALID_TYPE: 'invalid_type',
    UPDATE_FAILED: 'update_failed',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Substitute Types
export type DiscoverySubstituteType =
  (typeof DISCOVERY_SUBSTITUTE.TYPES)[keyof typeof DISCOVERY_SUBSTITUTE.TYPES];

// Substitute Statuses
export type DiscoverySubstituteStatus =
  (typeof DISCOVERY_SUBSTITUTE.STATUSES)[keyof typeof DISCOVERY_SUBSTITUTE.STATUSES];

// Substitute Defaults
export type DiscoverySubstituteDefault =
  (typeof DISCOVERY_SUBSTITUTE.DEFAULTS)[keyof typeof DISCOVERY_SUBSTITUTE.DEFAULTS];

// Substitute Limits
export type DiscoverySubstituteLimit =
  (typeof DISCOVERY_SUBSTITUTE.LIMITS)[keyof typeof DISCOVERY_SUBSTITUTE.LIMITS];

// Substitute Errors
export type DiscoverySubstituteError =
  (typeof DISCOVERY_SUBSTITUTE.ERRORS)[keyof typeof DISCOVERY_SUBSTITUTE.ERRORS];

// Utility Functions
export function discoverySubstituteGetTypeLabel(type: DiscoverySubstituteType): string {
  const labels: Record<DiscoverySubstituteType, string> = {
    [DISCOVERY_SUBSTITUTE.TYPES.EXACT]: 'Exact',
    [DISCOVERY_SUBSTITUTE.TYPES.SIMILAR]: 'Similar',
    [DISCOVERY_SUBSTITUTE.TYPES.ALTERNATIVE]: 'Alternative',
    [DISCOVERY_SUBSTITUTE.TYPES.CHEAPER]: 'Cheaper',
    [DISCOVERY_SUBSTITUTE.TYPES.PREMIUM]: 'Premium',
    [DISCOVERY_SUBSTITUTE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Type';
}

export function discoverySubstituteGetStatusLabel(status: DiscoverySubstituteStatus): string {
  const labels: Record<DiscoverySubstituteStatus, string> = {
    [DISCOVERY_SUBSTITUTE.STATUSES.ANALYZING]: 'Analyzing',
    [DISCOVERY_SUBSTITUTE.STATUSES.ANALYZED]: 'Analyzed',
    [DISCOVERY_SUBSTITUTE.STATUSES.UPDATING]: 'Updating',
    [DISCOVERY_SUBSTITUTE.STATUSES.UPDATED]: 'Updated',
    [DISCOVERY_SUBSTITUTE.STATUSES.FAILED]: 'Failed',
    [DISCOVERY_SUBSTITUTE.STATUSES.EXPIRED]: 'Expired',
    [DISCOVERY_SUBSTITUTE.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_SUBSTITUTE.STATUSES.INACTIVE]: 'Inactive',
  };
  return labels[status] || 'Unknown Status';
}

export function discoverySubstituteGetErrorLabel(error: DiscoverySubstituteError): string {
  const labels: Record<DiscoverySubstituteError, string> = {
    [DISCOVERY_SUBSTITUTE.ERRORS.ANALYSIS_FAILED]: 'Analysis Failed',
    [DISCOVERY_SUBSTITUTE.ERRORS.NO_SUBSTITUTES]: 'No Substitutes',
    [DISCOVERY_SUBSTITUTE.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [DISCOVERY_SUBSTITUTE.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_SUBSTITUTE.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoverySubstituteIsActive(status: DiscoverySubstituteStatus): boolean {
  return status === DISCOVERY_SUBSTITUTE.STATUSES.ACTIVE;
}

export function discoverySubstituteIsAnalyzed(status: DiscoverySubstituteStatus): boolean {
  const analyzedStatuses: DiscoverySubstituteStatus[] = [
    DISCOVERY_SUBSTITUTE.STATUSES.ANALYZED,
    DISCOVERY_SUBSTITUTE.STATUSES.UPDATED,
    DISCOVERY_SUBSTITUTE.STATUSES.ACTIVE,
  ];
  return analyzedStatuses.includes(status);
}

export function discoverySubstituteGetDefaultLimit(): number {
  return DISCOVERY_SUBSTITUTE.DEFAULTS.DEFAULT_LIMIT;
}
