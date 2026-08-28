/**
 * Customer Analytics Types
 * Type definitions for customer analytics based on shared-constants
 * @module CustomerAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants customer analytics
// ============================================================
import {
  // Main Customer Analytics Constants
  CUSTOMER_ANALYTICS,
  CustomerAnalyticsType,
  CustomerAnalyticsStatus,
  CustomerAnalyticsScope,
  CustomerAnalyticsEvent,
  CustomerAnalyticsDimension,
  CustomerAnalyticsMetric,
  CustomerAnalyticsSegment,
  CustomerAnalyticsCohort,
  CustomerAnalyticsGranularity,
  getCustomerAnalyticsStatusLabel,
  getCustomerAnalyticsEventLabel,
  getCustomerAnalyticsDimensionLabel,
  getCustomerAnalyticsSegmentLabel,
  getCustomerAnalyticsCohortLabel,
  getCustomerAnalyticsGranularityLabel,
  isCustomerAnalyticsActive,
  isCustomerAnalyticsCompleted,
  isCustomerAnalyticsFailed,
  isCustomerAnalyticsLifecycleEvent,
  isCustomerAnalyticsBehaviorEvent,
  isCustomerAnalyticsPurchaseEvent,
  // Customer Analytics Type Constants
  CUSTOMER_ANALYTICS_TYPE,
  CustomerAnalyticsAnalysisType,
  CustomerAnalyticsDataType,
  CustomerAnalyticsCustomerStatus,
  CustomerAnalyticsCustomerType,
  CustomerAnalyticsCustomerTier,
  CustomerAnalyticsCustomerPersona,
  CustomerAnalyticsEngagementLevel,
  CustomerAnalyticsLoyaltyLevel,
  CustomerAnalyticsSatisfactionLevel,
  CustomerAnalyticsNPSCategory,
  CustomerAnalyticsLifecycleStage,
  getCustomerAnalyticsAnalysisTypeLabel,
  getCustomerAnalyticsDataTypeLabel,
  getCustomerAnalyticsCustomerStatusLabel,
  getCustomerAnalyticsCustomerTypeLabel,
  getCustomerAnalyticsCustomerTierLabel,
  getCustomerAnalyticsCustomerPersonaLabel,
  getCustomerAnalyticsEngagementLevelLabel,
  getCustomerAnalyticsLoyaltyLevelLabel,
  getCustomerAnalyticsSatisfactionLevelLabel,
  getCustomerAnalyticsNPSCategoryLabel,
  getCustomerAnalyticsLifecycleStageLabel,
  isCustomerAnalyticsBehavioralAnalysis,
  isCustomerAnalyticsValueAnalysis,
  isCustomerAnalyticsRetentionAnalysis,
  isCustomerAnalyticsComparative,
  isCustomerAnalyticsPredictive,
  getCustomerAnalyticsEngagementLevel,
  getCustomerAnalyticsLoyaltyLevel,
  getCustomerAnalyticsSatisfactionLevel,
  getCustomerAnalyticsNPSCategory,
  // Customer Analytics Metric Constants
  CUSTOMER_ANALYTICS_METRIC,
  CustomerAnalyticsCountMetric,
  CustomerAnalyticsAcquisitionMetric,
  CustomerAnalyticsRetentionMetric,
  CustomerAnalyticsValueMetric,
  CustomerAnalyticsEngagementMetric,
  CustomerAnalyticsGrowthMetric,
  CustomerAnalyticsComparisonMetric,
  CustomerAnalyticsMetricCategory,
  CustomerAnalyticsMetricType,
  CustomerAnalyticsMetricFormat,
  CustomerAnalyticsMetricPriority,
  getCustomerAnalyticsMetricLabel,
  getCustomerAnalyticsMetricCategoryLabel,
  getCustomerAnalyticsMetricTypeLabel,
  getCustomerAnalyticsMetricFormatLabel,
  getCustomerAnalyticsMetricPriorityLabel,
  getCustomerAnalyticsMetricCategory,
  getCustomerAnalyticsMetricType,
  getCustomerAnalyticsMetricFormat,
  calculateCustomerAnalyticsRetentionRate,
  calculateCustomerAnalyticsChurnRate,
  calculateCustomerAnalyticsLifetimeValue,
  calculateCustomerAnalyticsAverageOrderValue,
  calculateCustomerAnalyticsPurchaseFrequency,
  calculateCustomerAnalyticsRepeatPurchaseRate,
  calculateCustomerAnalyticsNPS,
  calculateCustomerAnalyticsCAC,
} from '@vubon/shared-constants';

// ============================================================
// Customer Analytics Extended Types
// ============================================================

/**
 * Customer analytics
 */
