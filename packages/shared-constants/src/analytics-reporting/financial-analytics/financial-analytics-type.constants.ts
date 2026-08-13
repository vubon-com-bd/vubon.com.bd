/**
 * @fileoverview Financial analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Financial analytics types enum for different financial-related analytics
 */
export enum FinancialAnalyticsType {
  /** Revenue analytics */
  REVENUE_ANALYTICS = 'REVENUE_ANALYTICS',
  /** Expense analytics */
  EXPENSE_ANALYTICS = 'EXPENSE_ANALYTICS',
  /** Profit analytics */
  PROFIT_ANALYTICS = 'PROFIT_ANALYTICS',
  /** Cash flow analytics */
  CASH_FLOW_ANALYTICS = 'CASH_FLOW_ANALYTICS',
  /** ROI analytics */
  ROI_ANALYTICS = 'ROI_ANALYTICS',
  /** Cost analytics */
  COST_ANALYTICS = 'COST_ANALYTICS',
  /** Margin analytics */
  MARGIN_ANALYTICS = 'MARGIN_ANALYTICS',
  /** Budget analytics */
  BUDGET_ANALYTICS = 'BUDGET_ANALYTICS',
  /** Forecast analytics */
  FORECAST_ANALYTICS = 'FORECAST_ANALYTICS',
  /** Tax analytics */
  TAX_ANALYTICS = 'TAX_ANALYTICS',
  /** Audit analytics */
  AUDIT_ANALYTICS = 'AUDIT_ANALYTICS',
  /** Compliance analytics */
  COMPLIANCE_ANALYTICS = 'COMPLIANCE_ANALYTICS',
  /** Valuation analytics */
  VALUATION_ANALYTICS = 'VALUATION_ANALYTICS',
  /** Investment analytics */
  INVESTMENT_ANALYTICS = 'INVESTMENT_ANALYTICS',
  /** Debt analytics */
  DEBT_ANALYTICS = 'DEBT_ANALYTICS',
  /** Equity analytics */
  EQUITY_ANALYTICS = 'EQUITY_ANALYTICS',
  /** Dividend analytics */
  DIVIDEND_ANALYTICS = 'DIVIDEND_ANALYTICS',
  /** Capital expenditure analytics */
  CAPEX_ANALYTICS = 'CAPEX_ANALYTICS',
  /** Operating expenditure analytics */
  OPEX_ANALYTICS = 'OPEX_ANALYTICS',
  /** Working capital analytics */
  WORKING_CAPITAL_ANALYTICS = 'WORKING_CAPITAL_ANALYTICS',
  /** Balance sheet analytics */
  BALANCE_SHEET_ANALYTICS = 'BALANCE_SHEET_ANALYTICS',
  /** Income statement analytics */
  INCOME_STATEMENT_ANALYTICS = 'INCOME_STATEMENT_ANALYTICS',
  /** Financial ratio analytics */
  FINANCIAL_RATIO_ANALYTICS = 'FINANCIAL_RATIO_ANALYTICS',
  /** Break-even analytics */
  BREAK_EVEN_ANALYTICS = 'BREAK_EVEN_ANALYTICS',
  /** Profitability analytics */
  PROFITABILITY_ANALYTICS = 'PROFITABILITY_ANALYTICS',
  /** Liquidity analytics */
  LIQUIDITY_ANALYTICS = 'LIQUIDITY_ANALYTICS',
  /** Solvency analytics */
  SOLVENCY_ANALYTICS = 'SOLVENCY_ANALYTICS',
  /** Efficiency analytics */
  EFFICIENCY_ANALYTICS = 'EFFICIENCY_ANALYTICS',
  /** Growth analytics */
  GROWTH_ANALYTICS = 'GROWTH_ANALYTICS',
}

/**
 * Financial analytics category for grouping
 */
export enum FinancialAnalyticsCategory {
  /** Revenue category */
  REVENUE = 'REVENUE',
  /** Expense category */
  EXPENSE = 'EXPENSE',
  /** Profit category */
  PROFIT = 'PROFIT',
  /** Cash category */
  CASH = 'CASH',
  /** Investment category */
  INVESTMENT = 'INVESTMENT',
  /** Reporting category */
  REPORTING = 'REPORTING',
  /** Analysis category */
  ANALYSIS = 'ANALYSIS',
  /** Compliance category */
  COMPLIANCE = 'COMPLIANCE',
}

/**
 * Financial analytics category mapping
 */
