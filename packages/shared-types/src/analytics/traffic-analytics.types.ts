/**
 * Traffic Analytics Types
 * Type definitions for traffic analytics based on shared-constants
 * @module TrafficAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants traffic analytics
// ============================================================
import {
  // Main Traffic Analytics Constants
  TRAFFIC_ANALYTICS,
  TrafficAnalyticsType,
  TrafficAnalyticsStatus,
  TrafficAnalyticsScope,
  TrafficAnalyticsEvent,
  TrafficAnalyticsDimension,
  TrafficAnalyticsMetric,
  TrafficAnalyticsSegment,
  TrafficAnalyticsCohort,
  TrafficAnalyticsGranularity,
  getTrafficAnalyticsStatusLabel,
  getTrafficAnalyticsEventLabel,
  getTrafficAnalyticsDimensionLabel,
  getTrafficAnalyticsSegmentLabel,
  getTrafficAnalyticsCohortLabel,
  getTrafficAnalyticsGranularityLabel,
  isTrafficAnalyticsActive,
  isTrafficAnalyticsCompleted,
  isTrafficAnalyticsFailed,
  isTrafficAnalyticsPageEvent,
  isTrafficAnalyticsVisitorEvent,
  isTrafficAnalyticsSessionEvent,
  isTrafficAnalyticsSourceEvent,
  // Traffic Analytics Type Constants
  TRAFFIC_ANALYTICS_TYPE,
  TrafficAnalyticsAnalysisType,
  TrafficAnalyticsDataType,
  TrafficAnalyticsSourceType,
  TrafficAnalyticsDeviceType,
  TrafficAnalyticsBrowserType,
  TrafficAnalyticsOSType,
  TrafficAnalyticsVisitorType,
  TrafficAnalyticsSessionQuality,
  TrafficAnalyticsEngagementLevel,
  TrafficAnalyticsBounceType,
  TrafficAnalyticsConversionType,
  TrafficAnalyticsFunnelType,
  getTrafficAnalyticsAnalysisTypeLabel,
  getTrafficAnalyticsDataTypeLabel,
  getTrafficAnalyticsSourceTypeLabel,
  getTrafficAnalyticsDeviceTypeLabel,
  getTrafficAnalyticsBrowserTypeLabel,
  getTrafficAnalyticsOSTypeLabel,
  getTrafficAnalyticsVisitorTypeLabel,
  getTrafficAnalyticsSessionQualityLabel,
  getTrafficAnalyticsEngagementLevelLabel,
  getTrafficAnalyticsBounceTypeLabel,
  getTrafficAnalyticsConversionTypeLabel,
  getTrafficAnalyticsFunnelTypeLabel,
  isTrafficAnalyticsSourceAnalysis,
  isTrafficAnalyticsVisitorAnalysis,
  isTrafficAnalyticsDeviceAnalysis,
  isTrafficAnalyticsPredictive,
  getTrafficAnalyticsEngagementLevel,
  getTrafficAnalyticsSessionQuality,
  // Traffic Analytics Metric Constants
  TRAFFIC_ANALYTICS_METRIC,
  TrafficAnalyticsVisitorMetric,
  TrafficAnalyticsSessionMetric,
  TrafficAnalyticsPageViewMetric,
  TrafficAnalyticsBounceMetric,
  TrafficAnalyticsSourceMetric,
  TrafficAnalyticsDeviceMetric,
  TrafficAnalyticsBrowserMetric,
  TrafficAnalyticsLocationMetric,
  TrafficAnalyticsTimeMetric,
  TrafficAnalyticsPerformanceMetric,
  TrafficAnalyticsConversionMetric,
  TrafficAnalyticsComparisonMetric,
  TrafficAnalyticsMetricCategory,
  TrafficAnalyticsMetricType,
  TrafficAnalyticsMetricFormat,
  TrafficAnalyticsMetricPriority,
  getTrafficAnalyticsMetricLabel,
  getTrafficAnalyticsMetricCategoryLabel,
  getTrafficAnalyticsMetricTypeLabel,
  getTrafficAnalyticsMetricFormatLabel,
  getTrafficAnalyticsMetricPriorityLabel,
  getTrafficAnalyticsMetricCategory,
  getTrafficAnalyticsMetricType,
  getTrafficAnalyticsMetricFormat,
  calculateTrafficAnalyticsBounceRate,
  calculateTrafficAnalyticsExitRate,
  calculateTrafficAnalyticsConversionRate,
  calculateTrafficAnalyticsVisitorGrowth,
  calculateTrafficAnalyticsEngagementRate,
  calculateTrafficAnalyticsAvgSessionDuration,
  calculateTrafficAnalyticsPageViewsPerSession,
  calculateTrafficAnalyticsTrafficDiversity,
} from '@vubon/shared-constants';

// ============================================================
// Traffic Analytics Extended Types
// ============================================================

/**
 * Traffic analytics
 */
