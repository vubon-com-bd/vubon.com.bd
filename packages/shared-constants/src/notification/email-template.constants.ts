// ============================================
// ইমেইল টেমপ্লেট সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. টেমপ্লেট মৌলিক কনফিগারেশন
// ============================================

/**
 * ডিফল্ট টেমপ্লেট ইঞ্জিন
 * @default 'HANDLEBARS'
 */
export const EMAIL_TEMPLATE_DEFAULT_ENGINE = 'HANDLEBARS';

/**
 * সর্বোচ্চ টেমপ্লেট সাইজ (বাইটে)
 * @default 1048576 (১MB)
 */
export const EMAIL_TEMPLATE_MAX_SIZE = 1024 * 1024;

/**
 * সর্বোচ্চ টেমপ্লেট নামের দৈর্ঘ্য
 * @default 100
 */
export const EMAIL_TEMPLATE_MAX_NAME_LENGTH = 100;

/**
 * সর্বোচ্চ টেমপ্লেট বিবরণের দৈর্ঘ্য
 * @default 500
 */
export const EMAIL_TEMPLATE_MAX_DESCRIPTION_LENGTH = 500;

/**
 * টেমপ্লেট ক্যাশিং সময় (মিলিসেকেন্ডে)
 * @default 3600000 (১ ঘন্টা)
 */
export const EMAIL_TEMPLATE_CACHE_TTL = 60 * 60 * 1000;

/**
 * টেমপ্লেট ক্যাশ ম্যাক্স সাইজ
 * @default 100
 */
export const EMAIL_TEMPLATE_CACHE_MAX_SIZE = 100;

/**
 * টেমপ্লেট ভার্সনিং সক্রিয় কিনা
 * @default true
 */
export const EMAIL_TEMPLATE_VERSIONING_ENABLED = true;

/**
 * সর্বোচ্চ টেমপ্লেট ভার্সন সংখ্যা
 * @default 10
 */
export const EMAIL_TEMPLATE_MAX_VERSIONS = 10;

/**
 * ডিফল্ট টেমপ্লেট ভাষা
 * @default 'en'
 */
export const EMAIL_TEMPLATE_DEFAULT_LANGUAGE = 'en';

// ============================================
// ২. টেমপ্লেট ইঞ্জিন
// ============================================

/**
 * টেমপ্লেট ইঞ্জিন টাইপ
 */
export type EmailTemplateEngine =
  | typeof EMAIL_TEMPLATE_ENGINE_HANDLEBARS
  | typeof EMAIL_TEMPLATE_ENGINE_MUSTACHE
  | typeof EMAIL_TEMPLATE_ENGINE_EJS
  | typeof EMAIL_TEMPLATE_ENGINE_PUG
  | typeof EMAIL_TEMPLATE_ENGINE_NUNJUCKS
  | typeof EMAIL_TEMPLATE_ENGINE_LIQUID
  | typeof EMAIL_TEMPLATE_ENGINE_DJANGO
  | typeof EMAIL_TEMPLATE_ENGINE_JINJA
  | typeof EMAIL_TEMPLATE_ENGINE_TWIG
  | typeof EMAIL_TEMPLATE_ENGINE_VUE
  | typeof EMAIL_TEMPLATE_ENGINE_REACT
  | typeof EMAIL_TEMPLATE_ENGINE_ANGULAR;

/**
 * Handlebars ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_HANDLEBARS = 'HANDLEBARS';

/**
 * Mustache ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_MUSTACHE = 'MUSTACHE';

/**
 * EJS ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_EJS = 'EJS';

/**
 * Pug ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_PUG = 'PUG';

/**
 * Nunjucks ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_NUNJUCKS = 'NUNJUCKS';

/**
 * Liquid ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_LIQUID = 'LIQUID';

/**
 * Django ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_DJANGO = 'DJANGO';

/**
 * Jinja ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_JINJA = 'JINJA';

/**
 * Twig ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_TWIG = 'TWIG';

/**
 * Vue ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_VUE = 'VUE';

/**
 * React ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_REACT = 'REACT';

/**
 * Angular ইঞ্জিন
 */
export const EMAIL_TEMPLATE_ENGINE_ANGULAR = 'ANGULAR';

// ============================================
// ৩. টেমপ্লেট ক্যাটাগরি
// ============================================

/**
 * টেমপ্লেট ক্যাটাগরি
 */
