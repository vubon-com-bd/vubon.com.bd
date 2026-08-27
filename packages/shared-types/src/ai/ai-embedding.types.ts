/**
 * AI Embedding Types
 * Type definitions for AI embeddings based on shared-constants
 * @module AIEmbeddingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai embedding
// ============================================================
import {
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
  // Embedding Type
  AI_EMBEDDING_TYPE,
  AIEmbeddingCategory,
  AIEmbeddingSubType,
  AIEmbeddingDimensionType,
  AIEmbeddingTrainingMethod,
  AIEmbeddingQuality,
  AIEmbeddingUsage,
  getAiEmbeddingCategoryLabel,
  getAiEmbeddingSubTypeLabel,
  getAiEmbeddingDimensionTypeLabel,
  getAiEmbeddingTrainingMethodLabel,
  getAiEmbeddingQualityLabel,
  getAiEmbeddingUsageLabel,
  getAiEmbeddingDimensionRange,
  getAiEmbeddingQualityScore,
  // Embedding Status
  AI_EMBEDDING_STATUS_TYPES,
  AI_EMBEDDING_STATUS,
  AIEmbeddingStatusType,
  AIEmbeddingStatusCategory,
  AIEmbeddingStatusSeverity,
  AIEmbeddingStatusColor,
  getAiEmbeddingStatusLabelDetailed,
  getAiEmbeddingStatusCategory,
  getAiEmbeddingStatusSeverity,
  getAiEmbeddingStatusColor,
  isAiEmbeddingActiveStatus,
  isAiEmbeddingGenerated,
  isAiEmbeddingCompleted,
  isAiEmbeddingFailedStatus,
  getAiEmbeddingStatusProgress,
} from '@vubon/shared-constants';

// ============================================================
// AI Embedding Extended Types
// ============================================================

/**
 * AI Embedding
 */
export interface AIEmbedding extends BaseEntity, Timestamp {
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
  vectors: number[][];
  isActive: boolean;
  isGenerating: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Embedding Filter
 */
export interface AIEmbeddingFilter {
  ids?: ID[];
  modelIds?: ID[];
  types?: AIEmbeddingType[];
  statuses?: AIEmbeddingStatus[];
  models?: AIEmbeddingModel[];
  providers?: AIEmbeddingProvider[];
  dimensions?: AIEmbeddingDimension[];
  formats?: AIEmbeddingFormat[];
  metrics?: AIEmbeddingMetric[];
  categories?: AIEmbeddingCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isGenerating?: boolean;
  isFailed?: boolean;
  minDimension?: number;
  maxDimension?: number;
  searchTerm?: string;
}

/**
 * AI Embedding Statistics
 */
export interface AIEmbeddingStatistics {
  modelId: ID;
  totalEmbeddings: number;
  activeEmbeddings: number;
  generatingEmbeddings: number;
  failedEmbeddings: number;
  byType: Record<AIEmbeddingType, number>;
  byStatus: Record<AIEmbeddingStatus, number>;
  byModel: Record<AIEmbeddingModel, number>;
  byProvider: Record<AIEmbeddingProvider, number>;
  byDimension: Record<AIEmbeddingDimension, number>;
  byFormat: Record<AIEmbeddingFormat, number>;
  byMetric: Record<AIEmbeddingMetric, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDimension: number;
  maxDimension: number;
  minDimension: number;
  mostFrequentType: AIEmbeddingType;
  mostFrequentModel: AIEmbeddingModel;
  mostFrequentProvider: AIEmbeddingProvider;
}

/**
 * AI Embedding Summary
 */
export interface AIEmbeddingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEmbeddings: number;
  active: number;
  generating: number;
  failed: number;
  byType: Record<AIEmbeddingType, number>;
  byStatus: Record<AIEmbeddingStatus, number>;
  byModel: Record<AIEmbeddingModel, number>;
  byProvider: Record<AIEmbeddingProvider, number>;
  byDimension: Record<AIEmbeddingDimension, number>;
  byFormat: Record<AIEmbeddingFormat, number>;
  byMetric: Record<AIEmbeddingMetric, number>;
  embeddingTrend: {
    date: Date;
    total: number;
    active: number;
    generating: number;
  }[];
  topTypes: {
    type: AIEmbeddingType;
    count: number;
    label: string;
  }[];
  topModels: {
    model: AIEmbeddingModel;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: AIEmbeddingProvider;
    count: number;
    label: string;
  }[];
}

