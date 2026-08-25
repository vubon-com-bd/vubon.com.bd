/**
 * AI Ranking Strategy Constants
 * Strategy definitions for AI ranking
 */

export const AI_RANKING_STRATEGY = {
  // Strategy Categories
  CATEGORIES: {
    RELEVANCE: 'relevance',
    POPULARITY: 'popularity',
    FRESHNESS: 'freshness',
    PERSONALIZATION: 'personalization',
    CONTEXT: 'context',
    HYBRID: 'hybrid',
    OPTIMIZATION: 'optimization',
  } as const,

  // Strategy Types
  TYPES: {
    RELEVANCE_BASED: 'relevance_based',
    POPULARITY_BASED: 'popularity_based',
    FRESHNESS_BASED: 'freshness_based',
    USER_BASED: 'user_based',
    CONTEXT_BASED: 'context_based',
    HYBRID_BASED: 'hybrid_based',
    OPTIMIZATION_BASED: 'optimization_based',
  } as const,

  // Strategy Approaches
  APPROACHES: {
    STATIC: 'static',
    DYNAMIC: 'dynamic',
    ADAPTIVE: 'adaptive',
    LEARNING: 'learning',
    HYBRID: 'hybrid',
  } as const,

  // Strategy Goals
  GOALS: {
    RELEVANCE: 'relevance',
    DIVERSITY: 'diversity',
    NOVELTY: 'novelty',
    FRESHNESS: 'freshness',
    PERSONALIZATION: 'personalization',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    REVENUE: 'revenue',
  } as const,

  // Strategy Trade-offs
  TRADE_OFFS: {
    EXPLORE_EXPLOIT: 'explore_exploit',
    RELEVANCE_DIVERSITY: 'relevance_diversity',
    NOVELTY_POPULARITY: 'novelty_popularity',
    PERSONALIZATION_GENERALIZATION: 'personalization_generalization',
  } as const,

  // Strategy Execution
  EXECUTION: {
    BATCH: 'batch',
    REAL_TIME: 'real_time',
    STREAMING: 'streaming',
    HYBRID: 'hybrid',
  } as const,

  // Strategy Evaluation
  EVALUATION: {
    OFFLINE: 'offline',
    ONLINE: 'online',
    A_B: 'a_b',
    MULTIVARIATE: 'multivariate',
    INTERLEAVING: 'interleaving',
  } as const,
} as const;

export type AIRankingStrategyCategory =
  (typeof AI_RANKING_STRATEGY.CATEGORIES)[keyof typeof AI_RANKING_STRATEGY.CATEGORIES];

export type AIRankingStrategyType =
  (typeof AI_RANKING_STRATEGY.TYPES)[keyof typeof AI_RANKING_STRATEGY.TYPES];

export type AIRankingStrategyApproach =
  (typeof AI_RANKING_STRATEGY.APPROACHES)[keyof typeof AI_RANKING_STRATEGY.APPROACHES];

export type AIRankingStrategyGoal =
  (typeof AI_RANKING_STRATEGY.GOALS)[keyof typeof AI_RANKING_STRATEGY.GOALS];

export type AIRankingStrategyTradeOff =
  (typeof AI_RANKING_STRATEGY.TRADE_OFFS)[keyof typeof AI_RANKING_STRATEGY.TRADE_OFFS];

export type AIRankingStrategyExecution =
  (typeof AI_RANKING_STRATEGY.EXECUTION)[keyof typeof AI_RANKING_STRATEGY.EXECUTION];

export type AIRankingStrategyEvaluation =
  (typeof AI_RANKING_STRATEGY.EVALUATION)[keyof typeof AI_RANKING_STRATEGY.EVALUATION];

export function getAiRankingStrategyCategoryLabel(category: AIRankingStrategyCategory): string {
  const labels: Record<AIRankingStrategyCategory, string> = {
    [AI_RANKING_STRATEGY.CATEGORIES.RELEVANCE]: 'Relevance',
    [AI_RANKING_STRATEGY.CATEGORIES.POPULARITY]: 'Popularity',
    [AI_RANKING_STRATEGY.CATEGORIES.FRESHNESS]: 'Freshness',
    [AI_RANKING_STRATEGY.CATEGORIES.PERSONALIZATION]: 'Personalization',
    [AI_RANKING_STRATEGY.CATEGORIES.CONTEXT]: 'Context',
    [AI_RANKING_STRATEGY.CATEGORIES.HYBRID]: 'Hybrid',
    [AI_RANKING_STRATEGY.CATEGORIES.OPTIMIZATION]: 'Optimization',
  };
  return labels[category] || 'Unknown';
}

