// ============================================
// নোটিফিকেশন কমন সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ডিফল্ট কনফিগারেশন কনস্ট্যান্ট
// ============================================

/**
 * সর্বোচ্চ রিট্রাই Attempts
 * @default 3
 */
export const COMMON_MAX_RETRY_ATTEMPTS = 3;

/**
 * ব্যাচ সাইজ
 * @default 100
 */
export const COMMON_BATCH_SIZE = 100;

/**
 * টাইমআউট (মিলিসেকেন্ডে)
 * @default 30000 (৩০ সেকেন্ড)
 */
export const COMMON_TIMEOUT_MS = 30000;

/**
 * রেট লিমিট (প্রতি সেকেন্ডে)
 * @default 10
 */
export const COMMON_RATE_LIMIT_PER_SECOND = 10;

/**
 * সর্বোচ্চ পেলোড সাইজ (কিলোবাইটে)
 * @default 1024
 */
export const COMMON_MAX_PAYLOAD_SIZE_KB = 1024;

/**
 * ডিফল্ট লোকেল
 * @default 'en'
 */
export const COMMON_DEFAULT_LOCALE = 'en';

/**
 * ডিফল্ট টাইমজোন
 * @default 'UTC'
 */
export const COMMON_DEFAULT_TIMEZONE = 'UTC';

// ============================================
// ২. সাপোর্টেড ভাষা কনস্ট্যান্ট
// ============================================

/**
 * সাপোর্টেড ভাষা টাইপ
 */
export type CommonSupportedLanguage =
  | typeof COMMON_LANGUAGE_EN
  | typeof COMMON_LANGUAGE_BN
  | typeof COMMON_LANGUAGE_HI
  | typeof COMMON_LANGUAGE_AR
  | typeof COMMON_LANGUAGE_ES
  | typeof COMMON_LANGUAGE_FR
  | typeof COMMON_LANGUAGE_DE
  | typeof COMMON_LANGUAGE_ZH;

/**
 * ইংরেজি
 */
export const COMMON_LANGUAGE_EN = 'en';

/**
 * বাংলা
 */
export const COMMON_LANGUAGE_BN = 'bn';

/**
 * হিন্দি
 */
export const COMMON_LANGUAGE_HI = 'hi';

/**
 * আরবি
 */
export const COMMON_LANGUAGE_AR = 'ar';

/**
 * স্প্যানিশ
 */
export const COMMON_LANGUAGE_ES = 'es';

/**
 * ফ্রেঞ্চ
 */
export const COMMON_LANGUAGE_FR = 'fr';

/**
 * জার্মান
 */
export const COMMON_LANGUAGE_DE = 'de';

/**
 * চাইনিজ
 */
export const COMMON_LANGUAGE_ZH = 'zh';

// ============================================
// ৩. নোটিফিকেশন সোর্স কনস্ট্যান্ট
// ============================================

/**
 * নোটিফিকেশন সোর্স টাইপ
 */
export type CommonNotificationSource =
  | typeof COMMON_SOURCE_SYSTEM
  | typeof COMMON_SOURCE_USER
  | typeof COMMON_SOURCE_ADMIN
  | typeof COMMON_SOURCE_AUTOMATION
  | typeof COMMON_SOURCE_THIRD_PARTY
  | typeof COMMON_SOURCE_SCHEDULER
  | typeof COMMON_SOURCE_API;

/**
 * সিস্টেম সোর্স
 * @description সিস্টেম নিজে থেকে তৈরি করেছে
 */
export const COMMON_SOURCE_SYSTEM = 'SYSTEM';

/**
 * ইউজার সোর্স
 * @description কোনো ইউজারের অ্যাকশনের ফলে তৈরি
 */
export const COMMON_SOURCE_USER = 'USER';

/**
 * অ্যাডমিন সোর্স
 * @description অ্যাডমিন ম্যানুয়ালি তৈরি করেছে
 */
export const COMMON_SOURCE_ADMIN = 'ADMIN';

