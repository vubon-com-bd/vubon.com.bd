/**
 * Sales Analytics Types
 * Type definitions for sales analytics based on shared-constants
 * @module SalesAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants sales analytics
// ============================================================
import {
  // Main Sales Analytics Constants
  SALES_ANALYTICS,
  SalesAnalyticsType,
  SalesAnalyticsStatus,
  SalesAnalyticsScope,
  SalesAnalyticsEvent,
  SalesAnalyticsDimension,
  SalesAnalyticsMetric,
  SalesAnalyticsSegment,
  SalesAnalyticsCohort,
  SalesAnalyticsGranularity,
  getSalesAnalyticsStatusLabel,
  getSalesAnalyticsEventLabel,
  getSalesAnalyticsDimensionLabel,
  getSalesAnalyticsSegmentLabel,
  getSalesAnalyticsCohortLabel,
  getSalesAnalyticsGranularityLabel,
  isSalesAnalyticsActive,
  isSalesAnalyticsCompleted,
  isSalesAnalyticsFailed,
  isSalesAnalyticsTransactionEvent,
  isSalesAnalyticsOrderEvent,
  isSalesAnalyticsPaymentEvent,
  isSalesAnalyticsPromotionEvent,
  // Sales Analytics Type Constants
  SALES_ANALYTICS_TYPE,
  SalesAnalyticsAnalysisType,
  SalesAnalyticsDataType,
  SalesAnalyticsChannel,
  SalesAnalyticsOrderStatus,
  SalesAnalyticsPaymentStatus,
  SalesAnalyticsSalesType,
  SalesAnalyticsPerformanceLevel,
  SalesAnalyticsGrowthRate,
  SalesAnalyticsPeriod,
  getSalesAnalyticsAnalysisTypeLabel,
  getSalesAnalyticsDataTypeLabel,
  getSalesAnalyticsChannelLabel,
  getSalesAnalyticsOrderStatusLabel,
  getSalesAnalyticsPaymentStatusLabel,
  getSalesAnalyticsSalesTypeLabel,
  getSalesAnalyticsPerformanceLevelLabel,
  getSalesAnalyticsGrowthRateLabel,
  getSalesAnalyticsPeriodLabel,
  isSalesAnalyticsPerformanceAnalysis,
  isSalesAnalyticsComparative,
  isSalesAnalyticsPredictive,
  getSalesAnalyticsPerformanceLevel,
  getSalesAnalyticsGrowthRate,
  // Sales Analytics Metric Constants
  SALES_ANALYTICS_METRIC,
  SalesAnalyticsCountMetric,
  SalesAnalyticsRevenueMetric,
  SalesAnalyticsProfitMetric,
  SalesAnalyticsGrowthMetric,
  SalesAnalyticsConversionMetric,
  SalesAnalyticsChannelMetric,
  SalesAnalyticsEfficiencyMetric,
  SalesAnalyticsQualityMetric,
  SalesAnalyticsMetricCategory,
  SalesAnalyticsMetricType,
  SalesAnalyticsMetricFormat,
  SalesAnalyticsMetricPriority,
  getSalesAnalyticsMetricLabel,
  getSalesAnalyticsMetricCategoryLabel,
  getSalesAnalyticsMetricTypeLabel,
  getSalesAnalyticsMetricFormatLabel,
  getSalesAnalyticsMetricPriorityLabel,
  getSalesAnalyticsMetricCategory,
  getSalesAnalyticsMetricType,
  getSalesAnalyticsMetricFormat,
  calculateSalesAnalyticsConversionRate,
  calculateSalesAnalyticsAverageOrderValue,
  calculateSalesAnalyticsGrowthRate,
  calculateSalesAnalyticsProfitMargin,
  calculateSalesAnalyticsRetentionRate,
  calculateSalesAnalyticsChurnRate,
  calculateSalesAnalyticsReturnRate,
  calculateSalesAnalyticsNPS,
} from '@vubon/shared-constants';

// ============================================================
// Sales Analytics Extended Types
// ============================================================

/**
 * Sales analytics
 */