export type EmailTemplateCategory =
  | typeof EMAIL_TEMPLATE_CATEGORY_WELCOME
  | typeof EMAIL_TEMPLATE_CATEGORY_VERIFICATION
  | typeof EMAIL_TEMPLATE_CATEGORY_RESET_PASSWORD
  | typeof EMAIL_TEMPLATE_CATEGORY_NOTIFICATION
  | typeof EMAIL_TEMPLATE_CATEGORY_MARKETING
  | typeof EMAIL_TEMPLATE_CATEGORY_TRANSACTIONAL
  | typeof EMAIL_TEMPLATE_CATEGORY_REMINDER
  | typeof EMAIL_TEMPLATE_CATEGORY_NEWSLETTER
  | typeof EMAIL_TEMPLATE_CATEGORY_INVOICE
  | typeof EMAIL_TEMPLATE_CATEGORY_REPORT
  | typeof EMAIL_TEMPLATE_CATEGORY_SURVEY
  | typeof EMAIL_TEMPLATE_CATEGORY_FEEDBACK;

/**
 * ওয়েলকাম ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_WELCOME = 'WELCOME';

/**
 * ভেরিফিকেশন ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_VERIFICATION = 'VERIFICATION';

/**
 * রিসেট পাসওয়ার্ড ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_RESET_PASSWORD = 'RESET_PASSWORD';

/**
 * নোটিফিকেশন ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_NOTIFICATION = 'NOTIFICATION';

/**
 * মার্কেটিং ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_MARKETING = 'MARKETING';

/**
 * ট্রানজেকশনাল ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_TRANSACTIONAL = 'TRANSACTIONAL';

/**
 * রিমাইন্ডার ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_REMINDER = 'REMINDER';

/**
 * নিউজলেটার ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_NEWSLETTER = 'NEWSLETTER';

/**
 * ইনভয়েস ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_INVOICE = 'INVOICE';

/**
 * রিপোর্ট ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_REPORT = 'REPORT';

/**
 * সার্ভে ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_SURVEY = 'SURVEY';

/**
 * ফিডব্যাক ক্যাটাগরি
 */
export const EMAIL_TEMPLATE_CATEGORY_FEEDBACK = 'FEEDBACK';

// ============================================
// ৪. ভেরিয়েবল ফরম্যাট
// ============================================

/**
 * ভেরিয়েবল ফরম্যাট টাইপ
 */
export type EmailTemplateVariableFormat =
  | typeof EMAIL_TEMPLATE_VARIABLE_FORMAT_DOUBLE_CURLY
  | typeof EMAIL_TEMPLATE_VARIABLE_FORMAT_SINGLE_CURLY
  | typeof EMAIL_TEMPLATE_VARIABLE_FORMAT_PERCENT
  | typeof EMAIL_TEMPLATE_VARIABLE_FORMAT_AT
  | typeof EMAIL_TEMPLATE_VARIABLE_FORMAT_HASH
  | typeof EMAIL_TEMPLATE_VARIABLE_FORMAT_COLON
  | typeof EMAIL_TEMPLATE_VARIABLE_FORMAT_DOLLAR;

/**
 * ডাবল কার্লি ব্রেস ফরম্যাট: {{variable}}
 */
export const EMAIL_TEMPLATE_VARIABLE_FORMAT_DOUBLE_CURLY = 'DOUBLE_CURLY';

/**
 * সিঙ্গেল কার্লি ব্রেস ফরম্যাট: {variable}
 */
export const EMAIL_TEMPLATE_VARIABLE_FORMAT_SINGLE_CURLY = 'SINGLE_CURLY';

/**
 * পার্সেন্ট ফরম্যাট: %variable%
 */
export const EMAIL_TEMPLATE_VARIABLE_FORMAT_PERCENT = 'PERCENT';

/**
 * অ্যাট ফরম্যাট: @variable@
 */
export const EMAIL_TEMPLATE_VARIABLE_FORMAT_AT = 'AT';

/**
 * হ্যাশ ফরম্যাট: #variable#
 */
export const EMAIL_TEMPLATE_VARIABLE_FORMAT_HASH = 'HASH';

/**
 * কলন ফরম্যাট: :variable:
 */
export const EMAIL_TEMPLATE_VARIABLE_FORMAT_COLON = 'COLON';

/**
 * ডলার ফরম্যাট: $variable$
 */
export const EMAIL_TEMPLATE_VARIABLE_FORMAT_DOLLAR = 'DOLLAR';

