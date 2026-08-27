/**
 * Flash Sale Analytics Types
 * Type definitions for flash sale analytics based on shared-constants
 * @module FlashSaleAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales-analytics
// ============================================================
import {
  // Flash Sale Analytics Core
  FLASH_SALE_ANALYTICS,
  FlashSaleAnalyticsType,
  FlashSaleAnalyticsMetric,
  FlashSaleAnalyticsPeriod,
  FlashSaleAnalyticsInterval,
  FlashSaleAnalyticsAggregation,
  FlashSaleAnalyticsDimension,
  flashsalesAnalyticsGetTypeLabel,
  flashsalesAnalyticsGetMetricLabel,
  flashsalesAnalyticsGetPeriodLabel,
  flashsalesAnalyticsGetIntervalLabel,
  flashsalesAnalyticsGetAggregationLabel,
  flashsalesAnalyticsGetDimensionLabel,
  flashsalesAnalyticsIsValidType,
  flashsalesAnalyticsIsValidMetric,
  flashsalesAnalyticsIsValidPeriod,
  flashsalesAnalyticsGetDefaultPeriod,
  flashsalesAnalyticsGetDefaultInterval,
  flashsalesAnalyticsGetDefaultAggregation,
  flashsalesAnalyticsGetMaxResults,
  flashsalesAnalyticsGetPeriodInDays,
  // Flash Sale Analytics Type
  FLASH_SALE_ANALYTICS_TYPE,
  FlashSaleAnalyticsTypeCategory,
  FlashSaleAnalyticsTypeComplexity,
  FlashSaleAnalyticsTypeScope,
  FlashSaleAnalyticsTypeFrequency,
  FlashSaleAnalyticsTypeMethod,
  FlashSaleAnalyticsTypePriority,
  FlashSaleAnalyticsTypeStatus,
  flashsalesAnalyticsTypeGetCategoryLabel,
  flashsalesAnalyticsTypeGetComplexityLabel,
  flashsalesAnalyticsTypeGetScopeLabel,
  flashsalesAnalyticsTypeGetFrequencyLabel,
  flashsalesAnalyticsTypeGetMethodLabel,
  flashsalesAnalyticsTypeGetPriorityLabel,
  flashsalesAnalyticsTypeGetStatusLabel,
  flashsalesAnalyticsTypeIsValidCategory,
  flashsalesAnalyticsTypeIsValidMethod,
  flashsalesAnalyticsTypeIsCompleted,
  flashsalesAnalyticsTypeIsProcessing,
  flashsalesAnalyticsTypeIsFailed,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Analytics Extended Types
// ============================================================

/**
 * Flash Sale Analytics
 */
export interface FlashSaleAnalytics extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  type: FlashSaleAnalyticsType;
  metric: FlashSaleAnalyticsMetric;
  period: FlashSaleAnalyticsPeriod;
  interval: FlashSaleAnalyticsInterval;
  aggregation: FlashSaleAnalyticsAggregation;
  dimension: FlashSaleAnalyticsDimension;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isCompleted: boolean;
  isProcessing: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * Flash Sale Analytics Filter
 */
export interface FlashSaleAnalyticsFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  types?: FlashSaleAnalyticsType[];
  metrics?: FlashSaleAnalyticsMetric[];
  periods?: FlashSaleAnalyticsPeriod[];
  intervals?: FlashSaleAnalyticsInterval[];
  aggregations?: FlashSaleAnalyticsAggregation[];
  dimensions?: FlashSaleAnalyticsDimension[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCompleted?: boolean;
  isProcessing?: boolean;
  isFailed?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Flash Sale Analytics Statistics
 */
export interface FlashSaleAnalyticsStatistics {
  flashSaleId: ID;
  totalAnalytics: number;
  completedAnalytics: number;
  processingAnalytics: number;
  failedAnalytics: number;
  byType: Record<FlashSaleAnalyticsType, number>;
  byMetric: Record<FlashSaleAnalyticsMetric, number>;
  byPeriod: Record<FlashSaleAnalyticsPeriod, number>;
  byInterval: Record<FlashSaleAnalyticsInterval, number>;
  byAggregation: Record<FlashSaleAnalyticsAggregation, number>;
  byDimension: Record<FlashSaleAnalyticsDimension, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentType: FlashSaleAnalyticsType;
  mostFrequentMetric: FlashSaleAnalyticsMetric;
  mostFrequentPeriod: FlashSaleAnalyticsPeriod;
}

/**
 * Flash Sale Analytics Summary
 */
export interface FlashSaleAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAnalytics: number;
  completed: number;
  processing: number;
  failed: number;
  byType: Record<FlashSaleAnalyticsType, number>;
  byMetric: Record<FlashSaleAnalyticsMetric, number>;
  byPeriod: Record<FlashSaleAnalyticsPeriod, number>;
  byInterval: Record<FlashSaleAnalyticsInterval, number>;
  byAggregation: Record<FlashSaleAnalyticsAggregation, number>;
  byDimension: Record<FlashSaleAnalyticsDimension, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: FlashSaleAnalyticsType;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: FlashSaleAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topPeriods: {
    period: FlashSaleAnalyticsPeriod;
    count: number;
    label: string;
  }[];
}

