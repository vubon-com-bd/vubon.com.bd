export const calculateDealPercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export interface DealRevenueData {
  soldQuantity: number;
  dealPrice: number;
}

export const calculateDealConversionRate = (views: number, purchases: number): number => {
  return calculateDealPercentage(purchases, views);
};

export const calculateDealRevenue = (deal: DealRevenueData): number => {
  return deal.soldQuantity * deal.dealPrice;
};

export const calculateDealProfit = (revenue: number, cost: number): number => {
  return revenue - cost;
};
