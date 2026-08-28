/**
 * Support Analytics Types
 * Type definitions for support analytics based on shared-constants
 * @module SupportAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support analytics
// ============================================================
import {
  // Main Analytics Constants
  SUPPORT_ANALYTICS,
  SupportAnalyticsType,
  SupportAnalyticsStatus,
  SupportAnalyticsScope,
  SupportAnalyticsEvent,
  SupportAnalyticsDimension,
  SupportAnalyticsMetric,
  SupportAnalyticsSegment,
  SupportAnalyticsCohort,
  SupportAnalyticsGranularity,
  getSupportAnalyticsStatusLabel,
  getSupportAnalyticsEventLabel,
  getSupportAnalyticsDimensionLabel,
  getSupportAnalyticsSegmentLabel,
  getSupportAnalyticsCohortLabel,
  getSupportAnalyticsGranularityLabel,
  isSupportAnalyticsActive,
  isSupportAnalyticsCompleted,
  isSupportAnalyticsFailed,
  isSupportAnalyticsTicketEvent,
  isSupportAnalyticsAgentEvent,
  isSupportAnalyticsSatisfactionEvent,
  // Analytics Type Constants
  SUPPORT_ANALYTICS_TYPE,
  SupportAnalyticsAnalysisType,
  SupportAnalyticsDataType,
  SupportAnalyticsTicketStatus,
  SupportAnalyticsTicketPriority,
  SupportAnalyticsTicketType,
  SupportAnalyticsTicketCategory,
  SupportAnalyticsSupportChannel,
  SupportAnalyticsAgentRole,
  SupportAnalyticsResolutionType,
  SupportAnalyticsSatisfactionLevel,
  SupportAnalyticsQualityLevel,
  getSupportAnalyticsAnalysisTypeLabel,
  getSupportAnalyticsDataTypeLabel,
  getSupportAnalyticsTicketStatusLabel,
  getSupportAnalyticsTicketPriorityLabel,
  getSupportAnalyticsTicketTypeLabel,
  getSupportAnalyticsTicketCategoryLabel,
  getSupportAnalyticsSupportChannelLabel,
  getSupportAnalyticsAgentRoleLabel,
  getSupportAnalyticsResolutionTypeLabel,
  getSupportAnalyticsSatisfactionLevelLabel,
  getSupportAnalyticsQualityLevelLabel,
  isSupportAnalyticsTicketAnalysis,
  isSupportAnalyticsAgentAnalysis,
  isSupportAnalyticsComparative,
  isSupportAnalyticsPredictive,
  getSupportAnalyticsQualityLevel,
  getSupportAnalyticsSatisfactionLevel,
  // Analytics Metric Constants
  SUPPORT_ANALYTICS_METRIC,
  SupportAnalyticsCountMetric,
  SupportAnalyticsVolumeMetric,
  SupportAnalyticsResponseTimeMetric,
  SupportAnalyticsResolutionTimeMetric,
  SupportAnalyticsAgentMetric,
  SupportAnalyticsQualityMetric,
  SupportAnalyticsSatisfactionMetric,
  SupportAnalyticsComparisonMetric,
  SupportAnalyticsMetricCategory,
  SupportAnalyticsMetricType,
  SupportAnalyticsMetricFormat,
  SupportAnalyticsMetricPriority,
  getSupportAnalyticsMetricLabel,
  getSupportAnalyticsMetricCategoryLabel,
  getSupportAnalyticsMetricTypeLabel,
  getSupportAnalyticsMetricFormatLabel,
  getSupportAnalyticsMetricPriorityLabel,
  getSupportAnalyticsMetricCategory,
  getSupportAnalyticsMetricType,
  getSupportAnalyticsMetricFormat,
  calculateSupportAnalyticsAvgResponseTime,
  calculateSupportAnalyticsResolutionRate,
  calculateSupportAnalyticsFirstContactResolution,
  calculateSupportAnalyticsCSAT,
  calculateSupportAnalyticsNPS,
  calculateSupportAnalyticsCES,
  calculateSupportAnalyticsAgentProductivity,
  calculateSupportAnalyticsAgentEfficiency,
} from '@vubon/shared-constants';

// ============================================================
// Support Analytics Extended Types
// ============================================================

/**
 * Support analytics
 */
export interface SupportAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: SupportAnalyticsType;
  status: SupportAnalyticsStatus;
  scope: SupportAnalyticsScope;
  event: SupportAnalyticsEvent;
  dimension: SupportAnalyticsDimension;
  metric: SupportAnalyticsMetric;
  segment: SupportAnalyticsSegment;
  cohort: SupportAnalyticsCohort;
  granularity: SupportAnalyticsGranularity;
  analysisType: SupportAnalyticsAnalysisType;
  dataType: SupportAnalyticsDataType;
  ticketStatus: SupportAnalyticsTicketStatus;
  ticketPriority: SupportAnalyticsTicketPriority;
  ticketType: SupportAnalyticsTicketType;
  ticketCategory: SupportAnalyticsTicketCategory;
  supportChannel: SupportAnalyticsSupportChannel;
  agentRole: SupportAnalyticsAgentRole;
  resolutionType: SupportAnalyticsResolutionType;
  satisfactionLevel: SupportAnalyticsSatisfactionLevel;
  qualityLevel: SupportAnalyticsQualityLevel;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isTicketEvent: boolean;
  isAgentEvent: boolean;
  isSatisfactionEvent: boolean;
  isTicketAnalysis: boolean;
  isAgentAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Support analytics filter
 */
