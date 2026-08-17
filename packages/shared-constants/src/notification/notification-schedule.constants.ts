// ============================================
// নোটিফিকেশন শিডিউল সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. শিডিউল মৌলিক কনফিগারেশন
// ============================================

/**
 * ডিফল্ট টাইমজোন
 * @default 'UTC'
 */
export const NOTIFICATION_SCHEDULE_DEFAULT_TIMEZONE = 'UTC';

/**
 * ডিফল্ট রিজলিউশন (মিনিট)
 * @default 1
 */
export const NOTIFICATION_SCHEDULE_DEFAULT_RESOLUTION = 1;

/**
 * সর্বোচ্চ শিডিউল ডিউরেশন (মিলিসেকেন্ডে)
 * @default 31536000000 (১ বছর)
 */
export const NOTIFICATION_SCHEDULE_MAX_DURATION = 365 * 24 * 60 * 60 * 1000;

/**
 * ন্যূনতম শিডিউল ডিউরেশন (মিলিসেকেন্ডে)
 * @default 60000 (১ মিনিট)
 */
export const NOTIFICATION_SCHEDULE_MIN_DURATION = 60 * 1000;

/**
 * ডিফল্ট শিডিউল টাইমআউট (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const NOTIFICATION_SCHEDULE_DEFAULT_TIMEOUT = 30000;

/**
 * সর্বোচ্চ শিডিউল টাইমআউট (মিলিসেকেন্ডে)
 * @default 120000 (২ মিনিট)
 */
export const NOTIFICATION_SCHEDULE_MAX_TIMEOUT = 120000;

/**
 * ডিফল্ট শিডিউল ব্যাচ সাইজ
 * @default 100
 */
export const NOTIFICATION_SCHEDULE_DEFAULT_BATCH_SIZE = 100;

/**
 * সর্বোচ্চ শিডিউল ব্যাচ সাইজ
 * @default 1000
 */
export const NOTIFICATION_SCHEDULE_MAX_BATCH_SIZE = 1000;

/**
 * ডিফল্ট শিডিউল রেট লিমিট (প্রতি মিনিটে)
 * @default 60
 */
export const NOTIFICATION_SCHEDULE_DEFAULT_RATE_LIMIT = 60;

/**
 * শিডিউল ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const NOTIFICATION_SCHEDULE_CACHE_TTL = 5 * 60 * 1000;

/**
 * শিডিউল ক্যাশ ম্যাক্স সাইজ
 * @default 1000
 */
export const NOTIFICATION_SCHEDULE_CACHE_MAX_SIZE = 1000;

// ============================================
// ২. ক্রন ফরম্যাট
// ============================================

/**
 * ক্রন ফরম্যাট টাইপ
 */
export type NotificationScheduleCronFormat =
  | typeof NOTIFICATION_SCHEDULE_CRON_FORMAT_STANDARD
  | typeof NOTIFICATION_SCHEDULE_CRON_FORMAT_QUARTZ
  | typeof NOTIFICATION_SCHEDULE_CRON_FORMAT_AWS
  | typeof NOTIFICATION_SCHEDULE_CRON_FORMAT_CRONJOB;

/**
 * স্ট্যান্ডার্ড ক্রন ফরম্যাট (৫ ফিল্ড)
 * @description মিনিট, ঘন্টা, দিন, মাস, সপ্তাহের দিন
 */
export const NOTIFICATION_SCHEDULE_CRON_FORMAT_STANDARD = 'STANDARD';

/**
 * কোয়ার্টজ ক্রন ফরম্যাট (৬ ফিল্ড)
 * @description সেকেন্ড, মিনিট, ঘন্টা, দিন, মাস, সপ্তাহের দিন
 */
export const NOTIFICATION_SCHEDULE_CRON_FORMAT_QUARTZ = 'QUARTZ';

/**
 * AWS ক্রন ফরম্যাট (৬ ফিল্ড)
 * @description মিনিট, ঘন্টা, দিন, মাস, সপ্তাহের দিন, বছর
 */
