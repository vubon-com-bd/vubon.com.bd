/**
 * Recommendation Strategy Constants
 * Strategy definitions for recommendations
 */

export const DISCOVERY_RECOMMENDATION_STRATEGY = {
  // Strategy Types
  TYPES: {
    POPULARITY: 'popularity',
    PERSONALIZED: 'personalized',
    CONTEXTUAL: 'contextual',
    COLLABORATIVE: 'collaborative',
    CONTENT_BASED: 'content_based',
    HYBRID: 'hybrid',
    SEASONAL: 'seasonal',
    TRENDING: 'trending',
    EDITORIAL: 'editorial',
    RULE_BASED: 'rule_based',
    AI_DRIVEN: 'ai_driven',
    DIVERSITY: 'diversity',
    NOVELTY: 'novelty',
    SERENDIPITY: 'serendipity',
    CUSTOM: 'custom',
  } as const,

  // Strategy Weights
  WEIGHTS: {
    POPULARITY: 0.3,
    PERSONALIZATION: 0.7,
    CONTEXT: 0.5,
    DIVERSITY: 0.5,
    NOVELTY: 0.5,
    SERENDIPITY: 0.3,
    TRENDING: 0.6,
    SEASONAL: 0.4,
    EDITORIAL: 0.8,
    COLLABORATIVE: 0.6,
    CONTENT_BASED: 0.4,
    HYBRID: 0.5,
  } as const,

  // Strategy Goals
  GOALS: {
    RELEVANCE: 'relevance',
    DIVERSITY: 'diversity',
    NOVELTY: 'novelty',
    SERENDIPITY: 'serendipity',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    DISCOVERY: 'discovery',
    PERSONALIZATION: 'personalization',
    BALANCED: 'balanced',
  } as const,

  // Strategy Metrics
  METRICS: {
    CLICK_THROUGH_RATE: 'click_through_rate',
    CONVERSION_RATE: 'conversion_rate',
    ENGAGEMENT_RATE: 'engagement_rate',
    RETENTION_RATE: 'retention_rate',
    REVENUE_PER_USER: 'revenue_per_user',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    SESSION_DURATION: 'session_duration',
    BOUNCE_RATE: 'bounce_rate',
    SATISFACTION_SCORE: 'satisfaction_score',
    RELEVANCE_SCORE: 'relevance_score',
    DIVERSITY_SCORE: 'diversity_score',
    NOVELTY_SCORE: 'novelty_score',
    SERENDIPITY_SCORE: 'serendipity_score',
  } as const,

  // Strategy Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'personalized',
    DEFAULT_GOAL: 'relevance',
    DEFAULT_WEIGHT_PERSONALIZATION: 0.7,
    DEFAULT_WEIGHT_POPULARITY: 0.3,
    DEFAULT_WEIGHT_DIVERSITY: 0.5,
    DEFAULT_WEIGHT_NOVELTY: 0.5,
    DEFAULT_WEIGHT_SERENDIPITY: 0.3,
    DEFAULT_MIN_DIVERSITY: 0.3,
    DEFAULT_MIN_NOVELTY: 0.2,
    DEFAULT_MIN_SERENDIPITY: 0.1,
    MAX_STRATEGIES: 10,
    MAX_GOALS: 5,
  } as const,

  // Strategy Limits
  LIMITS: {
    MIN_WEIGHT: 0.0,
    MAX_WEIGHT: 1.0,
    MAX_STRATEGIES: 10,
    MAX_GOALS: 5,
    MIN_DIVERSITY: 0.0,
    MAX_DIVERSITY: 1.0,
    MIN_NOVELTY: 0.0,
    MAX_NOVELTY: 1.0,
    MIN_SERENDIPITY: 0.0,
    MAX_SERENDIPITY: 1.0,
  } as const,
} as const;

// Strategy Types
export type DiscoveryRecommendationStrategyType =
  (typeof DISCOVERY_RECOMMENDATION_STRATEGY.TYPES)[keyof typeof DISCOVERY_RECOMMENDATION_STRATEGY.TYPES];

// Strategy Weights
export type DiscoveryRecommendationStrategyWeight =
  (typeof DISCOVERY_RECOMMENDATION_STRATEGY.WEIGHTS)[keyof typeof DISCOVERY_RECOMMENDATION_STRATEGY.WEIGHTS];

// Strategy Goals
export type DiscoveryRecommendationStrategyGoal =
  (typeof DISCOVERY_RECOMMENDATION_STRATEGY.GOALS)[keyof typeof DISCOVERY_RECOMMENDATION_STRATEGY.GOALS];

// Strategy Metrics
export type DiscoveryRecommendationStrategyMetric =
  (typeof DISCOVERY_RECOMMENDATION_STRATEGY.METRICS)[keyof typeof DISCOVERY_RECOMMENDATION_STRATEGY.METRICS];

// Strategy Defaults
export type DiscoveryRecommendationStrategyDefault =
  (typeof DISCOVERY_RECOMMENDATION_STRATEGY.DEFAULTS)[keyof typeof DISCOVERY_RECOMMENDATION_STRATEGY.DEFAULTS];

