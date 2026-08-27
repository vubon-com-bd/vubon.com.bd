/**
 * AI Training Types
 * Type definitions for AI training based on shared-constants
 * @module AITrainingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai training (সঠিক নাম ব্যবহার করে)
// ============================================================
import {
  // Training Core
  AI_TRAINING,
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
  // Training Type
  AI_TRAINING_TYPE,
  AITrainingCategory,
  AITrainingSubType,
  AITrainingMethod,
  AITrainingObjective,
  AITrainingMode,
  AITrainingDataType,
  getAiTrainingCategoryLabel,
  getAiTrainingSubTypeLabel,
  getAiTrainingMethodLabel,
  getAiTrainingObjectiveLabel,
  getAiTrainingModeLabel,
  getAiTrainingDataTypeLabel,
  // Training Phase
  AI_TRAINING_PHASE,
  AITrainingPhaseCategory,
  AITrainingPhaseType,
  AITrainingPhaseStatus,
  AITrainingPhasePriority,
  AITrainingPhaseMetric,
  getAiTrainingPhaseCategoryLabel,
  getAiTrainingPhaseTypeLabel,
  getAiTrainingPhaseStatusLabel,
  getAiTrainingPhasePriorityLabel,
  getAiTrainingPhaseMetricLabel,
  getAiTrainingPhaseDependencies,
  // Training Status
  AI_TRAINING_STATUS_TYPES,
  AI_TRAINING_STATUS,
  AITrainingStatusType,
  AITrainingStatusCategory,
  AITrainingStatusSeverity,
  AITrainingStatusColor,
  getAiTrainingStatusLabelDetailed,
  getAiTrainingStatusCategory,
  getAiTrainingStatusSeverity,
  getAiTrainingStatusColor,
  isAiTrainingActiveStatus,
  isAiTrainingCompletedStatus,
  isAiTrainingFailedStatus,
  getAiTrainingStatusProgress,
} from '@vubon/shared-constants';

// ============================================================
// AI Training Extended Types
// ============================================================

/**
 * AI Training
 */
export interface AITraining extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  userId: ID;
  type: AITrainingType;
  status: AITrainingStatus;
  phase: AITrainingPhase;
  epochs: number;
  batchSize: number;
  learningRate: number;
  validationSplit: number;
  metrics: Record<AITrainingMetric, number>;
  optimizer: AITrainingOptimizer;
  lossFunction: AITrainingLossFunction;
  framework: AITrainingFramework;
  hardware: AITrainingHardware;
  checkpoints: AITrainingCheckpoint[];
  isActive: boolean;
  isComplete: boolean;
  isFailed: boolean;
  startedAt: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Training Filter
 */
export interface AITrainingFilter {
  ids?: ID[];
  modelIds?: ID[];
  userIds?: ID[];
  types?: AITrainingType[];
  statuses?: AITrainingStatus[];
  phases?: AITrainingPhase[];
  frameworks?: AITrainingFramework[];
  hardware?: AITrainingHardware[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isComplete?: boolean;
  isFailed?: boolean;
  minEpochs?: number;
  maxEpochs?: number;
  minBatchSize?: number;
  maxBatchSize?: number;
  minLearningRate?: number;
  maxLearningRate?: number;
  searchTerm?: string;
}

/**
 * AI Training Statistics
 */
export interface AITrainingStatistics {
  modelId: ID;
  totalTrainings: number;
  activeTrainings: number;
  completedTrainings: number;
  failedTrainings: number;
  byType: Record<AITrainingType, number>;
  byStatus: Record<AITrainingStatus, number>;
  byPhase: Record<AITrainingPhase, number>;
  byFramework: Record<AITrainingFramework, number>;
  byHardware: Record<AITrainingHardware, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageEpochs: number;
  maxEpochs: number;
  minEpochs: number;
  averageBatchSize: number;
  maxBatchSize: number;
  minBatchSize: number;
  averageLearningRate: number;
  maxLearningRate: number;
  minLearningRate: number;
  averageValidationSplit: number;
  mostFrequentType: AITrainingType;
  mostFrequentStatus: AITrainingStatus;
  mostFrequentFramework: AITrainingFramework;
  mostFrequentHardware: AITrainingHardware;
}

/**
 * AI Training Summary
 */
export interface AITrainingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTrainings: number;
  active: number;
  completed: number;
  failed: number;
  byType: Record<AITrainingType, number>;
  byStatus: Record<AITrainingStatus, number>;
  byPhase: Record<AITrainingPhase, number>;
  byFramework: Record<AITrainingFramework, number>;
  byHardware: Record<AITrainingHardware, number>;
  trainingTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: AITrainingType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AITrainingStatus;
    count: number;
    label: string;
  }[];
  topFrameworks: {
    framework: AITrainingFramework;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageEpochs: number;
    averageBatchSize: number;
    averageLearningRate: number;
    successRate: number;
    failureRate: number;
  };
}

