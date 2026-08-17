// ============================================
// ডাইজেস্ট নোটিফিকেশন সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ডাইজেস্ট মৌলিক কনফিগারেশন
// ============================================

/**
 * ডাইজেস্ট ডিফল্ট ফ্রিকোয়েন্সি (মিনিটে)
 * @default 1440 (২৪ ঘন্টা)
 */
export const NOTIFICATION_DIGEST_DEFAULT_FREQUENCY = 1440;

/**
 * ডাইজেস্ট ন্যূনতম ফ্রিকোয়েন্সি (মিনিটে)
 * @default 15 (১৫ মিনিট)
 */
export const NOTIFICATION_DIGEST_MIN_FREQUENCY = 15;

/**
 * ডাইজেস্ট সর্বোচ্চ ফ্রিকোয়েন্সি (মিনিটে)
 * @default 10080 (৭ দিন)
 */
export const NOTIFICATION_DIGEST_MAX_FREQUENCY = 7 * 24 * 60;

/**
 * ডাইজেস্ট ম্যাক্স আইটেম সংখ্যা
 * @default 100
 */
export const NOTIFICATION_DIGEST_MAX_ITEMS = 100;

/**
 * ডাইজেস্ট ডিফল্ট ম্যাক্স আইটেম সংখ্যা
 * @default 50
 */
export const NOTIFICATION_DIGEST_DEFAULT_MAX_ITEMS = 50;

/**
 * ডাইজেস্ট ন্যূনতম আইটেম সংখ্যা
 * @default 1
 */
export const NOTIFICATION_DIGEST_MIN_ITEMS = 1;

/**
 * ডাইজেস্ট ডিফল্ট সাইজ (বাইটে)
 * @default 10240 (১০KB)
 */
export const NOTIFICATION_DIGEST_DEFAULT_SIZE = 10 * 1024;

/**
 * ডাইজেস্ট সর্বোচ্চ সাইজ (বাইটে)
 * @default 51200 (৫০KB)
 */
export const NOTIFICATION_DIGEST_MAX_SIZE = 50 * 1024;

/**
 * ডাইজেস্ট ডিফল্ট টাইমআউট (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const NOTIFICATION_DIGEST_DEFAULT_TIMEOUT = 30000;

/**
 * ডাইজেস্ট ডিফল্ট ব্যাচ সাইজ
 * @default 100
 */
export const NOTIFICATION_DIGEST_DEFAULT_BATCH_SIZE = 100;

/**
 * ডাইজেস্ট ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 3600000 (১ ঘন্টা)
 */
export const NOTIFICATION_DIGEST_CACHE_TTL = 60 * 60 * 1000;

/**
 * ডাইজেস্ট ক্যাশ ম্যাক্স সাইজ
 * @default 100
 */
export const NOTIFICATION_DIGEST_CACHE_MAX_SIZE = 100;

// ============================================
// ২. ডাইজেস্ট ফ্রিকোয়েন্সি
// ============================================

/**
 * ডাইজেস্ট ফ্রিকোয়েন্সি টাইপ
 */
export type NotificationDigestFrequency =
  | typeof NOTIFICATION_DIGEST_FREQUENCY_HOURLY
  | typeof NOTIFICATION_DIGEST_FREQUENCY_DAILY
  | typeof NOTIFICATION_DIGEST_FREQUENCY_WEEKLY
  | typeof NOTIFICATION_DIGEST_FREQUENCY_MONTHLY
  | typeof NOTIFICATION_DIGEST_FREQUENCY_CUSTOM;

/**
 * আওয়ারলি ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_DIGEST_FREQUENCY_HOURLY = 'HOURLY';

/**
 * ডেইলি ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_DIGEST_FREQUENCY_DAILY = 'DAILY';

/**
 * উইকলি ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_DIGEST_FREQUENCY_WEEKLY = 'WEEKLY';

/**
 * মান্থলি ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_DIGEST_FREQUENCY_MONTHLY = 'MONTHLY';

/**
 * কাস্টম ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_DIGEST_FREQUENCY_CUSTOM = 'CUSTOM';

// ============================================
// ৩. ডাইজেস্ট গ্রুপিং টাইপ
// ============================================

/**
 * ডাইজেস্ট গ্রুপিং টাইপ
 */
