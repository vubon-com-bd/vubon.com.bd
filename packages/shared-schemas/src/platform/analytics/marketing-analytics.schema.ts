import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CampaignSchema } from '../../marketing/campaign.schema';
import { MoneySchema } from '../../common/money.schema';
import { PLATFORM_MARKETING_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/platform-marketing-analytics.constants';

const marketingAnalyticsTypeKeys = Object.keys(PLATFORM_MARKETING_ANALYTICS.TYPES) as [
  string,
  ...string[],
];
const marketingAnalyticsMetricKeys = Object.keys(PLATFORM_MARKETING_ANALYTICS.METRICS) as [
  string,
  ...string[],
];
const marketingAnalyticsChannelKeys = Object.keys(
  PLATFORM_MARKETING_ANALYTICS.CHANNEL_PERFORMANCE
) as [string, ...string[]];

export const PlatformMarketingAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  campaignId: z.string().uuid(),
  campaign: CampaignSchema,
  type: z.enum(marketingAnalyticsTypeKeys),
  metric: z.enum(marketingAnalyticsMetricKeys),
  value: z.number(),
  cost: MoneySchema,
  revenue: MoneySchema,
  roi: z.number(),
  channel: z.enum(marketingAnalyticsChannelKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