export interface SupportAnalyticsFilter {
  types?: SupportAnalyticsType[];
  statuses?: SupportAnalyticsStatus[];
  scopes?: SupportAnalyticsScope[];
  events?: SupportAnalyticsEvent[];
  dimensions?: SupportAnalyticsDimension[];
  metrics?: SupportAnalyticsMetric[];
  segments?: SupportAnalyticsSegment[];
  cohorts?: SupportAnalyticsCohort[];
  granularities?: SupportAnalyticsGranularity[];
  analysisTypes?: SupportAnalyticsAnalysisType[];
  dataTypes?: SupportAnalyticsDataType[];
  ticketStatuses?: SupportAnalyticsTicketStatus[];
  ticketPriorities?: SupportAnalyticsTicketPriority[];
  ticketTypes?: SupportAnalyticsTicketType[];
  ticketCategories?: SupportAnalyticsTicketCategory[];
  supportChannels?: SupportAnalyticsSupportChannel[];
  agentRoles?: SupportAnalyticsAgentRole[];
  resolutionTypes?: SupportAnalyticsResolutionType[];
  satisfactionLevels?: SupportAnalyticsSatisfactionLevel[];
  qualityLevels?: SupportAnalyticsQualityLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isTicketEvent?: boolean;
  isAgentEvent?: boolean;
  isSatisfactionEvent?: boolean;
  isTicketAnalysis?: boolean;
  isAgentAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Support analytics statistics
 */
export interface SupportAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  ticketEvents: number;
  agentEvents: number;
  satisfactionEvents: number;
  ticketAnalyses: number;
  agentAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<SupportAnalyticsType, number>;
  byStatus: Record<SupportAnalyticsStatus, number>;
  byEvent: Record<SupportAnalyticsEvent, number>;
  byMetric: Record<SupportAnalyticsMetric, number>;
  bySegment: Record<SupportAnalyticsSegment, number>;
  byCohort: Record<SupportAnalyticsCohort, number>;
  byGranularity: Record<SupportAnalyticsGranularity, number>;
  byTicketStatus: Record<SupportAnalyticsTicketStatus, number>;
  byTicketPriority: Record<SupportAnalyticsTicketPriority, number>;
  byTicketType: Record<SupportAnalyticsTicketType, number>;
  byTicketCategory: Record<SupportAnalyticsTicketCategory, number>;
  bySupportChannel: Record<SupportAnalyticsSupportChannel, number>;
  byAgentRole: Record<SupportAnalyticsAgentRole, number>;
  byResolutionType: Record<SupportAnalyticsResolutionType, number>;
  bySatisfactionLevel: Record<SupportAnalyticsSatisfactionLevel, number>;
  byQualityLevel: Record<SupportAnalyticsQualityLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: SupportAnalyticsEvent;
  mostFrequentMetric: SupportAnalyticsMetric;
  mostFrequentSegment: SupportAnalyticsSegment;
}

/**
 * Support analytics summary
 */
export interface SupportAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  ticketEvents: number;
  agentEvents: number;
  satisfactionEvents: number;
  ticket: number;
  agent: number;
  comparative: number;
  predictive: number;
  byType: Record<SupportAnalyticsType, number>;
  byStatus: Record<SupportAnalyticsStatus, number>;
  byEvent: Record<SupportAnalyticsEvent, number>;
  byMetric: Record<SupportAnalyticsMetric, number>;
  bySegment: Record<SupportAnalyticsSegment, number>;
  byCohort: Record<SupportAnalyticsCohort, number>;
  byGranularity: Record<SupportAnalyticsGranularity, number>;
  byTicketStatus: Record<SupportAnalyticsTicketStatus, number>;
  byTicketPriority: Record<SupportAnalyticsTicketPriority, number>;
  byTicketType: Record<SupportAnalyticsTicketType, number>;
  byTicketCategory: Record<SupportAnalyticsTicketCategory, number>;
  bySupportChannel: Record<SupportAnalyticsSupportChannel, number>;
  byAgentRole: Record<SupportAnalyticsAgentRole, number>;
  byResolutionType: Record<SupportAnalyticsResolutionType, number>;
  bySatisfactionLevel: Record<SupportAnalyticsSatisfactionLevel, number>;
  byQualityLevel: Record<SupportAnalyticsQualityLevel, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: SupportAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: SupportAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topTicketStatuses: {
    status: SupportAnalyticsTicketStatus;
    count: number;
    label: string;
  }[];
  topSupportChannels: {
    channel: SupportAnalyticsSupportChannel;
    count: number;
    label: string;
  }[];
}

