/**
 * Analytics Calculator
 * অ্যানালিটিক্স ক্যালকুলেটর
 */

import type { FlashSaleAnalytics } from '@vubon/shared-types';

export interface AnalyticsCalculation {
  views: number;
  uniqueViews: number;
  clicks: number;
  addToCarts: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  bounceRate: number;
  clickThroughRate: number;
  sellThroughRate: number;
}

export const calculateAnalytics = (analytics: FlashSaleAnalytics): AnalyticsCalculation => {
  const views = analytics.views || 0;
  const clicks = analytics.clicks || 0;
  const addToCarts = analytics.addToCarts || 0;
  const conversions = analytics.conversions || 0;
  const revenue = analytics.revenue || 0;

  const conversionRate = views > 0 ? (conversions / views) * 100 : 0;
  const averageOrderValue = conversions > 0 ? revenue / conversions : 0;
  const bounceRate = views > 0 ? ((views - addToCarts) / views) * 100 : 0;
  const clickThroughRate = views > 0 ? (clicks / views) * 100 : 0;
  const sellThroughRate = analytics.sellThroughRate || 0;

  return {
    views,
    uniqueViews: analytics.uniqueViews || 0,
    clicks,
    addToCarts,
    conversions,
    revenue: Math.round(revenue * 100) / 100,
    conversionRate: Math.round(conversionRate * 100) / 100,
    averageOrderValue: Math.round(averageOrderValue * 100) / 100,
    bounceRate: Math.round(bounceRate * 100) / 100,
    clickThroughRate: Math.round(clickThroughRate * 100) / 100,
    sellThroughRate: Math.round(sellThroughRate * 100) / 100,
  };
};

export const calculateAnalyticsTrend = (
  current: AnalyticsCalculation,
  previous: AnalyticsCalculation
): {
  viewsChange: number;
  conversionsChange: number;
  revenueChange: number;
  conversionRateChange: number;
} => {
  const viewsChange =
    previous.views > 0 ? ((current.views - previous.views) / previous.views) * 100 : 0;
  const conversionsChange =
    previous.conversions > 0
      ? ((current.conversions - previous.conversions) / previous.conversions) * 100
      : 0;
  const revenueChange =
    previous.revenue > 0 ? ((current.revenue - previous.revenue) / previous.revenue) * 100 : 0;
  const conversionRateChange =
    previous.conversionRate > 0
      ? ((current.conversionRate - previous.conversionRate) / previous.conversionRate) * 100
      : 0;

  return {
    viewsChange: Math.round(viewsChange * 100) / 100,
    conversionsChange: Math.round(conversionsChange * 100) / 100,
    revenueChange: Math.round(revenueChange * 100) / 100,
    conversionRateChange: Math.round(conversionRateChange * 100) / 100,
  };
};
