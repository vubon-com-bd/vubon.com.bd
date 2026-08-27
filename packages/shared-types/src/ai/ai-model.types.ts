/**
 * AI Model Types
 * Type definitions for AI models based on shared-constants
 * @module AIModelTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai
// ============================================================
import {
  // AI Core
  AI,
  AIServiceType,
  AIProvider,
  AIModelType,
  AIModelStatus,
  AIConfidence,
  AIErrorType,
  AIEndpoint,
  AIFeature,
  AITimeout,
  AIBatchSize,
  AILearningRate,
  AIEpoch,
  getAIModelStatusLabel,
  getAIErrorLabel,
  getAIEndpoint,
  getAITimeout,
  getAIBatchSize,
  isModelDeployed,
  isModelActive,
  isModelFailed,
  getAIConfidenceLabel,
  getDefaultLearningRate,
  // AI Error
  AI_ERROR_CODES,
  AI_ERROR,
  AIErrorCode,
  AIErrorCategory,
  AIErrorSeverity,
  AIErrorRecovery,
  getErrorMessage,
  getErrorCategory,
  getErrorSeverity,
  getErrorHttpStatus,
  getErrorRecoveryAction,
  isRetryableError,
  shouldBackoff,
  // Cluster
  AIClusterType,
  AIClusterStatus,
  AIClusterCategory,
  AIClusterAlgorithm,
  AIClusterMetric,
  AIClusterDistanceMetric,
  AIClusterLimit,
  AIClusterFeature,
  AIClusterQuality,
  AIClusterFormat,
  getAiClusterTypeLabel,
  getAiClusterStatusLabelBasic,
  getAiClusterCategoryLabel,
  getAiClusterAlgorithmLabel,
  getAiClusterMetricLabel,
  getAiClusterDistanceMetricLabel,
  getAiClusterQualityLabel,
  isAiClusterActive,
  isAiClusterProcessing,
  isAiClusterFailed,
  getAiClusterDefaultClusters,
  getAiClusterDefaultIterations,
  getAiClusterDefaultEpsilon,
  getAiClusterDefaultMinPts,
  getAiClusterAlgorithmCategory,
  getAiClusterQualityScore,
  // Embedding
  AIEmbeddingModel,
  AIEmbeddingDimension,
  AIEmbeddingType,
  AIEmbeddingStatus,
  AIEmbeddingProvider,
  AIEmbeddingFormat,
  AIEmbeddingLimit,
  AIEmbeddingMetric,
  AIEmbeddingNormalization,
  getAiEmbeddingTypeLabel,
  getAiEmbeddingStatusLabel,
  getAiEmbeddingModelLabel,
  getAiEmbeddingProviderLabel,
  getAiEmbeddingFormatLabel,
  getAiEmbeddingMetricLabel,
  getAiEmbeddingNormalizationLabel,
  getAiEmbeddingDimension,
  getAiEmbeddingProvider,
  isAiEmbeddingActive,
  isAiEmbeddingGenerating,
  isAiEmbeddingFailed,
  getAiEmbeddingDefaultModel,
  getAiEmbeddingDefaultBatchSize,
  getAiEmbeddingMaxBatchSize,
  calculateAiEmbeddingCosineSimilarity,
  calculateAiEmbeddingEuclideanDistance,
  calculateAiEmbeddingDotProduct,
  // Training
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
  // Vector
  AIVectorType,
  AIVectorStatus,
  AIVectorDBType,
  AIVectorIndexType,
  AIVectorDistanceMetric,
  AIVectorStorageFormat,
  AIVectorOperation,
  AIVectorLimit,
  AIVectorMetric,
  AIVectorNormalization,
  AIVectorDefault,
  getAiVectorTypeLabel,
  getAiVectorStatusLabel,
  getAiVectorDBTypeLabel,
  getAiVectorIndexTypeLabel,
  getAiVectorDistanceMetricLabel,
  getAiVectorStorageFormatLabel,
  getAiVectorOperationLabel,
  getAiVectorMetricLabel,
  getAiVectorNormalizationLabel,
  isAiVectorActive,
  isAiVectorGenerating,
  isAiVectorFailed,
  getAiVectorDefaultDimension,
  getAiVectorDefaultTopK,
  getAiVectorDefaultBatchSize,
  getAiVectorDefaultDistanceMetric,
  getAiVectorDefaultIndexType,
  getAiVectorIndexTypeCompatibility,
  getAiVectorDistanceMetricForType,
} from '@vubon/shared-constants';

// ============================================================
// AI Model Extended Types
// ============================================================

/**
 * AI Model
 */
