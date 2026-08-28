/**
 * Performance Analytics Types
 * Type definitions for performance analytics based on shared-constants
 * @module PerformanceAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants performance analytics
// ============================================================
import {
  // Main Performance Analytics Constants
  PERFORMANCE_ANALYTICS,
  PerformanceAnalyticsType,
  PerformanceAnalyticsStatus,
  PerformanceAnalyticsScope,
  PerformanceAnalyticsEvent,
  PerformanceAnalyticsDimension,
  PerformanceAnalyticsMetric,
  PerformanceAnalyticsSegment,
  PerformanceAnalyticsCohort,
  PerformanceAnalyticsGranularity,
  PerformanceAnalyticsThreshold,
  getPerformanceAnalyticsStatusLabel,
  getPerformanceAnalyticsEventLabel,
  getPerformanceAnalyticsDimensionLabel,
  getPerformanceAnalyticsSegmentLabel,
  getPerformanceAnalyticsCohortLabel,
  getPerformanceAnalyticsGranularityLabel,
  isPerformanceAnalyticsActive,
  isPerformanceAnalyticsCompleted,
  isPerformanceAnalyticsFailed,
  isPerformanceAnalyticsSystemEvent,
  isPerformanceAnalyticsResourceEvent,
  isPerformanceAnalyticsApplicationEvent,
  isPerformanceAnalyticsPerformanceEvent,
  getPerformanceAnalyticsThresholdStatus,
  getPerformanceAnalyticsResponseThreshold,
  getPerformanceAnalyticsLatencyThreshold,
  getPerformanceAnalyticsErrorThreshold,
  // Performance Analytics Type Constants
  PERFORMANCE_ANALYTICS_TYPE,
  PerformanceAnalyticsAnalysisType,
  PerformanceAnalyticsDataType,
  PerformanceAnalyticsSystemType,
  PerformanceAnalyticsEnvironmentType,
  PerformanceAnalyticsPerformanceLevel,
  PerformanceAnalyticsResponseCategory,
  PerformanceAnalyticsLatencyCategory,
  PerformanceAnalyticsThroughputCategory,
  PerformanceAnalyticsErrorCategory,
  PerformanceAnalyticsUXCategory,
  PerformanceAnalyticsBusinessCategory,
  getPerformanceAnalyticsAnalysisTypeLabel,
  getPerformanceAnalyticsDataTypeLabel,
  getPerformanceAnalyticsSystemTypeLabel,
  getPerformanceAnalyticsEnvironmentTypeLabel,
  getPerformanceAnalyticsPerformanceLevelLabel,
  getPerformanceAnalyticsResponseCategoryLabel,
  getPerformanceAnalyticsLatencyCategoryLabel,
  getPerformanceAnalyticsThroughputCategoryLabel,
  getPerformanceAnalyticsErrorCategoryLabel,
  getPerformanceAnalyticsUXCategoryLabel,
  getPerformanceAnalyticsBusinessCategoryLabel,
  isPerformanceAnalyticsSystemAnalysis,
  isPerformanceAnalyticsApplicationAnalysis,
  isPerformanceAnalyticsComparative,
  isPerformanceAnalyticsPredictive,
  getPerformanceAnalyticsPerformanceLevel,
  getPerformanceAnalyticsResponseCategory,
  getPerformanceAnalyticsLatencyCategory,
  getPerformanceAnalyticsErrorCategory,
  // Performance Analytics Metric Constants
  PERFORMANCE_ANALYTICS_METRIC,
  PerformanceAnalyticsSystemMetric,
  PerformanceAnalyticsResponseMetric,
  PerformanceAnalyticsThroughputMetric,
  PerformanceAnalyticsLatencyMetric,
  PerformanceAnalyticsErrorMetric,
  PerformanceAnalyticsDatabaseMetric,
  PerformanceAnalyticsAPIMetric,
  PerformanceAnalyticsFrontendMetric,
  PerformanceAnalyticsUXMetric,
  PerformanceAnalyticsBusinessMetric,
  PerformanceAnalyticsComparisonMetric,
  PerformanceAnalyticsMetricCategory,
  PerformanceAnalyticsMetricType,
  PerformanceAnalyticsMetricFormat,
  PerformanceAnalyticsMetricPriority,
  getPerformanceAnalyticsMetricLabel,
  getPerformanceAnalyticsMetricCategoryLabel,
  getPerformanceAnalyticsMetricTypeLabel,
  getPerformanceAnalyticsMetricFormatLabel,
  getPerformanceAnalyticsMetricPriorityLabel,
  getPerformanceAnalyticsMetricCategory,
  getPerformanceAnalyticsMetricType,
  getPerformanceAnalyticsMetricFormat,
  calculatePerformanceAnalyticsAverage,
  calculatePerformanceAnalyticsPercentile,
  calculatePerformanceAnalyticsStdDev,
  calculatePerformanceAnalyticsErrorRate,
  calculatePerformanceAnalyticsGrowthRate,
  calculatePerformanceAnalyticsThroughput,
  calculatePerformanceAnalyticsCacheHitRate,
} from '@vubon/shared-constants';

// ============================================================
// Performance Analytics Extended Types
// ============================================================

/**
 * Performance analytics
 */
