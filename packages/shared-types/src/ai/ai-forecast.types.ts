/**
 * AI Forecast Types
 * Type definitions for AI forecasting based on shared-constants
 * @module AIForecastTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai forecast
// ============================================================
import {
  // Forecast
  AI_FORECAST,
  AIForecastType,
  AIForecastStatus,
  AIForecastMethod,
  AIForecastHorizon,
  AIForecastFrequency,
  AIForecastConfidence,
  AIForecastQuality,
  AIForecastMetric,
  AIForecastLimit,
  AIForecastFeature,
  AIForecastOutput,
  AIForecastValidation,
  getAiForecastTypeLabel,
  getAiForecastStatusLabel,
  getAiForecastMethodLabel,
  getAiForecastHorizonLabel,
  getAiForecastFrequencyLabel,
  getAiForecastConfidenceLabel,
  getAiForecastQualityLabel,
  getAiForecastMetricLabel,
  getAiForecastOutputLabel,
  getAiForecastValidationLabel,
  isAiForecastActive,
  isAiForecastProcessing,
  isAiForecastFailed,
  getAiForecastDefaultHorizon,
  getAiForecastMaxHorizon,
  getAiForecastDefaultSamples,
  getAiForecastHorizonDays,
  getAiForecastConfidenceScore,
  getAiForecastQualityScore,
  // Forecast Type
  AI_FORECAST_TYPE,
  AIForecastDomain,
  AIForecastSubType,
  AIForecastComplexity,
  AIForecastAccuracy,
  AIForecastGranularity,
  AIForecastScope,
  getAiForecastDomainLabel,
  getAiForecastSubTypeLabel,
  getAiForecastComplexityLabel,
  getAiForecastAccuracyLabel,
  getAiForecastGranularityLabel,
  getAiForecastScopeLabel,
  getAiForecastComplexityScore,
  getAiForecastAccuracyScore,
  // Forecast Status
  AI_FORECAST_STATUS_TYPES,
  AI_FORECAST_STATUS,
  AIForecastStatusType,
  AIForecastStatusCategory,
  AIForecastStatusSeverity,
  AIForecastStatusColor,
  getAiForecastStatusLabelDetailed,
  getAiForecastStatusCategory,
  getAiForecastStatusSeverity,
  getAiForecastStatusColor,
  isAiForecastActiveStatus,
  isAiForecastCompleted,
  isAiForecastFailedStatus,
  getAiForecastStatusProgress,
} from '@vubon/shared-constants';

// ============================================================
// AI Forecast Extended Types
// ============================================================

/**
 * AI Forecast
 */
export interface AIForecast extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  userId: ID;
  type: AIForecastType;
  status: AIForecastStatus;
  method: AIForecastMethod;
  horizon: AIForecastHorizon;
  frequency: AIForecastFrequency;
  confidence: AIForecastConfidence;
  quality: AIForecastQuality;
  metrics: Record<AIForecastMetric, number>;
  features: AIForecastFeature[];
  outputs: AIForecastOutput[];
  validation: AIForecastValidation;
  isActive: boolean;
  isProcessing: boolean;
  isFailed: boolean;
  startedAt: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Forecast Filter
 */
export interface AIForecastFilter {
  ids?: ID[];
  modelIds?: ID[];
  userIds?: ID[];
  types?: AIForecastType[];
  statuses?: AIForecastStatus[];
  methods?: AIForecastMethod[];
  horizons?: AIForecastHorizon[];
  frequencies?: AIForecastFrequency[];
  domains?: AIForecastDomain[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isProcessing?: boolean;
  isFailed?: boolean;
  minConfidence?: number;
  maxConfidence?: number;
  minQuality?: number;
  maxQuality?: number;
  searchTerm?: string;
}

/**
 * AI Forecast Statistics
 */
export interface AIForecastStatistics {
  modelId: ID;
  totalForecasts: number;
  activeForecasts: number;
  processingForecasts: number;
  failedForecasts: number;
  byType: Record<AIForecastType, number>;
  byStatus: Record<AIForecastStatus, number>;
  byMethod: Record<AIForecastMethod, number>;
  byHorizon: Record<AIForecastHorizon, number>;
  byFrequency: Record<AIForecastFrequency, number>;
  byDomain: Record<AIForecastDomain, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageConfidence: number;
  maxConfidence: number;
  minConfidence: number;
  averageQuality: number;
  maxQuality: number;
  minQuality: number;
  mostFrequentType: AIForecastType;
  mostFrequentMethod: AIForecastMethod;
  mostFrequentHorizon: AIForecastHorizon;
}

/**
 * AI Forecast Summary
 */
export interface AIForecastSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalForecasts: number;
  active: number;
  processing: number;
  failed: number;
  byType: Record<AIForecastType, number>;
  byStatus: Record<AIForecastStatus, number>;
  byMethod: Record<AIForecastMethod, number>;
  byHorizon: Record<AIForecastHorizon, number>;
  byFrequency: Record<AIForecastFrequency, number>;
  byDomain: Record<AIForecastDomain, number>;
  forecastTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: AIForecastType;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: AIForecastMethod;
    count: number;
    label: string;
  }[];
  topHorizons: {
    horizon: AIForecastHorizon;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageConfidence: number;
    averageQuality: number;
    successRate: number;
    failureRate: number;
  };
}

