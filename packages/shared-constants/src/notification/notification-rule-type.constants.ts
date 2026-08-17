// ============================================
// নোটিফিকেশন রুল টাইপ সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. রুল টাইপ
// ============================================

/**
 * নোটিফিকেশন রুল টাইপ
 * রুলের মূল উদ্দেশ্য ও কার্যকারিতা নির্দেশ করে
 */
export type NotificationRuleType =
  | typeof NOTIFICATION_RULE_TYPE_FILTER
  | typeof NOTIFICATION_RULE_TYPE_TRANSFORM
  | typeof NOTIFICATION_RULE_TYPE_ROUTING
  | typeof NOTIFICATION_RULE_TYPE_THROTTLE
  | typeof NOTIFICATION_RULE_TYPE_DEDUPLICATE
  | typeof NOTIFICATION_RULE_TYPE_PRIORITIZE
  | typeof NOTIFICATION_RULE_TYPE_SUPPRESS
  | typeof NOTIFICATION_RULE_TYPE_ESCALATE
  | typeof NOTIFICATION_RULE_TYPE_AGGREGATE
  | typeof NOTIFICATION_RULE_TYPE_SCHEDULE
  | typeof NOTIFICATION_RULE_TYPE_AUDIT
  | typeof NOTIFICATION_RULE_TYPE_COMPOSITE;

/**
 * ফিল্টার রুল
 * @description নোটিফিকেশন ফিল্টার করার জন্য
 */
export const NOTIFICATION_RULE_TYPE_FILTER = 'FILTER';

/**
 * ট্রান্সফর্ম রুল
 * @description নোটিফিকেশন কন্টেন্ট পরিবর্তন করার জন্য
 */
export const NOTIFICATION_RULE_TYPE_TRANSFORM = 'TRANSFORM';

/**
 * রাউটিং রুল
 * @description নোটিফিকেশন চ্যানেলে রাউট করার জন্য
 */
export const NOTIFICATION_RULE_TYPE_ROUTING = 'ROUTING';

/**
 * থ্রটল রুল
 * @description নোটিফিকেশন ফ্রিকোয়েন্সি নিয়ন্ত্রণের জন্য
 */
export const NOTIFICATION_RULE_TYPE_THROTTLE = 'THROTTLE';

/**
 * ডিডুপ্লিকেট রুল
 * @description ডুপ্লিকেট নোটিফিকেশন প্রতিরোধের জন্য
 */
export const NOTIFICATION_RULE_TYPE_DEDUPLICATE = 'DEDUPLICATE';

/**
 * প্রায়োরিটাইজ রুল
 * @description নোটিফিকেশন প্রায়োরিটি নির্ধারণের জন্য
 */
export const NOTIFICATION_RULE_TYPE_PRIORITIZE = 'PRIORITIZE';

/**
 * সাপ্রেস রুল
 * @description নির্দিষ্ট শর্তে নোটিফিকেশন দমন করার জন্য
 */
export const NOTIFICATION_RULE_TYPE_SUPPRESS = 'SUPPRESS';

/**
 * এসকেলেট রুল
 * @description গুরুত্বপূর্ণ নোটিফিকেশন এসকেলেট করার জন্য
 */
export const NOTIFICATION_RULE_TYPE_ESCALATE = 'ESCALATE';

/**
 * অ্যাগ্রিগেট রুল
 * @description একাধিক নোটিফিকেশন একত্রিত করার জন্য
 */
export const NOTIFICATION_RULE_TYPE_AGGREGATE = 'AGGREGATE';

/**
 * শিডিউল রুল
 * @description নোটিফিকেশন সময়সূচী নির্ধারণের জন্য
 */
export const NOTIFICATION_RULE_TYPE_SCHEDULE = 'SCHEDULE';

/**
 * অডিট রুল
 * @description নোটিফিকেশন অডিট ও লগিং এর জন্য
 */
export const NOTIFICATION_RULE_TYPE_AUDIT = 'AUDIT';

/**
 * কম্পোজিট রুল
 * @description একাধিক রুল সমন্বিত
 */
export const NOTIFICATION_RULE_TYPE_COMPOSITE = 'COMPOSITE';

// ============================================
// ২. রুল টাইপ গ্রুপ
// ============================================

/**
 * রুল টাইপ গ্রুপ
 */
export type NotificationRuleTypeGroup =
  | typeof NOTIFICATION_RULE_TYPE_GROUP_FILTER
  | typeof NOTIFICATION_RULE_TYPE_GROUP_MODIFY
  | typeof NOTIFICATION_RULE_TYPE_GROUP_CONTROL
  | typeof NOTIFICATION_RULE_TYPE_GROUP_INTELLIGENCE;

