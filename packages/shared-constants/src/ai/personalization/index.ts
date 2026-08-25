/**
 * AI Personalization Index
 * Export all AI personalization constants and types for easy importing
 */

// Export all constants from ai-personalization.constants
export {
  AI_PERSONALIZATION,
  getAiPersonalizationTypeLabel,
  getAiPersonalizationStatusLabel,
  getAiPersonalizationScopeLabel,
  getAiPersonalizationStrategyLabel,
  getAiPersonalizationEventLabel,
  getAiPersonalizationMetricLabel,
  isAiPersonalizationActive,
  isAiPersonalizationComplete,
  isAiPersonalizationFailed,
  getAiPersonalizationWeight,
} from './ai-personalization.constants';

// Export all types from ai-personalization.constants
export type {
  AIPersonalizationType,
  AIPersonalizationStatus,
  AIPersonalizationScope,
  AIPersonalizationStrategy,
  AIPersonalizationParameter,
  AIPersonalizationWeight,
  AIPersonalizationLimit,
  AIPersonalizationConfidence,
  AIPersonalizationEvent,
  AIPersonalizationMetric,
} from './ai-personalization.constants';

// Export all constants from ai-personalization-type.constants
export {
  AI_PERSONALIZATION_TYPE,
  getAiPersonalizationCategoryLabel,
  getAiPersonalizationSubTypeLabel,
  getAiPersonalizationSourceLabel,
  getAiPersonalizationModeLabel,
  getAiPersonalizationLevelLabel,
} from './ai-personalization-type.constants';

// Export all types from ai-personalization-type.constants
export type {
  AIPersonalizationCategory,
  AIPersonalizationSubType,
  AIPersonalizationSource,
  AIPersonalizationMode,
  AIPersonalizationLevel,
} from './ai-personalization-type.constants';

// Export all constants from ai-personalization-strategy.constants
export {
  AI_PERSONALIZATION_STRATEGY,
  getAiPersonalizationStrategyCategoryLabel,
  getAiPersonalizationStrategyTypeLabel,
  getAiPersonalizationStrategyApproachLabel,
  getAiPersonalizationStrategyGoalLabel,
  getAiPersonalizationStrategyTradeOffLabel,
  getAiPersonalizationStrategyExecutionLabel,
  getAiPersonalizationStrategyEvaluationLabel,
  getAiPersonalizationStrategyPriorityWeight,
  getAiPersonalizationRecommendedStrategyForGoal,
} from './ai-personalization-strategy.constants';

// Export all types from ai-personalization-strategy.constants
export type {
  AIPersonalizationStrategyCategory,
  AIPersonalizationStrategyType,
  AIPersonalizationStrategyApproach,
  AIPersonalizationStrategyGoal,
  AIPersonalizationStrategyTradeOff,
  AIPersonalizationStrategyExecution,
  AIPersonalizationStrategyEvaluation,
} from './ai-personalization-strategy.constants';

// Export all constants from ai-personalization-status.constants
export {
  AI_PERSONALIZATION_STATUS_TYPES,
  AI_PERSONALIZATION_STATUS,
  getAiPersonalizationStatusLabel as getAiPersonalizationStatusLabelDetailed,
  getAiPersonalizationStatusCategory,
  getAiPersonalizationStatusSeverity,
  getAiPersonalizationStatusColor,
  isAiPersonalizationActiveStatus,
  isAiPersonalizationCompletedStatus,
  isAiPersonalizationFailedStatus,
  getAiPersonalizationStatusProgress,
} from './ai-personalization-status.constants';

// Export all types from ai-personalization-status.constants
export type {
  AIPersonalizationStatusType,
  AIPersonalizationStatusCategory,
  AIPersonalizationStatusSeverity,
  AIPersonalizationStatusColor,
} from './ai-personalization-status.constants';

// Export all constants from ai-personalization-scope.constants
export {
  AI_PERSONALIZATION_SCOPE,
  getAiPersonalizationScopeLevelLabel,
  getAiPersonalizationScopeContextLabel,
  getAiPersonalizationScopeTypeLabel,
  getAiPersonalizationScopeRuleLabel,
  getAiPersonalizationScopePriorityValue,
  getAiPersonalizationScopeWeight,
  getAiPersonalizationDefaultScopeCount,
} from './ai-personalization-scope.constants';

// Export all types from ai-personalization-scope.constants
export type {
  AIPersonalizationScopeLevel,
  AIPersonalizationScopeContext,
  AIPersonalizationScopeType,
  AIPersonalizationScopeRule,
  AIPersonalizationScopePriority,
  AIPersonalizationScopeWeight,
} from './ai-personalization-scope.constants';