export interface CustomerAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: CustomerAnalyticsType;
  status: CustomerAnalyticsStatus;
  scope: CustomerAnalyticsScope;
  event: CustomerAnalyticsEvent;
  dimension: CustomerAnalyticsDimension;
  metric: CustomerAnalyticsMetric;
  segment: CustomerAnalyticsSegment;
  cohort: CustomerAnalyticsCohort;
  granularity: CustomerAnalyticsGranularity;
  analysisType: CustomerAnalyticsAnalysisType;
  dataType: CustomerAnalyticsDataType;
  customerStatus: CustomerAnalyticsCustomerStatus;
  customerType: CustomerAnalyticsCustomerType;
  customerTier: CustomerAnalyticsCustomerTier;
  customerPersona: CustomerAnalyticsCustomerPersona;
  engagementLevel: CustomerAnalyticsEngagementLevel;
  loyaltyLevel: CustomerAnalyticsLoyaltyLevel;
  satisfactionLevel: CustomerAnalyticsSatisfactionLevel;
  npsCategory: CustomerAnalyticsNPSCategory;
  lifecycleStage: CustomerAnalyticsLifecycleStage;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isLifecycleEvent: boolean;
  isBehaviorEvent: boolean;
  isPurchaseEvent: boolean;
  isBehavioralAnalysis: boolean;
  isValueAnalysis: boolean;
  isRetentionAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Customer analytics filter
 */
