/**
 * Analytics Query Types
 * Type definitions for analytics queries based on shared-constants
 * @module AnalyticsQueryTypes
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
// Analytics Query Types
// ============================================================

/**
 * Analytics query
 */
export interface AnalyticsQuery {
  /** Metrics to query */
  metrics: AnalyticsMetric[];
  /** Dimensions to group by */
  dimensions?: AnalyticsDimension[];
  /** Timeframe for the query */
  timeframe: AnalyticsTimeframe;
  /** Time interval */
  interval?: AnalyticsInterval;
  /** Aggregation type */
  aggregation?: AnalyticsAggregationType;
  /** Comparison type */
  comparison?: AnalyticsComparisonType;
  /** Trend type */
  trend?: AnalyticsTrendType;
  /** Filters to apply */
  filters?: AnalyticsQueryFilter[];
  /** Sort configuration */
  sort?: AnalyticsQuerySort[];
  /** Limit results */
  limit?: number;
  /** Offset results */
  offset?: number;
  /** Include metadata */
  includeMetadata?: boolean;
  /** Query metadata */
  metadata?: Metadata;
}

/**
 * Analytics query filter
 */
export interface AnalyticsQueryFilter {
  /** Field to filter */
  field: string;
  /** Operator for the filter */
  operator: AnalyticsFilterOperator;
  /** Value to filter by */
  value: unknown;
  /** Data type of the field */
  dataType?: AnalyticsFilterDataType;
  /** Category of the filter */
  category?: AnalyticsFilterCategory;
  /** Logic type for the filter */
  logicType?: AnalyticsFilterLogicType;
  /** Match type for the filter */
  matchType?: AnalyticsFilterMatchType;
}

/**
 * Analytics query sort
 */
export interface AnalyticsQuerySort {
  /** Field to sort by */
  field: string;
  /** Sort direction */
  direction: 'asc' | 'desc';
}

/**
 * Analytics query result
 */
export interface AnalyticsQueryResult {
  /** Query that generated this result */
  query: AnalyticsQuery;
  /** Data points */
  data: AnalyticsDataPoint[];
  /** Total results */
  total: number;
  /** Summary statistics */
  summary: {
    total: number;
    average: number;
    min: number;
    max: number;
    standardDeviation?: number;
  };
  /** Trend analysis */
  trend?: AnalyticsTrendResult;
  /** Comparison analysis */
  comparison?: AnalyticsComparisonResult;
  /** Timestamp */
  timestamp: Date;
}

/**
 * Analytics data point
 */
export interface AnalyticsDataPoint {
  /** Dimension values */
  dimensions: Record<string, string>;
  /** Metric values */
  metrics: Record<string, number>;
  /** Timestamp */
  timestamp: Date;
  /** Additional data */
  data?: Record<string, unknown>;
}

/**
 * Analytics trend result
 */
export interface AnalyticsTrendResult {
  /** Trend type */
  type: AnalyticsTrendType;
  /** Trend strength */
  strength: AnalyticsTrendStrength;
  /** Trend direction */
  direction: AnalyticsTrendDirection;
  /** Trend pattern */
  pattern: AnalyticsTrendPattern;
  /** Trend method */
  method: AnalyticsTrendMethod;
  /** Confidence score */
  confidence: AnalyticsTrendConfidence;
  /** Horizon */
  horizon: AnalyticsTrendHorizon;
  /** Slope of the trend */
  slope: number;
  /** Intercept of the trend */
  intercept: number;
  /** R-squared value */
  rSquared: number;
  /** Forecasted values */
  forecast?: AnalyticsDataPoint[];
}

/**
 * Analytics comparison result
 */
export interface AnalyticsComparisonResult {
  /** Comparison type */
  type: AnalyticsComparisonType;
  /** Comparison method */
  method: AnalyticsComparisonMethod;
  /** Comparison direction */
  direction: AnalyticsComparisonDirection;
  /** Significance level */
  significance: AnalyticsComparisonSignificance;
  /** Comparison unit */
  unit: AnalyticsComparisonUnit;
  /** Current value */
  currentValue: number;
  /** Previous value */
  previousValue: number;
  /** Absolute change */
  absoluteChange: number;
  /** Percentage change */
  percentageChange: number;
  /** Whether the change is significant */
  isSignificant: boolean;
}

/**
 * Analytics query validation
 */
export interface AnalyticsQueryValidation {
  /** Whether the query is valid */
  isValid: boolean;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions for improvement */
  suggestions?: string[];
}

/**
 * Analytics query export
 */
export interface AnalyticsQueryExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  query: AnalyticsQuery;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
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