/**
 * Flash Sale Analytics Configuration
 */
export interface FlashSaleAnalyticsConfiguration {
  enabled: boolean;
  defaultType: FlashSaleAnalyticsType;
  defaultMetric: FlashSaleAnalyticsMetric;
  defaultPeriod: FlashSaleAnalyticsPeriod;
  defaultInterval: FlashSaleAnalyticsInterval;
  defaultAggregation: FlashSaleAnalyticsAggregation;
  defaultDimension: FlashSaleAnalyticsDimension;
  maxResults: number;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: FlashSaleAnalyticsAlertConfig;
}

/**
 * Flash Sale Analytics Alert Configuration
 */
export interface FlashSaleAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  failedAnalyticsAlert: boolean;
  performanceDropAlert: boolean;
  performanceDropThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Analytics History
 */
export interface FlashSaleAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  flashSaleId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Analytics Data Point
 */
export interface FlashSaleAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  flashSaleId: ID;
  metric: FlashSaleAnalyticsMetric;
  dimension: FlashSaleAnalyticsDimension;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Analytics Export
 */
export interface FlashSaleAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSaleAnalyticsFilter;
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
  // Flash Sale Analytics Core
  FLASH_SALE_ANALYTICS,
  FlashSaleAnalyticsType,
  FlashSaleAnalyticsMetric,
  FlashSaleAnalyticsPeriod,
  FlashSaleAnalyticsInterval,
  FlashSaleAnalyticsAggregation,
  FlashSaleAnalyticsDimension,
  flashsalesAnalyticsGetTypeLabel,
  flashsalesAnalyticsGetMetricLabel,
  flashsalesAnalyticsGetPeriodLabel,
  flashsalesAnalyticsGetIntervalLabel,
  flashsalesAnalyticsGetAggregationLabel,
  flashsalesAnalyticsGetDimensionLabel,
  flashsalesAnalyticsIsValidType,
  flashsalesAnalyticsIsValidMetric,
  flashsalesAnalyticsIsValidPeriod,
  flashsalesAnalyticsGetDefaultPeriod,
  flashsalesAnalyticsGetDefaultInterval,
  flashsalesAnalyticsGetDefaultAggregation,
  flashsalesAnalyticsGetMaxResults,
  flashsalesAnalyticsGetPeriodInDays,
  // Flash Sale Analytics Type
  FLASH_SALE_ANALYTICS_TYPE,
  FlashSaleAnalyticsTypeCategory,
  FlashSaleAnalyticsTypeComplexity,
  FlashSaleAnalyticsTypeScope,
  FlashSaleAnalyticsTypeFrequency,
  FlashSaleAnalyticsTypeMethod,
  FlashSaleAnalyticsTypePriority,
  FlashSaleAnalyticsTypeStatus,
  flashsalesAnalyticsTypeGetCategoryLabel,
  flashsalesAnalyticsTypeGetComplexityLabel,
  flashsalesAnalyticsTypeGetScopeLabel,
  flashsalesAnalyticsTypeGetFrequencyLabel,
  flashsalesAnalyticsTypeGetMethodLabel,
  flashsalesAnalyticsTypeGetPriorityLabel,
  flashsalesAnalyticsTypeGetStatusLabel,
  flashsalesAnalyticsTypeIsValidCategory,
  flashsalesAnalyticsTypeIsValidMethod,
  flashsalesAnalyticsTypeIsCompleted,
  flashsalesAnalyticsTypeIsProcessing,
  flashsalesAnalyticsTypeIsFailed,
};
