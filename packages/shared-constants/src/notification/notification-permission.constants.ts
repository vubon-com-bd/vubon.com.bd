// ============================================
// নোটিফিকেশন পারমিশন সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. পারমিশন টাইপ
// ============================================

/**
 * পারমিশন টাইপ
 * বিভিন্ন কর্ম সম্পাদনের অনুমতি
 */
export type NotificationPermissionType =
  | typeof NOTIFICATION_PERMISSION_CREATE
  | typeof NOTIFICATION_PERMISSION_READ
  | typeof NOTIFICATION_PERMISSION_UPDATE
  | typeof NOTIFICATION_PERMISSION_DELETE
  | typeof NOTIFICATION_PERMISSION_MANAGE
  | typeof NOTIFICATION_PERMISSION_ADMIN
  | typeof NOTIFICATION_PERMISSION_VIEW_ANALYTICS
  | typeof NOTIFICATION_PERMISSION_SEND_BROADCAST
  | typeof NOTIFICATION_PERMISSION_MANAGE_TEMPLATES
  | typeof NOTIFICATION_PERMISSION_MANAGE_RULES
  | typeof NOTIFICATION_PERMISSION_MANAGE_DEVICES
  | typeof NOTIFICATION_PERMISSION_MANAGE_PREFERENCES
  | typeof NOTIFICATION_PERMISSION_EXPORT_REPORTS
  | typeof NOTIFICATION_PERMISSION_CONFIGURE_WEBHOOKS
  | typeof NOTIFICATION_PERMISSION_MANAGE_SCHEDULES
  | typeof NOTIFICATION_PERMISSION_MANAGE_DIGESTS
  | typeof NOTIFICATION_PERMISSION_VIEW_LOGS
  | typeof NOTIFICATION_PERMISSION_MANAGE_USERS
  | typeof NOTIFICATION_PERMISSION_VIEW_REPORTS;

/**
 * ক্রিয়েট পারমিশন
 * @description নতুন রিসোর্স তৈরি করার অনুমতি
 */
export const NOTIFICATION_PERMISSION_CREATE = 'CREATE';

/**
 * রিড পারমিশন
 * @description রিসোর্স দেখার অনুমতি
 */
export const NOTIFICATION_PERMISSION_READ = 'READ';

/**
 * আপডেট পারমিশন
 * @description রিসোর্স আপডেট করার অনুমতি
 */
export const NOTIFICATION_PERMISSION_UPDATE = 'UPDATE';

/**
 * ডিলিট পারমিশন
 * @description রিসোর্স মুছে ফেলার অনুমতি
 */
export const NOTIFICATION_PERMISSION_DELETE = 'DELETE';

/**
 * ম্যানেজ পারমিশন
 * @description রিসোর্স পরিচালনার অনুমতি
 */
export const NOTIFICATION_PERMISSION_MANAGE = 'MANAGE';

/**
 * অ্যাডমিন পারমিশন
 * @description সমস্ত কিছু করার অনুমতি
 */
export const NOTIFICATION_PERMISSION_ADMIN = 'ADMIN';

/**
 * ভিউ অ্যানালিটিক্স পারমিশন
 * @description অ্যানালিটিক্স দেখার অনুমতি
 */
export const NOTIFICATION_PERMISSION_VIEW_ANALYTICS = 'VIEW_ANALYTICS';

/**
 * সেন্ড ব্রডকাস্ট পারমিশন
 * @description ব্রডকাস্ট পাঠানোর অনুমতি
 */
export const NOTIFICATION_PERMISSION_SEND_BROADCAST = 'SEND_BROADCAST';

/**
 * ম্যানেজ টেমপ্লেট পারমিশন
 * @description টেমপ্লেট পরিচালনার অনুমতি
 */
export const NOTIFICATION_PERMISSION_MANAGE_TEMPLATES = 'MANAGE_TEMPLATES';

/**
 * ম্যানেজ রুল পারমিশন
 * @description রুল পরিচালনার অনুমতি
 */
