/**
 * Marketing Analytics Types
 * Type definitions for marketing analytics based on shared-constants
 * @module MarketingAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants marketing analytics
// ============================================================
import {
  // Marketing Analytics Core
  MARKETING_ANALYTICS,
  MarketingAnalyticsType,
  MarketingAnalyticsStatus,
  MarketingAnalyticsScope,
  MarketingAnalyticsEvent,
  MarketingAnalyticsDimension,
  MarketingAnalyticsMetric,
  MarketingAnalyticsSegment,
  MarketingAnalyticsCohort,
  MarketingAnalyticsGranularity,
  getMarketingAnalyticsStatusLabel,
  getMarketingAnalyticsEventLabel,
  getMarketingAnalyticsDimensionLabel,
  getMarketingAnalyticsSegmentLabel,
  getMarketingAnalyticsCohortLabel,
  getMarketingAnalyticsGranularityLabel,
  isMarketingAnalyticsActive,
  isMarketingAnalyticsCompleted,
  isMarketingAnalyticsFailed,
  isMarketingAnalyticsCampaignEvent,
  isMarketingAnalyticsEmailEvent,
  isMarketingAnalyticsSocialEvent,
  isMarketingAnalyticsCustomerEvent,
  // Marketing Analytics Type
  MARKETING_ANALYTICS_TYPE,
  MarketingAnalyticsAnalysisType,
  MarketingAnalyticsDataType,
  MarketingAnalyticsCampaignType,
  MarketingAnalyticsMarketingChannel,
  MarketingAnalyticsCampaignStatus,
  MarketingAnalyticsCampaignObjective,
  MarketingAnalyticsPerformanceLevel,
  MarketingAnalyticsEngagementLevel,
  MarketingAnalyticsSentimentType,
  getMarketingAnalyticsAnalysisTypeLabel,
  getMarketingAnalyticsDataTypeLabel,
  getMarketingAnalyticsCampaignTypeLabel,
  getMarketingAnalyticsMarketingChannelLabel,
  getMarketingAnalyticsCampaignStatusLabel,
  getMarketingAnalyticsCampaignObjectiveLabel,
  getMarketingAnalyticsPerformanceLevelLabel,
  getMarketingAnalyticsEngagementLevelLabel,
  getMarketingAnalyticsSentimentTypeLabel,
  isMarketingAnalyticsCampaignAnalysis,
  isMarketingAnalyticsDigitalMarketing,
  isMarketingAnalyticsBrandAnalysis,
  getMarketingAnalyticsPerformanceLevel,
  getMarketingAnalyticsEngagementLevel,
  getMarketingAnalyticsSentimentType,
  // Marketing Analytics Metric
  MARKETING_ANALYTICS_METRIC,
  MarketingAnalyticsCountMetric,
  MarketingAnalyticsReachMetric,
  MarketingAnalyticsEngagementMetric,
  MarketingAnalyticsConversionMetric,
  MarketingAnalyticsROIMetric,
  MarketingAnalyticsBrandMetric,
  MarketingAnalyticsCustomerMetric,
  MarketingAnalyticsChannelMetric,
  MarketingAnalyticsTimeMetric,
  MarketingAnalyticsComparisonMetric,
  MarketingAnalyticsMetricCategory,
  MarketingAnalyticsMetricType,
  MarketingAnalyticsMetricFormat,
  MarketingAnalyticsMetricPriority,
  getMarketingAnalyticsMetricLabel,
  getMarketingAnalyticsMetricCategoryLabel,
  getMarketingAnalyticsMetricTypeLabel,
  getMarketingAnalyticsMetricFormatLabel,
  getMarketingAnalyticsMetricPriorityLabel,
  getMarketingAnalyticsMetricCategory,
  getMarketingAnalyticsMetricType,
  getMarketingAnalyticsMetricFormat,
  calculateMarketingAnalyticsROI,
  calculateMarketingAnalyticsROAS,
  calculateMarketingAnalyticsConversionRate,
  calculateMarketingAnalyticsEngagementRate,
  calculateMarketingAnalyticsCTR,
  calculateMarketingAnalyticsRetentionRate,
  calculateMarketingAnalyticsChurnRate,
  calculateMarketingAnalyticsNPS,
} from '@vubon/shared-constants';

// ============================================================
// Marketing Analytics Extended Types
// ============================================================

/**
 * Marketing Analytics
 */
