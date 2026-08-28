/**
 * Content Analytics Types
 * Type definitions for content analytics based on shared-constants
 * @module ContentAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants content analytics
// ============================================================
import {
  // Content Analytics Core
  CONTENT_ANALYTICS,
  ContentAnalyticsType,
  ContentAnalyticsMetric,
  ContentAnalyticsDimension,
  ContentAnalyticsTimeframe,
  ContentAnalyticsAggregation,
  ContentAnalyticsComparisonType,
  ContentAnalyticsDataSource,
  ContentAnalyticsExportFormat,
  contentAnalyticsGetTypeLabel,
  contentAnalyticsGetMetricLabel,
  contentAnalyticsGetDimensionLabel,
  contentAnalyticsGetTimeframeLabel,
  contentAnalyticsGetAggregationLabel,
  contentAnalyticsGetComparisonTypeLabel,
  contentAnalyticsGetDataSourceLabel,
  contentAnalyticsGetExportFormatLabel,
  contentAnalyticsGetDefaultTimeframe,
  contentAnalyticsGetDefaultAggregation,
  contentAnalyticsGetDefaultLimit,
  contentAnalyticsGetMaxResults,
  contentAnalyticsGetMaxDimensions,
  contentAnalyticsGetMaxMetrics,
  contentAnalyticsIsValidType,
  contentAnalyticsIsValidMetric,
  contentAnalyticsIsValidDimension,
  contentAnalyticsIsValidTimeframe,
  contentAnalyticsIsValidAggregation,
  // Content Analytics Type
  CONTENT_ANALYTICS_TYPE,
  ContentAnalyticsTypeCategory,
  ContentAnalyticsTypeSubType,
  ContentAnalyticsTypeScope,
  ContentAnalyticsTypeFrequency,
  ContentAnalyticsTypeQuality,
  ContentAnalyticsTypeSource,
  ContentAnalyticsTypeConfidence,
  contentAnalyticsTypeGetCategoryLabel,
  contentAnalyticsTypeGetSubTypeLabel,
  contentAnalyticsTypeGetScopeLabel,
  contentAnalyticsTypeGetFrequencyLabel,
  contentAnalyticsTypeGetQualityLabel,
  contentAnalyticsTypeGetSourceLabel,
  contentAnalyticsTypeGetConfidenceLabel,
  contentAnalyticsTypeIsValidCategory,
  contentAnalyticsTypeIsValidScope,
  contentAnalyticsTypeIsValidFrequency,
} from '@vubon/shared-constants';

// ============================================================
// Content Analytics Extended Types
// ============================================================

/**
 * Content Analytics
 */
export interface ContentAnalytics extends BaseEntity, Timestamp {
  id: ID;
  contentId: ID;
  type: ContentAnalyticsType;
  metric: ContentAnalyticsMetric;
  dimension: ContentAnalyticsDimension;
  timeframe: ContentAnalyticsTimeframe;
  aggregation: ContentAnalyticsAggregation;
  comparisonType: ContentAnalyticsComparisonType;
  dataSource: ContentAnalyticsDataSource;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  metadata?: Metadata;
}

/**
 * Content Analytics Filter
 */
export interface ContentAnalyticsFilter {
  contentIds?: ID[];
  types?: ContentAnalyticsType[];
  metrics?: ContentAnalyticsMetric[];
  dimensions?: ContentAnalyticsDimension[];
  timeframes?: ContentAnalyticsTimeframe[];
  aggregations?: ContentAnalyticsAggregation[];
  comparisonTypes?: ContentAnalyticsComparisonType[];
  dataSources?: ContentAnalyticsDataSource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Content Analytics Statistics
 */
export interface ContentAnalyticsStatistics {
  contentId: ID;
  totalAnalytics: number;
  byType: Record<ContentAnalyticsType, number>;
  byMetric: Record<ContentAnalyticsMetric, number>;
  byDimension: Record<ContentAnalyticsDimension, number>;
  byTimeframe: Record<ContentAnalyticsTimeframe, number>;
  byAggregation: Record<ContentAnalyticsAggregation, number>;
  byComparisonType: Record<ContentAnalyticsComparisonType, number>;
  byDataSource: Record<ContentAnalyticsDataSource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentType: ContentAnalyticsType;
  mostFrequentMetric: ContentAnalyticsMetric;
  mostFrequentDimension: ContentAnalyticsDimension;
}

/**
 * Content Analytics Summary
 */
export interface ContentAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  byType: Record<ContentAnalyticsType, number>;
  byMetric: Record<ContentAnalyticsMetric, number>;
  byDimension: Record<ContentAnalyticsDimension, number>;
  byTimeframe: Record<ContentAnalyticsTimeframe, number>;
  byAggregation: Record<ContentAnalyticsAggregation, number>;
  byComparisonType: Record<ContentAnalyticsComparisonType, number>;
  byDataSource: Record<ContentAnalyticsDataSource, number>;
  analyticsTrend: {
    date: Date;
    metric: string;
    value: number;
  }[];
  topMetrics: {
    metric: ContentAnalyticsMetric;
    count: number;
    label: string;
    value: number;
  }[];
  topDimensions: {
    dimension: ContentAnalyticsDimension;
    count: number;
    label: string;
    value: number;
  }[];
}

