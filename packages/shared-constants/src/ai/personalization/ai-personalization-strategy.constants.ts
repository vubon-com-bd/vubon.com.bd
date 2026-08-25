/**
 * AI Personalization Strategy Constants
 * Strategy definitions for AI personalization
 */

export const AI_PERSONALIZATION_STRATEGY = {
  // Strategy Categories
  CATEGORIES: {
    CONTENT: 'content',
    RECOMMENDATION: 'recommendation',
    RANKING: 'ranking',
    FILTERING: 'filtering',
    SEGMENTATION: 'segmentation',
    TARGETING: 'targeting',
    TIMING: 'timing',
    CHANNEL: 'channel',
  } as const,

  // Strategy Types
  TYPES: {
    // Content-based
    CONTENT_BASED: 'content_based',
    CONTENT_SIMILARITY: 'content_similarity',
    CONTENT_POPULARITY: 'content_popularity',

    // Collaborative
    USER_USER: 'user_user',
    ITEM_ITEM: 'item_item',
    SVD: 'svd',

    // Hybrid
    WEIGHTED_HYBRID: 'weighted_hybrid',
    SWITCHING_HYBRID: 'switching_hybrid',
    CASCADE_HYBRID: 'cascade_hybrid',

    // Contextual
    CONTEXT_AWARE: 'context_aware',
    TIME_BASED: 'time_based',
    LOCATION_BASED: 'location_based',
    DEVICE_BASED: 'device_based',

    // Behavioral
    SESSION_BASED: 'session_based',
    SEQUENTIAL: 'sequential',
    PATTERN_BASED: 'pattern_based',

    // Demographic
    AGE_BASED: 'age_based',
    GENDER_BASED: 'gender_based',
    INCOME_BASED: 'income_based',
    REGION_BASED: 'region_based',

    // Psychographic
    INTEREST_BASED: 'interest_based',
    LIFESTYLE_BASED: 'lifestyle_based',
    PERSONALITY_BASED: 'personality_based',
  } as const,

  // Strategy Approaches
  APPROACHES: {
    EXPLICIT: 'explicit',
    IMPLICIT: 'implicit',
    HYBRID: 'hybrid',
    ACTIVE: 'active',
    PASSIVE: 'passive',
    ADAPTIVE: 'adaptive',
    PREDICTIVE: 'predictive',
  } as const,

  // Strategy Goals
  GOALS: {
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    REVENUE: 'revenue',
    SATISFACTION: 'satisfaction',
    LOYALTY: 'loyalty',
    AWARENESS: 'awareness',
    ACQUISITION: 'acquisition',
  } as const,

  // Strategy Trade-offs
  TRADE_OFFS: {
    EXPLORATION: 'exploration',
    EXPLOITATION: 'exploitation',
    DIVERSITY: 'diversity',
    RELEVANCE: 'relevance',
    NOVELTY: 'novelty',
    SERENDIPITY: 'serendipity',
    POPULARITY: 'popularity',
  } as const,

  // Strategy Execution
  EXECUTION: {
    REAL_TIME: 'real_time',
    BATCH: 'batch',
    HYBRID: 'hybrid',
    STREAMING: 'streaming',
    SCHEDULED: 'scheduled',
  } as const,

  // Strategy Evaluation
  EVALUATION: {
    ONLINE: 'online',
    OFFLINE: 'offline',
    A_B_TESTING: 'a_b_testing',
    MULTIVARIATE: 'multivariate',
    INTERLEAVING: 'interleaving',
  } as const,
} as const;

export type AIPersonalizationStrategyCategory =
  (typeof AI_PERSONALIZATION_STRATEGY.CATEGORIES)[keyof typeof AI_PERSONALIZATION_STRATEGY.CATEGORIES];

export type AIPersonalizationStrategyType =
  (typeof AI_PERSONALIZATION_STRATEGY.TYPES)[keyof typeof AI_PERSONALIZATION_STRATEGY.TYPES];