export type NotificationDigestGrouping =
  | typeof NOTIFICATION_DIGEST_GROUPING_BY_TYPE
  | typeof NOTIFICATION_DIGEST_GROUPING_BY_CATEGORY
  | typeof NOTIFICATION_DIGEST_GROUPING_BY_CHANNEL
  | typeof NOTIFICATION_DIGEST_GROUPING_BY_PRIORITY
  | typeof NOTIFICATION_DIGEST_GROUPING_BY_DATE
  | typeof NOTIFICATION_DIGEST_GROUPING_BY_SENDER
  | typeof NOTIFICATION_DIGEST_GROUPING_NONE;

/**
 * টাইপ অনুযায়ী গ্রুপিং
 */
export const NOTIFICATION_DIGEST_GROUPING_BY_TYPE = 'BY_TYPE';

/**
 * ক্যাটাগরি অনুযায়ী গ্রুপিং
 */
export const NOTIFICATION_DIGEST_GROUPING_BY_CATEGORY = 'BY_CATEGORY';

/**
 * চ্যানেল অনুযায়ী গ্রুপিং
 */
export const NOTIFICATION_DIGEST_GROUPING_BY_CHANNEL = 'BY_CHANNEL';

/**
 * প্রায়োরিটি অনুযায়ী গ্রুপিং
 */
export const NOTIFICATION_DIGEST_GROUPING_BY_PRIORITY = 'BY_PRIORITY';

/**
 * তারিখ অনুযায়ী গ্রুপিং
 */
export const NOTIFICATION_DIGEST_GROUPING_BY_DATE = 'BY_DATE';

/**
 * প্রেরক অনুযায়ী গ্রুপিং
 */
export const NOTIFICATION_DIGEST_GROUPING_BY_SENDER = 'BY_SENDER';

/**
 * কোনো গ্রুপিং নেই
 */
export const NOTIFICATION_DIGEST_GROUPING_NONE = 'NONE';

// ============================================
// ৪. ডাইজেস্ট ফরম্যাট
// ============================================

/**
 * ডাইজেস্ট ফরম্যাট টাইপ
 */
export type NotificationDigestFormat =
  | typeof NOTIFICATION_DIGEST_FORMAT_SUMMARY
  | typeof NOTIFICATION_DIGEST_FORMAT_DETAILED
  | typeof NOTIFICATION_DIGEST_FORMAT_COMPACT
  | typeof NOTIFICATION_DIGEST_FORMAT_BULLET
  | typeof NOTIFICATION_DIGEST_FORMAT_TABLE
  | typeof NOTIFICATION_DIGEST_FORMAT_HTML
  | typeof NOTIFICATION_DIGEST_FORMAT_TEXT;

/**
 * সামারি ফরম্যাট
 */
export const NOTIFICATION_DIGEST_FORMAT_SUMMARY = 'SUMMARY';

/**
 * ডিটেইলড ফরম্যাট
 */
export const NOTIFICATION_DIGEST_FORMAT_DETAILED = 'DETAILED';

/**
 * কমপ্যাক্ট ফরম্যাট
 */
export const NOTIFICATION_DIGEST_FORMAT_COMPACT = 'COMPACT';

/**
 * বুলেট ফরম্যাট
 */
export const NOTIFICATION_DIGEST_FORMAT_BULLET = 'BULLET';

/**
 * টেবিল ফরম্যাট
 */
export const NOTIFICATION_DIGEST_FORMAT_TABLE = 'TABLE';

/**
 * HTML ফরম্যাট
 */
export const NOTIFICATION_DIGEST_FORMAT_HTML = 'HTML';

/**
 * টেক্সট ফরম্যাট
 */
export const NOTIFICATION_DIGEST_FORMAT_TEXT = 'TEXT';

// ============================================
// ৫. ডাইজেস্ট সাজানোর ক্রম
// ============================================

/**
 * ডাইজেস্ট সাজানোর ক্রম টাইপ
 */
