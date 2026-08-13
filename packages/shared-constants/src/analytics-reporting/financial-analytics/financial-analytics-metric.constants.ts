/**
 * @fileoverview Financial analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Financial analytics metrics
 */
export enum FinancialAnalyticsMetric {
  /** Total revenue */
  TOTAL_REVENUE = 'TOTAL_REVENUE',
  /** Net revenue */
  NET_REVENUE = 'NET_REVENUE',
  /** Gross profit */
  GROSS_PROFIT = 'GROSS_PROFIT',
  /** Net profit */
  NET_PROFIT = 'NET_PROFIT',
  /** EBITDA (Earnings Before Interest, Taxes, Depreciation, Amortization) */
  EBITDA = 'EBITDA',
  /** EBIT (Earnings Before Interest and Taxes) */
  EBIT = 'EBIT',
  /** Operating income */
  OPERATING_INCOME = 'OPERATING_INCOME',
  /** Net income */
  NET_INCOME = 'NET_INCOME',
  /** Revenue growth rate percentage */
  REVENUE_GROWTH_RATE = 'REVENUE_GROWTH_RATE',
  /** Profit margin percentage */
  PROFIT_MARGIN = 'PROFIT_MARGIN',
  /** Gross margin percentage */
  GROSS_MARGIN = 'GROSS_MARGIN',
  /** Operating margin percentage */
  OPERATING_MARGIN = 'OPERATING_MARGIN',
  /** Net margin percentage */
  NET_MARGIN = 'NET_MARGIN',
  /** Cost of goods sold */
  COST_OF_GOODS_SOLD = 'COST_OF_GOODS_SOLD',
  /** Operating expenses */
  OPERATING_EXPENSES = 'OPERATING_EXPENSES',
  /** Capital expenditures */
  CAPITAL_EXPENDITURES = 'CAPITAL_EXPENDITURES',
  /** Cash flow from operations */
  CASH_FLOW_FROM_OPERATIONS = 'CASH_FLOW_FROM_OPERATIONS',
  /** Cash flow from investing */
  CASH_FLOW_FROM_INVESTING = 'CASH_FLOW_FROM_INVESTING',
  /** Cash flow from financing */
  CASH_FLOW_FROM_FINANCING = 'CASH_FLOW_FROM_FINANCING',
  /** Free cash flow */
  FREE_CASH_FLOW = 'FREE_CASH_FLOW',
  /** Return on assets percentage */
  RETURN_ON_ASSETS = 'RETURN_ON_ASSETS',
  /** Return on equity percentage */
  RETURN_ON_EQUITY = 'RETURN_ON_EQUITY',
  /** Return on investment percentage */
  RETURN_ON_INVESTMENT = 'RETURN_ON_INVESTMENT',
  /** Debt to equity ratio */
  DEBT_TO_EQUITY_RATIO = 'DEBT_TO_EQUITY_RATIO',
  /** Current ratio */
  CURRENT_RATIO = 'CURRENT_RATIO',
  /** Quick ratio */
  QUICK_RATIO = 'QUICK_RATIO',
  /** Accounts receivable turnover */
  ACCOUNTS_RECEIVABLE_TURNOVER = 'ACCOUNTS_RECEIVABLE_TURNOVER',
  /** Accounts payable turnover */
  ACCOUNTS_PAYABLE_TURNOVER = 'ACCOUNTS_PAYABLE_TURNOVER',
  /** Inventory turnover */
  INVENTORY_TURNOVER = 'INVENTORY_TURNOVER',
  /** Asset turnover */
  ASSET_TURNOVER = 'ASSET_TURNOVER',
  /** Earnings per share */
  EARNINGS_PER_SHARE = 'EARNINGS_PER_SHARE',
  /** Price to earnings ratio */
  PRICE_TO_EARNINGS_RATIO = 'PRICE_TO_EARNINGS_RATIO',
  /** Dividend yield percentage */
  DIVIDEND_YIELD = 'DIVIDEND_YIELD',
  /** Book value per share */
  BOOK_VALUE_PER_SHARE = 'BOOK_VALUE_PER_SHARE',
  /** Working capital */
  WORKING_CAPITAL = 'WORKING_CAPITAL',
  /** Operating cash flow */
  OPERATING_CASH_FLOW = 'OPERATING_CASH_FLOW',
  /** Free cash flow margin */
  FREE_CASH_FLOW_MARGIN = 'FREE_CASH_FLOW_MARGIN',
  /** Revenue per employee */
  REVENUE_PER_EMPLOYEE = 'REVENUE_PER_EMPLOYEE',
  /** Operating leverage */
  OPERATING_LEVERAGE = 'OPERATING_LEVERAGE',
  /** Financial leverage */
  FINANCIAL_LEVERAGE = 'FINANCIAL_LEVERAGE',
  /** Interest coverage ratio */
  INTEREST_COVERAGE_RATIO = 'INTEREST_COVERAGE_RATIO',
  /** Asset coverage ratio */
  ASSET_COVERAGE_RATIO = 'ASSET_COVERAGE_RATIO',
}

