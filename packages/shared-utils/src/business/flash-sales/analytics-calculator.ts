export const calculateFlashSalePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export const calculateFlashSaleConversionRate = (
  participants: number,
  purchases: number
): number => {
  return calculateFlashSalePercentage(purchases, participants);
};

export const calculateFlashSaleAverageOrderValue = (revenue: number, orders: number): number => {
  if (orders === 0) return 0;
  return revenue / orders;
};

export const calculateFlashSaleEngagementRate = (views: number, participants: number): number => {
  return calculateFlashSalePercentage(participants, views);
};
