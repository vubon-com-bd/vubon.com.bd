/**
 * Personalization Constants
 * Core personalization configuration and settings
 */

export const DISCOVERY_PERSONALIZATION = {
  // Personalization Types
  TYPES: {
    STATIC: 'static',
    DYNAMIC: 'dynamic',
    REAL_TIME: 'real_time',
    BATCH: 'batch',
    RULE_BASED: 'rule_based',
    AI_BASED: 'ai_based',
    ML_BASED: 'ml_based',
    HYBRID: 'hybrid',
    SEGMENT_BASED: 'segment_based',
    USER_BASED: 'user_based',
    CONTEXT_BASED: 'context_based',
    BEHAVIOR_BASED: 'behavior_based',
    CUSTOM: 'custom',
  } as const,

  // Personalization Categories
  CATEGORIES: {
    USER: 'user',
    CONTENT: 'content',
    EXPERIENCE: 'experience',
    JOURNEY: 'journey',
    COMMUNICATION: 'communication',
    RECOMMENDATION: 'recommendation',
    SEARCH: 'search',
    NAVIGATION: 'navigation',
    LAYOUT: 'layout',
    CUSTOM: 'custom',
  } as const,

  // Personalization Data Sources
  DATA_SOURCES: {
    USER_PROFILE: 'user_profile',
    USER_BEHAVIOR: 'user_behavior',
    USER_PREFERENCES: 'user_preferences',
    USER_HISTORY: 'user_history',
    DEMOGRAPHICS: 'demographics',
    LOCATION: 'location',
    DEVICE: 'device',
    TIME: 'time',
    SEASON: 'season',
    CONTEXT: 'context',
    SOCIAL: 'social',
    SURVEY: 'survey',
    FEEDBACK: 'feedback',
    THIRD_PARTY: 'third_party',
    CUSTOM: 'custom',
  } as const,

  // Personalization Statuses
  STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    FAILED: 'failed',
    ARCHIVED: 'archived',
    DRAFT: 'draft',
    TESTING: 'testing',
    DEPLOYED: 'deployed',
    ROLLBACK: 'rollback',
  } as const,

  // Personalization Strategies
  STRATEGIES: {
    USER_CENTRIC: 'user_centric',
    CONTENT_CENTRIC: 'content_centric',
    HYBRID: 'hybrid',
    CONTEXTUAL: 'contextual',
    BEHAVIORAL: 'behavioral',
    COLLABORATIVE: 'collaborative',
    RULE_BASED: 'rule_based',
    AI_DRIVEN: 'ai_driven',
    ML_DRIVEN: 'ml_driven',
    CUSTOM: 'custom',
  } as const,

  // Personalization Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'dynamic',
    DEFAULT_CATEGORY: 'user',
    DEFAULT_STATUS: 'draft',
    DEFAULT_STRATEGY: 'hybrid',
    DEFAULT_CONFIDENCE: 50,
    DEFAULT_LIMIT: 20,
    DEFAULT_OFFSET: 0,
    MAX_PERSONALIZATIONS: 100,
    MIN_PERSONALIZATIONS: 1,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_BATCH_SIZE: 100,
    DEFAULT_UPDATE_INTERVAL: 3600,
    DEFAULT_PERSONALIZATION_WEIGHT: 0.7,
    DEFAULT_POPULARITY_WEIGHT: 0.3,
    DEFAULT_DIVERSITY_WEIGHT: 0.5,
    DEFAULT_REFRESH_INTERVAL: 86400,
  } as const,

  // Personalization Limits
  LIMITS: {
    MAX_PERSONALIZATIONS: 100,
    MIN_PERSONALIZATIONS: 1,
    MAX_BATCH_SIZE: 1000,
    MIN_BATCH_SIZE: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_UPDATE_INTERVAL: 86400,
    MIN_UPDATE_INTERVAL: 60,
    MAX_REFRESH_INTERVAL: 604800,
    MIN_REFRESH_INTERVAL: 300,
    MAX_PERSONALIZATION_WEIGHT: 1.0,
    MIN_PERSONALIZATION_WEIGHT: 0.0,
    MAX_POPULARITY_WEIGHT: 1.0,
    MIN_POPULARITY_WEIGHT: 0.0,
    MAX_DIVERSITY_WEIGHT: 1.0,
    MIN_DIVERSITY_WEIGHT: 0.0,
  } as const,

  // Personalization Errors
  ERRORS: {
    PERSONALIZATION_FAILED: 'personalization_failed',
    INVALID_USER: 'invalid_user',
    INVALID_CONTEXT: 'invalid_context',
    INVALID_STRATEGY: 'invalid_strategy',
    DATA_ERROR: 'data_error',
    ALGORITHM_ERROR: 'algorithm_error',
    TIMEOUT: 'timeout',
    CONFIG_ERROR: 'config_error',
    DEPLOYMENT_FAILED: 'deployment_failed',
    ROLLBACK_FAILED: 'rollback_failed',
  } as const,
} as const;

// Personalization Types
export type DiscoveryPersonalizationType =
  (typeof DISCOVERY_PERSONALIZATION.TYPES)[keyof typeof DISCOVERY_PERSONALIZATION.TYPES];

