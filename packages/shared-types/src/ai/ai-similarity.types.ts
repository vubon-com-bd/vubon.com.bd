/**
 * AI Similarity Types
 * Type definitions for AI similarity based on shared-constants
 * @module AISimilarityTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai similarity
// ============================================================
import {
  // Similarity
  AI_SIMILARITY,
  AISimilarityType,
  AISimilarityStatus,
  AISimilarityCategory,
  AISimilarityAlgorithm,
  AISimilarityThreshold,
  AISimilarityRange,
  AISimilarityLimit,
  AISimilarityMetric,
  AISimilarityFormat,
  AISimilarityNormalization,
  getAiSimilarityTypeLabel,
  getAiSimilarityStatusLabel,
  getAiSimilarityCategoryLabel,
  getAiSimilarityAlgorithmLabel,
  getAiSimilarityThresholdLabel,
  getAiSimilarityFormatLabel,
  getAiSimilarityNormalizationLabel,
  isAiSimilarityActive,
  isAiSimilarityCalculating,
  isAiSimilarityFailed,
  getAiSimilarityDefaultThreshold,
  getAiSimilarityDefaultTopK,
  getAiSimilarityMaxTopK,
  normalizeAiSimilarityScore,
  denormalizeAiSimilarityScore,
  getAiSimilarityRange,
  getAiSimilarityAlgorithmForType,
  // Similarity Type
  AI_SIMILARITY_TYPE,
  AISimilarityDomain,
  AISimilaritySubType,
  AISimilarityLevel,
  AISimilarityConfidence,
  AISimilarityPrecision,
  AISimilarityUseCase,
  getAiSimilarityDomainLabel,
  getAiSimilaritySubTypeLabel,
  getAiSimilarityLevelLabel,
  getAiSimilarityConfidenceLabel,
  getAiSimilarityPrecisionLabel,
  getAiSimilarityUseCaseLabel,
  getAiSimilarityLevelThreshold,
  getAiSimilarityConfidenceScore,
  // Similarity Status
  AI_SIMILARITY_STATUS_TYPES,
  AI_SIMILARITY_STATUS,
  AISimilarityStatusType,
  AISimilarityStatusCategory,
  AISimilarityStatusSeverity,
  AISimilarityStatusColor,
  getAiSimilarityStatusLabelDetailed,
  getAiSimilarityStatusCategory,
  getAiSimilarityStatusSeverity,
  getAiSimilarityStatusColor,
  isAiSimilarityActiveStatus,
  isAiSimilarityCompleted,
  isAiSimilarityFailedStatus,
  getAiSimilarityStatusProgress,
} from '@vubon/shared-constants';

// ============================================================
// AI Similarity Extended Types
// ============================================================

/**
 * AI Similarity
 */
export interface AISimilarity extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  sourceId: ID;
  targetId: ID;
  type: AISimilarityType;
  status: AISimilarityStatus;
  category: AISimilarityCategory;
  algorithm: AISimilarityAlgorithm;
  threshold: AISimilarityThreshold;
  range: AISimilarityRange;
  metric: AISimilarityMetric;
  format: AISimilarityFormat;
  normalization: AISimilarityNormalization;
  score: number;
  normalizedScore: number;
  isActive: boolean;
  isCalculating: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Similarity Filter
 */
export interface AISimilarityFilter {
  ids?: ID[];
  modelIds?: ID[];
  sourceIds?: ID[];
  targetIds?: ID[];
  types?: AISimilarityType[];
  statuses?: AISimilarityStatus[];
  categories?: AISimilarityCategory[];
  algorithms?: AISimilarityAlgorithm[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minScore?: number;
  maxScore?: number;
  minNormalizedScore?: number;
  maxNormalizedScore?: number;
  isActive?: boolean;
  isCalculating?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
}

/**
 * AI Similarity Statistics
 */
export interface AISimilarityStatistics {
  modelId: ID;
  totalSimilarities: number;
  activeSimilarities: number;
  calculatingSimilarities: number;
  failedSimilarities: number;
  byType: Record<AISimilarityType, number>;
  byStatus: Record<AISimilarityStatus, number>;
  byCategory: Record<AISimilarityCategory, number>;
  byAlgorithm: Record<AISimilarityAlgorithm, number>;
  byMetric: Record<AISimilarityMetric, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageScore: number;
  maxScore: number;
  minScore: number;
  averageNormalizedScore: number;
  maxNormalizedScore: number;
  minNormalizedScore: number;
  mostFrequentType: AISimilarityType;
  mostFrequentCategory: AISimilarityCategory;
  mostFrequentAlgorithm: AISimilarityAlgorithm;
}

/**
 * AI Similarity Summary
 */
export interface AISimilaritySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSimilarities: number;
  active: number;
  calculating: number;
  failed: number;
  byType: Record<AISimilarityType, number>;
  byStatus: Record<AISimilarityStatus, number>;
  byCategory: Record<AISimilarityCategory, number>;
  byAlgorithm: Record<AISimilarityAlgorithm, number>;
  byMetric: Record<AISimilarityMetric, number>;
  similarityTrend: {
    date: Date;
    total: number;
    active: number;
    calculating: number;
  }[];
  topTypes: {
    type: AISimilarityType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: AISimilarityCategory;
    count: number;
    label: string;
  }[];
  topAlgorithms: {
    algorithm: AISimilarityAlgorithm;
    count: number;
    label: string;
  }[];
}

