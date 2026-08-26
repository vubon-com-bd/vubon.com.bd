/**
 * SEO Score Types
 * Type definitions for SEO scores based on shared-constants
 * @module SEOScoreTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOScoreType } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo score
// ============================================================
import {
  // SEO Score Main
  SEO_SCORE,
  SEOScoreStatus,
  SEOScoreRange,
  SEOScoreLabel,
  SEOScoreColor,
  SEOScoreWeightCategory,
  SEOScoreFactor,
  SEOScoreMetric,
  SEOScoreComparisonType,
  SEOScoreTrend,
  SEOScoreConfidence,
  getSEOScoreTypeLabel,
  getSEOScoreStatusLabel,
  getSEOScoreLabel as getSEOScoreLabelMain,
  getSEOScoreColor as getSEOScoreColorMain,
  getSEOScoreRange,
  getSEOScoreWeightLabel,
  getSEOScoreFactorLabel,
  getSEOScoreTrendLabel,
  getSEOScoreComparisonLabel,
  getSEOScoreConfidenceLabel,
  calculateWeightedScore,
  getScoreCategory,
  isScoreGood,
  isScoreExcellent,
  isScoreOutstanding,
  // SEO Score Type
  SEO_SCORE_TYPE,
  SEOScoreTypeCategory,
  SEOScoreTypeMethodology,
  SEOScoreTypeGranularity,
  SEOScoreTypeContext,
  SEOScoreTypeFormat,
  SEOScoreTypePerspective,
  SEOScoreTypeDimension,
  getSEOScoreCategoryTypeLabel,
  getSEOScoreMethodologyLabel,
  getSEOScoreGranularityLabel,
  getSEOScoreContextLabel,
  getSEOScoreFormatLabel,
  getSEOScorePerspectiveLabel,
  getSEOScoreDimensionLabel,
  // SEO Score Status
  SEO_SCORE_STATUS,
  SEOScoreLifecycleStatus,
  SEOScoreQualityStatus,
  SEOScoreAccuracyStatus,
  SEOScoreReliabilityStatus,
  SEOScoreFreshnessStatus,
  SEOScoreValidationStatus,
  SEOScoreStatusCategory,
  getSEOScoreLifecycleLabel,
  getSEOScoreQualityStatusLabel,
  getSEOScoreAccuracyLabel,
  getSEOScoreReliabilityLabel,
  getSEOScoreFreshnessLabel,
  getSEOScoreValidationLabel,
  getSEOScoreStatusCategory,
  getSEOScoreStatusColor,
  isScoreCompleted,
  isScoreValid,
  isScoreOutdated,
} from '@vubon/shared-constants';

// ============================================================
// SEO Score Extended Types
// ============================================================

/**
 * SEO score
 */