export type AIPersonalizationStrategyApproach =
  (typeof AI_PERSONALIZATION_STRATEGY.APPROACHES)[keyof typeof AI_PERSONALIZATION_STRATEGY.APPROACHES];

export type AIPersonalizationStrategyGoal =
  (typeof AI_PERSONALIZATION_STRATEGY.GOALS)[keyof typeof AI_PERSONALIZATION_STRATEGY.GOALS];

export type AIPersonalizationStrategyTradeOff =
  (typeof AI_PERSONALIZATION_STRATEGY.TRADE_OFFS)[keyof typeof AI_PERSONALIZATION_STRATEGY.TRADE_OFFS];

export type AIPersonalizationStrategyExecution =
  (typeof AI_PERSONALIZATION_STRATEGY.EXECUTION)[keyof typeof AI_PERSONALIZATION_STRATEGY.EXECUTION];

export type AIPersonalizationStrategyEvaluation =
  (typeof AI_PERSONALIZATION_STRATEGY.EVALUATION)[keyof typeof AI_PERSONALIZATION_STRATEGY.EVALUATION];

export function getAiPersonalizationStrategyCategoryLabel(
  category: AIPersonalizationStrategyCategory
): string {
  const labels: Record<AIPersonalizationStrategyCategory, string> = {
    [AI_PERSONALIZATION_STRATEGY.CATEGORIES.CONTENT]: 'Content',
    [AI_PERSONALIZATION_STRATEGY.CATEGORIES.RECOMMENDATION]: 'Recommendation',
    [AI_PERSONALIZATION_STRATEGY.CATEGORIES.RANKING]: 'Ranking',
    [AI_PERSONALIZATION_STRATEGY.CATEGORIES.FILTERING]: 'Filtering',
    [AI_PERSONALIZATION_STRATEGY.CATEGORIES.SEGMENTATION]: 'Segmentation',
    [AI_PERSONALIZATION_STRATEGY.CATEGORIES.TARGETING]: 'Targeting',
    [AI_PERSONALIZATION_STRATEGY.CATEGORIES.TIMING]: 'Timing',
    [AI_PERSONALIZATION_STRATEGY.CATEGORIES.CHANNEL]: 'Channel',
  };
  return labels[category] || 'Unknown';
}

export function getAiPersonalizationStrategyTypeLabel(type: AIPersonalizationStrategyType): string {
  const labels: Record<AIPersonalizationStrategyType, string> = {
    [AI_PERSONALIZATION_STRATEGY.TYPES.CONTENT_BASED]: 'Content Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.CONTENT_SIMILARITY]: 'Content Similarity',
    [AI_PERSONALIZATION_STRATEGY.TYPES.CONTENT_POPULARITY]: 'Content Popularity',
    [AI_PERSONALIZATION_STRATEGY.TYPES.USER_USER]: 'User-User',
    [AI_PERSONALIZATION_STRATEGY.TYPES.ITEM_ITEM]: 'Item-Item',
    [AI_PERSONALIZATION_STRATEGY.TYPES.SVD]: 'SVD',
    [AI_PERSONALIZATION_STRATEGY.TYPES.WEIGHTED_HYBRID]: 'Weighted Hybrid',
    [AI_PERSONALIZATION_STRATEGY.TYPES.SWITCHING_HYBRID]: 'Switching Hybrid',
    [AI_PERSONALIZATION_STRATEGY.TYPES.CASCADE_HYBRID]: 'Cascade Hybrid',
    [AI_PERSONALIZATION_STRATEGY.TYPES.CONTEXT_AWARE]: 'Context Aware',
    [AI_PERSONALIZATION_STRATEGY.TYPES.TIME_BASED]: 'Time Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.LOCATION_BASED]: 'Location Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.DEVICE_BASED]: 'Device Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.SESSION_BASED]: 'Session Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.SEQUENTIAL]: 'Sequential',
    [AI_PERSONALIZATION_STRATEGY.TYPES.PATTERN_BASED]: 'Pattern Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.AGE_BASED]: 'Age Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.GENDER_BASED]: 'Gender Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.INCOME_BASED]: 'Income Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.REGION_BASED]: 'Region Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.INTEREST_BASED]: 'Interest Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.LIFESTYLE_BASED]: 'Lifestyle Based',
    [AI_PERSONALIZATION_STRATEGY.TYPES.PERSONALITY_BASED]: 'Personality Based',
  };
  return labels[type] || 'Unknown';
}

