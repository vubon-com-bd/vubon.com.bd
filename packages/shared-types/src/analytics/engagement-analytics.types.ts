/**
 * Engagement Analytics Types
 * Type definitions for engagement analytics based on shared-constants
 * @module EngagementAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants engagement analytics
// ============================================================
import {
  // Main Engagement Analytics Constants
  ENGAGEMENT_ANALYTICS,
  EngagementAnalyticsType,
  EngagementAnalyticsStatus,
  EngagementAnalyticsScope,
  EngagementAnalyticsEvent,
  EngagementAnalyticsDimension,
  EngagementAnalyticsMetric,
  EngagementAnalyticsSegment,
  EngagementAnalyticsCohort,
  EngagementAnalyticsGranularity,
  getEngagementAnalyticsStatusLabel,
  getEngagementAnalyticsEventLabel,
  getEngagementAnalyticsDimensionLabel,
  getEngagementAnalyticsSegmentLabel,
  getEngagementAnalyticsCohortLabel,
  getEngagementAnalyticsGranularityLabel,
  isEngagementAnalyticsActive,
  isEngagementAnalyticsCompleted,
  isEngagementAnalyticsFailed,
  isEngagementAnalyticsUserEvent,
  isEngagementAnalyticsSessionEvent,
  isEngagementAnalyticsContentEvent,
  isEngagementAnalyticsSocialEvent,
  // Engagement Analytics Type Constants
  ENGAGEMENT_ANALYTICS_TYPE,
  EngagementAnalyticsAnalysisType,
  EngagementAnalyticsDataType,
  EngagementAnalyticsEngagementLevel,
  EngagementAnalyticsSessionQuality,
  EngagementAnalyticsContentType,
  EngagementAnalyticsInteractionType,
  EngagementAnalyticsSocialType,
  EngagementAnalyticsUserState,
  EngagementAnalyticsConversionType,
  EngagementAnalyticsFunnelStage,
  getEngagementAnalyticsAnalysisTypeLabel,
  getEngagementAnalyticsDataTypeLabel,
  getEngagementAnalyticsEngagementLevelLabel,
  getEngagementAnalyticsSessionQualityLabel,
  getEngagementAnalyticsContentTypeLabel,
  getEngagementAnalyticsInteractionTypeLabel,
  getEngagementAnalyticsSocialTypeLabel,
  getEngagementAnalyticsUserStateLabel,
  getEngagementAnalyticsConversionTypeLabel,
  getEngagementAnalyticsFunnelStageLabel,
  isEngagementAnalyticsUserAnalysis,
  isEngagementAnalyticsSessionAnalysis,
  isEngagementAnalyticsContentAnalysis,
  isEngagementAnalyticsComparative,
  isEngagementAnalyticsPredictive,
  getEngagementAnalyticsEngagementLevel,
  getEngagementAnalyticsSessionQuality,
  // Engagement Analytics Metric Constants
  ENGAGEMENT_ANALYTICS_METRIC,
  EngagementAnalyticsUserMetric,
  EngagementAnalyticsSessionMetric,
  EngagementAnalyticsContentMetric,
  EngagementAnalyticsInteractionMetric,
  EngagementAnalyticsSocialMetric,
  EngagementAnalyticsConversionMetric,
  EngagementAnalyticsMilestoneMetric,
  EngagementAnalyticsComparisonMetric,
  EngagementAnalyticsMetricCategory,
  EngagementAnalyticsMetricType,
  EngagementAnalyticsMetricFormat,
  EngagementAnalyticsMetricPriority,
  getEngagementAnalyticsMetricLabel,
  getEngagementAnalyticsMetricCategoryLabel,
  getEngagementAnalyticsMetricTypeLabel,
  getEngagementAnalyticsMetricFormatLabel,
  getEngagementAnalyticsMetricPriorityLabel,
  getEngagementAnalyticsMetricCategory,
  getEngagementAnalyticsMetricType,
  getEngagementAnalyticsMetricFormat,
  calculateEngagementAnalyticsUserEngagementRate,
  calculateEngagementAnalyticsAvgSessionDuration,
  calculateEngagementAnalyticsViewCompletionRate,
  calculateEngagementAnalyticsInteractionRate,
  calculateEngagementAnalyticsSocialEngagementRate,
  calculateEngagementAnalyticsConversionRate,
  calculateEngagementAnalyticsSessionQualityScore,
  calculateEngagementAnalyticsContentPopularityScore,
} from '@vubon/shared-constants';

// ============================================================
// Engagement Analytics Extended Types
// ============================================================

/**
 * Engagement analytics
 */
