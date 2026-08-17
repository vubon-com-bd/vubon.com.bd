// ============================================
// নোটিফিকেশন টেমপ্লেট সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. টেমপ্লেট মৌলিক কনফিগারেশন
// ============================================

/**
 * ডিফল্ট টেমপ্লেট ভার্সন
 * @default '1.0.0'
 */
export const NOTIFICATION_TEMPLATE_DEFAULT_VERSION = '1.0.0';

/**
 * সর্বোচ্চ টেমপ্লেট সাইজ (বাইটে)
 * @default 1048576 (১MB)
 */
export const NOTIFICATION_TEMPLATE_MAX_SIZE = 1024 * 1024;

/**
 * সর্বোচ্চ টেমপ্লেট নামের দৈর্ঘ্য
 * @default 100
 */
export const NOTIFICATION_TEMPLATE_MAX_NAME_LENGTH = 100;

/**
 * সর্বোচ্চ টেমপ্লেট বিবরণের দৈর্ঘ্য
 * @default 500
 */
export const NOTIFICATION_TEMPLATE_MAX_DESCRIPTION_LENGTH = 500;

/**
 * সর্বোচ্চ টেমপ্লেট ক্যাটাগরি নামের দৈর্ঘ্য
 * @default 50
 */
export const NOTIFICATION_TEMPLATE_MAX_CATEGORY_LENGTH = 50;

/**
 * ডিফল্ট টেমপ্লেট লোকেল
 * @default 'en'
 */
export const NOTIFICATION_TEMPLATE_DEFAULT_LOCALE = 'en';

/**
 * টেমপ্লেট ক্যাশিং সক্রিয় কিনা
 * @default true
 */
export const NOTIFICATION_TEMPLATE_CACHING_ENABLED = true;

/**
 * টেমপ্লেট ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 3600000 (১ ঘন্টা)
 */
export const NOTIFICATION_TEMPLATE_CACHE_TTL = 60 * 60 * 1000;

/**
 * টেমপ্লেট ক্যাশ ম্যাক্স সাইজ
 * @default 100
 */
export const NOTIFICATION_TEMPLATE_CACHE_MAX_SIZE = 100;

/**
 * টেমপ্লেট ভার্সনিং সক্রিয় কিনা
 * @default true
 */
export const NOTIFICATION_TEMPLATE_VERSIONING_ENABLED = true;

/**
 * সর্বোচ্চ টেমপ্লেট ভার্সন সংখ্যা
 * @default 10
 */
export const NOTIFICATION_TEMPLATE_MAX_VERSIONS = 10;

/**
 * ডিফল্ট টেমপ্লেট ইঞ্জিন
 * @default 'HANDLEBARS'
 */
export const NOTIFICATION_TEMPLATE_DEFAULT_ENGINE = 'HANDLEBARS';

// ============================================
// ২. টেমপ্লেট ফরম্যাট
// ============================================

/**
 * টেমপ্লেট ফরম্যাট টাইপ
 */
export type NotificationTemplateFormat =
  | typeof NOTIFICATION_TEMPLATE_FORMAT_HTML
  | typeof NOTIFICATION_TEMPLATE_FORMAT_TEXT
  | typeof NOTIFICATION_TEMPLATE_FORMAT_JSON
  | typeof NOTIFICATION_TEMPLATE_FORMAT_XML
  | typeof NOTIFICATION_TEMPLATE_FORMAT_MARKDOWN
  | typeof NOTIFICATION_TEMPLATE_FORMAT_HANDLEBARS
  | typeof NOTIFICATION_TEMPLATE_FORMAT_MUSTACHE
  | typeof NOTIFICATION_TEMPLATE_FORMAT_EJS;

/**
 * HTML ফরম্যাট
 */
export const NOTIFICATION_TEMPLATE_FORMAT_HTML = 'HTML';

/**
 * TEXT ফরম্যাট
 */
