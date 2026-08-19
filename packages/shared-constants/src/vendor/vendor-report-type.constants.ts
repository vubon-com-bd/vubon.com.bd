/**
 * রিপোর্টের সুনির্দিষ্ট ধরন সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * রিপোর্ট ক্যাটাগরি অবজেক্ট
 */
export const ReportCategory = {
  FINANCIAL_REPORTS: 'FINANCIAL_REPORTS',
  PERFORMANCE_REPORTS: 'PERFORMANCE_REPORTS',
  OPERATIONAL_REPORTS: 'OPERATIONAL_REPORTS',
  ANALYTICAL_REPORTS: 'ANALYTICAL_REPORTS',
  COMPLIANCE_REPORTS: 'COMPLIANCE_REPORTS',
} as const;

/**
 * রিপোর্ট ক্যাটাগরি - ইউনিয়ন টাইপ
 */
export type ReportCategoryValue = (typeof ReportCategory)[keyof typeof ReportCategory];

/**
 * রিপোর্ট সাবটাইপ অবজেক্ট
 */
export const ReportSubType = {
  MONTHLY_SALES: 'MONTHLY_SALES',
  QUARTERLY_REVENUE: 'QUARTERLY_REVENUE',
  ANNUAL_PERFORMANCE: 'ANNUAL_PERFORMANCE',
  COMMISSION_BREAKDOWN: 'COMMISSION_BREAKDOWN',
  PAYOUT_HISTORY: 'PAYOUT_HISTORY',
  TAX_SUMMARY: 'TAX_SUMMARY',
} as const;

/**
 * রিপোর্ট সাবটাইপ - ইউনিয়ন টাইপ
 */
export type ReportSubTypeValue = (typeof ReportSubType)[keyof typeof ReportSubType];

/**
 * রিপোর্ট ক্যাটাগরি লেবেলসমূহ
 */
export const ReportCategoryLabels: Record<ReportCategoryValue, { en: string; bn: string }> = {
  [ReportCategory.FINANCIAL_REPORTS]: {
    en: 'Financial Reports',
    bn: 'আর্থিক রিপোর্ট',
  },
  [ReportCategory.PERFORMANCE_REPORTS]: {
    en: 'Performance Reports',
    bn: 'পারফরম্যান্স রিপোর্ট',
  },
  [ReportCategory.OPERATIONAL_REPORTS]: {
    en: 'Operational Reports',
    bn: 'অপারেশনাল রিপোর্ট',
  },
  [ReportCategory.ANALYTICAL_REPORTS]: {
    en: 'Analytical Reports',
    bn: 'বিশ্লেষণমূলক রিপোর্ট',
  },
  [ReportCategory.COMPLIANCE_REPORTS]: {
    en: 'Compliance Reports',
    bn: 'কমপ্লায়েন্স রিপোর্ট',
  },
};

/**
 * রিপোর্ট সাবটাইপ লেবেলসমূহ
 */
export const ReportSubTypeLabels: Record<ReportSubTypeValue, { en: string; bn: string }> = {
  [ReportSubType.MONTHLY_SALES]: {
    en: 'Monthly Sales Report',
    bn: 'মাসিক বিক্রয় রিপোর্ট',
  },
  [ReportSubType.QUARTERLY_REVENUE]: {
    en: 'Quarterly Revenue Report',
    bn: 'ত্রৈমাসিক আয় রিপোর্ট',
  },
  [ReportSubType.ANNUAL_PERFORMANCE]: {
    en: 'Annual Performance Report',
    bn: 'বার্ষিক পারফরম্যান্স রিপোর্ট',
  },
  [ReportSubType.COMMISSION_BREAKDOWN]: {
    en: 'Commission Breakdown Report',
    bn: 'কমিশন ব্রেকডাউন রিপোর্ট',
  },
  [ReportSubType.PAYOUT_HISTORY]: {
    en: 'Payout History Report',
    bn: 'পেআউট ইতিহাস রিপোর্ট',
  },
  [ReportSubType.TAX_SUMMARY]: {
    en: 'Tax Summary Report',
    bn: 'কর সারসংক্ষেপ রিপোর্ট',
  },
};

/**
 * রিপোর্ট টাইপ বিবরণসমূহ
 */
export const ReportTypeDescriptions: Record<ReportSubTypeValue, string> = {
  [ReportSubType.MONTHLY_SALES]: 'Detailed sales report for a specific month',
  [ReportSubType.QUARTERLY_REVENUE]: 'Revenue breakdown by quarter',
  [ReportSubType.ANNUAL_PERFORMANCE]: 'Annual performance metrics and analytics',
  [ReportSubType.COMMISSION_BREAKDOWN]: 'Detailed commission breakdown by product/service',
  [ReportSubType.PAYOUT_HISTORY]: 'Complete history of vendor payouts',
  [ReportSubType.TAX_SUMMARY]: 'Tax summary report for compliance',
};

/**
 * রিপোর্ট টাইপ প্রয়োজনীয় প্যারামিটারসমূহ
 */
export const ReportTypeRequiredParams: Record<ReportSubTypeValue, string[]> = {
  [ReportSubType.MONTHLY_SALES]: ['year', 'month'],
  [ReportSubType.QUARTERLY_REVENUE]: ['year', 'quarter'],
  [ReportSubType.ANNUAL_PERFORMANCE]: ['year'],
  [ReportSubType.COMMISSION_BREAKDOWN]: ['startDate', 'endDate'],
  [ReportSubType.PAYOUT_HISTORY]: ['startDate', 'endDate'],
  [ReportSubType.TAX_SUMMARY]: ['financialYear'],
};

/**
 * রিপোর্ট টাইপ ডিফল্ট ফিল্টারসমূহ (স্ট্রিং বা নাম্বার টাইপ)
 */
export const ReportTypeDefaultFilters: Record<
  ReportSubTypeValue,
  Record<string, string | number>
> = {
  [ReportSubType.MONTHLY_SALES]: {
    status: 'completed',
    limit: 1000,
  },
  [ReportSubType.QUARTERLY_REVENUE]: {
    include_tax: 'true',
    include_commission: 'true',
  },
  [ReportSubType.ANNUAL_PERFORMANCE]: {
    include_details: 'true',
    format: 'detailed',
  },
  [ReportSubType.COMMISSION_BREAKDOWN]: {
    group_by: 'product',
    include_totals: 'true',
  },
  [ReportSubType.PAYOUT_HISTORY]: {
    status: 'all',
    sort_by: 'date_desc',
  },
  [ReportSubType.TAX_SUMMARY]: {
    include_vat: 'true',
    include_gst: 'true',
  },
};

/**
 * রিপোর্ট ক্যাটাগরি ক্যাশে টিটিএল (সেকেন্ড)
 */
export const ReportCategoryCacheTTL = 3600;

/**
 * রিপোর্ট সাবটাইপ ক্যাশে টিটিএল (সেকেন্ড)
 */
export const ReportSubTypeCacheTTL = 3600;
