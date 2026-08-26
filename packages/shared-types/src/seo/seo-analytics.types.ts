/**
 * SEO Analytics Types
 * Type definitions for SEO analytics based on shared-constants
 * @module SEOAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants seo analytics
// ============================================================
import {
  // SEO Analytics Main
  SEO_ANALYTICS,
  SEOAnalyticsType,
  SEOAnalyticsStatus,
  SEOAnalyticsTimeframe,
  SEOAnalyticsAggregation,
  SEOAnalyticsDimension,
  SEOAnalyticsSource,
  SEOAnalyticsFrequency,
  SEOAnalyticsErrorType,
  getSEOAnalyticsTypeLabel,
  getSEOAnalyticsStatusLabel,
  getSEOAnalyticsTimeframeLabel,
  getSEOAnalyticsAggregationLabel,
  getSEOAnalyticsDimensionLabel,
  getSEOAnalyticsSourceLabel,
  getSEOAnalyticsFrequencyLabel,
  getSEOAnalyticsErrorLabel,
  getAnalyticsStatusColor,
  isSEOAnalyticsComplete,
  isSEOAnalyticsProcessing,
  // SEO Analytics Type
  SEO_ANALYTICS_TYPE,
  SEOAnalyticsTypeCategory,
  SEOAnalyticsTypeSubType,
  SEOAnalyticsTypeScope,
  SEOAnalyticsTypeGranularity,
  SEOAnalyticsTypeContext,
  SEOAnalyticsTypePurpose,
  getSEOAnalyticsCategoryLabel,
  getSEOAnalyticsSubTypeLabel,
  getSEOAnalyticsScopeLabel,
  getSEOAnalyticsGranularityLabel,
  getSEOAnalyticsContextLabel,
  getSEOAnalyticsPurposeLabel,
  // SEO Analytics Metric
  SEO_ANALYTICS_METRIC,
  SEOAnalyticsMetricTraffic,
  SEOAnalyticsMetricAcquisition,
  SEOAnalyticsMetricConversion,
  SEOAnalyticsMetricEngagement,
  SEOAnalyticsMetricTechnical,
  SEOAnalyticsMetricPerformance,
  SEOAnalyticsMetricBacklink,
  SEOAnalyticsMetricContent,
  SEOAnalyticsMetricMobile,
  SEOAnalyticsMetricSocial,
  SEOAnalyticsMetricRevenue,
  getSEOAnalyticsMetricLabel,
  getSEOAnalyticsMetricCategory,
} from '@vubon/shared-constants';

// ============================================================
// SEO Analytics Extended Types
// ============================================================

/**
 * SEO analytics
 */