export function getAiPersonalizationStrategyApproachLabel(
  approach: AIPersonalizationStrategyApproach
): string {
  const labels: Record<AIPersonalizationStrategyApproach, string> = {
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.EXPLICIT]: 'Explicit',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.IMPLICIT]: 'Implicit',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.HYBRID]: 'Hybrid',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.ACTIVE]: 'Active',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.PASSIVE]: 'Passive',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.ADAPTIVE]: 'Adaptive',
    [AI_PERSONALIZATION_STRATEGY.APPROACHES.PREDICTIVE]: 'Predictive',
  };
  return labels[approach] || 'Unknown';
}

export function getAiPersonalizationStrategyGoalLabel(goal: AIPersonalizationStrategyGoal): string {
  const labels: Record<AIPersonalizationStrategyGoal, string> = {
    [AI_PERSONALIZATION_STRATEGY.GOALS.ENGAGEMENT]: 'Engagement',
    [AI_PERSONALIZATION_STRATEGY.GOALS.CONVERSION]: 'Conversion',
    [AI_PERSONALIZATION_STRATEGY.GOALS.RETENTION]: 'Retention',
    [AI_PERSONALIZATION_STRATEGY.GOALS.REVENUE]: 'Revenue',
    [AI_PERSONALIZATION_STRATEGY.GOALS.SATISFACTION]: 'Satisfaction',
    [AI_PERSONALIZATION_STRATEGY.GOALS.LOYALTY]: 'Loyalty',
    [AI_PERSONALIZATION_STRATEGY.GOALS.AWARENESS]: 'Awareness',
    [AI_PERSONALIZATION_STRATEGY.GOALS.ACQUISITION]: 'Acquisition',
  };
  return labels[goal] || 'Unknown';
}

export function getAiPersonalizationStrategyTradeOffLabel(
  tradeOff: AIPersonalizationStrategyTradeOff
): string {
  const labels: Record<AIPersonalizationStrategyTradeOff, string> = {
    [AI_PERSONALIZATION_STRATEGY.TRADE_OFFS.EXPLORATION]: 'Exploration',
    [AI_PERSONALIZATION_STRATEGY.TRADE_OFFS.EXPLOITATION]: 'Exploitation',
    [AI_PERSONALIZATION_STRATEGY.TRADE_OFFS.DIVERSITY]: 'Diversity',
    [AI_PERSONALIZATION_STRATEGY.TRADE_OFFS.RELEVANCE]: 'Relevance',
    [AI_PERSONALIZATION_STRATEGY.TRADE_OFFS.NOVELTY]: 'Novelty',
    [AI_PERSONALIZATION_STRATEGY.TRADE_OFFS.SERENDIPITY]: 'Serendipity',
    [AI_PERSONALIZATION_STRATEGY.TRADE_OFFS.POPULARITY]: 'Popularity',
  };
  return labels[tradeOff] || 'Unknown';
}

export function getAiPersonalizationStrategyExecutionLabel(
  execution: AIPersonalizationStrategyExecution
): string {
  const labels: Record<AIPersonalizationStrategyExecution, string> = {
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.REAL_TIME]: 'Real Time',
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.BATCH]: 'Batch',
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.HYBRID]: 'Hybrid',
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.STREAMING]: 'Streaming',
    [AI_PERSONALIZATION_STRATEGY.EXECUTION.SCHEDULED]: 'Scheduled',
  };
  return labels[execution] || 'Unknown';
}

