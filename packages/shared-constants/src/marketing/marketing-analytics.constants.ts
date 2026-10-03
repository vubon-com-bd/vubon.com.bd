export const MARKETING_ANALYTICS_METRIC = {
  IMPRESSIONS: 'impressions',
  REACH: 'reach',
  CLICKS: 'clicks',
  CTR: 'ctr',
  CONVERSIONS: 'conversions',
  CONVERSION_RATE: 'conversion_rate',
  CPC: 'cpc',
  CPM: 'cpm',
  CPA: 'cpa',
  ROAS: 'roas',
  ROI: 'roi',
  REVENUE: 'revenue',
  LEADS: 'leads',
  ENGAGEMENT_RATE: 'engagement_rate',
  BOUNCE_RATE: 'bounce_rate',
  UNSUBSCRIBE_RATE: 'unsubscribe_rate',
  OPEN_RATE: 'open_rate',
  CLICK_THROUGH_RATE: 'click_through_rate',
} as const;

export const MARKETING_ANALYTICS_PERIOD = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_QUARTER: 'this_quarter',
  THIS_YEAR: 'this_year',
  CUSTOM: 'custom',
} as const;

export const MARKETING_ANALYTICS_ATTRIBUTION = {
  FIRST_TOUCH: 'first_touch',
  LAST_TOUCH: 'last_touch',
  LINEAR: 'linear',
  TIME_DECAY: 'time_decay',
  POSITION_BASED: 'position_based',
  DATA_DRIVEN: 'data_driven',
} as const;

export const MARKETING_ANALYTICS = {
  METRIC: MARKETING_ANALYTICS_METRIC,
  PERIOD: MARKETING_ANALYTICS_PERIOD,
  ATTRIBUTION: MARKETING_ANALYTICS_ATTRIBUTION,
  DEFAULT_ATTRIBUTION: MARKETING_ANALYTICS_ATTRIBUTION.LAST_TOUCH,
  ATTRIBUTION_WINDOW_DAYS: 30,
  RETENTION_DAYS: 730,
  REFRESH_INTERVAL_SECONDS: 300,
  TRACK_REVENUE: true,
  TRACK_CONVERSIONS: true,
  ANONYMIZE_DATA: true,
  MAX_DATE_RANGE_DAYS: 730,
} as const;

export type MarketingAnalyticsMetricType =
  (typeof MARKETING_ANALYTICS_METRIC)[keyof typeof MARKETING_ANALYTICS_METRIC];
export type MarketingAnalyticsPeriodType =
  (typeof MARKETING_ANALYTICS_PERIOD)[keyof typeof MARKETING_ANALYTICS_PERIOD];
export type MarketingAnalyticsAttributionType =
  (typeof MARKETING_ANALYTICS_ATTRIBUTION)[keyof typeof MARKETING_ANALYTICS_ATTRIBUTION];
