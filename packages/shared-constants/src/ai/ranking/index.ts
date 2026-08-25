/**
 * AI Ranking Index
 * Export all AI ranking constants and types for easy importing
 */

// Export all constants from ai-ranking.constants
export {
  AI_RANKING_FACTORS,
  AI_RANKING,
  getAiRankingTypeLabel,
  getAiRankingStatusLabel,
  getAiRankingStrategyLabel,
  getAiRankingFactorLabel,
  getAiRankingMetricLabel,
  getAiRankingModeLabel,
  isAiRankingActive,
  isAiRankingComplete,
  isAiRankingFailed,
  getAiRankingWeight,
  getAiRankingDefaultLimit,
  calculateAiRankingCombinedScore,
} from './ai-ranking.constants';

// Export all types from ai-ranking.constants
export type {
  AIRankingFactor,
  AIRankingType,
  AIRankingStatus,
  AIRankingStrategy,
  AIRankingWeight,
  AIRankingLimit,
  AIRankingMetric,
  AIRankingMode,
  AIRankingAlgorithm,
} from './ai-ranking.constants';

// Export all constants from ai-ranking-type.constants
export {
  AI_RANKING_TYPE,
  getAiRankingCategoryLabel,
  getAiRankingSubTypeLabel,
  getAiRankingLevelLabel,
  getAiRankingScopeLabel,
  getAiRankingPriorityLabel,
  getAiRankingMethodLabel,
} from './ai-ranking-type.constants';

// Export all types from ai-ranking-type.constants
export type {
  AIRankingCategory,
  AIRankingSubType,
  AIRankingLevel,
  AIRankingScope,
  AIRankingPriority,
  AIRankingMethod,
} from './ai-ranking-type.constants';

// Export all constants from ai-ranking-strategy.constants
export {
  AI_RANKING_STRATEGY,
  getAiRankingStrategyCategoryLabel,
  getAiRankingStrategyTypeLabel,
  getAiRankingStrategyApproachLabel,
  getAiRankingStrategyGoalLabel,
  getAiRankingStrategyTradeOffLabel,
  getAiRankingStrategyExecutionLabel,
  getAiRankingStrategyEvaluationLabel,
  getAiRankingStrategyPriorityWeight,
  getAiRankingRecommendedStrategyForGoal,
} from './ai-ranking-strategy.constants';

// Export all types from ai-ranking-strategy.constants
export type {
  AIRankingStrategyCategory,
  AIRankingStrategyType,
  AIRankingStrategyApproach,
  AIRankingStrategyGoal,
  AIRankingStrategyTradeOff,
  AIRankingStrategyExecution,
  AIRankingStrategyEvaluation,
} from './ai-ranking-strategy.constants';

// Export all constants from ai-ranking-status.constants
export {
  AI_RANKING_STATUS_TYPES,
  AI_RANKING_STATUS,
  getAiRankingStatusLabel as getAiRankingStatusLabelDetailed,
  getAiRankingStatusCategory,
  getAiRankingStatusSeverity,
  getAiRankingStatusColor,
  isAiRankingActiveStatus,
  isAiRankingCompleted,
  isAiRankingFailedStatus,
  getAiRankingStatusProgress,
} from './ai-ranking-status.constants';

// Export all types from ai-ranking-status.constants
export type {
  AIRankingStatusType,
  AIRankingStatusCategory,
  AIRankingStatusSeverity,
  AIRankingStatusColor,
} from './ai-ranking-status.constants';