/**
 * অটোমেশন সোর্স
 * @description অটোমেটেড স্ক্রিপ্ট বা ব্যাচ জব থেকে তৈরি
 */
export const COMMON_SOURCE_AUTOMATION = 'AUTOMATION';

/**
 * থার্ড-পার্টি সোর্স
 * @description থার্ড-পার্টি ইন্টিগ্রেশন থেকে আসা
 */
export const COMMON_SOURCE_THIRD_PARTY = 'THIRD_PARTY';

/**
 * শিডিউলার সোর্স
 * @description শিডিউলার বা টাইমার থেকে তৈরি
 */
export const COMMON_SOURCE_SCHEDULER = 'SCHEDULER';

/**
 * API সোর্স
 * @description বাহ্যিক API রিকোয়েস্ট থেকে তৈরি
 */
export const COMMON_SOURCE_API = 'API';

// ============================================
// ৪. ফরম্যাট টাইপ কনস্ট্যান্ট
// ============================================

/**
 * ফরম্যাট টাইপ
 */
export type CommonFormatType =
  | typeof COMMON_FORMAT_JSON
  | typeof COMMON_FORMAT_XML
  | typeof COMMON_FORMAT_HTML
  | typeof COMMON_FORMAT_PLAIN_TEXT
  | typeof COMMON_FORMAT_MARKDOWN
  | typeof COMMON_FORMAT_TEMPLATE;

/**
 * JSON ফরম্যাট
 */
export const COMMON_FORMAT_JSON = 'JSON';

/**
 * XML ফরম্যাট
 */
export const COMMON_FORMAT_XML = 'XML';

/**
 * HTML ফরম্যাট
 */
export const COMMON_FORMAT_HTML = 'HTML';

/**
 * প্লেইন টেক্সট ফরম্যাট
 */
export const COMMON_FORMAT_PLAIN_TEXT = 'PLAIN_TEXT';

/**
 * মার্কডাউন ফরম্যাট
 */
export const COMMON_FORMAT_MARKDOWN = 'MARKDOWN';

/**
 * টেমপ্লেট ফরম্যাট
 */
export const COMMON_FORMAT_TEMPLATE = 'TEMPLATE';

// ============================================
// ৫. রিট্রাই স্ট্র্যাটেজি কনস্ট্যান্ট
// ============================================

/**
 * রিট্রাই স্ট্র্যাটেজি টাইপ
 */
export type CommonRetryStrategy =
  | typeof COMMON_RETRY_STRATEGY_LINEAR
  | typeof COMMON_RETRY_STRATEGY_EXPONENTIAL
  | typeof COMMON_RETRY_STRATEGY_FIXED
  | typeof COMMON_RETRY_STRATEGY_CUSTOM;

/**
 * লিনিয়ার স্ট্র্যাটেজি
 * @description নির্দিষ্ট সময় পর পর
 */
export const COMMON_RETRY_STRATEGY_LINEAR = 'LINEAR';

/**
 * এক্সপোনেনশিয়াল স্ট্র্যাটেজি
 * @description সময় দ্বিগুণ করে
 */
export const COMMON_RETRY_STRATEGY_EXPONENTIAL = 'EXPONENTIAL';

/**
 * ফিক্সড স্ট্র্যাটেজি
 * @description নির্দিষ্ট সময় অন্তর
 */
export const COMMON_RETRY_STRATEGY_FIXED = 'FIXED';

/**
 * কাস্টম স্ট্র্যাটেজি
 * @description কাস্টম নিয়ম অনুযায়ী
 */
export const COMMON_RETRY_STRATEGY_CUSTOM = 'CUSTOM';

// ============================================
// ৬. ইভেন্ট টাইপ কনস্ট্যান্ট
// ============================================

/**
 * ইভেন্ট টাইপ
 */
