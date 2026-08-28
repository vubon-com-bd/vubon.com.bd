/**
 * Analytics Result Types
 * Type definitions for analytics results based on shared-constants
 * @module AnalyticsResultTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants analytics
// ============================================================
import {
  // Main Analytics
  AnalyticsType,
  AnalyticsStatus,
  AnalyticsTimeframe,
  AnalyticsInterval,
  AnalyticsAggregation,
  AnalyticsComparison,
  AnalyticsTrend,
  AnalyticsEvent,
  AnalyticsDimension,
  AnalyticsMetric,
  AnalyticsFilter,
  AnalyticsPermission,
  // Aggregation
  AnalyticsAggregationType,
  AnalyticsAggregationCategory,
  AnalyticsAggregationLevel,
  AnalyticsAggregationScope,
  AnalyticsAggregationPrecision,
  // Comparison
  AnalyticsComparisonType,
  AnalyticsComparisonMethod,
  AnalyticsComparisonDirection,
  AnalyticsComparisonSignificance,
  AnalyticsComparisonUnit,
  // Dimension
  AnalyticsUserDimension,
  AnalyticsSessionDimension,
  AnalyticsLocationDimension,
  AnalyticsDeviceDimension,
  AnalyticsTrafficDimension,
  AnalyticsProductDimension,
  AnalyticsOrderDimension,
  AnalyticsTimeDimension,
  AnalyticsPageDimension,
  AnalyticsEventDimension,
  AnalyticsMarketingDimension,
  AnalyticsSystemDimension,
  AnalyticsDimensionCategory,
  AnalyticsDimensionType,
  AnalyticsDimensionGranularity,
  // Filter
  AnalyticsFilterOperator,
  AnalyticsFilterDataType,
  AnalyticsFilterCategory,
  AnalyticsFilterLogicType,
  AnalyticsFilterMatchType,
  AnalyticsFilterPriority,
  AnalyticsFilterScope,
  // Interval
  AnalyticsIntervalType,
  AnalyticsIntervalCategory,
  AnalyticsIntervalUnit,
  AnalyticsIntervalFormat,
  AnalyticsIntervalGroupingType,
  // Metric
  AnalyticsBusinessMetric,
  AnalyticsCustomerMetric,
  AnalyticsSalesMetric,
  AnalyticsMarketingMetric,
  AnalyticsProductMetric,
  AnalyticsWebsiteMetric,
  AnalyticsSupportMetric,
  AnalyticsSystemMetric,
  AnalyticsMetricCategory,
  AnalyticsMetricType,
  AnalyticsMetricAggregation,
  AnalyticsMetricFormat,
  AnalyticsMetricPriority,
  // Period
  AnalyticsPeriodType,
  AnalyticsPeriodTypeEnum,
  AnalyticsPeriodGranularity,
  AnalyticsPeriodComparisonType,
  AnalyticsPeriodFormat,
  // Permission
  AnalyticsPermissionDetailType,
  AnalyticsPermissionResource,
  AnalyticsPermissionLevel,
  AnalyticsPermissionScope,
  AnalyticsPermissionAction,
  AnalyticsPermissionEffect,
  AnalyticsPermissionCondition,
  // Source
  AnalyticsSourceType,
  AnalyticsSourceCategory,
  AnalyticsSourceSubCategory,
  AnalyticsSourceTypeEnum,
  AnalyticsSourceConfidence,
  AnalyticsSourceValidity,
  // Status
  AnalyticsStatusCode,
  AnalyticsStatusCategory,
  AnalyticsStatusPriority,
  AnalyticsStatusVisibility,
  AnalyticsStatusAction,
  // Trend
  AnalyticsTrendType,
  AnalyticsTrendStrength,
  AnalyticsTrendDirection,
  AnalyticsTrendPattern,
  AnalyticsTrendMethod,
  AnalyticsTrendConfidence,
  AnalyticsTrendHorizon,
  // Type
  AnalyticsDataType,
  AnalyticsReportType,
  AnalyticsDataSource,
  AnalyticsGranularity,
  AnalyticsQuality,
  AnalyticsAnalysisType,
  AnalyticsRefreshRate,
  AnalyticsRetention,
  AnalyticsSensitivity,
  AnalyticsUsage,
} from '@vubon/shared-constants';

// ============================================================
// Import AnalyticsDataPoint from analytics-query.types
// ============================================================
import type { AnalyticsDataPoint } from './analytics-query.types';

// ============================================================
// Analytics Result Types
// ============================================================

/**
 * Analytics result
 */
