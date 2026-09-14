export const SEO_REPORT_TYPE = {
  AUDIT: 'audit',
  RANKING: 'ranking',
  TRAFFIC: 'traffic',
  KEYWORD: 'keyword',
  BACKLINK: 'backlink',
  COMPETITOR: 'competitor',
  PERFORMANCE: 'performance',
  CONTENT: 'content',
} as const;

export const SEO_REPORT_FORMAT = {
  PDF: 'pdf',
  CSV: 'csv',
  XLSX: 'xlsx',
  JSON: 'json',
  HTML: 'html',
} as const;

export const SEO_REPORT_SCHEDULE = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  ON_DEMAND: 'on_demand',
} as const;

export const SEO_REPORT = {
  MAX_ROWS: 100000,
  EXPORT_EXPIRY_HOURS: 24,
  EMAIL_ENABLED: true,
  MAX_SCHEDULES: 10,
  RETENTION_DAYS: 180,
  MAX_DATE_RANGE_DAYS: 365,
} as const;

export type SeoReportTypeType = (typeof SEO_REPORT_TYPE)[keyof typeof SEO_REPORT_TYPE];
export type SeoReportFormatType = (typeof SEO_REPORT_FORMAT)[keyof typeof SEO_REPORT_FORMAT];
export type SeoReportScheduleType = (typeof SEO_REPORT_SCHEDULE)[keyof typeof SEO_REPORT_SCHEDULE];