export type NotificationDigestSortOrder =
  | typeof NOTIFICATION_DIGEST_SORT_BY_DATE_DESC
  | typeof NOTIFICATION_DIGEST_SORT_BY_DATE_ASC
  | typeof NOTIFICATION_DIGEST_SORT_BY_PRIORITY_DESC
  | typeof NOTIFICATION_DIGEST_SORT_BY_PRIORITY_ASC
  | typeof NOTIFICATION_DIGEST_SORT_BY_TYPE
  | typeof NOTIFICATION_DIGEST_SORT_BY_CATEGORY;

/**
 * তারিখ অনুযায়ী ঊর্ধ্বক্রম
 */
export const NOTIFICATION_DIGEST_SORT_BY_DATE_DESC = 'DATE_DESC';

/**
 * তারিখ অনুযায়ী নিম্নক্রম
 */
export const NOTIFICATION_DIGEST_SORT_BY_DATE_ASC = 'DATE_ASC';

/**
 * প্রায়োরিটি অনুযায়ী ঊর্ধ্বক্রম
 */
export const NOTIFICATION_DIGEST_SORT_BY_PRIORITY_DESC = 'PRIORITY_DESC';

/**
 * প্রায়োরিটি অনুযায়ী নিম্নক্রম
 */
export const NOTIFICATION_DIGEST_SORT_BY_PRIORITY_ASC = 'PRIORITY_ASC';

/**
 * টাইপ অনুযায়ী সাজান
 */
export const NOTIFICATION_DIGEST_SORT_BY_TYPE = 'BY_TYPE';

/**
 * ক্যাটাগরি অনুযায়ী সাজান
 */
export const NOTIFICATION_DIGEST_SORT_BY_CATEGORY = 'BY_CATEGORY';

// ============================================
// ৬. ডাইজেস্ট কনফিগারেশন
// ============================================

/**
 * ডাইজেস্ট কনফিগারেশন ইন্টারফেস
 */