/**
 * Financial metric type classification
 */
export enum FinancialAnalyticsMetricType {
  /** Revenue metrics */
  REVENUE = 'REVENUE',
  /** Profit metrics */
  PROFIT = 'PROFIT',
  /** Margin metrics */
  MARGIN = 'MARGIN',
  /** Cash flow metrics */
  CASH_FLOW = 'CASH_FLOW',
  /** Return metrics */
  RETURN = 'RETURN',
  /** Ratio metrics */
  RATIO = 'RATIO',
  /** Turnover metrics */
  TURNOVER = 'TURNOVER',
  /** Per share metrics */
  PER_SHARE = 'PER_SHARE',
}

/**
 * Financial metric category mapping
 */
export const FINANCIAL_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  FinancialAnalyticsMetric,
  FinancialAnalyticsMetricType
> = {
  [FinancialAnalyticsMetric.TOTAL_REVENUE]: FinancialAnalyticsMetricType.REVENUE,
  [FinancialAnalyticsMetric.NET_REVENUE]: FinancialAnalyticsMetricType.REVENUE,
  [FinancialAnalyticsMetric.GROSS_PROFIT]: FinancialAnalyticsMetricType.PROFIT,
  [FinancialAnalyticsMetric.NET_PROFIT]: FinancialAnalyticsMetricType.PROFIT,
  [FinancialAnalyticsMetric.EBITDA]: FinancialAnalyticsMetricType.PROFIT,
  [FinancialAnalyticsMetric.EBIT]: FinancialAnalyticsMetricType.PROFIT,
  [FinancialAnalyticsMetric.OPERATING_INCOME]: FinancialAnalyticsMetricType.PROFIT,
  [FinancialAnalyticsMetric.NET_INCOME]: FinancialAnalyticsMetricType.PROFIT,
  [FinancialAnalyticsMetric.REVENUE_GROWTH_RATE]: FinancialAnalyticsMetricType.REVENUE,
  [FinancialAnalyticsMetric.PROFIT_MARGIN]: FinancialAnalyticsMetricType.MARGIN,
  [FinancialAnalyticsMetric.GROSS_MARGIN]: FinancialAnalyticsMetricType.MARGIN,
  [FinancialAnalyticsMetric.OPERATING_MARGIN]: FinancialAnalyticsMetricType.MARGIN,
  [FinancialAnalyticsMetric.NET_MARGIN]: FinancialAnalyticsMetricType.MARGIN,
  [FinancialAnalyticsMetric.COST_OF_GOODS_SOLD]: FinancialAnalyticsMetricType.REVENUE,
  [FinancialAnalyticsMetric.OPERATING_EXPENSES]: FinancialAnalyticsMetricType.REVENUE,
  [FinancialAnalyticsMetric.CAPITAL_EXPENDITURES]: FinancialAnalyticsMetricType.CASH_FLOW,
  [FinancialAnalyticsMetric.CASH_FLOW_FROM_OPERATIONS]: FinancialAnalyticsMetricType.CASH_FLOW,
  [FinancialAnalyticsMetric.CASH_FLOW_FROM_INVESTING]: FinancialAnalyticsMetricType.CASH_FLOW,
  [FinancialAnalyticsMetric.CASH_FLOW_FROM_FINANCING]: FinancialAnalyticsMetricType.CASH_FLOW,
  [FinancialAnalyticsMetric.FREE_CASH_FLOW]: FinancialAnalyticsMetricType.CASH_FLOW,
  [FinancialAnalyticsMetric.RETURN_ON_ASSETS]: FinancialAnalyticsMetricType.RETURN,
  [FinancialAnalyticsMetric.RETURN_ON_EQUITY]: FinancialAnalyticsMetricType.RETURN,
  [FinancialAnalyticsMetric.RETURN_ON_INVESTMENT]: FinancialAnalyticsMetricType.RETURN,
  [FinancialAnalyticsMetric.DEBT_TO_EQUITY_RATIO]: FinancialAnalyticsMetricType.RATIO,
  [FinancialAnalyticsMetric.CURRENT_RATIO]: FinancialAnalyticsMetricType.RATIO,
  [FinancialAnalyticsMetric.QUICK_RATIO]: FinancialAnalyticsMetricType.RATIO,
  [FinancialAnalyticsMetric.ACCOUNTS_RECEIVABLE_TURNOVER]: FinancialAnalyticsMetricType.TURNOVER,
  [FinancialAnalyticsMetric.ACCOUNTS_PAYABLE_TURNOVER]: FinancialAnalyticsMetricType.TURNOVER,
  [FinancialAnalyticsMetric.INVENTORY_TURNOVER]: FinancialAnalyticsMetricType.TURNOVER,
  [FinancialAnalyticsMetric.ASSET_TURNOVER]: FinancialAnalyticsMetricType.TURNOVER,
  [FinancialAnalyticsMetric.EARNINGS_PER_SHARE]: FinancialAnalyticsMetricType.PER_SHARE,
  [FinancialAnalyticsMetric.PRICE_TO_EARNINGS_RATIO]: FinancialAnalyticsMetricType.RATIO,
  [FinancialAnalyticsMetric.DIVIDEND_YIELD]: FinancialAnalyticsMetricType.RETURN,
  [FinancialAnalyticsMetric.BOOK_VALUE_PER_SHARE]: FinancialAnalyticsMetricType.PER_SHARE,
  [FinancialAnalyticsMetric.WORKING_CAPITAL]: FinancialAnalyticsMetricType.CASH_FLOW,
  [FinancialAnalyticsMetric.OPERATING_CASH_FLOW]: FinancialAnalyticsMetricType.CASH_FLOW,
  [FinancialAnalyticsMetric.FREE_CASH_FLOW_MARGIN]: FinancialAnalyticsMetricType.MARGIN,
  [FinancialAnalyticsMetric.REVENUE_PER_EMPLOYEE]: FinancialAnalyticsMetricType.REVENUE,
  [FinancialAnalyticsMetric.OPERATING_LEVERAGE]: FinancialAnalyticsMetricType.RATIO,
  [FinancialAnalyticsMetric.FINANCIAL_LEVERAGE]: FinancialAnalyticsMetricType.RATIO,
  [FinancialAnalyticsMetric.INTEREST_COVERAGE_RATIO]: FinancialAnalyticsMetricType.RATIO,
  [FinancialAnalyticsMetric.ASSET_COVERAGE_RATIO]: FinancialAnalyticsMetricType.RATIO,
};

