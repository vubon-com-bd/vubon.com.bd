/**
 * AI Feature Types
 * Type definitions for AI features based on shared-constants
 * @module AIFeatureTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import AIFeature from ai-model.types
// ============================================================
import type { AIFeature } from './ai-model.types';

// ============================================================
// Import from shared-constants ai feature
// ============================================================
import {
  // Forecast (for feature compatibility)
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
// AI Feature Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * AI Feature Group
 */
export interface AIFeatureGroup extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  features: AIFeature[];
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * AI Feature Filter
 */
export interface AIFeatureFilter {
  ids?: ID[];
  modelIds?: ID[];
  names?: string[];
  types?: (
    | 'numeric'
    | 'categorical'
    | 'text'
    | 'image'
    | 'audio'
    | 'video'
    | 'embedding'
    | 'time_series'
    | 'geo'
    | 'binary'
  )[];
  dataTypes?: (
    'integer' | 'float' | 'string' | 'boolean' | 'date' | 'datetime' | 'array' | 'object'
  )[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isRequired?: boolean;
  isIndexed?: boolean;
  isSearchable?: boolean;
  searchTerm?: string;
}

/**
 * AI Feature Statistics
 */
export interface AIFeatureStatistics {
  modelId: ID;
  totalFeatures: number;
  activeFeatures: number;
  requiredFeatures: number;
  indexedFeatures: number;
  searchableFeatures: number;
  byType: Record<string, number>;
  byDataType: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: string;
  mostFrequentDataType: string;
}

/**
 * AI Feature Summary
 */
export interface AIFeatureSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalFeatures: number;
  active: number;
  required: number;
  indexed: number;
  searchable: number;
  byType: Record<string, number>;
  byDataType: Record<string, number>;
  featureTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: string;
    count: number;
    label: string;
  }[];
  topDataTypes: {
    dataType: string;
    count: number;
    label: string;
  }[];
}

/**
 * AI Feature Configuration
 */
export interface AIFeatureConfiguration {
  enabled: boolean;
  defaultType: 'numeric' | 'categorical' | 'text' | 'embedding';
  defaultDataType: 'integer' | 'float' | 'string' | 'boolean';
  maxFeaturesPerModel: number;
  requireDescription: boolean;
  requireDefaultValue: boolean;
  autoIndexFeatures: boolean;
  autoSearchable: boolean;
  allowDuplicateNames: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: AIFeatureAlertConfig;
}

/**
 * AI Feature Alert Configuration
 */
export interface AIFeatureAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  invalidTypeAlert: boolean;
  maxLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  maxLimitThreshold: number;
}

/**
 * AI Feature History
 */
export interface AIFeatureHistory extends BaseEntity, Timestamp {
  id: ID;
  featureId: ID;
  modelId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Feature Validation
 */
export interface AIFeatureValidation {
  isValid: boolean;
  featureId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Feature Export
 */
export interface AIFeatureExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'yaml' | 'xml';
  filter: AIFeatureFilter;
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
  // Forecast (for feature compatibility)
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
