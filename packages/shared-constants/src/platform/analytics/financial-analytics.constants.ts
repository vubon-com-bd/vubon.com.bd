import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';

export const FINANCIAL_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    REVENUE: 'revenue',
    EXPENSE: 'expense',
    PROFIT: 'profit',
    CASH_FLOW: 'cash_flow',
    BALANCE_SHEET: 'balance_sheet',
  },
  CURRENCY: { ...CURRENCY },
  METRICS: {
    TOTAL_REVENUE: 'total_revenue',
    TOTAL_EXPENSES: 'total_expenses',
    NET_PROFIT: 'net_profit',
    GROSS_MARGIN: 'gross_margin',
    NET_MARGIN: 'net_margin',
    EBIT: 'ebit',
    EBITDA: 'ebitda',
    ASSETS: 'assets',
    LIABILITIES: 'liabilities',
    EQUITY: 'equity',
  },
  FINANCIAL_RATIOS: {
    PROFIT_MARGIN: 'profit_margin',
    RETURN_ON_ASSETS: 'return_on_assets',
    RETURN_ON_EQUITY: 'return_on_equity',
    DEBT_TO_EQUITY: 'debt_to_equity',
    CURRENT_RATIO: 'current_ratio',
  },
} as const;
