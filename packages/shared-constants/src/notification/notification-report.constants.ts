// ============================================
// নোটিফিকেশন রিপোর্ট সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. রিপোর্ট মৌলিক কনফিগারেশন
// ============================================

/**
 * ম্যাক্স রিপোর্ট সাইজ (বাইটে)
 * @default 10485760 (১০MB)
 */
export const NOTIFICATION_REPORT_MAX_SIZE = 10 * 1024 * 1024;

/**
 * ডিফল্ট রিপোর্ট জেনারেশন টাইম (মিনিটে)
 * @default 60 (১ ঘন্টা)
 */
export const NOTIFICATION_REPORT_DEFAULT_GENERATION_TIME = 60;

/**
 * ডিফল্ট রিপোর্ট টাইমআউট (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const NOTIFICATION_REPORT_DEFAULT_TIMEOUT = 5 * 60 * 1000;

/**
 * ম্যাক্স রিপোর্ট টাইমআউট (মিলিসেকেন্ডে)
 * @default 3600000 (১ ঘন্টা)
 */
export const NOTIFICATION_REPORT_MAX_TIMEOUT = 60 * 60 * 1000;

/**
 * ডিফল্ট রিপোর্ট ব্যাচ সাইজ
 * @default 1000
 */
export const NOTIFICATION_REPORT_DEFAULT_BATCH_SIZE = 1000;

/**
 * ডিফল্ট রিপোর্ট রেট লিমিট (প্রতি মিনিটে)
 * @default 10
 */
export const NOTIFICATION_REPORT_DEFAULT_RATE_LIMIT = 10;

/**
 * রিপোর্ট ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const NOTIFICATION_REPORT_CACHE_TTL = 5 * 60 * 1000;

/**
 * রিপোর্ট ক্যাশ ম্যাক্স সাইজ
 * @default 100
 */
export const NOTIFICATION_REPORT_CACHE_MAX_SIZE = 100;

// ============================================
// ২. রিপোর্ট ফরম্যাট
// ============================================

/**
 * রিপোর্ট ফরম্যাট টাইপ
 */
export type NotificationReportFormat =
  | typeof NOTIFICATION_REPORT_FORMAT_PDF
  | typeof NOTIFICATION_REPORT_FORMAT_CSV
  | typeof NOTIFICATION_REPORT_FORMAT_EXCEL
  | typeof NOTIFICATION_REPORT_FORMAT_JSON
  | typeof NOTIFICATION_REPORT_FORMAT_XML
  | typeof NOTIFICATION_REPORT_FORMAT_HTML
  | typeof NOTIFICATION_REPORT_FORMAT_MARKDOWN
  | typeof NOTIFICATION_REPORT_FORMAT_TXT;

/**
 * PDF ফরম্যাট
 */
export const NOTIFICATION_REPORT_FORMAT_PDF = 'PDF';

/**
 * CSV ফরম্যাট
 */
export const NOTIFICATION_REPORT_FORMAT_CSV = 'CSV';

/**
 * Excel ফরম্যাট
 */
export const NOTIFICATION_REPORT_FORMAT_EXCEL = 'EXCEL';

/**
 * JSON ফরম্যাট
 */
export const NOTIFICATION_REPORT_FORMAT_JSON = 'JSON';

/**
 * XML ফরম্যাট
 */
export const NOTIFICATION_REPORT_FORMAT_XML = 'XML';

/**
 * HTML ফরম্যাট
 */
export const NOTIFICATION_REPORT_FORMAT_HTML = 'HTML';

/**
 * Markdown ফরম্যাট
 */
export const NOTIFICATION_REPORT_FORMAT_MARKDOWN = 'MARKDOWN';

/**
 * TXT ফরম্যাট
 */
export const NOTIFICATION_REPORT_FORMAT_TXT = 'TXT';

// ============================================
// ৩. আউটপুট টাইপ
// ============================================

/**
 * আউটপুট টাইপ
 */
