/**
 * Financial Analytics Type Constants
 * Types of financial analytics data and analysis
 */

export const FINANCIAL_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Revenue Analysis
    REVENUE_ANALYSIS: 'revenue_analysis',
    REVENUE_STREAM_ANALYSIS: 'revenue_stream_analysis',
    REVENUE_GROWTH_ANALYSIS: 'revenue_growth_analysis',

    // Profit Analysis
    PROFIT_ANALYSIS: 'profit_analysis',
    PROFIT_MARGIN_ANALYSIS: 'profit_margin_analysis',
    PROFIT_GROWTH_ANALYSIS: 'profit_growth_analysis',

    // Cost Analysis
    COST_ANALYSIS: 'cost_analysis',
    COST_STRUCTURE_ANALYSIS: 'cost_structure_analysis',
    COST_DRIVER_ANALYSIS: 'cost_driver_analysis',

    // Cash Flow Analysis
    CASH_FLOW_ANALYSIS: 'cash_flow_analysis',
    CASH_FLOW_FORECAST: 'cash_flow_forecast',
    CASH_CONVERSION_ANALYSIS: 'cash_conversion_analysis',

    // Investment Analysis
    INVESTMENT_ANALYSIS: 'investment_analysis',
    ROI_ANALYSIS: 'roi_analysis',
    RISK_ANALYSIS: 'risk_analysis',

    // Budget Analysis
    BUDGET_ANALYSIS: 'budget_analysis',
    VARIANCE_ANALYSIS: 'variance_analysis',
    FORECAST_ANALYSIS: 'forecast_analysis',

    // Financial Health Analysis
    FINANCIAL_HEALTH_ANALYSIS: 'financial_health_analysis',
    RATIO_ANALYSIS: 'ratio_analysis',
    TREND_ANALYSIS: 'trend_analysis',

    // Tax Analysis
    TAX_ANALYSIS: 'tax_analysis',
    TAX_EFFICIENCY_ANALYSIS: 'tax_efficiency_analysis',

    // Comparative Analysis
    COMPARATIVE: 'comparative',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    PROJECTION: 'projection',
    SCENARIO: 'scenario',
  } as const,

  // Data Types
  DATA_TYPES: {
    REVENUE_DATA: 'revenue_data',
    EXPENSE_DATA: 'expense_data',
    PROFIT_DATA: 'profit_data',
    CASH_FLOW_DATA: 'cash_flow_data',
    INVESTMENT_DATA: 'investment_data',
    BUDGET_DATA: 'budget_data',
    TAX_DATA: 'tax_data',
    RATIO_DATA: 'ratio_data',
    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
    FORECAST: 'forecast',
    ACTUAL: 'actual',
  } as const,

  // Revenue Types
  REVENUE_TYPES: {
    PRODUCT_SALES: 'product_sales',
    SERVICE_REVENUE: 'service_revenue',
    SUBSCRIPTION: 'subscription',
    ADVERTISING: 'advertising',
    COMMISSION: 'commission',
    INTEREST: 'interest',
    ROYALTY: 'royalty',
    OTHER: 'other',
  } as const,

  // Expense Types
  EXPENSE_TYPES: {
    COST_OF_GOODS_SOLD: 'cost_of_goods_sold',
    OPERATING_EXPENSE: 'operating_expense',
    SALARY: 'salary',
    MARKETING: 'marketing',
    RENT: 'rent',
    UTILITIES: 'utilities',
    DEPRECIATION: 'depreciation',
    AMORTIZATION: 'amortization',
    TAX: 'tax',
    INTEREST_EXPENSE: 'interest_expense',
    OTHER: 'other',
  } as const,

  // Cash Flow Types
  CASH_FLOW_TYPES: {
    OPERATING: 'operating',
    INVESTING: 'investing',
    FINANCING: 'financing',
    FREE_CASH_FLOW: 'free_cash_flow',
    NET_CASH_FLOW: 'net_cash_flow',
  } as const,

  // Financial Ratios
  FINANCIAL_RATIOS: {
    // Liquidity Ratios
    CURRENT_RATIO: 'current_ratio',
    QUICK_RATIO: 'quick_ratio',
    CASH_RATIO: 'cash_ratio',

    // Profitability Ratios
    GROSS_MARGIN: 'gross_margin',
    NET_MARGIN: 'net_margin',
    OPERATING_MARGIN: 'operating_margin',
    ROA: 'roa',
    ROE: 'roe',

    // Efficiency Ratios
    ASSET_TURNOVER: 'asset_turnover',
    INVENTORY_TURNOVER: 'inventory_turnover',
    RECEIVABLES_TURNOVER: 'receivables_turnover',

    // Leverage Ratios
    DEBT_TO_EQUITY: 'debt_to_equity',
    DEBT_RATIO: 'debt_ratio',
    INTEREST_COVERAGE: 'interest_coverage',

    // Market Ratios
    PE_RATIO: 'pe_ratio',
    EPS: 'eps',
    DIVIDEND_YIELD: 'dividend_yield',
  } as const,

  // Budget Types
  BUDGET_TYPES: {
    OPERATING: 'operating',
    CAPITAL: 'capital',
    CASH: 'cash',
    SALES: 'sales',
    EXPENSE: 'expense',
    ZERO_BASED: 'zero_based',
    INCREMENTAL: 'incremental',
    FLEXIBLE: 'flexible',
    ROLLING: 'rolling',
  } as const,

  // Financial Health Levels
  HEALTH_LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    FAIR: 'fair',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Risk Levels
  RISK_LEVELS: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  } as const,

  // Currency Types
  CURRENCY_TYPES: {
    BDT: 'bdt',
    USD: 'usd',
    EUR: 'eur',
    GBP: 'gbp',
    JPY: 'jpy',
    CNY: 'cny',
    INR: 'inr',
    PKR: 'pkr',
  } as const,
} as const;

