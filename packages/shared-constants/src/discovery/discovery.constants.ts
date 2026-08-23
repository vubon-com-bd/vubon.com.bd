/**
 * Discovery Constants
 * Core discovery configuration and settings
 */

export const DISCOVERY = {
  // Discovery Types
  TYPES: {
    RECOMMENDATION: 'recommendation',
    PERSONALIZATION: 'personalization',
    TRENDING: 'trending',
    POPULAR: 'popular',
    RECENTLY_VIEWED: 'recently_viewed',
    FREQUENTLY_BOUGHT: 'frequently_bought',
    COMPLEMENTARY: 'complementary',
    SUBSTITUTE: 'substitute',
    UPSELLING: 'upselling',
    CROSS_SELLING: 'cross_selling',
    BUNDLE: 'bundle',
    TRENDING_NOW: 'trending_now',
    SEASONAL: 'seasonal',
    EDITORIAL: 'editorial',
    CUSTOM: 'custom',
  } as const,

  // Discovery Categories
  CATEGORIES: {
    PRODUCT: 'product',
    CONTENT: 'content',
    USER: 'user',
    BEHAVIORAL: 'behavioral',
    CONTEXTUAL: 'contextual',
    COLLABORATIVE: 'collaborative',
    CONTENT_BASED: 'content_based',
    HYBRID: 'hybrid',
  } as const,

  // Discovery Sources
  SOURCES: {
    USER_HISTORY: 'user_history',
    USER_PREFERENCES: 'user_preferences',
    USER_BEHAVIOR: 'user_behavior',
    SOCIAL_INTERACTIONS: 'social_interactions',
    DEMOGRAPHICS: 'demographics',
    LOCATION: 'location',
    DEVICE: 'device',
    TIME: 'time',
    SEASON: 'season',
    TRENDING: 'trending',
    POPULARITY: 'popularity',
    EDITORIAL: 'editorial',
    ALGORITHMIC: 'algorithmic',
    AI_DRIVEN: 'ai_driven',
    CUSTOM: 'custom',
  } as const,

  // Discovery Statuses
  STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    DRAFT: 'draft',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SCHEDULED: 'scheduled',
  } as const,

  // Discovery Algorithms
  ALGORITHMS: {
    COLLABORATIVE_FILTERING: 'collaborative_filtering',
    CONTENT_BASED_FILTERING: 'content_based_filtering',
    HYBRID_FILTERING: 'hybrid_filtering',
    ASSOCIATION_RULES: 'association_rules',
    DECISION_TREES: 'decision_trees',
    RANDOM_FOREST: 'random_forest',
    NEURAL_NETWORKS: 'neural_networks',
    DEEP_LEARNING: 'deep_learning',
    MATRIX_FACTORIZATION: 'matrix_factorization',
    K_MEANS: 'k_means',
    DBSCAN: 'dbscan',
    HIERARCHICAL: 'hierarchical',
    BAYESIAN: 'bayesian',
    RULE_BASED: 'rule_based',
    CUSTOM: 'custom',
  } as const,

  // Discovery Confidence Levels
  CONFIDENCE: {
    VERY_LOW: 0,
    LOW: 25,
    MEDIUM: 50,
    HIGH: 75,
    VERY_HIGH: 90,
    MAXIMUM: 100,
  } as const,

  // Discovery Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'recommendation',
    DEFAULT_CATEGORY: 'product',
    DEFAULT_SOURCE: 'user_history',
    DEFAULT_STATUS: 'draft',
    DEFAULT_ALGORITHM: 'collaborative_filtering',
    DEFAULT_CONFIDENCE: 50,
    DEFAULT_LIMIT: 20,
    DEFAULT_OFFSET: 0,
    MAX_RECOMMENDATIONS: 100,
    MIN_RECOMMENDATIONS: 1,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_BATCH_SIZE: 100,
    MAX_DIVERSITY: 1.0,
    MIN_DIVERSITY: 0.0,
    DEFAULT_DIVERSITY: 0.5,
    DEFAULT_NOVELTY: 0.5,
    DEFAULT_SERPENDIPITY: 0.3,
    DEFAULT_PERSONALIZATION_WEIGHT: 0.7,
    DEFAULT_POPULARITY_WEIGHT: 0.3,
  } as const,

  // Discovery Limits
  LIMITS: {
    MAX_RECOMMENDATIONS: 100,
    MIN_RECOMMENDATIONS: 1,
    MAX_BATCH_SIZE: 1000,
    MIN_BATCH_SIZE: 1,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_DIVERSITY: 1.0,
    MIN_DIVERSITY: 0.0,
    MAX_NOVELTY: 1.0,
    MIN_NOVELTY: 0.0,
    MAX_SERPENDIPITY: 1.0,
    MIN_SERPENDIPITY: 0.0,
    MAX_PERSONALIZATION_WEIGHT: 1.0,
    MIN_PERSONALIZATION_WEIGHT: 0.0,
    MAX_POPULARITY_WEIGHT: 1.0,
    MIN_POPULARITY_WEIGHT: 0.0,
  } as const,
} as const;

