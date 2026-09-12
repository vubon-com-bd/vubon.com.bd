export interface ChannelAnalyticsData {
  revenue?: number;
  orders?: number;
  cost?: number;
}

export interface ChannelAnalyticsResult {
  totalRevenue: number;
  totalOrders: number;
  conversionRate: number;
  averageOrderValue: number;
  costPerAcquisition: number;
  returnOnAdSpend: number;
}

export const calculateChannelAnalytics = (
  channels: ChannelAnalyticsData[]
): ChannelAnalyticsResult => {
  const totalRevenue = channels.reduce((sum, c) => sum + (c.revenue || 0), 0);
  const totalOrders = channels.reduce((sum, c) => sum + (c.orders || 0), 0);
  const totalCost = channels.reduce((sum, c) => sum + (c.cost || 0), 0);
  return {
    totalRevenue,
    totalOrders,
    conversionRate: 0,
    averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    costPerAcquisition: totalOrders > 0 ? totalCost / totalOrders : 0,
    returnOnAdSpend: totalCost > 0 ? (totalRevenue / totalCost) * 100 : 0,
  };
};
