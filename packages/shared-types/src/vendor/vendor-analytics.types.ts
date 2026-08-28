/**
 * Vendor Analytics Types
 * Type definitions for vendor analytics based on shared-constants
 * @module VendorAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor analytics
// ============================================================
import {
  // Main Analytics Constants
  VENDOR_ANALYTICS,
  VendorAnalyticsType,
  VendorAnalyticsStatus,
  VendorAnalyticsScope,
  VendorAnalyticsEvent,
  VendorAnalyticsDimension,
  VendorAnalyticsMetric,
  VendorAnalyticsSegment,
  VendorAnalyticsCohort,
  VendorAnalyticsGranularity,
  getVendorAnalyticsStatusLabel,
  getVendorAnalyticsEventLabel,
  getVendorAnalyticsDimensionLabel,
  getVendorAnalyticsSegmentLabel,
  getVendorAnalyticsCohortLabel,
  getVendorAnalyticsGranularityLabel,
  isVendorAnalyticsActive,
  isVendorAnalyticsCompleted,
  isVendorAnalyticsFailed,
  isVendorAnalyticsLifecycleEvent,
  isVendorAnalyticsFinancialEvent,
  isVendorAnalyticsQualityEvent,
  isVendorAnalyticsComplianceEvent,
  // Analytics Type Constants
  VENDOR_ANALYTICS_TYPE,
  VendorAnalyticsAnalysisType,
  VendorAnalyticsDataType,
  VendorAnalyticsVendorStatus,
  VendorAnalyticsVendorType,
  VendorAnalyticsVendorTier,
  VendorAnalyticsPerformanceLevel,
  VendorAnalyticsComplianceLevel,
  VendorAnalyticsRiskLevel,
  VendorAnalyticsSatisfactionLevel,
  VendorAnalyticsRelationshipStatus,
  getVendorAnalyticsAnalysisTypeLabel,
  getVendorAnalyticsDataTypeLabel,
  getVendorAnalyticsVendorStatusLabel,
  getVendorAnalyticsVendorTypeLabel,
  getVendorAnalyticsVendorTierLabel,
  getVendorAnalyticsPerformanceLevelLabel,
  getVendorAnalyticsComplianceLevelLabel,
  getVendorAnalyticsRiskLevelLabel,
  getVendorAnalyticsSatisfactionLevelLabel,
  getVendorAnalyticsRelationshipStatusLabel,
  isVendorAnalyticsPerformanceAnalysis,
  isVendorAnalyticsComparative,
  isVendorAnalyticsPredictive,
  getVendorAnalyticsPerformanceLevel,
  getVendorAnalyticsComplianceLevel,
  getVendorAnalyticsRiskLevel,
  // Analytics Metric Constants
  VENDOR_ANALYTICS_METRIC,
  VendorAnalyticsCountMetric,
  VendorAnalyticsRevenueMetric,
  VendorAnalyticsSalesMetric,
  VendorAnalyticsProfitMetric,
  VendorAnalyticsCommissionMetric,
  VendorAnalyticsQualityMetric,
  VendorAnalyticsComplianceMetric,
  VendorAnalyticsPerformanceMetric,
  VendorAnalyticsRelationshipMetric,
  VendorAnalyticsComparisonMetric,
  VendorAnalyticsMetricCategory,
  VendorAnalyticsMetricType,
  VendorAnalyticsMetricFormat,
  VendorAnalyticsMetricPriority,
  getVendorAnalyticsMetricLabel,
  getVendorAnalyticsMetricCategoryLabel,
  getVendorAnalyticsMetricTypeLabel,
  getVendorAnalyticsMetricFormatLabel,
  getVendorAnalyticsMetricPriorityLabel,
  getVendorAnalyticsMetricCategory,
  getVendorAnalyticsMetricType,
  getVendorAnalyticsMetricFormat,
  calculateVendorAnalyticsRetentionRate,
  calculateVendorAnalyticsChurnRate,
  calculateVendorAnalyticsConversionRate,
  calculateVendorAnalyticsComplianceRate,
  calculateVendorAnalyticsQualityScore,
  calculateVendorAnalyticsFulfillmentRate,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Analytics Extended Types
// ============================================================

/**
 * Vendor analytics
 */
export interface VendorAnalytics extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  type: VendorAnalyticsType;
  status: VendorAnalyticsStatus;
  scope: VendorAnalyticsScope;
  event: VendorAnalyticsEvent;
  dimension: VendorAnalyticsDimension;
  metric: VendorAnalyticsMetric;
  segment: VendorAnalyticsSegment;
  cohort: VendorAnalyticsCohort;
  granularity: VendorAnalyticsGranularity;
  analysisType: VendorAnalyticsAnalysisType;
  dataType: VendorAnalyticsDataType;
  vendorStatus: VendorAnalyticsVendorStatus;
  vendorType: VendorAnalyticsVendorType;
  vendorTier: VendorAnalyticsVendorTier;
  performanceLevel: VendorAnalyticsPerformanceLevel;
  complianceLevel: VendorAnalyticsComplianceLevel;
  riskLevel: VendorAnalyticsRiskLevel;
  satisfactionLevel: VendorAnalyticsSatisfactionLevel;
  relationshipStatus: VendorAnalyticsRelationshipStatus;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isLifecycleEvent: boolean;
  isFinancialEvent: boolean;
  isQualityEvent: boolean;
  isComplianceEvent: boolean;
  isPerformanceAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Vendor analytics filter
 */
