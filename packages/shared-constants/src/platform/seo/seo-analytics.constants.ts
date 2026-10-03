export const SEO_ANALYTICS_METRIC = {
  ORGANIC_TRAFFIC: 'organic_traffic',
  ORGANIC_KEYWORDS: 'organic_keywords',
  BACKLINKS: 'backlinks',
  DOMAIN_AUTHORITY: 'domain_authority',
  PAGE_AUTHORITY: 'page_authority',
  BOUNCE_RATE: 'bounce_rate',
  AVG_POSITION: 'avg_position',
  CTR: 'ctr',
  IMPRESSIONS: 'impressions',
  CLICKS: 'clicks',
  CONVERSIONS: 'conversions',
} as const;

export const SEO_ANALYTICS_PERIOD = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  LAST_90_DAYS: 'last_90_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_YEAR: 'this_year',
  CUSTOM: 'custom',
} as const;

export const SEO_ANALYTICS = {
  RETENTION_DAYS: 730,
  REFRESH_INTERVAL_SECONDS: 3600,
  MAX_DATE_RANGE_DAYS: 365,
  TRACK_DAILY: true,
  TRACK_WEEKLY: true,
  TRACK_MONTHLY: true,
} as const;

export type SeoAnalyticsMetricType =
  (typeof SEO_ANALYTICS_METRIC)[keyof typeof SEO_ANALYTICS_METRIC];
export type SeoAnalyticsPeriodType =
  (typeof SEO_ANALYTICS_PERIOD)[keyof typeof SEO_ANALYTICS_PERIOD];