export interface CustomerAnalyticsFilter {
  ids?: ID[];
  types?: CustomerAnalyticsType[];
  statuses?: CustomerAnalyticsStatus[];
  scopes?: CustomerAnalyticsScope[];
  events?: CustomerAnalyticsEvent[];
  dimensions?: CustomerAnalyticsDimension[];
  metrics?: CustomerAnalyticsMetric[];
  segments?: CustomerAnalyticsSegment[];
  cohorts?: CustomerAnalyticsCohort[];
  granularities?: CustomerAnalyticsGranularity[];
  analysisTypes?: CustomerAnalyticsAnalysisType[];
  dataTypes?: CustomerAnalyticsDataType[];
  customerStatuses?: CustomerAnalyticsCustomerStatus[];
  customerTypes?: CustomerAnalyticsCustomerType[];
  customerTiers?: CustomerAnalyticsCustomerTier[];
  customerPersonas?: CustomerAnalyticsCustomerPersona[];
  engagementLevels?: CustomerAnalyticsEngagementLevel[];
  loyaltyLevels?: CustomerAnalyticsLoyaltyLevel[];
  satisfactionLevels?: CustomerAnalyticsSatisfactionLevel[];
  npsCategories?: CustomerAnalyticsNPSCategory[];
  lifecycleStages?: CustomerAnalyticsLifecycleStage[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isLifecycleEvent?: boolean;
  isBehaviorEvent?: boolean;
  isPurchaseEvent?: boolean;
  isBehavioralAnalysis?: boolean;
  isValueAnalysis?: boolean;
  isRetentionAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Customer analytics statistics
 */
export interface CustomerAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  lifecycleEvents: number;
  behaviorEvents: number;
  purchaseEvents: number;
  behavioralAnalyses: number;
  valueAnalyses: number;
  retentionAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<CustomerAnalyticsType, number>;
  byStatus: Record<CustomerAnalyticsStatus, number>;
  byEvent: Record<CustomerAnalyticsEvent, number>;
  byMetric: Record<CustomerAnalyticsMetric, number>;
  bySegment: Record<CustomerAnalyticsSegment, number>;
  byCohort: Record<CustomerAnalyticsCohort, number>;
  byGranularity: Record<CustomerAnalyticsGranularity, number>;
  byCustomerStatus: Record<CustomerAnalyticsCustomerStatus, number>;
  byCustomerType: Record<CustomerAnalyticsCustomerType, number>;
  byCustomerTier: Record<CustomerAnalyticsCustomerTier, number>;
  byCustomerPersona: Record<CustomerAnalyticsCustomerPersona, number>;
  byEngagementLevel: Record<CustomerAnalyticsEngagementLevel, number>;
  byLoyaltyLevel: Record<CustomerAnalyticsLoyaltyLevel, number>;
  bySatisfactionLevel: Record<CustomerAnalyticsSatisfactionLevel, number>;
  byNPSCategory: Record<CustomerAnalyticsNPSCategory, number>;
  byLifecycleStage: Record<CustomerAnalyticsLifecycleStage, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: CustomerAnalyticsEvent;
  mostFrequentMetric: CustomerAnalyticsMetric;
  mostFrequentSegment: CustomerAnalyticsSegment;
}

/**
 * Customer analytics summary
 */
export interface CustomerAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  lifecycleEvents: number;
  behaviorEvents: number;
  purchaseEvents: number;
  behavioralAnalyses: number;
  valueAnalyses: number;
  retentionAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<CustomerAnalyticsType, number>;
  byStatus: Record<CustomerAnalyticsStatus, number>;
  byEvent: Record<CustomerAnalyticsEvent, number>;
  byMetric: Record<CustomerAnalyticsMetric, number>;
  bySegment: Record<CustomerAnalyticsSegment, number>;
  byCohort: Record<CustomerAnalyticsCohort, number>;
  byGranularity: Record<CustomerAnalyticsGranularity, number>;
  byCustomerStatus: Record<CustomerAnalyticsCustomerStatus, number>;
  byCustomerType: Record<CustomerAnalyticsCustomerType, number>;
  byCustomerTier: Record<CustomerAnalyticsCustomerTier, number>;
  byCustomerPersona: Record<CustomerAnalyticsCustomerPersona, number>;
  byEngagementLevel: Record<CustomerAnalyticsEngagementLevel, number>;
  byLoyaltyLevel: Record<CustomerAnalyticsLoyaltyLevel, number>;
  bySatisfactionLevel: Record<CustomerAnalyticsSatisfactionLevel, number>;
  byNPSCategory: Record<CustomerAnalyticsNPSCategory, number>;
  byLifecycleStage: Record<CustomerAnalyticsLifecycleStage, number>;
  customerTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: CustomerAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: CustomerAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topCustomerTypes: {
    type: CustomerAnalyticsCustomerType;
    count: number;
    label: string;
  }[];
  topCustomerTiers: {
    tier: CustomerAnalyticsCustomerTier;
    count: number;
    label: string;
  }[];
}

/**
 * Customer analytics configuration
 */
export interface CustomerAnalyticsConfiguration {
  enabled: boolean;
  defaultType: CustomerAnalyticsType;
  defaultScope: CustomerAnalyticsScope;
  defaultGranularity: CustomerAnalyticsGranularity;
  trackLifecycleEvents: boolean;
  trackBehaviorEvents: boolean;
  trackPurchaseEvents: boolean;
  trackBehavioralAnalysis: boolean;
  trackValueAnalysis: boolean;
  trackRetentionAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: CustomerAnalyticsAlertConfig;
}

/**
 * Customer analytics alert configuration
 */
