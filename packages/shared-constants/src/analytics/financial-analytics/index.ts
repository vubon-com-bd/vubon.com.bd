/**
 * Financial Analytics Constants Index
 * Export all financial analytics constants and types for easy importing
 */

// Financial Analytics Main Constants
export {
  FINANCIAL_ANALYTICS,
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
} from './financial-analytics.constants';

export type {
  FinancialAnalyticsType,
  FinancialAnalyticsStatus,
  FinancialAnalyticsScope,
  FinancialAnalyticsEvent,
  FinancialAnalyticsDimension,
  FinancialAnalyticsMetric,
  FinancialAnalyticsSegment,
  FinancialAnalyticsCohort,
  FinancialAnalyticsGranularity,
} from './financial-analytics.constants';

// Financial Analytics Type Constants
export {
  FINANCIAL_ANALYTICS_TYPE,
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
} from './financial-analytics-type.constants';

export type {
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
} from './financial-analytics-type.constants';

// Financial Analytics Metric Constants
export {
  FINANCIAL_ANALYTICS_METRIC,
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
} from './financial-analytics-metric.constants';

export type {
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
} from './financial-analytics-metric.constants';
