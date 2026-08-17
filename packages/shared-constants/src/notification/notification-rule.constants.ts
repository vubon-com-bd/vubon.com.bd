// ============================================
// নোটিফিকেশন রুল ইঞ্জিন সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. রুল মৌলিক কনফিগারেশন
// ============================================

/**
 * ম্যাক্স রুল পার সিস্টেম
 * @default 1000
 */
export const NOTIFICATION_RULE_MAX_PER_SYSTEM = 1000;

/**
 * ম্যাক্স রুল পার ইউজার
 * @default 100
 */
export const NOTIFICATION_RULE_MAX_PER_USER = 100;

/**
 * ম্যাক্স কন্ডিশন পার রুল
 * @default 10
 */
export const NOTIFICATION_RULE_MAX_CONDITIONS_PER_RULE = 10;

/**
 * ম্যাক্স অ্যাকশন পার রুল
 * @default 5
 */
export const NOTIFICATION_RULE_MAX_ACTIONS_PER_RULE = 5;

/**
 * ডিফল্ট রুল প্রায়োরিটি
 * @default 5
 */
export const NOTIFICATION_RULE_DEFAULT_PRIORITY = 5;

/**
 * সর্বোচ্চ রুল প্রায়োরিটি
 * @default 10
 */
export const NOTIFICATION_RULE_MAX_PRIORITY = 10;

/**
 * ন্যূনতম রুল প্রায়োরিটি
 * @default 1
 */
export const NOTIFICATION_RULE_MIN_PRIORITY = 1;

/**
 * ডিফল্ট রুল টাইমআউট (মিলিসেকেন্ডে)
 * @default 5000 (৫ সেকেন্ড)
 */
export const NOTIFICATION_RULE_DEFAULT_TIMEOUT = 5000;

/**
 * রুল ক্যাশ টিটিএল (মিলিসেকেন্ডে)
 * @default 300000 (৫ মিনিট)
 */
export const NOTIFICATION_RULE_CACHE_TTL = 5 * 60 * 1000;

/**
 * রুল ক্যাশ ম্যাক্স সাইজ
 * @default 1000
 */
export const NOTIFICATION_RULE_CACHE_MAX_SIZE = 1000;

// ============================================
// ২. রুল টাইপ
// ============================================

/**
 * রুল টাইপ
 */
export type NotificationRuleType =
  | typeof NOTIFICATION_RULE_TYPE_SYSTEM
  | typeof NOTIFICATION_RULE_TYPE_USER
  | typeof NOTIFICATION_RULE_TYPE_TENANT
  | typeof NOTIFICATION_RULE_TYPE_GLOBAL
  | typeof NOTIFICATION_RULE_TYPE_CUSTOM;

/**
 * সিস্টেম রুল
 * @description সিস্টেম-নির্ধারিত রুল
 */
export const NOTIFICATION_RULE_TYPE_SYSTEM = 'SYSTEM';

/**
 * ইউজার রুল
 * @description ইউজার-নির্ধারিত রুল
 */
export const NOTIFICATION_RULE_TYPE_USER = 'USER';

/**
 * টেন্যান্ট রুল
 * @description টেন্যান্ট-নির্ধারিত রুল
 */
export const NOTIFICATION_RULE_TYPE_TENANT = 'TENANT';

/**
 * গ্লোবাল রুল
 * @description সকলের জন্য প্রযোজ্য রুল
 */
export const NOTIFICATION_RULE_TYPE_GLOBAL = 'GLOBAL';

/**
 * কাস্টম রুল
 * @description কাস্টমাইজড রুল
 */
export const NOTIFICATION_RULE_TYPE_CUSTOM = 'CUSTOM';

// ============================================
// ৩. কন্ডিশন টাইপ
// ============================================

/**
 * কন্ডিশন টাইপ
 */
export type NotificationRuleConditionType =
  | typeof NOTIFICATION_RULE_CONDITION_TYPE_USER_ATTRIBUTE
  | typeof NOTIFICATION_RULE_CONDITION_TYPE_NOTIFICATION_ATTRIBUTE
  | typeof NOTIFICATION_RULE_CONDITION_TYPE_TIME_BASED
  | typeof NOTIFICATION_RULE_CONDITION_TYPE_FREQUENCY_BASED
  | typeof NOTIFICATION_RULE_CONDITION_TYPE_BEHAVIOR_BASED
  | typeof NOTIFICATION_RULE_CONDITION_TYPE_CONTEXT_BASED
  | typeof NOTIFICATION_RULE_CONDITION_TYPE_COMPOSITE;