export interface PerformanceAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: PerformanceAnalyticsType;
  status: PerformanceAnalyticsStatus;
  scope: PerformanceAnalyticsScope;
  event: PerformanceAnalyticsEvent;
  dimension: PerformanceAnalyticsDimension;
  metric: PerformanceAnalyticsMetric;
  segment: PerformanceAnalyticsSegment;
  cohort: PerformanceAnalyticsCohort;
  granularity: PerformanceAnalyticsGranularity;
  analysisType: PerformanceAnalyticsAnalysisType;
  dataType: PerformanceAnalyticsDataType;
  systemType: PerformanceAnalyticsSystemType;
  environmentType: PerformanceAnalyticsEnvironmentType;
  performanceLevel: PerformanceAnalyticsPerformanceLevel;
  responseCategory: PerformanceAnalyticsResponseCategory;
  latencyCategory: PerformanceAnalyticsLatencyCategory;
  throughputCategory: PerformanceAnalyticsThroughputCategory;
  errorCategory: PerformanceAnalyticsErrorCategory;
  uxCategory: PerformanceAnalyticsUXCategory;
  businessCategory: PerformanceAnalyticsBusinessCategory;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  threshold: PerformanceAnalyticsThreshold;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isSystemEvent: boolean;
  isResourceEvent: boolean;
  isApplicationEvent: boolean;
  isPerformanceEvent: boolean;
  isSystemAnalysis: boolean;
  isApplicationAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Performance analytics filter
 */
export interface PerformanceAnalyticsFilter {
  ids?: ID[];
  types?: PerformanceAnalyticsType[];
  statuses?: PerformanceAnalyticsStatus[];
  scopes?: PerformanceAnalyticsScope[];
  events?: PerformanceAnalyticsEvent[];
  dimensions?: PerformanceAnalyticsDimension[];
  metrics?: PerformanceAnalyticsMetric[];
  segments?: PerformanceAnalyticsSegment[];
  cohorts?: PerformanceAnalyticsCohort[];
  granularities?: PerformanceAnalyticsGranularity[];
  analysisTypes?: PerformanceAnalyticsAnalysisType[];
  dataTypes?: PerformanceAnalyticsDataType[];
  systemTypes?: PerformanceAnalyticsSystemType[];
  environmentTypes?: PerformanceAnalyticsEnvironmentType[];
  performanceLevels?: PerformanceAnalyticsPerformanceLevel[];
  responseCategories?: PerformanceAnalyticsResponseCategory[];
  latencyCategories?: PerformanceAnalyticsLatencyCategory[];
  throughputCategories?: PerformanceAnalyticsThroughputCategory[];
  errorCategories?: PerformanceAnalyticsErrorCategory[];
  uxCategories?: PerformanceAnalyticsUXCategory[];
  businessCategories?: PerformanceAnalyticsBusinessCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isSystemEvent?: boolean;
  isResourceEvent?: boolean;
  isApplicationEvent?: boolean;
  isPerformanceEvent?: boolean;
  isSystemAnalysis?: boolean;
  isApplicationAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Performance analytics statistics
 */
export interface PerformanceAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  systemEvents: number;
  resourceEvents: number;
  applicationEvents: number;
  performanceEvents: number;
  systemAnalyses: number;
  applicationAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<PerformanceAnalyticsType, number>;
  byStatus: Record<PerformanceAnalyticsStatus, number>;
  byEvent: Record<PerformanceAnalyticsEvent, number>;
  byMetric: Record<PerformanceAnalyticsMetric, number>;
  bySegment: Record<PerformanceAnalyticsSegment, number>;
  byCohort: Record<PerformanceAnalyticsCohort, number>;
  byGranularity: Record<PerformanceAnalyticsGranularity, number>;
  bySystemType: Record<PerformanceAnalyticsSystemType, number>;
  byEnvironmentType: Record<PerformanceAnalyticsEnvironmentType, number>;
  byPerformanceLevel: Record<PerformanceAnalyticsPerformanceLevel, number>;
  byResponseCategory: Record<PerformanceAnalyticsResponseCategory, number>;
  byLatencyCategory: Record<PerformanceAnalyticsLatencyCategory, number>;
  byThroughputCategory: Record<PerformanceAnalyticsThroughputCategory, number>;
  byErrorCategory: Record<PerformanceAnalyticsErrorCategory, number>;
  byUXCategory: Record<PerformanceAnalyticsUXCategory, number>;
  byBusinessCategory: Record<PerformanceAnalyticsBusinessCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: PerformanceAnalyticsEvent;
  mostFrequentMetric: PerformanceAnalyticsMetric;
  mostFrequentSegment: PerformanceAnalyticsSegment;
}

