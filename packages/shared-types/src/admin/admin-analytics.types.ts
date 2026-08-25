/**
 * Admin Analytics Types
 * Type definitions for admin analytics based on shared-constants
 * @module AdminAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin analytics
// ============================================================
import {
  // Core Analytics Constants
  ADMIN_ANALYTICS,
  ADMIN_ANALYTICS_METRIC_LABELS,
  ADMIN_ANALYTICS_DIMENSION_LABELS,
  ADMIN_ANALYTICS_AGGREGATION_LABELS,
  ADMIN_ANALYTICS_PERIOD_LABELS,
  ADMIN_ANALYTICS_STATUS_LABELS,
  ADMIN_ANALYTICS_STATUS_COLORS,
  ADMIN_ANALYTICS_TYPE_LABELS,
  ADMIN_ANALYTICS_SOURCE_LABELS,
  ADMIN_ANALYTICS_CATEGORY_LABELS,
  // Core Analytics Types
  AdminAnalyticsMetric,
  AdminAnalyticsDimension,
  AdminAnalyticsAggregation,
  AdminAnalyticsPeriod,
  AdminAnalyticsStatus,
  AdminAnalyticsType,
  AdminAnalyticsSource,
  AdminAnalyticsCategory,
  // Core Analytics Functions
  getAdminAnalyticsMetricLabel,
  getAdminAnalyticsDimensionLabel,
  getAdminAnalyticsAggregationLabel,
  getAdminAnalyticsPeriodLabel,
  getAdminAnalyticsStatusLabel,
  getAdminAnalyticsStatusColor,
  getAdminAnalyticsSourceLabel,
  getAdminAnalyticsCategoryLabel,
  isAnalyticsCompleted,
  isAnalyticsProcessing,
  isAnalyticsFailed,
  isAnalyticsPending,
  getAdminAnalyticsTimeout,
  getAdminAnalyticsRetention,
} from '@vubon/shared-constants';

// ============================================================
// Admin Analytics Extended Types
// ============================================================

/**
 * Admin analytics with additional metadata
 */
export interface AdminAnalyticsExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  type: AdminAnalyticsType;
  metric: AdminAnalyticsMetric;
  dimension: AdminAnalyticsDimension;
  aggregation: AdminAnalyticsAggregation;
  period: AdminAnalyticsPeriod;
  status: AdminAnalyticsStatus;
  source: AdminAnalyticsSource;
  category: AdminAnalyticsCategory;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isCompleted: boolean;
  isProcessing: boolean;
  isFailed: boolean;
  isPending: boolean;
  metadata?: Metadata;
}

/**
 * Admin analytics filter
 */
export interface AdminAnalyticsFilter {
  adminIds?: ID[];
  types?: AdminAnalyticsType[];
  metrics?: AdminAnalyticsMetric[];
  dimensions?: AdminAnalyticsDimension[];
  aggregations?: AdminAnalyticsAggregation[];
  periods?: AdminAnalyticsPeriod[];
  statuses?: AdminAnalyticsStatus[];
  sources?: AdminAnalyticsSource[];
  categories?: AdminAnalyticsCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCompleted?: boolean;
  isProcessing?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  valueRange?: {
    min: number;
    max: number;
  };
  searchTerm?: string;
}

/**
 * Admin analytics statistics
 */
export interface AdminAnalyticsStatistics {
  adminId: ID;
  totalAnalytics: number;
  completedAnalytics: number;
  processingAnalytics: number;
  failedAnalytics: number;
  pendingAnalytics: number;
  byType: Record<AdminAnalyticsType, number>;
  byMetric: Record<AdminAnalyticsMetric, number>;
  byDimension: Record<AdminAnalyticsDimension, number>;
  byAggregation: Record<AdminAnalyticsAggregation, number>;
  byPeriod: Record<AdminAnalyticsPeriod, number>;
  byStatus: Record<AdminAnalyticsStatus, number>;
  bySource: Record<AdminAnalyticsSource, number>;
  byCategory: Record<AdminAnalyticsCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentMetric: AdminAnalyticsMetric;
  mostFrequentDimension: AdminAnalyticsDimension;
  mostFrequentCategory: AdminAnalyticsCategory;
}

/**
 * Admin analytics summary
 */
export interface AdminAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  completed: number;
  processing: number;
  failed: number;
  pending: number;
  byType: Record<AdminAnalyticsType, number>;
  byMetric: Record<AdminAnalyticsMetric, number>;
  byDimension: Record<AdminAnalyticsDimension, number>;
  byAggregation: Record<AdminAnalyticsAggregation, number>;
  byPeriod: Record<AdminAnalyticsPeriod, number>;
  byStatus: Record<AdminAnalyticsStatus, number>;
  bySource: Record<AdminAnalyticsSource, number>;
  byCategory: Record<AdminAnalyticsCategory, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    value: number;
    change: number;
  }[];
  topMetrics: {
    metric: AdminAnalyticsMetric;
    count: number;
    label: string;
    value: number;
  }[];
  topCategories: {
    category: AdminAnalyticsCategory;
    count: number;
    label: string;
    value: number;
  }[];
}

