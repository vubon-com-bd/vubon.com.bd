/**
 * User Analytics Types
 * Type definitions for user analytics based on shared-constants
 * @module UserAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user analytics
// ============================================================
import {
  // Main Analytics Constants
  USER_ANALYTICS,
  UserAnalyticsType,
  UserAnalyticsStatus,
  UserAnalyticsScope,
  UserAnalyticsEvent,
  UserAnalyticsDimension,
  UserAnalyticsMetric,
  UserAnalyticsSegment,
  UserAnalyticsCohort,
  UserAnalyticsGranularity,
  getUserAnalyticsStatusLabel,
  getUserAnalyticsEventLabel,
  getUserAnalyticsDimensionLabel,
  getUserAnalyticsSegmentLabel,
  getUserAnalyticsCohortLabel,
  getUserAnalyticsGranularityLabel,
  isUserAnalyticsActive,
  isUserAnalyticsCompleted,
  isUserAnalyticsFailed,
  isUserAnalyticsLifecycleEvent,
  isUserAnalyticsEngagementEvent,
  // Analytics Type Constants
  USER_ANALYTICS_TYPE,
  UserAnalyticsAnalysisType,
  UserAnalyticsDataType,
  UserAnalyticsUserType,
  UserAnalyticsEngagementLevel,
  UserAnalyticsLifecycleStage,
  UserAnalyticsSatisfactionLevel,
  UserAnalyticsTrustLevel,
  UserAnalyticsPrivacyLevel,
  getUserAnalyticsAnalysisTypeLabel,
  getUserAnalyticsDataTypeLabel,
  getUserAnalyticsUserTypeLabel,
  getUserAnalyticsEngagementLevelLabel,
  getUserAnalyticsLifecycleStageLabel,
  getUserAnalyticsSatisfactionLevelLabel,
  getUserAnalyticsTrustLevelLabel,
  getUserAnalyticsPrivacyLevelLabel,
  isUserAnalyticsDescriptive,
  isUserAnalyticsPredictive,
  getUserAnalyticsEngagementLevel,
  getUserAnalyticsSatisfactionLevel,
  getUserAnalyticsLifecycleStage,
  // Analytics Metric Constants
  USER_ANALYTICS_METRIC,
  UserAnalyticsCountMetric,
  UserAnalyticsRateMetric,
  UserAnalyticsDurationMetric,
  UserAnalyticsValueMetric,
  UserAnalyticsEngagementMetric,
  UserAnalyticsRetentionMetric,
  UserAnalyticsSatisfactionMetric,
  UserAnalyticsMetricCategory,
  UserAnalyticsMetricType,
  UserAnalyticsMetricFormat,
  getUserAnalyticsMetricLabel,
  getUserAnalyticsMetricCategoryLabel,
  getUserAnalyticsMetricTypeLabel,
  getUserAnalyticsMetricFormatLabel,
  getUserAnalyticsMetricCategory,
  getUserAnalyticsMetricType,
  getUserAnalyticsMetricFormat,
  calculateUserAnalyticsRetentionRate,
  calculateUserAnalyticsChurnRate,
  calculateUserAnalyticsEngagementRate,
  calculateUserAnalyticsNPS,
} from '@vubon/shared-constants';

// ============================================================
// User Analytics Extended Types
// ============================================================

/**
 * User analytics with additional metadata
 */
export interface UserAnalyticsExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserAnalyticsType;
  status: UserAnalyticsStatus;
  scope: UserAnalyticsScope;
  event: UserAnalyticsEvent;
  dimension: UserAnalyticsDimension;
  metric: UserAnalyticsMetric;
  segment: UserAnalyticsSegment;
  cohort: UserAnalyticsCohort;
  granularity: UserAnalyticsGranularity;
  analysisType: UserAnalyticsAnalysisType;
  dataType: UserAnalyticsDataType;
  userType: UserAnalyticsUserType;
  engagementLevel: UserAnalyticsEngagementLevel;
  lifecycleStage: UserAnalyticsLifecycleStage;
  satisfactionLevel: UserAnalyticsSatisfactionLevel;
  trustLevel: UserAnalyticsTrustLevel;
  privacyLevel: UserAnalyticsPrivacyLevel;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isLifecycleEvent: boolean;
  isEngagementEvent: boolean;
  isDescriptive: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * User analytics filter
 */
export interface UserAnalyticsFilter {
  userIds?: ID[];
  types?: UserAnalyticsType[];
  statuses?: UserAnalyticsStatus[];
  scopes?: UserAnalyticsScope[];
  events?: UserAnalyticsEvent[];
  dimensions?: UserAnalyticsDimension[];
  metrics?: UserAnalyticsMetric[];
  segments?: UserAnalyticsSegment[];
  cohorts?: UserAnalyticsCohort[];
  granularities?: UserAnalyticsGranularity[];
  analysisTypes?: UserAnalyticsAnalysisType[];
  dataTypes?: UserAnalyticsDataType[];
  userTypes?: UserAnalyticsUserType[];
  engagementLevels?: UserAnalyticsEngagementLevel[];
  lifecycleStages?: UserAnalyticsLifecycleStage[];
  satisfactionLevels?: UserAnalyticsSatisfactionLevel[];
  trustLevels?: UserAnalyticsTrustLevel[];
  privacyLevels?: UserAnalyticsPrivacyLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isLifecycleEvent?: boolean;
  isEngagementEvent?: boolean;
  isDescriptive?: boolean;
  isPredictive?: boolean;
  searchTerm?: string;
}

/**
 * User analytics statistics
 */
