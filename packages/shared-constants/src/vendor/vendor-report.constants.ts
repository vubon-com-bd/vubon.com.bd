/**
 * ভেন্ডার রিপোর্ট সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * রিপোর্ট টাইপ অবজেক্ট
 */
export const ReportType = {
  SALES: 'SALES',
  FINANCIAL: 'FINANCIAL',
  PERFORMANCE: 'PERFORMANCE',
  CUSTOMER: 'CUSTOMER',
  PRODUCT: 'PRODUCT',
  ORDER: 'ORDER',
  PAYMENT: 'PAYMENT',
  COMPLIANCE: 'COMPLIANCE',
} as const;

/**
 * রিপোর্ট টাইপ - ইউনিয়ন টাইপ
 */
export type ReportTypeValue = (typeof ReportType)[keyof typeof ReportType];

/**
 * রিপোর্ট ফরম্যাট অবজেক্ট
 */
export const ReportFormat = {
  PDF: 'PDF',
  CSV: 'CSV',
  EXCEL: 'EXCEL',
  JSON: 'JSON',
  HTML: 'HTML',
} as const;

/**
 * রিপোর্ট ফরম্যাট - ইউনিয়ন টাইপ
 */
export type ReportFormatValue = (typeof ReportFormat)[keyof typeof ReportFormat];

/**
 * রিপোর্ট স্ট্যাটাস
 */
export const ReportStatus = {
  PENDING: 'PENDING',
  GENERATING: 'GENERATING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
} as const;

/**
 * রিপোর্ট স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type ReportStatusValue = (typeof ReportStatus)[keyof typeof ReportStatus];

/**
 * রিপোর্ট ফ্রিকোয়েন্সি
 */
export const ReportFrequency = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  YEARLY: 'YEARLY',
  ON_DEMAND: 'ON_DEMAND',
} as const;

/**
 * রিপোর্ট ফ্রিকোয়েন্সি - ইউনিয়ন টাইপ
 */
export type ReportFrequencyValue = (typeof ReportFrequency)[keyof typeof ReportFrequency];

/**
 * রিপোর্ট রিটেনশন দিন
 */
export const ReportRetentionDays = 365;

/**
 * সর্বোচ্চ রিপোর্ট জেনারেশন সময় (সেকেন্ড)
 */
export const MaxReportGenerationTime = 600;

/**
 * রিপোর্ট টাইপ লেবেলসমূহ
 */
export const ReportTypeLabels: Record<ReportTypeValue, { en: string; bn: string }> = {
  [ReportType.SALES]: {
    en: 'Sales Report',
    bn: 'বিক্রয় রিপোর্ট',
  },
  [ReportType.FINANCIAL]: {
    en: 'Financial Report',
    bn: 'আর্থিক রিপোর্ট',
  },
  [ReportType.PERFORMANCE]: {
    en: 'Performance Report',
    bn: 'পারফরম্যান্স রিপোর্ট',
  },
  [ReportType.CUSTOMER]: {
    en: 'Customer Report',
    bn: 'গ্রাহক রিপোর্ট',
  },
  [ReportType.PRODUCT]: {
    en: 'Product Report',
    bn: 'পণ্য রিপোর্ট',
  },
  [ReportType.ORDER]: {
    en: 'Order Report',
    bn: 'অর্ডার রিপোর্ট',
  },
  [ReportType.PAYMENT]: {
    en: 'Payment Report',
    bn: 'পেমেন্ট রিপোর্ট',
  },
  [ReportType.COMPLIANCE]: {
    en: 'Compliance Report',
    bn: 'কমপ্লায়েন্স রিপোর্ট',
  },
};

/**
 * রিপোর্ট ফরম্যাট লেবেলসমূহ
 */
export const ReportFormatLabels: Record<ReportFormatValue, { en: string; bn: string }> = {
  [ReportFormat.PDF]: {
    en: 'PDF',
    bn: 'পিডিএফ',
  },
  [ReportFormat.CSV]: {
    en: 'CSV',
    bn: 'সিএসভি',
  },
  [ReportFormat.EXCEL]: {
    en: 'Excel',
    bn: 'এক্সেল',
  },
  [ReportFormat.JSON]: {
    en: 'JSON',
    bn: 'জেসন',
  },
  [ReportFormat.HTML]: {
    en: 'HTML',
    bn: 'এইচটিএমএল',
  },
};

/**
 * রিপোর্ট ফরম্যাট এক্সটেনশনসমূহ
 */
export const ReportFormatExtensions: Record<ReportFormatValue, string> = {
  [ReportFormat.PDF]: 'pdf',
  [ReportFormat.CSV]: 'csv',
  [ReportFormat.EXCEL]: 'xlsx',
  [ReportFormat.JSON]: 'json',
  [ReportFormat.HTML]: 'html',
};

/**
 * রিপোর্ট স্ট্যাটাস লেবেলসমূহ
 */
export const ReportStatusLabels: Record<ReportStatusValue, { en: string; bn: string }> = {
  [ReportStatus.PENDING]: {
    en: 'Pending',
    bn: 'অপেক্ষমাণ',
  },
  [ReportStatus.GENERATING]: {
    en: 'Generating',
    bn: 'জেনারেট হচ্ছে',
  },
  [ReportStatus.COMPLETED]: {
    en: 'Completed',
    bn: 'সম্পন্ন',
  },
  [ReportStatus.FAILED]: {
    en: 'Failed',
    bn: 'ব্যর্থ',
  },
  [ReportStatus.EXPIRED]: {
    en: 'Expired',
    bn: 'মেয়াদ উত্তীর্ণ',
  },
};

/**
 * রিপোর্ট স্ট্যাটাস রঙ কোডসমূহ
 */
export const ReportStatusColors: Record<ReportStatusValue, string> = {
  [ReportStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [ReportStatus.GENERATING]: 'bg-blue-100 text-blue-800 border-blue-300',
  [ReportStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-300',
  [ReportStatus.FAILED]: 'bg-red-100 text-red-800 border-red-300',
  [ReportStatus.EXPIRED]: 'bg-gray-100 text-gray-800 border-gray-300',
};

/**
 * রিপোর্ট ফ্রিকোয়েন্সি লেবেলসমূহ
 */
export const ReportFrequencyLabels: Record<ReportFrequencyValue, { en: string; bn: string }> = {
  [ReportFrequency.DAILY]: {
    en: 'Daily',
    bn: 'দৈনিক',
  },
  [ReportFrequency.WEEKLY]: {
    en: 'Weekly',
    bn: 'সাপ্তাহিক',
  },
  [ReportFrequency.MONTHLY]: {
    en: 'Monthly',
    bn: 'মাসিক',
  },
  [ReportFrequency.QUARTERLY]: {
    en: 'Quarterly',
    bn: 'ত্রৈমাসিক',
  },
  [ReportFrequency.YEARLY]: {
    en: 'Yearly',
    bn: 'বার্ষিক',
  },
  [ReportFrequency.ON_DEMAND]: {
    en: 'On Demand',
    bn: 'চাহিদা অনুযায়ী',
  },
};

/**
 * রিপোর্ট ডিফল্ট লিমিট
 */
export const ReportDefaultLimit = 1000;

/**
 * রিপোর্ট পেজ সাইজ
 */
export const ReportPageSize = 50;

/**
 * রিপোর্ট ডাউনলোড লিমিট (মিনিট)
 */
export const ReportDownloadLimitMinutes = 10;

/**
 * রিপোর্ট ক্যাশে টিটিএল (সেকেন্ড)
 */
export const ReportCacheTTL = 3600;
