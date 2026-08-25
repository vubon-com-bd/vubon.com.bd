/**
 * Search Analytics Types
 * Type definitions for search analytics based on shared-constants
 * @module SearchAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants search analytics
// ============================================================
import {
  // Analytics Constants
  SEARCH_ANALYTICS,
  SearchAnalyticsType,
  SearchAnalyticsMetric,
  SearchAnalyticsDimension,
  SearchAnalyticsTimeframe,
  SearchAnalyticsAggregation,
  SearchAnalyticsDefault,
  SearchAnalyticsLimit,
  searchAnalyticsGetTypeLabel,
  searchAnalyticsGetMetricLabel,
  searchAnalyticsGetDimensionLabel,
  searchAnalyticsGetTimeframeLabel,
  searchAnalyticsGetAggregationLabel,
  searchAnalyticsGetDefaultTimeframe,
  searchAnalyticsGetMaxMetrics,
  searchAnalyticsGetDataRetentionDays,
} from '@vubon/shared-constants';

// ============================================================
// Search Analytics Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Analytics data point
 */
export interface SearchAnalyticsDataPoint {
  /** Dimension value */
  dimension: string;
  /** Metric value */
  metric: number;
  /** Timestamp */
  timestamp: Date;
  /** Additional data */
  data?: Record<string, unknown>;
}

/**
 * Analytics query
 */
export interface SearchAnalyticsQuery {
  /** Metrics to include */
  metrics: SearchAnalyticsMetric[];
  /** Dimensions to group by */
  dimensions?: SearchAnalyticsDimension[];
  /** Timeframe */
  timeframe: SearchAnalyticsTimeframe;
  /** Aggregation */
  aggregation?: SearchAnalyticsAggregation;
  /** Filter */
  filter?: Record<string, unknown>;
  /** Start date */
  startDate?: Date;
  /** End date */
  endDate?: Date;
  /** Limit */
  limit?: number;
  /** Offset */
  offset?: number;
}

/**
 * Analytics report
 */
export interface SearchAnalyticsReport extends BaseEntity, Timestamp {
  id: ID;
  title: string;
  description?: string;
  type: SearchAnalyticsType;
  timeframe: SearchAnalyticsTimeframe;
  metrics: SearchAnalyticsMetric[];
  dimensions: SearchAnalyticsDimension[];
  data: SearchAnalyticsDataPoint[];
  insights: SearchAnalyticsInsight[];
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fileUrl?: string;
  metadata?: Metadata;
}

/**
 * Analytics insight
 */
export interface SearchAnalyticsInsight {
  /** Insight title */
  title: string;
  /** Insight description */
  description: string;
  /** Insight type */
  type: 'trend' | 'anomaly' | 'correlation' | 'forecast' | 'recommendation';
  /** Severity */
  severity: 'info' | 'warning' | 'critical';
  /** Metrics involved */
  metrics: SearchAnalyticsMetric[];
  /** Dimensions involved */
  dimensions?: SearchAnalyticsDimension[];
  /** Data points */
  data: SearchAnalyticsDataPoint[];
  /** Recommendation */
  recommendation?: string;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics configuration
 */
export interface SearchAnalyticsConfiguration {
  /** Enable analytics */
  enabled: boolean;
  /** Default timeframe */
  defaultTimeframe: SearchAnalyticsTimeframe;
  /** Max metrics per query */
  maxMetrics: number;
  /** Data retention in days */
  dataRetentionDays: number;
  /** Enable auto insights */
  enableAutoInsights: boolean;
  /** Enable trend analysis */
  enableTrendAnalysis: boolean;
  /** Enable anomaly detection */
  enableAnomalyDetection: boolean;
  /** Enable forecasting */
  enableForecasting: boolean;
  /** Insight threshold */
  insightThreshold: number;
}

/**
 * Analytics validation
 */
export interface SearchAnalyticsValidation {
  /** Whether the analytics config is valid */
  isValid: boolean;
  /** Analytics type */
  type: SearchAnalyticsType;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Analytics statistics
 */
export interface SearchAnalyticsStatistics {
  /** Total analytics queries */
  totalQueries: number;
  /** Queries by type */
  byType: Record<SearchAnalyticsType, number>;
  /** Queries by metric */
  byMetric: Record<SearchAnalyticsMetric, number>;
  /** Queries by dimension */
  byDimension: Record<SearchAnalyticsDimension, number>;
  /** Queries by timeframe */
  byTimeframe: Record<SearchAnalyticsTimeframe, number>;
  /** Average query time */
  avgQueryTime: number;
  /** Total data points */
  totalDataPoints: number;
  /** Most common metric */
  mostCommonMetric: SearchAnalyticsMetric;
  /** Most common dimension */
  mostCommonDimension: SearchAnalyticsDimension;
  /** Insights generated */
  totalInsights: number;
  /** Performance */
  performance: {
    avgTimeMs: number;
    minTimeMs: number;
    maxTimeMs: number;
  };
}

/**
 * Analytics trend
 */
export interface SearchAnalyticsTrend {
  /** Trend type */
  type: 'up' | 'down' | 'stable' | 'volatile';
  /** Confidence score (0-1) */
  confidence: number;
  /** Data points */
  dataPoints: SearchAnalyticsDataPoint[];
  /** Slope */
  slope?: number;
  /** Intercept */
  intercept?: number;
  /** R-squared */
  rSquared?: number;
  /** Forecast */
  forecast?: SearchAnalyticsDataPoint[];
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics anomaly
 */
export interface SearchAnalyticsAnomaly {
  /** Anomaly type */
  type: 'spike' | 'drop' | 'outlier';
  /** Severity (0-1) */
  severity: number;
  /** Affected metric */
  metric: SearchAnalyticsMetric;
  /** Affected dimension */
  dimension?: SearchAnalyticsDimension;
  /** Anomaly data point */
  dataPoint: SearchAnalyticsDataPoint;
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

// ============================================================
// Re-export Everything (শুধুমাত্র নতুন টাইপ)
// ============================================================

export {
  // Analytics Constants
  SEARCH_ANALYTICS,
  SearchAnalyticsType,
  SearchAnalyticsMetric,
  SearchAnalyticsDimension,
  SearchAnalyticsTimeframe,
  SearchAnalyticsAggregation,
  SearchAnalyticsDefault,
  SearchAnalyticsLimit,
  searchAnalyticsGetTypeLabel,
  searchAnalyticsGetMetricLabel,
  searchAnalyticsGetDimensionLabel,
  searchAnalyticsGetTimeframeLabel,
  searchAnalyticsGetAggregationLabel,
  searchAnalyticsGetDefaultTimeframe,
  searchAnalyticsGetMaxMetrics,
  searchAnalyticsGetDataRetentionDays,
};
