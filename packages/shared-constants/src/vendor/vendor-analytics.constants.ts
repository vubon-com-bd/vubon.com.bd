/**
 * ভেন্ডার অ্যানালাইটিক্স সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * অ্যানালিটিক্স মেট্রিক অবজেক্ট
 */
export const AnalyticsMetric = {
  SALES: 'SALES',
  REVENUE: 'REVENUE',
  ORDERS: 'ORDERS',
  VIEWS: 'VIEWS',
  CONVERSION_RATE: 'CONVERSION_RATE',
  CUSTOMER_RETENTION: 'CUSTOMER_RETENTION',
  AVERAGE_ORDER_VALUE: 'AVERAGE_ORDER_VALUE',
} as const;

/**
 * অ্যানালিটিক্স মেট্রিক - ইউনিয়ন টাইপ
 */
export type AnalyticsMetricValue = (typeof AnalyticsMetric)[keyof typeof AnalyticsMetric];

/**
 * অ্যানালিটিক্স টাইম রেঞ্জ
 */
export const AnalyticsTimeRange = {
  LAST_7_DAYS: 'LAST_7_DAYS',
  LAST_30_DAYS: 'LAST_30_DAYS',
  LAST_90_DAYS: 'LAST_90_DAYS',
  LAST_365_DAYS: 'LAST_365_DAYS',
  CUSTOM: 'CUSTOM',
} as const;

/**
 * অ্যানালিটিক্স টাইম রেঞ্জ - ইউনিয়ন টাইপ
 */
export type AnalyticsTimeRangeValue = (typeof AnalyticsTimeRange)[keyof typeof AnalyticsTimeRange];

/**
 * অ্যানালিটিক্স অ্যাগ্রিগেশন
 */
export const AnalyticsAggregation = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  YEARLY: 'YEARLY',
} as const;

/**
 * অ্যানালিটিক্স অ্যাগ্রিগেশন - ইউনিয়ন টাইপ
 */
export type AnalyticsAggregationValue =
  (typeof AnalyticsAggregation)[keyof typeof AnalyticsAggregation];

/**
 * অ্যানালিটিক্স এক্সপোর্ট ফরম্যাট
 */
export const AnalyticsExportFormats = {
  CSV: 'CSV',
  EXCEL: 'EXCEL',
  PDF: 'PDF',
  JSON: 'JSON',
} as const;

/**
 * অ্যানালিটিক্স এক্সপোর্ট ফরম্যাট - ইউনিয়ন টাইপ
 */
export type AnalyticsExportFormatValue =
  (typeof AnalyticsExportFormats)[keyof typeof AnalyticsExportFormats];

/**
 * অ্যানালিটিক্স ক্যাশ টিটিএল (সেকেন্ড)
 */
export const AnalyticsCacheTTL = 3600;

/**
 * অ্যানালিটিক্স মেট্রিক লেবেলসমূহ
 */
export const AnalyticsMetricLabels: Record<AnalyticsMetricValue, { en: string; bn: string }> = {
  [AnalyticsMetric.SALES]: {
    en: 'Sales',
    bn: 'বিক্রয়',
  },
  [AnalyticsMetric.REVENUE]: {
    en: 'Revenue',
    bn: 'আয়',
  },
  [AnalyticsMetric.ORDERS]: {
    en: 'Orders',
    bn: 'অর্ডার',
  },
  [AnalyticsMetric.VIEWS]: {
    en: 'Views',
    bn: 'দর্শন',
  },
  [AnalyticsMetric.CONVERSION_RATE]: {
    en: 'Conversion Rate',
    bn: 'রূপান্তর হার',
  },
  [AnalyticsMetric.CUSTOMER_RETENTION]: {
    en: 'Customer Retention',
    bn: 'গ্রাহক ধারণ',
  },
  [AnalyticsMetric.AVERAGE_ORDER_VALUE]: {
    en: 'Average Order Value',
    bn: 'গড় অর্ডার মান',
  },
};

/**
 * অ্যানালিটিক্স টাইম রেঞ্জ লেবেলসমূহ
 */