/**
 * AI Similarity Configuration
 */
export interface AISimilarityConfiguration {
  enabled: boolean;
  defaultType: AISimilarityType;
  defaultCategory: AISimilarityCategory;
  defaultAlgorithm: AISimilarityAlgorithm;
  defaultMetric: AISimilarityMetric;
  defaultFormat: AISimilarityFormat;
  defaultNormalization: AISimilarityNormalization;
  defaultThreshold: number;
  defaultTopK: number;
  maxTopK: number;
  maxSimilaritiesPerModel: number;
  enableCache: boolean;
  cacheTTLSeconds: number;
  enableLogging: boolean;
  notificationOnCalculate: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AISimilarityAlertConfig;
}

/**
 * AI Similarity Alert Configuration
 */
export interface AISimilarityAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  qualityDropAlert: boolean;
  qualityDropThreshold: number;
  algorithmMismatchAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Similarity History
 */
export interface AISimilarityHistory extends BaseEntity, Timestamp {
  id: ID;
  similarityId: ID;
  modelId: ID;
  action: 'create' | 'update' | 'calculate' | 'complete' | 'fail' | 'retry' | 'cancel' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Similarity Validation
 */
export interface AISimilarityValidation {
  isValid: boolean;
  similarityId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Similarity Export
 */
export interface AISimilarityExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AISimilarityFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Similarity Batch
 */
export interface AISimilarityBatch extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  similarities: AISimilarity[];
  batchSize: number;
  totalItems: number;
  processedItems: number;
  failedItems: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Similarity Matrix
 */
export interface AISimilarityMatrix extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  name: string;
  description?: string;
  items: ID[];
  matrix: number[][];
  size: number;
  algorithm: AISimilarityAlgorithm;
  metric: AISimilarityMetric;
  calculatedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Similarity
  AI_SIMILARITY,
  AISimilarityType,
  AISimilarityStatus,
  AISimilarityCategory,
  AISimilarityAlgorithm,
  AISimilarityThreshold,
  AISimilarityRange,
  AISimilarityLimit,
  AISimilarityMetric,
  AISimilarityFormat,
  AISimilarityNormalization,
  getAiSimilarityTypeLabel,
  getAiSimilarityStatusLabel,
  getAiSimilarityCategoryLabel,
  getAiSimilarityAlgorithmLabel,
  getAiSimilarityThresholdLabel,
  getAiSimilarityFormatLabel,
  getAiSimilarityNormalizationLabel,
  isAiSimilarityActive,
  isAiSimilarityCalculating,
  isAiSimilarityFailed,
  getAiSimilarityDefaultThreshold,
  getAiSimilarityDefaultTopK,
  getAiSimilarityMaxTopK,
  normalizeAiSimilarityScore,
  denormalizeAiSimilarityScore,
  getAiSimilarityRange,
  getAiSimilarityAlgorithmForType,
  // Similarity Type
  AI_SIMILARITY_TYPE,
  AISimilarityDomain,
  AISimilaritySubType,
  AISimilarityLevel,
  AISimilarityConfidence,
  AISimilarityPrecision,
  AISimilarityUseCase,
  getAiSimilarityDomainLabel,
  getAiSimilaritySubTypeLabel,
  getAiSimilarityLevelLabel,
  getAiSimilarityConfidenceLabel,
  getAiSimilarityPrecisionLabel,
  getAiSimilarityUseCaseLabel,
  getAiSimilarityLevelThreshold,
  getAiSimilarityConfidenceScore,
  // Similarity Status
  AI_SIMILARITY_STATUS_TYPES,
  AI_SIMILARITY_STATUS,
  AISimilarityStatusType,
  AISimilarityStatusCategory,
  AISimilarityStatusSeverity,
  AISimilarityStatusColor,
  getAiSimilarityStatusLabelDetailed,
  getAiSimilarityStatusCategory,
  getAiSimilarityStatusSeverity,
  getAiSimilarityStatusColor,
  isAiSimilarityActiveStatus,
  isAiSimilarityCompleted,
  isAiSimilarityFailedStatus,
  getAiSimilarityStatusProgress,
};