export const FINANCIAL_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  FinancialAnalyticsType,
  FinancialAnalyticsCategory
> = {
  [FinancialAnalyticsType.REVENUE_ANALYTICS]: FinancialAnalyticsCategory.REVENUE,
  [FinancialAnalyticsType.EXPENSE_ANALYTICS]: FinancialAnalyticsCategory.EXPENSE,
  [FinancialAnalyticsType.PROFIT_ANALYTICS]: FinancialAnalyticsCategory.PROFIT,
  [FinancialAnalyticsType.CASH_FLOW_ANALYTICS]: FinancialAnalyticsCategory.CASH,
  [FinancialAnalyticsType.ROI_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
  [FinancialAnalyticsType.COST_ANALYTICS]: FinancialAnalyticsCategory.EXPENSE,
  [FinancialAnalyticsType.MARGIN_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
  [FinancialAnalyticsType.BUDGET_ANALYTICS]: FinancialAnalyticsCategory.REPORTING,
  [FinancialAnalyticsType.FORECAST_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
  [FinancialAnalyticsType.TAX_ANALYTICS]: FinancialAnalyticsCategory.COMPLIANCE,
  [FinancialAnalyticsType.AUDIT_ANALYTICS]: FinancialAnalyticsCategory.COMPLIANCE,
  [FinancialAnalyticsType.COMPLIANCE_ANALYTICS]: FinancialAnalyticsCategory.COMPLIANCE,
  [FinancialAnalyticsType.VALUATION_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
  [FinancialAnalyticsType.INVESTMENT_ANALYTICS]: FinancialAnalyticsCategory.INVESTMENT,
  [FinancialAnalyticsType.DEBT_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
  [FinancialAnalyticsType.EQUITY_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
  [FinancialAnalyticsType.DIVIDEND_ANALYTICS]: FinancialAnalyticsCategory.REVENUE,
  [FinancialAnalyticsType.CAPEX_ANALYTICS]: FinancialAnalyticsCategory.INVESTMENT,
  [FinancialAnalyticsType.OPEX_ANALYTICS]: FinancialAnalyticsCategory.EXPENSE,
  [FinancialAnalyticsType.WORKING_CAPITAL_ANALYTICS]: FinancialAnalyticsCategory.CASH,
  [FinancialAnalyticsType.BALANCE_SHEET_ANALYTICS]: FinancialAnalyticsCategory.REPORTING,
  [FinancialAnalyticsType.INCOME_STATEMENT_ANALYTICS]: FinancialAnalyticsCategory.REPORTING,
  [FinancialAnalyticsType.FINANCIAL_RATIO_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
  [FinancialAnalyticsType.BREAK_EVEN_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
  [FinancialAnalyticsType.PROFITABILITY_ANALYTICS]: FinancialAnalyticsCategory.PROFIT,
  [FinancialAnalyticsType.LIQUIDITY_ANALYTICS]: FinancialAnalyticsCategory.CASH,
  [FinancialAnalyticsType.SOLVENCY_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
  [FinancialAnalyticsType.EFFICIENCY_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
  [FinancialAnalyticsType.GROWTH_ANALYTICS]: FinancialAnalyticsCategory.ANALYSIS,
};

/**
 * Financial analytics type configuration
 */
export interface FinancialAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresTransactionId: boolean;
}

export const FINANCIAL_ANALYTICS_TYPE_CONFIG: Record<
  FinancialAnalyticsType,
  FinancialAnalyticsTypeConfig
> = {
  [FinancialAnalyticsType.REVENUE_ANALYTICS]: {
    label: 'Revenue Analytics',
    description: 'Analytics for revenue streams and income',
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 1,
    isRealtime: true,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.EXPENSE_ANALYTICS]: {
    label: 'Expense Analytics',
    description: 'Analytics for expenses and costs',
    icon: 'TrendingDown',
    color: '#EF4444',
    priority: 1,
    isRealtime: true,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.PROFIT_ANALYTICS]: {
    label: 'Profit Analytics',
    description: 'Analytics for profit and earnings',
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 1,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.CASH_FLOW_ANALYTICS]: {
    label: 'Cash Flow Analytics',
    description: 'Analytics for cash flow management',
    icon: 'DollarSign',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.ROI_ANALYTICS]: {
    label: 'ROI Analytics',
    description: 'Analytics for return on investment',
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 1,
    isRealtime: false,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.COST_ANALYTICS]: {
    label: 'Cost Analytics',
    description: 'Analytics for cost analysis',
    icon: 'DollarSign',
    color: '#EF4444',
    priority: 2,
    isRealtime: true,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.MARGIN_ANALYTICS]: {
    label: 'Margin Analytics',
    description: 'Analytics for profit margins',
    icon: 'Percent',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.BUDGET_ANALYTICS]: {
    label: 'Budget Analytics',
    description: 'Analytics for budget tracking and planning',
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.FORECAST_ANALYTICS]: {
    label: 'Forecast Analytics',
    description: 'Analytics for financial forecasting',
    icon: 'TrendingUp',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.TAX_ANALYTICS]: {
    label: 'Tax Analytics',
    description: 'Analytics for tax planning and compliance',
    icon: 'FileCheck',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.AUDIT_ANALYTICS]: {
    label: 'Audit Analytics',
    description: 'Analytics for financial audit',
    icon: 'Clipboard',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.COMPLIANCE_ANALYTICS]: {
    label: 'Compliance Analytics',
    description: 'Analytics for financial compliance',
    icon: 'Shield',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.VALUATION_ANALYTICS]: {
    label: 'Valuation Analytics',
    description: 'Analytics for business valuation',
    icon: 'DollarSign',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.INVESTMENT_ANALYTICS]: {
    label: 'Investment Analytics',
    description: 'Analytics for investments and portfolios',
    icon: 'TrendingUp',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.DEBT_ANALYTICS]: {
    label: 'Debt Analytics',
    description: 'Analytics for debt management',
    icon: 'DollarSign',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.EQUITY_ANALYTICS]: {
    label: 'Equity Analytics',
    description: 'Analytics for equity and ownership',
    icon: 'Users',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.DIVIDEND_ANALYTICS]: {
    label: 'Dividend Analytics',
    description: 'Analytics for dividend distribution',
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 3,
    isRealtime: false,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.CAPEX_ANALYTICS]: {
    label: 'Capex Analytics',
    description: 'Analytics for capital expenditure',
    icon: 'DollarSign',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.OPEX_ANALYTICS]: {
    label: 'Opex Analytics',
    description: 'Analytics for operating expenditure',
    icon: 'DollarSign',
    color: '#EF4444',
    priority: 2,
    isRealtime: true,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.WORKING_CAPITAL_ANALYTICS]: {
    label: 'Working Capital Analytics',
    description: 'Analytics for working capital management',
    icon: 'DollarSign',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: true,
  },
  [FinancialAnalyticsType.BALANCE_SHEET_ANALYTICS]: {
    label: 'Balance Sheet Analytics',
    description: 'Analytics for balance sheet analysis',
    icon: 'FileText',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.INCOME_STATEMENT_ANALYTICS]: {
    label: 'Income Statement Analytics',
    description: 'Analytics for income statement analysis',
    icon: 'FileText',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.FINANCIAL_RATIO_ANALYTICS]: {
    label: 'Financial Ratio Analytics',
    description: 'Analytics for financial ratios',
    icon: 'PieChart',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.BREAK_EVEN_ANALYTICS]: {
    label: 'Break-Even Analytics',
    description: 'Analytics for break-even analysis',
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.PROFITABILITY_ANALYTICS]: {
    label: 'Profitability Analytics',
    description: 'Analytics for profitability analysis',
    icon: 'TrendingUp',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.LIQUIDITY_ANALYTICS]: {
    label: 'Liquidity Analytics',
    description: 'Analytics for liquidity analysis',
    icon: 'DollarSign',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.SOLVENCY_ANALYTICS]: {
    label: 'Solvency Analytics',
    description: 'Analytics for solvency analysis',
    icon: 'Shield',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.EFFICIENCY_ANALYTICS]: {
    label: 'Efficiency Analytics',
    description: 'Analytics for operational efficiency',
    icon: 'Activity',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresTransactionId: false,
  },
  [FinancialAnalyticsType.GROWTH_ANALYTICS]: {
    label: 'Growth Analytics',
    description: 'Analytics for financial growth',
    icon: 'TrendingUp',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresTransactionId: false,
  },
};

/**
 * Get financial analytics type label
 */
export function getFinancialAnalyticsTypeLabel(type: FinancialAnalyticsType): string {
  return FINANCIAL_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get financial analytics type description
 */
export function getFinancialAnalyticsTypeDescription(type: FinancialAnalyticsType): string {
  return FINANCIAL_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get financial analytics type category
 */
export function getFinancialAnalyticsTypeCategory(
  type: FinancialAnalyticsType
): FinancialAnalyticsCategory {
  return FINANCIAL_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get financial analytics types by category
 */
export function getFinancialAnalyticsTypesByCategory(
  category: FinancialAnalyticsCategory
): FinancialAnalyticsType[] {
  return Object.entries(FINANCIAL_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as FinancialAnalyticsType);
}

/**
 * Check if financial analytics type requires transaction ID
 */
export function financialAnalyticsTypeRequiresTransactionId(type: FinancialAnalyticsType): boolean {
  return FINANCIAL_ANALYTICS_TYPE_CONFIG[type]?.requiresTransactionId || false;
}

/**
 * Check if financial analytics type is real-time
 */
export function isFinancialAnalyticsTypeRealtime(type: FinancialAnalyticsType): boolean {
  return FINANCIAL_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get financial analytics type priority
 */
export function getFinancialAnalyticsTypePriority(type: FinancialAnalyticsType): number {
  return FINANCIAL_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Financial analytics type status
 */
export enum FinancialAnalyticsTypeStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive and not collecting data */
  INACTIVE = 'INACTIVE',
  /** Paused temporarily */
  PAUSED = 'PAUSED',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated and will be removed */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for financial analytics types
 */
export const FINANCIAL_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  FinancialAnalyticsType,
  FinancialAnalyticsTypeStatus
> = {
  [FinancialAnalyticsType.REVENUE_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.EXPENSE_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.PROFIT_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.CASH_FLOW_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.ROI_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.COST_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.MARGIN_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.BUDGET_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.FORECAST_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.TAX_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.AUDIT_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.COMPLIANCE_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.VALUATION_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.INVESTMENT_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.DEBT_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.EQUITY_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.DIVIDEND_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.CAPEX_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.OPEX_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.WORKING_CAPITAL_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.BALANCE_SHEET_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.INCOME_STATEMENT_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.FINANCIAL_RATIO_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.BREAK_EVEN_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.PROFITABILITY_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.LIQUIDITY_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.SOLVENCY_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.EFFICIENCY_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
  [FinancialAnalyticsType.GROWTH_ANALYTICS]: FinancialAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get financial analytics type status
 */
export function getFinancialAnalyticsTypeStatus(
  type: FinancialAnalyticsType
): FinancialAnalyticsTypeStatus {
  return FINANCIAL_ANALYTICS_TYPE_DEFAULT_STATUS[type] || FinancialAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set financial analytics type status
 */
export function setFinancialAnalyticsTypeStatus(
  type: FinancialAnalyticsType,
  status: FinancialAnalyticsTypeStatus
): void {
  FINANCIAL_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Financial analytics priority levels
 */
export const FINANCIAL_ANALYTICS_PRIORITY_LEVELS = {
  /** Critical priority - essential analytics */
  CRITICAL: 1,
  /** High priority - important analytics */
  HIGH: 2,
  /** Medium priority - useful analytics */
  MEDIUM: 3,
  /** Low priority - nice to have */
  LOW: 4,
} as const;

/**
 * Get financial analytics types by priority
 */
export function getFinancialAnalyticsTypesByPriority(priority: number): FinancialAnalyticsType[] {
  return Object.entries(FINANCIAL_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as FinancialAnalyticsType);
}

/**
 * Get critical financial analytics types
 */
export function getCriticalFinancialAnalyticsTypes(): FinancialAnalyticsType[] {
  return getFinancialAnalyticsTypesByPriority(FINANCIAL_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Financial analytics sub-categories
 */
export enum FinancialAnalyticsSubCategory {
  /** Revenue analysis */
  REVENUE = 'REVENUE',
  /** Expense analysis */
  EXPENSE = 'EXPENSE',
  /** Profit analysis */
  PROFIT = 'PROFIT',
  /** Cash analysis */
  CASH = 'CASH',
  /** Investment analysis */
  INVESTMENT = 'INVESTMENT',
  /** Ratio analysis */
  RATIO = 'RATIO',
  /** Reporting analysis */
  REPORTING = 'REPORTING',
  /** Compliance analysis */
  COMPLIANCE = 'COMPLIANCE',
}

/**
 * Mapping of financial analytics types to sub-categories
 */
export const FINANCIAL_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  FinancialAnalyticsType,
  FinancialAnalyticsSubCategory
> = {
  [FinancialAnalyticsType.REVENUE_ANALYTICS]: FinancialAnalyticsSubCategory.REVENUE,
  [FinancialAnalyticsType.DIVIDEND_ANALYTICS]: FinancialAnalyticsSubCategory.REVENUE,
  [FinancialAnalyticsType.EXPENSE_ANALYTICS]: FinancialAnalyticsSubCategory.EXPENSE,
  [FinancialAnalyticsType.COST_ANALYTICS]: FinancialAnalyticsSubCategory.EXPENSE,
  [FinancialAnalyticsType.OPEX_ANALYTICS]: FinancialAnalyticsSubCategory.EXPENSE,
  [FinancialAnalyticsType.PROFIT_ANALYTICS]: FinancialAnalyticsSubCategory.PROFIT,
  [FinancialAnalyticsType.PROFITABILITY_ANALYTICS]: FinancialAnalyticsSubCategory.PROFIT,
  [FinancialAnalyticsType.CASH_FLOW_ANALYTICS]: FinancialAnalyticsSubCategory.CASH,
  [FinancialAnalyticsType.WORKING_CAPITAL_ANALYTICS]: FinancialAnalyticsSubCategory.CASH,
  [FinancialAnalyticsType.LIQUIDITY_ANALYTICS]: FinancialAnalyticsSubCategory.CASH,
  [FinancialAnalyticsType.INVESTMENT_ANALYTICS]: FinancialAnalyticsSubCategory.INVESTMENT,
  [FinancialAnalyticsType.CAPEX_ANALYTICS]: FinancialAnalyticsSubCategory.INVESTMENT,
  [FinancialAnalyticsType.ROI_ANALYTICS]: FinancialAnalyticsSubCategory.RATIO,
  [FinancialAnalyticsType.MARGIN_ANALYTICS]: FinancialAnalyticsSubCategory.RATIO,
  [FinancialAnalyticsType.FINANCIAL_RATIO_ANALYTICS]: FinancialAnalyticsSubCategory.RATIO,
  [FinancialAnalyticsType.BREAK_EVEN_ANALYTICS]: FinancialAnalyticsSubCategory.RATIO,
  [FinancialAnalyticsType.BUDGET_ANALYTICS]: FinancialAnalyticsSubCategory.REPORTING,
  [FinancialAnalyticsType.FORECAST_ANALYTICS]: FinancialAnalyticsSubCategory.REPORTING,
  [FinancialAnalyticsType.BALANCE_SHEET_ANALYTICS]: FinancialAnalyticsSubCategory.REPORTING,
  [FinancialAnalyticsType.INCOME_STATEMENT_ANALYTICS]: FinancialAnalyticsSubCategory.REPORTING,
  [FinancialAnalyticsType.DEBT_ANALYTICS]: FinancialAnalyticsSubCategory.RATIO,
  [FinancialAnalyticsType.EQUITY_ANALYTICS]: FinancialAnalyticsSubCategory.RATIO,
  [FinancialAnalyticsType.SOLVENCY_ANALYTICS]: FinancialAnalyticsSubCategory.RATIO,
  [FinancialAnalyticsType.EFFICIENCY_ANALYTICS]: FinancialAnalyticsSubCategory.RATIO,
  [FinancialAnalyticsType.GROWTH_ANALYTICS]: FinancialAnalyticsSubCategory.RATIO,
  [FinancialAnalyticsType.VALUATION_ANALYTICS]: FinancialAnalyticsSubCategory.REPORTING,
  [FinancialAnalyticsType.TAX_ANALYTICS]: FinancialAnalyticsSubCategory.COMPLIANCE,
  [FinancialAnalyticsType.AUDIT_ANALYTICS]: FinancialAnalyticsSubCategory.COMPLIANCE,
  [FinancialAnalyticsType.COMPLIANCE_ANALYTICS]: FinancialAnalyticsSubCategory.COMPLIANCE,
};

/**
 * Get financial analytics type sub-category
 */
export function getFinancialAnalyticsTypeSubCategory(
  type: FinancialAnalyticsType
): FinancialAnalyticsSubCategory {
  return FINANCIAL_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get financial analytics types by sub-category
 */
export function getFinancialAnalyticsTypesBySubCategory(
  subCategory: FinancialAnalyticsSubCategory
): FinancialAnalyticsType[] {
  return Object.entries(FINANCIAL_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as FinancialAnalyticsType);
}
