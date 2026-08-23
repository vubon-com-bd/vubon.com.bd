/**
 * Recommendation Constants
 * Core recommendation configuration and settings
 */

export const DISCOVERY_RECOMMENDATION = {
  // Recommendation Types
  TYPES: {
    PERSONALIZED: 'personalized',
    POPULAR: 'popular',
    TRENDING: 'trending',
    SEASONAL: 'seasonal',
    EDITORIAL: 'editorial',
    ALGORITHMIC: 'algorithmic',
    AI_DRIVEN: 'ai_driven',
    HYBRID: 'hybrid',
    COLLABORATIVE: 'collaborative',
    CONTENT_BASED: 'content_based',
    CUSTOM: 'custom',
  } as const,

  // Recommendation Categories
  CATEGORIES: {
    PRODUCT: 'product',
    CONTENT: 'content',
    SERVICE: 'service',
    EXPERIENCE: 'experience',
    OFFER: 'offer',
    DEAL: 'deal',
    COLLECTION: 'collection',
    CUSTOM: 'custom',
  } as const,

  // Recommendation Statuses
  STATUSES: {
    GENERATING: 'generating',
    GENERATED: 'generated',
    REFRESHING: 'refreshing',
    REFRESHED: 'refreshed',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
  } as const,

  // Recommendation Scores
  SCORES: {
    MIN: 0,
    MAX: 100,
    THRESHOLD_HIGH: 80,
    THRESHOLD_MEDIUM: 50,
    THRESHOLD_LOW: 20,
    DEFAULT: 50,
  } as const,

  // Recommendation Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'personalized',
    DEFAULT_CATEGORY: 'product',
    DEFAULT_STATUS: 'generated',
    DEFAULT_SCORE: 50,
    DEFAULT_LIMIT: 20,
    DEFAULT_OFFSET: 0,
    MAX_RECOMMENDATIONS: 100,
    MIN_RECOMMENDATIONS: 1,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_REFRESH_INTERVAL: 86400,
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    DEFAULT_DIVERSITY: 0.5,
    DEFAULT_NOVELTY: 0.5,
    DEFAULT_SERPENDIPITY: 0.3,
  } as const,

  // Recommendation Limits
  LIMITS: {
    MAX_RECOMMENDATIONS: 100,
    MIN_RECOMMENDATIONS: 1,
    MAX_REFRESH_INTERVAL: 604800,
    MIN_REFRESH_INTERVAL: 300,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_DIVERSITY: 1.0,
    MIN_DIVERSITY: 0.0,
    MAX_NOVELTY: 1.0,
    MIN_NOVELTY: 0.0,
    MAX_SERPENDIPITY: 1.0,
    MIN_SERPENDIPITY: 0.0,
  } as const,

  // Recommendation Errors
  ERRORS: {
    GENERATION_FAILED: 'generation_failed',
    REFRESH_FAILED: 'refresh_failed',
    NO_RECOMMENDATIONS: 'no_recommendations',
    INVALID_CONFIG: 'invalid_config',
    INVALID_USER: 'invalid_user',
    INVALID_CONTEXT: 'invalid_context',
    ALGORITHM_ERROR: 'algorithm_error',
    DATA_ERROR: 'data_error',
    TIMEOUT: 'timeout',
  } as const,
} as const;

// Recommendation Types
export type DiscoveryRecommendationType =
  (typeof DISCOVERY_RECOMMENDATION.TYPES)[keyof typeof DISCOVERY_RECOMMENDATION.TYPES];

// Recommendation Categories
export type DiscoveryRecommendationCategory =
  (typeof DISCOVERY_RECOMMENDATION.CATEGORIES)[keyof typeof DISCOVERY_RECOMMENDATION.CATEGORIES];

// Recommendation Statuses
export type DiscoveryRecommendationStatus =
  (typeof DISCOVERY_RECOMMENDATION.STATUSES)[keyof typeof DISCOVERY_RECOMMENDATION.STATUSES];

// Recommendation Scores
export type DiscoveryRecommendationScore =
  (typeof DISCOVERY_RECOMMENDATION.SCORES)[keyof typeof DISCOVERY_RECOMMENDATION.SCORES];

// Recommendation Defaults
export type DiscoveryRecommendationDefault =
  (typeof DISCOVERY_RECOMMENDATION.DEFAULTS)[keyof typeof DISCOVERY_RECOMMENDATION.DEFAULTS];

// Recommendation Limits
export type DiscoveryRecommendationLimit =
  (typeof DISCOVERY_RECOMMENDATION.LIMITS)[keyof typeof DISCOVERY_RECOMMENDATION.LIMITS];

// Recommendation Errors
export type DiscoveryRecommendationError =
  (typeof DISCOVERY_RECOMMENDATION.ERRORS)[keyof typeof DISCOVERY_RECOMMENDATION.ERRORS];