/**
 * ইউজার অ্যাট্রিবিউট কন্ডিশন
 */
export const NOTIFICATION_RULE_CONDITION_TYPE_USER_ATTRIBUTE = 'USER_ATTRIBUTE';

/**
 * নোটিফিকেশন অ্যাট্রিবিউট কন্ডিশন
 */
export const NOTIFICATION_RULE_CONDITION_TYPE_NOTIFICATION_ATTRIBUTE = 'NOTIFICATION_ATTRIBUTE';

/**
 * টাইম-বেসড কন্ডিশন
 */
export const NOTIFICATION_RULE_CONDITION_TYPE_TIME_BASED = 'TIME_BASED';

/**
 * ফ্রিকোয়েন্সি-বেসড কন্ডিশন
 */
export const NOTIFICATION_RULE_CONDITION_TYPE_FREQUENCY_BASED = 'FREQUENCY_BASED';

/**
 * বিহেভিয়ার-বেসড কন্ডিশন
 */
export const NOTIFICATION_RULE_CONDITION_TYPE_BEHAVIOR_BASED = 'BEHAVIOR_BASED';

/**
 * কনটেক্সট-বেসড কন্ডিশন
 */
export const NOTIFICATION_RULE_CONDITION_TYPE_CONTEXT_BASED = 'CONTEXT_BASED';

/**
 * কম্পোজিট কন্ডিশন
 */
export const NOTIFICATION_RULE_CONDITION_TYPE_COMPOSITE = 'COMPOSITE';

// ============================================
// ৪. অপারেটর টাইপ
// ============================================

/**
 * অপারেটর টাইপ
 */
export type NotificationRuleOperator =
  | typeof NOTIFICATION_RULE_OPERATOR_EQUALS
  | typeof NOTIFICATION_RULE_OPERATOR_NOT_EQUALS
  | typeof NOTIFICATION_RULE_OPERATOR_GREATER_THAN
  | typeof NOTIFICATION_RULE_OPERATOR_LESS_THAN
  | typeof NOTIFICATION_RULE_OPERATOR_GREATER_THAN_OR_EQUAL
  | typeof NOTIFICATION_RULE_OPERATOR_LESS_THAN_OR_EQUAL
  | typeof NOTIFICATION_RULE_OPERATOR_CONTAINS
  | typeof NOTIFICATION_RULE_OPERATOR_NOT_CONTAINS
  | typeof NOTIFICATION_RULE_OPERATOR_STARTS_WITH
  | typeof NOTIFICATION_RULE_OPERATOR_ENDS_WITH
  | typeof NOTIFICATION_RULE_OPERATOR_IN
  | typeof NOTIFICATION_RULE_OPERATOR_NOT_IN
  | typeof NOTIFICATION_RULE_OPERATOR_IS_NULL
  | typeof NOTIFICATION_RULE_OPERATOR_IS_NOT_NULL
  | typeof NOTIFICATION_RULE_OPERATOR_BETWEEN
  | typeof NOTIFICATION_RULE_OPERATOR_REGEX;

/**
 * ইকুয়ালস অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_EQUALS = 'EQUALS';

/**
 * নট ইকুয়ালস অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_NOT_EQUALS = 'NOT_EQUALS';

/**
 * গ্রেটার দ্যান অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_GREATER_THAN = 'GREATER_THAN';

/**
 * লেস দ্যান অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_LESS_THAN = 'LESS_THAN';

/**
 * গ্রেটার দ্যান অর ইকুয়াল অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL';

/**
 * লেস দ্যান অর ইকুয়াল অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL';

/**
 * কনটেইনস অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_CONTAINS = 'CONTAINS';

/**
 * নট কনটেইনস অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_NOT_CONTAINS = 'NOT_CONTAINS';

/**
 * স্টার্টস উইথ অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_STARTS_WITH = 'STARTS_WITH';

/**
 * এন্ডস উইথ অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_ENDS_WITH = 'ENDS_WITH';

/**
 * ইন অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_IN = 'IN';

/**
 * নট ইন অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_NOT_IN = 'NOT_IN';

/**
 * ইস নাল অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_IS_NULL = 'IS_NULL';

/**
 * ইস নট নাল অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_IS_NOT_NULL = 'IS_NOT_NULL';

/**
 * বিটুইন অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_BETWEEN = 'BETWEEN';

/**
 * রেজেক্স অপারেটর
 */
export const NOTIFICATION_RULE_OPERATOR_REGEX = 'REGEX';

