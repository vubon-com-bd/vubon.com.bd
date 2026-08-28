/**
 * Analytics Pagination Types
 * Type definitions for analytics pagination based on shared-constants
 * @module AnalyticsPaginationTypes
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
// Analytics Pagination Extended Types
// ============================================================

/**
 * Analytics pagination
 */
export interface AnalyticsPagination {
  /** Current page number (1-indexed) */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Total number of items */
  total: number;
  /** Total number of pages */
  totalPages: number;
  /** Has next page */
  hasNext: boolean;
  /** Has previous page */
  hasPrev: boolean;
  /** Next page number */
  nextPage?: number;
  /** Previous page number */
  prevPage?: number;
  /** First page number */
  firstPage: number;
  /** Last page number */
  lastPage: number;
}

/**
 * Analytics pagination request
 */
export interface AnalyticsPaginationRequest {
  /** Page number (1-indexed) */
  page?: number;
  /** Number of items per page */
  limit?: number;
  /** Offset (for cursor-based pagination) */
  offset?: number;
  /** Cursor for cursor-based pagination */
  cursor?: string;
  /** Pagination strategy */
  strategy?: 'page' | 'cursor' | 'offset';
  /** Sort field */
  sortField?: string;
  /** Sort direction */
  sortDirection?: 'asc' | 'desc';
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics pagination response
 */
export interface AnalyticsPaginationResponse<T = unknown> {
  /** Items for current page */
  items: T[];
  /** Pagination metadata */
  pagination: AnalyticsPagination;
  /** Cursor for next page (if cursor-based) */
  nextCursor?: string;
  /** Cursor for previous page (if cursor-based) */
  prevCursor?: string;
  /** Request metadata */
  metadata?: Metadata;
}

/**
 * Analytics pagination configuration
 */
export interface AnalyticsPaginationConfiguration {
  /** Default page size */
  defaultLimit: number;
  /** Maximum page size */
  maxLimit: number;
  /** Default pagination strategy */
  defaultStrategy: 'page' | 'cursor' | 'offset';
  /** Enable cursor pagination */
  enableCursor: boolean;
  /** Enable offset pagination */
  enableOffset: boolean;
  /** Enable page pagination */
  enablePage: boolean;
  /** Default sort field */
  defaultSortField: string;
  /** Default sort direction */
  defaultSortDirection: 'asc' | 'desc';
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics pagination result
 */
export interface AnalyticsPaginationResult<T = unknown> extends BaseEntity, Timestamp {
  id: ID;
  queryId: ID;
  items: T[];
  pagination: AnalyticsPagination;
  strategy: 'page' | 'cursor' | 'offset';
  nextCursor?: string;
  prevCursor?: string;
  metadata?: Metadata;
}

/**
 * Analytics pagination validation
 */
export interface AnalyticsPaginationValidation {
  /** Whether the pagination is valid */
  isValid: boolean;
  /** Pagination strategy */
  strategy: string;
  /** Page number */
  page?: number;
  /** Limit */
  limit?: number;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions for improvement */
  suggestions?: string[];
}

/**
 * Analytics pagination statistics
 */
export interface AnalyticsPaginationStatistics {
  /** Total pagination requests */
  totalRequests: number;
  /** Requests by strategy */
  byStrategy: Record<string, number>;
  /** Average page size */
  averageLimit: number;
  /** Max page size */
  maxLimit: number;
  /** Min page size */
  minLimit: number;
  /** Most used strategy */
  mostUsedStrategy: string;
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
