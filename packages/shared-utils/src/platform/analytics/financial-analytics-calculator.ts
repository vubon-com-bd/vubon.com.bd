export interface FinancialAnalyticsData {
  type: 'revenue' | 'expense';
  amount: number;
}

export interface FinancialAnalyticsResult {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  grossMargin: number;
  netMargin: number;
  profitMargin: number;
}

export const calculateFinancialAnalytics = (
  transactions: FinancialAnalyticsData[]
): FinancialAnalyticsResult => {
  const revenue = transactions
    .filter((t) => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const profit = revenue - expenses;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  return {
    totalRevenue: revenue,
    totalExpenses: expenses,
    netProfit: profit,
    grossMargin: margin,
    netMargin: margin,
    profitMargin: margin,
  };
};