export type NotificationReportOutputType =
  | typeof NOTIFICATION_REPORT_OUTPUT_TYPE_FILE
  | typeof NOTIFICATION_REPORT_OUTPUT_TYPE_EMAIL
  | typeof NOTIFICATION_REPORT_OUTPUT_TYPE_API
  | typeof NOTIFICATION_REPORT_OUTPUT_TYPE_WEBHOOK
  | typeof NOTIFICATION_REPORT_OUTPUT_TYPE_STORAGE
  | typeof NOTIFICATION_REPORT_OUTPUT_TYPE_PRINT;

/**
 * ফাইল আউটপুট
 */
export const NOTIFICATION_REPORT_OUTPUT_TYPE_FILE = 'FILE';

/**
 * ইমেইল আউটপুট
 */
export const NOTIFICATION_REPORT_OUTPUT_TYPE_EMAIL = 'EMAIL';

/**
 * API আউটপুট
 */
export const NOTIFICATION_REPORT_OUTPUT_TYPE_API = 'API';

/**
 * ওয়েবহুক আউটপুট
 */
export const NOTIFICATION_REPORT_OUTPUT_TYPE_WEBHOOK = 'WEBHOOK';

/**
 * স্টোরেজ আউটপুট
 */
export const NOTIFICATION_REPORT_OUTPUT_TYPE_STORAGE = 'STORAGE';

/**
 * প্রিন্ট আউটপুট
 */
export const NOTIFICATION_REPORT_OUTPUT_TYPE_PRINT = 'PRINT';

// ============================================
// ৪. শিডিউল টাইপ
// ============================================

/**
 * শিডিউল টাইপ
 */
export type NotificationReportScheduleType =
  | typeof NOTIFICATION_REPORT_SCHEDULE_TYPE_ON_DEMAND
  | typeof NOTIFICATION_REPORT_SCHEDULE_TYPE_DAILY
  | typeof NOTIFICATION_REPORT_SCHEDULE_TYPE_WEEKLY
  | typeof NOTIFICATION_REPORT_SCHEDULE_TYPE_MONTHLY
  | typeof NOTIFICATION_REPORT_SCHEDULE_TYPE_QUARTERLY
  | typeof NOTIFICATION_REPORT_SCHEDULE_TYPE_YEARLY
  | typeof NOTIFICATION_REPORT_SCHEDULE_TYPE_CUSTOM;

/**
 * অন-ডিমান্ড শিডিউল
 */
export const NOTIFICATION_REPORT_SCHEDULE_TYPE_ON_DEMAND = 'ON_DEMAND';

/**
 * ডেইলি শিডিউল
 */
export const NOTIFICATION_REPORT_SCHEDULE_TYPE_DAILY = 'DAILY';

/**
 * উইকলি শিডিউল
 */
export const NOTIFICATION_REPORT_SCHEDULE_TYPE_WEEKLY = 'WEEKLY';

/**
 * মান্থলি শিডিউল
 */
export const NOTIFICATION_REPORT_SCHEDULE_TYPE_MONTHLY = 'MONTHLY';

/**
 * কোয়ার্টারলি শিডিউল
 */
export const NOTIFICATION_REPORT_SCHEDULE_TYPE_QUARTERLY = 'QUARTERLY';

/**
 * ইয়ারলি শিডিউল
 */
export const NOTIFICATION_REPORT_SCHEDULE_TYPE_YEARLY = 'YEARLY';

/**
 * কাস্টম শিডিউল
 */
export const NOTIFICATION_REPORT_SCHEDULE_TYPE_CUSTOM = 'CUSTOM';

// ============================================
// ৫. ডেটা এগ্রিগেশন টাইপ
// ============================================

/**
 * ডেটা এগ্রিগেশন টাইপ
 */
