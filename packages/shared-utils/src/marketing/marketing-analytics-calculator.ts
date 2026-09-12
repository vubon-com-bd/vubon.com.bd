export const calculateMarketingPercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export interface MarketingAnalyticsData {
  metric: string;
  value: number;
}

export interface MarketingMetrics {
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  roi: number;
  cpa: number;
  cpc: number;
  cpm: number;
}

export const calculateMarketingMetrics = (
  analytics: MarketingAnalyticsData[]
): MarketingMetrics => {
  const impressions = analytics.filter((a) => a.metric === 'impressions');
  const reach = analytics.filter((a) => a.metric === 'reach');
  const clicks = analytics.filter((a) => a.metric === 'clicks');
  const conversions = analytics.filter((a) => a.metric === 'conversions');
  const revenue = analytics.filter((a) => a.metric === 'revenue');
  const cost = analytics.filter((a) => a.metric === 'cost');

  const totalImpressions = impressions.reduce((sum, a) => sum + a.value, 0);
  const totalClicks = clicks.reduce((sum, a) => sum + a.value, 0);
  const totalConversions = conversions.reduce((sum, a) => sum + a.value, 0);
  const totalRevenue = revenue.reduce((sum, a) => sum + a.value, 0);
  const totalCost = cost.reduce((sum, a) => sum + a.value, 0);

  return {
    impressions: totalImpressions,
    reach: reach.reduce((sum, a) => sum + a.value, 0),
    clicks: totalClicks,
    ctr: calculateMarketingPercentage(totalClicks, totalImpressions),
    conversions: totalConversions,
    conversionRate: calculateMarketingPercentage(totalConversions, totalClicks),
    revenue: totalRevenue,
    roi: totalCost > 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0,
    cpa: totalConversions > 0 ? totalCost / totalConversions : 0,
    cpc: totalClicks > 0 ? totalCost / totalClicks : 0,
    cpm: totalImpressions > 0 ? (totalCost / totalImpressions) * 1000 : 0,
  };
};