export const NOTIFICATION_SCHEDULE_CRON_FORMAT_AWS = 'AWS';

/**
 * ক্রনজব ক্রন ফরম্যাট (৫ ফিল্ড)
 * @description মিনিট, ঘন্টা, দিন, মাস, সপ্তাহের দিন
 */
export const NOTIFICATION_SCHEDULE_CRON_FORMAT_CRONJOB = 'CRONJOB';

// ============================================
// ৩. রিকারিং টাইপ
// ============================================

/**
 * রিকারিং টাইপ
 */
export type NotificationScheduleRecurringType =
  | typeof NOTIFICATION_SCHEDULE_RECURRING_NONE
  | typeof NOTIFICATION_SCHEDULE_RECURRING_DAILY
  | typeof NOTIFICATION_SCHEDULE_RECURRING_WEEKLY
  | typeof NOTIFICATION_SCHEDULE_RECURRING_MONTHLY
  | typeof NOTIFICATION_SCHEDULE_RECURRING_YEARLY
  | typeof NOTIFICATION_SCHEDULE_RECURRING_CUSTOM
  | typeof NOTIFICATION_SCHEDULE_RECURRING_HOURLY
  | typeof NOTIFICATION_SCHEDULE_RECURRING_MINUTELY
  | typeof NOTIFICATION_SCHEDULE_RECURRING_WEEKDAY;

/**
 * নো রিকারিং
 * @description একবারই শিডিউল হয়
 */
export const NOTIFICATION_SCHEDULE_RECURRING_NONE = 'NONE';

/**
 * ডেইলি রিকারিং
 * @description প্রতিদিন একই সময়ে
 */
export const NOTIFICATION_SCHEDULE_RECURRING_DAILY = 'DAILY';

/**
 * উইকলি রিকারিং
 * @description প্রতি সপ্তাহে একই দিনে
 */
export const NOTIFICATION_SCHEDULE_RECURRING_WEEKLY = 'WEEKLY';

/**
 * মান্থলি রিকারিং
 * @description প্রতি মাসে একই তারিখে
 */
export const NOTIFICATION_SCHEDULE_RECURRING_MONTHLY = 'MONTHLY';

/**
 * ইয়ারলি রিকারিং
 * @description প্রতি বছরে একই তারিখে
 */
export const NOTIFICATION_SCHEDULE_RECURRING_YEARLY = 'YEARLY';

/**
 * কাস্টম রিকারিং
 * @description কাস্টম প্যাটার্নে
 */
export const NOTIFICATION_SCHEDULE_RECURRING_CUSTOM = 'CUSTOM';

/**
 * আওয়ারলি রিকারিং
 * @description প্রতি ঘন্টায়
 */
export const NOTIFICATION_SCHEDULE_RECURRING_HOURLY = 'HOURLY';

/**
 * মিনিটলি রিকারিং
 * @description প্রতি মিনিটে
 */
export const NOTIFICATION_SCHEDULE_RECURRING_MINUTELY = 'MINUTELY';

/**
 * উইকডে রিকারিং
 * @description শুধুমাত্র কর্মদিবসে
 */
export const NOTIFICATION_SCHEDULE_RECURRING_WEEKDAY = 'WEEKDAY';

// ============================================
// ৪. শিডিউল কনফিগারেশন
// ============================================

/**
 * শিডিউল কনফিগারেশন ইন্টারফেস
 */
