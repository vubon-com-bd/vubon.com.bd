export const MARKETING_REPORT_TYPE = {
  CAMPAIGN_PERFORMANCE: 'campaign_performance',
  CHANNEL_PERFORMANCE: 'channel_performance',
  AUDIENCE_INSIGHTS: 'audience_insights',
  LEAD_REPORT: 'lead_report',
  ROI_REPORT: 'roi_report',
  ATTRIBUTION: 'attribution',
  FUNNEL: 'funnel',
  CONVERSION: 'conversion',
  ENGAGEMENT: 'engagement',
  REVENUE: 'revenue',
  EMAIL: 'email',
  SMS: 'sms',
  SOCIAL: 'social',
  AFFILIATE: 'affiliate',
} as const;

export const MARKETING_REPORT_FORMAT = {
  PDF: 'pdf',
  CSV: 'csv',
  XLSX: 'xlsx',
  JSON: 'json',
  HTML: 'html',
} as const;

export const MARKETING_REPORT_SCHEDULE = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  ON_DEMAND: 'on_demand',
} as const;

export const MARKETING_REPORT = {
  TYPE: MARKETING_REPORT_TYPE,
  FORMAT: MARKETING_REPORT_FORMAT,
  SCHEDULE: MARKETING_REPORT_SCHEDULE,
  MAX_ROWS: 100000,
  EXPORT_EXPIRY_HOURS: 24,
  EMAIL_ENABLED: true,
  MAX_SCHEDULES: 20,
  RETENTION_DAYS: 365,
  MAX_DATE_RANGE_DAYS: 730,
  INCLUDE_CHARTS: true,
  INCLUDE_SUMMARY: true,
  INCLUDE_COMPARISON: true,
} as const;

export type MarketingReportTypeType =
  (typeof MARKETING_REPORT_TYPE)[keyof typeof MARKETING_REPORT_TYPE];
export type MarketingReportFormatType =
  (typeof MARKETING_REPORT_FORMAT)[keyof typeof MARKETING_REPORT_FORMAT];
export type MarketingReportScheduleType =
  (typeof MARKETING_REPORT_SCHEDULE)[keyof typeof MARKETING_REPORT_SCHEDULE];