export const NOTIFICATION_PERMISSION_MANAGE_RULES = 'MANAGE_RULES';

/**
 * ম্যানেজ ডিভাইস পারমিশন
 * @description ডিভাইস পরিচালনার অনুমতি
 */
export const NOTIFICATION_PERMISSION_MANAGE_DEVICES = 'MANAGE_DEVICES';

/**
 * ম্যানেজ প্রেফারেন্স পারমিশন
 * @description প্রেফারেন্স পরিচালনার অনুমতি
 */
export const NOTIFICATION_PERMISSION_MANAGE_PREFERENCES = 'MANAGE_PREFERENCES';

/**
 * এক্সপোর্ট রিপোর্ট পারমিশন
 * @description রিপোর্ট এক্সপোর্ট করার অনুমতি
 */
export const NOTIFICATION_PERMISSION_EXPORT_REPORTS = 'EXPORT_REPORTS';

/**
 * কনফিগার ওয়েবহুক পারমিশন
 * @description ওয়েবহুক কনফিগার করার অনুমতি
 */
export const NOTIFICATION_PERMISSION_CONFIGURE_WEBHOOKS = 'CONFIGURE_WEBHOOKS';

/**
 * ম্যানেজ শিডিউল পারমিশন
 * @description শিডিউল পরিচালনার অনুমতি
 */
export const NOTIFICATION_PERMISSION_MANAGE_SCHEDULES = 'MANAGE_SCHEDULES';

/**
 * ম্যানেজ ডাইজেস্ট পারমিশন
 * @description ডাইজেস্ট পরিচালনার অনুমতি
 */
export const NOTIFICATION_PERMISSION_MANAGE_DIGESTS = 'MANAGE_DIGESTS';

/**
 * ভিউ লগ পারমিশন
 * @description লগ দেখার অনুমতি
 */
export const NOTIFICATION_PERMISSION_VIEW_LOGS = 'VIEW_LOGS';

/**
 * ম্যানেজ ইউজার পারমিশন
 * @description ইউজার পরিচালনার অনুমতি
 */
export const NOTIFICATION_PERMISSION_MANAGE_USERS = 'MANAGE_USERS';

/**
 * ভিউ রিপোর্ট পারমিশন
 * @description রিপোর্ট দেখার অনুমতি
 */
export const NOTIFICATION_PERMISSION_VIEW_REPORTS = 'VIEW_REPORTS';

// ============================================
// ২. পারমিশন লেভেল
// ============================================

/**
 * পারমিশন লেভেল
 * ব্যবহারকারীর অনুমতির স্তর
 */
export type NotificationPermissionLevel =
  | typeof NOTIFICATION_PERMISSION_LEVEL_OWNER
  | typeof NOTIFICATION_PERMISSION_LEVEL_ADMIN
  | typeof NOTIFICATION_PERMISSION_LEVEL_MANAGER
  | typeof NOTIFICATION_PERMISSION_LEVEL_USER
  | typeof NOTIFICATION_PERMISSION_LEVEL_VIEWER
  | typeof NOTIFICATION_PERMISSION_LEVEL_GUEST;

/**
 * ওনার লেভেল
 * @description সম্পূর্ণ নিয়ন্ত্রণ
 */
export const NOTIFICATION_PERMISSION_LEVEL_OWNER = 'OWNER';

/**
 * অ্যাডমিন লেভেল
 * @description প্রশাসনিক নিয়ন্ত্রণ
 */
export const NOTIFICATION_PERMISSION_LEVEL_ADMIN = 'ADMIN';

/**
 * ম্যানেজার লেভেল
 * @description পরিচালনাধীন নিয়ন্ত্রণ
 */
export const NOTIFICATION_PERMISSION_LEVEL_MANAGER = 'MANAGER';

/**
 * ইউজার লেভেল
 * @description সাধারণ ব্যবহারকারী
 */
export const NOTIFICATION_PERMISSION_LEVEL_USER = 'USER';

/**
 * ভিউয়ার লেভেল
 * @description শুধুমাত্র দেখার অনুমতি
 */