export const NOTIFICATION_TEMPLATE_FORMAT_TEXT = 'TEXT';

/**
 * JSON ফরম্যাট
 */
export const NOTIFICATION_TEMPLATE_FORMAT_JSON = 'JSON';

/**
 * XML ফরম্যাট
 */
export const NOTIFICATION_TEMPLATE_FORMAT_XML = 'XML';

/**
 * MARKDOWN ফরম্যাট
 */
export const NOTIFICATION_TEMPLATE_FORMAT_MARKDOWN = 'MARKDOWN';

/**
 * HANDLEBARS ফরম্যাট
 */
export const NOTIFICATION_TEMPLATE_FORMAT_HANDLEBARS = 'HANDLEBARS';

/**
 * MUSTACHE ফরম্যাট
 */
export const NOTIFICATION_TEMPLATE_FORMAT_MUSTACHE = 'MUSTACHE';

/**
 * EJS ফরম্যাট
 */
export const NOTIFICATION_TEMPLATE_FORMAT_EJS = 'EJS';

// ============================================
// ৩. টেমপ্লেট ক্যাটাগরি
// ============================================

/**
 * টেমপ্লেট ক্যাটাগরি টাইপ
 */
export type NotificationTemplateCategory =
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_WELCOME
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_VERIFICATION
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_RESET_PASSWORD
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_NOTIFICATION
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_MARKETING
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_TRANSACTIONAL
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_REMINDER
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_NEWSLETTER
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_INVOICE
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_REPORT
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_SURVEY
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_FEEDBACK
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_ALERT
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_SYSTEM
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_USER;

/**
 * ওয়েলকাম ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_WELCOME = 'WELCOME';

/**
 * ভেরিফিকেশন ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_VERIFICATION = 'VERIFICATION';

/**
 * রিসেট পাসওয়ার্ড ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_RESET_PASSWORD = 'RESET_PASSWORD';

/**
 * নোটিফিকেশন ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_NOTIFICATION = 'NOTIFICATION';

/**
 * মার্কেটিং ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_MARKETING = 'MARKETING';

/**
 * ট্রানজেকশনাল ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_TRANSACTIONAL = 'TRANSACTIONAL';

/**
 * রিমাইন্ডার ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_REMINDER = 'REMINDER';

/**
 * নিউজলেটার ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_NEWSLETTER = 'NEWSLETTER';

/**
 * ইনভয়েস ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_INVOICE = 'INVOICE';

/**
 * রিপোর্ট ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_REPORT = 'REPORT';

/**
 * সার্ভে ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_SURVEY = 'SURVEY';

/**
 * ফিডব্যাক ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_FEEDBACK = 'FEEDBACK';

/**
 * এলার্ট ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_ALERT = 'ALERT';

/**
 * সিস্টেম ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_SYSTEM = 'SYSTEM';

/**
 * ইউজার ক্যাটাগরি
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_USER = 'USER';

// ============================================
// ৪. টেমপ্লেট কনফিগারেশন
// ============================================

/**
 * টেমপ্লেট কনফিগারেশন ইন্টারফেস
 */
export interface NotificationTemplateConfig {
  /** ডিফল্ট ভার্সন */
  defaultVersion: string;
  /** সর্বোচ্চ সাইজ */
  maxSize: number;
  /** সর্বোচ্চ নামের দৈর্ঘ্য */
  maxNameLength: number;
  /** সর্বোচ্চ বিবরণের দৈর্ঘ্য */
  maxDescriptionLength: number;
  /** সর্বোচ্চ ক্যাটাগরি নামের দৈর্ঘ্য */
  maxCategoryLength: number;
  /** ডিফল্ট লোকেল */
  defaultLocale: string;
  /** ক্যাশিং সক্রিয় কিনা */
  cachingEnabled: boolean;
  /** ক্যাশ টিটিএল */
  cacheTtl: number;
  /** ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
  /** ভার্সনিং সক্রিয় কিনা */
  versioningEnabled: boolean;
  /** সর্বোচ্চ ভার্সন সংখ্যা */
  maxVersions: number;
  /** ডিফল্ট ইঞ্জিন */
  defaultEngine: string;
}

