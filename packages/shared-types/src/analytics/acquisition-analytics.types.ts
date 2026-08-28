/**
 * Acquisition Analytics Types
 * Type definitions for acquisition analytics based on shared-constants
 * @module AcquisitionAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants acquisition analytics
// ============================================================
import {
  // Main Acquisition Analytics Constants
  ACQUISITION_ANALYTICS,
  AcquisitionAnalyticsType,
  AcquisitionAnalyticsStatus,
  AcquisitionAnalyticsScope,
  AcquisitionAnalyticsEvent,
  AcquisitionAnalyticsDimension,
  AcquisitionAnalyticsMetric,
  AcquisitionAnalyticsSegment,
  AcquisitionAnalyticsCohort,
  AcquisitionAnalyticsGranularity,
  getAcquisitionAnalyticsStatusLabel,
  getAcquisitionAnalyticsEventLabel,
  getAcquisitionAnalyticsDimensionLabel,
  getAcquisitionAnalyticsSegmentLabel,
  getAcquisitionAnalyticsCohortLabel,
  getAcquisitionAnalyticsGranularityLabel,
  isAcquisitionAnalyticsActive,
  isAcquisitionAnalyticsCompleted,
  isAcquisitionAnalyticsFailed,
  isAcquisitionAnalyticsLeadEvent,
  isAcquisitionAnalyticsCustomerEvent,
  isAcquisitionAnalyticsChannelEvent,
  // Acquisition Analytics Type Constants
  ACQUISITION_ANALYTICS_TYPE,
  AcquisitionAnalyticsAnalysisType,
  AcquisitionAnalyticsDataType,
  AcquisitionAnalyticsLeadStatus,
  AcquisitionAnalyticsLeadType,
  AcquisitionAnalyticsAcquisitionChannel,
  AcquisitionAnalyticsAcquisitionSource,
  AcquisitionAnalyticsAcquisitionMedium,
  AcquisitionAnalyticsFunnelStage,
  AcquisitionAnalyticsCACCategory,
  AcquisitionAnalyticsROICategory,
  getAcquisitionAnalyticsAnalysisTypeLabel,
  getAcquisitionAnalyticsDataTypeLabel,
  getAcquisitionAnalyticsLeadStatusLabel,
  getAcquisitionAnalyticsLeadTypeLabel,
  getAcquisitionAnalyticsAcquisitionChannelLabel,
  getAcquisitionAnalyticsAcquisitionSourceLabel,
  getAcquisitionAnalyticsAcquisitionMediumLabel,
  getAcquisitionAnalyticsFunnelStageLabel,
  getAcquisitionAnalyticsCACCategoryLabel,
  getAcquisitionAnalyticsROICategoryLabel,
  isAcquisitionAnalyticsChannelAnalysis,
  isAcquisitionAnalyticsCustomerAnalysis,
  isAcquisitionAnalyticsCostAnalysis,
  isAcquisitionAnalyticsFunnelAnalysis,
  isAcquisitionAnalyticsComparative,
  isAcquisitionAnalyticsPredictive,
  getAcquisitionAnalyticsCACCategory,
  getAcquisitionAnalyticsROICategory,
  // Acquisition Analytics Metric Constants
  ACQUISITION_ANALYTICS_METRIC,
  AcquisitionAnalyticsLeadMetric,
  AcquisitionAnalyticsCustomerMetric,
  AcquisitionAnalyticsChannelMetric,
  AcquisitionAnalyticsCampaignMetric,
  AcquisitionAnalyticsCostMetric,
  AcquisitionAnalyticsROIMetric,
  AcquisitionAnalyticsFunnelMetric,
  AcquisitionAnalyticsComparisonMetric,
  AcquisitionAnalyticsMetricCategory,
  AcquisitionAnalyticsMetricType,
  AcquisitionAnalyticsMetricFormat,
  AcquisitionAnalyticsMetricPriority,
  getAcquisitionAnalyticsMetricLabel,
  getAcquisitionAnalyticsMetricCategoryLabel,
  getAcquisitionAnalyticsMetricTypeLabel,
  getAcquisitionAnalyticsMetricFormatLabel,
  getAcquisitionAnalyticsMetricPriorityLabel,
  getAcquisitionAnalyticsMetricCategory,
  getAcquisitionAnalyticsMetricType,
  getAcquisitionAnalyticsMetricFormat,
  calculateAcquisitionAnalyticsLeadConversionRate,
  calculateAcquisitionAnalyticsCAC,
  calculateAcquisitionAnalyticsLTVToCACRatio,
  calculateAcquisitionAnalyticsROI,
  calculateAcquisitionAnalyticsROAS,
  calculateAcquisitionAnalyticsFunnelConversion,
  calculateAcquisitionAnalyticsFunnelDropoff,
  calculateAcquisitionAnalyticsCostPerLead,
} from '@vubon/shared-constants';

// ============================================================
// Acquisition Analytics Extended Types
// ============================================================

/**
 * Acquisition analytics
 */
