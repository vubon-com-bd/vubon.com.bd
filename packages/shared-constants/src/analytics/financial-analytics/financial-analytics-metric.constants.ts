/**
 * Financial Analytics Metric Constants
 * Metrics for measuring financial performance and health
 */

export const FINANCIAL_ANALYTICS_METRIC = {
  // Revenue Metrics
  REVENUE_METRICS: {
    TOTAL_REVENUE: 'total_revenue',
    GROSS_REVENUE: 'gross_revenue',
    NET_REVENUE: 'net_revenue',
    RECURRING_REVENUE: 'recurring_revenue',
    NON_RECURRING_REVENUE: 'non_recurring_revenue',
    REVENUE_PER_USER: 'revenue_per_user',
    REVENUE_PER_CUSTOMER: 'revenue_per_customer',
    REVENUE_PER_PRODUCT: 'revenue_per_product',
    REVENUE_PER_EMPLOYEE: 'revenue_per_employee',
    REVENUE_GROWTH: 'revenue_growth',
    REVENUE_GROWTH_RATE: 'revenue_growth_rate',
  } as const,

  // Profit Metrics
  PROFIT_METRICS: {
    TOTAL_PROFIT: 'total_profit',
    GROSS_PROFIT: 'gross_profit',
    NET_PROFIT: 'net_profit',
    OPERATING_PROFIT: 'operating_profit',
    EBIT: 'ebit',
    EBITDA: 'ebitda',
    EBT: 'ebt',
    PROFIT_GROWTH: 'profit_growth',
    PROFIT_GROWTH_RATE: 'profit_growth_rate',
    PROFIT_PER_USER: 'profit_per_user',
    PROFIT_PER_CUSTOMER: 'profit_per_customer',
    PROFIT_PER_PRODUCT: 'profit_per_product',
  } as const,

  // Margin Metrics
  MARGIN_METRICS: {
    GROSS_MARGIN: 'gross_margin',
    GROSS_MARGIN_PERCENT: 'gross_margin_percent',
    NET_MARGIN: 'net_margin',
    NET_MARGIN_PERCENT: 'net_margin_percent',
    OPERATING_MARGIN: 'operating_margin',
    OPERATING_MARGIN_PERCENT: 'operating_margin_percent',
    EBIT_MARGIN: 'ebit_margin',
    EBIT_MARGIN_PERCENT: 'ebit_margin_percent',
    EBITDA_MARGIN: 'ebitda_margin',
    EBITDA_MARGIN_PERCENT: 'ebitda_margin_percent',
  } as const,

  // Cost Metrics
  COST_METRICS: {
    TOTAL_COST: 'total_cost',
    FIXED_COST: 'fixed_cost',
    VARIABLE_COST: 'variable_cost',
    OPERATING_COST: 'operating_cost',
    COST_PER_UNIT: 'cost_per_unit',
    COST_PER_CUSTOMER: 'cost_per_customer',
    COST_PER_USER: 'cost_per_user',
    COST_GROWTH: 'cost_growth',
    COST_GROWTH_RATE: 'cost_growth_rate',
    COST_TO_REVENUE_RATIO: 'cost_to_revenue_ratio',
  } as const,

  // Cash Flow Metrics
  CASH_FLOW_METRICS: {
    OPERATING_CASH_FLOW: 'operating_cash_flow',
    INVESTING_CASH_FLOW: 'investing_cash_flow',
    FINANCING_CASH_FLOW: 'financing_cash_flow',
    NET_CASH_FLOW: 'net_cash_flow',
    FREE_CASH_FLOW: 'free_cash_flow',
    CASH_CONVERSION_CYCLE: 'cash_conversion_cycle',
    DAYS_SALES_OUTSTANDING: 'days_sales_outstanding',
    DAYS_PAYABLE_OUTSTANDING: 'days_payable_outstanding',
    DAYS_INVENTORY_OUTSTANDING: 'days_inventory_outstanding',
    CASH_FLOW_GROWTH: 'cash_flow_growth',
    CASH_FLOW_GROWTH_RATE: 'cash_flow_growth_rate',
  } as const,

  // Investment Metrics
  INVESTMENT_METRICS: {
    ROI: 'roi',
    ROA: 'roa',
    ROE: 'roe',
    ROIC: 'roic',
    IRR: 'irr',
    NPV: 'npv',
    PAYBACK_PERIOD: 'payback_period',
    INVESTMENT_AMOUNT: 'investment_amount',
    INVESTMENT_RETURN: 'investment_return',
    INVESTMENT_LOSS: 'investment_loss',
    INVESTMENT_GROWTH: 'investment_growth',
  } as const,

  // Budget Metrics
  BUDGET_METRICS: {
    BUDGET_AMOUNT: 'budget_amount',
    ACTUAL_AMOUNT: 'actual_amount',
    VARIANCE: 'variance',
    VARIANCE_PERCENTAGE: 'variance_percentage',
    BUDGET_UTILIZATION: 'budget_utilization',
    BUDGET_UTILIZATION_PERCENT: 'budget_utilization_percent',
    FORECAST_ACCURACY: 'forecast_accuracy',
    FORECAST_ACCURACY_PERCENT: 'forecast_accuracy_percent',
    BUDGET_GROWTH: 'budget_growth',
    BUDGET_GROWTH_RATE: 'budget_growth_rate',
  } as const,

  // Tax Metrics
  TAX_METRICS: {
    TAX_EXPENSE: 'tax_expense',
    TAX_RATE: 'tax_rate',
    EFFECTIVE_TAX_RATE: 'effective_tax_rate',
    TAX_LIABILITY: 'tax_liability',
    TAX_REFUND: 'tax_refund',
    TAX_SAVINGS: 'tax_savings',
    TAX_EFFICIENCY: 'tax_efficiency',
    TAX_GROWTH: 'tax_growth',
  } as const,

  // Financial Health Metrics
  HEALTH_METRICS: {
    CURRENT_RATIO: 'current_ratio',
    QUICK_RATIO: 'quick_ratio',
    CASH_RATIO: 'cash_ratio',
    DEBT_TO_EQUITY: 'debt_to_equity',
    DEBT_RATIO: 'debt_ratio',
    INTEREST_COVERAGE: 'interest_coverage',
    WORKING_CAPITAL: 'working_capital',
    WORKING_CAPITAL_RATIO: 'working_capital_ratio',
    FINANCIAL_HEALTH_SCORE: 'financial_health_score',
    SOLVENCY_RATIO: 'solvency_ratio',
    LIQUIDITY_RATIO: 'liquidity_ratio',
  } as const,

  // Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
    BUDGET_COMPARISON: 'budget_comparison',
    FORECAST_COMPARISON: 'forecast_comparison',
    BENCHMARK_COMPARISON: 'benchmark_comparison',
    INDUSTRY_COMPARISON: 'industry_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    REVENUE: 'revenue',
    PROFIT: 'profit',
    MARGIN: 'margin',
    COST: 'cost',
    CASH_FLOW: 'cash_flow',
    INVESTMENT: 'investment',
    BUDGET: 'budget',
    TAX: 'tax',
    HEALTH: 'health',
    COMPARISON: 'comparison',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    RATE: 'rate',
    SCORE: 'score',
    DURATION: 'duration',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    DURATION: 'duration',
    RATING: 'rating',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Financial Analytics Revenue Metrics
export type FinancialAnalyticsRevenueMetric =
  (typeof FINANCIAL_ANALYTICS_METRIC.REVENUE_METRICS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.REVENUE_METRICS];

// Financial Analytics Profit Metrics
export type FinancialAnalyticsProfitMetric =
  (typeof FINANCIAL_ANALYTICS_METRIC.PROFIT_METRICS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.PROFIT_METRICS];

// Financial Analytics Margin Metrics
export type FinancialAnalyticsMarginMetric =
  (typeof FINANCIAL_ANALYTICS_METRIC.MARGIN_METRICS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.MARGIN_METRICS];

// Financial Analytics Cost Metrics
export type FinancialAnalyticsCostMetric =
  (typeof FINANCIAL_ANALYTICS_METRIC.COST_METRICS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.COST_METRICS];

// Financial Analytics Cash Flow Metrics
export type FinancialAnalyticsCashFlowMetric =
  (typeof FINANCIAL_ANALYTICS_METRIC.CASH_FLOW_METRICS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.CASH_FLOW_METRICS];

// Financial Analytics Investment Metrics
export type FinancialAnalyticsInvestmentMetric =
  (typeof FINANCIAL_ANALYTICS_METRIC.INVESTMENT_METRICS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.INVESTMENT_METRICS];

// Financial Analytics Budget Metrics
export type FinancialAnalyticsBudgetMetric =
  (typeof FINANCIAL_ANALYTICS_METRIC.BUDGET_METRICS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.BUDGET_METRICS];

// Financial Analytics Tax Metrics
export type FinancialAnalyticsTaxMetric =
  (typeof FINANCIAL_ANALYTICS_METRIC.TAX_METRICS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.TAX_METRICS];

// Financial Analytics Health Metrics
export type FinancialAnalyticsHealthMetric =
  (typeof FINANCIAL_ANALYTICS_METRIC.HEALTH_METRICS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.HEALTH_METRICS];

// Financial Analytics Comparison Metrics
export type FinancialAnalyticsComparisonMetric =
  (typeof FINANCIAL_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.COMPARISON_METRICS];

// Financial Analytics Metric Categories
export type FinancialAnalyticsMetricCategory =
  (typeof FINANCIAL_ANALYTICS_METRIC.CATEGORIES)[keyof typeof FINANCIAL_ANALYTICS_METRIC.CATEGORIES];

// Financial Analytics Metric Types
export type FinancialAnalyticsMetricType =
  (typeof FINANCIAL_ANALYTICS_METRIC.TYPES)[keyof typeof FINANCIAL_ANALYTICS_METRIC.TYPES];

// Financial Analytics Metric Formats
export type FinancialAnalyticsMetricFormat =
  (typeof FINANCIAL_ANALYTICS_METRIC.FORMATS)[keyof typeof FINANCIAL_ANALYTICS_METRIC.FORMATS];

// Financial Analytics Metric Priority
export type FinancialAnalyticsMetricPriority =
  (typeof FINANCIAL_ANALYTICS_METRIC.PRIORITY)[keyof typeof FINANCIAL_ANALYTICS_METRIC.PRIORITY];

// Financial Analytics Metric Labels
export function getFinancialAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Revenue Metrics
    total_revenue: 'Total Revenue',
    gross_revenue: 'Gross Revenue',
    net_revenue: 'Net Revenue',
    recurring_revenue: 'Recurring Revenue',
    non_recurring_revenue: 'Non-Recurring Revenue',
    revenue_per_user: 'Revenue Per User',
    revenue_per_customer: 'Revenue Per Customer',
    revenue_per_product: 'Revenue Per Product',
    revenue_per_employee: 'Revenue Per Employee',
    revenue_growth: 'Revenue Growth',
    revenue_growth_rate: 'Revenue Growth Rate',

    // Profit Metrics
    total_profit: 'Total Profit',
    gross_profit: 'Gross Profit',
    net_profit: 'Net Profit',
    operating_profit: 'Operating Profit',
    ebit: 'EBIT',
    ebitda: 'EBITDA',
    ebt: 'EBT',
    profit_growth: 'Profit Growth',
    profit_growth_rate: 'Profit Growth Rate',
    profit_per_user: 'Profit Per User',
    profit_per_customer: 'Profit Per Customer',
    profit_per_product: 'Profit Per Product',

    // Margin Metrics
    gross_margin: 'Gross Margin',
    gross_margin_percent: 'Gross Margin %',
    net_margin: 'Net Margin',
    net_margin_percent: 'Net Margin %',
    operating_margin: 'Operating Margin',
    operating_margin_percent: 'Operating Margin %',
    ebit_margin: 'EBIT Margin',
    ebit_margin_percent: 'EBIT Margin %',
    ebitda_margin: 'EBITDA Margin',
    ebitda_margin_percent: 'EBITDA Margin %',

    // Cost Metrics
    total_cost: 'Total Cost',
    fixed_cost: 'Fixed Cost',
    variable_cost: 'Variable Cost',
    operating_cost: 'Operating Cost',
    cost_per_unit: 'Cost Per Unit',
    cost_per_customer: 'Cost Per Customer',
    cost_per_user: 'Cost Per User',
    cost_growth: 'Cost Growth',
    cost_growth_rate: 'Cost Growth Rate',
    cost_to_revenue_ratio: 'Cost to Revenue Ratio',

    // Cash Flow Metrics
    operating_cash_flow: 'Operating Cash Flow',
    investing_cash_flow: 'Investing Cash Flow',
    financing_cash_flow: 'Financing Cash Flow',
    net_cash_flow: 'Net Cash Flow',
    free_cash_flow: 'Free Cash Flow',
    cash_conversion_cycle: 'Cash Conversion Cycle',
    days_sales_outstanding: 'Days Sales Outstanding',
    days_payable_outstanding: 'Days Payable Outstanding',
    days_inventory_outstanding: 'Days Inventory Outstanding',
    cash_flow_growth: 'Cash Flow Growth',
    cash_flow_growth_rate: 'Cash Flow Growth Rate',

    // Investment Metrics
    roi: 'ROI',
    roa: 'ROA',
    roe: 'ROE',
    roic: 'ROIC',
    irr: 'IRR',
    npv: 'NPV',
    payback_period: 'Payback Period',
    investment_amount: 'Investment Amount',
    investment_return: 'Investment Return',
    investment_loss: 'Investment Loss',
    investment_growth: 'Investment Growth',

    // Budget Metrics
    budget_amount: 'Budget Amount',
    actual_amount: 'Actual Amount',
    variance: 'Variance',
    variance_percentage: 'Variance %',
    budget_utilization: 'Budget Utilization',
    budget_utilization_percent: 'Budget Utilization %',
    forecast_accuracy: 'Forecast Accuracy',
    forecast_accuracy_percent: 'Forecast Accuracy %',
    budget_growth: 'Budget Growth',
    budget_growth_rate: 'Budget Growth Rate',

    // Tax Metrics
    tax_expense: 'Tax Expense',
    tax_rate: 'Tax Rate',
    effective_tax_rate: 'Effective Tax Rate',
    tax_liability: 'Tax Liability',
    tax_refund: 'Tax Refund',
    tax_savings: 'Tax Savings',
    tax_efficiency: 'Tax Efficiency',
    tax_growth: 'Tax Growth',

    // Health Metrics
    current_ratio: 'Current Ratio',
    quick_ratio: 'Quick Ratio',
    cash_ratio: 'Cash Ratio',
    debt_to_equity: 'Debt to Equity',
    debt_ratio: 'Debt Ratio',
    interest_coverage: 'Interest Coverage',
    working_capital: 'Working Capital',
    working_capital_ratio: 'Working Capital Ratio',
    financial_health_score: 'Financial Health Score',
    solvency_ratio: 'Solvency Ratio',
    liquidity_ratio: 'Liquidity Ratio',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    period_comparison: 'Period Comparison',
    budget_comparison: 'Budget Comparison',
    forecast_comparison: 'Forecast Comparison',
    benchmark_comparison: 'Benchmark Comparison',
    industry_comparison: 'Industry Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Financial Analytics Metric Category Labels
export function getFinancialAnalyticsMetricCategoryLabel(
  category: FinancialAnalyticsMetricCategory
): string {
  const labels: Record<FinancialAnalyticsMetricCategory, string> = {
    [FINANCIAL_ANALYTICS_METRIC.CATEGORIES.REVENUE]: 'Revenue',
    [FINANCIAL_ANALYTICS_METRIC.CATEGORIES.PROFIT]: 'Profit',
    [FINANCIAL_ANALYTICS_METRIC.CATEGORIES.MARGIN]: 'Margin',
    [FINANCIAL_ANALYTICS_METRIC.CATEGORIES.COST]: 'Cost',
    [FINANCIAL_ANALYTICS_METRIC.CATEGORIES.CASH_FLOW]: 'Cash Flow',
    [FINANCIAL_ANALYTICS_METRIC.CATEGORIES.INVESTMENT]: 'Investment',
    [FINANCIAL_ANALYTICS_METRIC.CATEGORIES.BUDGET]: 'Budget',
    [FINANCIAL_ANALYTICS_METRIC.CATEGORIES.TAX]: 'Tax',
    [FINANCIAL_ANALYTICS_METRIC.CATEGORIES.HEALTH]: 'Health',
    [FINANCIAL_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Financial Analytics Metric Type Labels
export function getFinancialAnalyticsMetricTypeLabel(type: FinancialAnalyticsMetricType): string {
  const labels: Record<FinancialAnalyticsMetricType, string> = {
    [FINANCIAL_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [FINANCIAL_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [FINANCIAL_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [FINANCIAL_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [FINANCIAL_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [FINANCIAL_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
    [FINANCIAL_ANALYTICS_METRIC.TYPES.DURATION]: 'Duration',
  };
  return labels[type] || 'Unknown';
}

// Financial Analytics Metric Format Labels
export function getFinancialAnalyticsMetricFormatLabel(
  format: FinancialAnalyticsMetricFormat
): string {
  const labels: Record<FinancialAnalyticsMetricFormat, string> = {
    [FINANCIAL_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [FINANCIAL_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [FINANCIAL_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [FINANCIAL_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [FINANCIAL_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [FINANCIAL_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Financial Analytics Metric Priority Labels
export function getFinancialAnalyticsMetricPriorityLabel(
  priority: FinancialAnalyticsMetricPriority
): string {
  const labels: Record<FinancialAnalyticsMetricPriority, string> = {
    [FINANCIAL_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [FINANCIAL_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [FINANCIAL_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [FINANCIAL_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getFinancialAnalyticsMetricCategory(
  metric: string
): FinancialAnalyticsMetricCategory {
  const revenueMetrics = Object.values(
    FINANCIAL_ANALYTICS_METRIC.REVENUE_METRICS
  ) as readonly string[];
  const profitMetrics = Object.values(
    FINANCIAL_ANALYTICS_METRIC.PROFIT_METRICS
  ) as readonly string[];
  const marginMetrics = Object.values(
    FINANCIAL_ANALYTICS_METRIC.MARGIN_METRICS
  ) as readonly string[];
  const costMetrics = Object.values(FINANCIAL_ANALYTICS_METRIC.COST_METRICS) as readonly string[];
  const cashFlowMetrics = Object.values(
    FINANCIAL_ANALYTICS_METRIC.CASH_FLOW_METRICS
  ) as readonly string[];
  const investmentMetrics = Object.values(
    FINANCIAL_ANALYTICS_METRIC.INVESTMENT_METRICS
  ) as readonly string[];
  const budgetMetrics = Object.values(
    FINANCIAL_ANALYTICS_METRIC.BUDGET_METRICS
  ) as readonly string[];
  const taxMetrics = Object.values(FINANCIAL_ANALYTICS_METRIC.TAX_METRICS) as readonly string[];
  const healthMetrics = Object.values(
    FINANCIAL_ANALYTICS_METRIC.HEALTH_METRICS
  ) as readonly string[];
  const comparisonMetrics = Object.values(
    FINANCIAL_ANALYTICS_METRIC.COMPARISON_METRICS
  ) as readonly string[];

  if (revenueMetrics.includes(metric)) return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.REVENUE;
  if (profitMetrics.includes(metric)) return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.PROFIT;
  if (marginMetrics.includes(metric)) return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.MARGIN;
  if (costMetrics.includes(metric)) return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.COST;
  if (cashFlowMetrics.includes(metric)) return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.CASH_FLOW;
  if (investmentMetrics.includes(metric)) return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.INVESTMENT;
  if (budgetMetrics.includes(metric)) return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.BUDGET;
  if (taxMetrics.includes(metric)) return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.TAX;
  if (healthMetrics.includes(metric)) return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.HEALTH;
  if (comparisonMetrics.includes(metric)) return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return FINANCIAL_ANALYTICS_METRIC.CATEGORIES.REVENUE;
}

// Get metric type
export function getFinancialAnalyticsMetricType(metric: string): FinancialAnalyticsMetricType {
  const percentageMetrics: string[] = [
    'margin',
    'rate',
    'percentage',
    'growth',
    'utilization',
    'accuracy',
    'coverage',
    'ratio',
  ];

  const averageMetrics: string[] = ['avg', 'average', 'per'];

  const durationMetrics: string[] = ['period', 'cycle', 'days', 'payback'];

  const scoreMetrics: string[] = ['score'];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return FINANCIAL_ANALYTICS_METRIC.TYPES.DURATION;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return FINANCIAL_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am) => lowerMetric.includes(am))) {
    return FINANCIAL_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm) => lowerMetric.includes(sm))) {
    return FINANCIAL_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return FINANCIAL_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getFinancialAnalyticsMetricFormat(metric: string): FinancialAnalyticsMetricFormat {
  const currencyMetrics: string[] = [
    'revenue',
    'profit',
    'cost',
    'cash_flow',
    'investment',
    'budget',
    'tax',
    'liability',
    'refund',
    'savings',
    'capital',
    'expense',
    'income',
  ];

  const percentageMetrics: string[] = [
    'margin',
    'rate',
    'percentage',
    'growth',
    'utilization',
    'accuracy',
    'coverage',
    'ratio',
  ];

  const durationMetrics: string[] = ['period', 'cycle', 'days', 'payback'];

  const ratingMetrics: string[] = ['score'];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm) => lowerMetric.includes(cm))) {
    return FINANCIAL_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return FINANCIAL_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (ratingMetrics.some((rm) => lowerMetric.includes(rm))) {
    return FINANCIAL_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return FINANCIAL_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return FINANCIAL_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate growth rate
export function calculateFinancialAnalyticsGrowthRate(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

// Calculate margin
export function calculateFinancialAnalyticsMargin(profit: number, revenue: number): number {
  if (revenue === 0) return 0;
  return (profit / revenue) * 100;
}

// Calculate ROI
export function calculateFinancialAnalyticsROI(
  returnAmount: number,
  investmentAmount: number
): number {
  if (investmentAmount === 0) return 0;
  return ((returnAmount - investmentAmount) / investmentAmount) * 100;
}

// Calculate variance
export function calculateFinancialAnalyticsVariance(actual: number, budget: number): number {
  if (budget === 0) return 0;
  return ((actual - budget) / budget) * 100;
}

// Calculate budget utilization
export function calculateFinancialAnalyticsBudgetUtilization(
  actual: number,
  budget: number
): number {
  if (budget === 0) return 0;
  return (actual / budget) * 100;
}

// Calculate forecast accuracy
export function calculateFinancialAnalyticsForecastAccuracy(
  forecast: number,
  actual: number
): number {
  if (actual === 0) return 0;
  return 100 - (Math.abs(forecast - actual) / actual) * 100;
}

// Calculate current ratio
export function calculateFinancialAnalyticsCurrentRatio(
  currentAssets: number,
  currentLiabilities: number
): number {
  if (currentLiabilities === 0) return 0;
  return currentAssets / currentLiabilities;
}

// Calculate quick ratio
export function calculateFinancialAnalyticsQuickRatio(
  currentAssets: number,
  inventory: number,
  currentLiabilities: number
): number {
  if (currentLiabilities === 0) return 0;
  return (currentAssets - inventory) / currentLiabilities;
}

// Calculate debt to equity ratio
export function calculateFinancialAnalyticsDebtToEquity(
  totalDebt: number,
  totalEquity: number
): number {
  if (totalEquity === 0) return 0;
  return totalDebt / totalEquity;
}

// Calculate interest coverage
export function calculateFinancialAnalyticsInterestCoverage(
  ebit: number,
  interestExpense: number
): number {
  if (interestExpense === 0) return 0;
  return ebit / interestExpense;
}

// Calculate working capital
export function calculateFinancialAnalyticsWorkingCapital(
  currentAssets: number,
  currentLiabilities: number
): number {
  return currentAssets - currentLiabilities;
}
