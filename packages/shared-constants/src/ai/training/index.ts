/**
 * AI Training Index
 * Export all AI training constants and types for easy importing
 */

// Export all constants from ai-training.constants
export {
  AI_TRAINING,
  getAiTrainingTypeLabel,
  getAiTrainingStatusLabel,
  getAiTrainingPhaseLabel,
  getAiTrainingMetricLabel,
  getAiTrainingOptimizerLabel,
  getAiTrainingLossFunctionLabel,
  getAiTrainingFrameworkLabel,
  getAiTrainingHardwareLabel,
  isAiTrainingActive,
  isAiTrainingComplete,
  isAiTrainingFailed,
  getAiTrainingDefaultEpochs,
  getAiTrainingDefaultBatchSize,
  getAiTrainingDefaultLearningRate,
  getAiTrainingValidationSplit,
} from './ai-training.constants';

// Export all types from ai-training.constants
export type {
  AITrainingType,
  AITrainingStatus,
  AITrainingPhase,
  AITrainingParameter,
  AITrainingLimit,
  AITrainingMetric,
  AITrainingOptimizer,
  AITrainingLossFunction,
  AITrainingFramework,
  AITrainingHardware,
  AITrainingCheckpoint,
} from './ai-training.constants';

// Export all constants from ai-training-type.constants
export {
  AI_TRAINING_TYPE,
  getAiTrainingCategoryLabel,
  getAiTrainingSubTypeLabel,
  getAiTrainingMethodLabel,
  getAiTrainingObjectiveLabel,
  getAiTrainingModeLabel,
  getAiTrainingDataTypeLabel,
} from './ai-training-type.constants';

// Export all types from ai-training-type.constants
export type {
  AITrainingCategory,
  AITrainingSubType,
  AITrainingMethod,
  AITrainingObjective,
  AITrainingMode,
  AITrainingDataType,
} from './ai-training-type.constants';

// Export all constants from ai-training-phase.constants
export {
  AI_TRAINING_PHASE,
  getAiTrainingPhaseCategoryLabel,
  getAiTrainingPhaseTypeLabel,
  getAiTrainingPhaseStatusLabel,
  getAiTrainingPhasePriorityLabel,
  getAiTrainingPhaseMetricLabel,
  getAiTrainingPhaseDependencies,
} from './ai-training-phase.constants';

// Export all types from ai-training-phase.constants
export type {
  AITrainingPhaseCategory,
  AITrainingPhaseType,
  AITrainingPhaseStatus,
  AITrainingPhasePriority,
  AITrainingPhaseMetric,
} from './ai-training-phase.constants';

// Export all constants from ai-training-status.constants
export {
  AI_TRAINING_STATUS_TYPES,
  AI_TRAINING_STATUS,
  getAiTrainingStatusLabel as getAiTrainingStatusLabelDetailed,
  getAiTrainingStatusCategory,
  getAiTrainingStatusSeverity,
  getAiTrainingStatusColor,
  isAiTrainingActiveStatus,
  isAiTrainingCompletedStatus,
  isAiTrainingFailedStatus,
  getAiTrainingStatusProgress,
} from './ai-training-status.constants';

// Export all types from ai-training-status.constants
export type {
  AITrainingStatusType,
  AITrainingStatusCategory,
  AITrainingStatusSeverity,
  AITrainingStatusColor,
} from './ai-training-status.constants';