export interface CustomerAnalyticsAlertConfig {
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
 * Customer analytics history
 */
export interface CustomerAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Customer analytics data point
 */
export interface CustomerAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: CustomerAnalyticsEvent;
  dimension: CustomerAnalyticsDimension;
  metric: CustomerAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Customer analytics export
 */
export interface CustomerAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CustomerAnalyticsFilter;
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
  // Main Customer Analytics Constants
  CUSTOMER_ANALYTICS,
  CustomerAnalyticsType,
  CustomerAnalyticsStatus,
  CustomerAnalyticsScope,
  CustomerAnalyticsEvent,
  CustomerAnalyticsDimension,
  CustomerAnalyticsMetric,
  CustomerAnalyticsSegment,
  CustomerAnalyticsCohort,
  CustomerAnalyticsGranularity,
  getCustomerAnalyticsStatusLabel,
  getCustomerAnalyticsEventLabel,
  getCustomerAnalyticsDimensionLabel,
  getCustomerAnalyticsSegmentLabel,
  getCustomerAnalyticsCohortLabel,
  getCustomerAnalyticsGranularityLabel,
  isCustomerAnalyticsActive,
  isCustomerAnalyticsCompleted,
  isCustomerAnalyticsFailed,
  isCustomerAnalyticsLifecycleEvent,
  isCustomerAnalyticsBehaviorEvent,
  isCustomerAnalyticsPurchaseEvent,
  // Customer Analytics Type Constants
  CUSTOMER_ANALYTICS_TYPE,
  CustomerAnalyticsAnalysisType,
  CustomerAnalyticsDataType,
  CustomerAnalyticsCustomerStatus,
  CustomerAnalyticsCustomerType,
  CustomerAnalyticsCustomerTier,
  CustomerAnalyticsCustomerPersona,
  CustomerAnalyticsEngagementLevel,
  CustomerAnalyticsLoyaltyLevel,
  CustomerAnalyticsSatisfactionLevel,
  CustomerAnalyticsNPSCategory,
  CustomerAnalyticsLifecycleStage,
  getCustomerAnalyticsAnalysisTypeLabel,
  getCustomerAnalyticsDataTypeLabel,
  getCustomerAnalyticsCustomerStatusLabel,
  getCustomerAnalyticsCustomerTypeLabel,
  getCustomerAnalyticsCustomerTierLabel,
  getCustomerAnalyticsCustomerPersonaLabel,
  getCustomerAnalyticsEngagementLevelLabel,
  getCustomerAnalyticsLoyaltyLevelLabel,
  getCustomerAnalyticsSatisfactionLevelLabel,
  getCustomerAnalyticsNPSCategoryLabel,
  getCustomerAnalyticsLifecycleStageLabel,
  isCustomerAnalyticsBehavioralAnalysis,
  isCustomerAnalyticsValueAnalysis,
  isCustomerAnalyticsRetentionAnalysis,
  isCustomerAnalyticsComparative,
  isCustomerAnalyticsPredictive,
  getCustomerAnalyticsEngagementLevel,
  getCustomerAnalyticsLoyaltyLevel,
  getCustomerAnalyticsSatisfactionLevel,
  getCustomerAnalyticsNPSCategory,
  // Customer Analytics Metric Constants
  CUSTOMER_ANALYTICS_METRIC,
  CustomerAnalyticsCountMetric,
  CustomerAnalyticsAcquisitionMetric,
  CustomerAnalyticsRetentionMetric,
  CustomerAnalyticsValueMetric,
  CustomerAnalyticsEngagementMetric,
  CustomerAnalyticsGrowthMetric,
  CustomerAnalyticsComparisonMetric,
  CustomerAnalyticsMetricCategory,
  CustomerAnalyticsMetricType,
  CustomerAnalyticsMetricFormat,
  CustomerAnalyticsMetricPriority,
  getCustomerAnalyticsMetricLabel,
  getCustomerAnalyticsMetricCategoryLabel,
  getCustomerAnalyticsMetricTypeLabel,
  getCustomerAnalyticsMetricFormatLabel,
  getCustomerAnalyticsMetricPriorityLabel,
  getCustomerAnalyticsMetricCategory,
  getCustomerAnalyticsMetricType,
  getCustomerAnalyticsMetricFormat,
  calculateCustomerAnalyticsRetentionRate,
  calculateCustomerAnalyticsChurnRate,
  calculateCustomerAnalyticsLifetimeValue,
  calculateCustomerAnalyticsAverageOrderValue,
  calculateCustomerAnalyticsPurchaseFrequency,
  calculateCustomerAnalyticsRepeatPurchaseRate,
  calculateCustomerAnalyticsNPS,
  calculateCustomerAnalyticsCAC,
};