export interface AcquisitionAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: AcquisitionAnalyticsType;
  status: AcquisitionAnalyticsStatus;
  scope: AcquisitionAnalyticsScope;
  event: AcquisitionAnalyticsEvent;
  dimension: AcquisitionAnalyticsDimension;
  metric: AcquisitionAnalyticsMetric;
  segment: AcquisitionAnalyticsSegment;
  cohort: AcquisitionAnalyticsCohort;
  granularity: AcquisitionAnalyticsGranularity;
  analysisType: AcquisitionAnalyticsAnalysisType;
  dataType: AcquisitionAnalyticsDataType;
  leadStatus: AcquisitionAnalyticsLeadStatus;
  leadType: AcquisitionAnalyticsLeadType;
  acquisitionChannel: AcquisitionAnalyticsAcquisitionChannel;
  acquisitionSource: AcquisitionAnalyticsAcquisitionSource;
  acquisitionMedium: AcquisitionAnalyticsAcquisitionMedium;
  funnelStage: AcquisitionAnalyticsFunnelStage;
  cacCategory: AcquisitionAnalyticsCACCategory;
  roiCategory: AcquisitionAnalyticsROICategory;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isLeadEvent: boolean;
  isCustomerEvent: boolean;
  isChannelEvent: boolean;
  isChannelAnalysis: boolean;
  isCustomerAnalysis: boolean;
  isCostAnalysis: boolean;
  isFunnelAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Acquisition analytics filter
 */
export interface AcquisitionAnalyticsFilter {
  ids?: ID[];
  types?: AcquisitionAnalyticsType[];
  statuses?: AcquisitionAnalyticsStatus[];
  scopes?: AcquisitionAnalyticsScope[];
  events?: AcquisitionAnalyticsEvent[];
  dimensions?: AcquisitionAnalyticsDimension[];
  metrics?: AcquisitionAnalyticsMetric[];
  segments?: AcquisitionAnalyticsSegment[];
  cohorts?: AcquisitionAnalyticsCohort[];
  granularities?: AcquisitionAnalyticsGranularity[];
  analysisTypes?: AcquisitionAnalyticsAnalysisType[];
  dataTypes?: AcquisitionAnalyticsDataType[];
  leadStatuses?: AcquisitionAnalyticsLeadStatus[];
  leadTypes?: AcquisitionAnalyticsLeadType[];
  acquisitionChannels?: AcquisitionAnalyticsAcquisitionChannel[];
  acquisitionSources?: AcquisitionAnalyticsAcquisitionSource[];
  acquisitionMediums?: AcquisitionAnalyticsAcquisitionMedium[];
  funnelStages?: AcquisitionAnalyticsFunnelStage[];
  cacCategories?: AcquisitionAnalyticsCACCategory[];
  roiCategories?: AcquisitionAnalyticsROICategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isLeadEvent?: boolean;
  isCustomerEvent?: boolean;
  isChannelEvent?: boolean;
  isChannelAnalysis?: boolean;
  isCustomerAnalysis?: boolean;
  isCostAnalysis?: boolean;
  isFunnelAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Acquisition analytics statistics
 */
export interface AcquisitionAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  leadEvents: number;
  customerEvents: number;
  channelEvents: number;
  channelAnalyses: number;
  customerAnalyses: number;
  costAnalyses: number;
  funnelAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<AcquisitionAnalyticsType, number>;
  byStatus: Record<AcquisitionAnalyticsStatus, number>;
  byEvent: Record<AcquisitionAnalyticsEvent, number>;
  byMetric: Record<AcquisitionAnalyticsMetric, number>;
  bySegment: Record<AcquisitionAnalyticsSegment, number>;
  byCohort: Record<AcquisitionAnalyticsCohort, number>;
  byGranularity: Record<AcquisitionAnalyticsGranularity, number>;
  byLeadStatus: Record<AcquisitionAnalyticsLeadStatus, number>;
  byLeadType: Record<AcquisitionAnalyticsLeadType, number>;
  byAcquisitionChannel: Record<AcquisitionAnalyticsAcquisitionChannel, number>;
  byAcquisitionSource: Record<AcquisitionAnalyticsAcquisitionSource, number>;
  byAcquisitionMedium: Record<AcquisitionAnalyticsAcquisitionMedium, number>;
  byFunnelStage: Record<AcquisitionAnalyticsFunnelStage, number>;
  byCACCategory: Record<AcquisitionAnalyticsCACCategory, number>;
  byROICategory: Record<AcquisitionAnalyticsROICategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: AcquisitionAnalyticsEvent;
  mostFrequentMetric: AcquisitionAnalyticsMetric;
  mostFrequentSegment: AcquisitionAnalyticsSegment;
}