export type CommonEventType =
  | typeof COMMON_EVENT_CREATED
  | typeof COMMON_EVENT_SENT
  | typeof COMMON_EVENT_DELIVERED
  | typeof COMMON_EVENT_OPENED
  | typeof COMMON_EVENT_CLICKED
  | typeof COMMON_EVENT_FAILED
  | typeof COMMON_EVENT_BOUNCED
  | typeof COMMON_EVENT_UNSUBSCRIBED
  | typeof COMMON_EVENT_COMPLAINED
  | typeof COMMON_EVENT_SUPPRESSED;

/**
 * ক্রিয়েটেড ইভেন্ট
 * @description নোটিফিকেশন তৈরি হয়েছে
 */
export const COMMON_EVENT_CREATED = 'CREATED';

/**
 * সেন্ট ইভেন্ট
 * @description নোটিফিকেশন পাঠানো হয়েছে
 */
export const COMMON_EVENT_SENT = 'SENT';

/**
 * ডেলিভারড ইভেন্ট
 * @description নোটিফিকেশন ডেলিভারি হয়েছে
 */
export const COMMON_EVENT_DELIVERED = 'DELIVERED';

/**
 * ওপেনড ইভেন্ট
 * @description নোটিফিকেশন খোলা হয়েছে
 */
export const COMMON_EVENT_OPENED = 'OPENED';

/**
 * ক্লিকড ইভেন্ট
 * @description নোটিফিকেশনের লিংকে ক্লিক করা হয়েছে
 */
export const COMMON_EVENT_CLICKED = 'CLICKED';

/**
 * ফেইলড ইভেন্ট
 * @description নোটিফিকেশন পাঠাতে ব্যর্থ হয়েছে
 */
export const COMMON_EVENT_FAILED = 'FAILED';

/**
 * বাউন্সড ইভেন্ট
 * @description নোটিফিকেশন বাউন্স হয়েছে
 */
export const COMMON_EVENT_BOUNCED = 'BOUNCED';

/**
 * আনসাবস্ক্রাইবড ইভেন্ট
 * @description ইউজার আনসাবস্ক্রাইব করেছে
 */
export const COMMON_EVENT_UNSUBSCRIBED = 'UNSUBSCRIBED';

/**
 * কমপ্লেইনড ইভেন্ট
 * @description ইউজার কমপ্লেইন্ট করেছে
 */
export const COMMON_EVENT_COMPLAINED = 'COMPLAINED';

/**
 * সাপ্রেসড ইভেন্ট
 * @description নোটিফিকেশন দমন করা হয়েছে
 */
export const COMMON_EVENT_SUPPRESSED = 'SUPPRESSED';

// ============================================
// ৭. ফিল্টার অপারেটর কনস্ট্যান্ট
// ============================================

/**
 * ফিল্টার অপারেটর টাইপ
 */
export type CommonFilterOperator =
  | typeof COMMON_FILTER_OPERATOR_EQUALS
  | typeof COMMON_FILTER_OPERATOR_NOT_EQUALS
  | typeof COMMON_FILTER_OPERATOR_GREATER_THAN
  | typeof COMMON_FILTER_OPERATOR_LESS_THAN
  | typeof COMMON_FILTER_OPERATOR_GREATER_THAN_OR_EQUALS
  | typeof COMMON_FILTER_OPERATOR_LESS_THAN_OR_EQUALS
  | typeof COMMON_FILTER_OPERATOR_CONTAINS
  | typeof COMMON_FILTER_OPERATOR_NOT_CONTAINS
  | typeof COMMON_FILTER_OPERATOR_STARTS_WITH
  | typeof COMMON_FILTER_OPERATOR_ENDS_WITH
  | typeof COMMON_FILTER_OPERATOR_IN
  | typeof COMMON_FILTER_OPERATOR_NOT_IN
  | typeof COMMON_FILTER_OPERATOR_BETWEEN
  | typeof COMMON_FILTER_OPERATOR_IS_NULL
  | typeof COMMON_FILTER_OPERATOR_IS_NOT_NULL;

/**
 * ইকুয়ালস অপারেটর
 */
