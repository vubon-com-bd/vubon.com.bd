/**
 * AI Vector Types
 * Type definitions for AI vectors based on shared-constants
 * @module AIVectorTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai vector
// ============================================================
import {
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
  // Vector Type
  AI_VECTOR_TYPE,
  AIVectorCategory,
  AIVectorSubType,
  AIVectorDimensionType,
  AIVectorPrecision,
  AIVectorDensity,
  AIVectorGenerationMethod,
  getAiVectorCategoryLabel,
  getAiVectorSubTypeLabel,
  getAiVectorDimensionTypeLabel,
  getAiVectorPrecisionLabel,
  getAiVectorDensityLabel,
  getAiVectorGenerationMethodLabel,
  getAiVectorDimensionRange,
  getAiVectorPrecisionScore,
  // Vector Status
  AI_VECTOR_STATUS_TYPES,
  AI_VECTOR_STATUS,
  AIVectorStatusType,
  AIVectorStatusCategory,
  AIVectorStatusSeverity,
  AIVectorStatusColor,
  getAiVectorStatusLabelDetailed,
  getAiVectorStatusCategory,
  getAiVectorStatusSeverity,
  getAiVectorStatusColor,
  isAiVectorActiveStatus,
  isAiVectorGenerated,
  isAiVectorCompleted,
  isAiVectorFailedStatus,
  getAiVectorStatusProgress,
} from '@vubon/shared-constants';

// ============================================================
// AI Vector Extended Types
// ============================================================

/**
 * AI Vector
 */
export interface AIVector extends BaseEntity, Timestamp {
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
  isActive: boolean;
  isGenerating: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Vector Filter
 */
export interface AIVectorFilter {
  ids?: ID[];
  modelIds?: ID[];
  embeddingIds?: ID[];
  types?: AIVectorType[];
  statuses?: AIVectorStatus[];
  dbTypes?: AIVectorDBType[];
  indexTypes?: AIVectorIndexType[];
  distanceMetrics?: AIVectorDistanceMetric[];
  storageFormats?: AIVectorStorageFormat[];
  categories?: AIVectorCategory[];
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
 * AI Vector Statistics
 */
export interface AIVectorStatistics {
  modelId: ID;
  totalVectors: number;
  activeVectors: number;
  generatingVectors: number;
  failedVectors: number;
  byType: Record<AIVectorType, number>;
  byStatus: Record<AIVectorStatus, number>;
  byDBType: Record<AIVectorDBType, number>;
  byIndexType: Record<AIVectorIndexType, number>;
  byDistanceMetric: Record<AIVectorDistanceMetric, number>;
  byStorageFormat: Record<AIVectorStorageFormat, number>;
  byCategory: Record<AIVectorCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDimension: number;
  maxDimension: number;
  minDimension: number;
  mostFrequentType: AIVectorType;
  mostFrequentDBType: AIVectorDBType;
  mostFrequentIndexType: AIVectorIndexType;
}

/**
 * AI Vector Summary
 */
export interface AIVectorSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalVectors: number;
  active: number;
  generating: number;
  failed: number;
  byType: Record<AIVectorType, number>;
  byStatus: Record<AIVectorStatus, number>;
  byDBType: Record<AIVectorDBType, number>;
  byIndexType: Record<AIVectorIndexType, number>;
  byDistanceMetric: Record<AIVectorDistanceMetric, number>;
  byStorageFormat: Record<AIVectorStorageFormat, number>;
  byCategory: Record<AIVectorCategory, number>;
  vectorTrend: {
    date: Date;
    total: number;
    active: number;
    generating: number;
  }[];
  topTypes: {
    type: AIVectorType;
    count: number;
    label: string;
  }[];
  topDBTypes: {
    dbType: AIVectorDBType;
    count: number;
    label: string;
  }[];
  topIndexTypes: {
    indexType: AIVectorIndexType;
    count: number;
    label: string;
  }[];
}

/**
 * AI Vector Configuration
 */
export interface AIVectorConfiguration {
  enabled: boolean;
  defaultType: AIVectorType;
  defaultDBType: AIVectorDBType;
  defaultIndexType: AIVectorIndexType;
  defaultDistanceMetric: AIVectorDistanceMetric;
  defaultStorageFormat: AIVectorStorageFormat;
  defaultDimension: number;
  defaultTopK: number;
  defaultBatchSize: number;
  maxVectorsPerModel: number;
  enableCache: boolean;
  cacheTTLSeconds: number;
  enableLogging: boolean;
  notificationOnGenerate: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AIVectorAlertConfig;
}

/**
 * AI Vector Alert Configuration
 */
export interface AIVectorAlertConfig {
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
 * AI Vector History
 */
export interface AIVectorHistory extends BaseEntity, Timestamp {
  id: ID;
  vectorId: ID;
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
 * AI Vector Validation
 */
export interface AIVectorValidation {
  isValid: boolean;
  vectorId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Vector Export
 */
export interface AIVectorExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'parquet' | 'npy' | 'h5' | 'bin';
  filter: AIVectorFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Vector Search
 */
export interface AIVectorSearch {
  id: ID;
  vectorId: ID;
  modelId: ID;
  queryVector: number[];
  topK: number;
  distanceMetric: AIVectorDistanceMetric;
  results: AIVectorSearchResult[];
  took: number;
  searchedAt: Date;
  metadata?: Metadata;
}

/**
 * AI Vector Search Result
 */
export interface AIVectorSearchResult {
  vectorId: ID;
  distance: number;
  score: number;
  metadata?: Metadata;
}

/**
 * AI Vector Batch
 */
export interface AIVectorBatch extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  vectors: AIVector[];
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
  // Vector Type
  AI_VECTOR_TYPE,
  AIVectorCategory,
  AIVectorSubType,
  AIVectorDimensionType,
  AIVectorPrecision,
  AIVectorDensity,
  AIVectorGenerationMethod,
  getAiVectorCategoryLabel,
  getAiVectorSubTypeLabel,
  getAiVectorDimensionTypeLabel,
  getAiVectorPrecisionLabel,
  getAiVectorDensityLabel,
  getAiVectorGenerationMethodLabel,
  getAiVectorDimensionRange,
  getAiVectorPrecisionScore,
  // Vector Status
  AI_VECTOR_STATUS_TYPES,
  AI_VECTOR_STATUS,
  AIVectorStatusType,
  AIVectorStatusCategory,
  AIVectorStatusSeverity,
  AIVectorStatusColor,
  getAiVectorStatusLabelDetailed,
  getAiVectorStatusCategory,
  getAiVectorStatusSeverity,
  getAiVectorStatusColor,
  isAiVectorActiveStatus,
  isAiVectorGenerated,
  isAiVectorCompleted,
  isAiVectorFailedStatus,
  getAiVectorStatusProgress,
};
