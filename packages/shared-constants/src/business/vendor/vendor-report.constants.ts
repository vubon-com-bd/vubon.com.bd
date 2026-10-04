export const VENDOR_REPORT_TYPE = {
  SALES: 'sales',
  ORDERS: 'orders',
  PRODUCTS: 'products',
  INVENTORY: 'inventory',
  CUSTOMERS: 'customers',
  REVENUE: 'revenue',
  PAYOUT: 'payout',
  COMMISSION: 'commission',
  PERFORMANCE: 'performance',
  RETURNS: 'returns',
  RATINGS: 'ratings',
} as const;

export const VENDOR_REPORT_FORMAT = {
  PDF: 'pdf',
  CSV: 'csv',
  XLSX: 'xlsx',
  JSON: 'json',
  HTML: 'html',
} as const;

export const VENDOR_REPORT_PERIOD = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  LAST_7_DAYS: 'last_7_days',
  LAST_30_DAYS: 'last_30_days',
  THIS_MONTH: 'this_month',
  LAST_MONTH: 'last_month',
  THIS_QUARTER: 'this_quarter',
  THIS_YEAR: 'this_year',
  CUSTOM: 'custom',
} as const;

export const VENDOR_REPORT = {
  MAX_DATE_RANGE_DAYS: 365,
  MAX_ROWS: 100000,
  EXPORT_EXPIRY_HOURS: 24,
  SCHEDULE_ENABLED: true,
  EMAIL_ENABLED: true,
  MAX_SCHEDULES: 10,
} as const;

export type VendorReportTypeType = (typeof VENDOR_REPORT_TYPE)[keyof typeof VENDOR_REPORT_TYPE];
export type VendorReportFormatType =
  (typeof VENDOR_REPORT_FORMAT)[keyof typeof VENDOR_REPORT_FORMAT];
export type VendorReportPeriodType =
  (typeof VENDOR_REPORT_PERIOD)[keyof typeof VENDOR_REPORT_PERIOD];