export const NOTIFICATION_PERMISSION_LEVEL_VIEWER = 'VIEWER';

/**
 * গেস্ট লেভেল
 * @description সীমিত অনুমতি
 */
export const NOTIFICATION_PERMISSION_LEVEL_GUEST = 'GUEST';

// ============================================
// ৩. রিসোর্স টাইপ
// ============================================

/**
 * রিসোর্স টাইপ
 * বিভিন্ন নোটিফিকেশন রিসোর্সের ধরন
 */
export type NotificationResourceType =
  | typeof NOTIFICATION_RESOURCE_TYPE_NOTIFICATION
  | typeof NOTIFICATION_RESOURCE_TYPE_EMAIL
  | typeof NOTIFICATION_RESOURCE_TYPE_SMS
  | typeof NOTIFICATION_RESOURCE_TYPE_PUSH
  | typeof NOTIFICATION_RESOURCE_TYPE_IN_APP
  | typeof NOTIFICATION_RESOURCE_TYPE_WEBHOOK
  | typeof NOTIFICATION_RESOURCE_TYPE_TEMPLATE
  | typeof NOTIFICATION_RESOURCE_TYPE_SCHEDULE
  | typeof NOTIFICATION_RESOURCE_TYPE_BROADCAST
  | typeof NOTIFICATION_RESOURCE_TYPE_DIGEST
  | typeof NOTIFICATION_RESOURCE_TYPE_RULE
  | typeof NOTIFICATION_RESOURCE_TYPE_PREFERENCE
  | typeof NOTIFICATION_RESOURCE_TYPE_DEVICE
  | typeof NOTIFICATION_RESOURCE_TYPE_ANALYTICS
  | typeof NOTIFICATION_RESOURCE_TYPE_REPORT
  | typeof NOTIFICATION_RESOURCE_TYPE_USER
  | typeof NOTIFICATION_RESOURCE_TYPE_CHANNEL
  | typeof NOTIFICATION_RESOURCE_TYPE_LOG;

/**
 * নোটিফিকেশন রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_NOTIFICATION = 'NOTIFICATION';

/**
 * ইমেইল রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_EMAIL = 'EMAIL';

/**
 * এসএমএস রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_SMS = 'SMS';

/**
 * পুশ রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_PUSH = 'PUSH';

/**
 * ইন-অ্যাপ রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_IN_APP = 'IN_APP';

/**
 * ওয়েবহুক রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_WEBHOOK = 'WEBHOOK';

/**
 * টেমপ্লেট রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_TEMPLATE = 'TEMPLATE';

/**
 * শিডিউল রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_SCHEDULE = 'SCHEDULE';

/**
 * ব্রডকাস্ট রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_BROADCAST = 'BROADCAST';

/**
 * ডাইজেস্ট রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_DIGEST = 'DIGEST';

/**
 * রুল রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_RULE = 'RULE';

/**
 * প্রেফারেন্স রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_PREFERENCE = 'PREFERENCE';

/**
 * ডিভাইস রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_DEVICE = 'DEVICE';

/**
 * অ্যানালিটিক্স রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_ANALYTICS = 'ANALYTICS';

/**
 * রিপোর্ট রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_REPORT = 'REPORT';

/**
 * ইউজার রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_USER = 'USER';

/**
 * চ্যানেল রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_CHANNEL = 'CHANNEL';

/**
 * লগ রিসোর্স
 */
export const NOTIFICATION_RESOURCE_TYPE_LOG = 'LOG';

// ============================================
// ৪. পারমিশন লেভেল স্কোর
// ============================================

/**
 * পারমিশন লেভেল স্কোর (১-১০)
 */
export const NOTIFICATION_PERMISSION_LEVEL_SCORES: Record<NotificationPermissionLevel, number> = {
  [NOTIFICATION_PERMISSION_LEVEL_OWNER]: 10,
  [NOTIFICATION_PERMISSION_LEVEL_ADMIN]: 8,
  [NOTIFICATION_PERMISSION_LEVEL_MANAGER]: 6,
  [NOTIFICATION_PERMISSION_LEVEL_USER]: 4,
  [NOTIFICATION_PERMISSION_LEVEL_VIEWER]: 2,
  [NOTIFICATION_PERMISSION_LEVEL_GUEST]: 1,
};