export function getAiRankingStrategyTypeLabel(type: AIRankingStrategyType): string {
  const labels: Record<AIRankingStrategyType, string> = {
    [AI_RANKING_STRATEGY.TYPES.RELEVANCE_BASED]: 'Relevance Based',
    [AI_RANKING_STRATEGY.TYPES.POPULARITY_BASED]: 'Popularity Based',
    [AI_RANKING_STRATEGY.TYPES.FRESHNESS_BASED]: 'Freshness Based',
    [AI_RANKING_STRATEGY.TYPES.USER_BASED]: 'User Based',
    [AI_RANKING_STRATEGY.TYPES.CONTEXT_BASED]: 'Context Based',
    [AI_RANKING_STRATEGY.TYPES.HYBRID_BASED]: 'Hybrid Based',
    [AI_RANKING_STRATEGY.TYPES.OPTIMIZATION_BASED]: 'Optimization Based',
  };
  return labels[type] || 'Unknown';
}

export function getAiRankingStrategyApproachLabel(approach: AIRankingStrategyApproach): string {
  const labels: Record<AIRankingStrategyApproach, string> = {
    [AI_RANKING_STRATEGY.APPROACHES.STATIC]: 'Static',
    [AI_RANKING_STRATEGY.APPROACHES.DYNAMIC]: 'Dynamic',
    [AI_RANKING_STRATEGY.APPROACHES.ADAPTIVE]: 'Adaptive',
    [AI_RANKING_STRATEGY.APPROACHES.LEARNING]: 'Learning',
    [AI_RANKING_STRATEGY.APPROACHES.HYBRID]: 'Hybrid',
  };
  return labels[approach] || 'Unknown';
}

export function getAiRankingStrategyGoalLabel(goal: AIRankingStrategyGoal): string {
  const labels: Record<AIRankingStrategyGoal, string> = {
    [AI_RANKING_STRATEGY.GOALS.RELEVANCE]: 'Relevance',
    [AI_RANKING_STRATEGY.GOALS.DIVERSITY]: 'Diversity',
    [AI_RANKING_STRATEGY.GOALS.NOVELTY]: 'Novelty',
    [AI_RANKING_STRATEGY.GOALS.FRESHNESS]: 'Freshness',
    [AI_RANKING_STRATEGY.GOALS.PERSONALIZATION]: 'Personalization',
    [AI_RANKING_STRATEGY.GOALS.ENGAGEMENT]: 'Engagement',
    [AI_RANKING_STRATEGY.GOALS.CONVERSION]: 'Conversion',
    [AI_RANKING_STRATEGY.GOALS.REVENUE]: 'Revenue',
  };
  return labels[goal] || 'Unknown';
}

export function getAiRankingStrategyTradeOffLabel(tradeOff: AIRankingStrategyTradeOff): string {
  const labels: Record<AIRankingStrategyTradeOff, string> = {
    [AI_RANKING_STRATEGY.TRADE_OFFS.EXPLORE_EXPLOIT]: 'Explore-Exploit',
    [AI_RANKING_STRATEGY.TRADE_OFFS.RELEVANCE_DIVERSITY]: 'Relevance-Diversity',
    [AI_RANKING_STRATEGY.TRADE_OFFS.NOVELTY_POPULARITY]: 'Novelty-Popularity',
    [AI_RANKING_STRATEGY.TRADE_OFFS.PERSONALIZATION_GENERALIZATION]:
      'Personalization-Generalization',
  };
  return labels[tradeOff] || 'Unknown';
}

export function getAiRankingStrategyExecutionLabel(execution: AIRankingStrategyExecution): string {
  const labels: Record<AIRankingStrategyExecution, string> = {
    [AI_RANKING_STRATEGY.EXECUTION.BATCH]: 'Batch',
    [AI_RANKING_STRATEGY.EXECUTION.REAL_TIME]: 'Real Time',
    [AI_RANKING_STRATEGY.EXECUTION.STREAMING]: 'Streaming',
    [AI_RANKING_STRATEGY.EXECUTION.HYBRID]: 'Hybrid',
  };
  return labels[execution] || 'Unknown';
}