export const COMMON_FILTER_OPERATOR_EQUALS = 'EQUALS';

/**
 * নট ইকুয়ালস অপারেটর
 */
export const COMMON_FILTER_OPERATOR_NOT_EQUALS = 'NOT_EQUALS';

/**
 * গ্রেটার দ্যান অপারেটর
 */
export const COMMON_FILTER_OPERATOR_GREATER_THAN = 'GREATER_THAN';

/**
 * লেস দ্যান অপারেটর
 */
export const COMMON_FILTER_OPERATOR_LESS_THAN = 'LESS_THAN';

/**
 * গ্রেটার দ্যান অর ইকুয়াল অপারেটর
 */
export const COMMON_FILTER_OPERATOR_GREATER_THAN_OR_EQUALS = 'GREATER_THAN_OR_EQUALS';

/**
 * লেস দ্যান অর ইকুয়াল অপারেটর
 */
export const COMMON_FILTER_OPERATOR_LESS_THAN_OR_EQUALS = 'LESS_THAN_OR_EQUALS';

/**
 * কনটেইনস অপারেটর
 */
export const COMMON_FILTER_OPERATOR_CONTAINS = 'CONTAINS';

/**
 * নট কনটেইনস অপারেটর
 */
export const COMMON_FILTER_OPERATOR_NOT_CONTAINS = 'NOT_CONTAINS';

/**
 * স্টার্টস উইথ অপারেটর
 */
export const COMMON_FILTER_OPERATOR_STARTS_WITH = 'STARTS_WITH';

/**
 * এন্ডস উইথ অপারেটর
 */
export const COMMON_FILTER_OPERATOR_ENDS_WITH = 'ENDS_WITH';

/**
 * ইন অপারেটর
 */
export const COMMON_FILTER_OPERATOR_IN = 'IN';

/**
 * নট ইন অপারেটর
 */
export const COMMON_FILTER_OPERATOR_NOT_IN = 'NOT_IN';

/**
 * বিটুইন অপারেটর
 */
export const COMMON_FILTER_OPERATOR_BETWEEN = 'BETWEEN';

/**
 * ইস নাল অপারেটর
 */
export const COMMON_FILTER_OPERATOR_IS_NULL = 'IS_NULL';

/**
 * ইস নট নাল অপারেটর
 */
export const COMMON_FILTER_OPERATOR_IS_NOT_NULL = 'IS_NOT_NULL';

// ============================================
// ৮. পেজিনেশন ডিফল্ট কনস্ট্যান্ট
// ============================================

/**
 * ডিফল্ট পেজ
 * @default 1
 */
export const COMMON_PAGINATION_DEFAULT_PAGE = 1;

/**
 * ডিফল্ট লিমিট
 * @default 20
 */
export const COMMON_PAGINATION_DEFAULT_LIMIT = 20;

/**
 * সর্বোচ্চ লিমিট
 * @default 100
 */
export const COMMON_PAGINATION_MAX_LIMIT = 100;

/**
 * ডিফল্ট সর্ট ফিল্ড
 * @default 'createdAt'
 */
export const COMMON_PAGINATION_DEFAULT_SORT = 'createdAt';

/**
 * ডিফল্ট অর্ডার
 * @default 'DESC'
 */
export const COMMON_PAGINATION_DEFAULT_ORDER = 'DESC';

/**
 * সর্ট অর্ডার টাইপ
 */
export type CommonSortOrder =
  typeof COMMON_PAGINATION_ORDER_ASC | typeof COMMON_PAGINATION_ORDER_DESC;

/**
 * ASC অর্ডার
 */
export const COMMON_PAGINATION_ORDER_ASC = 'ASC';

/**
 * DESC অর্ডার
 */
export const COMMON_PAGINATION_ORDER_DESC = 'DESC';

// ============================================
// ৯. সিকিউরিটি কনস্ট্যান্ট
// ============================================

/**
 * সর্বোচ্চ রিসিপিয়েন্ট পার নোটিফিকেশন
 * @default 1000
 */