export interface MarketingAnalytics extends BaseEntity, Timestamp {
  id: ID;
  campaignId: ID;
  userId: ID;
  type: MarketingAnalyticsType;
  status: MarketingAnalyticsStatus;
  scope: MarketingAnalyticsScope;
  event: MarketingAnalyticsEvent;
  dimension: MarketingAnalyticsDimension;
  metric: MarketingAnalyticsMetric;
  segment: MarketingAnalyticsSegment;
  cohort: MarketingAnalyticsCohort;
  granularity: MarketingAnalyticsGranularity;
  analysisType: MarketingAnalyticsAnalysisType;
  dataType: MarketingAnalyticsDataType;
  campaignType: MarketingAnalyticsCampaignType;
  marketingChannel: MarketingAnalyticsMarketingChannel;
  campaignStatus: MarketingAnalyticsCampaignStatus;
  campaignObjective: MarketingAnalyticsCampaignObjective;
  performanceLevel: MarketingAnalyticsPerformanceLevel;
  engagementLevel: MarketingAnalyticsEngagementLevel;
  sentimentType: MarketingAnalyticsSentimentType;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isCampaignEvent: boolean;
  isEmailEvent: boolean;
  isSocialEvent: boolean;
  isCustomerEvent: boolean;
  isCampaignAnalysis: boolean;
  isDigitalMarketing: boolean;
  isBrandAnalysis: boolean;
  metadata?: Metadata;
}

/**
 * Marketing Analytics Filter
 */
