import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { Campaign } from '../../marketing/campaign.types';
import { MARKETING_ANALYTICS } from '@vubon/shared-constants/src/marketing/marketing-analytics.constants';

export interface PlatformMarketingAnalytics extends BaseEntity {
  analyticsId: string;
  campaignId: string;
  campaign: Campaign;
  type: keyof typeof MARKETING_ANALYTICS.TYPES | string;
  metric: keyof typeof MARKETING_ANALYTICS.METRICS | string;
  value: number;
  cost: Money;
  revenue: Money;
  roi: number;
  channel: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
