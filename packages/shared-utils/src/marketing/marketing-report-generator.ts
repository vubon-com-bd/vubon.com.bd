import { calculateMarketingMetrics } from './marketing-analytics-calculator';
import type { MarketingAnalyticsData } from './marketing-analytics-calculator';

export const generateMarketingId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export interface MarketingReportData {
  reportId: string;
  type: string;
  format: string;
  analytics: MarketingAnalyticsData[];
  summary: {
    totalCampaigns: number;
    activeCampaigns: number;
    totalRevenue: number;
    totalCost: number;
    totalRoi: number;
    topChannels: Record<string, number>;
    topCampaigns: Record<string, number>;
  };
  insights: unknown[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}

export const generateMarketingReport = (
  type: string,
  data: {
    analytics?: MarketingAnalyticsData[];
    totalCampaigns?: number;
    activeCampaigns?: number;
    topChannels?: Record<string, number>;
    topCampaigns?: Record<string, number>;
  }
): MarketingReportData => {
  const analytics = data.analytics || [];
  const metrics = calculateMarketingMetrics(analytics);
  return {
    reportId: generateMarketingId('MRPT', 12),
    type,
    format: 'pdf',
    analytics,
    summary: {
      totalCampaigns: data.totalCampaigns || 0,
      activeCampaigns: data.activeCampaigns || 0,
      totalRevenue: metrics.revenue,
      totalCost: 0,
      totalRoi: metrics.roi,
      topChannels: data.topChannels || {},
      topCampaigns: data.topCampaigns || {},
    },
    insights: [],
    recommendations: [],
    generatedAt: new Date(),
    metadata: {},
  };
};