export interface SalesAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: SalesAnalyticsType;
  status: SalesAnalyticsStatus;
  scope: SalesAnalyticsScope;
  event: SalesAnalyticsEvent;
  dimension: SalesAnalyticsDimension;
  metric: SalesAnalyticsMetric;
  segment: SalesAnalyticsSegment;
  cohort: SalesAnalyticsCohort;
  granularity: SalesAnalyticsGranularity;
  analysisType: SalesAnalyticsAnalysisType;
  dataType: SalesAnalyticsDataType;
  channel: SalesAnalyticsChannel;
  orderStatus: SalesAnalyticsOrderStatus;
  paymentStatus: SalesAnalyticsPaymentStatus;
  salesType: SalesAnalyticsSalesType;
  performanceLevel: SalesAnalyticsPerformanceLevel;
  growthRate: SalesAnalyticsGrowthRate;
  period: SalesAnalyticsPeriod;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isTransactionEvent: boolean;
  isOrderEvent: boolean;
  isPaymentEvent: boolean;
  isPromotionEvent: boolean;
  isPerformanceAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Sales analytics filter
 */
export interface SalesAnalyticsFilter {
  ids?: ID[];
  types?: SalesAnalyticsType[];
  statuses?: SalesAnalyticsStatus[];
  scopes?: SalesAnalyticsScope[];
  events?: SalesAnalyticsEvent[];
  dimensions?: SalesAnalyticsDimension[];
  metrics?: SalesAnalyticsMetric[];
  segments?: SalesAnalyticsSegment[];
  cohorts?: SalesAnalyticsCohort[];
  granularities?: SalesAnalyticsGranularity[];
  analysisTypes?: SalesAnalyticsAnalysisType[];
  dataTypes?: SalesAnalyticsDataType[];
  channels?: SalesAnalyticsChannel[];
  orderStatuses?: SalesAnalyticsOrderStatus[];
  paymentStatuses?: SalesAnalyticsPaymentStatus[];
  salesTypes?: SalesAnalyticsSalesType[];
  performanceLevels?: SalesAnalyticsPerformanceLevel[];
  growthRates?: SalesAnalyticsGrowthRate[];
  periods?: SalesAnalyticsPeriod[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isTransactionEvent?: boolean;
  isOrderEvent?: boolean;
  isPaymentEvent?: boolean;
  isPromotionEvent?: boolean;
  isPerformanceAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Sales analytics statistics
 */
export interface SalesAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  transactionEvents: number;
  orderEvents: number;
  paymentEvents: number;
  promotionEvents: number;
  performanceAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<SalesAnalyticsType, number>;
  byStatus: Record<SalesAnalyticsStatus, number>;
  byEvent: Record<SalesAnalyticsEvent, number>;
  byMetric: Record<SalesAnalyticsMetric, number>;
  bySegment: Record<SalesAnalyticsSegment, number>;
  byCohort: Record<SalesAnalyticsCohort, number>;
  byGranularity: Record<SalesAnalyticsGranularity, number>;
  byChannel: Record<SalesAnalyticsChannel, number>;
  byOrderStatus: Record<SalesAnalyticsOrderStatus, number>;
  byPaymentStatus: Record<SalesAnalyticsPaymentStatus, number>;
  bySalesType: Record<SalesAnalyticsSalesType, number>;
  byPerformanceLevel: Record<SalesAnalyticsPerformanceLevel, number>;
  byGrowthRate: Record<SalesAnalyticsGrowthRate, number>;
  byPeriod: Record<SalesAnalyticsPeriod, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: SalesAnalyticsEvent;
  mostFrequentMetric: SalesAnalyticsMetric;
  mostFrequentSegment: SalesAnalyticsSegment;
}

/**
 * Sales analytics summary
 */
export interface SalesAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  transactionEvents: number;
  orderEvents: number;
  paymentEvents: number;
  promotionEvents: number;
  performance: number;
  comparative: number;
  predictive: number;
  byType: Record<SalesAnalyticsType, number>;
  byStatus: Record<SalesAnalyticsStatus, number>;
  byEvent: Record<SalesAnalyticsEvent, number>;
  byMetric: Record<SalesAnalyticsMetric, number>;
  bySegment: Record<SalesAnalyticsSegment, number>;
  byCohort: Record<SalesAnalyticsCohort, number>;
  byGranularity: Record<SalesAnalyticsGranularity, number>;
  byChannel: Record<SalesAnalyticsChannel, number>;
  byOrderStatus: Record<SalesAnalyticsOrderStatus, number>;
  byPaymentStatus: Record<SalesAnalyticsPaymentStatus, number>;
  bySalesType: Record<SalesAnalyticsSalesType, number>;
  byPerformanceLevel: Record<SalesAnalyticsPerformanceLevel, number>;
  byGrowthRate: Record<SalesAnalyticsGrowthRate, number>;
  byPeriod: Record<SalesAnalyticsPeriod, number>;
  salesTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: SalesAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: SalesAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: SalesAnalyticsChannel;
    count: number;
    label: string;
  }[];
}

/**
 * Sales analytics configuration
 */