// Financial Analytics Analysis Types
export type FinancialAnalyticsAnalysisType =
  (typeof FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Financial Analytics Data Types
export type FinancialAnalyticsDataType =
  (typeof FINANCIAL_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof FINANCIAL_ANALYTICS_TYPE.DATA_TYPES];

// Financial Analytics Revenue Types
export type FinancialAnalyticsRevenueType =
  (typeof FINANCIAL_ANALYTICS_TYPE.REVENUE_TYPES)[keyof typeof FINANCIAL_ANALYTICS_TYPE.REVENUE_TYPES];

// Financial Analytics Expense Types
export type FinancialAnalyticsExpenseType =
  (typeof FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES)[keyof typeof FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES];

// Financial Analytics Cash Flow Types
export type FinancialAnalyticsCashFlowType =
  (typeof FINANCIAL_ANALYTICS_TYPE.CASH_FLOW_TYPES)[keyof typeof FINANCIAL_ANALYTICS_TYPE.CASH_FLOW_TYPES];

// Financial Analytics Financial Ratios
export type FinancialAnalyticsFinancialRatio =
  (typeof FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS)[keyof typeof FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS];

// Financial Analytics Budget Types
export type FinancialAnalyticsBudgetType =
  (typeof FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES)[keyof typeof FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES];

// Financial Analytics Health Levels
export type FinancialAnalyticsHealthLevel =
  (typeof FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS)[keyof typeof FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS];

// Financial Analytics Risk Levels
export type FinancialAnalyticsRiskLevel =
  (typeof FINANCIAL_ANALYTICS_TYPE.RISK_LEVELS)[keyof typeof FINANCIAL_ANALYTICS_TYPE.RISK_LEVELS];

// Financial Analytics Currency Types
export type FinancialAnalyticsCurrencyType =
  (typeof FINANCIAL_ANALYTICS_TYPE.CURRENCY_TYPES)[keyof typeof FINANCIAL_ANALYTICS_TYPE.CURRENCY_TYPES];

// Financial Analytics Analysis Type Labels
export function getFinancialAnalyticsAnalysisTypeLabel(
  type: FinancialAnalyticsAnalysisType
): string {
  const labels: Record<FinancialAnalyticsAnalysisType, string> = {
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_ANALYSIS]: 'Revenue Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_STREAM_ANALYSIS]: 'Revenue Stream Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_GROWTH_ANALYSIS]: 'Revenue Growth Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_ANALYSIS]: 'Profit Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_MARGIN_ANALYSIS]: 'Profit Margin Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_GROWTH_ANALYSIS]: 'Profit Growth Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.COST_ANALYSIS]: 'Cost Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.COST_STRUCTURE_ANALYSIS]: 'Cost Structure Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.COST_DRIVER_ANALYSIS]: 'Cost Driver Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.CASH_FLOW_ANALYSIS]: 'Cash Flow Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.CASH_FLOW_FORECAST]: 'Cash Flow Forecast',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.CASH_CONVERSION_ANALYSIS]: 'Cash Conversion Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.INVESTMENT_ANALYSIS]: 'Investment Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.ROI_ANALYSIS]: 'ROI Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.RISK_ANALYSIS]: 'Risk Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.BUDGET_ANALYSIS]: 'Budget Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.VARIANCE_ANALYSIS]: 'Variance Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST_ANALYSIS]: 'Forecast Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.FINANCIAL_HEALTH_ANALYSIS]:
      'Financial Health Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.RATIO_ANALYSIS]: 'Ratio Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND_ANALYSIS]: 'Trend Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.TAX_ANALYSIS]: 'Tax Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.TAX_EFFICIENCY_ANALYSIS]: 'Tax Efficiency Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.PROJECTION]: 'Projection',
    [FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.SCENARIO]: 'Scenario Analysis',
  };
  return labels[type] || 'Unknown';
}