export type NotificationReportDataAggregation =
  | typeof NOTIFICATION_REPORT_DATA_AGGREGATION_SUMMARY
  | typeof NOTIFICATION_REPORT_DATA_AGGREGATION_DETAILED
  | typeof NOTIFICATION_REPORT_DATA_AGGREGATION_TREND
  | typeof NOTIFICATION_REPORT_DATA_AGGREGATION_COMPARISON
  | typeof NOTIFICATION_REPORT_DATA_AGGREGATION_PERCENTILE
  | typeof NOTIFICATION_REPORT_DATA_AGGREGATION_TOP
  | typeof NOTIFICATION_REPORT_DATA_AGGREGATION_BOTTOM
  | typeof NOTIFICATION_REPORT_DATA_AGGREGATION_DISTRIBUTION;

/**
 * সামারি এগ্রিগেশন
 */
export const NOTIFICATION_REPORT_DATA_AGGREGATION_SUMMARY = 'SUMMARY';

/**
 * ডিটেইলড এগ্রিগেশন
 */
export const NOTIFICATION_REPORT_DATA_AGGREGATION_DETAILED = 'DETAILED';

/**
 * ট্রেন্ড এগ্রিগেশন
 */
export const NOTIFICATION_REPORT_DATA_AGGREGATION_TREND = 'TREND';

/**
 * কম্প্যারিসন এগ্রিগেশন
 */
export const NOTIFICATION_REPORT_DATA_AGGREGATION_COMPARISON = 'COMPARISON';

/**
 * পার্সেন্টাইল এগ্রিগেশন
 */
export const NOTIFICATION_REPORT_DATA_AGGREGATION_PERCENTILE = 'PERCENTILE';

/**
 * টপ এগ্রিগেশন
 */
export const NOTIFICATION_REPORT_DATA_AGGREGATION_TOP = 'TOP';

/**
 * বটম এগ্রিগেশন
 */
export const NOTIFICATION_REPORT_DATA_AGGREGATION_BOTTOM = 'BOTTOM';

/**
 * ডিস্ট্রিবিউশন এগ্রিগেশন
 */
export const NOTIFICATION_REPORT_DATA_AGGREGATION_DISTRIBUTION = 'DISTRIBUTION';

// ============================================
// ৬. রিপোর্ট ফরম্যাট লেবেল
// ============================================

/**
 * রিপোর্ট ফরম্যাট লেবেল
 */
export const NOTIFICATION_REPORT_FORMAT_LABELS: Record<NotificationReportFormat, string> = {
  [NOTIFICATION_REPORT_FORMAT_PDF]: 'PDF',
  [NOTIFICATION_REPORT_FORMAT_CSV]: 'CSV',
  [NOTIFICATION_REPORT_FORMAT_EXCEL]: 'Excel',
  [NOTIFICATION_REPORT_FORMAT_JSON]: 'JSON',
  [NOTIFICATION_REPORT_FORMAT_XML]: 'XML',
  [NOTIFICATION_REPORT_FORMAT_HTML]: 'HTML',
  [NOTIFICATION_REPORT_FORMAT_MARKDOWN]: 'Markdown',
  [NOTIFICATION_REPORT_FORMAT_TXT]: 'TXT',
};

// ============================================
// ৭. আউটপুট টাইপ লেবেল
// ============================================

/**
 * আউটপুট টাইপ লেবেল
 */
export const NOTIFICATION_REPORT_OUTPUT_TYPE_LABELS: Record<NotificationReportOutputType, string> =
  {
    [NOTIFICATION_REPORT_OUTPUT_TYPE_FILE]: 'ফাইল',
    [NOTIFICATION_REPORT_OUTPUT_TYPE_EMAIL]: 'ইমেইল',
    [NOTIFICATION_REPORT_OUTPUT_TYPE_API]: 'API',
    [NOTIFICATION_REPORT_OUTPUT_TYPE_WEBHOOK]: 'ওয়েবহুক',
    [NOTIFICATION_REPORT_OUTPUT_TYPE_STORAGE]: 'স্টোরেজ',
    [NOTIFICATION_REPORT_OUTPUT_TYPE_PRINT]: 'প্রিন্ট',
  };

// ============================================
// ৮. শিডিউল টাইপ লেবেল
// ============================================

/**
 * শিডিউল টাইপ লেবেল
 */
