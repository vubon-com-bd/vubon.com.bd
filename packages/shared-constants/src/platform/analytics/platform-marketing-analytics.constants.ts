import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CAMPAIGN_STATUS } from '../../marketing/campaign-status.constants';

export const PLATFORM_MARKETING_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    CAMPAIGN: 'campaign',
    CHANNEL: 'channel',
    ROI: 'roi',
    CONVERSION: 'conversion',
  },
  CAMPAIGN_STATUS: { ...CAMPAIGN_STATUS },
  METRICS: {
    TOTAL_CAMPAIGNS: 'total_campaigns',
    ACTIVE_CAMPAIGNS: 'active_campaigns',
    IMPRESSIONS: 'impressions',
    REACH: 'reach',
    CLICKS: 'clicks',
    CTR: 'ctr',
    CONVERSIONS: 'conversions',
    CONVERSION_RATE: 'conversion_rate',
    COST: 'cost',
    REVENUE: 'revenue',
    ROI: 'roi',
    CPA: 'cpa',
    CPC: 'cpc',
    CPM: 'cpm',
  },
  CHANNEL_PERFORMANCE: {
    EMAIL: 'email_performance',
    SOCIAL: 'social_performance',
    SEARCH: 'search_performance',
    DISPLAY: 'display_performance',
  },
} as const;
