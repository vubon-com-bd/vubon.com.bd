export const NOTIFICATION_REPORT_TYPE = {
  DELIVERY: 'delivery',
  ENGAGEMENT: 'engagement',
  CAMPAIGN: 'campaign',
  CHANNEL_PERFORMANCE: 'channel_performance',
  AUDIENCE: 'audience',
  UNSUBSCRIBE: 'unsubscribe',
  BOUNCE: 'bounce',
  REVENUE: 'revenue',
} as const;

export const NOTIFICATION_REPORT_FORMAT = {
  PDF: 'pdf',
  CSV: 'csv',
  XLSX: 'xlsx',
  JSON: 'json',
  HTML: 'html',
} as const;

export const NOTIFICATION_REPORT_SCHEDULE = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  ON_DEMAND: 'on_demand',
} as const;

export const NOTIFICATION_REPORT = {
  MAX_ROWS: 100000,
  EXPORT_EXPIRY_HOURS: 24,
  EMAIL_ENABLED: true,
  MAX_SCHEDULES: 10,
  RETENTION_DAYS: 180,
  MAX_DATE_RANGE_DAYS: 365,
  INCLUDE_CHARTS: true,
  INCLUDE_SUMMARY: true,
} as const;

export type NotificationReportTypeType =
  (typeof NOTIFICATION_REPORT_TYPE)[keyof typeof NOTIFICATION_REPORT_TYPE];
export type NotificationReportFormatType =
  (typeof NOTIFICATION_REPORT_FORMAT)[keyof typeof NOTIFICATION_REPORT_FORMAT];
export type NotificationReportScheduleType =
  (typeof NOTIFICATION_REPORT_SCHEDULE)[keyof typeof NOTIFICATION_REPORT_SCHEDULE];