export interface TrafficAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: TrafficAnalyticsType;
  status: TrafficAnalyticsStatus;
  scope: TrafficAnalyticsScope;
  event: TrafficAnalyticsEvent;
  dimension: TrafficAnalyticsDimension;
  metric: TrafficAnalyticsMetric;
  segment: TrafficAnalyticsSegment;
  cohort: TrafficAnalyticsCohort;
  granularity: TrafficAnalyticsGranularity;
  analysisType: TrafficAnalyticsAnalysisType;
  dataType: TrafficAnalyticsDataType;
  sourceType: TrafficAnalyticsSourceType;
  deviceType: TrafficAnalyticsDeviceType;
  browserType: TrafficAnalyticsBrowserType;
  osType: TrafficAnalyticsOSType;
  visitorType: TrafficAnalyticsVisitorType;
  sessionQuality: TrafficAnalyticsSessionQuality;
  engagementLevel: TrafficAnalyticsEngagementLevel;
  bounceType: TrafficAnalyticsBounceType;
  conversionType: TrafficAnalyticsConversionType;
  funnelType: TrafficAnalyticsFunnelType;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isPageEvent: boolean;
  isVisitorEvent: boolean;
  isSessionEvent: boolean;
  isSourceEvent: boolean;
  isSourceAnalysis: boolean;
  isVisitorAnalysis: boolean;
  isDeviceAnalysis: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Traffic analytics filter
 */
export interface TrafficAnalyticsFilter {
  ids?: ID[];
  types?: TrafficAnalyticsType[];
  statuses?: TrafficAnalyticsStatus[];
  scopes?: TrafficAnalyticsScope[];
  events?: TrafficAnalyticsEvent[];
  dimensions?: TrafficAnalyticsDimension[];
  metrics?: TrafficAnalyticsMetric[];
  segments?: TrafficAnalyticsSegment[];
  cohorts?: TrafficAnalyticsCohort[];
  granularities?: TrafficAnalyticsGranularity[];
  analysisTypes?: TrafficAnalyticsAnalysisType[];
  dataTypes?: TrafficAnalyticsDataType[];
  sourceTypes?: TrafficAnalyticsSourceType[];
  deviceTypes?: TrafficAnalyticsDeviceType[];
  browserTypes?: TrafficAnalyticsBrowserType[];
  osTypes?: TrafficAnalyticsOSType[];
  visitorTypes?: TrafficAnalyticsVisitorType[];
  sessionQualities?: TrafficAnalyticsSessionQuality[];
  engagementLevels?: TrafficAnalyticsEngagementLevel[];
  bounceTypes?: TrafficAnalyticsBounceType[];
  conversionTypes?: TrafficAnalyticsConversionType[];
  funnelTypes?: TrafficAnalyticsFunnelType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isPageEvent?: boolean;
  isVisitorEvent?: boolean;
  isSessionEvent?: boolean;
  isSourceEvent?: boolean;
  isSourceAnalysis?: boolean;
  isVisitorAnalysis?: boolean;
  isDeviceAnalysis?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Traffic analytics statistics
 */
export interface TrafficAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  pageEvents: number;
  visitorEvents: number;
  sessionEvents: number;
  sourceEvents: number;
  sourceAnalyses: number;
  visitorAnalyses: number;
  deviceAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<TrafficAnalyticsType, number>;
  byStatus: Record<TrafficAnalyticsStatus, number>;
  byEvent: Record<TrafficAnalyticsEvent, number>;
  byMetric: Record<TrafficAnalyticsMetric, number>;
  bySegment: Record<TrafficAnalyticsSegment, number>;
  byCohort: Record<TrafficAnalyticsCohort, number>;
  byGranularity: Record<TrafficAnalyticsGranularity, number>;
  bySourceType: Record<TrafficAnalyticsSourceType, number>;
  byDeviceType: Record<TrafficAnalyticsDeviceType, number>;
  byBrowserType: Record<TrafficAnalyticsBrowserType, number>;
  byOSType: Record<TrafficAnalyticsOSType, number>;
  byVisitorType: Record<TrafficAnalyticsVisitorType, number>;
  bySessionQuality: Record<TrafficAnalyticsSessionQuality, number>;
  byEngagementLevel: Record<TrafficAnalyticsEngagementLevel, number>;
  byBounceType: Record<TrafficAnalyticsBounceType, number>;
  byConversionType: Record<TrafficAnalyticsConversionType, number>;
  byFunnelType: Record<TrafficAnalyticsFunnelType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: TrafficAnalyticsEvent;
  mostFrequentMetric: TrafficAnalyticsMetric;
  mostFrequentSegment: TrafficAnalyticsSegment;
}