export interface MarketingAnalyticsFilter {
  campaignIds?: ID[];
  userIds?: ID[];
  types?: MarketingAnalyticsType[];
  statuses?: MarketingAnalyticsStatus[];
  scopes?: MarketingAnalyticsScope[];
  events?: MarketingAnalyticsEvent[];
  dimensions?: MarketingAnalyticsDimension[];
  metrics?: MarketingAnalyticsMetric[];
  segments?: MarketingAnalyticsSegment[];
  cohorts?: MarketingAnalyticsCohort[];
  granularities?: MarketingAnalyticsGranularity[];
  analysisTypes?: MarketingAnalyticsAnalysisType[];
  dataTypes?: MarketingAnalyticsDataType[];
  campaignTypes?: MarketingAnalyticsCampaignType[];
  marketingChannels?: MarketingAnalyticsMarketingChannel[];
  campaignStatuses?: MarketingAnalyticsCampaignStatus[];
  campaignObjectives?: MarketingAnalyticsCampaignObjective[];
  performanceLevels?: MarketingAnalyticsPerformanceLevel[];
  engagementLevels?: MarketingAnalyticsEngagementLevel[];
  sentimentTypes?: MarketingAnalyticsSentimentType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isCampaignEvent?: boolean;
  isEmailEvent?: boolean;
  isSocialEvent?: boolean;
  isCustomerEvent?: boolean;
  isCampaignAnalysis?: boolean;
  isDigitalMarketing?: boolean;
  isBrandAnalysis?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Marketing Analytics Statistics
 */
export interface MarketingAnalyticsStatistics {
  campaignId: ID;
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  campaignEvents: number;
  emailEvents: number;
  socialEvents: number;
  customerEvents: number;
  campaignAnalyses: number;
  digitalMarketingAnalyses: number;
  brandAnalyses: number;
  byType: Record<MarketingAnalyticsType, number>;
  byStatus: Record<MarketingAnalyticsStatus, number>;
  byEvent: Record<MarketingAnalyticsEvent, number>;
  byMetric: Record<MarketingAnalyticsMetric, number>;
  bySegment: Record<MarketingAnalyticsSegment, number>;
  byCohort: Record<MarketingAnalyticsCohort, number>;
  byGranularity: Record<MarketingAnalyticsGranularity, number>;
  byCampaignType: Record<MarketingAnalyticsCampaignType, number>;
  byMarketingChannel: Record<MarketingAnalyticsMarketingChannel, number>;
  byCampaignStatus: Record<MarketingAnalyticsCampaignStatus, number>;
  byCampaignObjective: Record<MarketingAnalyticsCampaignObjective, number>;
  byPerformanceLevel: Record<MarketingAnalyticsPerformanceLevel, number>;
  byEngagementLevel: Record<MarketingAnalyticsEngagementLevel, number>;
  bySentimentType: Record<MarketingAnalyticsSentimentType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: MarketingAnalyticsEvent;
  mostFrequentMetric: MarketingAnalyticsMetric;
  mostFrequentSegment: MarketingAnalyticsSegment;
}

/**
 * Marketing Analytics Summary
 */
export interface MarketingAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  campaignEvents: number;
  emailEvents: number;
  socialEvents: number;
  customerEvents: number;
  campaign: number;
  digitalMarketing: number;
  brand: number;
  byType: Record<MarketingAnalyticsType, number>;
  byStatus: Record<MarketingAnalyticsStatus, number>;
  byEvent: Record<MarketingAnalyticsEvent, number>;
  byMetric: Record<MarketingAnalyticsMetric, number>;
  bySegment: Record<MarketingAnalyticsSegment, number>;
  byCohort: Record<MarketingAnalyticsCohort, number>;
  byGranularity: Record<MarketingAnalyticsGranularity, number>;
  byCampaignType: Record<MarketingAnalyticsCampaignType, number>;
  byMarketingChannel: Record<MarketingAnalyticsMarketingChannel, number>;
  byCampaignStatus: Record<MarketingAnalyticsCampaignStatus, number>;
  byCampaignObjective: Record<MarketingAnalyticsCampaignObjective, number>;
  byPerformanceLevel: Record<MarketingAnalyticsPerformanceLevel, number>;
  byEngagementLevel: Record<MarketingAnalyticsEngagementLevel, number>;
  bySentimentType: Record<MarketingAnalyticsSentimentType, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: MarketingAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: MarketingAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topCampaignTypes: {
    campaignType: MarketingAnalyticsCampaignType;
    count: number;
    label: string;
  }[];
  topMarketingChannels: {
    marketingChannel: MarketingAnalyticsMarketingChannel;
    count: number;
    label: string;
  }[];
}

/**
 * Marketing Analytics Configuration
 */
export interface MarketingAnalyticsConfiguration {
  enabled: boolean;
  defaultType: MarketingAnalyticsType;
  defaultScope: MarketingAnalyticsScope;
  defaultGranularity: MarketingAnalyticsGranularity;
  trackCampaignEvents: boolean;
  trackEmailEvents: boolean;
  trackSocialEvents: boolean;
  trackCustomerEvents: boolean;
  trackCampaignAnalysis: boolean;
  trackDigitalMarketing: boolean;
  trackBrandAnalysis: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: MarketingAnalyticsAlertConfig;
}

/**
 * Marketing Analytics Alert Configuration
 */
export interface MarketingAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  failedAnalyticsAlert: boolean;
  performanceDropAlert: boolean;
  engagementDropAlert: boolean;
  sentimentDropAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
}

/**
 * Marketing Analytics History
 */
export interface MarketingAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  campaignId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Marketing Analytics Data Point
 */
export interface MarketingAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  campaignId: ID;
  analyticsId: ID;
  event: MarketingAnalyticsEvent;
  dimension: MarketingAnalyticsDimension;
  metric: MarketingAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Marketing Analytics Export
 */
