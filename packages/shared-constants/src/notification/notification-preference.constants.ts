// ============================================
// নোটিফিকেশন প্রেফারেন্স সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. প্রেফারেন্স মৌলিক কনফিগারেশন
// ============================================

/**
 * ডিফল্ট প্রেফারেন্স ভার্সন
 * @default '1.0.0'
 */
export const NOTIFICATION_PREFERENCE_DEFAULT_VERSION = '1.0.0';

/**
 * সর্বোচ্চ প্রেফারেন্স সাইজ (বাইটে)
 * @default 10240 (১০KB)
 */
export const NOTIFICATION_PREFERENCE_MAX_SIZE = 10 * 1024;

/**
 * সর্বোচ্চ চ্যানেল প্রেফারেন্স সংখ্যা
 * @default 10
 */
export const NOTIFICATION_PREFERENCE_MAX_CHANNELS = 10;

/**
 * ডিফল্ট টাইমজোন
 * @default 'UTC'
 */
export const NOTIFICATION_PREFERENCE_DEFAULT_TIMEZONE = 'UTC';

/**
 * ডিফল্ট ভাষা
 * @default 'en'
 */
export const NOTIFICATION_PREFERENCE_DEFAULT_LANGUAGE = 'en';

/**
 * ডিফল্ট ফ্রিকোয়েন্সি (মিনিটে)
 * @default 1440 (২৪ ঘন্টা)
 */
export const NOTIFICATION_PREFERENCE_DEFAULT_FREQUENCY = 1440;

/**
 * ন্যূনতম ফ্রিকোয়েন্সি (মিনিটে)
 * @default 15 (১৫ মিনিট)
 */
export const NOTIFICATION_PREFERENCE_MIN_FREQUENCY = 15;

/**
 * সর্বোচ্চ ফ্রিকোয়েন্সি (মিনিটে)
 * @default 10080 (৭ দিন)
 */
export const NOTIFICATION_PREFERENCE_MAX_FREQUENCY = 7 * 24 * 60;

/**
 * ডিফল্ট সাইলেন্ট মোড
 * @default false
 */
export const NOTIFICATION_PREFERENCE_DEFAULT_SILENT = false;

/**
 * ডিফল্ট ডুপ্লিকেট অনুমোদন
 * @default true
 */
export const NOTIFICATION_PREFERENCE_DEFAULT_DUPLICATE_ALLOWED = true;

/**
 * প্রেফারেন্স ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const NOTIFICATION_PREFERENCE_CACHE_TTL = 5 * 60 * 1000;

/**
 * প্রেফারেন্স ক্যাশ ম্যাক্স সাইজ
 * @default 1000
 */
export const NOTIFICATION_PREFERENCE_CACHE_MAX_SIZE = 1000;

// ============================================
// ২. চ্যানেল প্রেফারেন্স
// ============================================

/**
 * চ্যানেল প্রেফারেন্স টাইপ
 */
export type NotificationChannelPreference =
  | typeof NOTIFICATION_PREFERENCE_CHANNEL_ALLOWED
  | typeof NOTIFICATION_PREFERENCE_CHANNEL_BLOCKED
  | typeof NOTIFICATION_PREFERENCE_CHANNEL_DEFAULT
  | typeof NOTIFICATION_PREFERENCE_CHANNEL_OPTIONAL
  | typeof NOTIFICATION_PREFERENCE_CHANNEL_REQUIRED;

/**
 * অনুমোদিত চ্যানেল
 */
export const NOTIFICATION_PREFERENCE_CHANNEL_ALLOWED = 'ALLOWED';

/**
 * ব্লকড চ্যানেল
 */
export const NOTIFICATION_PREFERENCE_CHANNEL_BLOCKED = 'BLOCKED';

/**
 * ডিফল্ট চ্যানেল
 */
export const NOTIFICATION_PREFERENCE_CHANNEL_DEFAULT = 'DEFAULT';

/**
 * অপশনাল চ্যানেল
 */
export const NOTIFICATION_PREFERENCE_CHANNEL_OPTIONAL = 'OPTIONAL';