/**
 * AI Forecast Configuration
 */
export interface AIForecastConfiguration {
  enabled: boolean;
  defaultType: AIForecastType;
  defaultMethod: AIForecastMethod;
  defaultHorizon: AIForecastHorizon;
  defaultFrequency: AIForecastFrequency;
  defaultConfidence: number;
  defaultSamples: number;
  maxHorizon: number;
  maxForecastsPerModel: number;
  enableCache: boolean;
  cacheTTLSeconds: number;
  enableLogging: boolean;
  notificationOnProcess: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AIForecastAlertConfig;
}

/**
 * AI Forecast Alert Configuration
 */
export interface AIForecastAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  confidenceDropAlert: boolean;
  confidenceDropThreshold: number;
  qualityDropAlert: boolean;
  qualityDropThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Forecast History
 */
export interface AIForecastHistory extends BaseEntity, Timestamp {
  id: ID;
  forecastId: ID;
  modelId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'retry' | 'cancel' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Forecast Validation
 */
export interface AIForecastValidationResult {
  isValid: boolean;
  forecastId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Forecast Export
 */
export interface AIForecastExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AIForecastFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Forecast Data Point
 */
export interface AIForecastDataPoint extends BaseEntity, Timestamp {
  id: ID;
  forecastId: ID;
  modelId: ID;
  timestamp: Date;
  value: number;
  lowerBound?: number;
  upperBound?: number;
  confidence: number;
  metadata?: Metadata;
}

/**
 * AI Forecast Batch
 */
export interface AIForecastBatch extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  forecasts: AIForecast[];
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
  // Forecast
  AI_FORECAST,
  AIForecastType,
  AIForecastStatus,
  AIForecastMethod,
  AIForecastHorizon,
  AIForecastFrequency,
  AIForecastConfidence,
  AIForecastQuality,
  AIForecastMetric,
  AIForecastLimit,
  AIForecastFeature,
  AIForecastOutput,
  AIForecastValidation,
  getAiForecastTypeLabel,
  getAiForecastStatusLabel,
  getAiForecastMethodLabel,
  getAiForecastHorizonLabel,
  getAiForecastFrequencyLabel,
  getAiForecastConfidenceLabel,
  getAiForecastQualityLabel,
  getAiForecastMetricLabel,
  getAiForecastOutputLabel,
  getAiForecastValidationLabel,
  isAiForecastActive,
  isAiForecastProcessing,
  isAiForecastFailed,
  getAiForecastDefaultHorizon,
  getAiForecastMaxHorizon,
  getAiForecastDefaultSamples,
  getAiForecastHorizonDays,
  getAiForecastConfidenceScore,
  getAiForecastQualityScore,
  // Forecast Type
  AI_FORECAST_TYPE,
  AIForecastDomain,
  AIForecastSubType,
  AIForecastComplexity,
  AIForecastAccuracy,
  AIForecastGranularity,
  AIForecastScope,
  getAiForecastDomainLabel,
  getAiForecastSubTypeLabel,
  getAiForecastComplexityLabel,
  getAiForecastAccuracyLabel,
  getAiForecastGranularityLabel,
  getAiForecastScopeLabel,
  getAiForecastComplexityScore,
  getAiForecastAccuracyScore,
  // Forecast Status
  AI_FORECAST_STATUS_TYPES,
  AI_FORECAST_STATUS,
  AIForecastStatusType,
  AIForecastStatusCategory,
  AIForecastStatusSeverity,
  AIForecastStatusColor,
  getAiForecastStatusLabelDetailed,
  getAiForecastStatusCategory,
  getAiForecastStatusSeverity,
  getAiForecastStatusColor,
  isAiForecastActiveStatus,
  isAiForecastCompleted,
  isAiForecastFailedStatus,
  getAiForecastStatusProgress,
};