// ============================================
// ৫. অ্যাকশন টাইপ
// ============================================

/**
 * অ্যাকশন টাইপ
 */
export type NotificationRuleActionType =
  | typeof NOTIFICATION_RULE_ACTION_SEND_NOTIFICATION
  | typeof NOTIFICATION_RULE_ACTION_BLOCK_NOTIFICATION
  | typeof NOTIFICATION_RULE_ACTION_MODIFY_CONTENT
  | typeof NOTIFICATION_RULE_ACTION_CHANGE_PRIORITY
  | typeof NOTIFICATION_RULE_ACTION_ROUTE_TO_CHANNEL
  | typeof NOTIFICATION_RULE_ACTION_DELAY_DELIVERY
  | typeof NOTIFICATION_RULE_ACTION_ESCALATE
  | typeof NOTIFICATION_RULE_ACTION_LOG
  | typeof NOTIFICATION_RULE_ACTION_WEBHOOK
  | typeof NOTIFICATION_RULE_ACTION_AGGREGATE;

/**
 * সেন্ড নোটিফিকেশন অ্যাকশন
 */
export const NOTIFICATION_RULE_ACTION_SEND_NOTIFICATION = 'SEND_NOTIFICATION';

/**
 * ব্লক নোটিফিকেশন অ্যাকশন
 */
export const NOTIFICATION_RULE_ACTION_BLOCK_NOTIFICATION = 'BLOCK_NOTIFICATION';

/**
 * মডিফাই কনটেন্ট অ্যাকশন
 */
export const NOTIFICATION_RULE_ACTION_MODIFY_CONTENT = 'MODIFY_CONTENT';

/**
 * চেঞ্জ প্রায়োরিটি অ্যাকশন
 */
export const NOTIFICATION_RULE_ACTION_CHANGE_PRIORITY = 'CHANGE_PRIORITY';

/**
 * রাউট টু চ্যানেল অ্যাকশন
 */
export const NOTIFICATION_RULE_ACTION_ROUTE_TO_CHANNEL = 'ROUTE_TO_CHANNEL';

/**
 * ডেলে ডেলিভারি অ্যাকশন
 */
export const NOTIFICATION_RULE_ACTION_DELAY_DELIVERY = 'DELAY_DELIVERY';

/**
 * এসকেলেট অ্যাকশন
 */
export const NOTIFICATION_RULE_ACTION_ESCALATE = 'ESCALATE';

/**
 * লগ অ্যাকশন
 */
export const NOTIFICATION_RULE_ACTION_LOG = 'LOG';

/**
 * ওয়েবহুক অ্যাকশন
 */
export const NOTIFICATION_RULE_ACTION_WEBHOOK = 'WEBHOOK';

/**
 * অ্যাগ্রিগেট অ্যাকশন
 */
export const NOTIFICATION_RULE_ACTION_AGGREGATE = 'AGGREGATE';

// ============================================
// ৬. রুল স্ট্যাটাস
// ============================================

/**
 * রুল স্ট্যাটাস
 */
export type NotificationRuleStatus =
  | typeof NOTIFICATION_RULE_STATUS_ACTIVE
  | typeof NOTIFICATION_RULE_STATUS_INACTIVE
  | typeof NOTIFICATION_RULE_STATUS_DRAFT
  | typeof NOTIFICATION_RULE_STATUS_ARCHIVED
  | typeof NOTIFICATION_RULE_STATUS_DELETED
  | typeof NOTIFICATION_RULE_STATUS_PENDING_APPROVAL
  | typeof NOTIFICATION_RULE_STATUS_APPROVED
  | typeof NOTIFICATION_RULE_STATUS_REJECTED
  | typeof NOTIFICATION_RULE_STATUS_TESTING;

/**
 * অ্যাক্টিভ স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_ACTIVE = 'ACTIVE';

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_INACTIVE = 'INACTIVE';

/**
 * ড্রাফট স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_DRAFT = 'DRAFT';

/**
 * আর্কাইভড স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_ARCHIVED = 'ARCHIVED';

/**
 * ডিলিটেড স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_DELETED = 'DELETED';

/**
 * পেন্ডিং অ্যাপ্রুভাল স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_PENDING_APPROVAL = 'PENDING_APPROVAL';

/**
 * অ্যাপ্রুভড স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_APPROVED = 'APPROVED';

/**
 * রিজেক্টেড স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_REJECTED = 'REJECTED';

/**
 * টেস্টিং স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_TESTING = 'TESTING';

// ============================================
// ৭. রুল কনফিগারেশন
// ============================================

/**
 * রুল কনফিগারেশন ইন্টারফেস
 */