export interface SEOAnalytics extends BaseEntity, Timestamp {
  id: ID;
  url: string;
  type: SEOAnalyticsType;
  status: SEOAnalyticsStatus;
  timeframe: SEOAnalyticsTimeframe;
  aggregation: SEOAnalyticsAggregation;
  dimensions: SEOAnalyticsDimension[];
  source: SEOAnalyticsSource;
  frequency: SEOAnalyticsFrequency;
  metrics:
    | SEOAnalyticsMetricTraffic[]
    | SEOAnalyticsMetricAcquisition[]
    | SEOAnalyticsMetricConversion[]
    | SEOAnalyticsMetricEngagement[]
    | SEOAnalyticsMetricTechnical[]
    | SEOAnalyticsMetricPerformance[]
    | SEOAnalyticsMetricBacklink[]
    | SEOAnalyticsMetricContent[]
    | SEOAnalyticsMetricMobile[]
    | SEOAnalyticsMetricSocial[]
    | SEOAnalyticsMetricRevenue[];
  values: Record<string, number>;
  isComplete: boolean;
  isProcessing: boolean;
  checkedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO analytics filter
 */
export interface SEOAnalyticsFilter {
  ids?: ID[];
  urls?: string[];
  types?: SEOAnalyticsType[];
  statuses?: SEOAnalyticsStatus[];
  timeframes?: SEOAnalyticsTimeframe[];
  aggregations?: SEOAnalyticsAggregation[];
  dimensions?: SEOAnalyticsDimension[];
  sources?: SEOAnalyticsSource[];
  frequencies?: SEOAnalyticsFrequency[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isProcessing?: boolean;
  searchTerm?: string;
}

/**
 * SEO analytics statistics
 */
export interface SEOAnalyticsStatistics {
  totalAnalytics: number;
  completeAnalytics: number;
  processingAnalytics: number;
  byType: Record<SEOAnalyticsType, number>;
  byStatus: Record<SEOAnalyticsStatus, number>;
  byTimeframe: Record<SEOAnalyticsTimeframe, number>;
  byAggregation: Record<SEOAnalyticsAggregation, number>;
  bySource: Record<SEOAnalyticsSource, number>;
  byFrequency: Record<SEOAnalyticsFrequency, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: SEOAnalyticsType;
  mostFrequentStatus: SEOAnalyticsStatus;
  mostFrequentTimeframe: SEOAnalyticsTimeframe;
  mostFrequentSource: SEOAnalyticsSource;
  totalMetrics: number;
  averageMetrics: number;
}

/**
 * SEO analytics summary
 */
export interface SEOAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAnalytics: number;
  complete: number;
  processing: number;
  byType: Record<SEOAnalyticsType, number>;
  byStatus: Record<SEOAnalyticsStatus, number>;
  byTimeframe: Record<SEOAnalyticsTimeframe, number>;
  byAggregation: Record<SEOAnalyticsAggregation, number>;
  bySource: Record<SEOAnalyticsSource, number>;
  byFrequency: Record<SEOAnalyticsFrequency, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    complete: number;
    processing: number;
  }[];
  topTypes: {
    type: SEOAnalyticsType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SEOAnalyticsStatus;
    count: number;
    label: string;
  }[];
  topTimeframes: {
    timeframe: SEOAnalyticsTimeframe;
    count: number;
    label: string;
  }[];
  metricSummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO analytics configuration
 */
export interface SEOAnalyticsConfiguration {
  enabled: boolean;
  defaultType: SEOAnalyticsType;
  defaultStatus: SEOAnalyticsStatus;
  defaultTimeframe: SEOAnalyticsTimeframe;
  defaultAggregation: SEOAnalyticsAggregation;
  defaultSource: SEOAnalyticsSource;
  defaultFrequency: SEOAnalyticsFrequency;
  autoCollect: boolean;
  autoUpdate: boolean;
  requireMetrics: boolean;
  maxAnalyticsPerUrl: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnComplete: boolean;
  notificationOnError: boolean;
  alertConfig?: SEOAnalyticsAlertConfig;
}

/**
 * SEO analytics alert configuration
 */
export interface SEOAnalyticsAlertConfig {
  enabled: boolean;
  collectionFailureAlert: boolean;
  metricThresholdAlert: boolean;
  dataGapAlert: boolean;
  significantChangeAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  metricThreshold: number;
  changeThreshold: number;
}

/**
 * SEO analytics history
 */
export interface SEOAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  action:
    | 'create'
    | 'update'
    | 'collect'
    | 'process'
    | 'complete'
    | 'fail'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'metric_add'
    | 'metric_remove'
    | 'metric_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO analytics validation
 */
export interface SEOAnalyticsValidation {
  isValid: boolean;
  analyticsId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO analytics data point
 */
export interface SEOAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  metric: string;
  value: number;
  dimension: SEOAnalyticsDimension;
  dimensionValue: string;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * SEO analytics export
 */
export interface SEOAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: SEOAnalyticsFilter;
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
  // SEO Analytics Main
  SEO_ANALYTICS,
  SEOAnalyticsType,
  SEOAnalyticsStatus,
  SEOAnalyticsTimeframe,
  SEOAnalyticsAggregation,
  SEOAnalyticsDimension,
  SEOAnalyticsSource,
  SEOAnalyticsFrequency,
  SEOAnalyticsErrorType,
  getSEOAnalyticsTypeLabel,
  getSEOAnalyticsStatusLabel,
  getSEOAnalyticsTimeframeLabel,
  getSEOAnalyticsAggregationLabel,
  getSEOAnalyticsDimensionLabel,
  getSEOAnalyticsSourceLabel,
  getSEOAnalyticsFrequencyLabel,
  getSEOAnalyticsErrorLabel,
  getAnalyticsStatusColor,
  isSEOAnalyticsComplete,
  isSEOAnalyticsProcessing,
  // SEO Analytics Type
  SEO_ANALYTICS_TYPE,
  SEOAnalyticsTypeCategory,
  SEOAnalyticsTypeSubType,
  SEOAnalyticsTypeScope,
  SEOAnalyticsTypeGranularity,
  SEOAnalyticsTypeContext,
  SEOAnalyticsTypePurpose,
  getSEOAnalyticsCategoryLabel,
  getSEOAnalyticsSubTypeLabel,
  getSEOAnalyticsScopeLabel,
  getSEOAnalyticsGranularityLabel,
  getSEOAnalyticsContextLabel,
  getSEOAnalyticsPurposeLabel,
  // SEO Analytics Metric
  SEO_ANALYTICS_METRIC,
  SEOAnalyticsMetricTraffic,
  SEOAnalyticsMetricAcquisition,
  SEOAnalyticsMetricConversion,
  SEOAnalyticsMetricEngagement,
  SEOAnalyticsMetricTechnical,
  SEOAnalyticsMetricPerformance,
  SEOAnalyticsMetricBacklink,
  SEOAnalyticsMetricContent,
  SEOAnalyticsMetricMobile,
  SEOAnalyticsMetricSocial,
  SEOAnalyticsMetricRevenue,
  getSEOAnalyticsMetricLabel,
  getSEOAnalyticsMetricCategory,
};
