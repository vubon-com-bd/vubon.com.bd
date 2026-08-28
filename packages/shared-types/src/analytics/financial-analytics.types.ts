/**
 * Financial Analytics Types
 * Type definitions for financial analytics based on shared-constants
 * @module FinancialAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants financial analytics
// ============================================================
import {
  // Main Financial Analytics Constants
  FINANCIAL_ANALYTICS,
  FinancialAnalyticsType,
  FinancialAnalyticsStatus,
  FinancialAnalyticsScope,
  FinancialAnalyticsEvent,
  FinancialAnalyticsDimension,
  FinancialAnalyticsMetric,
  FinancialAnalyticsSegment,
  FinancialAnalyticsCohort,
  FinancialAnalyticsGranularity,
  getFinancialAnalyticsStatusLabel,
  getFinancialAnalyticsEventLabel,
  getFinancialAnalyticsDimensionLabel,
  getFinancialAnalyticsSegmentLabel,
  getFinancialAnalyticsCohortLabel,
  getFinancialAnalyticsGranularityLabel,
  isFinancialAnalyticsActive,
  isFinancialAnalyticsCompleted,
  isFinancialAnalyticsFailed,
  isFinancialAnalyticsRevenueEvent,
  isFinancialAnalyticsExpenseEvent,
  isFinancialAnalyticsCashFlowEvent,
  // Financial Analytics Type Constants
  FINANCIAL_ANALYTICS_TYPE,
  FinancialAnalyticsAnalysisType,
  FinancialAnalyticsDataType,
  FinancialAnalyticsRevenueType,
  FinancialAnalyticsExpenseType,
  FinancialAnalyticsCashFlowType,
  FinancialAnalyticsFinancialRatio,
  FinancialAnalyticsBudgetType,
  FinancialAnalyticsHealthLevel,
  FinancialAnalyticsRiskLevel,
  FinancialAnalyticsCurrencyType,
  getFinancialAnalyticsAnalysisTypeLabel,
  getFinancialAnalyticsDataTypeLabel,
  getFinancialAnalyticsRevenueTypeLabel,
  getFinancialAnalyticsExpenseTypeLabel,
  getFinancialAnalyticsCashFlowTypeLabel,
  getFinancialAnalyticsFinancialRatioLabel,
  getFinancialAnalyticsBudgetTypeLabel,
  getFinancialAnalyticsHealthLevelLabel,
  getFinancialAnalyticsRiskLevelLabel,
  getFinancialAnalyticsCurrencyTypeLabel,
  isFinancialAnalyticsRevenueAnalysis,
  isFinancialAnalyticsProfitAnalysis,
  isFinancialAnalyticsComparative,
  isFinancialAnalyticsPredictive,
  getFinancialAnalyticsHealthLevel,
  getFinancialAnalyticsRiskLevel,
  // Financial Analytics Metric Constants
  FINANCIAL_ANALYTICS_METRIC,
  FinancialAnalyticsRevenueMetric,
  FinancialAnalyticsProfitMetric,
  FinancialAnalyticsMarginMetric,
  FinancialAnalyticsCostMetric,
  FinancialAnalyticsCashFlowMetric,
  FinancialAnalyticsInvestmentMetric,
  FinancialAnalyticsBudgetMetric,
  FinancialAnalyticsTaxMetric,
  FinancialAnalyticsHealthMetric,
  FinancialAnalyticsComparisonMetric,
  FinancialAnalyticsMetricCategory,
  FinancialAnalyticsMetricType,
  FinancialAnalyticsMetricFormat,
  FinancialAnalyticsMetricPriority,
  getFinancialAnalyticsMetricLabel,
  getFinancialAnalyticsMetricCategoryLabel,
  getFinancialAnalyticsMetricTypeLabel,
  getFinancialAnalyticsMetricFormatLabel,
  getFinancialAnalyticsMetricPriorityLabel,
  getFinancialAnalyticsMetricCategory,
  getFinancialAnalyticsMetricType,
  getFinancialAnalyticsMetricFormat,
  calculateFinancialAnalyticsGrowthRate,
  calculateFinancialAnalyticsMargin,
  calculateFinancialAnalyticsROI,
  calculateFinancialAnalyticsVariance,
  calculateFinancialAnalyticsBudgetUtilization,
  calculateFinancialAnalyticsForecastAccuracy,
  calculateFinancialAnalyticsCurrentRatio,
  calculateFinancialAnalyticsQuickRatio,
  calculateFinancialAnalyticsDebtToEquity,
  calculateFinancialAnalyticsInterestCoverage,
  calculateFinancialAnalyticsWorkingCapital,
} from '@vubon/shared-constants';

// ============================================================
// Financial Analytics Extended Types
// ============================================================

/**
 * Financial analytics
 */