export interface NotificationDigestConfig {
  /** ডিফল্ট ফ্রিকোয়েন্সি */
  defaultFrequency: number;
  /** ন্যূনতম ফ্রিকোয়েন্সি */
  minFrequency: number;
  /** সর্বোচ্চ ফ্রিকোয়েন্সি */
  maxFrequency: number;
  /** ডিফল্ট ম্যাক্স আইটেম */
  defaultMaxItems: number;
  /** সর্বোচ্চ আইটেম */
  maxItems: number;
  /** ন্যূনতম আইটেম */
  minItems: number;
  /** ডিফল্ট সাইজ */
  defaultSize: number;
  /** সর্বোচ্চ সাইজ */
  maxSize: number;
  /** ডিফল্ট টাইমআউট */
  defaultTimeout: number;
  /** ডিফল্ট ব্যাচ সাইজ */
  defaultBatchSize: number;
  /** ক্যাশ টিটিএল */
  cacheTtl: number;
  /** ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
}

/**
 * ডিফল্ট ডাইজেস্ট কনফিগারেশন
 */
export const NOTIFICATION_DIGEST_DEFAULT_CONFIG: NotificationDigestConfig = {
  defaultFrequency: NOTIFICATION_DIGEST_DEFAULT_FREQUENCY,
  minFrequency: NOTIFICATION_DIGEST_MIN_FREQUENCY,
  maxFrequency: NOTIFICATION_DIGEST_MAX_FREQUENCY,
  defaultMaxItems: NOTIFICATION_DIGEST_DEFAULT_MAX_ITEMS,
  maxItems: NOTIFICATION_DIGEST_MAX_ITEMS,
  minItems: NOTIFICATION_DIGEST_MIN_ITEMS,
  defaultSize: NOTIFICATION_DIGEST_DEFAULT_SIZE,
  maxSize: NOTIFICATION_DIGEST_MAX_SIZE,
  defaultTimeout: NOTIFICATION_DIGEST_DEFAULT_TIMEOUT,
  defaultBatchSize: NOTIFICATION_DIGEST_DEFAULT_BATCH_SIZE,
  cacheTtl: NOTIFICATION_DIGEST_CACHE_TTL,
  cacheMaxSize: NOTIFICATION_DIGEST_CACHE_MAX_SIZE,
};

// ============================================
// ৭. ডাইজেস্ট ফ্রিকোয়েন্সি লেবেল
// ============================================

/**
 * ডাইজেস্ট ফ্রিকোয়েন্সি লেবেল
 */
export const NOTIFICATION_DIGEST_FREQUENCY_LABELS: Record<NotificationDigestFrequency, string> = {
  [NOTIFICATION_DIGEST_FREQUENCY_HOURLY]: 'প্রতি ঘন্টায়',
  [NOTIFICATION_DIGEST_FREQUENCY_DAILY]: 'প্রতিদিন',
  [NOTIFICATION_DIGEST_FREQUENCY_WEEKLY]: 'প্রতি সপ্তাহে',
  [NOTIFICATION_DIGEST_FREQUENCY_MONTHLY]: 'প্রতি মাসে',
  [NOTIFICATION_DIGEST_FREQUENCY_CUSTOM]: 'কাস্টম',
};

// ============================================
// ৮. ডাইজেস্ট গ্রুপিং লেবেল
// ============================================

/**
 * ডাইজেস্ট গ্রুপিং লেবেল
 */
export const NOTIFICATION_DIGEST_GROUPING_LABELS: Record<NotificationDigestGrouping, string> = {
  [NOTIFICATION_DIGEST_GROUPING_BY_TYPE]: 'টাইপ অনুযায়ী',
  [NOTIFICATION_DIGEST_GROUPING_BY_CATEGORY]: 'ক্যাটাগরি অনুযায়ী',
  [NOTIFICATION_DIGEST_GROUPING_BY_CHANNEL]: 'চ্যানেল অনুযায়ী',
  [NOTIFICATION_DIGEST_GROUPING_BY_PRIORITY]: 'প্রায়োরিটি অনুযায়ী',
  [NOTIFICATION_DIGEST_GROUPING_BY_DATE]: 'তারিখ অনুযায়ী',
  [NOTIFICATION_DIGEST_GROUPING_BY_SENDER]: 'প্রেরক অনুযায়ী',
  [NOTIFICATION_DIGEST_GROUPING_NONE]: 'কোনোটিই নয়',
};

// ============================================
// ৯. ডাইজেস্ট ফরম্যাট লেবেল
// ============================================

/**
 * ডাইজেস্ট ফরম্যাট লেবেল
 */
export const NOTIFICATION_DIGEST_FORMAT_LABELS: Record<NotificationDigestFormat, string> = {
  [NOTIFICATION_DIGEST_FORMAT_SUMMARY]: 'সারাংশ',
  [NOTIFICATION_DIGEST_FORMAT_DETAILED]: 'বিস্তারিত',
  [NOTIFICATION_DIGEST_FORMAT_COMPACT]: 'সংক্ষিপ্ত',
  [NOTIFICATION_DIGEST_FORMAT_BULLET]: 'বুলেট পয়েন্ট',
  [NOTIFICATION_DIGEST_FORMAT_TABLE]: 'টেবিল',
  [NOTIFICATION_DIGEST_FORMAT_HTML]: 'HTML',
  [NOTIFICATION_DIGEST_FORMAT_TEXT]: 'প্লেইন টেক্সট',
};

// ============================================
// ১০. ডাইজেস্ট সাজানোর ক্রম লেবেল
// ============================================

/**
 * ডাইজেস্ট সাজানোর ক্রম লেবেল
 */
export const NOTIFICATION_DIGEST_SORT_LABELS: Record<NotificationDigestSortOrder, string> = {
  [NOTIFICATION_DIGEST_SORT_BY_DATE_DESC]: 'তারিখ (নতুন থেকে পুরাতন)',
  [NOTIFICATION_DIGEST_SORT_BY_DATE_ASC]: 'তারিখ (পুরাতন থেকে নতুন)',
  [NOTIFICATION_DIGEST_SORT_BY_PRIORITY_DESC]: 'প্রায়োরিটি (উচ্চ থেকে নিম্ন)',
  [NOTIFICATION_DIGEST_SORT_BY_PRIORITY_ASC]: 'প্রায়োরিটি (নিম্ন থেকে উচ্চ)',
  [NOTIFICATION_DIGEST_SORT_BY_TYPE]: 'টাইপ অনুযায়ী',
  [NOTIFICATION_DIGEST_SORT_BY_CATEGORY]: 'ক্যাটাগরি অনুযায়ী',
};