export interface UserAnalyticsStatistics {
  userId: ID;
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  lifecycleEvents: number;
  engagementEvents: number;
  descriptiveAnalytics: number;
  predictiveAnalytics: number;
  byType: Record<UserAnalyticsType, number>;
  byStatus: Record<UserAnalyticsStatus, number>;
  byEvent: Record<UserAnalyticsEvent, number>;
  byMetric: Record<UserAnalyticsMetric, number>;
  bySegment: Record<UserAnalyticsSegment, number>;
  byCohort: Record<UserAnalyticsCohort, number>;
  byGranularity: Record<UserAnalyticsGranularity, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: UserAnalyticsEvent;
  mostFrequentMetric: UserAnalyticsMetric;
  mostFrequentSegment: UserAnalyticsSegment;
}

/**
 * User analytics summary
 */
export interface UserAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  lifecycleEvents: number;
  engagementEvents: number;
  descriptive: number;
  predictive: number;
  byType: Record<UserAnalyticsType, number>;
  byStatus: Record<UserAnalyticsStatus, number>;
  byEvent: Record<UserAnalyticsEvent, number>;
  byMetric: Record<UserAnalyticsMetric, number>;
  bySegment: Record<UserAnalyticsSegment, number>;
  byCohort: Record<UserAnalyticsCohort, number>;
  byGranularity: Record<UserAnalyticsGranularity, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: UserAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: UserAnalyticsMetric;
    count: number;
    label: string;
  }[];
}

/**
 * User analytics configuration
 */
export interface UserAnalyticsConfiguration {
  enabled: boolean;
  defaultType: UserAnalyticsType;
  defaultScope: UserAnalyticsScope;
  defaultGranularity: UserAnalyticsGranularity;
  trackLifecycleEvents: boolean;
  trackEngagementEvents: boolean;
  trackDescriptiveAnalytics: boolean;
  trackPredictiveAnalytics: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: UserAnalyticsAlertConfig;
}

/**
 * User analytics alert configuration
 */
export interface UserAnalyticsAlertConfig {
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
 * User analytics history
 */
export interface UserAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  userId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * User analytics data point
 */
export interface UserAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  analyticsId: ID;
  event: UserAnalyticsEvent;
  dimension: UserAnalyticsDimension;
  metric: UserAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * User analytics cohort
 */
export interface UserAnalyticsCohortData extends BaseEntity, Timestamp {
  id: ID;
  cohort: UserAnalyticsCohort;
  userId: ID;
  segment: UserAnalyticsSegment;
  size: number;
  retentionRate: number;
  churnRate: number;
  engagementRate: number;
  nps: number;
  dateRange: {
    start: Date;
    end: Date;
  };
  metadata?: Metadata;
}

/**
 * User analytics export
 */
export interface UserAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: UserAnalyticsFilter;
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
  // Main Analytics Constants
  USER_ANALYTICS,
  UserAnalyticsType,
  UserAnalyticsStatus,
  UserAnalyticsScope,
  UserAnalyticsEvent,
  UserAnalyticsDimension,
  UserAnalyticsMetric,
  UserAnalyticsSegment,
  UserAnalyticsCohort,
  UserAnalyticsGranularity,
  getUserAnalyticsStatusLabel,
  getUserAnalyticsEventLabel,
  getUserAnalyticsDimensionLabel,
  getUserAnalyticsSegmentLabel,
  getUserAnalyticsCohortLabel,
  getUserAnalyticsGranularityLabel,
  isUserAnalyticsActive,
  isUserAnalyticsCompleted,
  isUserAnalyticsFailed,
  isUserAnalyticsLifecycleEvent,
  isUserAnalyticsEngagementEvent,
  // Analytics Type Constants
  USER_ANALYTICS_TYPE,
  UserAnalyticsAnalysisType,
  UserAnalyticsDataType,
  UserAnalyticsUserType,
  UserAnalyticsEngagementLevel,
  UserAnalyticsLifecycleStage,
  UserAnalyticsSatisfactionLevel,
  UserAnalyticsTrustLevel,
  UserAnalyticsPrivacyLevel,
  getUserAnalyticsAnalysisTypeLabel,
  getUserAnalyticsDataTypeLabel,
  getUserAnalyticsUserTypeLabel,
  getUserAnalyticsEngagementLevelLabel,
  getUserAnalyticsLifecycleStageLabel,
  getUserAnalyticsSatisfactionLevelLabel,
  getUserAnalyticsTrustLevelLabel,
  getUserAnalyticsPrivacyLevelLabel,
  isUserAnalyticsDescriptive,
  isUserAnalyticsPredictive,
  getUserAnalyticsEngagementLevel,
  getUserAnalyticsSatisfactionLevel,
  getUserAnalyticsLifecycleStage,
  // Analytics Metric Constants
  USER_ANALYTICS_METRIC,
  UserAnalyticsCountMetric,
  UserAnalyticsRateMetric,
  UserAnalyticsDurationMetric,
  UserAnalyticsValueMetric,
  UserAnalyticsEngagementMetric,
  UserAnalyticsRetentionMetric,
  UserAnalyticsSatisfactionMetric,
  UserAnalyticsMetricCategory,
  UserAnalyticsMetricType,
  UserAnalyticsMetricFormat,
  getUserAnalyticsMetricLabel,
  getUserAnalyticsMetricCategoryLabel,
  getUserAnalyticsMetricTypeLabel,
  getUserAnalyticsMetricFormatLabel,
  getUserAnalyticsMetricCategory,
  getUserAnalyticsMetricType,
  getUserAnalyticsMetricFormat,
  calculateUserAnalyticsRetentionRate,
  calculateUserAnalyticsChurnRate,
  calculateUserAnalyticsEngagementRate,
  calculateUserAnalyticsNPS,
};