export interface VendorAnalyticsFilter {
  vendorIds?: ID[];
  types?: VendorAnalyticsType[];
  statuses?: VendorAnalyticsStatus[];
  scopes?: VendorAnalyticsScope[];
  events?: VendorAnalyticsEvent[];
  dimensions?: VendorAnalyticsDimension[];
  metrics?: VendorAnalyticsMetric[];
  segments?: VendorAnalyticsSegment[];
  cohorts?: VendorAnalyticsCohort[];
  granularities?: VendorAnalyticsGranularity[];
  analysisTypes?: VendorAnalyticsAnalysisType[];
  dataTypes?: VendorAnalyticsDataType[];
  vendorStatuses?: VendorAnalyticsVendorStatus[];
  vendorTypes?: VendorAnalyticsVendorType[];
  vendorTiers?: VendorAnalyticsVendorTier[];
  performanceLevels?: VendorAnalyticsPerformanceLevel[];
  complianceLevels?: VendorAnalyticsComplianceLevel[];
  riskLevels?: VendorAnalyticsRiskLevel[];
  satisfactionLevels?: VendorAnalyticsSatisfactionLevel[];
  relationshipStatuses?: VendorAnalyticsRelationshipStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isLifecycleEvent?: boolean;
  isFinancialEvent?: boolean;
  isQualityEvent?: boolean;
  isComplianceEvent?: boolean;
  isPerformanceAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Vendor analytics statistics
 */
export interface VendorAnalyticsStatistics {
  vendorId: ID;
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  lifecycleEvents: number;
  financialEvents: number;
  qualityEvents: number;
  complianceEvents: number;
  performanceAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<VendorAnalyticsType, number>;
  byStatus: Record<VendorAnalyticsStatus, number>;
  byEvent: Record<VendorAnalyticsEvent, number>;
  byMetric: Record<VendorAnalyticsMetric, number>;
  bySegment: Record<VendorAnalyticsSegment, number>;
  byCohort: Record<VendorAnalyticsCohort, number>;
  byGranularity: Record<VendorAnalyticsGranularity, number>;
  byVendorStatus: Record<VendorAnalyticsVendorStatus, number>;
  byVendorType: Record<VendorAnalyticsVendorType, number>;
  byVendorTier: Record<VendorAnalyticsVendorTier, number>;
  byPerformanceLevel: Record<VendorAnalyticsPerformanceLevel, number>;
  byComplianceLevel: Record<VendorAnalyticsComplianceLevel, number>;
  byRiskLevel: Record<VendorAnalyticsRiskLevel, number>;
  bySatisfactionLevel: Record<VendorAnalyticsSatisfactionLevel, number>;
  byRelationshipStatus: Record<VendorAnalyticsRelationshipStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: VendorAnalyticsEvent;
  mostFrequentMetric: VendorAnalyticsMetric;
  mostFrequentSegment: VendorAnalyticsSegment;
}

/**
 * Vendor analytics summary
 */
export interface VendorAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  lifecycleEvents: number;
  financialEvents: number;
  qualityEvents: number;
  complianceEvents: number;
  performance: number;
  comparative: number;
  predictive: number;
  byType: Record<VendorAnalyticsType, number>;
  byStatus: Record<VendorAnalyticsStatus, number>;
  byEvent: Record<VendorAnalyticsEvent, number>;
  byMetric: Record<VendorAnalyticsMetric, number>;
  bySegment: Record<VendorAnalyticsSegment, number>;
  byCohort: Record<VendorAnalyticsCohort, number>;
  byGranularity: Record<VendorAnalyticsGranularity, number>;
  byVendorStatus: Record<VendorAnalyticsVendorStatus, number>;
  byVendorType: Record<VendorAnalyticsVendorType, number>;
  byVendorTier: Record<VendorAnalyticsVendorTier, number>;
  byPerformanceLevel: Record<VendorAnalyticsPerformanceLevel, number>;
  byComplianceLevel: Record<VendorAnalyticsComplianceLevel, number>;
  byRiskLevel: Record<VendorAnalyticsRiskLevel, number>;
  bySatisfactionLevel: Record<VendorAnalyticsSatisfactionLevel, number>;
  byRelationshipStatus: Record<VendorAnalyticsRelationshipStatus, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: VendorAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: VendorAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topVendorStatuses: {
    status: VendorAnalyticsVendorStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Vendor analytics configuration
 */
export interface VendorAnalyticsConfiguration {
  enabled: boolean;
  defaultType: VendorAnalyticsType;
  defaultScope: VendorAnalyticsScope;
  defaultGranularity: VendorAnalyticsGranularity;
  trackLifecycleEvents: boolean;
  trackFinancialEvents: boolean;
  trackQualityEvents: boolean;
  trackComplianceEvents: boolean;
  trackPerformanceAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: VendorAnalyticsAlertConfig;
}

/**
 * Vendor analytics alert configuration
 */
export interface VendorAnalyticsAlertConfig {
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
 * Vendor analytics history
 */
export interface VendorAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  vendorId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor analytics data point
 */
export interface VendorAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  analyticsId: ID;
  event: VendorAnalyticsEvent;
  dimension: VendorAnalyticsDimension;
  metric: VendorAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Vendor analytics export
 */
export interface VendorAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorAnalyticsFilter;
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
  VENDOR_ANALYTICS,
  VendorAnalyticsType,
  VendorAnalyticsStatus,
  VendorAnalyticsScope,
  VendorAnalyticsEvent,
  VendorAnalyticsDimension,
  VendorAnalyticsMetric,
  VendorAnalyticsSegment,
  VendorAnalyticsCohort,
  VendorAnalyticsGranularity,
  getVendorAnalyticsStatusLabel,
  getVendorAnalyticsEventLabel,
  getVendorAnalyticsDimensionLabel,
  getVendorAnalyticsSegmentLabel,
  getVendorAnalyticsCohortLabel,
  getVendorAnalyticsGranularityLabel,
  isVendorAnalyticsActive,
  isVendorAnalyticsCompleted,
  isVendorAnalyticsFailed,
  isVendorAnalyticsLifecycleEvent,
  isVendorAnalyticsFinancialEvent,
  isVendorAnalyticsQualityEvent,
  isVendorAnalyticsComplianceEvent,
  // Analytics Type Constants
  VENDOR_ANALYTICS_TYPE,
  VendorAnalyticsAnalysisType,
  VendorAnalyticsDataType,
  VendorAnalyticsVendorStatus,
  VendorAnalyticsVendorType,
  VendorAnalyticsVendorTier,
  VendorAnalyticsPerformanceLevel,
  VendorAnalyticsComplianceLevel,
  VendorAnalyticsRiskLevel,
  VendorAnalyticsSatisfactionLevel,
  VendorAnalyticsRelationshipStatus,
  getVendorAnalyticsAnalysisTypeLabel,
  getVendorAnalyticsDataTypeLabel,
  getVendorAnalyticsVendorStatusLabel,
  getVendorAnalyticsVendorTypeLabel,
  getVendorAnalyticsVendorTierLabel,
  getVendorAnalyticsPerformanceLevelLabel,
  getVendorAnalyticsComplianceLevelLabel,
  getVendorAnalyticsRiskLevelLabel,
  getVendorAnalyticsSatisfactionLevelLabel,
  getVendorAnalyticsRelationshipStatusLabel,
  isVendorAnalyticsPerformanceAnalysis,
  isVendorAnalyticsComparative,
  isVendorAnalyticsPredictive,
  getVendorAnalyticsPerformanceLevel,
  getVendorAnalyticsComplianceLevel,
  getVendorAnalyticsRiskLevel,
  // Analytics Metric Constants
  VENDOR_ANALYTICS_METRIC,
  VendorAnalyticsCountMetric,
  VendorAnalyticsRevenueMetric,
  VendorAnalyticsSalesMetric,
  VendorAnalyticsProfitMetric,
  VendorAnalyticsCommissionMetric,
  VendorAnalyticsQualityMetric,
  VendorAnalyticsComplianceMetric,
  VendorAnalyticsPerformanceMetric,
  VendorAnalyticsRelationshipMetric,
  VendorAnalyticsComparisonMetric,
  VendorAnalyticsMetricCategory,
  VendorAnalyticsMetricType,
  VendorAnalyticsMetricFormat,
  VendorAnalyticsMetricPriority,
  getVendorAnalyticsMetricLabel,
  getVendorAnalyticsMetricCategoryLabel,
  getVendorAnalyticsMetricTypeLabel,
  getVendorAnalyticsMetricFormatLabel,
  getVendorAnalyticsMetricPriorityLabel,
  getVendorAnalyticsMetricCategory,
  getVendorAnalyticsMetricType,
  getVendorAnalyticsMetricFormat,
  calculateVendorAnalyticsRetentionRate,
  calculateVendorAnalyticsChurnRate,
  calculateVendorAnalyticsConversionRate,
  calculateVendorAnalyticsComplianceRate,
  calculateVendorAnalyticsQualityScore,
  calculateVendorAnalyticsFulfillmentRate,
};