// ============================================
// ৫. টেমপ্লেট স্ট্যাটাস
// ============================================

/**
 * টেমপ্লেট স্ট্যাটাস
 */
export type EmailTemplateStatus =
  | typeof EMAIL_TEMPLATE_STATUS_ACTIVE
  | typeof EMAIL_TEMPLATE_STATUS_INACTIVE
  | typeof EMAIL_TEMPLATE_STATUS_DRAFT
  | typeof EMAIL_TEMPLATE_STATUS_ARCHIVED
  | typeof EMAIL_TEMPLATE_STATUS_DELETED
  | typeof EMAIL_TEMPLATE_STATUS_PENDING_APPROVAL
  | typeof EMAIL_TEMPLATE_STATUS_APPROVED
  | typeof EMAIL_TEMPLATE_STATUS_REJECTED;

/**
 * অ্যাক্টিভ স্ট্যাটাস
 */
export const EMAIL_TEMPLATE_STATUS_ACTIVE = 'ACTIVE';

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাস
 */
export const EMAIL_TEMPLATE_STATUS_INACTIVE = 'INACTIVE';

/**
 * ড্রাফট স্ট্যাটাস
 */
export const EMAIL_TEMPLATE_STATUS_DRAFT = 'DRAFT';

/**
 * আর্কাইভড স্ট্যাটাস
 */
export const EMAIL_TEMPLATE_STATUS_ARCHIVED = 'ARCHIVED';

/**
 * ডিলিটেড স্ট্যাটাস
 */
export const EMAIL_TEMPLATE_STATUS_DELETED = 'DELETED';

/**
 * পেন্ডিং অ্যাপ্রুভাল স্ট্যাটাস
 */
export const EMAIL_TEMPLATE_STATUS_PENDING_APPROVAL = 'PENDING_APPROVAL';

/**
 * অ্যাপ্রুভড স্ট্যাটাস
 */
export const EMAIL_TEMPLATE_STATUS_APPROVED = 'APPROVED';

/**
 * রিজেক্টেড স্ট্যাটাস
 */
export const EMAIL_TEMPLATE_STATUS_REJECTED = 'REJECTED';

// ============================================
// ৬. টেমপ্লেট কনফিগারেশন
// ============================================

/**
 * টেমপ্লেট কনফিগারেশন ইন্টারফেস
 */
export interface EmailTemplateConfig {
  /** ডিফল্ট টেমপ্লেট ইঞ্জিন */
  defaultEngine: EmailTemplateEngine;
  /** সর্বোচ্চ টেমপ্লেট সাইজ */
  maxSize: number;
  /** সর্বোচ্চ টেমপ্লেট নামের দৈর্ঘ্য */
  maxNameLength: number;
  /** সর্বোচ্চ টেমপ্লেট বিবরণের দৈর্ঘ্য */
  maxDescriptionLength: number;
  /** টেমপ্লেট ক্যাশিং সময় */
  cacheTtl: number;
  /** টেমপ্লেট ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
  /** টেমপ্লেট ভার্সনিং সক্রিয় কিনা */
  versioningEnabled: boolean;
  /** সর্বোচ্চ টেমপ্লেট ভার্সন সংখ্যা */
  maxVersions: number;
  /** ডিফল্ট টেমপ্লেট ভাষা */
  defaultLanguage: string;
  /** ডিফল্ট ভেরিয়েবল ফরম্যাট */
  defaultVariableFormat: EmailTemplateVariableFormat;
}

/**
 * ডিফল্ট টেমপ্লেট কনফিগারেশন
 */
export const EMAIL_TEMPLATE_DEFAULT_CONFIG: EmailTemplateConfig = {
  defaultEngine: EMAIL_TEMPLATE_DEFAULT_ENGINE,
  maxSize: EMAIL_TEMPLATE_MAX_SIZE,
  maxNameLength: EMAIL_TEMPLATE_MAX_NAME_LENGTH,
  maxDescriptionLength: EMAIL_TEMPLATE_MAX_DESCRIPTION_LENGTH,
  cacheTtl: EMAIL_TEMPLATE_CACHE_TTL,
  cacheMaxSize: EMAIL_TEMPLATE_CACHE_MAX_SIZE,
  versioningEnabled: EMAIL_TEMPLATE_VERSIONING_ENABLED,
  maxVersions: EMAIL_TEMPLATE_MAX_VERSIONS,
  defaultLanguage: EMAIL_TEMPLATE_DEFAULT_LANGUAGE,
  defaultVariableFormat: EMAIL_TEMPLATE_VARIABLE_FORMAT_DOUBLE_CURLY,
};