export interface FinancialAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: FinancialAnalyticsType;
  status: FinancialAnalyticsStatus;
  scope: FinancialAnalyticsScope;
  event: FinancialAnalyticsEvent;
  dimension: FinancialAnalyticsDimension;
  metric: FinancialAnalyticsMetric;
  segment: FinancialAnalyticsSegment;
  cohort: FinancialAnalyticsCohort;
  granularity: FinancialAnalyticsGranularity;
  analysisType: FinancialAnalyticsAnalysisType;
  dataType: FinancialAnalyticsDataType;
  revenueType: FinancialAnalyticsRevenueType;
  expenseType: FinancialAnalyticsExpenseType;
  cashFlowType: FinancialAnalyticsCashFlowType;
  financialRatio: FinancialAnalyticsFinancialRatio;
  budgetType: FinancialAnalyticsBudgetType;
  healthLevel: FinancialAnalyticsHealthLevel;
  riskLevel: FinancialAnalyticsRiskLevel;
  currencyType: FinancialAnalyticsCurrencyType;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isRevenueEvent: boolean;
  isExpenseEvent: boolean;
  isCashFlowEvent: boolean;
  isRevenueAnalysis: boolean;
  isProfitAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Financial analytics filter
 */
export interface FinancialAnalyticsFilter {
  ids?: ID[];
  types?: FinancialAnalyticsType[];
  statuses?: FinancialAnalyticsStatus[];
  scopes?: FinancialAnalyticsScope[];
  events?: FinancialAnalyticsEvent[];
  dimensions?: FinancialAnalyticsDimension[];
  metrics?: FinancialAnalyticsMetric[];
  segments?: FinancialAnalyticsSegment[];
  cohorts?: FinancialAnalyticsCohort[];
  granularities?: FinancialAnalyticsGranularity[];
  analysisTypes?: FinancialAnalyticsAnalysisType[];
  dataTypes?: FinancialAnalyticsDataType[];
  revenueTypes?: FinancialAnalyticsRevenueType[];
  expenseTypes?: FinancialAnalyticsExpenseType[];
  cashFlowTypes?: FinancialAnalyticsCashFlowType[];
  financialRatios?: FinancialAnalyticsFinancialRatio[];
  budgetTypes?: FinancialAnalyticsBudgetType[];
  healthLevels?: FinancialAnalyticsHealthLevel[];
  riskLevels?: FinancialAnalyticsRiskLevel[];
  currencyTypes?: FinancialAnalyticsCurrencyType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isRevenueEvent?: boolean;
  isExpenseEvent?: boolean;
  isCashFlowEvent?: boolean;
  isRevenueAnalysis?: boolean;
  isProfitAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Financial analytics statistics
 */
export interface FinancialAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  revenueEvents: number;
  expenseEvents: number;
  cashFlowEvents: number;
  revenueAnalyses: number;
  profitAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<FinancialAnalyticsType, number>;
  byStatus: Record<FinancialAnalyticsStatus, number>;
  byEvent: Record<FinancialAnalyticsEvent, number>;
  byMetric: Record<FinancialAnalyticsMetric, number>;
  bySegment: Record<FinancialAnalyticsSegment, number>;
  byCohort: Record<FinancialAnalyticsCohort, number>;
  byGranularity: Record<FinancialAnalyticsGranularity, number>;
  byRevenueType: Record<FinancialAnalyticsRevenueType, number>;
  byExpenseType: Record<FinancialAnalyticsExpenseType, number>;
  byCashFlowType: Record<FinancialAnalyticsCashFlowType, number>;
  byFinancialRatio: Record<FinancialAnalyticsFinancialRatio, number>;
  byBudgetType: Record<FinancialAnalyticsBudgetType, number>;
  byHealthLevel: Record<FinancialAnalyticsHealthLevel, number>;
  byRiskLevel: Record<FinancialAnalyticsRiskLevel, number>;
  byCurrencyType: Record<FinancialAnalyticsCurrencyType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: FinancialAnalyticsEvent;
  mostFrequentMetric: FinancialAnalyticsMetric;
  mostFrequentSegment: FinancialAnalyticsSegment;
}