export interface NotificationRuleConfig {
  /** ম্যাক্স রুল পার সিস্টেম */
  maxRulesPerSystem: number;
  /** ম্যাক্স রুল পার ইউজার */
  maxRulesPerUser: number;
  /** ম্যাক্স কন্ডিশন পার রুল */
  maxConditionsPerRule: number;
  /** ম্যাক্স অ্যাকশন পার রুল */
  maxActionsPerRule: number;
  /** ডিফল্ট প্রায়োরিটি */
  defaultPriority: number;
  /** সর্বোচ্চ প্রায়োরিটি */
  maxPriority: number;
  /** ন্যূনতম প্রায়োরিটি */
  minPriority: number;
  /** ডিফল্ট টাইমআউট */
  defaultTimeout: number;
  /** ক্যাশ টিটিএল */
  cacheTtl: number;
  /** ক্যাশ ম্যাক্স সাইজ */
  cacheMaxSize: number;
}

/**
 * ডিফল্ট রুল কনফিগারেশন
 */
export const NOTIFICATION_RULE_DEFAULT_CONFIG: NotificationRuleConfig = {
  maxRulesPerSystem: NOTIFICATION_RULE_MAX_PER_SYSTEM,
  maxRulesPerUser: NOTIFICATION_RULE_MAX_PER_USER,
  maxConditionsPerRule: NOTIFICATION_RULE_MAX_CONDITIONS_PER_RULE,
  maxActionsPerRule: NOTIFICATION_RULE_MAX_ACTIONS_PER_RULE,
  defaultPriority: NOTIFICATION_RULE_DEFAULT_PRIORITY,
  maxPriority: NOTIFICATION_RULE_MAX_PRIORITY,
  minPriority: NOTIFICATION_RULE_MIN_PRIORITY,
  defaultTimeout: NOTIFICATION_RULE_DEFAULT_TIMEOUT,
  cacheTtl: NOTIFICATION_RULE_CACHE_TTL,
  cacheMaxSize: NOTIFICATION_RULE_CACHE_MAX_SIZE,
};

// ============================================
// ৮. রুল টাইপ লেবেল
// ============================================

/**
 * রুল টাইপ লেবেল
 */
export const NOTIFICATION_RULE_TYPE_LABELS: Record<NotificationRuleType, string> = {
  [NOTIFICATION_RULE_TYPE_SYSTEM]: 'সিস্টেম',
  [NOTIFICATION_RULE_TYPE_USER]: 'ব্যবহারকারী',
  [NOTIFICATION_RULE_TYPE_TENANT]: 'টেন্যান্ট',
  [NOTIFICATION_RULE_TYPE_GLOBAL]: 'গ্লোবাল',
  [NOTIFICATION_RULE_TYPE_CUSTOM]: 'কাস্টম',
};

// ============================================
// ৯. কন্ডিশন টাইপ লেবেল
// ============================================

/**
 * কন্ডিশন টাইপ লেবেল
 */
export const NOTIFICATION_RULE_CONDITION_TYPE_LABELS: Record<
  NotificationRuleConditionType,
  string
> = {
  [NOTIFICATION_RULE_CONDITION_TYPE_USER_ATTRIBUTE]: 'ইউজার অ্যাট্রিবিউট',
  [NOTIFICATION_RULE_CONDITION_TYPE_NOTIFICATION_ATTRIBUTE]: 'নোটিফিকেশন অ্যাট্রিবিউট',
  [NOTIFICATION_RULE_CONDITION_TYPE_TIME_BASED]: 'সময়ভিত্তিক',
  [NOTIFICATION_RULE_CONDITION_TYPE_FREQUENCY_BASED]: 'ফ্রিকোয়েন্সিভিত্তিক',
  [NOTIFICATION_RULE_CONDITION_TYPE_BEHAVIOR_BASED]: 'আচরণভিত্তিক',
  [NOTIFICATION_RULE_CONDITION_TYPE_CONTEXT_BASED]: 'প্রসঙ্গভিত্তিক',
  [NOTIFICATION_RULE_CONDITION_TYPE_COMPOSITE]: 'যৌগিক',
};

// ============================================
// ১০. অপারেটর লেবেল
// ============================================

/**
 * অপারেটর লেবেল
 */