// ============================================
// ৭. টেমপ্লেট ক্যাটাগরি লেবেল
// ============================================

/**
 * টেমপ্লেট ক্যাটাগরি লেবেল
 */
export const EMAIL_TEMPLATE_CATEGORY_LABELS: Record<EmailTemplateCategory, string> = {
  [EMAIL_TEMPLATE_CATEGORY_WELCOME]: 'স্বাগতম',
  [EMAIL_TEMPLATE_CATEGORY_VERIFICATION]: 'যাচাইকরণ',
  [EMAIL_TEMPLATE_CATEGORY_RESET_PASSWORD]: 'পাসওয়ার্ড রিসেট',
  [EMAIL_TEMPLATE_CATEGORY_NOTIFICATION]: 'বিজ্ঞপ্তি',
  [EMAIL_TEMPLATE_CATEGORY_MARKETING]: 'মার্কেটিং',
  [EMAIL_TEMPLATE_CATEGORY_TRANSACTIONAL]: 'লেনদেন',
  [EMAIL_TEMPLATE_CATEGORY_REMINDER]: 'মনে করিয়ে দিন',
  [EMAIL_TEMPLATE_CATEGORY_NEWSLETTER]: 'নিউজলেটার',
  [EMAIL_TEMPLATE_CATEGORY_INVOICE]: 'ইনভয়েস',
  [EMAIL_TEMPLATE_CATEGORY_REPORT]: 'রিপোর্ট',
  [EMAIL_TEMPLATE_CATEGORY_SURVEY]: 'জরিপ',
  [EMAIL_TEMPLATE_CATEGORY_FEEDBACK]: 'মতামত',
};

// ============================================
// ৮. টেমপ্লেট ইঞ্জিন লেবেল
// ============================================

/**
 * টেমপ্লেট ইঞ্জিন লেবেল
 */
export const EMAIL_TEMPLATE_ENGINE_LABELS: Record<EmailTemplateEngine, string> = {
  [EMAIL_TEMPLATE_ENGINE_HANDLEBARS]: 'Handlebars',
  [EMAIL_TEMPLATE_ENGINE_MUSTACHE]: 'Mustache',
  [EMAIL_TEMPLATE_ENGINE_EJS]: 'EJS',
  [EMAIL_TEMPLATE_ENGINE_PUG]: 'Pug',
  [EMAIL_TEMPLATE_ENGINE_NUNJUCKS]: 'Nunjucks',
  [EMAIL_TEMPLATE_ENGINE_LIQUID]: 'Liquid',
  [EMAIL_TEMPLATE_ENGINE_DJANGO]: 'Django',
  [EMAIL_TEMPLATE_ENGINE_JINJA]: 'Jinja',
  [EMAIL_TEMPLATE_ENGINE_TWIG]: 'Twig',
  [EMAIL_TEMPLATE_ENGINE_VUE]: 'Vue',
  [EMAIL_TEMPLATE_ENGINE_REACT]: 'React',
  [EMAIL_TEMPLATE_ENGINE_ANGULAR]: 'Angular',
};

// ============================================
// ৯. টেমপ্লেট স্ট্যাটাস লেবেল
// ============================================

/**
 * টেমপ্লেট স্ট্যাটাস লেবেল
 */
export const EMAIL_TEMPLATE_STATUS_LABELS: Record<EmailTemplateStatus, string> = {
  [EMAIL_TEMPLATE_STATUS_ACTIVE]: 'সক্রিয়',
  [EMAIL_TEMPLATE_STATUS_INACTIVE]: 'নিষ্ক্রিয়',
  [EMAIL_TEMPLATE_STATUS_DRAFT]: 'খসড়া',
  [EMAIL_TEMPLATE_STATUS_ARCHIVED]: 'আর্কাইভ',
  [EMAIL_TEMPLATE_STATUS_DELETED]: 'মুছে ফেলা',
  [EMAIL_TEMPLATE_STATUS_PENDING_APPROVAL]: 'অনুমোদনের অপেক্ষায়',
  [EMAIL_TEMPLATE_STATUS_APPROVED]: 'অনুমোদিত',
  [EMAIL_TEMPLATE_STATUS_REJECTED]: 'বাতিল',
};
