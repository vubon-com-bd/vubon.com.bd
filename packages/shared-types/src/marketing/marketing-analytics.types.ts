import { BaseEntity } from '../common/base.types';
import { MARKETING_ANALYTICS } from '@vubon/shared-constants/src/marketing/marketing-analytics.constants';
import { Campaign } from './campaign.types';
import { Promotion } from './promotion.types';

export interface BusinessMarketingAnalytics extends BaseEntity {
  analyticsId: string;
  campaignId?: string;
  campaign?: Campaign;
  promotionId?: string;
  promotion?: Promotion;
  type: keyof typeof MARKETING_ANALYTICS.TYPES | string;
  metric: keyof typeof MARKETING_ANALYTICS.METRICS | string;
  value: number;
  period: keyof typeof MARKETING_ANALYTICS.ANALYTICS_GRANULARITY | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export interface MarketingAnalyticsSummary {
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
  ltv: number;
  cac: number;
  engagementRate: number;
}
