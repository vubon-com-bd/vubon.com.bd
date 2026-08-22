/**
 * AI Personalization Constants Index
 * Export all personalization constants and types for easy importing
 */

// AI Personalization Constants
export {
  AI_PERSONALIZATION,
  getPersonalizationTypeLabel,
  getPersonalizationStatusLabel,
  getPersonalizationScopeLabel,
  getPersonalizationStrategyLabel,
  getPersonalizationEventLabel,
  getPersonalizationMetricLabel,
  isPersonalizationActive,
  isPersonalizationComplete,
  isPersonalizationFailed,
  getPersonalizationWeight,
} from './ai-personalization.constants';

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

// AI Personalization Type Constants
export {
  AI_PERSONALIZATION_TYPE,
  getPersonalizationCategoryLabel,
  getPersonalizationSubTypeLabel,
  getPersonalizationSourceLabel,
  getPersonalizationModeLabel,
  getPersonalizationLevelLabel,
} from './ai-personalization-type.constants';

export type {
  AIPersonalizationCategory,
  AIPersonalizationSubType,
  AIPersonalizationSource,
  AIPersonalizationMode,
  AIPersonalizationLevel,
} from './ai-personalization-type.constants';

// AI Personalization Status Constants
export {
  AI_PERSONALIZATION_STATUS,
  AI_PERSONALIZATION_STATUS_TYPES,
  getPersonalizationStatusLabel as getPersStatusLabel,
  getPersonalizationStatusCategory,
  getPersonalizationStatusSeverity,
  getPersonalizationStatusColor,
  isPersonalizationActive as isPersActive,
  isPersonalizationDelivered,
  isPersonalizationComplete as isPersComplete,
  isPersonalizationFailed as isPersFailed,
} from './ai-personalization-status.constants';

export type {
  AIPersonalizationStatusType,
  AIPersonalizationStatusCategory,
  AIPersonalizationStatusSeverity,
  AIPersonalizationStatusColor,
} from './ai-personalization-status.constants';

// AI Personalization Scope Constants
export {
  AI_PERSONALIZATION_SCOPE,
  getPersonalizationScopeLevelLabel,
  getPersonalizationScopeContextLabel,
  getPersonalizationScopeTypeLabel,
  getPersonalizationScopeRuleLabel,
  getPersonalizationScopeWeight,
  getPersonalizationScopePriority,
} from './ai-personalization-scope.constants';

export type {
  AIPersonalizationScopeLevel,
  AIPersonalizationScopeContext,
  AIPersonalizationScopeType,
  AIPersonalizationScopeRule,
  AIPersonalizationScopeWeight,
  AIPersonalizationScopePriority,
} from './ai-personalization-scope.constants';

// AI Personalization Strategy Constants
export {
  AI_PERSONALIZATION_STRATEGY,
  getPersonalizationStrategyTypeLabel,
  getPersonalizationStrategyApproachLabel,
  getPersonalizationStrategyGoalLabel,
  getPersonalizationStrategyExecutionLabel,
  getPersonalizationStrategyEvaluationLabel,
  getRecommendedStrategyForGoal,
} from './ai-personalization-strategy.constants';

export type {
  AIPersonalizationStrategyType,
  AIPersonalizationStrategyApproach,
  AIPersonalizationStrategyGoal,
  AIPersonalizationStrategyOptimization,
  AIPersonalizationStrategyExecution,
  AIPersonalizationStrategyEvaluation,
} from './ai-personalization-strategy.constants';
