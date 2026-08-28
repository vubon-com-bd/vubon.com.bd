/**
 * Notification Analytics Types
 * Type definitions for notification analytics based on shared-constants
 * @module NotificationAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants analytics notification
// ============================================================
import {
  // Analytics Aggregation
  ANALYTICS_AGGREGATION,
  AnalyticsAggregationType,
  AnalyticsAggregationCategory,
  AnalyticsAggregationLevel,
  AnalyticsAggregationScope,
  AnalyticsAggregationPrecision,
  getAnalyticsAggregationLabel,
  getAnalyticsAggregationCategoryLabel,
  getAnalyticsAggregationLevelLabel,
  getAnalyticsAggregationScopeLabel,
  getAnalyticsAggregationPrecisionLabel,
  isAnalyticsAggregationStatistical,
  isAnalyticsAggregationMathematical,
  isAnalyticsAggregationTimeSeries,
  isAnalyticsAggregationApproximate,
  getAnalyticsAggregationCategory,
  // Analytics Comparison
  ANALYTICS_COMPARISON,
  AnalyticsComparisonType,
  AnalyticsComparisonMethod,
  AnalyticsComparisonDirection,
  AnalyticsComparisonSignificance,
  AnalyticsComparisonUnit,
  getAnalyticsComparisonLabel,
  getAnalyticsComparisonMethodLabel,
  getAnalyticsComparisonDirectionLabel,
  getAnalyticsComparisonSignificanceLabel,
  getAnalyticsComparisonUnitLabel,
  isAnalyticsComparisonPeriodBased,
  isAnalyticsComparisonBenchmarkBased,
  // Analytics Trend
  ANALYTICS_TREND,
  AnalyticsTrendType,
  AnalyticsTrendStrength,
  AnalyticsTrendDirection,
  AnalyticsTrendPattern,
  AnalyticsTrendMethod,
  AnalyticsTrendConfidence,
  AnalyticsTrendHorizon,
  getAnalyticsTrendStrengthLabel,
  getAnalyticsTrendDirectionLabel,
  getAnalyticsTrendPatternLabel,
  getAnalyticsTrendMethodLabel,
  getAnalyticsTrendConfidenceLabel,
  getAnalyticsTrendHorizonLabel,
  isAnalyticsTrendUpward,
  isAnalyticsTrendDownward,
  isAnalyticsTrendStable,
  // Analytics Status
  ANALYTICS_STATUS,
  AnalyticsStatusCode,
  AnalyticsStatusCategory,
  AnalyticsStatusPriority,
  AnalyticsStatusVisibility,
  AnalyticsStatusAction,
  getAnalyticsStatusCodeLabel,
  getAnalyticsStatusCategoryLabel,
  getAnalyticsStatusPriorityLabel,
  getAnalyticsStatusVisibilityLabel,
  getAnalyticsStatusActionLabel,
  isAnalyticsStatusSuccess,
  isAnalyticsStatusProcessing,
  isAnalyticsStatusFailure,
  getAnalyticsStatusCategory,
  // Analytics Error
  ANALYTICS_ERROR,
  AnalyticsErrorType,
  AnalyticsErrorCode,
  AnalyticsErrorSeverity,
  AnalyticsErrorCategory,
  AnalyticsErrorAction,
  AnalyticsErrorSource,
  getAnalyticsErrorLabel,
  getAnalyticsErrorCodeLabel,
  getAnalyticsErrorSeverityLabel,
  getAnalyticsErrorCategoryLabel,
  getAnalyticsErrorActionLabel,
  getAnalyticsErrorSourceLabel,
  getAnalyticsErrorCategory,
  getAnalyticsErrorSeverity,
  // Analytics Permission
  ANALYTICS_PERMISSION,
  AnalyticsPermission,
  AnalyticsPermissionResource,
  AnalyticsPermissionLevel,
  AnalyticsPermissionScope,
  AnalyticsPermissionAction,
  AnalyticsPermissionEffect,
  AnalyticsPermissionCondition,
  getAnalyticsPermissionResourceLabel,
  getAnalyticsPermissionLevelLabel,
  getAnalyticsPermissionScopeLabel,
  getAnalyticsPermissionActionLabel,
  getAnalyticsPermissionEffectLabel,
  getAnalyticsPermissionConditionLabel,
  isAnalyticsPermissionAdmin,
  isAnalyticsPermissionManagement,
  isAnalyticsPermissionView,
  getAnalyticsPermissionLevel,
} from '@vubon/shared-constants';

// ============================================================
// Notification Analytics Extended Types
// ============================================================

/**
 * Notification Analytics
 */
