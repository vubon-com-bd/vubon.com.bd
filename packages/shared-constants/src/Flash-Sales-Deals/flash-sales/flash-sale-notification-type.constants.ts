/**
 * Flash Sale Notification Type Constants
 * নোটিফিকেশনের প্রকারভেদ
 */

// নোটিফিকেশন টাইপ এনাম
export const NOTIFICATION_TYPE = {
  START_REMINDER: 'start_reminder',
  END_REMINDER: 'end_reminder',
  PRICE_CHANGE: 'price_change',
  INVENTORY_UPDATE: 'inventory_update',
  COUPON_AVAILABLE: 'coupon_available',
  VOUCHER_AVAILABLE: 'voucher_available',
  PARTICIPANT_JOIN: 'participant_join',
  PARTICIPANT_LEAVE: 'participant_leave',
  RULE_TRIGGER: 'rule_trigger',
  ANALYTICS_ALERT: 'analytics_alert',
  SYSTEM_ALERT: 'system_alert',
  PROMOTIONAL: 'promotional',
  TRANSACTIONAL: 'transactional',
  SECURITY: 'security',
  MAINTENANCE: 'maintenance',
  UPDATE: 'update',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  CUSTOM: 'custom',
} as const;

// নোটিফিকেশন টাইপ টাইপ
export type NotificationType = (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];

// টাইপের লেবেল
export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  start_reminder: 'শুরু স্মারক',
  end_reminder: 'শেষ স্মারক',
  price_change: 'মূল্য পরিবর্তন',
  inventory_update: 'ইনভেন্টরি আপডেট',
  coupon_available: 'কুপন উপলব্ধ',
  voucher_available: 'ভাউচার উপলব্ধ',
  participant_join: 'অংশগ্রহণকারী যোগদান',
  participant_leave: 'অংশগ্রহণকারী প্রস্থান',
  rule_trigger: 'রুল ট্রিগার',
  analytics_alert: 'অ্যানালিটিক্স সতর্কতা',
  system_alert: 'সিস্টেম সতর্কতা',
  promotional: 'প্রচারমূলক',
  transactional: 'লেনদেন সংক্রান্ত',
  security: 'নিরাপত্তা',
  maintenance: 'রক্ষণাবেক্ষণ',
  update: 'আপডেট',
  success: 'সফল',
  error: 'ত্রুটি',
  warning: 'সতর্কতা',
  info: 'তথ্য',
  custom: 'কাস্টম',
};

// টাইপের বিবরণ
export const NOTIFICATION_TYPE_DESCRIPTIONS: Record<NotificationType, string> = {
  start_reminder: 'ফ্ল্যাশ সেল শুরুর আগে স্মারক',
  end_reminder: 'ফ্ল্যাশ সেল শেষ হওয়ার আগে স্মারক',
  price_change: 'মূল্য পরিবর্তনের বিজ্ঞপ্তি',
  inventory_update: 'ইনভেন্টরি আপডেটের বিজ্ঞপ্তি',
  coupon_available: 'কুপন উপলব্ধ হওয়ার বিজ্ঞপ্তি',
  voucher_available: 'ভাউচার উপলব্ধ হওয়ার বিজ্ঞপ্তি',
  participant_join: 'নতুন অংশগ্রহণকারী যোগদানের বিজ্ঞপ্তি',
  participant_leave: 'অংশগ্রহণকারী প্রস্থানের বিজ্ঞপ্তি',
  rule_trigger: 'রুল ট্রিগার হওয়ার বিজ্ঞপ্তি',
  analytics_alert: 'অ্যানালিটিক্স ভিত্তিক সতর্কতা',
  system_alert: 'সিস্টেম সংক্রান্ত সতর্কতা',
  promotional: 'প্রচারমূলক বিজ্ঞপ্তি',
  transactional: 'লেনদেন সংক্রান্ত বিজ্ঞপ্তি',
  security: 'নিরাপত্তা সংক্রান্ত বিজ্ঞপ্তি',
  maintenance: 'রক্ষণাবেক্ষণ সংক্রান্ত বিজ্ঞপ্তি',
  update: 'আপডেট সংক্রান্ত বিজ্ঞপ্তি',
  success: 'সফল অপারেশনের বিজ্ঞপ্তি',
  error: 'ত্রুটি সংক্রান্ত বিজ্ঞপ্তি',
  warning: 'সতর্কতা মূলক বিজ্ঞপ্তি',
  info: 'তথ্য মূলক বিজ্ঞপ্তি',
  custom: 'কাস্টম বিজ্ঞপ্তি',
};