/**
 * রিকোয়ার্ড চ্যানেল
 */
export const NOTIFICATION_PREFERENCE_CHANNEL_REQUIRED = 'REQUIRED';

// ============================================
// ৩. ফ্রিকোয়েন্সি প্রেফারেন্স
// ============================================

/**
 * ফ্রিকোয়েন্সি প্রেফারেন্স টাইপ
 */
export type NotificationFrequencyPreference =
  | typeof NOTIFICATION_PREFERENCE_FREQUENCY_INSTANT
  | typeof NOTIFICATION_PREFERENCE_FREQUENCY_HOURLY
  | typeof NOTIFICATION_PREFERENCE_FREQUENCY_DAILY
  | typeof NOTIFICATION_PREFERENCE_FREQUENCY_WEEKLY
  | typeof NOTIFICATION_PREFERENCE_FREQUENCY_MONTHLY
  | typeof NOTIFICATION_PREFERENCE_FREQUENCY_DIGEST;

/**
 * ইনস্ট্যান্ট ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_PREFERENCE_FREQUENCY_INSTANT = 'INSTANT';

/**
 * আওয়ারলি ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_PREFERENCE_FREQUENCY_HOURLY = 'HOURLY';

/**
 * ডেইলি ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_PREFERENCE_FREQUENCY_DAILY = 'DAILY';

/**
 * উইকলি ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_PREFERENCE_FREQUENCY_WEEKLY = 'WEEKLY';

/**
 * মান্থলি ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_PREFERENCE_FREQUENCY_MONTHLY = 'MONTHLY';

/**
 * ডাইজেস্ট ফ্রিকোয়েন্সি
 */
export const NOTIFICATION_PREFERENCE_FREQUENCY_DIGEST = 'DIGEST';

// ============================================
// ৪. প্রেফারেন্স কনফিগারেশন
// ============================================

/**
 * প্রেফারেন্স কনফিগারেশন ইন্টারফেস
 */