/**
 * AI Embedding Configuration
 */
export interface AIEmbeddingConfiguration {
  enabled: boolean;
  defaultModel: AIEmbeddingModel;
  defaultProvider: AIEmbeddingProvider;
  defaultDimension: AIEmbeddingDimension;
  defaultFormat: AIEmbeddingFormat;
  defaultMetric: AIEmbeddingMetric;
  defaultNormalization: AIEmbeddingNormalization;
  defaultBatchSize: number;
  maxBatchSize: number;
  maxEmbeddingsPerModel: number;
  enableCache: boolean;
  cacheTTLSeconds: number;
  enableLogging: boolean;
  notificationOnGenerate: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AIEmbeddingAlertConfig;
}

/**
 * AI Embedding Alert Configuration
 */
export interface AIEmbeddingAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  qualityDropAlert: boolean;
  qualityDropThreshold: number;
  dimensionMismatchAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Embedding History
 */
export interface AIEmbeddingHistory extends BaseEntity, Timestamp {
  id: ID;
  embeddingId: ID;
  modelId: ID;
  action: 'create' | 'update' | 'generate' | 'complete' | 'fail' | 'retry' | 'cancel' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Embedding Validation
 */
export interface AIEmbeddingValidation {
  isValid: boolean;
  embeddingId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Embedding Export
 */
export interface AIEmbeddingExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'parquet' | 'npy' | 'h5';
  filter: AIEmbeddingFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Embedding Similarity
 */
export interface AIEmbeddingSimilarity {
  id: ID;
  sourceEmbeddingId: ID;
  targetEmbeddingId: ID;
  similarityScore: number;
  distanceScore?: number;
  dotProduct?: number;
  calculatedAt: Date;
  metadata?: Metadata;
}

/**
 * AI Embedding Batch
 */
export interface AIEmbeddingBatch extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  embeddings: AIEmbedding[];
  batchSize: number;
  totalItems: number;
  processedItems: number;
  failedItems: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
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
  // Embedding Type
  AI_EMBEDDING_TYPE,
  AIEmbeddingCategory,
  AIEmbeddingSubType,
  AIEmbeddingDimensionType,
  AIEmbeddingTrainingMethod,
  AIEmbeddingQuality,
  AIEmbeddingUsage,
  getAiEmbeddingCategoryLabel,
  getAiEmbeddingSubTypeLabel,
  getAiEmbeddingDimensionTypeLabel,
  getAiEmbeddingTrainingMethodLabel,
  getAiEmbeddingQualityLabel,
  getAiEmbeddingUsageLabel,
  getAiEmbeddingDimensionRange,
  getAiEmbeddingQualityScore,
  // Embedding Status
  AI_EMBEDDING_STATUS_TYPES,
  AI_EMBEDDING_STATUS,
  AIEmbeddingStatusType,
  AIEmbeddingStatusCategory,
  AIEmbeddingStatusSeverity,
  AIEmbeddingStatusColor,
  getAiEmbeddingStatusLabelDetailed,
  getAiEmbeddingStatusCategory,
  getAiEmbeddingStatusSeverity,
  getAiEmbeddingStatusColor,
  isAiEmbeddingActiveStatus,
  isAiEmbeddingGenerated,
  isAiEmbeddingCompleted,
  isAiEmbeddingFailedStatus,
  getAiEmbeddingStatusProgress,
};