export const NOTIFICATION_RULE_OPERATOR_LABELS: Record<NotificationRuleOperator, string> = {
  [NOTIFICATION_RULE_OPERATOR_EQUALS]: 'সমান',
  [NOTIFICATION_RULE_OPERATOR_NOT_EQUALS]: 'সমান নয়',
  [NOTIFICATION_RULE_OPERATOR_GREATER_THAN]: 'এর চেয়ে বড়',
  [NOTIFICATION_RULE_OPERATOR_LESS_THAN]: 'এর চেয়ে ছোট',
  [NOTIFICATION_RULE_OPERATOR_GREATER_THAN_OR_EQUAL]: 'এর চেয়ে বড় বা সমান',
  [NOTIFICATION_RULE_OPERATOR_LESS_THAN_OR_EQUAL]: 'এর চেয়ে ছোট বা সমান',
  [NOTIFICATION_RULE_OPERATOR_CONTAINS]: 'ধারণ করে',
  [NOTIFICATION_RULE_OPERATOR_NOT_CONTAINS]: 'ধারণ করে না',
  [NOTIFICATION_RULE_OPERATOR_STARTS_WITH]: 'দিয়ে শুরু হয়',
  [NOTIFICATION_RULE_OPERATOR_ENDS_WITH]: 'দিয়ে শেষ হয়',
  [NOTIFICATION_RULE_OPERATOR_IN]: 'এর মধ্যে',
  [NOTIFICATION_RULE_OPERATOR_NOT_IN]: 'এর মধ্যে নয়',
  [NOTIFICATION_RULE_OPERATOR_IS_NULL]: 'শূন্য',
  [NOTIFICATION_RULE_OPERATOR_IS_NOT_NULL]: 'শূন্য নয়',
  [NOTIFICATION_RULE_OPERATOR_BETWEEN]: 'এর মধ্যে',
  [NOTIFICATION_RULE_OPERATOR_REGEX]: 'রেজেক্স',
};

// ============================================
// ১১. অ্যাকশন টাইপ লেবেল
// ============================================

/**
 * অ্যাকশন টাইপ লেবেল
 */
export const NOTIFICATION_RULE_ACTION_TYPE_LABELS: Record<NotificationRuleActionType, string> = {
  [NOTIFICATION_RULE_ACTION_SEND_NOTIFICATION]: 'নোটিফিকেশন পাঠান',
  [NOTIFICATION_RULE_ACTION_BLOCK_NOTIFICATION]: 'নোটিফিকেশন ব্লক করুন',
  [NOTIFICATION_RULE_ACTION_MODIFY_CONTENT]: 'কন্টেন্ট পরিবর্তন করুন',
  [NOTIFICATION_RULE_ACTION_CHANGE_PRIORITY]: 'প্রায়োরিটি পরিবর্তন করুন',
  [NOTIFICATION_RULE_ACTION_ROUTE_TO_CHANNEL]: 'চ্যানেলে রাউট করুন',
  [NOTIFICATION_RULE_ACTION_DELAY_DELIVERY]: 'ডেলিভারি বিলম্বিত করুন',
  [NOTIFICATION_RULE_ACTION_ESCALATE]: 'এস্কেলেট করুন',
  [NOTIFICATION_RULE_ACTION_LOG]: 'লগ করুন',
  [NOTIFICATION_RULE_ACTION_WEBHOOK]: 'ওয়েবহুক কল করুন',
  [NOTIFICATION_RULE_ACTION_AGGREGATE]: 'অ্যাগ্রিগেট করুন',
};

// ============================================
// ১২. রুল স্ট্যাটাস লেবেল
// ============================================

/**
 * রুল স্ট্যাটাস লেবেল
 */
export const NOTIFICATION_RULE_STATUS_LABELS: Record<NotificationRuleStatus, string> = {
  [NOTIFICATION_RULE_STATUS_ACTIVE]: 'সক্রিয়',
  [NOTIFICATION_RULE_STATUS_INACTIVE]: 'নিষ্ক্রিয়',
  [NOTIFICATION_RULE_STATUS_DRAFT]: 'খসড়া',
  [NOTIFICATION_RULE_STATUS_ARCHIVED]: 'আর্কাইভ',
  [NOTIFICATION_RULE_STATUS_DELETED]: 'মুছে ফেলা',
  [NOTIFICATION_RULE_STATUS_PENDING_APPROVAL]: 'অনুমোদনের অপেক্ষায়',
  [NOTIFICATION_RULE_STATUS_APPROVED]: 'অনুমোদিত',
  [NOTIFICATION_RULE_STATUS_REJECTED]: 'বাতিল',
  [NOTIFICATION_RULE_STATUS_TESTING]: 'পরীক্ষাধীন',
};
