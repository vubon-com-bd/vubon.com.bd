/**
 * Channel Analytics Types
 * Type definitions for channel analytics based on shared-constants
 * @module ChannelAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants channel analytics
// ============================================================
import {
  // Main Channel Analytics Constants
  CHANNEL_ANALYTICS,
  ChannelAnalyticsType,
  ChannelAnalyticsStatus,
  ChannelAnalyticsScope,
  ChannelAnalyticsEvent,
  ChannelAnalyticsDimension,
  ChannelAnalyticsMetric,
  ChannelAnalyticsSegment,
  ChannelAnalyticsCohort,
  ChannelAnalyticsGranularity,
  getChannelAnalyticsStatusLabel,
  getChannelAnalyticsEventLabel,
  getChannelAnalyticsDimensionLabel,
  getChannelAnalyticsSegmentLabel,
  getChannelAnalyticsCohortLabel,
  getChannelAnalyticsGranularityLabel,
  isChannelAnalyticsActive,
  isChannelAnalyticsCompleted,
  isChannelAnalyticsFailed,
  isChannelAnalyticsLifecycleEvent,
  isChannelAnalyticsPerformanceEvent,
  isChannelAnalyticsHealthEvent,
  // Channel Analytics Type Constants
  CHANNEL_ANALYTICS_TYPE,
  ChannelAnalyticsAnalysisType,
  ChannelAnalyticsDataType,
  ChannelAnalyticsChannelType,
  ChannelAnalyticsChannelCategory,
  ChannelAnalyticsChannelStatus,
  ChannelAnalyticsPerformanceLevel,
  ChannelAnalyticsHealthLevel,
  ChannelAnalyticsROICategory,
  ChannelAnalyticsAttributionModel,
  getChannelAnalyticsAnalysisTypeLabel,
  getChannelAnalyticsDataTypeLabel,
  getChannelAnalyticsChannelTypeLabel,
  getChannelAnalyticsChannelCategoryLabel,
  getChannelAnalyticsChannelStatusLabel,
  getChannelAnalyticsPerformanceLevelLabel,
  getChannelAnalyticsHealthLevelLabel,
  getChannelAnalyticsROICategoryLabel,
  getChannelAnalyticsAttributionModelLabel,
  isChannelAnalyticsPerformanceAnalysis,
  isChannelAnalyticsRevenueAnalysis,
  isChannelAnalyticsComparative,
  isChannelAnalyticsPredictive,
  getChannelAnalyticsPerformanceLevel,
  getChannelAnalyticsHealthLevel,
  getChannelAnalyticsROICategory,
  // Channel Analytics Metric Constants
  CHANNEL_ANALYTICS_METRIC,
  ChannelAnalyticsCountMetric,
  ChannelAnalyticsReachMetric,
  ChannelAnalyticsEngagementMetric,
  ChannelAnalyticsConversionMetric,
  ChannelAnalyticsRevenueMetric,
  ChannelAnalyticsCostMetric,
  ChannelAnalyticsProfitMetric,
  ChannelAnalyticsROIMetric,
  ChannelAnalyticsCustomerMetric,
  ChannelAnalyticsSatisfactionMetric,
  ChannelAnalyticsComparisonMetric,
  ChannelAnalyticsMetricCategory,
  ChannelAnalyticsMetricType,
  ChannelAnalyticsMetricFormat,
  ChannelAnalyticsMetricPriority,
  getChannelAnalyticsMetricLabel,
  getChannelAnalyticsMetricCategoryLabel,
  getChannelAnalyticsMetricTypeLabel,
  getChannelAnalyticsMetricFormatLabel,
  getChannelAnalyticsMetricPriorityLabel,
  getChannelAnalyticsMetricCategory,
  getChannelAnalyticsMetricType,
  getChannelAnalyticsMetricFormat,
  calculateChannelAnalyticsEngagementRate,
  calculateChannelAnalyticsCTR,
  calculateChannelAnalyticsConversionRate,
  calculateChannelAnalyticsROI,
  calculateChannelAnalyticsROAS,
  calculateChannelAnalyticsProfitMargin,
  calculateChannelAnalyticsCAC,
  calculateChannelAnalyticsRetentionRate,
  calculateChannelAnalyticsCSAT,
} from '@vubon/shared-constants';

// ============================================================
// Channel Analytics Extended Types
// ============================================================

/**
 * Channel analytics
 */
