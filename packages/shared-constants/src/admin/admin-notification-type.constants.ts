/**
 * অ্যাডমিন নোটিফিকেশনের টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// নোটিফিকেশন টাইপ
export const NOTIFICATION_TYPES = {
  ALERT: 'alert',
  REMINDER: 'reminder',
  REPORT: 'report',
  ANNOUNCEMENT: 'announcement',
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info',
  ERROR: 'error',
} as const;

// টাইপের আইকন
export const NOTIFICATION_TYPE_ICONS = {
  ALERT: '🔔',
  REMINDER: '⏰',
  REPORT: '📊',
  ANNOUNCEMENT: '📢',
  WARNING: '⚠️',
  SUCCESS: '✅',
  INFO: 'ℹ️',
  ERROR: '❌',
} as const;

// টাইপের কালার কোড
export const NOTIFICATION_TYPE_COLORS = {
  ALERT: '#F59E0B',
  REMINDER: '#3B82F6',
  REPORT: '#8B5CF6',
  ANNOUNCEMENT: '#EC4899',
  WARNING: '#EF4444',
  SUCCESS: '#22C55E',
  INFO: '#06B6D4',
  ERROR: '#DC2626',
} as const;

// টাইপের ডেসক্রিপশন
export const NOTIFICATION_TYPE_DESCRIPTIONS = {
  ALERT: 'Urgent notification requiring immediate attention',
  REMINDER: 'Reminder notification for upcoming events',
  REPORT: 'Report generation and analytics notification',
  ANNOUNCEMENT: 'General announcement for all users',
  WARNING: 'Warning notification about potential issues',
  SUCCESS: 'Successful operation completion notification',
  INFO: 'Informational notification for general updates',
  ERROR: 'Error notification about system issues',
} as const;

// টাইপের প্রায়োরিটি
export const NOTIFICATION_TYPE_PRIORITY = {
  ALERT: 'high',
  REMINDER: 'medium',
  REPORT: 'medium',
  ANNOUNCEMENT: 'medium',
  WARNING: 'high',
  SUCCESS: 'low',
  INFO: 'low',
  ERROR: 'urgent',
} as const;

// টাইপের ডেলিভারি চ্যানেল
export const NOTIFICATION_TYPE_DELIVERY_CHANNELS = {
  ALERT: ['in_app', 'email', 'push'],
  REMINDER: ['in_app', 'email', 'sms'],
  REPORT: ['in_app', 'email'],
  ANNOUNCEMENT: ['in_app', 'email', 'push'],
  WARNING: ['in_app', 'email', 'push'],
  SUCCESS: ['in_app', 'push'],
  INFO: ['in_app'],
  ERROR: ['in_app', 'email', 'push'],
} as const;

// টাইপের ডিফল্ট টেমপ্লেট
export const NOTIFICATION_TYPE_DEFAULT_TEMPLATES = {
  ALERT: 'alert_template',
  REMINDER: 'reminder_template',
  REPORT: 'report_template',
  ANNOUNCEMENT: 'announcement_template',
  WARNING: 'warning_template',
  SUCCESS: 'success_template',
  INFO: 'info_template',
  ERROR: 'error_template',
} as const;

// টাইপ গ্রুপ
export const NOTIFICATION_TYPE_GROUPS = {
  URGENT: ['alert', 'warning', 'error'],
  INFORMATIONAL: ['info', 'success', 'announcement'],
  SCHEDULED: ['reminder', 'report'],
} as const;

// টাইপের লেবেল (বাংলা)
export const NOTIFICATION_TYPE_LABELS_BN = {
  ALERT: 'সতর্কতা',
  REMINDER: 'রিমাইন্ডার',
  REPORT: 'রিপোর্ট',
  ANNOUNCEMENT: 'ঘোষণা',
  WARNING: 'সতর্কীকরণ',
  SUCCESS: 'সফল',
  INFO: 'তথ্য',
  ERROR: 'ত্রুটি',
} as const;

// টাইপের লেবেল (ইংরেজি)
export const NOTIFICATION_TYPE_LABELS_EN = {
  ALERT: 'Alert',
  REMINDER: 'Reminder',
  REPORT: 'Report',
  ANNOUNCEMENT: 'Announcement',
  WARNING: 'Warning',
  SUCCESS: 'Success',
  INFO: 'Info',
  ERROR: 'Error',
} as const;

// টাইপের CSS ক্লাস
export const NOTIFICATION_TYPE_CSS_CLASSES = {
  ALERT: 'notif-alert',
  REMINDER: 'notif-reminder',
  REPORT: 'notif-report',
  ANNOUNCEMENT: 'notif-announcement',
  WARNING: 'notif-warning',
  SUCCESS: 'notif-success',
  INFO: 'notif-info',
  ERROR: 'notif-error',
} as const;

// টাইপের জন্য ইমোজি
export const NOTIFICATION_TYPE_EMOJIS = {
  ALERT: '🔔',
  REMINDER: '⏰',
  REPORT: '📈',
  ANNOUNCEMENT: '📢',
  WARNING: '⚠️',
  SUCCESS: '✅',
  INFO: 'ℹ️',
  ERROR: '❌',
} as const;

// টাইপের এক্সপাইরি টাইম (ঘন্টায়)
export const NOTIFICATION_TYPE_EXPIRY_TIME = {
  ALERT: 24,
  REMINDER: 168, // ৭ দিন
  REPORT: 72,
  ANNOUNCEMENT: 336, // ১৪ দিন
  WARNING: 48,
  SUCCESS: 24,
  INFO: 72,
  ERROR: 48,
} as const;

// টাইপের সাউন্ড
export const NOTIFICATION_TYPE_SOUNDS = {
  ALERT: 'alert.mp3',
  REMINDER: 'reminder.mp3',
  REPORT: 'report.mp3',
  ANNOUNCEMENT: 'announcement.mp3',
  WARNING: 'warning.mp3',
  SUCCESS: 'success.mp3',
  INFO: 'info.mp3',
  ERROR: 'error.mp3',
} as const;