/**
 * Acquisition analytics summary
 */
export interface AcquisitionAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  leadEvents: number;
  customerEvents: number;
  channelEvents: number;
  channelAnalyses: number;
  customerAnalyses: number;
  costAnalyses: number;
  funnelAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<AcquisitionAnalyticsType, number>;
  byStatus: Record<AcquisitionAnalyticsStatus, number>;
  byEvent: Record<AcquisitionAnalyticsEvent, number>;
  byMetric: Record<AcquisitionAnalyticsMetric, number>;
  bySegment: Record<AcquisitionAnalyticsSegment, number>;
  byCohort: Record<AcquisitionAnalyticsCohort, number>;
  byGranularity: Record<AcquisitionAnalyticsGranularity, number>;
  byLeadStatus: Record<AcquisitionAnalyticsLeadStatus, number>;
  byLeadType: Record<AcquisitionAnalyticsLeadType, number>;
  byAcquisitionChannel: Record<AcquisitionAnalyticsAcquisitionChannel, number>;
  byAcquisitionSource: Record<AcquisitionAnalyticsAcquisitionSource, number>;
  byAcquisitionMedium: Record<AcquisitionAnalyticsAcquisitionMedium, number>;
  byFunnelStage: Record<AcquisitionAnalyticsFunnelStage, number>;
  byCACCategory: Record<AcquisitionAnalyticsCACCategory, number>;
  byROICategory: Record<AcquisitionAnalyticsROICategory, number>;
  acquisitionTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: AcquisitionAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: AcquisitionAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topAcquisitionChannels: {
    channel: AcquisitionAnalyticsAcquisitionChannel;
    count: number;
    label: string;
  }[];
  topFunnelStages: {
    stage: AcquisitionAnalyticsFunnelStage;
    count: number;
    label: string;
  }[];
}

/**
 * Acquisition analytics configuration
 */
export interface AcquisitionAnalyticsConfiguration {
  enabled: boolean;
  defaultType: AcquisitionAnalyticsType;
  defaultScope: AcquisitionAnalyticsScope;
  defaultGranularity: AcquisitionAnalyticsGranularity;
  trackLeadEvents: boolean;
  trackCustomerEvents: boolean;
  trackChannelEvents: boolean;
  trackChannelAnalysis: boolean;
  trackCustomerAnalysis: boolean;
  trackCostAnalysis: boolean;
  trackFunnelAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: AcquisitionAnalyticsAlertConfig;
}

/**
 * Acquisition analytics alert configuration
 */