/**
 * AI Training Configuration
 */
export interface AITrainingConfiguration {
  enabled: boolean;
  defaultType: AITrainingType;
  defaultFramework: AITrainingFramework;
  defaultHardware: AITrainingHardware;
  defaultEpochs: number;
  defaultBatchSize: number;
  defaultLearningRate: number;
  defaultValidationSplit: number;
  maxEpochs: number;
  maxBatchSize: number;
  minBatchSize: number;
  maxLearningRate: number;
  minLearningRate: number;
  enableCheckpoint: boolean;
  checkpointInterval: number;
  enableLogging: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  notificationOnCheckpoint: boolean;
  alertConfig?: AITrainingAlertConfig;
}

/**
 * AI Training Alert Configuration
 */
export interface AITrainingAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  convergenceAlert: boolean;
  convergenceThreshold: number;
  resourceAlert: boolean;
  resourceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Training History
 */
export interface AITrainingHistory extends BaseEntity, Timestamp {
  id: ID;
  trainingId: ID;
  modelId: ID;
  action:
    | 'create'
    | 'update'
    | 'start'
    | 'pause'
    | 'resume'
    | 'complete'
    | 'fail'
    | 'checkpoint'
    | 'cancel';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Training Checkpoint
 */
export interface AITrainingCheckpointDetail extends BaseEntity, Timestamp {
  id: ID;
  trainingId: ID;
  modelId: ID;
  epoch: number;
  step: number;
  metrics: Record<AITrainingMetric, number>;
  fileUrl?: string;
  fileSize?: number;
  isRestored: boolean;
  restoredAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Training Validation
 */
export interface AITrainingValidation {
  isValid: boolean;
  trainingId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Training Export
 */
export interface AITrainingExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AITrainingFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Training Core
  AI_TRAINING,
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
  // Training Type
  AI_TRAINING_TYPE,
  AITrainingCategory,
  AITrainingSubType,
  AITrainingMethod,
  AITrainingObjective,
  AITrainingMode,
  AITrainingDataType,
  getAiTrainingCategoryLabel,
  getAiTrainingSubTypeLabel,
  getAiTrainingMethodLabel,
  getAiTrainingObjectiveLabel,
  getAiTrainingModeLabel,
  getAiTrainingDataTypeLabel,
  // Training Phase
  AI_TRAINING_PHASE,
  AITrainingPhaseCategory,
  AITrainingPhaseType,
  AITrainingPhaseStatus,
  AITrainingPhasePriority,
  AITrainingPhaseMetric,
  getAiTrainingPhaseCategoryLabel,
  getAiTrainingPhaseTypeLabel,
  getAiTrainingPhaseStatusLabel,
  getAiTrainingPhasePriorityLabel,
  getAiTrainingPhaseMetricLabel,
  getAiTrainingPhaseDependencies,
  // Training Status
  AI_TRAINING_STATUS_TYPES,
  AI_TRAINING_STATUS,
  AITrainingStatusType,
  AITrainingStatusCategory,
  AITrainingStatusSeverity,
  AITrainingStatusColor,
  getAiTrainingStatusLabelDetailed,
  getAiTrainingStatusCategory,
  getAiTrainingStatusSeverity,
  getAiTrainingStatusColor,
  isAiTrainingActiveStatus,
  isAiTrainingCompletedStatus,
  isAiTrainingFailedStatus,
  getAiTrainingStatusProgress,
};