/**
 * Admin analytics configuration
 */
export interface AdminAnalyticsConfiguration {
  enabled: boolean;
  defaultMetric: AdminAnalyticsMetric;
  defaultDimension: AdminAnalyticsDimension;
  defaultAggregation: AdminAnalyticsAggregation;
  defaultPeriod: AdminAnalyticsPeriod;
  defaultSource: AdminAnalyticsSource;
  defaultCategory: AdminAnalyticsCategory;
  retentionDays: number;
  timeoutSeconds: number;
  maxBatchSize: number;
  autoRefreshEnabled: boolean;
  autoRefreshInterval: number; // minutes
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: AdminAnalyticsAlertConfig;
}

/**
 * Admin analytics alert configuration
 */
export interface AdminAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  processingTimeoutAlert: boolean;
  failureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  failureThreshold: number;
}

/**
 * Admin analytics history
 */
export interface AdminAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  adminId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Admin analytics data point
 */
export interface AdminAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  dimension: AdminAnalyticsDimension;
  dimensionValue: string;
  metric: AdminAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Admin analytics trend
 */
export interface AdminAnalyticsTrend {
  metric: AdminAnalyticsMetric;
  dimension: AdminAnalyticsDimension;
  period: AdminAnalyticsPeriod;
  dataPoints: AdminAnalyticsDataPoint[];
  trend: 'up' | 'down' | 'stable' | 'volatile';
  percentageChange: number;
  averageValue: number;
  maxValue: number;
  minValue: number;
  metadata?: Metadata;
}

/**
 * Admin analytics report
 */
export interface AdminAnalyticsReport extends BaseEntity, Timestamp {
  id: ID;
  generatedBy: ID;
  period: {
    start: Date;
    end: Date;
  };
  summary: AdminAnalyticsSummary;
  statistics: AdminAnalyticsStatistics;
  trends: AdminAnalyticsTrend[];
  topMetrics: AdminAnalyticsDataPoint[];
  recommendations?: string[];
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  metadata?: Metadata;
}

/**
 * Admin analytics export
 */
export interface AdminAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AdminAnalyticsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Admin analytics dashboard
 */
export interface AdminAnalyticsDashboard extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  name: string;
  description?: string;
  widgets: AdminAnalyticsWidget[];
  layout: 'grid' | 'list' | 'custom';
  isDefault: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Admin analytics widget
 */
export interface AdminAnalyticsWidget extends BaseEntity, Timestamp {
  id: ID;
  dashboardId: ID;
  type: 'chart' | 'metric' | 'table' | 'trend' | 'summary';
  metric: AdminAnalyticsMetric;
  dimension: AdminAnalyticsDimension;
  aggregation: AdminAnalyticsAggregation;
  period: AdminAnalyticsPeriod;
  title: string;
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
  // Core Constants
  ADMIN_ANALYTICS,
  ADMIN_ANALYTICS_METRIC_LABELS,
  ADMIN_ANALYTICS_DIMENSION_LABELS,
  ADMIN_ANALYTICS_AGGREGATION_LABELS,
  ADMIN_ANALYTICS_PERIOD_LABELS,
  ADMIN_ANALYTICS_STATUS_LABELS,
  ADMIN_ANALYTICS_STATUS_COLORS,
  ADMIN_ANALYTICS_TYPE_LABELS,
  ADMIN_ANALYTICS_SOURCE_LABELS,
  ADMIN_ANALYTICS_CATEGORY_LABELS,
  // Core Types
  AdminAnalyticsMetric,
  AdminAnalyticsDimension,
  AdminAnalyticsAggregation,
  AdminAnalyticsPeriod,
  AdminAnalyticsStatus,
  AdminAnalyticsType,
  AdminAnalyticsSource,
  AdminAnalyticsCategory,
  // Core Functions
  getAdminAnalyticsMetricLabel,
  getAdminAnalyticsDimensionLabel,
  getAdminAnalyticsAggregationLabel,
  getAdminAnalyticsPeriodLabel,
  getAdminAnalyticsStatusLabel,
  getAdminAnalyticsStatusColor,
  getAdminAnalyticsSourceLabel,
  getAdminAnalyticsCategoryLabel,
  isAnalyticsCompleted,
  isAnalyticsProcessing,
  isAnalyticsFailed,
  isAnalyticsPending,
  getAdminAnalyticsTimeout,
  getAdminAnalyticsRetention,
};