export interface EngagementAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: EngagementAnalyticsType;
  status: EngagementAnalyticsStatus;
  scope: EngagementAnalyticsScope;
  event: EngagementAnalyticsEvent;
  dimension: EngagementAnalyticsDimension;
  metric: EngagementAnalyticsMetric;
  segment: EngagementAnalyticsSegment;
  cohort: EngagementAnalyticsCohort;
  granularity: EngagementAnalyticsGranularity;
  analysisType: EngagementAnalyticsAnalysisType;
  dataType: EngagementAnalyticsDataType;
  engagementLevel: EngagementAnalyticsEngagementLevel;
  sessionQuality: EngagementAnalyticsSessionQuality;
  contentType: EngagementAnalyticsContentType;
  interactionType: EngagementAnalyticsInteractionType;
  socialType: EngagementAnalyticsSocialType;
  userState: EngagementAnalyticsUserState;
  conversionType: EngagementAnalyticsConversionType;
  funnelStage: EngagementAnalyticsFunnelStage;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isUserEvent: boolean;
  isSessionEvent: boolean;
  isContentEvent: boolean;
  isSocialEvent: boolean;
  isUserAnalysis: boolean;
  isSessionAnalysis: boolean;
  isContentAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Engagement analytics filter
 */
export interface EngagementAnalyticsFilter {
  ids?: ID[];
  types?: EngagementAnalyticsType[];
  statuses?: EngagementAnalyticsStatus[];
  scopes?: EngagementAnalyticsScope[];
  events?: EngagementAnalyticsEvent[];
  dimensions?: EngagementAnalyticsDimension[];
  metrics?: EngagementAnalyticsMetric[];
  segments?: EngagementAnalyticsSegment[];
  cohorts?: EngagementAnalyticsCohort[];
  granularities?: EngagementAnalyticsGranularity[];
  analysisTypes?: EngagementAnalyticsAnalysisType[];
  dataTypes?: EngagementAnalyticsDataType[];
  engagementLevels?: EngagementAnalyticsEngagementLevel[];
  sessionQualities?: EngagementAnalyticsSessionQuality[];
  contentTypes?: EngagementAnalyticsContentType[];
  interactionTypes?: EngagementAnalyticsInteractionType[];
  socialTypes?: EngagementAnalyticsSocialType[];
  userStates?: EngagementAnalyticsUserState[];
  conversionTypes?: EngagementAnalyticsConversionType[];
  funnelStages?: EngagementAnalyticsFunnelStage[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isUserEvent?: boolean;
  isSessionEvent?: boolean;
  isContentEvent?: boolean;
  isSocialEvent?: boolean;
  isUserAnalysis?: boolean;
  isSessionAnalysis?: boolean;
  isContentAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Engagement analytics statistics
 */
export interface EngagementAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  userEvents: number;
  sessionEvents: number;
  contentEvents: number;
  socialEvents: number;
  userAnalyses: number;
  sessionAnalyses: number;
  contentAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<EngagementAnalyticsType, number>;
  byStatus: Record<EngagementAnalyticsStatus, number>;
  byEvent: Record<EngagementAnalyticsEvent, number>;
  byMetric: Record<EngagementAnalyticsMetric, number>;
  bySegment: Record<EngagementAnalyticsSegment, number>;
  byCohort: Record<EngagementAnalyticsCohort, number>;
  byGranularity: Record<EngagementAnalyticsGranularity, number>;
  byEngagementLevel: Record<EngagementAnalyticsEngagementLevel, number>;
  bySessionQuality: Record<EngagementAnalyticsSessionQuality, number>;
  byContentType: Record<EngagementAnalyticsContentType, number>;
  byInteractionType: Record<EngagementAnalyticsInteractionType, number>;
  bySocialType: Record<EngagementAnalyticsSocialType, number>;
  byUserState: Record<EngagementAnalyticsUserState, number>;
  byConversionType: Record<EngagementAnalyticsConversionType, number>;
  byFunnelStage: Record<EngagementAnalyticsFunnelStage, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: EngagementAnalyticsEvent;
  mostFrequentMetric: EngagementAnalyticsMetric;
  mostFrequentSegment: EngagementAnalyticsSegment;
}

/**
 * Engagement analytics summary
 */
export interface EngagementAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  userEvents: number;
  sessionEvents: number;
  contentEvents: number;
  socialEvents: number;
  userAnalyses: number;
  sessionAnalyses: number;
  contentAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<EngagementAnalyticsType, number>;
  byStatus: Record<EngagementAnalyticsStatus, number>;
  byEvent: Record<EngagementAnalyticsEvent, number>;
  byMetric: Record<EngagementAnalyticsMetric, number>;
  bySegment: Record<EngagementAnalyticsSegment, number>;
  byCohort: Record<EngagementAnalyticsCohort, number>;
  byGranularity: Record<EngagementAnalyticsGranularity, number>;
  byEngagementLevel: Record<EngagementAnalyticsEngagementLevel, number>;
  bySessionQuality: Record<EngagementAnalyticsSessionQuality, number>;
  byContentType: Record<EngagementAnalyticsContentType, number>;
  byInteractionType: Record<EngagementAnalyticsInteractionType, number>;
  bySocialType: Record<EngagementAnalyticsSocialType, number>;
  byUserState: Record<EngagementAnalyticsUserState, number>;
  byConversionType: Record<EngagementAnalyticsConversionType, number>;
  byFunnelStage: Record<EngagementAnalyticsFunnelStage, number>;
  engagementTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: EngagementAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: EngagementAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topEngagementLevels: {
    level: EngagementAnalyticsEngagementLevel;
    count: number;
    label: string;
  }[];
  topContentTypes: {
    type: EngagementAnalyticsContentType;
    count: number;
    label: string;
  }[];
}