// Personalization Categories
export type DiscoveryPersonalizationCategory =
  (typeof DISCOVERY_PERSONALIZATION.CATEGORIES)[keyof typeof DISCOVERY_PERSONALIZATION.CATEGORIES];

// Personalization Data Sources
export type DiscoveryPersonalizationDataSource =
  (typeof DISCOVERY_PERSONALIZATION.DATA_SOURCES)[keyof typeof DISCOVERY_PERSONALIZATION.DATA_SOURCES];

// Personalization Statuses
export type DiscoveryPersonalizationStatus =
  (typeof DISCOVERY_PERSONALIZATION.STATUSES)[keyof typeof DISCOVERY_PERSONALIZATION.STATUSES];

// Personalization Strategies
export type DiscoveryPersonalizationStrategy =
  (typeof DISCOVERY_PERSONALIZATION.STRATEGIES)[keyof typeof DISCOVERY_PERSONALIZATION.STRATEGIES];

// Personalization Defaults
export type DiscoveryPersonalizationDefault =
  (typeof DISCOVERY_PERSONALIZATION.DEFAULTS)[keyof typeof DISCOVERY_PERSONALIZATION.DEFAULTS];

// Personalization Limits
export type DiscoveryPersonalizationLimit =
  (typeof DISCOVERY_PERSONALIZATION.LIMITS)[keyof typeof DISCOVERY_PERSONALIZATION.LIMITS];

// Personalization Errors
export type DiscoveryPersonalizationError =
  (typeof DISCOVERY_PERSONALIZATION.ERRORS)[keyof typeof DISCOVERY_PERSONALIZATION.ERRORS];

// Utility Functions
export function discoveryPersonalizationGetTypeLabel(type: DiscoveryPersonalizationType): string {
  const labels: Record<DiscoveryPersonalizationType, string> = {
    [DISCOVERY_PERSONALIZATION.TYPES.STATIC]: 'Static',
    [DISCOVERY_PERSONALIZATION.TYPES.DYNAMIC]: 'Dynamic',
    [DISCOVERY_PERSONALIZATION.TYPES.REAL_TIME]: 'Real-Time',
    [DISCOVERY_PERSONALIZATION.TYPES.BATCH]: 'Batch',
    [DISCOVERY_PERSONALIZATION.TYPES.RULE_BASED]: 'Rule Based',
    [DISCOVERY_PERSONALIZATION.TYPES.AI_BASED]: 'AI Based',
    [DISCOVERY_PERSONALIZATION.TYPES.ML_BASED]: 'ML Based',
    [DISCOVERY_PERSONALIZATION.TYPES.HYBRID]: 'Hybrid',
    [DISCOVERY_PERSONALIZATION.TYPES.SEGMENT_BASED]: 'Segment Based',
    [DISCOVERY_PERSONALIZATION.TYPES.USER_BASED]: 'User Based',
    [DISCOVERY_PERSONALIZATION.TYPES.CONTEXT_BASED]: 'Context Based',
    [DISCOVERY_PERSONALIZATION.TYPES.BEHAVIOR_BASED]: 'Behavior Based',
    [DISCOVERY_PERSONALIZATION.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Personalization Type';
}

export function discoveryPersonalizationGetCategoryLabel(
  category: DiscoveryPersonalizationCategory
): string {
  const labels: Record<DiscoveryPersonalizationCategory, string> = {
    [DISCOVERY_PERSONALIZATION.CATEGORIES.USER]: 'User',
    [DISCOVERY_PERSONALIZATION.CATEGORIES.CONTENT]: 'Content',
    [DISCOVERY_PERSONALIZATION.CATEGORIES.EXPERIENCE]: 'Experience',
    [DISCOVERY_PERSONALIZATION.CATEGORIES.JOURNEY]: 'Journey',
    [DISCOVERY_PERSONALIZATION.CATEGORIES.COMMUNICATION]: 'Communication',
    [DISCOVERY_PERSONALIZATION.CATEGORIES.RECOMMENDATION]: 'Recommendation',
    [DISCOVERY_PERSONALIZATION.CATEGORIES.SEARCH]: 'Search',
    [DISCOVERY_PERSONALIZATION.CATEGORIES.NAVIGATION]: 'Navigation',
    [DISCOVERY_PERSONALIZATION.CATEGORIES.LAYOUT]: 'Layout',
    [DISCOVERY_PERSONALIZATION.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function discoveryPersonalizationGetDataSourceLabel(
  source: DiscoveryPersonalizationDataSource
): string {
  const labels: Record<DiscoveryPersonalizationDataSource, string> = {
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.USER_PROFILE]: 'User Profile',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.USER_BEHAVIOR]: 'User Behavior',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.USER_PREFERENCES]: 'User Preferences',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.USER_HISTORY]: 'User History',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.DEMOGRAPHICS]: 'Demographics',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.LOCATION]: 'Location',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.DEVICE]: 'Device',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.TIME]: 'Time',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.SEASON]: 'Season',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.CONTEXT]: 'Context',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.SOCIAL]: 'Social',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.SURVEY]: 'Survey',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.FEEDBACK]: 'Feedback',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.THIRD_PARTY]: 'Third Party',
    [DISCOVERY_PERSONALIZATION.DATA_SOURCES.CUSTOM]: 'Custom',
  };
  return labels[source] || 'Unknown Data Source';
}