/**
 * Performance analytics summary
 */
export interface PerformanceAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  systemEvents: number;
  resourceEvents: number;
  applicationEvents: number;
  performanceEvents: number;
  systemAnalyses: number;
  applicationAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<PerformanceAnalyticsType, number>;
  byStatus: Record<PerformanceAnalyticsStatus, number>;
  byEvent: Record<PerformanceAnalyticsEvent, number>;
  byMetric: Record<PerformanceAnalyticsMetric, number>;
  bySegment: Record<PerformanceAnalyticsSegment, number>;
  byCohort: Record<PerformanceAnalyticsCohort, number>;
  byGranularity: Record<PerformanceAnalyticsGranularity, number>;
  bySystemType: Record<PerformanceAnalyticsSystemType, number>;
  byEnvironmentType: Record<PerformanceAnalyticsEnvironmentType, number>;
  byPerformanceLevel: Record<PerformanceAnalyticsPerformanceLevel, number>;
  byResponseCategory: Record<PerformanceAnalyticsResponseCategory, number>;
  byLatencyCategory: Record<PerformanceAnalyticsLatencyCategory, number>;
  byThroughputCategory: Record<PerformanceAnalyticsThroughputCategory, number>;
  byErrorCategory: Record<PerformanceAnalyticsErrorCategory, number>;
  byUXCategory: Record<PerformanceAnalyticsUXCategory, number>;
  byBusinessCategory: Record<PerformanceAnalyticsBusinessCategory, number>;
  performanceTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: PerformanceAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: PerformanceAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topSystemTypes: {
    type: PerformanceAnalyticsSystemType;
    count: number;
    label: string;
  }[];
  topErrorCategories: {
    category: PerformanceAnalyticsErrorCategory;
    count: number;
    label: string;
  }[];
}

/**
 * Performance analytics configuration
 */
export interface PerformanceAnalyticsConfiguration {
  enabled: boolean;
  defaultType: PerformanceAnalyticsType;
  defaultScope: PerformanceAnalyticsScope;
  defaultGranularity: PerformanceAnalyticsGranularity;
  trackSystemEvents: boolean;
  trackResourceEvents: boolean;
  trackApplicationEvents: boolean;
  trackPerformanceEvents: boolean;
  trackSystemAnalysis: boolean;
  trackApplicationAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: PerformanceAnalyticsAlertConfig;
}

/**
 * Performance analytics alert configuration
 */
export interface PerformanceAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  failedAnalyticsAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
}

/**
 * Performance analytics history
 */
export interface PerformanceAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Performance analytics data point
 */
export interface PerformanceAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: PerformanceAnalyticsEvent;
  dimension: PerformanceAnalyticsDimension;
  metric: PerformanceAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Performance analytics export
 */
