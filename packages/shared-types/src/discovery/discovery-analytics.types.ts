/**
 * Discovery Analytics Types
 * Type definitions for discovery analytics based on shared-constants
 * @module DiscoveryAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants analytics
// ============================================================
import {
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
  getAnalyticsComparisonDirection,
  getAnalyticsComparisonSignificance,
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
  isAnalyticsStatusFinalState,
  getAnalyticsStatusCategory,
  // Event
  ANALYTICS_EVENT,
  AnalyticsEventCategory,
  AnalyticsEventAction,
  AnalyticsEventLabel,
  AnalyticsEventValue,
  AnalyticsEventPriority,
  AnalyticsEventStatus,
  getAnalyticsEventCategoryLabel,
  getAnalyticsEventActionLabel,
  getAnalyticsEventLabelName,
  getAnalyticsEventPriorityLabel,
  getAnalyticsEventStatusLabel,
  isAnalyticsEventCompleted,
  isAnalyticsEventProcessing,
  isAnalyticsEventFailed,
  // Permission
  ANALYTICS_PERMISSION,
  AnalyticsPermissionDetailType,
  AnalyticsPermissionResource,
  AnalyticsPermissionLevel,
  AnalyticsPermissionScope,
  AnalyticsPermissionAction,
  AnalyticsPermissionEffect,
  AnalyticsPermissionCondition,
  getAnalyticsPermissionDetailLabel,
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
  // Trend
  ANALYTICS_TREND,
  AnalyticsTrendType,
  AnalyticsTrendStrength,
  AnalyticsTrendDirection,
  AnalyticsTrendPattern,
  AnalyticsTrendMethod,
  AnalyticsTrendConfidence,
  AnalyticsTrendHorizon,
  getAnalyticsTrendDetailLabel,
  getAnalyticsTrendStrengthLabel,
  getAnalyticsTrendDirectionLabel,
  getAnalyticsTrendPatternLabel,
  getAnalyticsTrendMethodLabel,
  getAnalyticsTrendConfidenceLabel,
  getAnalyticsTrendHorizonLabel,
  isAnalyticsTrendUpward,
  isAnalyticsTrendDownward,
  isAnalyticsTrendStable,
  getAnalyticsTrendDirectionFromSlope,
  getAnalyticsTrendStrengthFromRSquared,
} from '@vubon/shared-constants';

// ============================================================
// Discovery Analytics Types
// ============================================================

/**
 * Discovery analytics base
 */
export interface DiscoveryAnalytics extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: string;
  category: string;
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
 * Discovery analytics filter
 */
export interface DiscoveryAnalyticsFilter {
  userIds?: ID[];
  types?: string[];
  categories?: string[];
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
 * Discovery analytics statistics
 */
export interface DiscoveryAnalyticsStatistics {
  totalAnalytics: number;
  byType: Record<string, number>;
  byCategory: Record<string, number>;
  byMetric: Record<string, number>;
  byStatus: Record<AnalyticsStatusCode, number>;
  byAggregation: Record<AnalyticsAggregationType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentType: string;
  mostFrequentCategory: string;
}

/**
 * Discovery analytics summary
 */
export interface DiscoveryAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  byType: Record<string, number>;
  byCategory: Record<string, number>;
  byMetric: Record<string, number>;
  byStatus: Record<AnalyticsStatusCode, number>;
  byAggregation: Record<AnalyticsAggregationType, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    value: number;
  }[];
  topTypes: {
    type: string;
    count: number;
  }[];
  topCategories: {
    category: string;
    count: number;
  }[];
  topMetrics: {
    metric: string;
    count: number;
    value: number;
  }[];
}

/**
 * Discovery analytics configuration
 */
export interface DiscoveryAnalyticsConfiguration {
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
  alertConfig?: DiscoveryAnalyticsAlertConfig;
}

/**
 * Discovery analytics alert configuration
 */
export interface DiscoveryAnalyticsAlertConfig {
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
 * Discovery analytics history
 */
export interface DiscoveryAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Discovery analytics data point
 */
export interface DiscoveryAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  analyticsId: ID;
  type: string;
  metric: string;
  value: number;
  timestamp: Date;
  dimension?: string;
  metadata?: Metadata;
}

/**
 * Discovery analytics comparison result
 */
export interface DiscoveryAnalyticsComparisonResult {
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
 * Discovery analytics trend result
 */
export interface DiscoveryAnalyticsTrendResult {
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
  forecast: DiscoveryAnalyticsDataPoint[];
}

/**
 * Discovery analytics export
 */
export interface DiscoveryAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DiscoveryAnalyticsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Discovery analytics dashboard
 */
export interface DiscoveryAnalyticsDashboard extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  widgets: DiscoveryAnalyticsWidget[];
  layout: 'grid' | 'list' | 'custom';
  isDefault: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Discovery analytics widget
 */
export interface DiscoveryAnalyticsWidget extends BaseEntity, Timestamp {
  id: ID;
  dashboardId: ID;
  type: 'chart' | 'metric' | 'table' | 'trend' | 'comparison';
  title: string;
  metric: string;
  aggregation: AnalyticsAggregationType;
  comparison?: AnalyticsComparisonType;
  trend?: AnalyticsTrendType;
  position: number;
  size: 'small' | 'medium' | 'large' | 'full';
  config?: Record<string, unknown>;
  isActive: boolean;
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
  getAnalyticsComparisonDirection,
  getAnalyticsComparisonSignificance,
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
  isAnalyticsStatusFinalState,
  getAnalyticsStatusCategory,
  // Event
  ANALYTICS_EVENT,
  AnalyticsEventCategory,
  AnalyticsEventAction,
  AnalyticsEventLabel,
  AnalyticsEventValue,
  AnalyticsEventPriority,
  AnalyticsEventStatus,
  getAnalyticsEventCategoryLabel,
  getAnalyticsEventActionLabel,
  getAnalyticsEventLabelName,
  getAnalyticsEventPriorityLabel,
  getAnalyticsEventStatusLabel,
  isAnalyticsEventCompleted,
  isAnalyticsEventProcessing,
  isAnalyticsEventFailed,
  // Permission
  ANALYTICS_PERMISSION,
  AnalyticsPermissionDetailType,
  AnalyticsPermissionResource,
  AnalyticsPermissionLevel,
  AnalyticsPermissionScope,
  AnalyticsPermissionAction,
  AnalyticsPermissionEffect,
  AnalyticsPermissionCondition,
  getAnalyticsPermissionDetailLabel,
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
  // Trend
  ANALYTICS_TREND,
  AnalyticsTrendType,
  AnalyticsTrendStrength,
  AnalyticsTrendDirection,
  AnalyticsTrendPattern,
  AnalyticsTrendMethod,
  AnalyticsTrendConfidence,
  AnalyticsTrendHorizon,
  getAnalyticsTrendDetailLabel,
  getAnalyticsTrendStrengthLabel,
  getAnalyticsTrendDirectionLabel,
  getAnalyticsTrendPatternLabel,
  getAnalyticsTrendMethodLabel,
  getAnalyticsTrendConfidenceLabel,
  getAnalyticsTrendHorizonLabel,
  isAnalyticsTrendUpward,
  isAnalyticsTrendDownward,
  isAnalyticsTrendStable,
  getAnalyticsTrendDirectionFromSlope,
  getAnalyticsTrendStrengthFromRSquared,
};