// Discovery Types
export type DiscoveryType = (typeof DISCOVERY.TYPES)[keyof typeof DISCOVERY.TYPES];

// Discovery Categories
export type DiscoveryCategory = (typeof DISCOVERY.CATEGORIES)[keyof typeof DISCOVERY.CATEGORIES];

// Discovery Sources
export type DiscoverySource = (typeof DISCOVERY.SOURCES)[keyof typeof DISCOVERY.SOURCES];

// Discovery Statuses
export type DiscoveryStatus = (typeof DISCOVERY.STATUSES)[keyof typeof DISCOVERY.STATUSES];

// Discovery Algorithms
export type DiscoveryAlgorithm = (typeof DISCOVERY.ALGORITHMS)[keyof typeof DISCOVERY.ALGORITHMS];

// Discovery Confidence Levels
export type DiscoveryConfidence = (typeof DISCOVERY.CONFIDENCE)[keyof typeof DISCOVERY.CONFIDENCE];

// Discovery Defaults
export type DiscoveryDefault = (typeof DISCOVERY.DEFAULTS)[keyof typeof DISCOVERY.DEFAULTS];

// Discovery Limits
export type DiscoveryLimit = (typeof DISCOVERY.LIMITS)[keyof typeof DISCOVERY.LIMITS];

