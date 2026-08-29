/**
 * Logistics Analytics Types
 * Type definitions for logistics analytics based on shared-constants
 * @module LogisticsAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics analytics
// ============================================================
import {
  // Logistics Analytics Constants
  LOGISTICS_ANALYTICS,
  LogisticsAnalyticsType,
  LogisticsAnalyticsStatus,
  LogisticsAnalyticsMetric,
  LogisticsAnalyticsPeriod,
  LogisticsAnalyticsAggregation,
  LogisticsAnalyticsDashboardType,
  LogisticsAnalyticsChartType,
  logisticsAnalyticsGetTypeLabel,
  logisticsAnalyticsGetStatusLabel,
  logisticsAnalyticsGetMetricLabel,
  logisticsAnalyticsGetPeriodLabel,
  logisticsAnalyticsGetDashboardTypeLabel,
  logisticsAnalyticsIsCompleted,
  logisticsAnalyticsIsProcessing,
  // Logistics Analytics Type Constants
  LOGISTICS_ANALYTICS_TYPE,
  LogisticsAnalyticsTypeCategory,
  LogisticsAnalyticsTypeScope,
  LogisticsAnalyticsTypeDimension,
  LogisticsAnalyticsTypeFilter,
  LogisticsAnalyticsTypeFormat,
  LogisticsAnalyticsTypeDataSource,
  LogisticsAnalyticsTypeExportFormat,
  logisticsAnalyticsTypeGetCategoryLabel,
  logisticsAnalyticsTypeGetScopeLabel,
  logisticsAnalyticsTypeGetDimensionLabel,
  logisticsAnalyticsTypeGetFormatLabel,
  logisticsAnalyticsTypeGetDataSourceLabel,
  logisticsAnalyticsTypeGetExportFormatLabel,
} from '@vubon/shared-constants';

// ============================================================
// Logistics Analytics Extended Types
// ============================================================

/**
 * Logistics analytics
 */
export interface LogisticsAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: LogisticsAnalyticsType;
  status: LogisticsAnalyticsStatus;
  metric: LogisticsAnalyticsMetric;
  period: LogisticsAnalyticsPeriod;
  aggregation: LogisticsAnalyticsAggregation;
  dashboardType: LogisticsAnalyticsDashboardType;
  chartType: LogisticsAnalyticsChartType;
  category: LogisticsAnalyticsTypeCategory;
  scope: LogisticsAnalyticsTypeScope;
  dimension: LogisticsAnalyticsTypeDimension;
  filter: LogisticsAnalyticsTypeFilter;
  format: LogisticsAnalyticsTypeFormat;
  dataSource: LogisticsAnalyticsTypeDataSource;
  exportFormat: LogisticsAnalyticsTypeExportFormat;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isCompleted: boolean;
  isProcessing: boolean;
  metadata?: Metadata;
}

/**
 * Logistics analytics filter
 */
export interface LogisticsAnalyticsFilter {
  ids?: ID[];
  types?: LogisticsAnalyticsType[];
  statuses?: LogisticsAnalyticsStatus[];
  metrics?: LogisticsAnalyticsMetric[];
  periods?: LogisticsAnalyticsPeriod[];
  aggregations?: LogisticsAnalyticsAggregation[];
  dashboardTypes?: LogisticsAnalyticsDashboardType[];
  chartTypes?: LogisticsAnalyticsChartType[];
  categories?: LogisticsAnalyticsTypeCategory[];
  scopes?: LogisticsAnalyticsTypeScope[];
  dimensions?: LogisticsAnalyticsTypeDimension[];
  dataSources?: LogisticsAnalyticsTypeDataSource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCompleted?: boolean;
  isProcessing?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Logistics analytics statistics
 */
export interface LogisticsAnalyticsStatistics {
  totalAnalytics: number;
  completedAnalytics: number;
  processingAnalytics: number;
  byType: Record<LogisticsAnalyticsType, number>;
  byStatus: Record<LogisticsAnalyticsStatus, number>;
  byMetric: Record<LogisticsAnalyticsMetric, number>;
  byPeriod: Record<LogisticsAnalyticsPeriod, number>;
  byDashboardType: Record<LogisticsAnalyticsDashboardType, number>;
  byCategory: Record<LogisticsAnalyticsTypeCategory, number>;
  byScope: Record<LogisticsAnalyticsTypeScope, number>;
  byDimension: Record<LogisticsAnalyticsTypeDimension, number>;
  byDataSource: Record<LogisticsAnalyticsTypeDataSource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentType: LogisticsAnalyticsType;
  mostFrequentMetric: LogisticsAnalyticsMetric;
  mostFrequentPeriod: LogisticsAnalyticsPeriod;
}

/**
 * Logistics analytics summary
 */
export interface LogisticsAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  completed: number;
  processing: number;
  byType: Record<LogisticsAnalyticsType, number>;
  byStatus: Record<LogisticsAnalyticsStatus, number>;
  byMetric: Record<LogisticsAnalyticsMetric, number>;
  byPeriod: Record<LogisticsAnalyticsPeriod, number>;
  byDashboardType: Record<LogisticsAnalyticsDashboardType, number>;
  byCategory: Record<LogisticsAnalyticsTypeCategory, number>;
  byScope: Record<LogisticsAnalyticsTypeScope, number>;
  byDimension: Record<LogisticsAnalyticsTypeDimension, number>;
  byDataSource: Record<LogisticsAnalyticsTypeDataSource, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    completed: number;
    processing: number;
  }[];
  topTypes: {
    type: LogisticsAnalyticsType;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: LogisticsAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topPeriods: {
    period: LogisticsAnalyticsPeriod;
    count: number;
    label: string;
  }[];
}