export interface MarketingAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  campaignId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: MarketingAnalyticsFilter;
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
  // Marketing Analytics Core
  MARKETING_ANALYTICS,
  MarketingAnalyticsType,
  MarketingAnalyticsStatus,
  MarketingAnalyticsScope,
  MarketingAnalyticsEvent,
  MarketingAnalyticsDimension,
  MarketingAnalyticsMetric,
  MarketingAnalyticsSegment,
  MarketingAnalyticsCohort,
  MarketingAnalyticsGranularity,
  getMarketingAnalyticsStatusLabel,
  getMarketingAnalyticsEventLabel,
  getMarketingAnalyticsDimensionLabel,
  getMarketingAnalyticsSegmentLabel,
  getMarketingAnalyticsCohortLabel,
  getMarketingAnalyticsGranularityLabel,
  isMarketingAnalyticsActive,
  isMarketingAnalyticsCompleted,
  isMarketingAnalyticsFailed,
  isMarketingAnalyticsCampaignEvent,
  isMarketingAnalyticsEmailEvent,
  isMarketingAnalyticsSocialEvent,
  isMarketingAnalyticsCustomerEvent,
  // Marketing Analytics Type
  MARKETING_ANALYTICS_TYPE,
  MarketingAnalyticsAnalysisType,
  MarketingAnalyticsDataType,
  MarketingAnalyticsCampaignType,
  MarketingAnalyticsMarketingChannel,
  MarketingAnalyticsCampaignStatus,
  MarketingAnalyticsCampaignObjective,
  MarketingAnalyticsPerformanceLevel,
  MarketingAnalyticsEngagementLevel,
  MarketingAnalyticsSentimentType,
  getMarketingAnalyticsAnalysisTypeLabel,
  getMarketingAnalyticsDataTypeLabel,
  getMarketingAnalyticsCampaignTypeLabel,
  getMarketingAnalyticsMarketingChannelLabel,
  getMarketingAnalyticsCampaignStatusLabel,
  getMarketingAnalyticsCampaignObjectiveLabel,
  getMarketingAnalyticsPerformanceLevelLabel,
  getMarketingAnalyticsEngagementLevelLabel,
  getMarketingAnalyticsSentimentTypeLabel,
  isMarketingAnalyticsCampaignAnalysis,
  isMarketingAnalyticsDigitalMarketing,
  isMarketingAnalyticsBrandAnalysis,
  getMarketingAnalyticsPerformanceLevel,
  getMarketingAnalyticsEngagementLevel,
  getMarketingAnalyticsSentimentType,
  // Marketing Analytics Metric
  MARKETING_ANALYTICS_METRIC,
  MarketingAnalyticsCountMetric,
  MarketingAnalyticsReachMetric,
  MarketingAnalyticsEngagementMetric,
  MarketingAnalyticsConversionMetric,
  MarketingAnalyticsROIMetric,
  MarketingAnalyticsBrandMetric,
  MarketingAnalyticsCustomerMetric,
  MarketingAnalyticsChannelMetric,
  MarketingAnalyticsTimeMetric,
  MarketingAnalyticsComparisonMetric,
  MarketingAnalyticsMetricCategory,
  MarketingAnalyticsMetricType,
  MarketingAnalyticsMetricFormat,
  MarketingAnalyticsMetricPriority,
  getMarketingAnalyticsMetricLabel,
  getMarketingAnalyticsMetricCategoryLabel,
  getMarketingAnalyticsMetricTypeLabel,
  getMarketingAnalyticsMetricFormatLabel,
  getMarketingAnalyticsMetricPriorityLabel,
  getMarketingAnalyticsMetricCategory,
  getMarketingAnalyticsMetricType,
  getMarketingAnalyticsMetricFormat,
  calculateMarketingAnalyticsROI,
  calculateMarketingAnalyticsROAS,
  calculateMarketingAnalyticsConversionRate,
  calculateMarketingAnalyticsEngagementRate,
  calculateMarketingAnalyticsCTR,
  calculateMarketingAnalyticsRetentionRate,
  calculateMarketingAnalyticsChurnRate,
  calculateMarketingAnalyticsNPS,
};
