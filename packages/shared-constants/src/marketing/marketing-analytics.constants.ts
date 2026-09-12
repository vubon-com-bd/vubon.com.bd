import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { METRICS } from '../common/types.constants';
import { CAMPAIGN_STATUS } from './campaign-status.constants';
import { PROMOTION_STATUS } from './promotion-status.constants';

export const MARKETING_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    CAMPAIGN: 'campaign',
    PROMOTION: 'promotion',
    AFFILIATE: 'affiliate',
    REFERRAL: 'referral',
    LOYALTY: 'loyalty',
    EMAIL: 'email',
    SMS: 'sms',
    SOCIAL: 'social',
    SEO: 'seo',
  },
  METRICS: {
    ...METRICS,
    IMPRESSIONS: 'impressions',
    REACH: 'reach',
    CLICKS: 'clicks',
    CTR: 'ctr',
    CONVERSIONS: 'conversions',
    CONVERSION_RATE: 'conversion_rate',
    REVENUE: 'revenue',
    ROI: 'roi',
    CPA: 'cpa',
    CPC: 'cpc',
    CPM: 'cpm',
    LTV: 'ltv',
    CAC: 'cac',
    ENGAGEMENT_RATE: 'engagement_rate',
  },
  CAMPAIGN_STATUS: { ...CAMPAIGN_STATUS },
  PROMOTION_STATUS: { ...PROMOTION_STATUS },
  ANALYTICS_GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  ROI_THRESHOLDS: {
    EXCELLENT: 5.0,
    GOOD: 3.0,
    AVERAGE: 1.5,
    POOR: 0.5,
  },
  BENCHMARK_PERIOD_DAYS: 30,
} as const;
