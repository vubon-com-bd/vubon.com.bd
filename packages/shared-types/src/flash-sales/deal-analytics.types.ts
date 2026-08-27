/**
 * Deal Analytics Types
 * Type definitions for deal analytics based on shared-constants
 * @module DealAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants analytics
// ============================================================
import {
  // Analytics Aggregation
  ANALYTICS_AGGREGATION,
  AnalyticsAggregationType,
  AnalyticsAggregationCategory,
  AnalyticsAggregationLevel,
  AnalyticsAggregationScope,
  AnalyticsAggregationPrecision,
  getAnalyticsAggregationLabel,
  getAnalyticsAggregationCategoryLabel,
  getAnalyticsAggregationLevelLabel,
  getAnalyticsAggregationScopeLabel,
  getAnalyticsAggregationPrecisionLabel,
  isAnalyticsAggregationStatistical,
  isAnalyticsAggregationMathematical,
  isAnalyticsAggregationTimeSeries,
  isAnalyticsAggregationApproximate,
  getAnalyticsAggregationCategory,
  // Analytics Comparison
  ANALYTICS_COMPARISON,
  AnalyticsComparisonType,
  AnalyticsComparisonMethod,
  AnalyticsComparisonDirection,
  AnalyticsComparisonSignificance,
  AnalyticsComparisonUnit,
  getAnalyticsComparisonLabel,
  getAnalyticsComparisonMethodLabel,
  getAnalyticsComparisonDirectionLabel,
  getAnalyticsComparisonSignificanceLabel,
  getAnalyticsComparisonUnitLabel,
  isAnalyticsComparisonPeriodBased,
  isAnalyticsComparisonBenchmarkBased,
  getAnalyticsComparisonDirection,
  getAnalyticsComparisonSignificance,
  // Analytics Trend
  ANALYTICS_TREND,
  AnalyticsTrendType,
  AnalyticsTrendStrength,
  AnalyticsTrendDirection,
  AnalyticsTrendPattern,
  AnalyticsTrendMethod,
  AnalyticsTrendConfidence,
  AnalyticsTrendHorizon,
  getAnalyticsTrendLabelName,
  getAnalyticsTrendStrengthLabel,
  getAnalyticsTrendDirectionLabel,
  getAnalyticsTrendPatternLabel,
  getAnalyticsTrendMethodLabel,
  getAnalyticsTrendConfidenceLabel,
  getAnalyticsTrendHorizonLabel,
  isAnalyticsTrendUpward,
  isAnalyticsTrendDownward,
  isAnalyticsTrendStable,
  getAnalyticsTrendDirection,
  getAnalyticsTrendStrength,
  // Analytics Status
  ANALYTICS_STATUS,
  AnalyticsStatusCode,
  AnalyticsStatusCategory,
  AnalyticsStatusPriority,
  AnalyticsStatusVisibility,
  AnalyticsStatusAction,
  getAnalyticsStatusCodeLabel,
  getAnalyticsStatusCategoryLabel,
  getAnalyticsStatusPriorityLabel,
  getAnalyticsStatusVisibilityLabel,
  getAnalyticsStatusActionLabel,
  isAnalyticsStatusSuccess,
  isAnalyticsStatusProcessing,
  isAnalyticsStatusFailure,
  isAnalyticsStatusFinal,
  getAnalyticsStatusCategory,
} from '@vubon/shared-constants';

// ============================================================
// Deal Analytics Extended Types
// ============================================================

/**
 * Deal Analytics
 */
export interface DealAnalytics extends BaseEntity, Timestamp {
  id: ID;
  dealId: ID;
  flashSaleId: ID;
  metric: string;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  aggregation: AnalyticsAggregationType;
  comparison?: AnalyticsComparisonType;
  trend?: AnalyticsTrendType;
  status: AnalyticsStatusCode;
  period: {
    start: Date;
    end: Date;
  };
  metadata?: Metadata;
}

/**
 * Deal Analytics Filter
 */
export interface DealAnalyticsFilter {
  ids?: ID[];
  dealIds?: ID[];
  flashSaleIds?: ID[];
  metrics?: string[];
  aggregations?: AnalyticsAggregationType[];
  comparisons?: AnalyticsComparisonType[];
  trends?: AnalyticsTrendType[];
  statuses?: AnalyticsStatusCode[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Deal Analytics Statistics
 */
export interface DealAnalyticsStatistics {
  dealId: ID;
  totalAnalytics: number;
  byMetric: Record<string, number>;
  byAggregation: Record<AnalyticsAggregationType, number>;
  byStatus: Record<AnalyticsStatusCode, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentMetric: string;
  mostFrequentAggregation: AnalyticsAggregationType;
}

/**
 * Deal Analytics Summary
 */
export interface DealAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAnalytics: number;
  byMetric: Record<string, number>;
  byAggregation: Record<AnalyticsAggregationType, number>;
  byStatus: Record<AnalyticsStatusCode, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    value: number;
  }[];
  topMetrics: {
    metric: string;
    count: number;
    value: number;
  }[];
  performanceMetrics: {
    averageValue: number;
    maxValue: number;
    minValue: number;
  };
}