export interface AnalyticsResult extends BaseEntity, Timestamp {
  id: ID;
  queryId: ID;
  type: AnalyticsType;
  status: AnalyticsStatus;
  timeframe: AnalyticsTimeframe;
  interval: AnalyticsInterval;
  aggregation: AnalyticsAggregationType;
  comparison: AnalyticsComparisonType;
  trend: AnalyticsTrendType;
  dimensions: AnalyticsDimension[];
  metrics: AnalyticsMetric[];
  data: AnalyticsDataPoint[];
  summary: AnalyticsSummary;
  metadata?: Metadata;
}

/**
 * Analytics summary
 */
export interface AnalyticsSummary {
  /** Total results */
  total: number;
  /** Average values */
  average: Record<string, number>;
  /** Minimum values */
  min: Record<string, number>;
  /** Maximum values */
  max: Record<string, number>;
  /** Standard deviation */
  standardDeviation?: Record<string, number>;
  /** Sum values */
  sum?: Record<string, number>;
  /** Count values */
  count?: Record<string, number>;
  /** Median values */
  median?: Record<string, number>;
  /** Percentile values */
  percentiles?: Record<string, number>;
}

/**
 * Analytics correlation result
 */
export interface AnalyticsCorrelationResult {
  /** Correlation coefficient */
  coefficient: number;
  /** Correlation strength */
  strength: 'weak' | 'moderate' | 'strong' | 'very_strong';
  /** Direction of correlation */
  direction: 'positive' | 'negative';
  /** P-value */
  pValue: number;
  /** Whether the correlation is significant */
  isSignificant: boolean;
  /** Variables correlated */
  variables: string[];
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics anomaly result
 */
export interface AnalyticsAnomalyResult {
  /** Anomaly type */
  type: 'spike' | 'drop' | 'outlier' | 'seasonal' | 'trend_change';
  /** Severity (0-1) */
  severity: number;
  /** Affected metric */
  metric: string;
  /** Affected dimension */
  dimension?: string;
  /** Anomaly data point */
  dataPoint: AnalyticsDataPoint;
  /** Expected value */
  expectedValue: number;
  /** Actual value */
  actualValue: number;
  /** Deviation percentage */
  deviationPercentage: number;
  /** Timestamp */
  timestamp: Date;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics segmentation result
 */
export interface AnalyticsSegmentationResult {
  /** Segment name */
  name: string;
  /** Segment criteria */
  criteria: Record<string, unknown>;
  /** Segment size */
  size: number;
  /** Segment metrics */
  metrics: Record<string, number>;
  /** Segment percentage */
  percentage: number;
  /** Segment comparison with other segments */
  comparison?: Record<string, number>;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics cohort result
 */
export interface AnalyticsCohortResult {
  /** Cohort name */
  name: string;
  /** Cohort criteria */
  criteria: Record<string, unknown>;
  /** Cohort size */
  size: number;
  /** Cohort periods */
  periods: AnalyticsCohortPeriod[];
  /** Retention rates */
  retentionRates: Record<string, number>;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics cohort period
 */
export interface AnalyticsCohortPeriod {
  /** Period name */
  name: string;
  /** Period start */
  startDate: Date;
  /** Period end */
  endDate: Date;
  /** Active users */
  activeUsers: number;
  /** Retention rate */
  retentionRate: number;
}

/**
 * Analytics export result
 */
export interface AnalyticsExportResult extends BaseEntity, Timestamp {
  id: ID;
  resultId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filename: string;
  fileSize: number;
  downloadUrl: string;
  expiresAt: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  errorMessage?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Main Analytics
  AnalyticsType,
  AnalyticsStatus,
  AnalyticsTimeframe,
  AnalyticsInterval,
  AnalyticsAggregation,
  AnalyticsComparison,
  AnalyticsTrend,
  AnalyticsEvent,
  AnalyticsDimension,
  AnalyticsMetric,
  AnalyticsFilter,
  AnalyticsPermission,
  // Aggregation
  AnalyticsAggregationType,
  AnalyticsAggregationCategory,
  AnalyticsAggregationLevel,
  AnalyticsAggregationScope,
  AnalyticsAggregationPrecision,
  // Comparison
  AnalyticsComparisonType,
  AnalyticsComparisonMethod,
  AnalyticsComparisonDirection,
  AnalyticsComparisonSignificance,
  AnalyticsComparisonUnit,
  // Dimension
  AnalyticsUserDimension,
  AnalyticsSessionDimension,
  AnalyticsLocationDimension,
  AnalyticsDeviceDimension,
  AnalyticsTrafficDimension,
  AnalyticsProductDimension,
  AnalyticsOrderDimension,
  AnalyticsTimeDimension,
  AnalyticsPageDimension,
  AnalyticsEventDimension,
  AnalyticsMarketingDimension,
  AnalyticsSystemDimension,
  AnalyticsDimensionCategory,
  AnalyticsDimensionType,
  AnalyticsDimensionGranularity,
  // Filter
  AnalyticsFilterOperator,
  AnalyticsFilterDataType,
  AnalyticsFilterCategory,
  AnalyticsFilterLogicType,
  AnalyticsFilterMatchType,
  AnalyticsFilterPriority,
  AnalyticsFilterScope,
  // Interval
  AnalyticsIntervalType,
  AnalyticsIntervalCategory,
  AnalyticsIntervalUnit,
  AnalyticsIntervalFormat,
  AnalyticsIntervalGroupingType,
  // Metric
  AnalyticsBusinessMetric,
  AnalyticsCustomerMetric,
  AnalyticsSalesMetric,
  AnalyticsMarketingMetric,
  AnalyticsProductMetric,
  AnalyticsWebsiteMetric,
  AnalyticsSupportMetric,
  AnalyticsSystemMetric,
  AnalyticsMetricCategory,
  AnalyticsMetricType,
  AnalyticsMetricAggregation,
  AnalyticsMetricFormat,
  AnalyticsMetricPriority,
  // Period
  AnalyticsPeriodType,
  AnalyticsPeriodTypeEnum,
  AnalyticsPeriodGranularity,
  AnalyticsPeriodComparisonType,
  AnalyticsPeriodFormat,
  // Permission
  AnalyticsPermissionDetailType,
  AnalyticsPermissionResource,
  AnalyticsPermissionLevel,
  AnalyticsPermissionScope,
  AnalyticsPermissionAction,
  AnalyticsPermissionEffect,
  AnalyticsPermissionCondition,
  // Source
  AnalyticsSourceType,
  AnalyticsSourceCategory,
  AnalyticsSourceSubCategory,
  AnalyticsSourceTypeEnum,
  AnalyticsSourceConfidence,
  AnalyticsSourceValidity,
  // Status
  AnalyticsStatusCode,
  AnalyticsStatusCategory,
  AnalyticsStatusPriority,
  AnalyticsStatusVisibility,
  AnalyticsStatusAction,
  // Trend
  AnalyticsTrendType,
  AnalyticsTrendStrength,
  AnalyticsTrendDirection,
  AnalyticsTrendPattern,
  AnalyticsTrendMethod,
  AnalyticsTrendConfidence,
  AnalyticsTrendHorizon,
  // Type
  AnalyticsDataType,
  AnalyticsReportType,
  AnalyticsDataSource,
  AnalyticsGranularity,
  AnalyticsQuality,
  AnalyticsAnalysisType,
  AnalyticsRefreshRate,
  AnalyticsRetention,
  AnalyticsSensitivity,
  AnalyticsUsage,
};