/**
 * Engagement analytics configuration
 */
export interface EngagementAnalyticsConfiguration {
  enabled: boolean;
  defaultType: EngagementAnalyticsType;
  defaultScope: EngagementAnalyticsScope;
  defaultGranularity: EngagementAnalyticsGranularity;
  trackUserEvents: boolean;
  trackSessionEvents: boolean;
  trackContentEvents: boolean;
  trackSocialEvents: boolean;
  trackUserAnalysis: boolean;
  trackSessionAnalysis: boolean;
  trackContentAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: EngagementAnalyticsAlertConfig;
}

/**
 * Engagement analytics alert configuration
 */
export interface EngagementAnalyticsAlertConfig {
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
 * Engagement analytics history
 */
export interface EngagementAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Engagement analytics data point
 */
export interface EngagementAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: EngagementAnalyticsEvent;
  dimension: EngagementAnalyticsDimension;
  metric: EngagementAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Engagement analytics export
 */
export interface EngagementAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: EngagementAnalyticsFilter;
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
  // Main Engagement Analytics Constants
  ENGAGEMENT_ANALYTICS,
  EngagementAnalyticsType,
  EngagementAnalyticsStatus,
  EngagementAnalyticsScope,
  EngagementAnalyticsEvent,
  EngagementAnalyticsDimension,
  EngagementAnalyticsMetric,
  EngagementAnalyticsSegment,
  EngagementAnalyticsCohort,
  EngagementAnalyticsGranularity,
  getEngagementAnalyticsStatusLabel,
  getEngagementAnalyticsEventLabel,
  getEngagementAnalyticsDimensionLabel,
  getEngagementAnalyticsSegmentLabel,
  getEngagementAnalyticsCohortLabel,
  getEngagementAnalyticsGranularityLabel,
  isEngagementAnalyticsActive,
  isEngagementAnalyticsCompleted,
  isEngagementAnalyticsFailed,
  isEngagementAnalyticsUserEvent,
  isEngagementAnalyticsSessionEvent,
  isEngagementAnalyticsContentEvent,
  isEngagementAnalyticsSocialEvent,
  // Engagement Analytics Type Constants
  ENGAGEMENT_ANALYTICS_TYPE,
  EngagementAnalyticsAnalysisType,
  EngagementAnalyticsDataType,
  EngagementAnalyticsEngagementLevel,
  EngagementAnalyticsSessionQuality,
  EngagementAnalyticsContentType,
  EngagementAnalyticsInteractionType,
  EngagementAnalyticsSocialType,
  EngagementAnalyticsUserState,
  EngagementAnalyticsConversionType,
  EngagementAnalyticsFunnelStage,
  getEngagementAnalyticsAnalysisTypeLabel,
  getEngagementAnalyticsDataTypeLabel,
  getEngagementAnalyticsEngagementLevelLabel,
  getEngagementAnalyticsSessionQualityLabel,
  getEngagementAnalyticsContentTypeLabel,
  getEngagementAnalyticsInteractionTypeLabel,
  getEngagementAnalyticsSocialTypeLabel,
  getEngagementAnalyticsUserStateLabel,
  getEngagementAnalyticsConversionTypeLabel,
  getEngagementAnalyticsFunnelStageLabel,
  isEngagementAnalyticsUserAnalysis,
  isEngagementAnalyticsSessionAnalysis,
  isEngagementAnalyticsContentAnalysis,
  isEngagementAnalyticsComparative,
  isEngagementAnalyticsPredictive,
  getEngagementAnalyticsEngagementLevel,
  getEngagementAnalyticsSessionQuality,
  // Engagement Analytics Metric Constants
  ENGAGEMENT_ANALYTICS_METRIC,
  EngagementAnalyticsUserMetric,
  EngagementAnalyticsSessionMetric,
  EngagementAnalyticsContentMetric,
  EngagementAnalyticsInteractionMetric,
  EngagementAnalyticsSocialMetric,
  EngagementAnalyticsConversionMetric,
  EngagementAnalyticsMilestoneMetric,
  EngagementAnalyticsComparisonMetric,
  EngagementAnalyticsMetricCategory,
  EngagementAnalyticsMetricType,
  EngagementAnalyticsMetricFormat,
  EngagementAnalyticsMetricPriority,
  getEngagementAnalyticsMetricLabel,
  getEngagementAnalyticsMetricCategoryLabel,
  getEngagementAnalyticsMetricTypeLabel,
  getEngagementAnalyticsMetricFormatLabel,
  getEngagementAnalyticsMetricPriorityLabel,
  getEngagementAnalyticsMetricCategory,
  getEngagementAnalyticsMetricType,
  getEngagementAnalyticsMetricFormat,
  calculateEngagementAnalyticsUserEngagementRate,
  calculateEngagementAnalyticsAvgSessionDuration,
  calculateEngagementAnalyticsViewCompletionRate,
  calculateEngagementAnalyticsInteractionRate,
  calculateEngagementAnalyticsSocialEngagementRate,
  calculateEngagementAnalyticsConversionRate,
  calculateEngagementAnalyticsSessionQualityScore,
  calculateEngagementAnalyticsContentPopularityScore,
};