// Financial Analytics Data Type Labels
export function getFinancialAnalyticsDataTypeLabel(type: FinancialAnalyticsDataType): string {
  const labels: Record<FinancialAnalyticsDataType, string> = {
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.REVENUE_DATA]: 'Revenue Data',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.EXPENSE_DATA]: 'Expense Data',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.PROFIT_DATA]: 'Profit Data',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.CASH_FLOW_DATA]: 'Cash Flow Data',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.INVESTMENT_DATA]: 'Investment Data',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.BUDGET_DATA]: 'Budget Data',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.TAX_DATA]: 'Tax Data',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.RATIO_DATA]: 'Ratio Data',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.FORECAST]: 'Forecast',
    [FINANCIAL_ANALYTICS_TYPE.DATA_TYPES.ACTUAL]: 'Actual',
  };
  return labels[type] || 'Unknown';
}

// Financial Analytics Revenue Type Labels
export function getFinancialAnalyticsRevenueTypeLabel(type: FinancialAnalyticsRevenueType): string {
  const labels: Record<FinancialAnalyticsRevenueType, string> = {
    [FINANCIAL_ANALYTICS_TYPE.REVENUE_TYPES.PRODUCT_SALES]: 'Product Sales',
    [FINANCIAL_ANALYTICS_TYPE.REVENUE_TYPES.SERVICE_REVENUE]: 'Service Revenue',
    [FINANCIAL_ANALYTICS_TYPE.REVENUE_TYPES.SUBSCRIPTION]: 'Subscription',
    [FINANCIAL_ANALYTICS_TYPE.REVENUE_TYPES.ADVERTISING]: 'Advertising',
    [FINANCIAL_ANALYTICS_TYPE.REVENUE_TYPES.COMMISSION]: 'Commission',
    [FINANCIAL_ANALYTICS_TYPE.REVENUE_TYPES.INTEREST]: 'Interest',
    [FINANCIAL_ANALYTICS_TYPE.REVENUE_TYPES.ROYALTY]: 'Royalty',
    [FINANCIAL_ANALYTICS_TYPE.REVENUE_TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown';
}

// Financial Analytics Expense Type Labels
export function getFinancialAnalyticsExpenseTypeLabel(type: FinancialAnalyticsExpenseType): string {
  const labels: Record<FinancialAnalyticsExpenseType, string> = {
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.COST_OF_GOODS_SOLD]: 'Cost of Goods Sold',
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.OPERATING_EXPENSE]: 'Operating Expense',
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.SALARY]: 'Salary',
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.MARKETING]: 'Marketing',
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.RENT]: 'Rent',
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.UTILITIES]: 'Utilities',
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.DEPRECIATION]: 'Depreciation',
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.AMORTIZATION]: 'Amortization',
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.TAX]: 'Tax',
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.INTEREST_EXPENSE]: 'Interest Expense',
    [FINANCIAL_ANALYTICS_TYPE.EXPENSE_TYPES.OTHER]: 'Other',
  };
  return labels[type] || 'Unknown';
}