export interface ChannelAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: ChannelAnalyticsType;
  status: ChannelAnalyticsStatus;
  scope: ChannelAnalyticsScope;
  event: ChannelAnalyticsEvent;
  dimension: ChannelAnalyticsDimension;
  metric: ChannelAnalyticsMetric;
  segment: ChannelAnalyticsSegment;
  cohort: ChannelAnalyticsCohort;
  granularity: ChannelAnalyticsGranularity;
  analysisType: ChannelAnalyticsAnalysisType;
  dataType: ChannelAnalyticsDataType;
  channelType: ChannelAnalyticsChannelType;
  channelCategory: ChannelAnalyticsChannelCategory;
  channelStatus: ChannelAnalyticsChannelStatus;
  performanceLevel: ChannelAnalyticsPerformanceLevel;
  healthLevel: ChannelAnalyticsHealthLevel;
  roiCategory: ChannelAnalyticsROICategory;
  attributionModel: ChannelAnalyticsAttributionModel;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isLifecycleEvent: boolean;
  isPerformanceEvent: boolean;
  isHealthEvent: boolean;
  isPerformanceAnalysis: boolean;
  isRevenueAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Channel analytics filter
 */
export interface ChannelAnalyticsFilter {
  ids?: ID[];
  types?: ChannelAnalyticsType[];
  statuses?: ChannelAnalyticsStatus[];
  scopes?: ChannelAnalyticsScope[];
  events?: ChannelAnalyticsEvent[];
  dimensions?: ChannelAnalyticsDimension[];
  metrics?: ChannelAnalyticsMetric[];
  segments?: ChannelAnalyticsSegment[];
  cohorts?: ChannelAnalyticsCohort[];
  granularities?: ChannelAnalyticsGranularity[];
  analysisTypes?: ChannelAnalyticsAnalysisType[];
  dataTypes?: ChannelAnalyticsDataType[];
  channelTypes?: ChannelAnalyticsChannelType[];
  channelCategories?: ChannelAnalyticsChannelCategory[];
  channelStatuses?: ChannelAnalyticsChannelStatus[];
  performanceLevels?: ChannelAnalyticsPerformanceLevel[];
  healthLevels?: ChannelAnalyticsHealthLevel[];
  roiCategories?: ChannelAnalyticsROICategory[];
  attributionModels?: ChannelAnalyticsAttributionModel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isLifecycleEvent?: boolean;
  isPerformanceEvent?: boolean;
  isHealthEvent?: boolean;
  isPerformanceAnalysis?: boolean;
  isRevenueAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Channel analytics statistics
 */
export interface ChannelAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  lifecycleEvents: number;
  performanceEvents: number;
  healthEvents: number;
  performanceAnalyses: number;
  revenueAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<ChannelAnalyticsType, number>;
  byStatus: Record<ChannelAnalyticsStatus, number>;
  byEvent: Record<ChannelAnalyticsEvent, number>;
  byMetric: Record<ChannelAnalyticsMetric, number>;
  bySegment: Record<ChannelAnalyticsSegment, number>;
  byCohort: Record<ChannelAnalyticsCohort, number>;
  byGranularity: Record<ChannelAnalyticsGranularity, number>;
  byChannelType: Record<ChannelAnalyticsChannelType, number>;
  byChannelCategory: Record<ChannelAnalyticsChannelCategory, number>;
  byChannelStatus: Record<ChannelAnalyticsChannelStatus, number>;
  byPerformanceLevel: Record<ChannelAnalyticsPerformanceLevel, number>;
  byHealthLevel: Record<ChannelAnalyticsHealthLevel, number>;
  byROICategory: Record<ChannelAnalyticsROICategory, number>;
  byAttributionModel: Record<ChannelAnalyticsAttributionModel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: ChannelAnalyticsEvent;
  mostFrequentMetric: ChannelAnalyticsMetric;
  mostFrequentSegment: ChannelAnalyticsSegment;
}

/**
 * Channel analytics summary
 */
export interface ChannelAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  lifecycleEvents: number;
  performanceEvents: number;
  healthEvents: number;
  performanceAnalyses: number;
  revenueAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<ChannelAnalyticsType, number>;
  byStatus: Record<ChannelAnalyticsStatus, number>;
  byEvent: Record<ChannelAnalyticsEvent, number>;
  byMetric: Record<ChannelAnalyticsMetric, number>;
  bySegment: Record<ChannelAnalyticsSegment, number>;
  byCohort: Record<ChannelAnalyticsCohort, number>;
  byGranularity: Record<ChannelAnalyticsGranularity, number>;
  byChannelType: Record<ChannelAnalyticsChannelType, number>;
  byChannelCategory: Record<ChannelAnalyticsChannelCategory, number>;
  byChannelStatus: Record<ChannelAnalyticsChannelStatus, number>;
  byPerformanceLevel: Record<ChannelAnalyticsPerformanceLevel, number>;
  byHealthLevel: Record<ChannelAnalyticsHealthLevel, number>;
  byROICategory: Record<ChannelAnalyticsROICategory, number>;
  byAttributionModel: Record<ChannelAnalyticsAttributionModel, number>;
  channelTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: ChannelAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: ChannelAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topChannelTypes: {
    type: ChannelAnalyticsChannelType;
    count: number;
    label: string;
  }[];
  topChannelCategories: {
    category: ChannelAnalyticsChannelCategory;
    count: number;
    label: string;
  }[];
}

/**
 * Channel analytics configuration
 */