// ============================================
// ৫. রিসোর্স টাইপ ক্যাটাগরি
// ============================================

/**
 * রিসোর্স টাইপ ক্যাটাগরি
 */
export type NotificationResourceCategory =
  | typeof NOTIFICATION_RESOURCE_CATEGORY_CHANNEL
  | typeof NOTIFICATION_RESOURCE_CATEGORY_CONTENT
  | typeof NOTIFICATION_RESOURCE_CATEGORY_CONFIG
  | typeof NOTIFICATION_RESOURCE_CATEGORY_DATA
  | typeof NOTIFICATION_RESOURCE_CATEGORY_USER;

/**
 * চ্যানেল ক্যাটাগরি
 */
export const NOTIFICATION_RESOURCE_CATEGORY_CHANNEL = 'CHANNEL';

/**
 * কনটেন্ট ক্যাটাগরি
 */
export const NOTIFICATION_RESOURCE_CATEGORY_CONTENT = 'CONTENT';

/**
 * কনফিগ ক্যাটাগরি
 */
export const NOTIFICATION_RESOURCE_CATEGORY_CONFIG = 'CONFIG';

/**
 * ডেটা ক্যাটাগরি
 */
export const NOTIFICATION_RESOURCE_CATEGORY_DATA = 'DATA';

/**
 * ইউজার ক্যাটাগরি
 */
export const NOTIFICATION_RESOURCE_CATEGORY_USER = 'USER';

// ============================================
// ৬. রিসোর্স টাইপ থেকে ক্যাটাগরি ম্যাপিং
// ============================================

/**
 * রিসোর্স টাইপ থেকে ক্যাটাগরি ম্যাপিং
 */
export const NOTIFICATION_RESOURCE_TYPE_TO_CATEGORY: Record<
  NotificationResourceType,
  NotificationResourceCategory
> = {
  [NOTIFICATION_RESOURCE_TYPE_NOTIFICATION]: NOTIFICATION_RESOURCE_CATEGORY_DATA,
  [NOTIFICATION_RESOURCE_TYPE_EMAIL]: NOTIFICATION_RESOURCE_CATEGORY_CHANNEL,
  [NOTIFICATION_RESOURCE_TYPE_SMS]: NOTIFICATION_RESOURCE_CATEGORY_CHANNEL,
  [NOTIFICATION_RESOURCE_TYPE_PUSH]: NOTIFICATION_RESOURCE_CATEGORY_CHANNEL,
  [NOTIFICATION_RESOURCE_TYPE_IN_APP]: NOTIFICATION_RESOURCE_CATEGORY_CHANNEL,
  [NOTIFICATION_RESOURCE_TYPE_WEBHOOK]: NOTIFICATION_RESOURCE_CATEGORY_CHANNEL,
  [NOTIFICATION_RESOURCE_TYPE_TEMPLATE]: NOTIFICATION_RESOURCE_CATEGORY_CONTENT,
  [NOTIFICATION_RESOURCE_TYPE_SCHEDULE]: NOTIFICATION_RESOURCE_CATEGORY_CONFIG,
  [NOTIFICATION_RESOURCE_TYPE_BROADCAST]: NOTIFICATION_RESOURCE_CATEGORY_DATA,
  [NOTIFICATION_RESOURCE_TYPE_DIGEST]: NOTIFICATION_RESOURCE_CATEGORY_CONTENT,
  [NOTIFICATION_RESOURCE_TYPE_RULE]: NOTIFICATION_RESOURCE_CATEGORY_CONFIG,
  [NOTIFICATION_RESOURCE_TYPE_PREFERENCE]: NOTIFICATION_RESOURCE_CATEGORY_USER,
  [NOTIFICATION_RESOURCE_TYPE_DEVICE]: NOTIFICATION_RESOURCE_CATEGORY_USER,
  [NOTIFICATION_RESOURCE_TYPE_ANALYTICS]: NOTIFICATION_RESOURCE_CATEGORY_DATA,
  [NOTIFICATION_RESOURCE_TYPE_REPORT]: NOTIFICATION_RESOURCE_CATEGORY_DATA,
  [NOTIFICATION_RESOURCE_TYPE_USER]: NOTIFICATION_RESOURCE_CATEGORY_USER,
  [NOTIFICATION_RESOURCE_TYPE_CHANNEL]: NOTIFICATION_RESOURCE_CATEGORY_CHANNEL,
  [NOTIFICATION_RESOURCE_TYPE_LOG]: NOTIFICATION_RESOURCE_CATEGORY_DATA,
};

