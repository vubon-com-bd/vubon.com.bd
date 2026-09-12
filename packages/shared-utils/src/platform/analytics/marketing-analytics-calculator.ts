export interface PlatformMarketingAnalyticsData {
  isActive: boolean;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  revenue?: number;
  cost?: number;
}

export interface MarketingAnalyticsResult {
  totalCampaigns: number;
  activeCampaigns: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
  roi: number;
}

export const calculateMarketingAnalytics = (
  campaigns: PlatformMarketingAnalyticsData[]
): MarketingAnalyticsResult => {
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter((c) => c.isActive).length;
  const impressions = campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0);
  const clicks = campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0);
  const conversions = campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0);
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
  const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;
  const revenue = campaigns.reduce((sum, c) => sum + (c.revenue || 0), 0);
  const cost = campaigns.reduce((sum, c) => sum + (c.cost || 0), 0);
  const roi = cost > 0 ? ((revenue - cost) / cost) * 100 : 0;
  return {
    totalCampaigns,
    activeCampaigns,
    impressions,
    clicks,
    conversions,
    ctr,
    conversionRate,
    roi,
  };
};