/**
 * ডিফল্ট টেমপ্লেট কনফিগারেশন
 */
export const NOTIFICATION_TEMPLATE_DEFAULT_CONFIG: NotificationTemplateConfig = {
  defaultVersion: NOTIFICATION_TEMPLATE_DEFAULT_VERSION,
  maxSize: NOTIFICATION_TEMPLATE_MAX_SIZE,
  maxNameLength: NOTIFICATION_TEMPLATE_MAX_NAME_LENGTH,
  maxDescriptionLength: NOTIFICATION_TEMPLATE_MAX_DESCRIPTION_LENGTH,
  maxCategoryLength: NOTIFICATION_TEMPLATE_MAX_CATEGORY_LENGTH,
  defaultLocale: NOTIFICATION_TEMPLATE_DEFAULT_LOCALE,
  cachingEnabled: NOTIFICATION_TEMPLATE_CACHING_ENABLED,
  cacheTtl: NOTIFICATION_TEMPLATE_CACHE_TTL,
  cacheMaxSize: NOTIFICATION_TEMPLATE_CACHE_MAX_SIZE,
  versioningEnabled: NOTIFICATION_TEMPLATE_VERSIONING_ENABLED,
  maxVersions: NOTIFICATION_TEMPLATE_MAX_VERSIONS,
  defaultEngine: NOTIFICATION_TEMPLATE_DEFAULT_ENGINE,
};

// ============================================
// ৫. টেমপ্লেট ফরম্যাট লেবেল
// ============================================

/**
 * টেমপ্লেট ফরম্যাট লেবেল
 */
export const NOTIFICATION_TEMPLATE_FORMAT_LABELS: Record<NotificationTemplateFormat, string> = {
  [NOTIFICATION_TEMPLATE_FORMAT_HTML]: 'HTML',
  [NOTIFICATION_TEMPLATE_FORMAT_TEXT]: 'টেক্সট',
  [NOTIFICATION_TEMPLATE_FORMAT_JSON]: 'JSON',
  [NOTIFICATION_TEMPLATE_FORMAT_XML]: 'XML',
  [NOTIFICATION_TEMPLATE_FORMAT_MARKDOWN]: 'Markdown',
  [NOTIFICATION_TEMPLATE_FORMAT_HANDLEBARS]: 'Handlebars',
  [NOTIFICATION_TEMPLATE_FORMAT_MUSTACHE]: 'Mustache',
  [NOTIFICATION_TEMPLATE_FORMAT_EJS]: 'EJS',
};

// ============================================
// ৬. টেমপ্লেট ক্যাটাগরি লেবেল
// ============================================