// Financial Analytics Cash Flow Type Labels
export function getFinancialAnalyticsCashFlowTypeLabel(
  type: FinancialAnalyticsCashFlowType
): string {
  const labels: Record<FinancialAnalyticsCashFlowType, string> = {
    [FINANCIAL_ANALYTICS_TYPE.CASH_FLOW_TYPES.OPERATING]: 'Operating',
    [FINANCIAL_ANALYTICS_TYPE.CASH_FLOW_TYPES.INVESTING]: 'Investing',
    [FINANCIAL_ANALYTICS_TYPE.CASH_FLOW_TYPES.FINANCING]: 'Financing',
    [FINANCIAL_ANALYTICS_TYPE.CASH_FLOW_TYPES.FREE_CASH_FLOW]: 'Free Cash Flow',
    [FINANCIAL_ANALYTICS_TYPE.CASH_FLOW_TYPES.NET_CASH_FLOW]: 'Net Cash Flow',
  };
  return labels[type] || 'Unknown';
}

// Financial Analytics Financial Ratio Labels
export function getFinancialAnalyticsFinancialRatioLabel(
  ratio: FinancialAnalyticsFinancialRatio
): string {
  const labels: Record<FinancialAnalyticsFinancialRatio, string> = {
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.CURRENT_RATIO]: 'Current Ratio',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.QUICK_RATIO]: 'Quick Ratio',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.CASH_RATIO]: 'Cash Ratio',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.GROSS_MARGIN]: 'Gross Margin',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.NET_MARGIN]: 'Net Margin',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.OPERATING_MARGIN]: 'Operating Margin',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.ROA]: 'ROA',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.ROE]: 'ROE',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.ASSET_TURNOVER]: 'Asset Turnover',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.INVENTORY_TURNOVER]: 'Inventory Turnover',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.RECEIVABLES_TURNOVER]: 'Receivables Turnover',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.DEBT_TO_EQUITY]: 'Debt to Equity',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.DEBT_RATIO]: 'Debt Ratio',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.INTEREST_COVERAGE]: 'Interest Coverage',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.PE_RATIO]: 'P/E Ratio',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.EPS]: 'EPS',
    [FINANCIAL_ANALYTICS_TYPE.FINANCIAL_RATIOS.DIVIDEND_YIELD]: 'Dividend Yield',
  };
  return labels[ratio] || 'Unknown';
}

// Financial Analytics Budget Type Labels
export function getFinancialAnalyticsBudgetTypeLabel(type: FinancialAnalyticsBudgetType): string {
  const labels: Record<FinancialAnalyticsBudgetType, string> = {
    [FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES.OPERATING]: 'Operating',
    [FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES.CAPITAL]: 'Capital',
    [FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES.CASH]: 'Cash',
    [FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES.SALES]: 'Sales',
    [FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES.EXPENSE]: 'Expense',
    [FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES.ZERO_BASED]: 'Zero-Based',
    [FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES.INCREMENTAL]: 'Incremental',
    [FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES.FLEXIBLE]: 'Flexible',
    [FINANCIAL_ANALYTICS_TYPE.BUDGET_TYPES.ROLLING]: 'Rolling',
  };
  return labels[type] || 'Unknown';
}

