export const NOTIFICATION_ANALYTICS_METRIC = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  OPENED: 'opened',
  CLICKED: 'clicked',
  BOUNCED: 'bounced',
  UNSUBSCRIBED: 'unsubscribed',
  COMPLAINED: 'complained',
  CONVERSION: 'conversion',
  REVENUE: 'revenue',
  DELIVERY_RATE: 'delivery_rate',
  OPEN_RATE: 'open_rate',
  CLICK_RATE: 'click_rate',
  BOUNCE_RATE: 'bounce_rate',
  UNSUBSCRIBE_RATE: 'unsubscribe_rate',
} as const;

export const NOTIFICATION_ANALYTICS_PERIOD = {
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

export const NOTIFICATION_ANALYTICS = {
  RETENTION_DAYS: 365,
  REFRESH_INTERVAL_SECONDS: 300,
  MAX_DATE_RANGE_DAYS: 365,
  TRACK_OPENS: true,
  TRACK_CLICKS: true,
  TRACK_CONVERSIONS: true,
  TRACK_REVENUE: true,
  TRACK_UNSUBSCRIBES: true,
  ANONYMIZE_DATA: true,
} as const;

export type NotificationAnalyticsMetricType =
  (typeof NOTIFICATION_ANALYTICS_METRIC)[keyof typeof NOTIFICATION_ANALYTICS_METRIC];
export type NotificationAnalyticsPeriodType =
  (typeof NOTIFICATION_ANALYTICS_PERIOD)[keyof typeof NOTIFICATION_ANALYTICS_PERIOD];
