import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { CHANNEL_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/channel-analytics.constants';
import { CAMPAIGN_CHANNEL } from '@vubon/shared-constants/src/marketing/campaign-channel.constants';

const channelAnalyticsTypeKeys = Object.keys(CHANNEL_ANALYTICS.TYPES) as [string, ...string[]];
const channelAnalyticsChannelKeys = Object.keys(CAMPAIGN_CHANNEL.TYPES) as [string, ...string[]];
const channelAnalyticsMetricKeys = Object.keys(CHANNEL_ANALYTICS.METRICS) as [string, ...string[]];
const channelAnalyticsAttributionModelKeys = Object.keys(CHANNEL_ANALYTICS.ATTRIBUTION_MODELS) as [
  string,
  ...string[],
];

export const ChannelAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(channelAnalyticsTypeKeys),
  channel: z.enum(channelAnalyticsChannelKeys),
  metric: z.enum(channelAnalyticsMetricKeys),
  value: z.number(),
  amount: MoneySchema,
  attributionModel: z.enum(channelAnalyticsAttributionModelKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