export interface AcquisitionAnalyticsAlertConfig {
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
 * Acquisition analytics history
 */
export interface AcquisitionAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Acquisition analytics data point
 */
export interface AcquisitionAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: AcquisitionAnalyticsEvent;
  dimension: AcquisitionAnalyticsDimension;
  metric: AcquisitionAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Acquisition analytics export
 */
export interface AcquisitionAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AcquisitionAnalyticsFilter;
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
  // Main Acquisition Analytics Constants
  ACQUISITION_ANALYTICS,
  AcquisitionAnalyticsType,
  AcquisitionAnalyticsStatus,
  AcquisitionAnalyticsScope,
  AcquisitionAnalyticsEvent,
  AcquisitionAnalyticsDimension,
  AcquisitionAnalyticsMetric,
  AcquisitionAnalyticsSegment,
  AcquisitionAnalyticsCohort,
  AcquisitionAnalyticsGranularity,
  getAcquisitionAnalyticsStatusLabel,
  getAcquisitionAnalyticsEventLabel,
  getAcquisitionAnalyticsDimensionLabel,
  getAcquisitionAnalyticsSegmentLabel,
  getAcquisitionAnalyticsCohortLabel,
  getAcquisitionAnalyticsGranularityLabel,
  isAcquisitionAnalyticsActive,
  isAcquisitionAnalyticsCompleted,
  isAcquisitionAnalyticsFailed,
  isAcquisitionAnalyticsLeadEvent,
  isAcquisitionAnalyticsCustomerEvent,
  isAcquisitionAnalyticsChannelEvent,
  // Acquisition Analytics Type Constants
  ACQUISITION_ANALYTICS_TYPE,
  AcquisitionAnalyticsAnalysisType,
  AcquisitionAnalyticsDataType,
  AcquisitionAnalyticsLeadStatus,
  AcquisitionAnalyticsLeadType,
  AcquisitionAnalyticsAcquisitionChannel,
  AcquisitionAnalyticsAcquisitionSource,
  AcquisitionAnalyticsAcquisitionMedium,
  AcquisitionAnalyticsFunnelStage,
  AcquisitionAnalyticsCACCategory,
  AcquisitionAnalyticsROICategory,
  getAcquisitionAnalyticsAnalysisTypeLabel,
  getAcquisitionAnalyticsDataTypeLabel,
  getAcquisitionAnalyticsLeadStatusLabel,
  getAcquisitionAnalyticsLeadTypeLabel,
  getAcquisitionAnalyticsAcquisitionChannelLabel,
  getAcquisitionAnalyticsAcquisitionSourceLabel,
  getAcquisitionAnalyticsAcquisitionMediumLabel,
  getAcquisitionAnalyticsFunnelStageLabel,
  getAcquisitionAnalyticsCACCategoryLabel,
  getAcquisitionAnalyticsROICategoryLabel,
  isAcquisitionAnalyticsChannelAnalysis,
  isAcquisitionAnalyticsCustomerAnalysis,
  isAcquisitionAnalyticsCostAnalysis,
  isAcquisitionAnalyticsFunnelAnalysis,
  isAcquisitionAnalyticsComparative,
  isAcquisitionAnalyticsPredictive,
  getAcquisitionAnalyticsCACCategory,
  getAcquisitionAnalyticsROICategory,
  // Acquisition Analytics Metric Constants
  ACQUISITION_ANALYTICS_METRIC,
  AcquisitionAnalyticsLeadMetric,
  AcquisitionAnalyticsCustomerMetric,
  AcquisitionAnalyticsChannelMetric,
  AcquisitionAnalyticsCampaignMetric,
  AcquisitionAnalyticsCostMetric,
  AcquisitionAnalyticsROIMetric,
  AcquisitionAnalyticsFunnelMetric,
  AcquisitionAnalyticsComparisonMetric,
  AcquisitionAnalyticsMetricCategory,
  AcquisitionAnalyticsMetricType,
  AcquisitionAnalyticsMetricFormat,
  AcquisitionAnalyticsMetricPriority,
  getAcquisitionAnalyticsMetricLabel,
  getAcquisitionAnalyticsMetricCategoryLabel,
  getAcquisitionAnalyticsMetricTypeLabel,
  getAcquisitionAnalyticsMetricFormatLabel,
  getAcquisitionAnalyticsMetricPriorityLabel,
  getAcquisitionAnalyticsMetricCategory,
  getAcquisitionAnalyticsMetricType,
  getAcquisitionAnalyticsMetricFormat,
  calculateAcquisitionAnalyticsLeadConversionRate,
  calculateAcquisitionAnalyticsCAC,
  calculateAcquisitionAnalyticsLTVToCACRatio,
  calculateAcquisitionAnalyticsROI,
  calculateAcquisitionAnalyticsROAS,
  calculateAcquisitionAnalyticsFunnelConversion,
  calculateAcquisitionAnalyticsFunnelDropoff,
  calculateAcquisitionAnalyticsCostPerLead,
};