export interface NotificationAnalytics extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  userId: ID;
  metric: string;
  value: number;
  aggregation: AnalyticsAggregationType;
  comparison?: AnalyticsComparisonType;
  trend?: AnalyticsTrendType;
  status: AnalyticsStatusCode;
  period: {
    start: Date;
    end: Date;
  };
  metadata?: Metadata;
}

/**
 * Notification Analytics Filter
 */
export interface NotificationAnalyticsFilter {
  ids?: ID[];
  notificationIds?: ID[];
  userIds?: ID[];
  metrics?: string[];
  aggregations?: AnalyticsAggregationType[];
  comparisons?: AnalyticsComparisonType[];
  trends?: AnalyticsTrendType[];
  statuses?: AnalyticsStatusCode[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Notification Analytics Statistics
 */
export interface NotificationAnalyticsStatistics {
  notificationId: ID;
  totalAnalytics: number;
  byMetric: Record<string, number>;
  byAggregation: Record<AnalyticsAggregationType, number>;
  byStatus: Record<AnalyticsStatusCode, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentMetric: string;
  mostFrequentAggregation: AnalyticsAggregationType;
}

/**
 * Notification Analytics Summary
 */
export interface NotificationAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  byMetric: Record<string, number>;
  byAggregation: Record<AnalyticsAggregationType, number>;
  byStatus: Record<AnalyticsStatusCode, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    value: number;
  }[];
  topMetrics: {
    metric: string;
    count: number;
    value: number;
  }[];
}

/**
 * Notification Analytics Configuration
 */
export interface NotificationAnalyticsConfiguration {
  enabled: boolean;
  defaultAggregation: AnalyticsAggregationType;
  defaultComparison: AnalyticsComparisonType;
  defaultTrend: AnalyticsTrendType;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnComplete: boolean;
  notificationOnError: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: NotificationAnalyticsAlertConfig;
}

/**
 * Notification Analytics Alert Configuration
 */
export interface NotificationAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  trendChangeAlert: boolean;
  trendChangeThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Analytics History
 */
export interface NotificationAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  notificationId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Analytics Data Point
 */
export interface NotificationAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  analyticsId: ID;
  metric: string;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Notification Analytics Comparison Result
 */
export interface NotificationAnalyticsComparisonResult {
  type: AnalyticsComparisonType;
  method: AnalyticsComparisonMethod;
  direction: AnalyticsComparisonDirection;
  significance: AnalyticsComparisonSignificance;
  unit: AnalyticsComparisonUnit;
  currentValue: number;
  previousValue: number;
  absoluteChange: number;
  percentageChange: number;
  isSignificant: boolean;
}

/**
 * Notification Analytics Trend Result
 */
export interface NotificationAnalyticsTrendResult {
  type: AnalyticsTrendType;
  strength: AnalyticsTrendStrength;
  direction: AnalyticsTrendDirection;
  pattern: AnalyticsTrendPattern;
  method: AnalyticsTrendMethod;
  confidence: AnalyticsTrendConfidence;
  horizon: AnalyticsTrendHorizon;
  slope: number;
  intercept: number;
  rSquared: number;
  forecast: NotificationAnalyticsDataPoint[];
}

/**
 * Notification Analytics Export
 */