/**
 * Financial metric format type
 */
export enum FinancialAnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Ratio format */
  RATIO = 'RATIO',
  /** Turnover format */
  TURNOVER = 'TURNOVER',
}

/**
 * Financial metric configuration
 */
export interface FinancialAnalyticsMetricConfig {
  label: string;
  description: string;
  format: FinancialAnalyticsMetricFormat;
  icon?: string;
  color?: string;
  isReversed: boolean;
  priority: number;
  threshold?: {
    good: number;
    average: number;
    poor: number;
  };
}

export const FINANCIAL_ANALYTICS_METRIC_CONFIG: Record<
  FinancialAnalyticsMetric,
  FinancialAnalyticsMetricConfig
> = {
  [FinancialAnalyticsMetric.TOTAL_REVENUE]: {
    label: 'Total Revenue',
    description: 'Total revenue generated from all sources',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [FinancialAnalyticsMetric.NET_REVENUE]: {
    label: 'Net Revenue',
    description: 'Revenue after returns and discounts',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [FinancialAnalyticsMetric.GROSS_PROFIT]: {
    label: 'Gross Profit',
    description: 'Revenue minus cost of goods sold',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [FinancialAnalyticsMetric.NET_PROFIT]: {
    label: 'Net Profit',
    description: 'Total profit after all expenses',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [FinancialAnalyticsMetric.EBITDA]: {
    label: 'EBITDA',
    description: 'Earnings before interest, taxes, depreciation, amortization',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.EBIT]: {
    label: 'EBIT',
    description: 'Earnings before interest and taxes',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.OPERATING_INCOME]: {
    label: 'Operating Income',
    description: 'Income from operations',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.NET_INCOME]: {
    label: 'Net Income',
    description: 'Total net income after all expenses and taxes',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [FinancialAnalyticsMetric.REVENUE_GROWTH_RATE]: {
    label: 'Revenue Growth Rate',
    description: 'Rate of revenue growth over period',
    format: FinancialAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 15,
      average: 10,
      poor: 5,
    },
  },
  [FinancialAnalyticsMetric.PROFIT_MARGIN]: {
    label: 'Profit Margin',
    description: 'Net profit as percentage of revenue',
    format: FinancialAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Percent',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 20,
      average: 15,
      poor: 10,
    },
  },
  [FinancialAnalyticsMetric.GROSS_MARGIN]: {
    label: 'Gross Margin',
    description: 'Gross profit as percentage of revenue',
    format: FinancialAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Percent',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 40,
      average: 30,
      poor: 20,
    },
  },
  [FinancialAnalyticsMetric.OPERATING_MARGIN]: {
    label: 'Operating Margin',
    description: 'Operating income as percentage of revenue',
    format: FinancialAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Percent',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 15,
      average: 10,
      poor: 5,
    },
  },
  [FinancialAnalyticsMetric.NET_MARGIN]: {
    label: 'Net Margin',
    description: 'Net income as percentage of revenue',
    format: FinancialAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Percent',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 10,
      average: 7,
      poor: 4,
    },
  },
  [FinancialAnalyticsMetric.COST_OF_GOODS_SOLD]: {
    label: 'Cost of Goods Sold',
    description: 'Direct cost of producing goods',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [FinancialAnalyticsMetric.OPERATING_EXPENSES]: {
    label: 'Operating Expenses',
    description: 'Total operating expenses',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [FinancialAnalyticsMetric.CAPITAL_EXPENDITURES]: {
    label: 'Capital Expenditures',
    description: 'Investments in long-term assets',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#6366F1',
    isReversed: true,
    priority: 2,
  },
  [FinancialAnalyticsMetric.CASH_FLOW_FROM_OPERATIONS]: {
    label: 'Operating Cash Flow',
    description: 'Cash generated from operations',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [FinancialAnalyticsMetric.CASH_FLOW_FROM_INVESTING]: {
    label: 'Investing Cash Flow',
    description: 'Cash used in investing activities',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#6366F1',
    isReversed: true,
    priority: 2,
  },
  [FinancialAnalyticsMetric.CASH_FLOW_FROM_FINANCING]: {
    label: 'Financing Cash Flow',
    description: 'Cash from financing activities',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.FREE_CASH_FLOW]: {
    label: 'Free Cash Flow',
    description: 'Cash available after capital expenditures',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [FinancialAnalyticsMetric.RETURN_ON_ASSETS]: {
    label: 'Return on Assets',
    description: 'Net income as percentage of total assets',
    format: FinancialAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 10,
      average: 7,
      poor: 4,
    },
  },
  [FinancialAnalyticsMetric.RETURN_ON_EQUITY]: {
    label: 'Return on Equity',
    description: 'Net income as percentage of shareholder equity',
    format: FinancialAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 15,
      average: 10,
      poor: 5,
    },
  },
  [FinancialAnalyticsMetric.RETURN_ON_INVESTMENT]: {
    label: 'Return on Investment',
    description: 'Return from investments',
    format: FinancialAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 20,
      average: 15,
      poor: 10,
    },
  },
  [FinancialAnalyticsMetric.DEBT_TO_EQUITY_RATIO]: {
    label: 'Debt to Equity Ratio',
    description: 'Ratio of debt to shareholder equity',
    format: FinancialAnalyticsMetricFormat.RATIO,
    icon: 'Scale',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [FinancialAnalyticsMetric.CURRENT_RATIO]: {
    label: 'Current Ratio',
    description: 'Current assets divided by current liabilities',
    format: FinancialAnalyticsMetricFormat.RATIO,
    icon: 'Scale',
    color: '#10B981',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 2,
      average: 1.5,
      poor: 1,
    },
  },
  [FinancialAnalyticsMetric.QUICK_RATIO]: {
    label: 'Quick Ratio',
    description: 'Liquid assets divided by current liabilities',
    format: FinancialAnalyticsMetricFormat.RATIO,
    icon: 'Scale',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 1.5,
      average: 1,
      poor: 0.5,
    },
  },
  [FinancialAnalyticsMetric.ACCOUNTS_RECEIVABLE_TURNOVER]: {
    label: 'Accounts Receivable Turnover',
    description: 'Net credit sales divided by average accounts receivable',
    format: FinancialAnalyticsMetricFormat.TURNOVER,
    icon: 'Repeat',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.ACCOUNTS_PAYABLE_TURNOVER]: {
    label: 'Accounts Payable Turnover',
    description: 'Cost of goods sold divided by average accounts payable',
    format: FinancialAnalyticsMetricFormat.TURNOVER,
    icon: 'Repeat',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.INVENTORY_TURNOVER]: {
    label: 'Inventory Turnover',
    description: 'Cost of goods sold divided by average inventory',
    format: FinancialAnalyticsMetricFormat.TURNOVER,
    icon: 'Repeat',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.ASSET_TURNOVER]: {
    label: 'Asset Turnover',
    description: 'Revenue divided by average total assets',
    format: FinancialAnalyticsMetricFormat.TURNOVER,
    icon: 'Repeat',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.EARNINGS_PER_SHARE]: {
    label: 'Earnings Per Share',
    description: 'Net income divided by number of shares',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [FinancialAnalyticsMetric.PRICE_TO_EARNINGS_RATIO]: {
    label: 'Price to Earnings Ratio',
    description: 'Market price per share divided by earnings per share',
    format: FinancialAnalyticsMetricFormat.RATIO,
    icon: 'Scale',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.DIVIDEND_YIELD]: {
    label: 'Dividend Yield',
    description: 'Annual dividend per share divided by price per share',
    format: FinancialAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Percent',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.BOOK_VALUE_PER_SHARE]: {
    label: 'Book Value Per Share',
    description: 'Shareholder equity divided by number of shares',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.WORKING_CAPITAL]: {
    label: 'Working Capital',
    description: 'Current assets minus current liabilities',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.OPERATING_CASH_FLOW]: {
    label: 'Operating Cash Flow',
    description: 'Cash flow from core operations',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.FREE_CASH_FLOW_MARGIN]: {
    label: 'Free Cash Flow Margin',
    description: 'Free cash flow as percentage of revenue',
    format: FinancialAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Percent',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.REVENUE_PER_EMPLOYEE]: {
    label: 'Revenue Per Employee',
    description: 'Total revenue divided by number of employees',
    format: FinancialAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.OPERATING_LEVERAGE]: {
    label: 'Operating Leverage',
    description: 'Fixed costs as percentage of total costs',
    format: FinancialAnalyticsMetricFormat.RATIO,
    icon: 'Scale',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.FINANCIAL_LEVERAGE]: {
    label: 'Financial Leverage',
    description: 'Total assets divided by equity',
    format: FinancialAnalyticsMetricFormat.RATIO,
    icon: 'Scale',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [FinancialAnalyticsMetric.INTEREST_COVERAGE_RATIO]: {
    label: 'Interest Coverage Ratio',
    description: 'EBIT divided by interest expense',
    format: FinancialAnalyticsMetricFormat.RATIO,
    icon: 'Scale',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [FinancialAnalyticsMetric.ASSET_COVERAGE_RATIO]: {
    label: 'Asset Coverage Ratio',
    description: 'Total assets divided by total liabilities',
    format: FinancialAnalyticsMetricFormat.RATIO,
    icon: 'Scale',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
};

/**
 * Get financial metric category
 */
export function getFinancialMetricCategory(
  metric: FinancialAnalyticsMetric
): FinancialAnalyticsMetricType {
  return FINANCIAL_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get financial metric label
 */
export function getFinancialMetricLabel(metric: FinancialAnalyticsMetric): string {
  return FINANCIAL_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get financial metric description
 */
export function getFinancialMetricDescription(metric: FinancialAnalyticsMetric): string {
  return FINANCIAL_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get financial metric format
 */
export function getFinancialMetricFormat(
  metric: FinancialAnalyticsMetric
): FinancialAnalyticsMetricFormat {
  return FINANCIAL_ANALYTICS_METRIC_CONFIG[metric]?.format || FinancialAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if financial metric is reversed (lower is better)
 */
export function isFinancialMetricReversed(metric: FinancialAnalyticsMetric): boolean {
  return FINANCIAL_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get financial metrics by category
 */
export function getFinancialMetricsByCategory(
  category: FinancialAnalyticsMetricType
): FinancialAnalyticsMetric[] {
  return Object.entries(FINANCIAL_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as FinancialAnalyticsMetric);
}

/**
 * Format financial metric value
 */
export function formatFinancialMetricValue(
  metric: FinancialAnalyticsMetric,
  value: number
): string {
  const format = getFinancialMetricFormat(metric);

  switch (format) {
    case FinancialAnalyticsMetricFormat.CURRENCY:
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
      }
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}K`;
      }
      return `$${value.toFixed(2)}`;
    case FinancialAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case FinancialAnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    case FinancialAnalyticsMetricFormat.TURNOVER:
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get financial metric priority
 */
export function getFinancialMetricPriority(metric: FinancialAnalyticsMetric): number {
  return FINANCIAL_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority financial metrics
 */
export function getHighPriorityFinancialMetrics(): FinancialAnalyticsMetric[] {
  return Object.values(FinancialAnalyticsMetric).filter(
    (metric) => getFinancialMetricPriority(metric) === 1
  );
}

/**
 * Get financial metric thresholds
 */
export function getFinancialMetricThreshold(
  metric: FinancialAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return FINANCIAL_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate financial metric performance
 */
export function evaluateFinancialMetricPerformance(
  metric: FinancialAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getFinancialMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isFinancialMetricReversed(metric);

  if (isReversed) {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.average) return 'average';
    return 'poor';
  } else {
    if (value >= threshold.good) return 'good';
    if (value >= threshold.average) return 'average';
    return 'poor';
  }
}

/**
 * Financial dashboard metrics
 */
export const FINANCIAL_DASHBOARD_METRICS: FinancialAnalyticsMetric[] = [
  FinancialAnalyticsMetric.TOTAL_REVENUE,
  FinancialAnalyticsMetric.GROSS_PROFIT,
  FinancialAnalyticsMetric.NET_PROFIT,
  FinancialAnalyticsMetric.REVENUE_GROWTH_RATE,
  FinancialAnalyticsMetric.PROFIT_MARGIN,
  FinancialAnalyticsMetric.NET_MARGIN,
  FinancialAnalyticsMetric.FREE_CASH_FLOW,
  FinancialAnalyticsMetric.RETURN_ON_INVESTMENT,
  FinancialAnalyticsMetric.EARNINGS_PER_SHARE,
];

/**
 * Financial profitability metrics
 */
export const FINANCIAL_PROFITABILITY_METRICS: FinancialAnalyticsMetric[] = [
  FinancialAnalyticsMetric.GROSS_PROFIT,
  FinancialAnalyticsMetric.NET_PROFIT,
  FinancialAnalyticsMetric.EBITDA,
  FinancialAnalyticsMetric.EBIT,
  FinancialAnalyticsMetric.OPERATING_INCOME,
  FinancialAnalyticsMetric.NET_INCOME,
  FinancialAnalyticsMetric.PROFIT_MARGIN,
  FinancialAnalyticsMetric.GROSS_MARGIN,
  FinancialAnalyticsMetric.OPERATING_MARGIN,
  FinancialAnalyticsMetric.NET_MARGIN,
];

/**
 * Financial cash flow metrics
 */
export const FINANCIAL_CASH_FLOW_METRICS: FinancialAnalyticsMetric[] = [
  FinancialAnalyticsMetric.CASH_FLOW_FROM_OPERATIONS,
  FinancialAnalyticsMetric.CASH_FLOW_FROM_INVESTING,
  FinancialAnalyticsMetric.CASH_FLOW_FROM_FINANCING,
  FinancialAnalyticsMetric.FREE_CASH_FLOW,
  FinancialAnalyticsMetric.OPERATING_CASH_FLOW,
  FinancialAnalyticsMetric.WORKING_CAPITAL,
  FinancialAnalyticsMetric.FREE_CASH_FLOW_MARGIN,
];

/**
 * Financial ratio metrics
 */
export const FINANCIAL_RATIO_METRICS: FinancialAnalyticsMetric[] = [
  FinancialAnalyticsMetric.DEBT_TO_EQUITY_RATIO,
  FinancialAnalyticsMetric.CURRENT_RATIO,
  FinancialAnalyticsMetric.QUICK_RATIO,
  FinancialAnalyticsMetric.ACCOUNTS_RECEIVABLE_TURNOVER,
  FinancialAnalyticsMetric.ACCOUNTS_PAYABLE_TURNOVER,
  FinancialAnalyticsMetric.INVENTORY_TURNOVER,
  FinancialAnalyticsMetric.ASSET_TURNOVER,
  FinancialAnalyticsMetric.PRICE_TO_EARNINGS_RATIO,
  FinancialAnalyticsMetric.INTEREST_COVERAGE_RATIO,
  FinancialAnalyticsMetric.ASSET_COVERAGE_RATIO,
];
