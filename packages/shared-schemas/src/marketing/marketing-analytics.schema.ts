import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MARKETING_ANALYTICS } from '@vubon/shared-constants/src/marketing/marketing-analytics.constants';
import { CampaignSchema } from './campaign.schema';
import { PromotionSchema } from './promotion.schema';

const marketingAnalyticsTypeKeys = Object.keys(MARKETING_ANALYTICS.TYPES) as [string, ...string[]];
const marketingAnalyticsMetricKeys = Object.keys(MARKETING_ANALYTICS.METRICS) as [
  string,
  ...string[],
];
const marketingAnalyticsGranularityKeys = Object.keys(
  MARKETING_ANALYTICS.ANALYTICS_GRANULARITY
) as [string, ...string[]];

export const MarketingAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  campaignId: z.string().uuid().optional(),
  campaign: CampaignSchema.optional(),
  promotionId: z.string().uuid().optional(),
  promotion: PromotionSchema.optional(),
  type: z.enum(marketingAnalyticsTypeKeys),
  metric: z.enum(marketingAnalyticsMetricKeys),
  value: z.number(),
  period: z.enum(marketingAnalyticsGranularityKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

export const MarketingAnalyticsSummarySchema = z.object({
  impressions: z.number().min(0),
  reach: z.number().min(0),
  clicks: z.number().min(0),
  ctr: z.number().min(0).max(100),
  conversions: z.number().min(0),
  conversionRate: z.number().min(0).max(100),
  revenue: z.number().min(0),
  roi: z.number().min(0),
  cpa: z.number().min(0),
  cpc: z.number().min(0),
  cpm: z.number().min(0),
  ltv: z.number().min(0),
  cac: z.number().min(0),
  engagementRate: z.number().min(0).max(100),
});