export const COMMON_MAX_RECIPIENTS_PER_NOTIFICATION = 1000;

/**
 * সর্বোচ্চ অ্যাটাচমেন্ট পার নোটিফিকেশন
 * @default 10
 */
export const COMMON_MAX_ATTACHMENTS = 10;

/**
 * সর্বোচ্চ ট্যাগ পার নোটিফিকেশন
 * @default 20
 */
export const COMMON_MAX_TAGS_PER_NOTIFICATION = 20;

/**
 * সর্বোচ্চ মেটাডেটা সাইজ (কিলোবাইটে)
 * @default 50
 */
export const COMMON_MAX_METADATA_SIZE_KB = 50;

/**
 * অনুমোদিত অরিজিন
 * @default ['*']
 */
export const COMMON_ALLOWED_ORIGINS = ['*'];

// ============================================
// ১০. লগ লেভেল কনস্ট্যান্ট
// ============================================

/**
 * লগ লেভেল টাইপ
 */
export type CommonLogLevel =
  | typeof COMMON_LOG_LEVEL_DEBUG
  | typeof COMMON_LOG_LEVEL_INFO
  | typeof COMMON_LOG_LEVEL_WARN
  | typeof COMMON_LOG_LEVEL_ERROR
  | typeof COMMON_LOG_LEVEL_FATAL;

/**
 * ডিবাগ লগ লেভেল
 */
export const COMMON_LOG_LEVEL_DEBUG = 'DEBUG';

/**
 * ইনফো লগ লেভেল
 */
export const COMMON_LOG_LEVEL_INFO = 'INFO';

/**
 * ওয়ার্ন লগ লেভেল
 */
export const COMMON_LOG_LEVEL_WARN = 'WARN';

/**
 * এরর লগ লেভেল
 */
export const COMMON_LOG_LEVEL_ERROR = 'ERROR';

/**
 * ফ্যাটাল লগ লেভেল
 */
export const COMMON_LOG_LEVEL_FATAL = 'FATAL';

// ============================================
// ১১. লেবেল ম্যাপিং
// ============================================

/**
 * ভাষা লেবেল
 */
export const COMMON_LANGUAGE_LABELS: Record<CommonSupportedLanguage, string> = {
  [COMMON_LANGUAGE_EN]: 'English',
  [COMMON_LANGUAGE_BN]: 'বাংলা',
  [COMMON_LANGUAGE_HI]: 'हिन्दी',
  [COMMON_LANGUAGE_AR]: 'العربية',
  [COMMON_LANGUAGE_ES]: 'Español',
  [COMMON_LANGUAGE_FR]: 'Français',
  [COMMON_LANGUAGE_DE]: 'Deutsch',
  [COMMON_LANGUAGE_ZH]: '中文',
};

/**
 * সোর্স লেবেল
 */
export const COMMON_SOURCE_LABELS: Record<CommonNotificationSource, string> = {
  [COMMON_SOURCE_SYSTEM]: 'সিস্টেম',
  [COMMON_SOURCE_USER]: 'ব্যবহারকারী',
  [COMMON_SOURCE_ADMIN]: 'অ্যাডমিন',
  [COMMON_SOURCE_AUTOMATION]: 'অটোমেশন',
  [COMMON_SOURCE_THIRD_PARTY]: 'থার্ড-পার্টি',
  [COMMON_SOURCE_SCHEDULER]: 'শিডিউলার',
  [COMMON_SOURCE_API]: 'API',
};

/**
 * ফরম্যাট টাইপ লেবেল
 */
export const COMMON_FORMAT_LABELS: Record<CommonFormatType, string> = {
  [COMMON_FORMAT_JSON]: 'JSON',
  [COMMON_FORMAT_XML]: 'XML',
  [COMMON_FORMAT_HTML]: 'HTML',
  [COMMON_FORMAT_PLAIN_TEXT]: 'প্লেইন টেক্সট',
  [COMMON_FORMAT_MARKDOWN]: 'মার্কডাউন',
  [COMMON_FORMAT_TEMPLATE]: 'টেমপ্লেট',
};