export interface PerformanceAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PerformanceAnalyticsFilter;
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
  // Main Performance Analytics Constants
  PERFORMANCE_ANALYTICS,
  PerformanceAnalyticsType,
  PerformanceAnalyticsStatus,
  PerformanceAnalyticsScope,
  PerformanceAnalyticsEvent,
  PerformanceAnalyticsDimension,
  PerformanceAnalyticsMetric,
  PerformanceAnalyticsSegment,
  PerformanceAnalyticsCohort,
  PerformanceAnalyticsGranularity,
  PerformanceAnalyticsThreshold,
  getPerformanceAnalyticsStatusLabel,
  getPerformanceAnalyticsEventLabel,
  getPerformanceAnalyticsDimensionLabel,
  getPerformanceAnalyticsSegmentLabel,
  getPerformanceAnalyticsCohortLabel,
  getPerformanceAnalyticsGranularityLabel,
  isPerformanceAnalyticsActive,
  isPerformanceAnalyticsCompleted,
  isPerformanceAnalyticsFailed,
  isPerformanceAnalyticsSystemEvent,
  isPerformanceAnalyticsResourceEvent,
  isPerformanceAnalyticsApplicationEvent,
  isPerformanceAnalyticsPerformanceEvent,
  getPerformanceAnalyticsThresholdStatus,
  getPerformanceAnalyticsResponseThreshold,
  getPerformanceAnalyticsLatencyThreshold,
  getPerformanceAnalyticsErrorThreshold,
  // Performance Analytics Type Constants
  PERFORMANCE_ANALYTICS_TYPE,
  PerformanceAnalyticsAnalysisType,
  PerformanceAnalyticsDataType,
  PerformanceAnalyticsSystemType,
  PerformanceAnalyticsEnvironmentType,
  PerformanceAnalyticsPerformanceLevel,
  PerformanceAnalyticsResponseCategory,
  PerformanceAnalyticsLatencyCategory,
  PerformanceAnalyticsThroughputCategory,
  PerformanceAnalyticsErrorCategory,
  PerformanceAnalyticsUXCategory,
  PerformanceAnalyticsBusinessCategory,
  getPerformanceAnalyticsAnalysisTypeLabel,
  getPerformanceAnalyticsDataTypeLabel,
  getPerformanceAnalyticsSystemTypeLabel,
  getPerformanceAnalyticsEnvironmentTypeLabel,
  getPerformanceAnalyticsPerformanceLevelLabel,
  getPerformanceAnalyticsResponseCategoryLabel,
  getPerformanceAnalyticsLatencyCategoryLabel,
  getPerformanceAnalyticsThroughputCategoryLabel,
  getPerformanceAnalyticsErrorCategoryLabel,
  getPerformanceAnalyticsUXCategoryLabel,
  getPerformanceAnalyticsBusinessCategoryLabel,
  isPerformanceAnalyticsSystemAnalysis,
  isPerformanceAnalyticsApplicationAnalysis,
  isPerformanceAnalyticsComparative,
  isPerformanceAnalyticsPredictive,
  getPerformanceAnalyticsPerformanceLevel,
  getPerformanceAnalyticsResponseCategory,
  getPerformanceAnalyticsLatencyCategory,
  getPerformanceAnalyticsErrorCategory,
  // Performance Analytics Metric Constants
  PERFORMANCE_ANALYTICS_METRIC,
  PerformanceAnalyticsSystemMetric,
  PerformanceAnalyticsResponseMetric,
  PerformanceAnalyticsThroughputMetric,
  PerformanceAnalyticsLatencyMetric,
  PerformanceAnalyticsErrorMetric,
  PerformanceAnalyticsDatabaseMetric,
  PerformanceAnalyticsAPIMetric,
  PerformanceAnalyticsFrontendMetric,
  PerformanceAnalyticsUXMetric,
  PerformanceAnalyticsBusinessMetric,
  PerformanceAnalyticsComparisonMetric,
  PerformanceAnalyticsMetricCategory,
  PerformanceAnalyticsMetricType,
  PerformanceAnalyticsMetricFormat,
  PerformanceAnalyticsMetricPriority,
  getPerformanceAnalyticsMetricLabel,
  getPerformanceAnalyticsMetricCategoryLabel,
  getPerformanceAnalyticsMetricTypeLabel,
  getPerformanceAnalyticsMetricFormatLabel,
  getPerformanceAnalyticsMetricPriorityLabel,
  getPerformanceAnalyticsMetricCategory,
  getPerformanceAnalyticsMetricType,
  getPerformanceAnalyticsMetricFormat,
  calculatePerformanceAnalyticsAverage,
  calculatePerformanceAnalyticsPercentile,
  calculatePerformanceAnalyticsStdDev,
  calculatePerformanceAnalyticsErrorRate,
  calculatePerformanceAnalyticsGrowthRate,
  calculatePerformanceAnalyticsThroughput,
  calculatePerformanceAnalyticsCacheHitRate,
};
