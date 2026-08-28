/**
 * Analytics Group Types
 * Type definitions for analytics grouping based on shared-constants
 * @module AnalyticsGroupTypes
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
  // Filter
  AnalyticsFilterOperator,
  AnalyticsFilterDataType,
  AnalyticsFilterCategory,
  AnalyticsFilterLogicType,
  AnalyticsFilterMatchType,
  AnalyticsFilterPriority,
  AnalyticsFilterScope,
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
// Analytics Group Extended Types
// ============================================================

/**
 * Analytics group
 */
export interface AnalyticsGroup {
  /** Group name */
  name: string;
  /** Group ID */
  id: string;
  /** Group type */
  type: 'dimension' | 'metric' | 'time' | 'custom';
  /** Group members */
  members: string[];
  /** Group description */
  description?: string;
  /** Group metadata */
  metadata?: Metadata;
}

/**
 * Analytics dimension group
 */
export interface AnalyticsDimensionGroup {
  /** Dimension group name */
  name: string;
  /** Dimensions in the group */
  dimensions: AnalyticsDimension[];
  /** Group category */
  category: AnalyticsDimensionCategory;
  /** Group description */
  description?: string;
  /** Is active */
  isActive: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics metric group
 */
export interface AnalyticsMetricGroup {
  /** Metric group name */
  name: string;
  /** Metrics in the group */
  metrics: AnalyticsMetric[];
  /** Group category */
  category: AnalyticsMetricCategory;
  /** Group description */
  description?: string;
  /** Is active */
  isActive: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics time group
 */
export interface AnalyticsTimeGroup {
  /** Time group name */
  name: string;
  /** Granularity */
  granularity: AnalyticsDimensionGranularity;
  /** Interval */
  interval: AnalyticsInterval;
  /** Start time */
  startTime: Date;
  /** End time */
  endTime: Date;
  /** Group description */
  description?: string;
  /** Is active */
  isActive: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics group request
 */
export interface AnalyticsGroupRequest {
  /** Dimensions to group by */
  dimensions: AnalyticsDimension[];
  /** Metrics to aggregate */
  metrics: AnalyticsMetric[];
  /** Time grouping */
  timeGroup?: AnalyticsTimeGroup;
  /** Filters to apply */
  filters?: AnalyticsFilter[];
  /** Group name */
  name?: string;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics group result
 */
export interface AnalyticsGroupResult extends BaseEntity, Timestamp {
  id: ID;
  queryId: ID;
  groupName: string;
  groupType: 'dimension' | 'metric' | 'time' | 'custom';
  members: string[];
  values: Record<string, number>;
  total: number;
  average: number;
  min: number;
  max: number;
  metadata?: Metadata;
}

/**
 * Analytics group statistics
 */
export interface AnalyticsGroupStatistics {
  /** Total groups */
  totalGroups: number;
  /** Groups by type */
  byType: Record<string, number>;
  /** Groups by category */
  byCategory: Record<string, number>;
  /** Average group size */
  averageSize: number;
  /** Max group size */
  maxSize: number;
  /** Min group size */
  minSize: number;
  /** Most active groups */
  topGroups: { name: string; count: number }[];
  /** Metadata */
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