export const NOTIFICATION_REPORT_SCHEDULE_TYPE_LABELS: Record<
  NotificationReportScheduleType,
  string
> = {
  [NOTIFICATION_REPORT_SCHEDULE_TYPE_ON_DEMAND]: 'অন-ডিমান্ড',
  [NOTIFICATION_REPORT_SCHEDULE_TYPE_DAILY]: 'দৈনিক',
  [NOTIFICATION_REPORT_SCHEDULE_TYPE_WEEKLY]: 'সাপ্তাহিক',
  [NOTIFICATION_REPORT_SCHEDULE_TYPE_MONTHLY]: 'মাসিক',
  [NOTIFICATION_REPORT_SCHEDULE_TYPE_QUARTERLY]: 'ত্রৈমাসিক',
  [NOTIFICATION_REPORT_SCHEDULE_TYPE_YEARLY]: 'বার্ষিক',
  [NOTIFICATION_REPORT_SCHEDULE_TYPE_CUSTOM]: 'কাস্টম',
};

// ============================================
// ৯. ডেটা এগ্রিগেশন লেবেল
// ============================================

/**
 * ডেটা এগ্রিগেশন লেবেল
 */
export const NOTIFICATION_REPORT_DATA_AGGREGATION_LABELS: Record<
  NotificationReportDataAggregation,
  string
> = {
  [NOTIFICATION_REPORT_DATA_AGGREGATION_SUMMARY]: 'সারাংশ',
  [NOTIFICATION_REPORT_DATA_AGGREGATION_DETAILED]: 'বিস্তারিত',
  [NOTIFICATION_REPORT_DATA_AGGREGATION_TREND]: 'ট্রেন্ড',
  [NOTIFICATION_REPORT_DATA_AGGREGATION_COMPARISON]: 'তুলনা',
  [NOTIFICATION_REPORT_DATA_AGGREGATION_PERCENTILE]: 'পার্সেন্টাইল',
  [NOTIFICATION_REPORT_DATA_AGGREGATION_TOP]: 'শীর্ষ',
  [NOTIFICATION_REPORT_DATA_AGGREGATION_BOTTOM]: 'নিচ',
  [NOTIFICATION_REPORT_DATA_AGGREGATION_DISTRIBUTION]: 'বণ্টন',
};

// ============================================
// ১০. রিপোর্ট কনফিগারেশন
// ============================================

/**
 * রিপোর্ট কনফিগারেশন ইন্টারফেস
 */
export interface NotificationReportConfig {
  /** ম্যাক্স রিপোর্ট সাইজ */
  maxSize: number;
  /** ডিফল্ট জেনারেশন টাইম */
  defaultGenerationTime: number;
  /** ডিফল্ট টাইমআউট */
  defaultTimeout: number;
  /** ম্যাক্স টাইমআউট */
  maxTimeout: number;
  /** ডিফল্ট ব্যাচ সাইজ */
  defaultBatchSize: number;
  /** ডিফল্ট রেট লিমিট */
  defaultRateLimit: number;
  /** ক্যাশ টিটিএল */
  cacheTtl: number;
  /** ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
}

/**
 * ডিফল্ট রিপোর্ট কনফিগারেশন
 */
export const NOTIFICATION_REPORT_DEFAULT_CONFIG: NotificationReportConfig = {
  maxSize: NOTIFICATION_REPORT_MAX_SIZE,
  defaultGenerationTime: NOTIFICATION_REPORT_DEFAULT_GENERATION_TIME,
  defaultTimeout: NOTIFICATION_REPORT_DEFAULT_TIMEOUT,
  maxTimeout: NOTIFICATION_REPORT_MAX_TIMEOUT,
  defaultBatchSize: NOTIFICATION_REPORT_DEFAULT_BATCH_SIZE,
  defaultRateLimit: NOTIFICATION_REPORT_DEFAULT_RATE_LIMIT,
  cacheTtl: NOTIFICATION_REPORT_CACHE_TTL,
  cacheMaxSize: NOTIFICATION_REPORT_CACHE_MAX_SIZE,
};