export interface AIModel extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  type: AIModelType;
  serviceType: AIServiceType;
  provider: AIProvider;
  status: AIModelStatus;
  version: string;
  description?: string;
  endpoint: AIEndpoint;
  config: AIModelConfig;
  isDeployed: boolean;
  isActive: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Model Configuration
 */
export interface AIModelConfig {
  modelType: AIModelType;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
  timeout: AITimeout;
  batchSize: AIBatchSize;
  learningRate?: AILearningRate;
  epochs?: AIEpoch;
  confidence?: AIConfidence;
  features?: AIFeature[];
  metadata?: Metadata;
}

/**
 * AI Model Prediction
 */
export interface AIModelPrediction extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  confidence: AIConfidence;
  processingTimeMs: number;
  tokensUsed?: number;
  metadata?: Metadata;
}

/**
 * AI Model Training
 */
export interface AIModelTraining extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  type: AITrainingType;
  status: AITrainingStatus;
  phase: AITrainingPhase;
  epochs: AIEpoch;
  batchSize: AIBatchSize;
  learningRate: AILearningRate;
  validationSplit: number;
  metrics: Record<AITrainingMetric, number>;
  checkpoints: AITrainingCheckpoint[];
  startedAt: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Model Cluster
 */
export interface AIModelCluster extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  type: AIClusterType;
  status: AIClusterStatus;
  category: AIClusterCategory;
  algorithm: AIClusterAlgorithm;
  metric: AIClusterMetric;
  distanceMetric: AIClusterDistanceMetric;
  clusters: number;
  iterations: number;
  quality: AIClusterQuality;
  features: AIClusterFeature[];
  format: AIClusterFormat;
  isActive: boolean;
  isProcessing: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Model Embedding
 */
export interface AIModelEmbedding extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  type: AIEmbeddingType;
  status: AIEmbeddingStatus;
  model: AIEmbeddingModel;
  provider: AIEmbeddingProvider;
  dimension: AIEmbeddingDimension;
  format: AIEmbeddingFormat;
  metric: AIEmbeddingMetric;
  normalization: AIEmbeddingNormalization;
  vectors: AIVectorType[];
  isActive: boolean;
  isGenerating: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Model Vector
 */
export interface AIModelVector extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  embeddingId: ID;
  type: AIVectorType;
  status: AIVectorStatus;
  dbType: AIVectorDBType;
  indexType: AIVectorIndexType;
  distanceMetric: AIVectorDistanceMetric;
  storageFormat: AIVectorStorageFormat;
  dimension: number;
  values: number[];
  metadata?: Metadata;
}

/**
 * AI Model Filter
 */
export interface AIModelFilter {
  ids?: ID[];
  types?: AIModelType[];
  serviceTypes?: AIServiceType[];
  providers?: AIProvider[];
  statuses?: AIModelStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDeployed?: boolean;
  isActive?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
  version?: string;
}

/**
 * AI Model Statistics
 */
export interface AIModelStatistics {
  totalModels: number;
  deployedModels: number;
  activeModels: number;
  failedModels: number;
  byType: Record<AIModelType, number>;
  byProvider: Record<AIProvider, number>;
  byStatus: Record<AIModelStatus, number>;
  byServiceType: Record<AIServiceType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageConfidence: number;
  mostFrequentType: AIModelType;
  mostFrequentProvider: AIProvider;
  mostFrequentStatus: AIModelStatus;
}

/**
 * AI Model Summary
 */
export interface AIModelSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalModels: number;
  deployed: number;
  active: number;
  failed: number;
  byType: Record<AIModelType, number>;
  byProvider: Record<AIProvider, number>;
  byStatus: Record<AIModelStatus, number>;
  modelTrend: {
    date: Date;
    total: number;
    deployed: number;
    active: number;
  }[];
  topTypes: {
    type: AIModelType;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: AIProvider;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AIModelStatus;
    count: number;
    label: string;
  }[];
}

/**
 * AI Model Configuration
 */
export interface AIModelConfiguration {
  enabled: boolean;
  defaultType: AIModelType;
  defaultProvider: AIProvider;
  defaultEndpoint: AIEndpoint;
  defaultTimeout: AITimeout;
  defaultBatchSize: AIBatchSize;
  defaultLearningRate: AILearningRate;
  maxConcurrentRequests: number;
  rateLimitPerMinute: number;
  enableCaching: boolean;
  cacheTTLSeconds: number;
  enableLogging: boolean;
  notificationOnDeploy: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AIModelAlertConfig;
}

/**
 * AI Model Alert Configuration
 */
