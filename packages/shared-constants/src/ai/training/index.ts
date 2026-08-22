/**
 * AI Training Constants Index
 * Export all training constants and types for easy importing
 */

// AI Training Constants
export {
  AI_TRAINING,
  getTrainingTypeLabel,
  getTrainingStatusLabel,
  getTrainingPhaseLabel,
  getTrainingMetricLabel,
  getTrainingOptimizerLabel,
  getTrainingLossFunctionLabel,
  getTrainingFrameworkLabel,
  getTrainingHardwareLabel,
  isTrainingActive,
  isTrainingComplete,
  isTrainingFailed,
  getDefaultEpochs,
  getDefaultBatchSize,
  getDefaultLearningRate,
  getValidationSplit,
} from './ai-training.constants';

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

// AI Training Type Constants
export {
  AI_TRAINING_TYPE,
  getTrainingCategoryLabel,
  getTrainingSubTypeLabel,
  getTrainingMethodLabel,
  getTrainingObjectiveLabel,
  getTrainingModeLabel,
  getTrainingDataTypeLabel,
} from './ai-training-type.constants';

export type {
  AITrainingCategory,
  AITrainingSubType,
  AITrainingMethod,
  AITrainingObjective,
  AITrainingMode,
  AITrainingDataType,
} from './ai-training-type.constants';

// AI Training Status Constants
export {
  AI_TRAINING_STATUS,
  AI_TRAINING_STATUS_TYPES,
  getTrainingStatusLabel as getTrainingStatusLabel2,
  getTrainingStatusCategory,
  getTrainingStatusSeverity,
  getTrainingStatusColor,
  isTrainingActive as isTrainingActive2,
  isTrainingComplete as isTrainingComplete2,
  isTrainingFailed as isTrainingFailed2,
  isTrainingPaused,
} from './ai-training-status.constants';

export type {
  AITrainingStatusType,
  AITrainingStatusCategory,
  AITrainingStatusSeverity,
  AITrainingStatusColor,
} from './ai-training-status.constants';

// AI Training Phase Constants
export {
  AI_TRAINING_PHASE,
  getTrainingPhaseTypeLabel,
  getTrainingPhaseStatusLabel,
  getTrainingPhasePriorityLabel,
  getPhaseDependencies,
  getPhaseDuration,
  getPhaseStatusColor,
  getPhaseOrder,
  getNextPhases,
  getPreviousPhases,
} from './ai-training-phase.constants';

export type {
  AITrainingPhaseType,
  AITrainingPhaseStatus,
  AITrainingPhasePriority,
  AITrainingPhaseDependency,
  AITrainingPhaseDuration,
} from './ai-training-phase.constants';