// ============================================
// ৭. ডিফল্ট পারমিশন সেট
// ============================================

/**
 * ডিফল্ট পারমিশন সেট
 */
export const NOTIFICATION_DEFAULT_PERMISSIONS: Record<
  NotificationPermissionLevel,
  NotificationPermissionType[]
> = {
  [NOTIFICATION_PERMISSION_LEVEL_OWNER]: [
    NOTIFICATION_PERMISSION_CREATE,
    NOTIFICATION_PERMISSION_READ,
    NOTIFICATION_PERMISSION_UPDATE,
    NOTIFICATION_PERMISSION_DELETE,
    NOTIFICATION_PERMISSION_MANAGE,
    NOTIFICATION_PERMISSION_ADMIN,
    NOTIFICATION_PERMISSION_VIEW_ANALYTICS,
    NOTIFICATION_PERMISSION_SEND_BROADCAST,
    NOTIFICATION_PERMISSION_MANAGE_TEMPLATES,
    NOTIFICATION_PERMISSION_MANAGE_RULES,
    NOTIFICATION_PERMISSION_MANAGE_DEVICES,
    NOTIFICATION_PERMISSION_MANAGE_PREFERENCES,
    NOTIFICATION_PERMISSION_EXPORT_REPORTS,
    NOTIFICATION_PERMISSION_CONFIGURE_WEBHOOKS,
    NOTIFICATION_PERMISSION_MANAGE_SCHEDULES,
    NOTIFICATION_PERMISSION_MANAGE_DIGESTS,
    NOTIFICATION_PERMISSION_VIEW_LOGS,
    NOTIFICATION_PERMISSION_MANAGE_USERS,
    NOTIFICATION_PERMISSION_VIEW_REPORTS,
  ],
  [NOTIFICATION_PERMISSION_LEVEL_ADMIN]: [
    NOTIFICATION_PERMISSION_CREATE,
    NOTIFICATION_PERMISSION_READ,
    NOTIFICATION_PERMISSION_UPDATE,
    NOTIFICATION_PERMISSION_DELETE,
    NOTIFICATION_PERMISSION_MANAGE,
    NOTIFICATION_PERMISSION_VIEW_ANALYTICS,
    NOTIFICATION_PERMISSION_SEND_BROADCAST,
    NOTIFICATION_PERMISSION_MANAGE_TEMPLATES,
    NOTIFICATION_PERMISSION_MANAGE_RULES,
    NOTIFICATION_PERMISSION_MANAGE_DEVICES,
    NOTIFICATION_PERMISSION_MANAGE_PREFERENCES,
    NOTIFICATION_PERMISSION_EXPORT_REPORTS,
    NOTIFICATION_PERMISSION_CONFIGURE_WEBHOOKS,
    NOTIFICATION_PERMISSION_MANAGE_SCHEDULES,
    NOTIFICATION_PERMISSION_MANAGE_DIGESTS,
    NOTIFICATION_PERMISSION_VIEW_LOGS,
    NOTIFICATION_PERMISSION_VIEW_REPORTS,
  ],
  [NOTIFICATION_PERMISSION_LEVEL_MANAGER]: [
    NOTIFICATION_PERMISSION_CREATE,
    NOTIFICATION_PERMISSION_READ,
    NOTIFICATION_PERMISSION_UPDATE,
    NOTIFICATION_PERMISSION_VIEW_ANALYTICS,
    NOTIFICATION_PERMISSION_SEND_BROADCAST,
    NOTIFICATION_PERMISSION_MANAGE_TEMPLATES,
    NOTIFICATION_PERMISSION_MANAGE_PREFERENCES,
    NOTIFICATION_PERMISSION_EXPORT_REPORTS,
    NOTIFICATION_PERMISSION_VIEW_REPORTS,
  ],
  [NOTIFICATION_PERMISSION_LEVEL_USER]: [
    NOTIFICATION_PERMISSION_READ,
    NOTIFICATION_PERMISSION_CREATE,
    NOTIFICATION_PERMISSION_UPDATE,
    NOTIFICATION_PERMISSION_MANAGE_PREFERENCES,
  ],
  [NOTIFICATION_PERMISSION_LEVEL_VIEWER]: [
    NOTIFICATION_PERMISSION_READ,
    NOTIFICATION_PERMISSION_VIEW_ANALYTICS,
    NOTIFICATION_PERMISSION_VIEW_REPORTS,
  ],
  [NOTIFICATION_PERMISSION_LEVEL_GUEST]: [NOTIFICATION_PERMISSION_READ],
};

