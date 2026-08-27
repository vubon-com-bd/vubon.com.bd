/**
 * AI Analytics Types
 * Type definitions for AI analytics based on shared-constants
 * @module AIAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai analytics (সঠিক নাম ব্যবহার করে)
// ============================================================
import {
  // AI Analytics Core
  AI_ANALYTICS,
  AIAnalyticsType,
  AIAnalyticsStatus,
  AIAnalyticsCategory,
  AIAnalyticsDimension,
  AIAnalyticsMetric,
  AIAnalyticsAggregation,
  AIAnalyticsPeriod,
  AIAnalyticsFilter,
  AIAnalyticsLimit,
  AIAnalyticsFormat,
  AIAnalyticsGranularity,
  getAIAnalyticsTypeLabel,
  getAIAnalyticsStatusLabel,
  getAIAnalyticsCategoryLabel,
  getAIAnalyticsMetricLabel,
  getAIAnalyticsAggregationLabel,
  getAIAnalyticsPeriodLabel,
  getAIAnalyticsFormatLabel,
  getAIAnalyticsGranularityLabel,
  isAIAnalyticsActive,
  isAIAnalyticsComplete,
  isAIAnalyticsFailed,
  getAIDefaultAnalyticsLimit,
  getAIMaxAnalyticsLimit,
  // AI Analytics Type
  AI_ANALYTICS_TYPE,
  AIAnalyticsAnalysisType,
  AIAnalyticsDataType,
  AIAnalyticsMethod,
  AIAnalyticsDataSource,
  AIAnalyticsScope,
  AIAnalyticsLevel,
  getAIAnalyticsAnalysisTypeLabel,
  getAIAnalyticsDataTypeLabel,
  getAIAnalyticsMethodLabel,
  getAIAnalyticsDataSourceLabel,
  getAIAnalyticsScopeLabel,
  getAIAnalyticsLevelLabel,
  // AI Analytics Metric
  AI_ANALYTICS_METRIC,
  AIAnalyticsMetricCategory,
  AIAnalyticsMetricType,
  AIAnalyticsMetricPriority,
  AIAnalyticsMetricFormula,
  AIAnalyticsMetricThreshold,
  AIAnalyticsMetricColor,
  getAIMetricCategoryLabel,
  getAIMetricTypeLabel,
  getAIMetricPriorityLabel,
  getAIMetricFormula,
  getAIMetricColor,
  getAIMetricStatus,
  getAIMetricColorByStatus,
  // AI Analytics Status
  AI_ANALYTICS_STATUS,
  AI_ANALYTICS_STATUS_TYPES,
  AIAnalyticsStatusType,
  AIAnalyticsStatusCategory,
  AIAnalyticsStatusSeverity,
  AIAnalyticsStatusColor,
  getAIAnalyticsStatusLabel2,
  getAIAnalyticsStatusCategory,
  getAIAnalyticsStatusSeverity,
  getAIAnalyticsStatusColor,
  isAIAnalyticsActive2,
  isAIAnalyticsDelivered,
  isAIAnalyticsComplete2,
  isAIAnalyticsFailed2,
} from '@vubon/shared-constants';

// ============================================================
// AI Analytics Extended Types
// ============================================================

/**
 * AI Analytics
 */
export interface AIAnalytics extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  userId: ID;
  type: AIAnalyticsType;
  status: AIAnalyticsStatus;
  category: AIAnalyticsCategory;
  dimension: AIAnalyticsDimension;
  metric: AIAnalyticsMetric;
  aggregation: AIAnalyticsAggregation;
  period: AIAnalyticsPeriod;
  format: AIAnalyticsFormat;
  granularity: AIAnalyticsGranularity;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isComplete: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Analytics Filter
 */
export interface AIAnalyticsFilterOptions {
  modelIds?: ID[];
  userIds?: ID[];
  types?: AIAnalyticsType[];
  statuses?: AIAnalyticsStatus[];
  categories?: AIAnalyticsCategory[];
  metrics?: AIAnalyticsMetric[];
  aggregations?: AIAnalyticsAggregation[];
  periods?: AIAnalyticsPeriod[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isComplete?: boolean;
  isFailed?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * AI Analytics Statistics
 */
export interface AIAnalyticsStatistics {
  modelId: ID;
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  byType: Record<AIAnalyticsType, number>;
  byStatus: Record<AIAnalyticsStatus, number>;
  byCategory: Record<AIAnalyticsCategory, number>;
  byMetric: Record<AIAnalyticsMetric, number>;
  byAggregation: Record<AIAnalyticsAggregation, number>;
  byPeriod: Record<AIAnalyticsPeriod, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentType: AIAnalyticsType;
  mostFrequentMetric: AIAnalyticsMetric;
}

/**
 * AI Analytics Summary
 */
export interface AIAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  byType: Record<AIAnalyticsType, number>;
  byStatus: Record<AIAnalyticsStatus, number>;
  byCategory: Record<AIAnalyticsCategory, number>;
  byMetric: Record<AIAnalyticsMetric, number>;
  byAggregation: Record<AIAnalyticsAggregation, number>;
  byPeriod: Record<AIAnalyticsPeriod, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: AIAnalyticsType;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: AIAnalyticsMetric;
    count: number;
    label: string;
  }[];
}