export interface SalesAnalyticsConfiguration {
  enabled: boolean;
  defaultType: SalesAnalyticsType;
  defaultScope: SalesAnalyticsScope;
  defaultGranularity: SalesAnalyticsGranularity;
  defaultPeriod: SalesAnalyticsPeriod;
  trackTransactionEvents: boolean;
  trackOrderEvents: boolean;
  trackPaymentEvents: boolean;
  trackPromotionEvents: boolean;
  trackPerformanceAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: SalesAnalyticsAlertConfig;
}

/**
 * Sales analytics alert configuration
 */
export interface SalesAnalyticsAlertConfig {
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
 * Sales analytics history
 */
export interface SalesAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Sales analytics data point
 */
export interface SalesAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: SalesAnalyticsEvent;
  dimension: SalesAnalyticsDimension;
  metric: SalesAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Sales analytics export
 */
export interface SalesAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SalesAnalyticsFilter;
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
  // Main Sales Analytics Constants
  SALES_ANALYTICS,
  SalesAnalyticsType,
  SalesAnalyticsStatus,
  SalesAnalyticsScope,
  SalesAnalyticsEvent,
  SalesAnalyticsDimension,
  SalesAnalyticsMetric,
  SalesAnalyticsSegment,
  SalesAnalyticsCohort,
  SalesAnalyticsGranularity,
  getSalesAnalyticsStatusLabel,
  getSalesAnalyticsEventLabel,
  getSalesAnalyticsDimensionLabel,
  getSalesAnalyticsSegmentLabel,
  getSalesAnalyticsCohortLabel,
  getSalesAnalyticsGranularityLabel,
  isSalesAnalyticsActive,
  isSalesAnalyticsCompleted,
  isSalesAnalyticsFailed,
  isSalesAnalyticsTransactionEvent,
  isSalesAnalyticsOrderEvent,
  isSalesAnalyticsPaymentEvent,
  isSalesAnalyticsPromotionEvent,
  // Sales Analytics Type Constants
  SALES_ANALYTICS_TYPE,
  SalesAnalyticsAnalysisType,
  SalesAnalyticsDataType,
  SalesAnalyticsChannel,
  SalesAnalyticsOrderStatus,
  SalesAnalyticsPaymentStatus,
  SalesAnalyticsSalesType,
  SalesAnalyticsPerformanceLevel,
  SalesAnalyticsGrowthRate,
  SalesAnalyticsPeriod,
  getSalesAnalyticsAnalysisTypeLabel,
  getSalesAnalyticsDataTypeLabel,
  getSalesAnalyticsChannelLabel,
  getSalesAnalyticsOrderStatusLabel,
  getSalesAnalyticsPaymentStatusLabel,
  getSalesAnalyticsSalesTypeLabel,
  getSalesAnalyticsPerformanceLevelLabel,
  getSalesAnalyticsGrowthRateLabel,
  getSalesAnalyticsPeriodLabel,
  isSalesAnalyticsPerformanceAnalysis,
  isSalesAnalyticsComparative,
  isSalesAnalyticsPredictive,
  getSalesAnalyticsPerformanceLevel,
  getSalesAnalyticsGrowthRate,
  // Sales Analytics Metric Constants
  SALES_ANALYTICS_METRIC,
  SalesAnalyticsCountMetric,
  SalesAnalyticsRevenueMetric,
  SalesAnalyticsProfitMetric,
  SalesAnalyticsGrowthMetric,
  SalesAnalyticsConversionMetric,
  SalesAnalyticsChannelMetric,
  SalesAnalyticsEfficiencyMetric,
  SalesAnalyticsQualityMetric,
  SalesAnalyticsMetricCategory,
  SalesAnalyticsMetricType,
  SalesAnalyticsMetricFormat,
  SalesAnalyticsMetricPriority,
  getSalesAnalyticsMetricLabel,
  getSalesAnalyticsMetricCategoryLabel,
  getSalesAnalyticsMetricTypeLabel,
  getSalesAnalyticsMetricFormatLabel,
  getSalesAnalyticsMetricPriorityLabel,
  getSalesAnalyticsMetricCategory,
  getSalesAnalyticsMetricType,
  getSalesAnalyticsMetricFormat,
  calculateSalesAnalyticsConversionRate,
  calculateSalesAnalyticsAverageOrderValue,
  calculateSalesAnalyticsGrowthRate,
  calculateSalesAnalyticsProfitMargin,
  calculateSalesAnalyticsRetentionRate,
  calculateSalesAnalyticsChurnRate,
  calculateSalesAnalyticsReturnRate,
  calculateSalesAnalyticsNPS,
};