/**
 * Support analytics configuration
 */
export interface SupportAnalyticsConfiguration {
  enabled: boolean;
  defaultType: SupportAnalyticsType;
  defaultScope: SupportAnalyticsScope;
  defaultGranularity: SupportAnalyticsGranularity;
  trackTicketEvents: boolean;
  trackAgentEvents: boolean;
  trackSatisfactionEvents: boolean;
  trackTicketAnalysis: boolean;
  trackAgentAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: SupportAnalyticsAlertConfig;
}

/**
 * Support analytics alert configuration
 */
export interface SupportAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  failedAnalyticsAlert: boolean;
  lowSatisfactionAlert: boolean;
  lowSatisfactionThreshold: number;
  highResponseTimeAlert: boolean;
  highResponseTimeThreshold: number;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
}

/**
 * Support analytics history
 */
export interface SupportAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Support analytics data point
 */
export interface SupportAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: SupportAnalyticsEvent;
  dimension: SupportAnalyticsDimension;
  metric: SupportAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Support analytics export
 */
export interface SupportAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportAnalyticsFilter;
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
  // Main Analytics Constants
  SUPPORT_ANALYTICS,
  SupportAnalyticsType,
  SupportAnalyticsStatus,
  SupportAnalyticsScope,
  SupportAnalyticsEvent,
  SupportAnalyticsDimension,
  SupportAnalyticsMetric,
  SupportAnalyticsSegment,
  SupportAnalyticsCohort,
  SupportAnalyticsGranularity,
  getSupportAnalyticsStatusLabel,
  getSupportAnalyticsEventLabel,
  getSupportAnalyticsDimensionLabel,
  getSupportAnalyticsSegmentLabel,
  getSupportAnalyticsCohortLabel,
  getSupportAnalyticsGranularityLabel,
  isSupportAnalyticsActive,
  isSupportAnalyticsCompleted,
  isSupportAnalyticsFailed,
  isSupportAnalyticsTicketEvent,
  isSupportAnalyticsAgentEvent,
  isSupportAnalyticsSatisfactionEvent,
  // Analytics Type Constants
  SUPPORT_ANALYTICS_TYPE,
  SupportAnalyticsAnalysisType,
  SupportAnalyticsDataType,
  SupportAnalyticsTicketStatus,
  SupportAnalyticsTicketPriority,
  SupportAnalyticsTicketType,
  SupportAnalyticsTicketCategory,
  SupportAnalyticsSupportChannel,
  SupportAnalyticsAgentRole,
  SupportAnalyticsResolutionType,
  SupportAnalyticsSatisfactionLevel,
  SupportAnalyticsQualityLevel,
  getSupportAnalyticsAnalysisTypeLabel,
  getSupportAnalyticsDataTypeLabel,
  getSupportAnalyticsTicketStatusLabel,
  getSupportAnalyticsTicketPriorityLabel,
  getSupportAnalyticsTicketTypeLabel,
  getSupportAnalyticsTicketCategoryLabel,
  getSupportAnalyticsSupportChannelLabel,
  getSupportAnalyticsAgentRoleLabel,
  getSupportAnalyticsResolutionTypeLabel,
  getSupportAnalyticsSatisfactionLevelLabel,
  getSupportAnalyticsQualityLevelLabel,
  isSupportAnalyticsTicketAnalysis,
  isSupportAnalyticsAgentAnalysis,
  isSupportAnalyticsComparative,
  isSupportAnalyticsPredictive,
  getSupportAnalyticsQualityLevel,
  getSupportAnalyticsSatisfactionLevel,
  // Analytics Metric Constants
  SUPPORT_ANALYTICS_METRIC,
  SupportAnalyticsCountMetric,
  SupportAnalyticsVolumeMetric,
  SupportAnalyticsResponseTimeMetric,
  SupportAnalyticsResolutionTimeMetric,
  SupportAnalyticsAgentMetric,
  SupportAnalyticsQualityMetric,
  SupportAnalyticsSatisfactionMetric,
  SupportAnalyticsComparisonMetric,
  SupportAnalyticsMetricCategory,
  SupportAnalyticsMetricType,
  SupportAnalyticsMetricFormat,
  SupportAnalyticsMetricPriority,
  getSupportAnalyticsMetricLabel,
  getSupportAnalyticsMetricCategoryLabel,
  getSupportAnalyticsMetricTypeLabel,
  getSupportAnalyticsMetricFormatLabel,
  getSupportAnalyticsMetricPriorityLabel,
  getSupportAnalyticsMetricCategory,
  getSupportAnalyticsMetricType,
  getSupportAnalyticsMetricFormat,
  calculateSupportAnalyticsAvgResponseTime,
  calculateSupportAnalyticsResolutionRate,
  calculateSupportAnalyticsFirstContactResolution,
  calculateSupportAnalyticsCSAT,
  calculateSupportAnalyticsNPS,
  calculateSupportAnalyticsCES,
  calculateSupportAnalyticsAgentProductivity,
  calculateSupportAnalyticsAgentEfficiency,
};