/**
 * Deal Analytics Configuration
 */
export interface DealAnalyticsConfiguration {
  enabled: boolean;
  defaultAggregation: AnalyticsAggregationType;
  defaultComparison: AnalyticsComparisonType;
  defaultTrend: AnalyticsTrendType;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnComplete: boolean;
  notificationOnError: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: DealAnalyticsAlertConfig;
}

/**
 * Deal Analytics Alert Configuration
 */
export interface DealAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  trendChangeAlert: boolean;
  trendChangeThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Deal Analytics Data Point
 */
export interface DealAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  dealId: ID;
  metric: string;
  value: number;
  timestamp: Date;
  dimension?: string;
  metadata?: Metadata;
}

/**
 * Deal Analytics Comparison Result
 */
export interface DealAnalyticsComparisonResult {
  type: AnalyticsComparisonType;
  method: AnalyticsComparisonMethod;
  direction: AnalyticsComparisonDirection;
  significance: AnalyticsComparisonSignificance;
  unit: AnalyticsComparisonUnit;
  currentValue: number;
  previousValue: number;
  absoluteChange: number;
  percentageChange: number;
  isSignificant: boolean;
}

/**
 * Deal Analytics Trend Result
 */
export interface DealAnalyticsTrendResult {
  type: AnalyticsTrendType;
  strength: AnalyticsTrendStrength;
  direction: AnalyticsTrendDirection;
  pattern: AnalyticsTrendPattern;
  method: AnalyticsTrendMethod;
  confidence: AnalyticsTrendConfidence;
  horizon: AnalyticsTrendHorizon;
  slope: number;
  intercept: number;
  rSquared: number;
  forecast: DealAnalyticsDataPoint[];
}

/**
 * Deal Analytics Export
 */
export interface DealAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  dealId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DealAnalyticsFilter;
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
  // Analytics Aggregation
  ANALYTICS_AGGREGATION,
  AnalyticsAggregationType,
  AnalyticsAggregationCategory,
  AnalyticsAggregationLevel,
  AnalyticsAggregationScope,
  AnalyticsAggregationPrecision,
  getAnalyticsAggregationLabel,
  getAnalyticsAggregationCategoryLabel,
  getAnalyticsAggregationLevelLabel,
  getAnalyticsAggregationScopeLabel,
  getAnalyticsAggregationPrecisionLabel,
  isAnalyticsAggregationStatistical,
  isAnalyticsAggregationMathematical,
  isAnalyticsAggregationTimeSeries,
  isAnalyticsAggregationApproximate,
  getAnalyticsAggregationCategory,
  // Analytics Comparison
  ANALYTICS_COMPARISON,
  AnalyticsComparisonType,
  AnalyticsComparisonMethod,
  AnalyticsComparisonDirection,
  AnalyticsComparisonSignificance,
  AnalyticsComparisonUnit,
  getAnalyticsComparisonLabel,
  getAnalyticsComparisonMethodLabel,
  getAnalyticsComparisonDirectionLabel,
  getAnalyticsComparisonSignificanceLabel,
  getAnalyticsComparisonUnitLabel,
  isAnalyticsComparisonPeriodBased,
  isAnalyticsComparisonBenchmarkBased,
  getAnalyticsComparisonDirection,
  getAnalyticsComparisonSignificance,
  // Analytics Trend
  ANALYTICS_TREND,
  AnalyticsTrendType,
  AnalyticsTrendStrength,
  AnalyticsTrendDirection,
  AnalyticsTrendPattern,
  AnalyticsTrendMethod,
  AnalyticsTrendConfidence,
  AnalyticsTrendHorizon,
  getAnalyticsTrendLabelName,
  getAnalyticsTrendStrengthLabel,
  getAnalyticsTrendDirectionLabel,
  getAnalyticsTrendPatternLabel,
  getAnalyticsTrendMethodLabel,
  getAnalyticsTrendConfidenceLabel,
  getAnalyticsTrendHorizonLabel,
  isAnalyticsTrendUpward,
  isAnalyticsTrendDownward,
  isAnalyticsTrendStable,
  getAnalyticsTrendDirection,
  getAnalyticsTrendStrength,
  // Analytics Status
  ANALYTICS_STATUS,
  AnalyticsStatusCode,
  AnalyticsStatusCategory,
  AnalyticsStatusPriority,
  AnalyticsStatusVisibility,
  AnalyticsStatusAction,
  getAnalyticsStatusCodeLabel,
  getAnalyticsStatusCategoryLabel,
  getAnalyticsStatusPriorityLabel,
  getAnalyticsStatusVisibilityLabel,
  getAnalyticsStatusActionLabel,
  isAnalyticsStatusSuccess,
  isAnalyticsStatusProcessing,
  isAnalyticsStatusFailure,
  isAnalyticsStatusFinal,
  getAnalyticsStatusCategory,
};