export interface ChannelAnalyticsConfiguration {
  enabled: boolean;
  defaultType: ChannelAnalyticsType;
  defaultScope: ChannelAnalyticsScope;
  defaultGranularity: ChannelAnalyticsGranularity;
  trackLifecycleEvents: boolean;
  trackPerformanceEvents: boolean;
  trackHealthEvents: boolean;
  trackPerformanceAnalysis: boolean;
  trackRevenueAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: ChannelAnalyticsAlertConfig;
}

/**
 * Channel analytics alert configuration
 */
export interface ChannelAnalyticsAlertConfig {
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
 * Channel analytics history
 */
export interface ChannelAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Channel analytics data point
 */
export interface ChannelAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: ChannelAnalyticsEvent;
  dimension: ChannelAnalyticsDimension;
  metric: ChannelAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Channel analytics export
 */
export interface ChannelAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ChannelAnalyticsFilter;
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
  // Main Channel Analytics Constants
  CHANNEL_ANALYTICS,
  ChannelAnalyticsType,
  ChannelAnalyticsStatus,
  ChannelAnalyticsScope,
  ChannelAnalyticsEvent,
  ChannelAnalyticsDimension,
  ChannelAnalyticsMetric,
  ChannelAnalyticsSegment,
  ChannelAnalyticsCohort,
  ChannelAnalyticsGranularity,
  getChannelAnalyticsStatusLabel,
  getChannelAnalyticsEventLabel,
  getChannelAnalyticsDimensionLabel,
  getChannelAnalyticsSegmentLabel,
  getChannelAnalyticsCohortLabel,
  getChannelAnalyticsGranularityLabel,
  isChannelAnalyticsActive,
  isChannelAnalyticsCompleted,
  isChannelAnalyticsFailed,
  isChannelAnalyticsLifecycleEvent,
  isChannelAnalyticsPerformanceEvent,
  isChannelAnalyticsHealthEvent,
  // Channel Analytics Type Constants
  CHANNEL_ANALYTICS_TYPE,
  ChannelAnalyticsAnalysisType,
  ChannelAnalyticsDataType,
  ChannelAnalyticsChannelType,
  ChannelAnalyticsChannelCategory,
  ChannelAnalyticsChannelStatus,
  ChannelAnalyticsPerformanceLevel,
  ChannelAnalyticsHealthLevel,
  ChannelAnalyticsROICategory,
  ChannelAnalyticsAttributionModel,
  getChannelAnalyticsAnalysisTypeLabel,
  getChannelAnalyticsDataTypeLabel,
  getChannelAnalyticsChannelTypeLabel,
  getChannelAnalyticsChannelCategoryLabel,
  getChannelAnalyticsChannelStatusLabel,
  getChannelAnalyticsPerformanceLevelLabel,
  getChannelAnalyticsHealthLevelLabel,
  getChannelAnalyticsROICategoryLabel,
  getChannelAnalyticsAttributionModelLabel,
  isChannelAnalyticsPerformanceAnalysis,
  isChannelAnalyticsRevenueAnalysis,
  isChannelAnalyticsComparative,
  isChannelAnalyticsPredictive,
  getChannelAnalyticsPerformanceLevel,
  getChannelAnalyticsHealthLevel,
  getChannelAnalyticsROICategory,
  // Channel Analytics Metric Constants
  CHANNEL_ANALYTICS_METRIC,
  ChannelAnalyticsCountMetric,
  ChannelAnalyticsReachMetric,
  ChannelAnalyticsEngagementMetric,
  ChannelAnalyticsConversionMetric,
  ChannelAnalyticsRevenueMetric,
  ChannelAnalyticsCostMetric,
  ChannelAnalyticsProfitMetric,
  ChannelAnalyticsROIMetric,
  ChannelAnalyticsCustomerMetric,
  ChannelAnalyticsSatisfactionMetric,
  ChannelAnalyticsComparisonMetric,
  ChannelAnalyticsMetricCategory,
  ChannelAnalyticsMetricType,
  ChannelAnalyticsMetricFormat,
  ChannelAnalyticsMetricPriority,
  getChannelAnalyticsMetricLabel,
  getChannelAnalyticsMetricCategoryLabel,
  getChannelAnalyticsMetricTypeLabel,
  getChannelAnalyticsMetricFormatLabel,
  getChannelAnalyticsMetricPriorityLabel,
  getChannelAnalyticsMetricCategory,
  getChannelAnalyticsMetricType,
  getChannelAnalyticsMetricFormat,
  calculateChannelAnalyticsEngagementRate,
  calculateChannelAnalyticsCTR,
  calculateChannelAnalyticsConversionRate,
  calculateChannelAnalyticsROI,
  calculateChannelAnalyticsROAS,
  calculateChannelAnalyticsProfitMargin,
  calculateChannelAnalyticsCAC,
  calculateChannelAnalyticsRetentionRate,
  calculateChannelAnalyticsCSAT,
};