export function getAiRankingStrategyEvaluationLabel(
  evaluation: AIRankingStrategyEvaluation
): string {
  const labels: Record<AIRankingStrategyEvaluation, string> = {
    [AI_RANKING_STRATEGY.EVALUATION.OFFLINE]: 'Offline',
    [AI_RANKING_STRATEGY.EVALUATION.ONLINE]: 'Online',
    [AI_RANKING_STRATEGY.EVALUATION.A_B]: 'A/B Testing',
    [AI_RANKING_STRATEGY.EVALUATION.MULTIVARIATE]: 'Multivariate',
    [AI_RANKING_STRATEGY.EVALUATION.INTERLEAVING]: 'Interleaving',
  };
  return labels[evaluation] || 'Unknown';
}

export function getAiRankingStrategyPriorityWeight(goal: AIRankingStrategyGoal): number {
  const weights: Record<AIRankingStrategyGoal, number> = {
    [AI_RANKING_STRATEGY.GOALS.RELEVANCE]: 0.25,
    [AI_RANKING_STRATEGY.GOALS.DIVERSITY]: 0.15,
    [AI_RANKING_STRATEGY.GOALS.NOVELTY]: 0.1,
    [AI_RANKING_STRATEGY.GOALS.FRESHNESS]: 0.1,
    [AI_RANKING_STRATEGY.GOALS.PERSONALIZATION]: 0.15,
    [AI_RANKING_STRATEGY.GOALS.ENGAGEMENT]: 0.1,
    [AI_RANKING_STRATEGY.GOALS.CONVERSION]: 0.1,
    [AI_RANKING_STRATEGY.GOALS.REVENUE]: 0.05,
  };
  return weights[goal] || 0.1;
}

export function getAiRankingRecommendedStrategyForGoal(
  goal: AIRankingStrategyGoal
): AIRankingStrategyType[] {
  const recommendations: Record<AIRankingStrategyGoal, AIRankingStrategyType[]> = {
    [AI_RANKING_STRATEGY.GOALS.RELEVANCE]: [
      AI_RANKING_STRATEGY.TYPES.RELEVANCE_BASED,
      AI_RANKING_STRATEGY.TYPES.HYBRID_BASED,
    ],
    [AI_RANKING_STRATEGY.GOALS.DIVERSITY]: [
      AI_RANKING_STRATEGY.TYPES.RELEVANCE_BASED,
      AI_RANKING_STRATEGY.TYPES.OPTIMIZATION_BASED,
    ],
    [AI_RANKING_STRATEGY.GOALS.NOVELTY]: [
      AI_RANKING_STRATEGY.TYPES.USER_BASED,
      AI_RANKING_STRATEGY.TYPES.OPTIMIZATION_BASED,
    ],
    [AI_RANKING_STRATEGY.GOALS.FRESHNESS]: [
      AI_RANKING_STRATEGY.TYPES.FRESHNESS_BASED,
      AI_RANKING_STRATEGY.TYPES.HYBRID_BASED,
    ],
    [AI_RANKING_STRATEGY.GOALS.PERSONALIZATION]: [
      AI_RANKING_STRATEGY.TYPES.USER_BASED,
      AI_RANKING_STRATEGY.TYPES.CONTEXT_BASED,
    ],
    [AI_RANKING_STRATEGY.GOALS.ENGAGEMENT]: [
      AI_RANKING_STRATEGY.TYPES.USER_BASED,
      AI_RANKING_STRATEGY.TYPES.HYBRID_BASED,
    ],
    [AI_RANKING_STRATEGY.GOALS.CONVERSION]: [
      AI_RANKING_STRATEGY.TYPES.OPTIMIZATION_BASED,
      AI_RANKING_STRATEGY.TYPES.HYBRID_BASED,
    ],
    [AI_RANKING_STRATEGY.GOALS.REVENUE]: [
      AI_RANKING_STRATEGY.TYPES.OPTIMIZATION_BASED,
      AI_RANKING_STRATEGY.TYPES.HYBRID_BASED,
    ],
  };
  return recommendations[goal] || [];
}