/**
 * Traffic analytics summary
 */
export interface TrafficAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  pageEvents: number;
  visitorEvents: number;
  sessionEvents: number;
  sourceEvents: number;
  sourceAnalyses: number;
  visitorAnalyses: number;
  deviceAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<TrafficAnalyticsType, number>;
  byStatus: Record<TrafficAnalyticsStatus, number>;
  byEvent: Record<TrafficAnalyticsEvent, number>;
  byMetric: Record<TrafficAnalyticsMetric, number>;
  bySegment: Record<TrafficAnalyticsSegment, number>;
  byCohort: Record<TrafficAnalyticsCohort, number>;
  byGranularity: Record<TrafficAnalyticsGranularity, number>;
  bySourceType: Record<TrafficAnalyticsSourceType, number>;
  byDeviceType: Record<TrafficAnalyticsDeviceType, number>;
  byBrowserType: Record<TrafficAnalyticsBrowserType, number>;
  byOSType: Record<TrafficAnalyticsOSType, number>;
  byVisitorType: Record<TrafficAnalyticsVisitorType, number>;
  bySessionQuality: Record<TrafficAnalyticsSessionQuality, number>;
  byEngagementLevel: Record<TrafficAnalyticsEngagementLevel, number>;
  byBounceType: Record<TrafficAnalyticsBounceType, number>;
  byConversionType: Record<TrafficAnalyticsConversionType, number>;
  byFunnelType: Record<TrafficAnalyticsFunnelType, number>;
  trafficTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: TrafficAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: TrafficAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topSourceTypes: {
    type: TrafficAnalyticsSourceType;
    count: number;
    label: string;
  }[];
  topDeviceTypes: {
    type: TrafficAnalyticsDeviceType;
    count: number;
    label: string;
  }[];
}

/**
 * Traffic analytics configuration
 */
export interface TrafficAnalyticsConfiguration {
  enabled: boolean;
  defaultType: TrafficAnalyticsType;
  defaultScope: TrafficAnalyticsScope;
  defaultGranularity: TrafficAnalyticsGranularity;
  trackPageEvents: boolean;
  trackVisitorEvents: boolean;
  trackSessionEvents: boolean;
  trackSourceEvents: boolean;
  trackSourceAnalysis: boolean;
  trackVisitorAnalysis: boolean;
  trackDeviceAnalysis: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: TrafficAnalyticsAlertConfig;
}

/**
 * Traffic analytics alert configuration
 */