// টাইপের আইকন
export const NOTIFICATION_TYPE_ICONS: Record<NotificationType, string> = {
  start_reminder: 'Bell',
  end_reminder: 'BellRing',
  price_change: 'DollarSign',
  inventory_update: 'Package',
  coupon_available: 'Ticket',
  voucher_available: 'CreditCard',
  participant_join: 'UserPlus',
  participant_leave: 'UserMinus',
  rule_trigger: 'Zap',
  analytics_alert: 'BarChart',
  system_alert: 'Server',
  promotional: 'Megaphone',
  transactional: 'ShoppingBag',
  security: 'Shield',
  maintenance: 'Wrench',
  update: 'RefreshCw',
  success: 'CheckCircle',
  error: 'XCircle',
  warning: 'AlertTriangle',
  info: 'Info',
  custom: 'Sliders',
};

// টাইপের কালার
export const NOTIFICATION_TYPE_COLORS: Record<NotificationType, string> = {
  start_reminder: '#8B5CF6',
  end_reminder: '#8B5CF6',
  price_change: '#F59E0B',
  inventory_update: '#3B82F6',
  coupon_available: '#EC4899',
  voucher_available: '#EC4899',
  participant_join: '#22C55E',
  participant_leave: '#EF4444',
  rule_trigger: '#F97316',
  analytics_alert: '#06B6D4',
  system_alert: '#EF4444',
  promotional: '#EC4899',
  transactional: '#3B82F6',
  security: '#DC2626',
  maintenance: '#F59E0B',
  update: '#06B6D4',
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  custom: '#8B5CF6',
};

// টাইপ গ্রুপ
export const NOTIFICATION_TYPE_GROUPS = {
  REMINDER: ['start_reminder', 'end_reminder'] as NotificationType[],
  EVENT: ['participant_join', 'participant_leave', 'rule_trigger'] as NotificationType[],
  UPDATE: [
    'price_change',
    'inventory_update',
    'coupon_available',
    'voucher_available',
  ] as NotificationType[],
  ALERT: ['analytics_alert', 'system_alert'] as NotificationType[],
  STATUS: ['success', 'error', 'warning', 'info'] as NotificationType[],
  SYSTEM: ['security', 'maintenance', 'update'] as NotificationType[],
  BUSINESS: ['promotional', 'transactional'] as NotificationType[],
  OTHER: ['custom'] as NotificationType[],
} as const;