export interface NotificationScheduleConfig {
  /** ডিফল্ট টাইমজোন */
  defaultTimezone: string;
  /** ডিফল্ট রিজলিউশন */
  defaultResolution: number;
  /** সর্বোচ্চ ডিউরেশন */
  maxDuration: number;
  /** ন্যূনতম ডিউরেশন */
  minDuration: number;
  /** ডিফল্ট টাইমআউট */
  defaultTimeout: number;
  /** সর্বোচ্চ টাইমআউট */
  maxTimeout: number;
  /** ডিফল্ট ব্যাচ সাইজ */
  defaultBatchSize: number;
  /** সর্বোচ্চ ব্যাচ সাইজ */
  maxBatchSize: number;
  /** ডিফল্ট রেট লিমিট */
  defaultRateLimit: number;
  /** ক্যাশ টিটিএল */
  cacheTtl: number;
  /** ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
}

/**
 * ডিফল্ট শিডিউল কনফিগারেশন
 */
export const NOTIFICATION_SCHEDULE_DEFAULT_CONFIG: NotificationScheduleConfig = {
  defaultTimezone: NOTIFICATION_SCHEDULE_DEFAULT_TIMEZONE,
  defaultResolution: NOTIFICATION_SCHEDULE_DEFAULT_RESOLUTION,
  maxDuration: NOTIFICATION_SCHEDULE_MAX_DURATION,
  minDuration: NOTIFICATION_SCHEDULE_MIN_DURATION,
  defaultTimeout: NOTIFICATION_SCHEDULE_DEFAULT_TIMEOUT,
  maxTimeout: NOTIFICATION_SCHEDULE_MAX_TIMEOUT,
  defaultBatchSize: NOTIFICATION_SCHEDULE_DEFAULT_BATCH_SIZE,
  maxBatchSize: NOTIFICATION_SCHEDULE_MAX_BATCH_SIZE,
  defaultRateLimit: NOTIFICATION_SCHEDULE_DEFAULT_RATE_LIMIT,
  cacheTtl: NOTIFICATION_SCHEDULE_CACHE_TTL,
  cacheMaxSize: NOTIFICATION_SCHEDULE_CACHE_MAX_SIZE,
};

// ============================================
// ৫. ক্রন ফরম্যাট লেবেল
// ============================================

/**
 * ক্রন ফরম্যাট লেবেল
 */
export const NOTIFICATION_SCHEDULE_CRON_FORMAT_LABELS: Record<
  NotificationScheduleCronFormat,
  string
> = {
  [NOTIFICATION_SCHEDULE_CRON_FORMAT_STANDARD]: 'স্ট্যান্ডার্ড (৫ ফিল্ড)',
  [NOTIFICATION_SCHEDULE_CRON_FORMAT_QUARTZ]: 'কোয়ার্টজ (৬ ফিল্ড)',
  [NOTIFICATION_SCHEDULE_CRON_FORMAT_AWS]: 'AWS (৬ ফিল্ড)',
  [NOTIFICATION_SCHEDULE_CRON_FORMAT_CRONJOB]: 'ক্রনজব (৫ ফিল্ড)',
};

// ============================================
// ৬. রিকারিং টাইপ লেবেল
// ============================================

/**
 * রিকারিং টাইপ লেবেল
 */
export const NOTIFICATION_SCHEDULE_RECURRING_LABELS: Record<
  NotificationScheduleRecurringType,
  string
> = {
  [NOTIFICATION_SCHEDULE_RECURRING_NONE]: 'একবার',
  [NOTIFICATION_SCHEDULE_RECURRING_DAILY]: 'দৈনিক',
  [NOTIFICATION_SCHEDULE_RECURRING_WEEKLY]: 'সাপ্তাহিক',
  [NOTIFICATION_SCHEDULE_RECURRING_MONTHLY]: 'মাসিক',
  [NOTIFICATION_SCHEDULE_RECURRING_YEARLY]: 'বার্ষিক',
  [NOTIFICATION_SCHEDULE_RECURRING_CUSTOM]: 'কাস্টম',
  [NOTIFICATION_SCHEDULE_RECURRING_HOURLY]: 'প্রতি ঘন্টায়',
  [NOTIFICATION_SCHEDULE_RECURRING_MINUTELY]: 'প্রতি মিনিটে',
  [NOTIFICATION_SCHEDULE_RECURRING_WEEKDAY]: 'কর্মদিবসে',
};