/**
 * Content Analytics Configuration
 */
export interface ContentAnalyticsConfiguration {
  enabled: boolean;
  defaultType: ContentAnalyticsType;
  defaultMetric: ContentAnalyticsMetric;
  defaultDimension: ContentAnalyticsDimension;
  defaultTimeframe: ContentAnalyticsTimeframe;
  defaultAggregation: ContentAnalyticsAggregation;
  defaultComparisonType: ContentAnalyticsComparisonType;
  defaultDataSource: ContentAnalyticsDataSource;
  defaultLimit: number;
  maxResults: number;
  maxDimensions: number;
  maxMetrics: number;
  enableCache: boolean;
  cacheTTLSeconds: number;
  enableLogging: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: ContentAnalyticsAlertConfig;
}

/**
 * Content Analytics Alert Configuration
 */
export interface ContentAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  failureAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Content Analytics History
 */
export interface ContentAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  contentId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Content Analytics Data Point
 */
export interface ContentAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  contentId: ID;
  analyticsId: ID;
  metric: ContentAnalyticsMetric;
  dimension: ContentAnalyticsDimension;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Content Analytics Export
 */
export interface ContentAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  contentId: ID;
  format: ContentAnalyticsExportFormat;
  filter: ContentAnalyticsFilter;
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
  // Content Analytics Core
  CONTENT_ANALYTICS,
  ContentAnalyticsType,
  ContentAnalyticsMetric,
  ContentAnalyticsDimension,
  ContentAnalyticsTimeframe,
  ContentAnalyticsAggregation,
  ContentAnalyticsComparisonType,
  ContentAnalyticsDataSource,
  ContentAnalyticsExportFormat,
  contentAnalyticsGetTypeLabel,
  contentAnalyticsGetMetricLabel,
  contentAnalyticsGetDimensionLabel,
  contentAnalyticsGetTimeframeLabel,
  contentAnalyticsGetAggregationLabel,
  contentAnalyticsGetComparisonTypeLabel,
  contentAnalyticsGetDataSourceLabel,
  contentAnalyticsGetExportFormatLabel,
  contentAnalyticsGetDefaultTimeframe,
  contentAnalyticsGetDefaultAggregation,
  contentAnalyticsGetDefaultLimit,
  contentAnalyticsGetMaxResults,
  contentAnalyticsGetMaxDimensions,
  contentAnalyticsGetMaxMetrics,
  contentAnalyticsIsValidType,
  contentAnalyticsIsValidMetric,
  contentAnalyticsIsValidDimension,
  contentAnalyticsIsValidTimeframe,
  contentAnalyticsIsValidAggregation,
  // Content Analytics Type
  CONTENT_ANALYTICS_TYPE,
  ContentAnalyticsTypeCategory,
  ContentAnalyticsTypeSubType,
  ContentAnalyticsTypeScope,
  ContentAnalyticsTypeFrequency,
  ContentAnalyticsTypeQuality,
  ContentAnalyticsTypeSource,
  ContentAnalyticsTypeConfidence,
  contentAnalyticsTypeGetCategoryLabel,
  contentAnalyticsTypeGetSubTypeLabel,
  contentAnalyticsTypeGetScopeLabel,
  contentAnalyticsTypeGetFrequencyLabel,
  contentAnalyticsTypeGetQualityLabel,
  contentAnalyticsTypeGetSourceLabel,
  contentAnalyticsTypeGetConfidenceLabel,
  contentAnalyticsTypeIsValidCategory,
  contentAnalyticsTypeIsValidScope,
  contentAnalyticsTypeIsValidFrequency,
};
