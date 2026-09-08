export const calculateProfit = (revenue: number, cost: number): number => {
  return revenue - cost;
};

export const calculateProfitMargin = (revenue: number, cost: number): number => {
  const profit = calculateProfit(revenue, cost);
  return (profit / revenue) * 100;
};