export interface TrafficAnalyticsAlertConfig {
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
 * Traffic analytics history
 */
export interface TrafficAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Traffic analytics data point
 */
export interface TrafficAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: TrafficAnalyticsEvent;
  dimension: TrafficAnalyticsDimension;
  metric: TrafficAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Traffic analytics export
 */
export interface TrafficAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: TrafficAnalyticsFilter;
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
  // Main Traffic Analytics Constants
  TRAFFIC_ANALYTICS,
  TrafficAnalyticsType,
  TrafficAnalyticsStatus,
  TrafficAnalyticsScope,
  TrafficAnalyticsEvent,
  TrafficAnalyticsDimension,
  TrafficAnalyticsMetric,
  TrafficAnalyticsSegment,
  TrafficAnalyticsCohort,
  TrafficAnalyticsGranularity,
  getTrafficAnalyticsStatusLabel,
  getTrafficAnalyticsEventLabel,
  getTrafficAnalyticsDimensionLabel,
  getTrafficAnalyticsSegmentLabel,
  getTrafficAnalyticsCohortLabel,
  getTrafficAnalyticsGranularityLabel,
  isTrafficAnalyticsActive,
  isTrafficAnalyticsCompleted,
  isTrafficAnalyticsFailed,
  isTrafficAnalyticsPageEvent,
  isTrafficAnalyticsVisitorEvent,
  isTrafficAnalyticsSessionEvent,
  isTrafficAnalyticsSourceEvent,
  // Traffic Analytics Type Constants
  TRAFFIC_ANALYTICS_TYPE,
  TrafficAnalyticsAnalysisType,
  TrafficAnalyticsDataType,
  TrafficAnalyticsSourceType,
  TrafficAnalyticsDeviceType,
  TrafficAnalyticsBrowserType,
  TrafficAnalyticsOSType,
  TrafficAnalyticsVisitorType,
  TrafficAnalyticsSessionQuality,
  TrafficAnalyticsEngagementLevel,
  TrafficAnalyticsBounceType,
  TrafficAnalyticsConversionType,
  TrafficAnalyticsFunnelType,
  getTrafficAnalyticsAnalysisTypeLabel,
  getTrafficAnalyticsDataTypeLabel,
  getTrafficAnalyticsSourceTypeLabel,
  getTrafficAnalyticsDeviceTypeLabel,
  getTrafficAnalyticsBrowserTypeLabel,
  getTrafficAnalyticsOSTypeLabel,
  getTrafficAnalyticsVisitorTypeLabel,
  getTrafficAnalyticsSessionQualityLabel,
  getTrafficAnalyticsEngagementLevelLabel,
  getTrafficAnalyticsBounceTypeLabel,
  getTrafficAnalyticsConversionTypeLabel,
  getTrafficAnalyticsFunnelTypeLabel,
  isTrafficAnalyticsSourceAnalysis,
  isTrafficAnalyticsVisitorAnalysis,
  isTrafficAnalyticsDeviceAnalysis,
  isTrafficAnalyticsPredictive,
  getTrafficAnalyticsEngagementLevel,
  getTrafficAnalyticsSessionQuality,
  // Traffic Analytics Metric Constants
  TRAFFIC_ANALYTICS_METRIC,
  TrafficAnalyticsVisitorMetric,
  TrafficAnalyticsSessionMetric,
  TrafficAnalyticsPageViewMetric,
  TrafficAnalyticsBounceMetric,
  TrafficAnalyticsSourceMetric,
  TrafficAnalyticsDeviceMetric,
  TrafficAnalyticsBrowserMetric,
  TrafficAnalyticsLocationMetric,
  TrafficAnalyticsTimeMetric,
  TrafficAnalyticsPerformanceMetric,
  TrafficAnalyticsConversionMetric,
  TrafficAnalyticsComparisonMetric,
  TrafficAnalyticsMetricCategory,
  TrafficAnalyticsMetricType,
  TrafficAnalyticsMetricFormat,
  TrafficAnalyticsMetricPriority,
  getTrafficAnalyticsMetricLabel,
  getTrafficAnalyticsMetricCategoryLabel,
  getTrafficAnalyticsMetricTypeLabel,
  getTrafficAnalyticsMetricFormatLabel,
  getTrafficAnalyticsMetricPriorityLabel,
  getTrafficAnalyticsMetricCategory,
  getTrafficAnalyticsMetricType,
  getTrafficAnalyticsMetricFormat,
  calculateTrafficAnalyticsBounceRate,
  calculateTrafficAnalyticsExitRate,
  calculateTrafficAnalyticsConversionRate,
  calculateTrafficAnalyticsVisitorGrowth,
  calculateTrafficAnalyticsEngagementRate,
  calculateTrafficAnalyticsAvgSessionDuration,
  calculateTrafficAnalyticsPageViewsPerSession,
  calculateTrafficAnalyticsTrafficDiversity,
};