/**
 * ফিল্টার গ্রুপ
 * @description ফিল্টার ও দমন সংক্রান্ত রুল
 */
export const NOTIFICATION_RULE_TYPE_GROUP_FILTER = 'FILTER';

/**
 * মডিফাই গ্রুপ
 * @description পরিবর্তন ও রূপান্তর সংক্রান্ত রুল
 */
export const NOTIFICATION_RULE_TYPE_GROUP_MODIFY = 'MODIFY';

/**
 * কন্ট্রোল গ্রুপ
 * @description নিয়ন্ত্রণ ও পরিচালনা সংক্রান্ত রুল
 */
export const NOTIFICATION_RULE_TYPE_GROUP_CONTROL = 'CONTROL';

/**
 * ইন্টেলিজেন্স গ্রুপ
 * @description বুদ্ধিমান ও বিশ্লেষণ সংক্রান্ত রুল
 */
export const NOTIFICATION_RULE_TYPE_GROUP_INTELLIGENCE = 'INTELLIGENCE';

// ============================================
// ৩. রুল টাইপ থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * রুল টাইপ থেকে গ্রুপ ম্যাপিং
 */
export const NOTIFICATION_RULE_TYPE_TO_GROUP: Record<
  NotificationRuleType,
  NotificationRuleTypeGroup
> = {
  [NOTIFICATION_RULE_TYPE_FILTER]: NOTIFICATION_RULE_TYPE_GROUP_FILTER,
  [NOTIFICATION_RULE_TYPE_TRANSFORM]: NOTIFICATION_RULE_TYPE_GROUP_MODIFY,
  [NOTIFICATION_RULE_TYPE_ROUTING]: NOTIFICATION_RULE_TYPE_GROUP_CONTROL,
  [NOTIFICATION_RULE_TYPE_THROTTLE]: NOTIFICATION_RULE_TYPE_GROUP_CONTROL,
  [NOTIFICATION_RULE_TYPE_DEDUPLICATE]: NOTIFICATION_RULE_TYPE_GROUP_INTELLIGENCE,
  [NOTIFICATION_RULE_TYPE_PRIORITIZE]: NOTIFICATION_RULE_TYPE_GROUP_INTELLIGENCE,
  [NOTIFICATION_RULE_TYPE_SUPPRESS]: NOTIFICATION_RULE_TYPE_GROUP_FILTER,
  [NOTIFICATION_RULE_TYPE_ESCALATE]: NOTIFICATION_RULE_TYPE_GROUP_CONTROL,
  [NOTIFICATION_RULE_TYPE_AGGREGATE]: NOTIFICATION_RULE_TYPE_GROUP_INTELLIGENCE,
  [NOTIFICATION_RULE_TYPE_SCHEDULE]: NOTIFICATION_RULE_TYPE_GROUP_CONTROL,
  [NOTIFICATION_RULE_TYPE_AUDIT]: NOTIFICATION_RULE_TYPE_GROUP_INTELLIGENCE,
  [NOTIFICATION_RULE_TYPE_COMPOSITE]: NOTIFICATION_RULE_TYPE_GROUP_INTELLIGENCE,
};

// ============================================
// ৪. রুল টাইপ লেবেল
// ============================================

/**
 * রুল টাইপ লেবেল
 */
export const NOTIFICATION_RULE_TYPE_LABELS: Record<NotificationRuleType, string> = {
  [NOTIFICATION_RULE_TYPE_FILTER]: 'ফিল্টার',
  [NOTIFICATION_RULE_TYPE_TRANSFORM]: 'রূপান্তর',
  [NOTIFICATION_RULE_TYPE_ROUTING]: 'রাউটিং',
  [NOTIFICATION_RULE_TYPE_THROTTLE]: 'থ্রটল',
  [NOTIFICATION_RULE_TYPE_DEDUPLICATE]: 'ডিডুপ্লিকেট',
  [NOTIFICATION_RULE_TYPE_PRIORITIZE]: 'প্রায়োরিটাইজ',
  [NOTIFICATION_RULE_TYPE_SUPPRESS]: 'দমন',
  [NOTIFICATION_RULE_TYPE_ESCALATE]: 'এস্কেলেট',
  [NOTIFICATION_RULE_TYPE_AGGREGATE]: 'একত্রিত',
  [NOTIFICATION_RULE_TYPE_SCHEDULE]: 'সময়সূচী',
  [NOTIFICATION_RULE_TYPE_AUDIT]: 'অডিট',
  [NOTIFICATION_RULE_TYPE_COMPOSITE]: 'যৌগিক',
};