/**
 * Financial analytics summary
 */
export interface FinancialAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  revenueEvents: number;
  expenseEvents: number;
  cashFlowEvents: number;
  revenueAnalyses: number;
  profitAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<FinancialAnalyticsType, number>;
  byStatus: Record<FinancialAnalyticsStatus, number>;
  byEvent: Record<FinancialAnalyticsEvent, number>;
  byMetric: Record<FinancialAnalyticsMetric, number>;
  bySegment: Record<FinancialAnalyticsSegment, number>;
  byCohort: Record<FinancialAnalyticsCohort, number>;
  byGranularity: Record<FinancialAnalyticsGranularity, number>;
  byRevenueType: Record<FinancialAnalyticsRevenueType, number>;
  byExpenseType: Record<FinancialAnalyticsExpenseType, number>;
  byCashFlowType: Record<FinancialAnalyticsCashFlowType, number>;
  byFinancialRatio: Record<FinancialAnalyticsFinancialRatio, number>;
  byBudgetType: Record<FinancialAnalyticsBudgetType, number>;
  byHealthLevel: Record<FinancialAnalyticsHealthLevel, number>;
  byRiskLevel: Record<FinancialAnalyticsRiskLevel, number>;
  byCurrencyType: Record<FinancialAnalyticsCurrencyType, number>;
  financialTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: FinancialAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: FinancialAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topRevenueTypes: {
    type: FinancialAnalyticsRevenueType;
    count: number;
    label: string;
  }[];
  topExpenseTypes: {
    type: FinancialAnalyticsExpenseType;
    count: number;
    label: string;
  }[];
}

/**
 * Financial analytics configuration
 */
export interface FinancialAnalyticsConfiguration {
  enabled: boolean;
  defaultType: FinancialAnalyticsType;
  defaultScope: FinancialAnalyticsScope;
  defaultGranularity: FinancialAnalyticsGranularity;
  trackRevenueEvents: boolean;
  trackExpenseEvents: boolean;
  trackCashFlowEvents: boolean;
  trackRevenueAnalysis: boolean;
  trackProfitAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: FinancialAnalyticsAlertConfig;
}

/**
 * Financial analytics alert configuration
 */
