/**
 * Analytics Sort Types
 * Type definitions for analytics sorting based on shared-constants
 * @module AnalyticsSortTypes
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
} from '@vubon/shared-constants';

// ============================================================
// Analytics Sort Extended Types
// ============================================================

/**
 * Analytics sort field
 */
export interface AnalyticsSortField {
  /** Field name to sort by */
  field: string;
  /** Sort direction */
  direction: 'asc' | 'desc';
  /** Sort priority (lower number = higher priority) */
  priority?: number;
  /** Sort type */
  type?: 'string' | 'number' | 'date' | 'boolean';
  /** Sort mode */
  mode?: 'min' | 'max' | 'avg' | 'sum' | 'median';
  /** Sort order */
  order?: 'ascending' | 'descending';
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics sort configuration
 */
export interface AnalyticsSortConfiguration {
  /** Default sort field */
  defaultField: string;
  /** Default sort direction */
  defaultDirection: 'asc' | 'desc';
  /** Maximum number of sort fields */
  maxSortFields: number;
  /** Allowed sort fields */
  allowedFields: string[];
  /** Allowed sort directions */
  allowedDirections: ('asc' | 'desc')[];
  /** Sort strategy */
  strategy: 'simple' | 'multi' | 'custom';
  /** Enable natural sorting */
  naturalSort: boolean;
  /** Case sensitivity */
  caseSensitive: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics sort request
 */
export interface AnalyticsSortRequest {
  /** Sort fields */
  fields: AnalyticsSortField[];
  /** Sort strategy */
  strategy?: 'simple' | 'multi' | 'custom';
  /** Enable natural sorting */
  naturalSort?: boolean;
  /** Case sensitivity */
  caseSensitive?: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics sort result
 */
export interface AnalyticsSortResult extends BaseEntity, Timestamp {
  id: ID;
  queryId: ID;
  fields: AnalyticsSortField[];
  strategy: 'simple' | 'multi' | 'custom';
  naturalSort: boolean;
  caseSensitive: boolean;
  sortedData: Record<string, unknown>[];
  metadata?: Metadata;
}

/**
 * Analytics sort validation
 */
export interface AnalyticsSortValidation {
  /** Whether the sort is valid */
  isValid: boolean;
  /** Sort field */
  field: string;
  /** Sort direction */
  direction: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions for improvement */
  suggestions?: string[];
}

/**
 * Analytics sort statistics
 */
export interface AnalyticsSortStatistics {
  /** Total sorts */
  totalSorts: number;
  /** Sorts by field */
  byField: Record<string, number>;
  /** Sorts by direction */
  byDirection: Record<string, number>;
  /** Sorts by strategy */
  byStrategy: Record<string, number>;
  /** Most used fields */
  topFields: { field: string; count: number }[];
  /** Performance metrics */
  performance: {
    avgTimeMs: number;
    minTimeMs: number;
    maxTimeMs: number;
  };
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
};
