/**
 * Profit Calculator.
 */
export const calculateProfit = (revenue: number, cost: number): number => {
  if (!Number.isFinite(revenue) || !Number.isFinite(cost))
    throw new Error('Revenue and cost must be finite numbers');
  return revenue - cost;
};

export const calculateProfitMargin = (revenue: number, cost: number): number => {
  if (revenue === 0) return 0;
  const profit = calculateProfit(revenue, cost);
  return (profit / revenue) * 100;
};

export const calculateProfitMarginSafe = (revenue: number, cost: number): number =>
  revenue === 0 ? 0 : ((revenue - cost) / revenue) * 100;