// ============================================
// ৮. পারমিশন টাইপ লেবেল
// ============================================

/**
 * পারমিশন টাইপ লেবেল
 */
export const NOTIFICATION_PERMISSION_TYPE_LABELS: Record<NotificationPermissionType, string> = {
  [NOTIFICATION_PERMISSION_CREATE]: 'তৈরি করুন',
  [NOTIFICATION_PERMISSION_READ]: 'দেখুন',
  [NOTIFICATION_PERMISSION_UPDATE]: 'আপডেট করুন',
  [NOTIFICATION_PERMISSION_DELETE]: 'মুছে ফেলুন',
  [NOTIFICATION_PERMISSION_MANAGE]: 'পরিচালনা করুন',
  [NOTIFICATION_PERMISSION_ADMIN]: 'প্রশাসন',
  [NOTIFICATION_PERMISSION_VIEW_ANALYTICS]: 'অ্যানালিটিক্স দেখুন',
  [NOTIFICATION_PERMISSION_SEND_BROADCAST]: 'ব্রডকাস্ট পাঠান',
  [NOTIFICATION_PERMISSION_MANAGE_TEMPLATES]: 'টেমপ্লেট পরিচালনা',
  [NOTIFICATION_PERMISSION_MANAGE_RULES]: 'রুল পরিচালনা',
  [NOTIFICATION_PERMISSION_MANAGE_DEVICES]: 'ডিভাইস পরিচালনা',
  [NOTIFICATION_PERMISSION_MANAGE_PREFERENCES]: 'প্রেফারেন্স পরিচালনা',
  [NOTIFICATION_PERMISSION_EXPORT_REPORTS]: 'রিপোর্ট এক্সপোর্ট',
  [NOTIFICATION_PERMISSION_CONFIGURE_WEBHOOKS]: 'ওয়েবহুক কনফিগার',
  [NOTIFICATION_PERMISSION_MANAGE_SCHEDULES]: 'শিডিউল পরিচালনা',
  [NOTIFICATION_PERMISSION_MANAGE_DIGESTS]: 'ডাইজেস্ট পরিচালনা',
  [NOTIFICATION_PERMISSION_VIEW_LOGS]: 'লগ দেখুন',
  [NOTIFICATION_PERMISSION_MANAGE_USERS]: 'ইউজার পরিচালনা',
  [NOTIFICATION_PERMISSION_VIEW_REPORTS]: 'রিপোর্ট দেখুন',
};

// ============================================
// ৯. পারমিশন লেভেল লেবেল
// ============================================

/**
 * পারমিশন লেভেল লেবেল
 */