export function discoveryPersonalizationGetStatusLabel(
  status: DiscoveryPersonalizationStatus
): string {
  const labels: Record<DiscoveryPersonalizationStatus, string> = {
    [DISCOVERY_PERSONALIZATION.STATUSES.PENDING]: 'Pending',
    [DISCOVERY_PERSONALIZATION.STATUSES.PROCESSING]: 'Processing',
    [DISCOVERY_PERSONALIZATION.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_PERSONALIZATION.STATUSES.INACTIVE]: 'Inactive',
    [DISCOVERY_PERSONALIZATION.STATUSES.FAILED]: 'Failed',
    [DISCOVERY_PERSONALIZATION.STATUSES.ARCHIVED]: 'Archived',
    [DISCOVERY_PERSONALIZATION.STATUSES.DRAFT]: 'Draft',
    [DISCOVERY_PERSONALIZATION.STATUSES.TESTING]: 'Testing',
    [DISCOVERY_PERSONALIZATION.STATUSES.DEPLOYED]: 'Deployed',
    [DISCOVERY_PERSONALIZATION.STATUSES.ROLLBACK]: 'Rollback',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryPersonalizationGetStrategyLabel(
  strategy: DiscoveryPersonalizationStrategy
): string {
  const labels: Record<DiscoveryPersonalizationStrategy, string> = {
    [DISCOVERY_PERSONALIZATION.STRATEGIES.USER_CENTRIC]: 'User Centric',
    [DISCOVERY_PERSONALIZATION.STRATEGIES.CONTENT_CENTRIC]: 'Content Centric',
    [DISCOVERY_PERSONALIZATION.STRATEGIES.HYBRID]: 'Hybrid',
    [DISCOVERY_PERSONALIZATION.STRATEGIES.CONTEXTUAL]: 'Contextual',
    [DISCOVERY_PERSONALIZATION.STRATEGIES.BEHAVIORAL]: 'Behavioral',
    [DISCOVERY_PERSONALIZATION.STRATEGIES.COLLABORATIVE]: 'Collaborative',
    [DISCOVERY_PERSONALIZATION.STRATEGIES.RULE_BASED]: 'Rule Based',
    [DISCOVERY_PERSONALIZATION.STRATEGIES.AI_DRIVEN]: 'AI Driven',
    [DISCOVERY_PERSONALIZATION.STRATEGIES.ML_DRIVEN]: 'ML Driven',
    [DISCOVERY_PERSONALIZATION.STRATEGIES.CUSTOM]: 'Custom',
  };
  return labels[strategy] || 'Unknown Strategy';
}

export function discoveryPersonalizationGetErrorLabel(
  error: DiscoveryPersonalizationError
): string {
  const labels: Record<DiscoveryPersonalizationError, string> = {
    [DISCOVERY_PERSONALIZATION.ERRORS.PERSONALIZATION_FAILED]: 'Personalization Failed',
    [DISCOVERY_PERSONALIZATION.ERRORS.INVALID_USER]: 'Invalid User',
    [DISCOVERY_PERSONALIZATION.ERRORS.INVALID_CONTEXT]: 'Invalid Context',
    [DISCOVERY_PERSONALIZATION.ERRORS.INVALID_STRATEGY]: 'Invalid Strategy',
    [DISCOVERY_PERSONALIZATION.ERRORS.DATA_ERROR]: 'Data Error',
    [DISCOVERY_PERSONALIZATION.ERRORS.ALGORITHM_ERROR]: 'Algorithm Error',
    [DISCOVERY_PERSONALIZATION.ERRORS.TIMEOUT]: 'Timeout',
    [DISCOVERY_PERSONALIZATION.ERRORS.CONFIG_ERROR]: 'Config Error',
    [DISCOVERY_PERSONALIZATION.ERRORS.DEPLOYMENT_FAILED]: 'Deployment Failed',
    [DISCOVERY_PERSONALIZATION.ERRORS.ROLLBACK_FAILED]: 'Rollback Failed',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryPersonalizationIsActive(status: DiscoveryPersonalizationStatus): boolean {
  const activeStatuses: DiscoveryPersonalizationStatus[] = [
    DISCOVERY_PERSONALIZATION.STATUSES.ACTIVE,
    DISCOVERY_PERSONALIZATION.STATUSES.DEPLOYED,
  ];
  return activeStatuses.includes(status);
}

export function discoveryPersonalizationIsDeployed(
  status: DiscoveryPersonalizationStatus
): boolean {
  return status === DISCOVERY_PERSONALIZATION.STATUSES.DEPLOYED;
}

export function discoveryPersonalizationGetDefaultLimit(): number {
  return DISCOVERY_PERSONALIZATION.DEFAULTS.DEFAULT_LIMIT;
}