/**
 * Logistics analytics configuration
 */
export interface LogisticsAnalyticsConfiguration {
  enabled: boolean;
  defaultType: LogisticsAnalyticsType;
  defaultMetric: LogisticsAnalyticsMetric;
  defaultPeriod: LogisticsAnalyticsPeriod;
  defaultAggregation: LogisticsAnalyticsAggregation;
  defaultDashboardType: LogisticsAnalyticsDashboardType;
  defaultChartType: LogisticsAnalyticsChartType;
  defaultCategory: LogisticsAnalyticsTypeCategory;
  defaultScope: LogisticsAnalyticsTypeScope;
  defaultDimension: LogisticsAnalyticsTypeDimension;
  defaultDataSource: LogisticsAnalyticsTypeDataSource;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnComplete: boolean;
  notificationOnError: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: LogisticsAnalyticsAlertConfig;
}

/**
 * Logistics analytics alert configuration
 */
export interface LogisticsAnalyticsAlertConfig {
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
 * Logistics analytics history
 */
export interface LogisticsAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Logistics analytics data point
 */
export interface LogisticsAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  metric: LogisticsAnalyticsMetric;
  dimension: LogisticsAnalyticsTypeDimension;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Logistics analytics export
 */
export interface LogisticsAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: LogisticsAnalyticsTypeExportFormat;
  filter: LogisticsAnalyticsFilter;
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
  // Logistics Analytics Constants
  LOGISTICS_ANALYTICS,
  LogisticsAnalyticsType,
  LogisticsAnalyticsStatus,
  LogisticsAnalyticsMetric,
  LogisticsAnalyticsPeriod,
  LogisticsAnalyticsAggregation,
  LogisticsAnalyticsDashboardType,
  LogisticsAnalyticsChartType,
  logisticsAnalyticsGetTypeLabel,
  logisticsAnalyticsGetStatusLabel,
  logisticsAnalyticsGetMetricLabel,
  logisticsAnalyticsGetPeriodLabel,
  logisticsAnalyticsGetDashboardTypeLabel,
  logisticsAnalyticsIsCompleted,
  logisticsAnalyticsIsProcessing,
  // Logistics Analytics Type Constants
  LOGISTICS_ANALYTICS_TYPE,
  LogisticsAnalyticsTypeCategory,
  LogisticsAnalyticsTypeScope,
  LogisticsAnalyticsTypeDimension,
  LogisticsAnalyticsTypeFilter,
  LogisticsAnalyticsTypeFormat,
  LogisticsAnalyticsTypeDataSource,
  LogisticsAnalyticsTypeExportFormat,
  logisticsAnalyticsTypeGetCategoryLabel,
  logisticsAnalyticsTypeGetScopeLabel,
  logisticsAnalyticsTypeGetDimensionLabel,
  logisticsAnalyticsTypeGetFormatLabel,
  logisticsAnalyticsTypeGetDataSourceLabel,
  logisticsAnalyticsTypeGetExportFormatLabel,
};