export const NOTIFICATION_PERMISSION_LEVEL_LABELS: Record<NotificationPermissionLevel, string> = {
  [NOTIFICATION_PERMISSION_LEVEL_OWNER]: 'মালিক',
  [NOTIFICATION_PERMISSION_LEVEL_ADMIN]: 'প্রশাসক',
  [NOTIFICATION_PERMISSION_LEVEL_MANAGER]: 'ম্যানেজার',
  [NOTIFICATION_PERMISSION_LEVEL_USER]: 'ব্যবহারকারী',
  [NOTIFICATION_PERMISSION_LEVEL_VIEWER]: 'দর্শক',
  [NOTIFICATION_PERMISSION_LEVEL_GUEST]: 'অতিথি',
};

// ============================================
// ১০. রিসোর্স টাইপ লেবেল
// ============================================

/**
 * রিসোর্স টাইপ লেবেল
 */
export const NOTIFICATION_RESOURCE_TYPE_LABELS: Record<NotificationResourceType, string> = {
  [NOTIFICATION_RESOURCE_TYPE_NOTIFICATION]: 'নোটিফিকেশন',
  [NOTIFICATION_RESOURCE_TYPE_EMAIL]: 'ইমেইল',
  [NOTIFICATION_RESOURCE_TYPE_SMS]: 'এসএমএস',
  [NOTIFICATION_RESOURCE_TYPE_PUSH]: 'পুশ',
  [NOTIFICATION_RESOURCE_TYPE_IN_APP]: 'ইন-অ্যাপ',
  [NOTIFICATION_RESOURCE_TYPE_WEBHOOK]: 'ওয়েবহুক',
  [NOTIFICATION_RESOURCE_TYPE_TEMPLATE]: 'টেমপ্লেট',
  [NOTIFICATION_RESOURCE_TYPE_SCHEDULE]: 'শিডিউল',
  [NOTIFICATION_RESOURCE_TYPE_BROADCAST]: 'ব্রডকাস্ট',
  [NOTIFICATION_RESOURCE_TYPE_DIGEST]: 'ডাইজেস্ট',
  [NOTIFICATION_RESOURCE_TYPE_RULE]: 'রুল',
  [NOTIFICATION_RESOURCE_TYPE_PREFERENCE]: 'প্রেফারেন্স',
  [NOTIFICATION_RESOURCE_TYPE_DEVICE]: 'ডিভাইস',
  [NOTIFICATION_RESOURCE_TYPE_ANALYTICS]: 'অ্যানালিটিক্স',
  [NOTIFICATION_RESOURCE_TYPE_REPORT]: 'রিপোর্ট',
  [NOTIFICATION_RESOURCE_TYPE_USER]: 'ইউজার',
  [NOTIFICATION_RESOURCE_TYPE_CHANNEL]: 'চ্যানেল',
  [NOTIFICATION_RESOURCE_TYPE_LOG]: 'লগ',
};

// ============================================
// ১১. পারমিশন কনফিগারেশন
// ============================================

/**
 * পারমিশন কনফিগারেশন ইন্টারফেস
 */
export interface NotificationPermissionConfig {
  /** ডিফল্ট পারমিশন লেভেল */
  defaultLevel: NotificationPermissionLevel;
  /** সর্বোচ্চ পারমিশন লেভেল */
  maxLevel: NotificationPermissionLevel;
  /** সর্বনিম্ন পারমিশন লেভেল */
  minLevel: NotificationPermissionLevel;
  /** পারমিশন ক্যাশ টিটিএল */
  cacheTtl: number;
  /** পারমিশন ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
}

/**
 * ডিফল্ট পারমিশন কনফিগারেশন
 */
export const NOTIFICATION_PERMISSION_DEFAULT_CONFIG: NotificationPermissionConfig = {
  defaultLevel: NOTIFICATION_PERMISSION_LEVEL_USER,
  maxLevel: NOTIFICATION_PERMISSION_LEVEL_OWNER,
  minLevel: NOTIFICATION_PERMISSION_LEVEL_GUEST,
  cacheTtl: 300000, // 5 minutes
  cacheMaxSize: 1000,
};