export interface FinancialAnalyticsAlertConfig {
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
 * Financial analytics history
 */
export interface FinancialAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Financial analytics data point
 */
export interface FinancialAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: FinancialAnalyticsEvent;
  dimension: FinancialAnalyticsDimension;
  metric: FinancialAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Financial analytics export
 */
export interface FinancialAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FinancialAnalyticsFilter;
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
  // Main Financial Analytics Constants
  FINANCIAL_ANALYTICS,
  FinancialAnalyticsType,
  FinancialAnalyticsStatus,
  FinancialAnalyticsScope,
  FinancialAnalyticsEvent,
  FinancialAnalyticsDimension,
  FinancialAnalyticsMetric,
  FinancialAnalyticsSegment,
  FinancialAnalyticsCohort,
  FinancialAnalyticsGranularity,
  getFinancialAnalyticsStatusLabel,
  getFinancialAnalyticsEventLabel,
  getFinancialAnalyticsDimensionLabel,
  getFinancialAnalyticsSegmentLabel,
  getFinancialAnalyticsCohortLabel,
  getFinancialAnalyticsGranularityLabel,
  isFinancialAnalyticsActive,
  isFinancialAnalyticsCompleted,
  isFinancialAnalyticsFailed,
  isFinancialAnalyticsRevenueEvent,
  isFinancialAnalyticsExpenseEvent,
  isFinancialAnalyticsCashFlowEvent,
  // Financial Analytics Type Constants
  FINANCIAL_ANALYTICS_TYPE,
  FinancialAnalyticsAnalysisType,
  FinancialAnalyticsDataType,
  FinancialAnalyticsRevenueType,
  FinancialAnalyticsExpenseType,
  FinancialAnalyticsCashFlowType,
  FinancialAnalyticsFinancialRatio,
  FinancialAnalyticsBudgetType,
  FinancialAnalyticsHealthLevel,
  FinancialAnalyticsRiskLevel,
  FinancialAnalyticsCurrencyType,
  getFinancialAnalyticsAnalysisTypeLabel,
  getFinancialAnalyticsDataTypeLabel,
  getFinancialAnalyticsRevenueTypeLabel,
  getFinancialAnalyticsExpenseTypeLabel,
  getFinancialAnalyticsCashFlowTypeLabel,
  getFinancialAnalyticsFinancialRatioLabel,
  getFinancialAnalyticsBudgetTypeLabel,
  getFinancialAnalyticsHealthLevelLabel,
  getFinancialAnalyticsRiskLevelLabel,
  getFinancialAnalyticsCurrencyTypeLabel,
  isFinancialAnalyticsRevenueAnalysis,
  isFinancialAnalyticsProfitAnalysis,
  isFinancialAnalyticsComparative,
  isFinancialAnalyticsPredictive,
  getFinancialAnalyticsHealthLevel,
  getFinancialAnalyticsRiskLevel,
  // Financial Analytics Metric Constants
  FINANCIAL_ANALYTICS_METRIC,
  FinancialAnalyticsRevenueMetric,
  FinancialAnalyticsProfitMetric,
  FinancialAnalyticsMarginMetric,
  FinancialAnalyticsCostMetric,
  FinancialAnalyticsCashFlowMetric,
  FinancialAnalyticsInvestmentMetric,
  FinancialAnalyticsBudgetMetric,
  FinancialAnalyticsTaxMetric,
  FinancialAnalyticsHealthMetric,
  FinancialAnalyticsComparisonMetric,
  FinancialAnalyticsMetricCategory,
  FinancialAnalyticsMetricType,
  FinancialAnalyticsMetricFormat,
  FinancialAnalyticsMetricPriority,
  getFinancialAnalyticsMetricLabel,
  getFinancialAnalyticsMetricCategoryLabel,
  getFinancialAnalyticsMetricTypeLabel,
  getFinancialAnalyticsMetricFormatLabel,
  getFinancialAnalyticsMetricPriorityLabel,
  getFinancialAnalyticsMetricCategory,
  getFinancialAnalyticsMetricType,
  getFinancialAnalyticsMetricFormat,
  calculateFinancialAnalyticsGrowthRate,
  calculateFinancialAnalyticsMargin,
  calculateFinancialAnalyticsROI,
  calculateFinancialAnalyticsVariance,
  calculateFinancialAnalyticsBudgetUtilization,
  calculateFinancialAnalyticsForecastAccuracy,
  calculateFinancialAnalyticsCurrentRatio,
  calculateFinancialAnalyticsQuickRatio,
  calculateFinancialAnalyticsDebtToEquity,
  calculateFinancialAnalyticsInterestCoverage,
  calculateFinancialAnalyticsWorkingCapital,
};
