/**
 * @fileoverview Financial analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  FinancialAnalyticsMetric,
  FinancialAnalyticsMetricType,
  FinancialAnalyticsMetricFormat,
  // Constants
  FINANCIAL_ANALYTICS_METRIC_CATEGORY_MAP,
  FINANCIAL_ANALYTICS_METRIC_CONFIG,
  FINANCIAL_DASHBOARD_METRICS,
  FINANCIAL_PROFITABILITY_METRICS,
  FINANCIAL_CASH_FLOW_METRICS,
  FINANCIAL_RATIO_METRICS,
  // Functions
  getFinancialMetricCategory,
  getFinancialMetricLabel,
  getFinancialMetricDescription,
  getFinancialMetricFormat,
  isFinancialMetricReversed,
  getFinancialMetricsByCategory,
  formatFinancialMetricValue,
  getFinancialMetricPriority,
  getHighPriorityFinancialMetrics,
  getFinancialMetricThreshold,
  evaluateFinancialMetricPerformance,
} from './financial-analytics-metric.constants';

// Re-export from financial-analytics-type.constants
export {
  // Enums
  FinancialAnalyticsType,
  FinancialAnalyticsCategory,
  FinancialAnalyticsTypeStatus,
  FinancialAnalyticsSubCategory,
  // Constants
  FINANCIAL_ANALYTICS_TYPE_CATEGORY_MAP,
  FINANCIAL_ANALYTICS_TYPE_CONFIG,
  FINANCIAL_ANALYTICS_TYPE_DEFAULT_STATUS,
  FINANCIAL_ANALYTICS_PRIORITY_LEVELS,
  FINANCIAL_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getFinancialAnalyticsTypeLabel,
  getFinancialAnalyticsTypeDescription,
  getFinancialAnalyticsTypeCategory,
  getFinancialAnalyticsTypesByCategory,
  financialAnalyticsTypeRequiresTransactionId,
  isFinancialAnalyticsTypeRealtime,
  getFinancialAnalyticsTypePriority,
  getFinancialAnalyticsTypeStatus,
  setFinancialAnalyticsTypeStatus,
  getFinancialAnalyticsTypesByPriority,
  getCriticalFinancialAnalyticsTypes,
  getFinancialAnalyticsTypeSubCategory,
  getFinancialAnalyticsTypesBySubCategory,
} from './financial-analytics-type.constants';

// Re-export from financial-analytics.constants
export {
  // Enums
  FinancialReportingPeriod,
  BudgetCategory,
  // Constants
  DEFAULT_CURRENCY_SETTINGS,
  DEFAULT_TAX_CALCULATION_SETTINGS,
  DEFAULT_DISCOUNT_CALCULATION_SETTINGS,
  BUDGET_CATEGORY_CONFIG,
  DEFAULT_COST_CENTER_SETTINGS,
  DEFAULT_PROFIT_CENTER_SETTINGS,
  DEFAULT_FINANCIAL_THRESHOLD_ALERTS,
  DEFAULT_INVOICING_CYCLE_SETTINGS,
  DEFAULT_PAYMENT_TERMS_SETTINGS,
  FINANCIAL_ANALYTICS_CONFIG,
  // Functions
  getBudgetCategoryLabel,
  getBudgetCategoryColor,
  getBudgetCategoryTypicalPercentage,
} from './financial-analytics.constants';

// Types - Import from financial-analytics.constants
export type {
  CurrencySettings,
  TaxCalculationSettings,
  DiscountCalculationSettings,
  CostCenterSettings,
  ProfitCenterSettings,
  FinancialThresholdAlerts,
  InvoicingCycleSettings,
  PaymentTermsSettings,
} from './financial-analytics.constants';

// Import FinancialAnalyticsTypeConfig from financial-analytics-type.constants
export type { FinancialAnalyticsTypeConfig } from './financial-analytics-type.constants';

// Import FinancialAnalyticsMetricConfig from financial-analytics-metric.constants
export type { FinancialAnalyticsMetricConfig } from './financial-analytics-metric.constants';