export const AnalyticsTimeRangeLabels: Record<AnalyticsTimeRangeValue, { en: string; bn: string }> =
  {
    [AnalyticsTimeRange.LAST_7_DAYS]: {
      en: 'Last 7 Days',
      bn: 'গত ৭ দিন',
    },
    [AnalyticsTimeRange.LAST_30_DAYS]: {
      en: 'Last 30 Days',
      bn: 'গত ৩০ দিন',
    },
    [AnalyticsTimeRange.LAST_90_DAYS]: {
      en: 'Last 90 Days',
      bn: 'গত ৯০ দিন',
    },
    [AnalyticsTimeRange.LAST_365_DAYS]: {
      en: 'Last 365 Days',
      bn: 'গত ৩৬৫ দিন',
    },
    [AnalyticsTimeRange.CUSTOM]: {
      en: 'Custom Range',
      bn: 'কাস্টম রেঞ্জ',
    },
  };

/**
 * অ্যানালিটিক্স অ্যাগ্রিগেশন লেবেলসমূহ
 */
export const AnalyticsAggregationLabels: Record<
  AnalyticsAggregationValue,
  { en: string; bn: string }
> = {
  [AnalyticsAggregation.DAILY]: {
    en: 'Daily',
    bn: 'দৈনিক',
  },
  [AnalyticsAggregation.WEEKLY]: {
    en: 'Weekly',
    bn: 'সাপ্তাহিক',
  },
  [AnalyticsAggregation.MONTHLY]: {
    en: 'Monthly',
    bn: 'মাসিক',
  },
  [AnalyticsAggregation.QUARTERLY]: {
    en: 'Quarterly',
    bn: 'ত্রৈমাসিক',
  },
  [AnalyticsAggregation.YEARLY]: {
    en: 'Yearly',
    bn: 'বার্ষিক',
  },
};

/**
 * অ্যানালিটিক্স এক্সপোর্ট ফরম্যাট লেবেলসমূহ
 */
export const AnalyticsExportFormatLabels: Record<
  AnalyticsExportFormatValue,
  { en: string; bn: string }
> = {
  [AnalyticsExportFormats.CSV]: {
    en: 'CSV',
    bn: 'সিএসভি',
  },
  [AnalyticsExportFormats.EXCEL]: {
    en: 'Excel',
    bn: 'এক্সেল',
  },
  [AnalyticsExportFormats.PDF]: {
    en: 'PDF',
    bn: 'পিডিএফ',
  },
  [AnalyticsExportFormats.JSON]: {
    en: 'JSON',
    bn: 'জেসন',
  },
};

/**
 * অ্যানালিটিক্স ডিফল্ট টাইম রেঞ্জ
 */
export const AnalyticsDefaultTimeRange = AnalyticsTimeRange.LAST_30_DAYS;

/**
 * অ্যানালিটিক্স ডিফল্ট অ্যাগ্রিগেশন
 */
export const AnalyticsDefaultAggregation = AnalyticsAggregation.DAILY;

/**
 * অ্যানালিটিক্স ডিফল্ট এক্সপোর্ট ফরম্যাট
 */
export const AnalyticsDefaultExportFormat = AnalyticsExportFormats.CSV;

/**
 * অ্যানালিটিক্স রেট লিমিট (প্রতি মিনিটে রিকোয়েস্ট)
 */
export const AnalyticsRateLimit = 100;

/**
 * অ্যানালিটিক্স রিপোর্ট জেনারেশন টাইমআউট (সেকেন্ড)
 */
export const AnalyticsReportGenerationTimeout = 300;

/**
 * অ্যানালিটিক্স ড্যাশবোর্ড রিফ্রেশ ইন্টারভাল (মিনিট)
 */
export const AnalyticsDashboardRefreshInterval = 5;

/**
 * অ্যানালিটিক্স ডেটা রিটেনশন (দিন)
 */
export const AnalyticsDataRetentionDays = 730;

/**
 * অ্যানালিটিক্স পারফরম্যান্স থ্রেশহোল্ড
 */
export const AnalyticsPerformanceThresholds = {
  SALES_GOOD: 1000,
  SALES_EXCELLENT: 5000,
  REVENUE_GOOD: 10000,
  REVENUE_EXCELLENT: 50000,
  CONVERSION_GOOD: 2,
  CONVERSION_EXCELLENT: 5,
} as const;
