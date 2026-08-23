/**
 * Financial Analytics Constants
 * Configuration for financial performance analytics and tracking
 */

export const FINANCIAL_ANALYTICS = {
  // Financial Analytics Types
  TYPES: {
    // Revenue Analytics
    REVENUE: 'revenue',
    GROSS_REVENUE: 'gross_revenue',
    NET_REVENUE: 'net_revenue',
    RECURRING_REVENUE: 'recurring_revenue',

    // Profit Analytics
    PROFIT: 'profit',
    GROSS_PROFIT: 'gross_profit',
    NET_PROFIT: 'net_profit',
    OPERATING_PROFIT: 'operating_profit',

    // Margin Analytics
    MARGIN: 'margin',
    GROSS_MARGIN: 'gross_margin',
    NET_MARGIN: 'net_margin',
    OPERATING_MARGIN: 'operating_margin',

    // Cost Analytics
    COST: 'cost',
    FIXED_COST: 'fixed_cost',
    VARIABLE_COST: 'variable_cost',
    OPERATING_COST: 'operating_cost',

    // Cash Flow Analytics
    CASH_FLOW: 'cash_flow',
    OPERATING_CASH_FLOW: 'operating_cash_flow',
    INVESTING_CASH_FLOW: 'investing_cash_flow',
    FINANCING_CASH_FLOW: 'financing_cash_flow',

    // Investment Analytics
    INVESTMENT: 'investment',
    ROI: 'roi',
    ROA: 'roa',
    ROE: 'roe',

    // Budget Analytics
    BUDGET: 'budget',
    FORECAST: 'forecast',
    VARIANCE: 'variance',
    BUDGET_VS_ACTUAL: 'budget_vs_actual',

    // Tax Analytics
    TAX: 'tax',
    TAX_LIABILITY: 'tax_liability',
    TAX_RATE: 'tax_rate',
    TAX_EFFICIENCY: 'tax_efficiency',

    // Time Analytics
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Financial Analytics Status
  STATUS: {
    TRACKING: 'tracking',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    UPDATING: 'updating',
    REFRESHING: 'refreshing',
  } as const,

  // Financial Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    DEPARTMENT: 'department',
    BUSINESS_UNIT: 'business_unit',
    COMPANY: 'company',
    ALL: 'all',
    COMPARATIVE: 'comparative',
  } as const,

  // Financial Analytics Events
  EVENTS: {
    // Revenue Events
    REVENUE_RECEIVED: 'revenue_received',
    REVENUE_RECOGNIZED: 'revenue_recognized',
    REVENUE_DEFERRED: 'revenue_deferred',
    REVENUE_GROWTH: 'revenue_growth',

    // Expense Events
    EXPENSE_INCURRED: 'expense_incurred',
    EXPENSE_APPROVED: 'expense_approved',
    EXPENSE_PAID: 'expense_paid',
    EXPENSE_OVER_BUDGET: 'expense_over_budget',

    // Profit Events
    PROFIT_REALIZED: 'profit_realized',
    PROFIT_MARGIN_CHANGE: 'profit_margin_change',
    PROFIT_GROWTH: 'profit_growth',

    // Cash Flow Events
    CASH_RECEIVED: 'cash_received',
    CASH_PAID: 'cash_paid',
    CASH_FLOW_POSITIVE: 'cash_flow_positive',
    CASH_FLOW_NEGATIVE: 'cash_flow_negative',
    CASH_FLOW_IMPROVED: 'cash_flow_improved',
    CASH_FLOW_WORSENED: 'cash_flow_worsened',

    // Investment Events
    INVESTMENT_MADE: 'investment_made',
    INVESTMENT_RETURN: 'investment_return',
    INVESTMENT_LOSS: 'investment_loss',
    ROI_CHANGE: 'roi_change',

    // Budget Events
    BUDGET_CREATED: 'budget_created',
    BUDGET_UPDATED: 'budget_updated',
    BUDGET_APPROVED: 'budget_approved',
    BUDGET_VARIANCE: 'budget_variance',

    // Financial Health Events
    FINANCIAL_HEALTH_GOOD: 'financial_health_good',
    FINANCIAL_HEALTH_WARNING: 'financial_health_warning',
    FINANCIAL_HEALTH_CRITICAL: 'financial_health_critical',
  } as const,

  // Financial Analytics Dimensions
  DIMENSIONS: {
    // Time Dimensions
    DATE: 'date',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
    FISCAL_YEAR: 'fiscal_year',
    FISCAL_QUARTER: 'fiscal_quarter',

    // Revenue Dimensions
    REVENUE_STREAM: 'revenue_stream',
    REVENUE_CATEGORY: 'revenue_category',
    REVENUE_SOURCE: 'revenue_source',
    PRODUCT: 'product',
    SERVICE: 'service',

    // Expense Dimensions
    EXPENSE_CATEGORY: 'expense_category',
    EXPENSE_TYPE: 'expense_type',
    EXPENSE_DEPARTMENT: 'expense_department',
    COST_CENTER: 'cost_center',

    // Profit Dimensions
    PROFIT_CENTER: 'profit_center',
    BUSINESS_UNIT: 'business_unit',
    DEPARTMENT: 'department',
    TEAM: 'team',

    // Customer Dimensions
    CUSTOMER_ID: 'customer_id',
    CUSTOMER_TYPE: 'customer_type',
    CUSTOMER_SEGMENT: 'customer_segment',

    // Vendor Dimensions
    VENDOR_ID: 'vendor_id',
    VENDOR_NAME: 'vendor_name',
    VENDOR_TYPE: 'vendor_type',

    // Geography Dimensions
    COUNTRY: 'country',
    REGION: 'region',
    CITY: 'city',

    // Currency Dimensions
    CURRENCY: 'currency',
    EXCHANGE_RATE: 'exchange_rate',

    // Budget Dimensions
    BUDGET_ID: 'budget_id',
    BUDGET_CATEGORY: 'budget_category',
    BUDGET_PERIOD: 'budget_period',
  } as const,

  // Financial Analytics Metrics
  METRICS: {
    // Revenue Metrics
    TOTAL_REVENUE: 'total_revenue',
    GROSS_REVENUE: 'gross_revenue',
    NET_REVENUE: 'net_revenue',
    RECURRING_REVENUE: 'recurring_revenue',
    NON_RECURRING_REVENUE: 'non_recurring_revenue',
    REVENUE_PER_USER: 'revenue_per_user',
    REVENUE_PER_CUSTOMER: 'revenue_per_customer',
    REVENUE_GROWTH: 'revenue_growth',

    // Profit Metrics
    TOTAL_PROFIT: 'total_profit',
    GROSS_PROFIT: 'gross_profit',
    NET_PROFIT: 'net_profit',
    OPERATING_PROFIT: 'operating_profit',
    EBIT: 'ebit',
    EBITDA: 'ebitda',
    PROFIT_GROWTH: 'profit_growth',

    // Margin Metrics
    GROSS_MARGIN: 'gross_margin',
    NET_MARGIN: 'net_margin',
    OPERATING_MARGIN: 'operating_margin',
    EBIT_MARGIN: 'ebit_margin',
    EBITDA_MARGIN: 'ebitda_margin',

    // Cost Metrics
    TOTAL_COST: 'total_cost',
    FIXED_COST: 'fixed_cost',
    VARIABLE_COST: 'variable_cost',
    OPERATING_COST: 'operating_cost',
    COST_PER_UNIT: 'cost_per_unit',
    COST_PER_CUSTOMER: 'cost_per_customer',
    COST_GROWTH: 'cost_growth',

    // Cash Flow Metrics
    OPERATING_CASH_FLOW: 'operating_cash_flow',
    INVESTING_CASH_FLOW: 'investing_cash_flow',
    FINANCING_CASH_FLOW: 'financing_cash_flow',
    NET_CASH_FLOW: 'net_cash_flow',
    FREE_CASH_FLOW: 'free_cash_flow',
    CASH_CONVERSION_CYCLE: 'cash_conversion_cycle',

    // Investment Metrics
    ROI: 'roi',
    ROA: 'roa',
    ROE: 'roe',
    ROIC: 'roic',
    IRR: 'irr',
    NPV: 'npv',
    PAYBACK_PERIOD: 'payback_period',

    // Budget Metrics
    BUDGET_AMOUNT: 'budget_amount',
    ACTUAL_AMOUNT: 'actual_amount',
    VARIANCE: 'variance',
    VARIANCE_PERCENTAGE: 'variance_percentage',
    BUDGET_UTILIZATION: 'budget_utilization',
    FORECAST_ACCURACY: 'forecast_accuracy',

    // Tax Metrics
    TAX_EXPENSE: 'tax_expense',
    TAX_RATE: 'tax_rate',
    EFFECTIVE_TAX_RATE: 'effective_tax_rate',
    TAX_LIABILITY: 'tax_liability',

    // Financial Health Metrics
    CURRENT_RATIO: 'current_ratio',
    QUICK_RATIO: 'quick_ratio',
    DEBT_TO_EQUITY: 'debt_to_equity',
    INTEREST_COVERAGE: 'interest_coverage',
    WORKING_CAPITAL: 'working_capital',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Financial Analytics Segments
  SEGMENTS: {
    // Revenue Segments
    HIGH_REVENUE: 'high_revenue',
    MEDIUM_REVENUE: 'medium_revenue',
    LOW_REVENUE: 'low_revenue',

    // Profit Segments
    HIGHLY_PROFITABLE: 'highly_profitable',
    PROFITABLE: 'profitable',
    BREAK_EVEN: 'break_even',
    UNPROFITABLE: 'unprofitable',

    // Cost Segments
    HIGH_COST: 'high_cost',
    MEDIUM_COST: 'medium_cost',
    LOW_COST: 'low_cost',

    // Cash Flow Segments
    POSITIVE_CASH_FLOW: 'positive_cash_flow',
    NEGATIVE_CASH_FLOW: 'negative_cash_flow',
    IMPROVING_CASH_FLOW: 'improving_cash_flow',
    DECLINING_CASH_FLOW: 'declining_cash_flow',

    // Investment Segments
    HIGH_ROI: 'high_roi',
    MEDIUM_ROI: 'medium_roi',
    LOW_ROI: 'low_roi',
    NEGATIVE_ROI: 'negative_roi',

    // Budget Segments
    UNDER_BUDGET: 'under_budget',
    ON_BUDGET: 'on_budget',
    OVER_BUDGET: 'over_budget',

    // Financial Health Segments
    EXCELLENT: 'excellent',
    GOOD: 'good',
    FAIR: 'fair',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Financial Analytics Cohorts
  COHORTS: {
    REVENUE_STREAM: 'revenue_stream',
    PROFIT_CENTER: 'profit_center',
    COST_CENTER: 'cost_center',
    BUSINESS_UNIT: 'business_unit',
    CUSTOMER_TYPE: 'customer_type',
    FISCAL_PERIOD: 'fiscal_period',
  } as const,

  // Financial Analytics Granularity
  GRANULARITY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Financial Analytics Types
export type FinancialAnalyticsType =
  (typeof FINANCIAL_ANALYTICS.TYPES)[keyof typeof FINANCIAL_ANALYTICS.TYPES];

// Financial Analytics Status
export type FinancialAnalyticsStatus =
  (typeof FINANCIAL_ANALYTICS.STATUS)[keyof typeof FINANCIAL_ANALYTICS.STATUS];

// Financial Analytics Scopes
export type FinancialAnalyticsScope =
  (typeof FINANCIAL_ANALYTICS.SCOPES)[keyof typeof FINANCIAL_ANALYTICS.SCOPES];

// Financial Analytics Events
export type FinancialAnalyticsEvent =
  (typeof FINANCIAL_ANALYTICS.EVENTS)[keyof typeof FINANCIAL_ANALYTICS.EVENTS];

// Financial Analytics Dimensions
export type FinancialAnalyticsDimension =
  (typeof FINANCIAL_ANALYTICS.DIMENSIONS)[keyof typeof FINANCIAL_ANALYTICS.DIMENSIONS];

// Financial Analytics Metrics
export type FinancialAnalyticsMetric =
  (typeof FINANCIAL_ANALYTICS.METRICS)[keyof typeof FINANCIAL_ANALYTICS.METRICS];

// Financial Analytics Segments
export type FinancialAnalyticsSegment =
  (typeof FINANCIAL_ANALYTICS.SEGMENTS)[keyof typeof FINANCIAL_ANALYTICS.SEGMENTS];

// Financial Analytics Cohorts
export type FinancialAnalyticsCohort =
  (typeof FINANCIAL_ANALYTICS.COHORTS)[keyof typeof FINANCIAL_ANALYTICS.COHORTS];

// Financial Analytics Granularity
export type FinancialAnalyticsGranularity =
  (typeof FINANCIAL_ANALYTICS.GRANULARITY)[keyof typeof FINANCIAL_ANALYTICS.GRANULARITY];

// Financial Analytics Status Labels
export function getFinancialAnalyticsStatusLabel(status: FinancialAnalyticsStatus): string {
  const labels: Record<FinancialAnalyticsStatus, string> = {
    [FINANCIAL_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [FINANCIAL_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [FINANCIAL_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [FINANCIAL_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [FINANCIAL_ANALYTICS.STATUS.FAILED]: 'Failed',
    [FINANCIAL_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [FINANCIAL_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [FINANCIAL_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [FINANCIAL_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Financial Analytics Event Labels
export function getFinancialAnalyticsEventLabel(event: FinancialAnalyticsEvent): string {
  const labels: Record<FinancialAnalyticsEvent, string> = {
    [FINANCIAL_ANALYTICS.EVENTS.REVENUE_RECEIVED]: 'Revenue Received',
    [FINANCIAL_ANALYTICS.EVENTS.REVENUE_RECOGNIZED]: 'Revenue Recognized',
    [FINANCIAL_ANALYTICS.EVENTS.REVENUE_DEFERRED]: 'Revenue Deferred',
    [FINANCIAL_ANALYTICS.EVENTS.REVENUE_GROWTH]: 'Revenue Growth',
    [FINANCIAL_ANALYTICS.EVENTS.EXPENSE_INCURRED]: 'Expense Incurred',
    [FINANCIAL_ANALYTICS.EVENTS.EXPENSE_APPROVED]: 'Expense Approved',
    [FINANCIAL_ANALYTICS.EVENTS.EXPENSE_PAID]: 'Expense Paid',
    [FINANCIAL_ANALYTICS.EVENTS.EXPENSE_OVER_BUDGET]: 'Expense Over Budget',
    [FINANCIAL_ANALYTICS.EVENTS.PROFIT_REALIZED]: 'Profit Realized',
    [FINANCIAL_ANALYTICS.EVENTS.PROFIT_MARGIN_CHANGE]: 'Profit Margin Change',
    [FINANCIAL_ANALYTICS.EVENTS.PROFIT_GROWTH]: 'Profit Growth',
    [FINANCIAL_ANALYTICS.EVENTS.CASH_RECEIVED]: 'Cash Received',
    [FINANCIAL_ANALYTICS.EVENTS.CASH_PAID]: 'Cash Paid',
    [FINANCIAL_ANALYTICS.EVENTS.CASH_FLOW_POSITIVE]: 'Cash Flow Positive',
    [FINANCIAL_ANALYTICS.EVENTS.CASH_FLOW_NEGATIVE]: 'Cash Flow Negative',
    [FINANCIAL_ANALYTICS.EVENTS.CASH_FLOW_IMPROVED]: 'Cash Flow Improved',
    [FINANCIAL_ANALYTICS.EVENTS.CASH_FLOW_WORSENED]: 'Cash Flow Worsened',
    [FINANCIAL_ANALYTICS.EVENTS.INVESTMENT_MADE]: 'Investment Made',
    [FINANCIAL_ANALYTICS.EVENTS.INVESTMENT_RETURN]: 'Investment Return',
    [FINANCIAL_ANALYTICS.EVENTS.INVESTMENT_LOSS]: 'Investment Loss',
    [FINANCIAL_ANALYTICS.EVENTS.ROI_CHANGE]: 'ROI Change',
    [FINANCIAL_ANALYTICS.EVENTS.BUDGET_CREATED]: 'Budget Created',
    [FINANCIAL_ANALYTICS.EVENTS.BUDGET_UPDATED]: 'Budget Updated',
    [FINANCIAL_ANALYTICS.EVENTS.BUDGET_APPROVED]: 'Budget Approved',
    [FINANCIAL_ANALYTICS.EVENTS.BUDGET_VARIANCE]: 'Budget Variance',
    [FINANCIAL_ANALYTICS.EVENTS.FINANCIAL_HEALTH_GOOD]: 'Financial Health Good',
    [FINANCIAL_ANALYTICS.EVENTS.FINANCIAL_HEALTH_WARNING]: 'Financial Health Warning',
    [FINANCIAL_ANALYTICS.EVENTS.FINANCIAL_HEALTH_CRITICAL]: 'Financial Health Critical',
  };
  return labels[event] || 'Unknown';
}

// Financial Analytics Dimension Labels
export function getFinancialAnalyticsDimensionLabel(
  dimension: FinancialAnalyticsDimension
): string {
  const labels: Record<FinancialAnalyticsDimension, string> = {
    [FINANCIAL_ANALYTICS.DIMENSIONS.DATE]: 'Date',
    [FINANCIAL_ANALYTICS.DIMENSIONS.MONTH]: 'Month',
    [FINANCIAL_ANALYTICS.DIMENSIONS.QUARTER]: 'Quarter',
    [FINANCIAL_ANALYTICS.DIMENSIONS.YEAR]: 'Year',
    [FINANCIAL_ANALYTICS.DIMENSIONS.FISCAL_YEAR]: 'Fiscal Year',
    [FINANCIAL_ANALYTICS.DIMENSIONS.FISCAL_QUARTER]: 'Fiscal Quarter',
    [FINANCIAL_ANALYTICS.DIMENSIONS.REVENUE_STREAM]: 'Revenue Stream',
    [FINANCIAL_ANALYTICS.DIMENSIONS.REVENUE_CATEGORY]: 'Revenue Category',
    [FINANCIAL_ANALYTICS.DIMENSIONS.REVENUE_SOURCE]: 'Revenue Source',
    [FINANCIAL_ANALYTICS.DIMENSIONS.PRODUCT]: 'Product',
    [FINANCIAL_ANALYTICS.DIMENSIONS.SERVICE]: 'Service',
    [FINANCIAL_ANALYTICS.DIMENSIONS.EXPENSE_CATEGORY]: 'Expense Category',
    [FINANCIAL_ANALYTICS.DIMENSIONS.EXPENSE_TYPE]: 'Expense Type',
    [FINANCIAL_ANALYTICS.DIMENSIONS.EXPENSE_DEPARTMENT]: 'Expense Department',
    [FINANCIAL_ANALYTICS.DIMENSIONS.COST_CENTER]: 'Cost Center',
    [FINANCIAL_ANALYTICS.DIMENSIONS.PROFIT_CENTER]: 'Profit Center',
    [FINANCIAL_ANALYTICS.DIMENSIONS.BUSINESS_UNIT]: 'Business Unit',
    [FINANCIAL_ANALYTICS.DIMENSIONS.DEPARTMENT]: 'Department',
    [FINANCIAL_ANALYTICS.DIMENSIONS.TEAM]: 'Team',
    [FINANCIAL_ANALYTICS.DIMENSIONS.CUSTOMER_ID]: 'Customer ID',
    [FINANCIAL_ANALYTICS.DIMENSIONS.CUSTOMER_TYPE]: 'Customer Type',
    [FINANCIAL_ANALYTICS.DIMENSIONS.CUSTOMER_SEGMENT]: 'Customer Segment',
    [FINANCIAL_ANALYTICS.DIMENSIONS.VENDOR_ID]: 'Vendor ID',
    [FINANCIAL_ANALYTICS.DIMENSIONS.VENDOR_NAME]: 'Vendor Name',
    [FINANCIAL_ANALYTICS.DIMENSIONS.VENDOR_TYPE]: 'Vendor Type',
    [FINANCIAL_ANALYTICS.DIMENSIONS.COUNTRY]: 'Country',
    [FINANCIAL_ANALYTICS.DIMENSIONS.REGION]: 'Region',
    [FINANCIAL_ANALYTICS.DIMENSIONS.CITY]: 'City',
    [FINANCIAL_ANALYTICS.DIMENSIONS.CURRENCY]: 'Currency',
    [FINANCIAL_ANALYTICS.DIMENSIONS.EXCHANGE_RATE]: 'Exchange Rate',
    [FINANCIAL_ANALYTICS.DIMENSIONS.BUDGET_ID]: 'Budget ID',
    [FINANCIAL_ANALYTICS.DIMENSIONS.BUDGET_CATEGORY]: 'Budget Category',
    [FINANCIAL_ANALYTICS.DIMENSIONS.BUDGET_PERIOD]: 'Budget Period',
  };
  return labels[dimension] || 'Unknown';
}

// Financial Analytics Segment Labels
export function getFinancialAnalyticsSegmentLabel(segment: FinancialAnalyticsSegment): string {
  const labels: Record<FinancialAnalyticsSegment, string> = {
    [FINANCIAL_ANALYTICS.SEGMENTS.HIGH_REVENUE]: 'High Revenue',
    [FINANCIAL_ANALYTICS.SEGMENTS.MEDIUM_REVENUE]: 'Medium Revenue',
    [FINANCIAL_ANALYTICS.SEGMENTS.LOW_REVENUE]: 'Low Revenue',
    [FINANCIAL_ANALYTICS.SEGMENTS.HIGHLY_PROFITABLE]: 'Highly Profitable',
    [FINANCIAL_ANALYTICS.SEGMENTS.PROFITABLE]: 'Profitable',
    [FINANCIAL_ANALYTICS.SEGMENTS.BREAK_EVEN]: 'Break Even',
    [FINANCIAL_ANALYTICS.SEGMENTS.UNPROFITABLE]: 'Unprofitable',
    [FINANCIAL_ANALYTICS.SEGMENTS.HIGH_COST]: 'High Cost',
    [FINANCIAL_ANALYTICS.SEGMENTS.MEDIUM_COST]: 'Medium Cost',
    [FINANCIAL_ANALYTICS.SEGMENTS.LOW_COST]: 'Low Cost',
    [FINANCIAL_ANALYTICS.SEGMENTS.POSITIVE_CASH_FLOW]: 'Positive Cash Flow',
    [FINANCIAL_ANALYTICS.SEGMENTS.NEGATIVE_CASH_FLOW]: 'Negative Cash Flow',
    [FINANCIAL_ANALYTICS.SEGMENTS.IMPROVING_CASH_FLOW]: 'Improving Cash Flow',
    [FINANCIAL_ANALYTICS.SEGMENTS.DECLINING_CASH_FLOW]: 'Declining Cash Flow',
    [FINANCIAL_ANALYTICS.SEGMENTS.HIGH_ROI]: 'High ROI',
    [FINANCIAL_ANALYTICS.SEGMENTS.MEDIUM_ROI]: 'Medium ROI',
    [FINANCIAL_ANALYTICS.SEGMENTS.LOW_ROI]: 'Low ROI',
    [FINANCIAL_ANALYTICS.SEGMENTS.NEGATIVE_ROI]: 'Negative ROI',
    [FINANCIAL_ANALYTICS.SEGMENTS.UNDER_BUDGET]: 'Under Budget',
    [FINANCIAL_ANALYTICS.SEGMENTS.ON_BUDGET]: 'On Budget',
    [FINANCIAL_ANALYTICS.SEGMENTS.OVER_BUDGET]: 'Over Budget',
    [FINANCIAL_ANALYTICS.SEGMENTS.EXCELLENT]: 'Excellent',
    [FINANCIAL_ANALYTICS.SEGMENTS.GOOD]: 'Good',
    [FINANCIAL_ANALYTICS.SEGMENTS.FAIR]: 'Fair',
    [FINANCIAL_ANALYTICS.SEGMENTS.POOR]: 'Poor',
    [FINANCIAL_ANALYTICS.SEGMENTS.CRITICAL]: 'Critical',
  };
  return labels[segment] || 'Unknown';
}

// Financial Analytics Cohort Labels
export function getFinancialAnalyticsCohortLabel(cohort: FinancialAnalyticsCohort): string {
  const labels: Record<FinancialAnalyticsCohort, string> = {
    [FINANCIAL_ANALYTICS.COHORTS.REVENUE_STREAM]: 'Revenue Stream',
    [FINANCIAL_ANALYTICS.COHORTS.PROFIT_CENTER]: 'Profit Center',
    [FINANCIAL_ANALYTICS.COHORTS.COST_CENTER]: 'Cost Center',
    [FINANCIAL_ANALYTICS.COHORTS.BUSINESS_UNIT]: 'Business Unit',
    [FINANCIAL_ANALYTICS.COHORTS.CUSTOMER_TYPE]: 'Customer Type',
    [FINANCIAL_ANALYTICS.COHORTS.FISCAL_PERIOD]: 'Fiscal Period',
  };
  return labels[cohort] || 'Unknown';
}

// Financial Analytics Granularity Labels
export function getFinancialAnalyticsGranularityLabel(
  granularity: FinancialAnalyticsGranularity
): string {
  const labels: Record<FinancialAnalyticsGranularity, string> = {
    [FINANCIAL_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [FINANCIAL_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [FINANCIAL_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [FINANCIAL_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [FINANCIAL_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if financial analytics is active
export function isFinancialAnalyticsActive(status: FinancialAnalyticsStatus): boolean {
  const activeStatuses: FinancialAnalyticsStatus[] = [
    FINANCIAL_ANALYTICS.STATUS.TRACKING,
    FINANCIAL_ANALYTICS.STATUS.PROCESSING,
    FINANCIAL_ANALYTICS.STATUS.ANALYZING,
    FINANCIAL_ANALYTICS.STATUS.UPDATING,
    FINANCIAL_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if financial analytics is completed
export function isFinancialAnalyticsCompleted(status: FinancialAnalyticsStatus): boolean {
  return status === FINANCIAL_ANALYTICS.STATUS.COMPLETED;
}

// Check if financial analytics has failed
export function isFinancialAnalyticsFailed(status: FinancialAnalyticsStatus): boolean {
  return status === FINANCIAL_ANALYTICS.STATUS.FAILED;
}

// Check if event is revenue event
export function isFinancialAnalyticsRevenueEvent(event: FinancialAnalyticsEvent): boolean {
  const revenueEvents: FinancialAnalyticsEvent[] = [
    FINANCIAL_ANALYTICS.EVENTS.REVENUE_RECEIVED,
    FINANCIAL_ANALYTICS.EVENTS.REVENUE_RECOGNIZED,
    FINANCIAL_ANALYTICS.EVENTS.REVENUE_DEFERRED,
    FINANCIAL_ANALYTICS.EVENTS.REVENUE_GROWTH,
  ];
  return revenueEvents.includes(event);
}

// Check if event is expense event
export function isFinancialAnalyticsExpenseEvent(event: FinancialAnalyticsEvent): boolean {
  const expenseEvents: FinancialAnalyticsEvent[] = [
    FINANCIAL_ANALYTICS.EVENTS.EXPENSE_INCURRED,
    FINANCIAL_ANALYTICS.EVENTS.EXPENSE_APPROVED,
    FINANCIAL_ANALYTICS.EVENTS.EXPENSE_PAID,
    FINANCIAL_ANALYTICS.EVENTS.EXPENSE_OVER_BUDGET,
  ];
  return expenseEvents.includes(event);
}

// Check if event is cash flow event
export function isFinancialAnalyticsCashFlowEvent(event: FinancialAnalyticsEvent): boolean {
  const cashFlowEvents: FinancialAnalyticsEvent[] = [
    FINANCIAL_ANALYTICS.EVENTS.CASH_RECEIVED,
    FINANCIAL_ANALYTICS.EVENTS.CASH_PAID,
    FINANCIAL_ANALYTICS.EVENTS.CASH_FLOW_POSITIVE,
    FINANCIAL_ANALYTICS.EVENTS.CASH_FLOW_NEGATIVE,
    FINANCIAL_ANALYTICS.EVENTS.CASH_FLOW_IMPROVED,
    FINANCIAL_ANALYTICS.EVENTS.CASH_FLOW_WORSENED,
  ];
  return cashFlowEvents.includes(event);
}