/**
 * AI Analytics Configuration
 */
export interface AIAnalyticsConfiguration {
  enabled: boolean;
  defaultType: AIAnalyticsType;
  defaultCategory: AIAnalyticsCategory;
  defaultAggregation: AIAnalyticsAggregation;
  defaultPeriod: AIAnalyticsPeriod;
  defaultFormat: AIAnalyticsFormat;
  defaultGranularity: AIAnalyticsGranularity;
  defaultLimit: AIAnalyticsLimit;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: AIAnalyticsAlertConfig;
}

/**
 * AI Analytics Alert Configuration
 */
export interface AIAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  failedAnalyticsAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
}

/**
 * AI Analytics History
 */
export interface AIAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  modelId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Analytics Data Point
 */
export interface AIAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  analyticsId: ID;
  metric: AIAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * AI Analytics Export
 */
export interface AIAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AIAnalyticsFilterOptions;
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
  // AI Analytics Core
  AI_ANALYTICS,
  AIAnalyticsType,
  AIAnalyticsStatus,
  AIAnalyticsCategory,
  AIAnalyticsDimension,
  AIAnalyticsMetric,
  AIAnalyticsAggregation,
  AIAnalyticsPeriod,
  AIAnalyticsFilter,
  AIAnalyticsLimit,
  AIAnalyticsFormat,
  AIAnalyticsGranularity,
  getAIAnalyticsTypeLabel,
  getAIAnalyticsStatusLabel,
  getAIAnalyticsCategoryLabel,
  getAIAnalyticsMetricLabel,
  getAIAnalyticsAggregationLabel,
  getAIAnalyticsPeriodLabel,
  getAIAnalyticsFormatLabel,
  getAIAnalyticsGranularityLabel,
  isAIAnalyticsActive,
  isAIAnalyticsComplete,
  isAIAnalyticsFailed,
  getAIDefaultAnalyticsLimit,
  getAIMaxAnalyticsLimit,
  // AI Analytics Type
  AI_ANALYTICS_TYPE,
  AIAnalyticsAnalysisType,
  AIAnalyticsDataType,
  AIAnalyticsMethod,
  AIAnalyticsDataSource,
  AIAnalyticsScope,
  AIAnalyticsLevel,
  getAIAnalyticsAnalysisTypeLabel,
  getAIAnalyticsDataTypeLabel,
  getAIAnalyticsMethodLabel,
  getAIAnalyticsDataSourceLabel,
  getAIAnalyticsScopeLabel,
  getAIAnalyticsLevelLabel,
  // AI Analytics Metric
  AI_ANALYTICS_METRIC,
  AIAnalyticsMetricCategory,
  AIAnalyticsMetricType,
  AIAnalyticsMetricPriority,
  AIAnalyticsMetricFormula,
  AIAnalyticsMetricThreshold,
  AIAnalyticsMetricColor,
  getAIMetricCategoryLabel,
  getAIMetricTypeLabel,
  getAIMetricPriorityLabel,
  getAIMetricFormula,
  getAIMetricColor,
  getAIMetricStatus,
  getAIMetricColorByStatus,
  // AI Analytics Status
  AI_ANALYTICS_STATUS,
  AI_ANALYTICS_STATUS_TYPES,
  AIAnalyticsStatusType,
  AIAnalyticsStatusCategory,
  AIAnalyticsStatusSeverity,
  AIAnalyticsStatusColor,
  getAIAnalyticsStatusLabel2,
  getAIAnalyticsStatusCategory,
  getAIAnalyticsStatusSeverity,
  getAIAnalyticsStatusColor,
  isAIAnalyticsActive2,
  isAIAnalyticsDelivered,
  isAIAnalyticsComplete2,
  isAIAnalyticsFailed2,
};
