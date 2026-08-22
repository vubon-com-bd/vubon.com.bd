/**
 * AI Ranking Constants Index
 * Export all ranking constants and types for easy importing
 */

// AI Ranking Constants
export {
  AI_RANKING,
  getRankingTypeLabel,
  getRankingStatusLabel,
  getRankingStrategyLabel,
  getRankingFactorLabel,
  getRankingMetricLabel,
  getRankingModeLabel,
  isRankingActive,
  isRankingComplete,
  isRankingFailed,
  getRankingWeight,
  getDefaultRankingLimit,
  calculateCombinedScore,
} from './ai-ranking.constants';

export type {
  AIRankingType,
  AIRankingStatus,
  AIRankingStrategy,
  AIRankingFactor,
  AIRankingWeight,
  AIRankingLimit,
  AIRankingMetric,
  AIRankingMode,
  AIRankingAlgorithm,
} from './ai-ranking.constants';

// AI Ranking Type Constants
export {
  AI_RANKING_TYPE,
  getRankingCategoryLabel,
  getRankingSubTypeLabel,
  getRankingLevelLabel,
  getRankingScopeLabel,
  getRankingPriorityLabel,
  getRankingMethodLabel,
} from './ai-ranking-type.constants';

export type {
  AIRankingCategory,
  AIRankingSubType,
  AIRankingLevel,
  AIRankingScope,
  AIRankingPriority,
  AIRankingMethod,
} from './ai-ranking-type.constants';

// AI Ranking Strategy Constants
export {
  AI_RANKING_STRATEGY,
  getRankingStrategyTypeLabel,
  getRankingStrategyApproachLabel,
  getRankingStrategyGoalLabel,
  getRankingStrategyExecutionLabel,
  getRankingStrategyEvaluationLabel,
  getRecommendedStrategyForGoal,
} from './ai-ranking-strategy.constants';

export type {
  AIRankingStrategyType,
  AIRankingStrategyApproach,
  AIRankingStrategyGoal,
  AIRankingStrategyOptimization,
  AIRankingStrategyExecution,
  AIRankingStrategyEvaluation,
} from './ai-ranking-strategy.constants';

// AI Ranking Status Constants
export {
  AI_RANKING_STATUS,
  AI_RANKING_STATUS_TYPES,
  getRankingStatusLabel as getRankingStatusLabel2,
  getRankingStatusCategory,
  getRankingStatusSeverity,
  getRankingStatusColor,
  isRankingActive as isRankingActive2,
  isRankingDelivered,
  isRankingComplete as isRankingComplete2,
  isRankingFailed as isRankingFailed2,
} from './ai-ranking-status.constants';

export type {
  AIRankingStatusType,
  AIRankingStatusCategory,
  AIRankingStatusSeverity,
  AIRankingStatusColor,
} from './ai-ranking-status.constants';
