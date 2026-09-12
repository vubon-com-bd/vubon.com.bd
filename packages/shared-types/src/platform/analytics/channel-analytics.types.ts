import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { CHANNEL_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/channel-analytics.constants';
import { CAMPAIGN_CHANNEL } from '@vubon/shared-constants/src/marketing/campaign-channel.constants';

export interface ChannelAnalytics extends BaseEntity {
  analyticsId: string;
  type: keyof typeof CHANNEL_ANALYTICS.TYPES | string;
  channel: keyof typeof CAMPAIGN_CHANNEL.TYPES | string;
  metric: keyof typeof CHANNEL_ANALYTICS.METRICS | string;
  value: number;
  amount: Money;
  attributionModel: keyof typeof CHANNEL_ANALYTICS.ATTRIBUTION_MODELS | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