// Utility Functions
export function discoveryGetTypeLabel(type: DiscoveryType): string {
  const labels: Record<DiscoveryType, string> = {
    [DISCOVERY.TYPES.RECOMMENDATION]: 'Recommendation',
    [DISCOVERY.TYPES.PERSONALIZATION]: 'Personalization',
    [DISCOVERY.TYPES.TRENDING]: 'Trending',
    [DISCOVERY.TYPES.POPULAR]: 'Popular',
    [DISCOVERY.TYPES.RECENTLY_VIEWED]: 'Recently Viewed',
    [DISCOVERY.TYPES.FREQUENTLY_BOUGHT]: 'Frequently Bought',
    [DISCOVERY.TYPES.COMPLEMENTARY]: 'Complementary',
    [DISCOVERY.TYPES.SUBSTITUTE]: 'Substitute',
    [DISCOVERY.TYPES.UPSELLING]: 'Upselling',
    [DISCOVERY.TYPES.CROSS_SELLING]: 'Cross-Selling',
    [DISCOVERY.TYPES.BUNDLE]: 'Bundle',
    [DISCOVERY.TYPES.TRENDING_NOW]: 'Trending Now',
    [DISCOVERY.TYPES.SEASONAL]: 'Seasonal',
    [DISCOVERY.TYPES.EDITORIAL]: 'Editorial',
    [DISCOVERY.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Discovery Type';
}

export function discoveryGetCategoryLabel(category: DiscoveryCategory): string {
  const labels: Record<DiscoveryCategory, string> = {
    [DISCOVERY.CATEGORIES.PRODUCT]: 'Product',
    [DISCOVERY.CATEGORIES.CONTENT]: 'Content',
    [DISCOVERY.CATEGORIES.USER]: 'User',
    [DISCOVERY.CATEGORIES.BEHAVIORAL]: 'Behavioral',
    [DISCOVERY.CATEGORIES.CONTEXTUAL]: 'Contextual',
    [DISCOVERY.CATEGORIES.COLLABORATIVE]: 'Collaborative',
    [DISCOVERY.CATEGORIES.CONTENT_BASED]: 'Content Based',
    [DISCOVERY.CATEGORIES.HYBRID]: 'Hybrid',
  };
  return labels[category] || 'Unknown Category';
}

export function discoveryGetSourceLabel(source: DiscoverySource): string {
  const labels: Record<DiscoverySource, string> = {
    [DISCOVERY.SOURCES.USER_HISTORY]: 'User History',
    [DISCOVERY.SOURCES.USER_PREFERENCES]: 'User Preferences',
    [DISCOVERY.SOURCES.USER_BEHAVIOR]: 'User Behavior',
    [DISCOVERY.SOURCES.SOCIAL_INTERACTIONS]: 'Social Interactions',
    [DISCOVERY.SOURCES.DEMOGRAPHICS]: 'Demographics',
    [DISCOVERY.SOURCES.LOCATION]: 'Location',
    [DISCOVERY.SOURCES.DEVICE]: 'Device',
    [DISCOVERY.SOURCES.TIME]: 'Time',
    [DISCOVERY.SOURCES.SEASON]: 'Season',
    [DISCOVERY.SOURCES.TRENDING]: 'Trending',
    [DISCOVERY.SOURCES.POPULARITY]: 'Popularity',
    [DISCOVERY.SOURCES.EDITORIAL]: 'Editorial',
    [DISCOVERY.SOURCES.ALGORITHMIC]: 'Algorithmic',
    [DISCOVERY.SOURCES.AI_DRIVEN]: 'AI Driven',
    [DISCOVERY.SOURCES.CUSTOM]: 'Custom',
  };
  return labels[source] || 'Unknown Source';
}

export function discoveryGetStatusLabel(status: DiscoveryStatus): string {
  const labels: Record<DiscoveryStatus, string> = {
    [DISCOVERY.STATUSES.PENDING]: 'Pending',
    [DISCOVERY.STATUSES.PROCESSING]: 'Processing',
    [DISCOVERY.STATUSES.COMPLETED]: 'Completed',
    [DISCOVERY.STATUSES.FAILED]: 'Failed',
    [DISCOVERY.STATUSES.CANCELLED]: 'Cancelled',
    [DISCOVERY.STATUSES.ARCHIVED]: 'Archived',
    [DISCOVERY.STATUSES.DRAFT]: 'Draft',
    [DISCOVERY.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY.STATUSES.INACTIVE]: 'Inactive',
    [DISCOVERY.STATUSES.SCHEDULED]: 'Scheduled',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryGetAlgorithmLabel(algorithm: DiscoveryAlgorithm): string {
  const labels: Record<DiscoveryAlgorithm, string> = {
    [DISCOVERY.ALGORITHMS.COLLABORATIVE_FILTERING]: 'Collaborative Filtering',
    [DISCOVERY.ALGORITHMS.CONTENT_BASED_FILTERING]: 'Content Based Filtering',
    [DISCOVERY.ALGORITHMS.HYBRID_FILTERING]: 'Hybrid Filtering',
    [DISCOVERY.ALGORITHMS.ASSOCIATION_RULES]: 'Association Rules',
    [DISCOVERY.ALGORITHMS.DECISION_TREES]: 'Decision Trees',
    [DISCOVERY.ALGORITHMS.RANDOM_FOREST]: 'Random Forest',
    [DISCOVERY.ALGORITHMS.NEURAL_NETWORKS]: 'Neural Networks',
    [DISCOVERY.ALGORITHMS.DEEP_LEARNING]: 'Deep Learning',
    [DISCOVERY.ALGORITHMS.MATRIX_FACTORIZATION]: 'Matrix Factorization',
    [DISCOVERY.ALGORITHMS.K_MEANS]: 'K-Means',
    [DISCOVERY.ALGORITHMS.DBSCAN]: 'DBSCAN',
    [DISCOVERY.ALGORITHMS.HIERARCHICAL]: 'Hierarchical',
    [DISCOVERY.ALGORITHMS.BAYESIAN]: 'Bayesian',
    [DISCOVERY.ALGORITHMS.RULE_BASED]: 'Rule Based',
    [DISCOVERY.ALGORITHMS.CUSTOM]: 'Custom',
  };
  return labels[algorithm] || 'Unknown Algorithm';
}

export function discoveryGetConfidenceLabel(confidence: number): string {
  if (confidence >= DISCOVERY.CONFIDENCE.VERY_HIGH) return 'Very High';
  if (confidence >= DISCOVERY.CONFIDENCE.HIGH) return 'High';
  if (confidence >= DISCOVERY.CONFIDENCE.MEDIUM) return 'Medium';
  if (confidence >= DISCOVERY.CONFIDENCE.LOW) return 'Low';
  return 'Very Low';
}

export function discoveryGetDefaultLimit(): number {
  return DISCOVERY.DEFAULTS.DEFAULT_LIMIT;
}

export function discoveryGetDefaultConfidence(): number {
  return DISCOVERY.DEFAULTS.DEFAULT_CONFIDENCE;
}

export function discoveryIsActive(status: DiscoveryStatus): boolean {
  return status === DISCOVERY.STATUSES.ACTIVE;
}

export function discoveryIsCompleted(status: DiscoveryStatus): boolean {
  return status === DISCOVERY.STATUSES.COMPLETED;
}

export function discoveryIsRecommended(type: DiscoveryType): boolean {
  const recommendationTypes: DiscoveryType[] = [
    DISCOVERY.TYPES.RECOMMENDATION,
    DISCOVERY.TYPES.PERSONALIZATION,
    DISCOVERY.TYPES.COMPLEMENTARY,
    DISCOVERY.TYPES.SUBSTITUTE,
    DISCOVERY.TYPES.UPSELLING,
    DISCOVERY.TYPES.CROSS_SELLING,
    DISCOVERY.TYPES.BUNDLE,
  ];
  return recommendationTypes.includes(type);
}

export function discoveryIsTrending(type: DiscoveryType): boolean {
  const trendingTypes: DiscoveryType[] = [
    DISCOVERY.TYPES.TRENDING,
    DISCOVERY.TYPES.TRENDING_NOW,
    DISCOVERY.TYPES.POPULAR,
  ];
  return trendingTypes.includes(type);
}

export function discoveryIsSeasonal(type: DiscoveryType): boolean {
  return type === DISCOVERY.TYPES.SEASONAL;
}