// টাইপ কনফিগারেশন ইন্টারফেস
export interface NotificationTypeConfig {
  type: NotificationType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

// সম্পূর্ণ টাইপ কনফিগারেশন
export const NOTIFICATION_TYPE_CONFIGS: Record<NotificationType, NotificationTypeConfig> = {
  start_reminder: {
    type: 'start_reminder',
    label: NOTIFICATION_TYPE_LABELS.start_reminder,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.start_reminder,
    icon: NOTIFICATION_TYPE_ICONS.start_reminder,
    color: NOTIFICATION_TYPE_COLORS.start_reminder,
    isActive: true,
  },
  end_reminder: {
    type: 'end_reminder',
    label: NOTIFICATION_TYPE_LABELS.end_reminder,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.end_reminder,
    icon: NOTIFICATION_TYPE_ICONS.end_reminder,
    color: NOTIFICATION_TYPE_COLORS.end_reminder,
    isActive: true,
  },
  price_change: {
    type: 'price_change',
    label: NOTIFICATION_TYPE_LABELS.price_change,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.price_change,
    icon: NOTIFICATION_TYPE_ICONS.price_change,
    color: NOTIFICATION_TYPE_COLORS.price_change,
    isActive: true,
  },
  inventory_update: {
    type: 'inventory_update',
    label: NOTIFICATION_TYPE_LABELS.inventory_update,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.inventory_update,
    icon: NOTIFICATION_TYPE_ICONS.inventory_update,
    color: NOTIFICATION_TYPE_COLORS.inventory_update,
    isActive: true,
  },
  coupon_available: {
    type: 'coupon_available',
    label: NOTIFICATION_TYPE_LABELS.coupon_available,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.coupon_available,
    icon: NOTIFICATION_TYPE_ICONS.coupon_available,
    color: NOTIFICATION_TYPE_COLORS.coupon_available,
    isActive: true,
  },
  voucher_available: {
    type: 'voucher_available',
    label: NOTIFICATION_TYPE_LABELS.voucher_available,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.voucher_available,
    icon: NOTIFICATION_TYPE_ICONS.voucher_available,
    color: NOTIFICATION_TYPE_COLORS.voucher_available,
    isActive: true,
  },
  participant_join: {
    type: 'participant_join',
    label: NOTIFICATION_TYPE_LABELS.participant_join,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.participant_join,
    icon: NOTIFICATION_TYPE_ICONS.participant_join,
    color: NOTIFICATION_TYPE_COLORS.participant_join,
    isActive: true,
  },
  participant_leave: {
    type: 'participant_leave',
    label: NOTIFICATION_TYPE_LABELS.participant_leave,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.participant_leave,
    icon: NOTIFICATION_TYPE_ICONS.participant_leave,
    color: NOTIFICATION_TYPE_COLORS.participant_leave,
    isActive: true,
  },
  rule_trigger: {
    type: 'rule_trigger',
    label: NOTIFICATION_TYPE_LABELS.rule_trigger,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.rule_trigger,
    icon: NOTIFICATION_TYPE_ICONS.rule_trigger,
    color: NOTIFICATION_TYPE_COLORS.rule_trigger,
    isActive: true,
  },
  analytics_alert: {
    type: 'analytics_alert',
    label: NOTIFICATION_TYPE_LABELS.analytics_alert,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.analytics_alert,
    icon: NOTIFICATION_TYPE_ICONS.analytics_alert,
    color: NOTIFICATION_TYPE_COLORS.analytics_alert,
    isActive: true,
  },
  system_alert: {
    type: 'system_alert',
    label: NOTIFICATION_TYPE_LABELS.system_alert,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.system_alert,
    icon: NOTIFICATION_TYPE_ICONS.system_alert,
    color: NOTIFICATION_TYPE_COLORS.system_alert,
    isActive: true,
  },
  promotional: {
    type: 'promotional',
    label: NOTIFICATION_TYPE_LABELS.promotional,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.promotional,
    icon: NOTIFICATION_TYPE_ICONS.promotional,
    color: NOTIFICATION_TYPE_COLORS.promotional,
    isActive: true,
  },
  transactional: {
    type: 'transactional',
    label: NOTIFICATION_TYPE_LABELS.transactional,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.transactional,
    icon: NOTIFICATION_TYPE_ICONS.transactional,
    color: NOTIFICATION_TYPE_COLORS.transactional,
    isActive: true,
  },
  security: {
    type: 'security',
    label: NOTIFICATION_TYPE_LABELS.security,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.security,
    icon: NOTIFICATION_TYPE_ICONS.security,
    color: NOTIFICATION_TYPE_COLORS.security,
    isActive: true,
  },
  maintenance: {
    type: 'maintenance',
    label: NOTIFICATION_TYPE_LABELS.maintenance,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.maintenance,
    icon: NOTIFICATION_TYPE_ICONS.maintenance,
    color: NOTIFICATION_TYPE_COLORS.maintenance,
    isActive: true,
  },
  update: {
    type: 'update',
    label: NOTIFICATION_TYPE_LABELS.update,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.update,
    icon: NOTIFICATION_TYPE_ICONS.update,
    color: NOTIFICATION_TYPE_COLORS.update,
    isActive: true,
  },
  success: {
    type: 'success',
    label: NOTIFICATION_TYPE_LABELS.success,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.success,
    icon: NOTIFICATION_TYPE_ICONS.success,
    color: NOTIFICATION_TYPE_COLORS.success,
    isActive: true,
  },
  error: {
    type: 'error',
    label: NOTIFICATION_TYPE_LABELS.error,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.error,
    icon: NOTIFICATION_TYPE_ICONS.error,
    color: NOTIFICATION_TYPE_COLORS.error,
    isActive: true,
  },
  warning: {
    type: 'warning',
    label: NOTIFICATION_TYPE_LABELS.warning,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.warning,
    icon: NOTIFICATION_TYPE_ICONS.warning,
    color: NOTIFICATION_TYPE_COLORS.warning,
    isActive: true,
  },
  info: {
    type: 'info',
    label: NOTIFICATION_TYPE_LABELS.info,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.info,
    icon: NOTIFICATION_TYPE_ICONS.info,
    color: NOTIFICATION_TYPE_COLORS.info,
    isActive: true,
  },
  custom: {
    type: 'custom',
    label: NOTIFICATION_TYPE_LABELS.custom,
    description: NOTIFICATION_TYPE_DESCRIPTIONS.custom,
    icon: NOTIFICATION_TYPE_ICONS.custom,
    color: NOTIFICATION_TYPE_COLORS.custom,
    isActive: true,
  },
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপ ভ্যালিড কিনা চেক করুন
export const isValidNotificationType = (type: string): type is NotificationType => {
  return Object.values(NOTIFICATION_TYPE).includes(type as NotificationType);
};

// হেল্পার ফাংশন: সক্রিয় নোটিফিকেশন টাইপ গুলো পান
export const getActiveNotificationTypes = (): NotificationType[] => {
  return Object.values(NOTIFICATION_TYPE_CONFIGS)
    .filter((config) => config.isActive)
    .map((config) => config.type);
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপ গ্রুপ অনুযায়ী ফিল্টার
export const getNotificationTypesByGroup = (
  group: keyof typeof NOTIFICATION_TYPE_GROUPS
): NotificationType[] => {
  return NOTIFICATION_TYPE_GROUPS[group] || [];
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপের লেবেল পান
export const getNotificationTypeLabel = (type: NotificationType): string => {
  return NOTIFICATION_TYPE_LABELS[type] || type;
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপের বিবরণ পান
export const getNotificationTypeDescription = (type: NotificationType): string => {
  return NOTIFICATION_TYPE_DESCRIPTIONS[type] || '';
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপের কালার পান
export const getNotificationTypeColor = (type: NotificationType): string => {
  return NOTIFICATION_TYPE_COLORS[type] || '#6B7280';
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপের আইকন পান
export const getNotificationTypeIcon = (type: NotificationType): string => {
  return NOTIFICATION_TYPE_ICONS[type] || 'Bell';
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপ রিমাইন্ডার কিনা চেক করুন
export const isReminderNotification = (type: NotificationType): boolean => {
  const reminderTypes: NotificationType[] = ['start_reminder', 'end_reminder'];
  return reminderTypes.includes(type);
};

// হেল্পার ফাংশন: নোটিফিকেশন টাইপ স্ট্যাটাস কিনা চেক করুন
export const isStatusNotification = (type: NotificationType): boolean => {
  const statusTypes: NotificationType[] = ['success', 'error', 'warning', 'info'];
  return statusTypes.includes(type);
};