// Strategy Limits
export type DiscoveryRecommendationStrategyLimit =
  (typeof DISCOVERY_RECOMMENDATION_STRATEGY.LIMITS)[keyof typeof DISCOVERY_RECOMMENDATION_STRATEGY.LIMITS];

// Utility Functions
export function discoveryRecommendationStrategyGetTypeLabel(
  type: DiscoveryRecommendationStrategyType
): string {
  const labels: Record<DiscoveryRecommendationStrategyType, string> = {
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.POPULARITY]: 'Popularity',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.PERSONALIZED]: 'Personalized',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.CONTEXTUAL]: 'Contextual',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.COLLABORATIVE]: 'Collaborative',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.CONTENT_BASED]: 'Content Based',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.HYBRID]: 'Hybrid',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.SEASONAL]: 'Seasonal',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.TRENDING]: 'Trending',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.EDITORIAL]: 'Editorial',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.RULE_BASED]: 'Rule Based',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.AI_DRIVEN]: 'AI Driven',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.DIVERSITY]: 'Diversity',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.NOVELTY]: 'Novelty',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.SERENDIPITY]: 'Serendipity',
    [DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Strategy Type';
}

export function discoveryRecommendationStrategyGetGoalLabel(
  goal: DiscoveryRecommendationStrategyGoal
): string {
  const labels: Record<DiscoveryRecommendationStrategyGoal, string> = {
    [DISCOVERY_RECOMMENDATION_STRATEGY.GOALS.RELEVANCE]: 'Relevance',
    [DISCOVERY_RECOMMENDATION_STRATEGY.GOALS.DIVERSITY]: 'Diversity',
    [DISCOVERY_RECOMMENDATION_STRATEGY.GOALS.NOVELTY]: 'Novelty',
    [DISCOVERY_RECOMMENDATION_STRATEGY.GOALS.SERENDIPITY]: 'Serendipity',
    [DISCOVERY_RECOMMENDATION_STRATEGY.GOALS.ENGAGEMENT]: 'Engagement',
    [DISCOVERY_RECOMMENDATION_STRATEGY.GOALS.CONVERSION]: 'Conversion',
    [DISCOVERY_RECOMMENDATION_STRATEGY.GOALS.RETENTION]: 'Retention',
    [DISCOVERY_RECOMMENDATION_STRATEGY.GOALS.DISCOVERY]: 'Discovery',
    [DISCOVERY_RECOMMENDATION_STRATEGY.GOALS.PERSONALIZATION]: 'Personalization',
    [DISCOVERY_RECOMMENDATION_STRATEGY.GOALS.BALANCED]: 'Balanced',
  };
  return labels[goal] || 'Unknown Goal';
}

export function discoveryRecommendationStrategyGetMetricLabel(
  metric: DiscoveryRecommendationStrategyMetric
): string {
  const labels: Record<DiscoveryRecommendationStrategyMetric, string> = {
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.CLICK_THROUGH_RATE]: 'Click-Through Rate',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.CONVERSION_RATE]: 'Conversion Rate',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.ENGAGEMENT_RATE]: 'Engagement Rate',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.RETENTION_RATE]: 'Retention Rate',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.REVENUE_PER_USER]: 'Revenue Per User',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.AVERAGE_ORDER_VALUE]: 'Average Order Value',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.SESSION_DURATION]: 'Session Duration',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.BOUNCE_RATE]: 'Bounce Rate',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.SATISFACTION_SCORE]: 'Satisfaction Score',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.RELEVANCE_SCORE]: 'Relevance Score',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.DIVERSITY_SCORE]: 'Diversity Score',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.NOVELTY_SCORE]: 'Novelty Score',
    [DISCOVERY_RECOMMENDATION_STRATEGY.METRICS.SERENDIPITY_SCORE]: 'Serendipity Score',
  };
  return labels[metric] || 'Unknown Metric';
}

export function discoveryRecommendationStrategyIsPersonalized(
  type: DiscoveryRecommendationStrategyType
): boolean {
  const personalizedTypes: DiscoveryRecommendationStrategyType[] = [
    DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.PERSONALIZED,
    DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.COLLABORATIVE,
    DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.CONTENT_BASED,
    DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.HYBRID,
    DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.AI_DRIVEN,
  ];
  return personalizedTypes.includes(type);
}

export function discoveryRecommendationStrategyIsPopularity(
  type: DiscoveryRecommendationStrategyType
): boolean {
  const popularityTypes: DiscoveryRecommendationStrategyType[] = [
    DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.POPULARITY,
    DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.TRENDING,
  ];
  return popularityTypes.includes(type);
}

export function discoveryRecommendationStrategyIsDiversity(
  type: DiscoveryRecommendationStrategyType
): boolean {
  const diversityTypes: DiscoveryRecommendationStrategyType[] = [
    DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.DIVERSITY,
    DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.NOVELTY,
    DISCOVERY_RECOMMENDATION_STRATEGY.TYPES.SERENDIPITY,
  ];
  return diversityTypes.includes(type);
}

export function discoveryRecommendationStrategyGetDefaultWeight(): number {
  return DISCOVERY_RECOMMENDATION_STRATEGY.DEFAULTS.DEFAULT_WEIGHT_PERSONALIZATION;
}