// ============================================
// ৫. রুল টাইপ আইকন
// ============================================

/**
 * রুল টাইপ আইকন
 */
export const NOTIFICATION_RULE_TYPE_ICONS: Record<NotificationRuleType, string> = {
  [NOTIFICATION_RULE_TYPE_FILTER]: 'filter',
  [NOTIFICATION_RULE_TYPE_TRANSFORM]: 'transform',
  [NOTIFICATION_RULE_TYPE_ROUTING]: 'route',
  [NOTIFICATION_RULE_TYPE_THROTTLE]: 'speed',
  [NOTIFICATION_RULE_TYPE_DEDUPLICATE]: 'deduplicate',
  [NOTIFICATION_RULE_TYPE_PRIORITIZE]: 'priority',
  [NOTIFICATION_RULE_TYPE_SUPPRESS]: 'block',
  [NOTIFICATION_RULE_TYPE_ESCALATE]: 'escalate',
  [NOTIFICATION_RULE_TYPE_AGGREGATE]: 'merge',
  [NOTIFICATION_RULE_TYPE_SCHEDULE]: 'schedule',
  [NOTIFICATION_RULE_TYPE_AUDIT]: 'audit',
  [NOTIFICATION_RULE_TYPE_COMPOSITE]: 'layers',
};

// ============================================
// ৬. রুল টাইপ কালার
// ============================================

/**
 * রুল টাইপ কালার
 */
export const NOTIFICATION_RULE_TYPE_COLORS: Record<NotificationRuleType, string> = {
  [NOTIFICATION_RULE_TYPE_FILTER]: '#2196F3', // Blue
  [NOTIFICATION_RULE_TYPE_TRANSFORM]: '#9C27B0', // Purple
  [NOTIFICATION_RULE_TYPE_ROUTING]: '#FF9800', // Orange
  [NOTIFICATION_RULE_TYPE_THROTTLE]: '#FF5722', // Deep Orange
  [NOTIFICATION_RULE_TYPE_DEDUPLICATE]: '#4CAF50', // Green
  [NOTIFICATION_RULE_TYPE_PRIORITIZE]: '#E91E63', // Pink
  [NOTIFICATION_RULE_TYPE_SUPPRESS]: '#F44336', // Red
  [NOTIFICATION_RULE_TYPE_ESCALATE]: '#D32F2F', // Dark Red
  [NOTIFICATION_RULE_TYPE_AGGREGATE]: '#00BCD4', // Cyan
  [NOTIFICATION_RULE_TYPE_SCHEDULE]: '#607D8B', // Blue Grey
  [NOTIFICATION_RULE_TYPE_AUDIT]: '#795548', // Brown
  [NOTIFICATION_RULE_TYPE_COMPOSITE]: '#3F51B5', // Indigo
};

// ============================================
// ৭. রুল টাইপ প্রায়োরিটি
// ============================================

/**
 * রুল টাইপ প্রায়োরিটি (১-১০)
 */
export const NOTIFICATION_RULE_TYPE_PRIORITY: Record<NotificationRuleType, number> = {
  [NOTIFICATION_RULE_TYPE_FILTER]: 7,
  [NOTIFICATION_RULE_TYPE_TRANSFORM]: 5,
  [NOTIFICATION_RULE_TYPE_ROUTING]: 6,
  [NOTIFICATION_RULE_TYPE_THROTTLE]: 8,
  [NOTIFICATION_RULE_TYPE_DEDUPLICATE]: 9,
  [NOTIFICATION_RULE_TYPE_PRIORITIZE]: 6,
  [NOTIFICATION_RULE_TYPE_SUPPRESS]: 8,
  [NOTIFICATION_RULE_TYPE_ESCALATE]: 9,
  [NOTIFICATION_RULE_TYPE_AGGREGATE]: 5,
  [NOTIFICATION_RULE_TYPE_SCHEDULE]: 6,
  [NOTIFICATION_RULE_TYPE_AUDIT]: 4,
  [NOTIFICATION_RULE_TYPE_COMPOSITE]: 7,
};

// ============================================
// ৮. রুল টাইপ কনফিগারেশন
// ============================================

/**
 * রুল টাইপ কনফিগারেশন
 */