export interface SEOScore extends BaseEntity, Timestamp {
  id: ID;
  url: string;
  type: SEOScoreType;
  status: SEOScoreStatus;
  score: number;
  range: SEOScoreRange;
  label: SEOScoreLabel;
  color: SEOScoreColor;
  weightCategory: SEOScoreWeightCategory;
  factors: SEOScoreFactor[];
  metrics: SEOScoreMetric[];
  comparisonType: SEOScoreComparisonType;
  trend: SEOScoreTrend;
  confidence: SEOScoreConfidence;
  isGood: boolean;
  isExcellent: boolean;
  isOutstanding: boolean;
  isCompleted: boolean;
  isValid: boolean;
  isOutdated: boolean;
  checkedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO score filter
 */
export interface SEOScoreFilter {
  ids?: ID[];
  urls?: string[];
  types?: SEOScoreType[];
  statuses?: SEOScoreStatus[];
  ranges?: string[];
  trends?: SEOScoreTrend[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isGood?: boolean;
  isExcellent?: boolean;
  isOutstanding?: boolean;
  isCompleted?: boolean;
  isValid?: boolean;
  isOutdated?: boolean;
  minScore?: number;
  maxScore?: number;
  searchTerm?: string;
}

/**
 * SEO score statistics
 */
export interface SEOScoreStatistics {
  totalScores: number;
  completedScores: number;
  validScores: number;
  outdatedScores: number;
  byType: Record<SEOScoreType, number>;
  byStatus: Record<SEOScoreStatus, number>;
  byRange: Record<string, number>;
  byTrend: Record<SEOScoreTrend, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageScore: number;
  maxScore: number;
  minScore: number;
  goodScores: number;
  excellentScores: number;
  outstandingScores: number;
  mostFrequentType: SEOScoreType;
  mostFrequentRange: string;
  mostFrequentTrend: SEOScoreTrend;
}

/**
 * SEO score summary
 */
export interface SEOScoreSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalScores: number;
  completed: number;
  valid: number;
  outdated: number;
  byType: Record<SEOScoreType, number>;
  byStatus: Record<SEOScoreStatus, number>;
  byRange: Record<string, number>;
  byTrend: Record<SEOScoreTrend, number>;
  scoreTrend: {
    date: Date;
    average: number;
    max: number;
    min: number;
  }[];
  topTypes: {
    type: SEOScoreType;
    count: number;
    label: string;
  }[];
  topRanges: {
    range: string;
    count: number;
    label: string;
  }[];
  topTrends: {
    trend: SEOScoreTrend;
    count: number;
    label: string;
  }[];
  scoreDistribution: {
    range: string;
    count: number;
    percentage: number;
  }[];
  performanceSummary: {
    average: number;
    max: number;
    min: number;
    good: number;
    excellent: number;
    outstanding: number;
  };
}

/**
 * SEO score configuration
 */
export interface SEOScoreConfiguration {
  enabled: boolean;
  defaultType: SEOScoreType;
  defaultStatus: SEOScoreStatus;
  defaultTrend: SEOScoreTrend;
  goodThreshold: number;
  excellentThreshold: number;
  outstandingThreshold: number;
  minScore: number;
  maxScore: number;
  autoCheck: boolean;
  autoUpdate: boolean;
  requireValidation: boolean;
  requireTrendAnalysis: boolean;
  requireConfidenceCheck: boolean;
  maxScoresPerUrl: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnGood: boolean;
  notificationOnExcellent: boolean;
  notificationOnOutstanding: boolean;
  alertConfig?: SEOScoreAlertConfig;
}

/**
 * SEO score alert configuration
 */
export interface SEOScoreAlertConfig {
  enabled: boolean;
  scoreDropAlert: boolean;
  scoreThresholdAlert: boolean;
  validationFailureAlert: boolean;
  outdatedScoreAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  scoreDropThreshold: number;
  scoreThreshold: number;
}

/**
 * SEO score history
 */
export interface SEOScoreHistory extends BaseEntity, Timestamp {
  id: ID;
  scoreId: ID;
  action: 'create' | 'update' | 'validate' | 'invalidate' | 'refresh' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO score validation
 */
export interface SEOScoreValidation {
  isValid: boolean;
  scoreId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO score factor
 */
export interface SEOScoreFactorDetail extends BaseEntity, Timestamp {
  id: ID;
  scoreId: ID;
  factor: SEOScoreFactor;
  weight: number;
  score: number;
  weightedScore: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * SEO score export
 */
export interface SEOScoreExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: SEOScoreFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (SEOScoreType বাদে)
// ============================================================

export {
  // SEO Score Main (SEOScoreType বাদে)
  SEO_SCORE,
  SEOScoreStatus,
  SEOScoreRange,
  SEOScoreLabel,
  SEOScoreColor,
  SEOScoreWeightCategory,
  SEOScoreFactor,
  SEOScoreMetric,
  SEOScoreComparisonType,
  SEOScoreTrend,
  SEOScoreConfidence,
  getSEOScoreTypeLabel,
  getSEOScoreStatusLabel,
  getSEOScoreLabelMain,
  getSEOScoreColorMain,
  getSEOScoreRange,
  getSEOScoreWeightLabel,
  getSEOScoreFactorLabel,
  getSEOScoreTrendLabel,
  getSEOScoreComparisonLabel,
  getSEOScoreConfidenceLabel,
  calculateWeightedScore,
  getScoreCategory,
  isScoreGood,
  isScoreExcellent,
  isScoreOutstanding,
  // SEO Score Type (SEOScoreType বাদে)
  SEO_SCORE_TYPE,
  SEOScoreTypeCategory,
  SEOScoreTypeMethodology,
  SEOScoreTypeGranularity,
  SEOScoreTypeContext,
  SEOScoreTypeFormat,
  SEOScoreTypePerspective,
  SEOScoreTypeDimension,
  getSEOScoreCategoryTypeLabel,
  getSEOScoreMethodologyLabel,
  getSEOScoreGranularityLabel,
  getSEOScoreContextLabel,
  getSEOScoreFormatLabel,
  getSEOScorePerspectiveLabel,
  getSEOScoreDimensionLabel,
  // SEO Score Status
  SEO_SCORE_STATUS,
  SEOScoreLifecycleStatus,
  SEOScoreQualityStatus,
  SEOScoreAccuracyStatus,
  SEOScoreReliabilityStatus,
  SEOScoreFreshnessStatus,
  SEOScoreValidationStatus,
  SEOScoreStatusCategory,
  getSEOScoreLifecycleLabel,
  getSEOScoreQualityStatusLabel,
  getSEOScoreAccuracyLabel,
  getSEOScoreReliabilityLabel,
  getSEOScoreFreshnessLabel,
  getSEOScoreValidationLabel,
  getSEOScoreStatusCategory,
  getSEOScoreStatusColor,
  isScoreCompleted,
  isScoreValid,
  isScoreOutdated,
};