export interface AIModelAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  confidenceDropAlert: boolean;
  confidenceDropThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Model History
 */
export interface AIModelHistory extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  action:
    'create' | 'update' | 'deploy' | 'undeploy' | 'activate' | 'deactivate' | 'fail' | 'retry';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Model Validation
 */
export interface AIModelValidation {
  isValid: boolean;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Model Export
 */
export interface AIModelExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AIModelFilter;
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
  // AI Core
  AI,
  AIServiceType,
  AIProvider,
  AIModelType,
  AIModelStatus,
  AIConfidence,
  AIErrorType,
  AIEndpoint,
  AIFeature,
  AITimeout,
  AIBatchSize,
  AILearningRate,
  AIEpoch,
  getAIModelStatusLabel,
  getAIErrorLabel,
  getAIEndpoint,
  getAITimeout,
  getAIBatchSize,
  isModelDeployed,
  isModelActive,
  isModelFailed,
  getAIConfidenceLabel,
  getDefaultLearningRate,
  // AI Error
  AI_ERROR_CODES,
  AI_ERROR,
  AIErrorCode,
  AIErrorCategory,
  AIErrorSeverity,
  AIErrorRecovery,
  getErrorMessage,
  getErrorCategory,
  getErrorSeverity,
  getErrorHttpStatus,
  getErrorRecoveryAction,
  isRetryableError,
  shouldBackoff,
  // Cluster
  AIClusterType,
  AIClusterStatus,
  AIClusterCategory,
  AIClusterAlgorithm,
  AIClusterMetric,
  AIClusterDistanceMetric,
  AIClusterLimit,
  AIClusterFeature,
  AIClusterQuality,
  AIClusterFormat,
  getAiClusterTypeLabel,
  getAiClusterStatusLabelBasic,
  getAiClusterCategoryLabel,
  getAiClusterAlgorithmLabel,
  getAiClusterMetricLabel,
  getAiClusterDistanceMetricLabel,
  getAiClusterQualityLabel,
  isAiClusterActive,
  isAiClusterProcessing,
  isAiClusterFailed,
  getAiClusterDefaultClusters,
  getAiClusterDefaultIterations,
  getAiClusterDefaultEpsilon,
  getAiClusterDefaultMinPts,
  getAiClusterAlgorithmCategory,
  getAiClusterQualityScore,
  // Embedding
  AIEmbeddingModel,
  AIEmbeddingDimension,
  AIEmbeddingType,
  AIEmbeddingStatus,
  AIEmbeddingProvider,
  AIEmbeddingFormat,
  AIEmbeddingLimit,
  AIEmbeddingMetric,
  AIEmbeddingNormalization,
  getAiEmbeddingTypeLabel,
  getAiEmbeddingStatusLabel,
  getAiEmbeddingModelLabel,
  getAiEmbeddingProviderLabel,
  getAiEmbeddingFormatLabel,
  getAiEmbeddingMetricLabel,
  getAiEmbeddingNormalizationLabel,
  getAiEmbeddingDimension,
  getAiEmbeddingProvider,
  isAiEmbeddingActive,
  isAiEmbeddingGenerating,
  isAiEmbeddingFailed,
  getAiEmbeddingDefaultModel,
  getAiEmbeddingDefaultBatchSize,
  getAiEmbeddingMaxBatchSize,
  calculateAiEmbeddingCosineSimilarity,
  calculateAiEmbeddingEuclideanDistance,
  calculateAiEmbeddingDotProduct,
  // Training
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
  // Vector
  AIVectorType,
  AIVectorStatus,
  AIVectorDBType,
  AIVectorIndexType,
  AIVectorDistanceMetric,
  AIVectorStorageFormat,
  AIVectorOperation,
  AIVectorLimit,
  AIVectorMetric,
  AIVectorNormalization,
  AIVectorDefault,
  getAiVectorTypeLabel,
  getAiVectorStatusLabel,
  getAiVectorDBTypeLabel,
  getAiVectorIndexTypeLabel,
  getAiVectorDistanceMetricLabel,
  getAiVectorStorageFormatLabel,
  getAiVectorOperationLabel,
  getAiVectorMetricLabel,
  getAiVectorNormalizationLabel,
  isAiVectorActive,
  isAiVectorGenerating,
  isAiVectorFailed,
  getAiVectorDefaultDimension,
  getAiVectorDefaultTopK,
  getAiVectorDefaultBatchSize,
  getAiVectorDefaultDistanceMetric,
  getAiVectorDefaultIndexType,
  getAiVectorIndexTypeCompatibility,
  getAiVectorDistanceMetricForType,
};