export function getAiPersonalizationStrategyEvaluationLabel(
  evaluation: AIPersonalizationStrategyEvaluation
): string {
  const labels: Record<AIPersonalizationStrategyEvaluation, string> = {
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.ONLINE]: 'Online',
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.OFFLINE]: 'Offline',
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.A_B_TESTING]: 'A/B Testing',
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.MULTIVARIATE]: 'Multivariate',
    [AI_PERSONALIZATION_STRATEGY.EVALUATION.INTERLEAVING]: 'Interleaving',
  };
  return labels[evaluation] || 'Unknown';
}

export function getAiPersonalizationStrategyPriorityWeight(
  goal: AIPersonalizationStrategyGoal
): number {
  const weights: Record<AIPersonalizationStrategyGoal, number> = {
    [AI_PERSONALIZATION_STRATEGY.GOALS.ENGAGEMENT]: 0.2,
    [AI_PERSONALIZATION_STRATEGY.GOALS.CONVERSION]: 0.25,
    [AI_PERSONALIZATION_STRATEGY.GOALS.RETENTION]: 0.2,
    [AI_PERSONALIZATION_STRATEGY.GOALS.REVENUE]: 0.15,
    [AI_PERSONALIZATION_STRATEGY.GOALS.SATISFACTION]: 0.1,
    [AI_PERSONALIZATION_STRATEGY.GOALS.LOYALTY]: 0.05,
    [AI_PERSONALIZATION_STRATEGY.GOALS.AWARENESS]: 0.03,
    [AI_PERSONALIZATION_STRATEGY.GOALS.ACQUISITION]: 0.02,
  };
  return weights[goal] || 0.1;
}

export function getAiPersonalizationRecommendedStrategyForGoal(
  goal: AIPersonalizationStrategyGoal
): AIPersonalizationStrategyType[] {
  const recommendations: Record<AIPersonalizationStrategyGoal, AIPersonalizationStrategyType[]> = {
    [AI_PERSONALIZATION_STRATEGY.GOALS.ENGAGEMENT]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.CONTENT_BASED,
      AI_PERSONALIZATION_STRATEGY.TYPES.SESSION_BASED,
      AI_PERSONALIZATION_STRATEGY.TYPES.INTEREST_BASED,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.CONVERSION]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.ITEM_ITEM,
      AI_PERSONALIZATION_STRATEGY.TYPES.WEIGHTED_HYBRID,
      AI_PERSONALIZATION_STRATEGY.TYPES.CONTEXT_AWARE,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.RETENTION]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.USER_USER,
      AI_PERSONALIZATION_STRATEGY.TYPES.SEQUENTIAL,
      AI_PERSONALIZATION_STRATEGY.TYPES.PATTERN_BASED,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.REVENUE]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.SVD,
      AI_PERSONALIZATION_STRATEGY.TYPES.CASCADE_HYBRID,
      AI_PERSONALIZATION_STRATEGY.TYPES.INCOME_BASED,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.SATISFACTION]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.CONTENT_SIMILARITY,
      AI_PERSONALIZATION_STRATEGY.TYPES.PERSONALITY_BASED,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.LOYALTY]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.USER_USER,
      AI_PERSONALIZATION_STRATEGY.TYPES.LIFESTYLE_BASED,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.AWARENESS]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.CONTENT_POPULARITY,
      AI_PERSONALIZATION_STRATEGY.TYPES.REGION_BASED,
    ],
    [AI_PERSONALIZATION_STRATEGY.GOALS.ACQUISITION]: [
      AI_PERSONALIZATION_STRATEGY.TYPES.AGE_BASED,
      AI_PERSONALIZATION_STRATEGY.TYPES.GENDER_BASED,
      AI_PERSONALIZATION_STRATEGY.TYPES.INTEREST_BASED,
    ],
  };
  return recommendations[goal] || [];
}
