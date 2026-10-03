export const ANALYTICS_METRIC = {
  USERS: 'users',
  NEW_USERS: 'new_users',
  ACTIVE_USERS: 'active_users',
  SESSIONS: 'sessions',
  PAGE_VIEWS: 'page_views',
  SCREEN_VIEWS: 'screen_views',
  AVG_SESSION_DURATION: 'avg_session_duration',
  BOUNCE_RATE: 'bounce_rate',
  EXIT_RATE: 'exit_rate',
  CONVERSIONS: 'conversions',
  CONVERSION_RATE: 'conversion_rate',
  REVENUE: 'revenue',
  AOV: 'average_order_value',
  CLV: 'customer_lifetime_value',
  CAC: 'customer_acquisition_cost',
  ROI: 'return_on_investment',
  ROAS: 'return_on_ad_spend',
  IMPRESSIONS: 'impressions',
  CLICKS: 'clicks',
  CTR: 'click_through_rate',
  CPC: 'cost_per_click',
  CPM: 'cost_per_mille',
  CPA: 'cost_per_acquisition',
  RETENTION_RATE: 'retention_rate',
  CHURN_RATE: 'churn_rate',
  ENGAGEMENT_RATE: 'engagement_rate',
} as const;

export const ANALYTICS_METRIC_UNIT = {
  COUNT: 'count',
  PERCENTAGE: 'percentage',
  CURRENCY: 'currency',
  DURATION: 'duration',
  RATIO: 'ratio',
} as const;

export type AnalyticsMetricType = (typeof ANALYTICS_METRIC)[keyof typeof ANALYTICS_METRIC];
export type AnalyticsMetricUnitType =
  (typeof ANALYTICS_METRIC_UNIT)[keyof typeof ANALYTICS_METRIC_UNIT];