export interface NotificationPreferenceConfig {
  /** ডিফল্ট ভার্সন */
  defaultVersion: string;
  /** সর্বোচ্চ সাইজ */
  maxSize: number;
  /** সর্বোচ্চ চ্যানেল সংখ্যা */
  maxChannels: number;
  /** ডিফল্ট টাইমজোন */
  defaultTimezone: string;
  /** ডিফল্ট ভাষা */
  defaultLanguage: string;
  /** ডিফল্ট ফ্রিকোয়েন্সি */
  defaultFrequency: number;
  /** ন্যূনতম ফ্রিকোয়েন্সি */
  minFrequency: number;
  /** সর্বোচ্চ ফ্রিকোয়েন্সি */
  maxFrequency: number;
  /** ডিফল্ট সাইলেন্ট মোড */
  defaultSilent: boolean;
  /** ডিফল্ট ডুপ্লিকেট অনুমোদন */
  defaultDuplicateAllowed: boolean;
  /** ক্যাশ টিটিএল */
  cacheTtl: number;
  /** ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
}

/**
 * ডিফল্ট প্রেফারেন্স কনফিগারেশন
 */
export const NOTIFICATION_PREFERENCE_DEFAULT_CONFIG: NotificationPreferenceConfig = {
  defaultVersion: NOTIFICATION_PREFERENCE_DEFAULT_VERSION,
  maxSize: NOTIFICATION_PREFERENCE_MAX_SIZE,
  maxChannels: NOTIFICATION_PREFERENCE_MAX_CHANNELS,
  defaultTimezone: NOTIFICATION_PREFERENCE_DEFAULT_TIMEZONE,
  defaultLanguage: NOTIFICATION_PREFERENCE_DEFAULT_LANGUAGE,
  defaultFrequency: NOTIFICATION_PREFERENCE_DEFAULT_FREQUENCY,
  minFrequency: NOTIFICATION_PREFERENCE_MIN_FREQUENCY,
  maxFrequency: NOTIFICATION_PREFERENCE_MAX_FREQUENCY,
  defaultSilent: NOTIFICATION_PREFERENCE_DEFAULT_SILENT,
  defaultDuplicateAllowed: NOTIFICATION_PREFERENCE_DEFAULT_DUPLICATE_ALLOWED,
  cacheTtl: NOTIFICATION_PREFERENCE_CACHE_TTL,
  cacheMaxSize: NOTIFICATION_PREFERENCE_CACHE_MAX_SIZE,
};

// ============================================
// ৫. চ্যানেল প্রেফারেন্স লেবেল
// ============================================

/**
 * চ্যানেল প্রেফারেন্স লেবেল
 */
export const NOTIFICATION_PREFERENCE_CHANNEL_LABELS: Record<NotificationChannelPreference, string> =
  {
    [NOTIFICATION_PREFERENCE_CHANNEL_ALLOWED]: 'অনুমোদিত',
    [NOTIFICATION_PREFERENCE_CHANNEL_BLOCKED]: 'ব্লক',
    [NOTIFICATION_PREFERENCE_CHANNEL_DEFAULT]: 'ডিফল্ট',
    [NOTIFICATION_PREFERENCE_CHANNEL_OPTIONAL]: 'ঐচ্ছিক',
    [NOTIFICATION_PREFERENCE_CHANNEL_REQUIRED]: 'আবশ্যক',
  };

// ============================================
// ৬. ফ্রিকোয়েন্সি প্রেফারেন্স লেবেল
// ============================================

/**
 * ফ্রিকোয়েন্সি প্রেফারেন্স লেবেল
 */
export const NOTIFICATION_PREFERENCE_FREQUENCY_LABELS: Record<
  NotificationFrequencyPreference,
  string
> = {
  [NOTIFICATION_PREFERENCE_FREQUENCY_INSTANT]: 'তাৎক্ষণিক',
  [NOTIFICATION_PREFERENCE_FREQUENCY_HOURLY]: 'প্রতি ঘন্টায়',
  [NOTIFICATION_PREFERENCE_FREQUENCY_DAILY]: 'প্রতিদিন',
  [NOTIFICATION_PREFERENCE_FREQUENCY_WEEKLY]: 'প্রতি সপ্তাহে',
  [NOTIFICATION_PREFERENCE_FREQUENCY_MONTHLY]: 'প্রতি মাসে',
  [NOTIFICATION_PREFERENCE_FREQUENCY_DIGEST]: 'ডাইজেস্ট',
};

// ============================================
// ৭. চ্যানেল প্রেফারেন্স আইকন
// ============================================

/**
 * চ্যানেল প্রেফারেন্স আইকন
 */
export const NOTIFICATION_PREFERENCE_CHANNEL_ICONS: Record<NotificationChannelPreference, string> =
  {
    [NOTIFICATION_PREFERENCE_CHANNEL_ALLOWED]: 'check_circle',
    [NOTIFICATION_PREFERENCE_CHANNEL_BLOCKED]: 'block',
    [NOTIFICATION_PREFERENCE_CHANNEL_DEFAULT]: 'settings',
    [NOTIFICATION_PREFERENCE_CHANNEL_OPTIONAL]: 'indeterminate_check_box',
    [NOTIFICATION_PREFERENCE_CHANNEL_REQUIRED]: 'star',
  };

// ============================================
// ৮. ফ্রিকোয়েন্সি প্রেফারেন্স আইকন
// ============================================

/**
 * ফ্রিকোয়েন্সি প্রেফারেন্স আইকন
 */
export const NOTIFICATION_PREFERENCE_FREQUENCY_ICONS: Record<
  NotificationFrequencyPreference,
  string
> = {
  [NOTIFICATION_PREFERENCE_FREQUENCY_INSTANT]: 'bolt',
  [NOTIFICATION_PREFERENCE_FREQUENCY_HOURLY]: 'hourglass',
  [NOTIFICATION_PREFERENCE_FREQUENCY_DAILY]: 'today',
  [NOTIFICATION_PREFERENCE_FREQUENCY_WEEKLY]: 'date_range',
  [NOTIFICATION_PREFERENCE_FREQUENCY_MONTHLY]: 'calendar_month',
  [NOTIFICATION_PREFERENCE_FREQUENCY_DIGEST]: 'summarize',
};