// Financial Analytics Health Level Labels
export function getFinancialAnalyticsHealthLevelLabel(
  level: FinancialAnalyticsHealthLevel
): string {
  const labels: Record<FinancialAnalyticsHealthLevel, string> = {
    [FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS.EXCELLENT]: 'Excellent',
    [FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS.GOOD]: 'Good',
    [FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS.FAIR]: 'Fair',
    [FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS.POOR]: 'Poor',
    [FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Financial Analytics Risk Level Labels
export function getFinancialAnalyticsRiskLevelLabel(level: FinancialAnalyticsRiskLevel): string {
  const labels: Record<FinancialAnalyticsRiskLevel, string> = {
    [FINANCIAL_ANALYTICS_TYPE.RISK_LEVELS.LOW]: 'Low',
    [FINANCIAL_ANALYTICS_TYPE.RISK_LEVELS.MEDIUM]: 'Medium',
    [FINANCIAL_ANALYTICS_TYPE.RISK_LEVELS.HIGH]: 'High',
    [FINANCIAL_ANALYTICS_TYPE.RISK_LEVELS.VERY_HIGH]: 'Very High',
  };
  return labels[level] || 'Unknown';
}

// Financial Analytics Currency Type Labels
export function getFinancialAnalyticsCurrencyTypeLabel(
  type: FinancialAnalyticsCurrencyType
): string {
  const labels: Record<FinancialAnalyticsCurrencyType, string> = {
    [FINANCIAL_ANALYTICS_TYPE.CURRENCY_TYPES.BDT]: 'BDT',
    [FINANCIAL_ANALYTICS_TYPE.CURRENCY_TYPES.USD]: 'USD',
    [FINANCIAL_ANALYTICS_TYPE.CURRENCY_TYPES.EUR]: 'EUR',
    [FINANCIAL_ANALYTICS_TYPE.CURRENCY_TYPES.GBP]: 'GBP',
    [FINANCIAL_ANALYTICS_TYPE.CURRENCY_TYPES.JPY]: 'JPY',
    [FINANCIAL_ANALYTICS_TYPE.CURRENCY_TYPES.CNY]: 'CNY',
    [FINANCIAL_ANALYTICS_TYPE.CURRENCY_TYPES.INR]: 'INR',
    [FINANCIAL_ANALYTICS_TYPE.CURRENCY_TYPES.PKR]: 'PKR',
  };
  return labels[type] || 'Unknown';
}

// Check if analysis is revenue analysis
export function isFinancialAnalyticsRevenueAnalysis(type: FinancialAnalyticsAnalysisType): boolean {
  const revenueTypes: FinancialAnalyticsAnalysisType[] = [
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_ANALYSIS,
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_STREAM_ANALYSIS,
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_GROWTH_ANALYSIS,
  ];
  return revenueTypes.includes(type);
}

// Check if analysis is profit analysis
export function isFinancialAnalyticsProfitAnalysis(type: FinancialAnalyticsAnalysisType): boolean {
  const profitTypes: FinancialAnalyticsAnalysisType[] = [
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_ANALYSIS,
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_MARGIN_ANALYSIS,
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_GROWTH_ANALYSIS,
  ];
  return profitTypes.includes(type);
}

// Check if analysis is comparative
export function isFinancialAnalyticsComparative(type: FinancialAnalyticsAnalysisType): boolean {
  const comparativeTypes: FinancialAnalyticsAnalysisType[] = [
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE,
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR,
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER,
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isFinancialAnalyticsPredictive(type: FinancialAnalyticsAnalysisType): boolean {
  const predictiveTypes: FinancialAnalyticsAnalysisType[] = [
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.PROJECTION,
    FINANCIAL_ANALYTICS_TYPE.ANALYSIS_TYPES.SCENARIO,
  ];
  return predictiveTypes.includes(type);
}

// Get health level from score
export function getFinancialAnalyticsHealthLevel(score: number): FinancialAnalyticsHealthLevel {
  if (score >= 90) return FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS.EXCELLENT;
  if (score >= 70) return FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS.GOOD;
  if (score >= 50) return FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS.FAIR;
  if (score >= 30) return FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS.POOR;
  return FINANCIAL_ANALYTICS_TYPE.HEALTH_LEVELS.CRITICAL;
}

// Get risk level from score
export function getFinancialAnalyticsRiskLevel(score: number): FinancialAnalyticsRiskLevel {
  if (score < 30) return FINANCIAL_ANALYTICS_TYPE.RISK_LEVELS.LOW;
  if (score < 50) return FINANCIAL_ANALYTICS_TYPE.RISK_LEVELS.MEDIUM;
  if (score < 70) return FINANCIAL_ANALYTICS_TYPE.RISK_LEVELS.HIGH;
  return FINANCIAL_ANALYTICS_TYPE.RISK_LEVELS.VERY_HIGH;
}