/**
 * টেমপ্লেট ক্যাটাগরি লেবেল
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_LABELS: Record<NotificationTemplateCategory, string> = {
  [NOTIFICATION_TEMPLATE_CATEGORY_WELCOME]: 'স্বাগতম',
  [NOTIFICATION_TEMPLATE_CATEGORY_VERIFICATION]: 'যাচাইকরণ',
  [NOTIFICATION_TEMPLATE_CATEGORY_RESET_PASSWORD]: 'পাসওয়ার্ড রিসেট',
  [NOTIFICATION_TEMPLATE_CATEGORY_NOTIFICATION]: 'বিজ্ঞপ্তি',
  [NOTIFICATION_TEMPLATE_CATEGORY_MARKETING]: 'মার্কেটিং',
  [NOTIFICATION_TEMPLATE_CATEGORY_TRANSACTIONAL]: 'লেনদেন',
  [NOTIFICATION_TEMPLATE_CATEGORY_REMINDER]: 'মনে করিয়ে দিন',
  [NOTIFICATION_TEMPLATE_CATEGORY_NEWSLETTER]: 'নিউজলেটার',
  [NOTIFICATION_TEMPLATE_CATEGORY_INVOICE]: 'ইনভয়েস',
  [NOTIFICATION_TEMPLATE_CATEGORY_REPORT]: 'রিপোর্ট',
  [NOTIFICATION_TEMPLATE_CATEGORY_SURVEY]: 'জরিপ',
  [NOTIFICATION_TEMPLATE_CATEGORY_FEEDBACK]: 'মতামত',
  [NOTIFICATION_TEMPLATE_CATEGORY_ALERT]: 'সতর্কতা',
  [NOTIFICATION_TEMPLATE_CATEGORY_SYSTEM]: 'সিস্টেম',
  [NOTIFICATION_TEMPLATE_CATEGORY_USER]: 'ব্যবহারকারী',
};

// ============================================
// ৭. টেমপ্লেট ক্যাটাগরি গ্রুপ
// ============================================

/**
 * টেমপ্লেট ক্যাটাগরি গ্রুপ
 */
export type NotificationTemplateCategoryGroup =
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_GROUP_SYSTEM
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_GROUP_USER
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_GROUP_BUSINESS
  | typeof NOTIFICATION_TEMPLATE_CATEGORY_GROUP_COMMUNICATION;

/**
 * সিস্টেম গ্রুপ
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_GROUP_SYSTEM = 'SYSTEM';

/**
 * ইউজার গ্রুপ
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_GROUP_USER = 'USER';

/**
 * বিজনেস গ্রুপ
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_GROUP_BUSINESS = 'BUSINESS';

/**
 * কমিউনিকেশন গ্রুপ
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_GROUP_COMMUNICATION = 'COMMUNICATION';

// ============================================
// ৮. টেমপ্লেট ক্যাটাগরি থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * টেমপ্লেট ক্যাটাগরি থেকে গ্রুপ ম্যাপিং
 */
export const NOTIFICATION_TEMPLATE_CATEGORY_TO_GROUP: Record<
  NotificationTemplateCategory,
  NotificationTemplateCategoryGroup
> = {
  [NOTIFICATION_TEMPLATE_CATEGORY_WELCOME]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_USER,
  [NOTIFICATION_TEMPLATE_CATEGORY_VERIFICATION]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_SYSTEM,
  [NOTIFICATION_TEMPLATE_CATEGORY_RESET_PASSWORD]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_USER,
  [NOTIFICATION_TEMPLATE_CATEGORY_NOTIFICATION]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_COMMUNICATION,
  [NOTIFICATION_TEMPLATE_CATEGORY_MARKETING]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_BUSINESS,
  [NOTIFICATION_TEMPLATE_CATEGORY_TRANSACTIONAL]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_BUSINESS,
  [NOTIFICATION_TEMPLATE_CATEGORY_REMINDER]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_USER,
  [NOTIFICATION_TEMPLATE_CATEGORY_NEWSLETTER]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_BUSINESS,
  [NOTIFICATION_TEMPLATE_CATEGORY_INVOICE]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_BUSINESS,
  [NOTIFICATION_TEMPLATE_CATEGORY_REPORT]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_BUSINESS,
  [NOTIFICATION_TEMPLATE_CATEGORY_SURVEY]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_BUSINESS,
  [NOTIFICATION_TEMPLATE_CATEGORY_FEEDBACK]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_COMMUNICATION,
  [NOTIFICATION_TEMPLATE_CATEGORY_ALERT]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_SYSTEM,
  [NOTIFICATION_TEMPLATE_CATEGORY_SYSTEM]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_SYSTEM,
  [NOTIFICATION_TEMPLATE_CATEGORY_USER]: NOTIFICATION_TEMPLATE_CATEGORY_GROUP_USER,
};