export interface NotificationRuleTypeConfig {
  /** টাইপের নাম */
  type: NotificationRuleType;
  /** টাইপের লেবেল */
  label: string;
  /** টাইপের আইকন */
  icon: string;
  /** টাইপের কালার */
  color: string;
  /** টাইপের প্রায়োরিটি */
  priority: number;
  /** টাইপের গ্রুপ */
  group: NotificationRuleTypeGroup;
  /** ফিল্টার টাইপ কিনা */
  isFilter: boolean;
  /** পরিবর্তন টাইপ কিনা */
  isTransform: boolean;
  /** নিয়ন্ত্রণ টাইপ কিনা */
  isControl: boolean;
}

/**
 * সব রুল টাইপের কনফিগারেশন
 */
export const NOTIFICATION_RULE_TYPE_CONFIGS: NotificationRuleTypeConfig[] = [
  {
    type: NOTIFICATION_RULE_TYPE_FILTER,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_FILTER],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_FILTER],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_FILTER],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_FILTER],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_FILTER],
    isFilter: true,
    isTransform: false,
    isControl: false,
  },
  {
    type: NOTIFICATION_RULE_TYPE_TRANSFORM,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_TRANSFORM],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_TRANSFORM],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_TRANSFORM],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_TRANSFORM],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_TRANSFORM],
    isFilter: false,
    isTransform: true,
    isControl: false,
  },
  {
    type: NOTIFICATION_RULE_TYPE_ROUTING,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_ROUTING],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_ROUTING],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_ROUTING],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_ROUTING],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_ROUTING],
    isFilter: false,
    isTransform: false,
    isControl: true,
  },
  {
    type: NOTIFICATION_RULE_TYPE_THROTTLE,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_THROTTLE],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_THROTTLE],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_THROTTLE],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_THROTTLE],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_THROTTLE],
    isFilter: false,
    isTransform: false,
    isControl: true,
  },
  {
    type: NOTIFICATION_RULE_TYPE_DEDUPLICATE,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_DEDUPLICATE],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_DEDUPLICATE],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_DEDUPLICATE],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_DEDUPLICATE],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_DEDUPLICATE],
    isFilter: false,
    isTransform: false,
    isControl: false,
  },
  {
    type: NOTIFICATION_RULE_TYPE_PRIORITIZE,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_PRIORITIZE],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_PRIORITIZE],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_PRIORITIZE],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_PRIORITIZE],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_PRIORITIZE],
    isFilter: false,
    isTransform: false,
    isControl: false,
  },
  {
    type: NOTIFICATION_RULE_TYPE_SUPPRESS,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_SUPPRESS],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_SUPPRESS],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_SUPPRESS],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_SUPPRESS],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_SUPPRESS],
    isFilter: true,
    isTransform: false,
    isControl: false,
  },
  {
    type: NOTIFICATION_RULE_TYPE_ESCALATE,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_ESCALATE],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_ESCALATE],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_ESCALATE],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_ESCALATE],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_ESCALATE],
    isFilter: false,
    isTransform: false,
    isControl: true,
  },
  {
    type: NOTIFICATION_RULE_TYPE_AGGREGATE,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_AGGREGATE],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_AGGREGATE],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_AGGREGATE],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_AGGREGATE],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_AGGREGATE],
    isFilter: false,
    isTransform: false,
    isControl: false,
  },
  {
    type: NOTIFICATION_RULE_TYPE_SCHEDULE,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_SCHEDULE],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_SCHEDULE],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_SCHEDULE],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_SCHEDULE],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_SCHEDULE],
    isFilter: false,
    isTransform: false,
    isControl: true,
  },
  {
    type: NOTIFICATION_RULE_TYPE_AUDIT,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_AUDIT],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_AUDIT],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_AUDIT],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_AUDIT],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_AUDIT],
    isFilter: false,
    isTransform: false,
    isControl: false,
  },
  {
    type: NOTIFICATION_RULE_TYPE_COMPOSITE,
    label: NOTIFICATION_RULE_TYPE_LABELS[NOTIFICATION_RULE_TYPE_COMPOSITE],
    icon: NOTIFICATION_RULE_TYPE_ICONS[NOTIFICATION_RULE_TYPE_COMPOSITE],
    color: NOTIFICATION_RULE_TYPE_COLORS[NOTIFICATION_RULE_TYPE_COMPOSITE],
    priority: NOTIFICATION_RULE_TYPE_PRIORITY[NOTIFICATION_RULE_TYPE_COMPOSITE],
    group: NOTIFICATION_RULE_TYPE_TO_GROUP[NOTIFICATION_RULE_TYPE_COMPOSITE],
    isFilter: false,
    isTransform: false,
    isControl: false,
  },
];