export interface NotificationAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  notificationId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: NotificationAnalyticsFilter;
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
  // Aggregation
  ANALYTICS_AGGREGATION,
  AnalyticsAggregationType,
  AnalyticsAggregationCategory,
  AnalyticsAggregationLevel,
  AnalyticsAggregationScope,
  AnalyticsAggregationPrecision,
  getAnalyticsAggregationLabel,
  getAnalyticsAggregationCategoryLabel,
  getAnalyticsAggregationLevelLabel,
  getAnalyticsAggregationScopeLabel,
  getAnalyticsAggregationPrecisionLabel,
  isAnalyticsAggregationStatistical,
  isAnalyticsAggregationMathematical,
  isAnalyticsAggregationTimeSeries,
  isAnalyticsAggregationApproximate,
  getAnalyticsAggregationCategory,
  // Comparison
  ANALYTICS_COMPARISON,
  AnalyticsComparisonType,
  AnalyticsComparisonMethod,
  AnalyticsComparisonDirection,
  AnalyticsComparisonSignificance,
  AnalyticsComparisonUnit,
  getAnalyticsComparisonLabel,
  getAnalyticsComparisonMethodLabel,
  getAnalyticsComparisonDirectionLabel,
  getAnalyticsComparisonSignificanceLabel,
  getAnalyticsComparisonUnitLabel,
  isAnalyticsComparisonPeriodBased,
  isAnalyticsComparisonBenchmarkBased,
  // Trend
  ANALYTICS_TREND,
  AnalyticsTrendType,
  AnalyticsTrendStrength,
  AnalyticsTrendDirection,
  AnalyticsTrendPattern,
  AnalyticsTrendMethod,
  AnalyticsTrendConfidence,
  AnalyticsTrendHorizon,
  getAnalyticsTrendStrengthLabel,
  getAnalyticsTrendDirectionLabel,
  getAnalyticsTrendPatternLabel,
  getAnalyticsTrendMethodLabel,
  getAnalyticsTrendConfidenceLabel,
  getAnalyticsTrendHorizonLabel,
  isAnalyticsTrendUpward,
  isAnalyticsTrendDownward,
  isAnalyticsTrendStable,
  // Status
  ANALYTICS_STATUS,
  AnalyticsStatusCode,
  AnalyticsStatusCategory,
  AnalyticsStatusPriority,
  AnalyticsStatusVisibility,
  AnalyticsStatusAction,
  getAnalyticsStatusCodeLabel,
  getAnalyticsStatusCategoryLabel,
  getAnalyticsStatusPriorityLabel,
  getAnalyticsStatusVisibilityLabel,
  getAnalyticsStatusActionLabel,
  isAnalyticsStatusSuccess,
  isAnalyticsStatusProcessing,
  isAnalyticsStatusFailure,
  getAnalyticsStatusCategory,
  // Error
  ANALYTICS_ERROR,
  AnalyticsErrorType,
  AnalyticsErrorCode,
  AnalyticsErrorSeverity,
  AnalyticsErrorCategory,
  AnalyticsErrorAction,
  AnalyticsErrorSource,
  getAnalyticsErrorLabel,
  getAnalyticsErrorCodeLabel,
  getAnalyticsErrorSeverityLabel,
  getAnalyticsErrorCategoryLabel,
  getAnalyticsErrorActionLabel,
  getAnalyticsErrorSourceLabel,
  getAnalyticsErrorCategory,
  getAnalyticsErrorSeverity,
  // Permission
  ANALYTICS_PERMISSION,
  AnalyticsPermission,
  AnalyticsPermissionResource,
  AnalyticsPermissionLevel,
  AnalyticsPermissionScope,
  AnalyticsPermissionAction,
  AnalyticsPermissionEffect,
  AnalyticsPermissionCondition,
  getAnalyticsPermissionResourceLabel,
  getAnalyticsPermissionLevelLabel,
  getAnalyticsPermissionScopeLabel,
  getAnalyticsPermissionActionLabel,
  getAnalyticsPermissionEffectLabel,
  getAnalyticsPermissionConditionLabel,
  isAnalyticsPermissionAdmin,
  isAnalyticsPermissionManagement,
  isAnalyticsPermissionView,
  getAnalyticsPermissionLevel,
};