// Utility Functions
export function discoveryRecommendationGetTypeLabel(type: DiscoveryRecommendationType): string {
  const labels: Record<DiscoveryRecommendationType, string> = {
    [DISCOVERY_RECOMMENDATION.TYPES.PERSONALIZED]: 'Personalized',
    [DISCOVERY_RECOMMENDATION.TYPES.POPULAR]: 'Popular',
    [DISCOVERY_RECOMMENDATION.TYPES.TRENDING]: 'Trending',
    [DISCOVERY_RECOMMENDATION.TYPES.SEASONAL]: 'Seasonal',
    [DISCOVERY_RECOMMENDATION.TYPES.EDITORIAL]: 'Editorial',
    [DISCOVERY_RECOMMENDATION.TYPES.ALGORITHMIC]: 'Algorithmic',
    [DISCOVERY_RECOMMENDATION.TYPES.AI_DRIVEN]: 'AI Driven',
    [DISCOVERY_RECOMMENDATION.TYPES.HYBRID]: 'Hybrid',
    [DISCOVERY_RECOMMENDATION.TYPES.COLLABORATIVE]: 'Collaborative',
    [DISCOVERY_RECOMMENDATION.TYPES.CONTENT_BASED]: 'Content Based',
    [DISCOVERY_RECOMMENDATION.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Recommendation Type';
}

export function discoveryRecommendationGetCategoryLabel(
  category: DiscoveryRecommendationCategory
): string {
  const labels: Record<DiscoveryRecommendationCategory, string> = {
    [DISCOVERY_RECOMMENDATION.CATEGORIES.PRODUCT]: 'Product',
    [DISCOVERY_RECOMMENDATION.CATEGORIES.CONTENT]: 'Content',
    [DISCOVERY_RECOMMENDATION.CATEGORIES.SERVICE]: 'Service',
    [DISCOVERY_RECOMMENDATION.CATEGORIES.EXPERIENCE]: 'Experience',
    [DISCOVERY_RECOMMENDATION.CATEGORIES.OFFER]: 'Offer',
    [DISCOVERY_RECOMMENDATION.CATEGORIES.DEAL]: 'Deal',
    [DISCOVERY_RECOMMENDATION.CATEGORIES.COLLECTION]: 'Collection',
    [DISCOVERY_RECOMMENDATION.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function discoveryRecommendationGetStatusLabel(
  status: DiscoveryRecommendationStatus
): string {
  const labels: Record<DiscoveryRecommendationStatus, string> = {
    [DISCOVERY_RECOMMENDATION.STATUSES.GENERATING]: 'Generating',
    [DISCOVERY_RECOMMENDATION.STATUSES.GENERATED]: 'Generated',
    [DISCOVERY_RECOMMENDATION.STATUSES.REFRESHING]: 'Refreshing',
    [DISCOVERY_RECOMMENDATION.STATUSES.REFRESHED]: 'Refreshed',
    [DISCOVERY_RECOMMENDATION.STATUSES.FAILED]: 'Failed',
    [DISCOVERY_RECOMMENDATION.STATUSES.EXPIRED]: 'Expired',
    [DISCOVERY_RECOMMENDATION.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_RECOMMENDATION.STATUSES.INACTIVE]: 'Inactive',
    [DISCOVERY_RECOMMENDATION.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryRecommendationGetErrorLabel(error: DiscoveryRecommendationError): string {
  const labels: Record<DiscoveryRecommendationError, string> = {
    [DISCOVERY_RECOMMENDATION.ERRORS.GENERATION_FAILED]: 'Generation Failed',
    [DISCOVERY_RECOMMENDATION.ERRORS.REFRESH_FAILED]: 'Refresh Failed',
    [DISCOVERY_RECOMMENDATION.ERRORS.NO_RECOMMENDATIONS]: 'No Recommendations',
    [DISCOVERY_RECOMMENDATION.ERRORS.INVALID_CONFIG]: 'Invalid Config',
    [DISCOVERY_RECOMMENDATION.ERRORS.INVALID_USER]: 'Invalid User',
    [DISCOVERY_RECOMMENDATION.ERRORS.INVALID_CONTEXT]: 'Invalid Context',
    [DISCOVERY_RECOMMENDATION.ERRORS.ALGORITHM_ERROR]: 'Algorithm Error',
    [DISCOVERY_RECOMMENDATION.ERRORS.DATA_ERROR]: 'Data Error',
    [DISCOVERY_RECOMMENDATION.ERRORS.TIMEOUT]: 'Timeout',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryRecommendationIsActive(status: DiscoveryRecommendationStatus): boolean {
  return status === DISCOVERY_RECOMMENDATION.STATUSES.ACTIVE;
}

export function discoveryRecommendationIsGenerated(status: DiscoveryRecommendationStatus): boolean {
  const generatedStatuses: DiscoveryRecommendationStatus[] = [
    DISCOVERY_RECOMMENDATION.STATUSES.GENERATED,
    DISCOVERY_RECOMMENDATION.STATUSES.REFRESHED,
    DISCOVERY_RECOMMENDATION.STATUSES.ACTIVE,
  ];
  return generatedStatuses.includes(status);
}

export function discoveryRecommendationGetDefaultLimit(): number {
  return DISCOVERY_RECOMMENDATION.DEFAULTS.DEFAULT_LIMIT;
}

export function discoveryRecommendationGetDefaultScore(): number {
  return DISCOVERY_RECOMMENDATION.DEFAULTS.DEFAULT_SCORE;
}