/**
 * রিট্রাই স্ট্র্যাটেজি লেবেল
 */
export const COMMON_RETRY_STRATEGY_LABELS: Record<CommonRetryStrategy, string> = {
  [COMMON_RETRY_STRATEGY_LINEAR]: 'লিনিয়ার',
  [COMMON_RETRY_STRATEGY_EXPONENTIAL]: 'এক্সপোনেনশিয়াল',
  [COMMON_RETRY_STRATEGY_FIXED]: 'ফিক্সড',
  [COMMON_RETRY_STRATEGY_CUSTOM]: 'কাস্টম',
};

/**
 * ইভেন্ট টাইপ লেবেল
 */
export const COMMON_EVENT_LABELS: Record<CommonEventType, string> = {
  [COMMON_EVENT_CREATED]: 'তৈরি',
  [COMMON_EVENT_SENT]: 'পাঠানো',
  [COMMON_EVENT_DELIVERED]: 'পৌঁছেছে',
  [COMMON_EVENT_OPENED]: 'খোলা',
  [COMMON_EVENT_CLICKED]: 'ক্লিক',
  [COMMON_EVENT_FAILED]: 'ব্যর্থ',
  [COMMON_EVENT_BOUNCED]: 'বাউন্স',
  [COMMON_EVENT_UNSUBSCRIBED]: 'আনসাবস্ক্রাইব',
  [COMMON_EVENT_COMPLAINED]: 'অভিযোগ',
  [COMMON_EVENT_SUPPRESSED]: 'দমন',
};

/**
 * ফিল্টার অপারেটর লেবেল
 */
export const COMMON_FILTER_OPERATOR_LABELS: Record<CommonFilterOperator, string> = {
  [COMMON_FILTER_OPERATOR_EQUALS]: 'সমান',
  [COMMON_FILTER_OPERATOR_NOT_EQUALS]: 'সমান নয়',
  [COMMON_FILTER_OPERATOR_GREATER_THAN]: 'বড়',
  [COMMON_FILTER_OPERATOR_LESS_THAN]: 'ছোট',
  [COMMON_FILTER_OPERATOR_GREATER_THAN_OR_EQUALS]: 'বড় বা সমান',
  [COMMON_FILTER_OPERATOR_LESS_THAN_OR_EQUALS]: 'ছোট বা সমান',
  [COMMON_FILTER_OPERATOR_CONTAINS]: 'ধারণ করে',
  [COMMON_FILTER_OPERATOR_NOT_CONTAINS]: 'ধারণ করে না',
  [COMMON_FILTER_OPERATOR_STARTS_WITH]: 'দিয়ে শুরু হয়',
  [COMMON_FILTER_OPERATOR_ENDS_WITH]: 'দিয়ে শেষ হয়',
  [COMMON_FILTER_OPERATOR_IN]: 'এর মধ্যে',
  [COMMON_FILTER_OPERATOR_NOT_IN]: 'এর মধ্যে নয়',
  [COMMON_FILTER_OPERATOR_BETWEEN]: 'এর মধ্যে (রেঞ্জ)',
  [COMMON_FILTER_OPERATOR_IS_NULL]: 'নাল',
  [COMMON_FILTER_OPERATOR_IS_NOT_NULL]: 'নাল নয়',
};

/**
 * লগ লেভেল লেবেল
 */
export const COMMON_LOG_LEVEL_LABELS: Record<CommonLogLevel, string> = {
  [COMMON_LOG_LEVEL_DEBUG]: 'ডিবাগ',
  [COMMON_LOG_LEVEL_INFO]: 'তথ্য',
  [COMMON_LOG_LEVEL_WARN]: 'সতর্কতা',
  [COMMON_LOG_LEVEL_ERROR]: 'ত্রুটি',
  [COMMON_LOG_LEVEL_FATAL]: 'মারাত্মক',
};
