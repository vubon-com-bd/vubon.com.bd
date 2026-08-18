/**
 * সাপোর্ট স্ক্রিপ্টের বিভিন্ন ক্যাটাগরি সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * স্ক্রিপ্ট ক্যাটাগরি
 */
export const SCRIPT_CATEGORY = {
  TICKET_SCRIPT: 'ticket_script',
  AUTOMATION_SCRIPT: 'automation_script',
  REPORT_SCRIPT: 'report_script',
  INTEGRATION_SCRIPT: 'integration_script',
  MIGRATION_SCRIPT: 'migration_script',
  DATA_SCRIPT: 'data_script',
  UTILITY_SCRIPT: 'utility_script',
  MAINTENANCE_SCRIPT: 'maintenance_script',
  SECURITY_SCRIPT: 'security_script',
  TESTING_SCRIPT: 'testing_script',
  DEPLOYMENT_SCRIPT: 'deployment_script',
  BACKUP_SCRIPT: 'backup_script',
  CLEANUP_SCRIPT: 'cleanup_script',
  VALIDATION_SCRIPT: 'validation_script',
  NOTIFICATION_SCRIPT: 'notification_script',
  EMAIL_SCRIPT: 'email_script',
  CHATBOT_SCRIPT: 'chatbot_script',
  WORKFLOW_SCRIPT: 'workflow_script',
  ANALYTICS_SCRIPT: 'analytics_script',
  SYNC_SCRIPT: 'sync_script',
  IMPORT_SCRIPT: 'import_script',
  EXPORT_SCRIPT: 'export_script',
  MONITORING_SCRIPT: 'monitoring_script',
  ALERT_SCRIPT: 'alert_script',
  RECOVERY_SCRIPT: 'recovery_script',
} as const;

/**
 * স্ক্রিপ্ট ক্যাটাগরির ডিসপ্লে নাম
 */
export const SCRIPT_CATEGORY_DISPLAY_NAMES = {
  [SCRIPT_CATEGORY.TICKET_SCRIPT]: 'টিকেট স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.AUTOMATION_SCRIPT]: 'অটোমেশন স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.REPORT_SCRIPT]: 'রিপোর্ট স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.INTEGRATION_SCRIPT]: 'ইন্টিগ্রেশন স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.MIGRATION_SCRIPT]: 'মাইগ্রেশন স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.DATA_SCRIPT]: 'ডেটা স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.UTILITY_SCRIPT]: 'ইউটিলিটি স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.MAINTENANCE_SCRIPT]: 'মেইনটেন্যান্স স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.SECURITY_SCRIPT]: 'সিকিউরিটি স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.TESTING_SCRIPT]: 'টেস্টিং স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.DEPLOYMENT_SCRIPT]: 'ডিপ্লয়মেন্ট স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.BACKUP_SCRIPT]: 'ব্যাকআপ স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.CLEANUP_SCRIPT]: 'ক্লিনআপ স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.VALIDATION_SCRIPT]: 'ভ্যালিডেশন স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.NOTIFICATION_SCRIPT]: 'নোটিফিকেশন স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.EMAIL_SCRIPT]: 'ইমেইল স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.CHATBOT_SCRIPT]: 'চ্যাটবট স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.WORKFLOW_SCRIPT]: 'ওয়ার্কফ্লো স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.ANALYTICS_SCRIPT]: 'অ্যানালিটিক্স স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.SYNC_SCRIPT]: 'সিঙ্ক স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.IMPORT_SCRIPT]: 'ইমপোর্ট স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.EXPORT_SCRIPT]: 'এক্সপোর্ট স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.MONITORING_SCRIPT]: 'মনিটরিং স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.ALERT_SCRIPT]: 'অ্যালার্ট স্ক্রিপ্ট',
  [SCRIPT_CATEGORY.RECOVERY_SCRIPT]: 'রিকাভারি স্ক্রিপ্ট',
} as const;

/**
 * স্ক্রিপ্ট ক্যাটাগরির আইকন (অনুষঙ্গিক নাম)
 */
export const SCRIPT_CATEGORY_ICONS = {
  [SCRIPT_CATEGORY.TICKET_SCRIPT]: 'ticket',
  [SCRIPT_CATEGORY.AUTOMATION_SCRIPT]: 'zap',
  [SCRIPT_CATEGORY.REPORT_SCRIPT]: 'file-text',
  [SCRIPT_CATEGORY.INTEGRATION_SCRIPT]: 'link',
  [SCRIPT_CATEGORY.MIGRATION_SCRIPT]: 'arrow-right-circle',
  [SCRIPT_CATEGORY.DATA_SCRIPT]: 'database',
  [SCRIPT_CATEGORY.UTILITY_SCRIPT]: 'tool',
  [SCRIPT_CATEGORY.MAINTENANCE_SCRIPT]: 'wrench',
  [SCRIPT_CATEGORY.SECURITY_SCRIPT]: 'shield',
  [SCRIPT_CATEGORY.TESTING_SCRIPT]: 'beaker',
  [SCRIPT_CATEGORY.DEPLOYMENT_SCRIPT]: 'rocket',
  [SCRIPT_CATEGORY.BACKUP_SCRIPT]: 'hard-drive',
  [SCRIPT_CATEGORY.CLEANUP_SCRIPT]: 'trash-2',
  [SCRIPT_CATEGORY.VALIDATION_SCRIPT]: 'check-circle',
  [SCRIPT_CATEGORY.NOTIFICATION_SCRIPT]: 'bell',
  [SCRIPT_CATEGORY.EMAIL_SCRIPT]: 'mail',
  [SCRIPT_CATEGORY.CHATBOT_SCRIPT]: 'bot',
  [SCRIPT_CATEGORY.WORKFLOW_SCRIPT]: 'workflow',
  [SCRIPT_CATEGORY.ANALYTICS_SCRIPT]: 'bar-chart',
  [SCRIPT_CATEGORY.SYNC_SCRIPT]: 'refresh-cw',
  [SCRIPT_CATEGORY.IMPORT_SCRIPT]: 'download',
  [SCRIPT_CATEGORY.EXPORT_SCRIPT]: 'upload',
  [SCRIPT_CATEGORY.MONITORING_SCRIPT]: 'eye',
  [SCRIPT_CATEGORY.ALERT_SCRIPT]: 'alert-circle',
  [SCRIPT_CATEGORY.RECOVERY_SCRIPT]: 'rotate-ccw',
} as const;

/**
 * স্ক্রিপ্ট ক্যাটাগরির রঙের কোড (হেক্স)
 */
export const SCRIPT_CATEGORY_COLORS = {
  [SCRIPT_CATEGORY.TICKET_SCRIPT]: '#e67e22',
  [SCRIPT_CATEGORY.AUTOMATION_SCRIPT]: '#2ecc71',
  [SCRIPT_CATEGORY.REPORT_SCRIPT]: '#3498db',
  [SCRIPT_CATEGORY.INTEGRATION_SCRIPT]: '#9b59b6',
  [SCRIPT_CATEGORY.MIGRATION_SCRIPT]: '#f39c12',
  [SCRIPT_CATEGORY.DATA_SCRIPT]: '#1abc9c',
  [SCRIPT_CATEGORY.UTILITY_SCRIPT]: '#95a5a6',
  [SCRIPT_CATEGORY.MAINTENANCE_SCRIPT]: '#e67e22',
  [SCRIPT_CATEGORY.SECURITY_SCRIPT]: '#e74c3c',
  [SCRIPT_CATEGORY.TESTING_SCRIPT]: '#3498db',
  [SCRIPT_CATEGORY.DEPLOYMENT_SCRIPT]: '#2ecc71',
  [SCRIPT_CATEGORY.BACKUP_SCRIPT]: '#34495e',
  [SCRIPT_CATEGORY.CLEANUP_SCRIPT]: '#7f8c8d',
  [SCRIPT_CATEGORY.VALIDATION_SCRIPT]: '#27ae60',
  [SCRIPT_CATEGORY.NOTIFICATION_SCRIPT]: '#f39c12',
  [SCRIPT_CATEGORY.EMAIL_SCRIPT]: '#2980b9',
  [SCRIPT_CATEGORY.CHATBOT_SCRIPT]: '#3498db',
  [SCRIPT_CATEGORY.WORKFLOW_SCRIPT]: '#1abc9c',
  [SCRIPT_CATEGORY.ANALYTICS_SCRIPT]: '#8e44ad',
  [SCRIPT_CATEGORY.SYNC_SCRIPT]: '#3498db',
  [SCRIPT_CATEGORY.IMPORT_SCRIPT]: '#27ae60',
  [SCRIPT_CATEGORY.EXPORT_SCRIPT]: '#e67e22',
  [SCRIPT_CATEGORY.MONITORING_SCRIPT]: '#2980b9',
  [SCRIPT_CATEGORY.ALERT_SCRIPT]: '#e74c3c',
  [SCRIPT_CATEGORY.RECOVERY_SCRIPT]: '#2ecc71',
} as const;

/**
 * স্ক্রিপ্ট ক্যাটাগরি গ্রুপ
 */
export const SCRIPT_CATEGORY_GROUPS = {
  TICKET: ['ticket_script'],
  AUTOMATION: ['automation_script', 'workflow_script', 'chatbot_script'],
  REPORTING: ['report_script', 'analytics_script'],
  INTEGRATION: ['integration_script', 'sync_script', 'import_script', 'export_script'],
  DATA: ['data_script', 'migration_script', 'backup_script', 'recovery_script'],
  UTILITY: ['utility_script', 'validation_script'],
  MAINTENANCE: ['maintenance_script', 'cleanup_script', 'deployment_script'],
  SECURITY: ['security_script', 'monitoring_script', 'alert_script'],
  TESTING: ['testing_script'],
  COMMUNICATION: ['notification_script', 'email_script'],
} as const;

export type ScriptCategory = (typeof SCRIPT_CATEGORY)[keyof typeof SCRIPT_CATEGORY];
export type ScriptCategoryDisplayNames = typeof SCRIPT_CATEGORY_DISPLAY_NAMES;
export type ScriptCategoryIcons = typeof SCRIPT_CATEGORY_ICONS;
export type ScriptCategoryColors = typeof SCRIPT_CATEGORY_COLORS;
export type ScriptCategoryGroups = typeof SCRIPT_CATEGORY_GROUPS;

export type ScriptCategoryGroup = keyof typeof SCRIPT_CATEGORY_GROUPS;

export interface ScriptCategoryConfig {
  category: ScriptCategory;
  displayName: string;
  icon: string;
  color: string;
  group: ScriptCategoryGroup;
  description?: string;
}

/**
 * স্ক্রিপ্ট ক্যাটাগরি কনফিগারেশন অবজেক্ট
 */
export const SCRIPT_CATEGORY_CONFIGS: Record<ScriptCategory, ScriptCategoryConfig> = {
  [SCRIPT_CATEGORY.TICKET_SCRIPT]: {
    category: SCRIPT_CATEGORY.TICKET_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.TICKET_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.TICKET_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.TICKET_SCRIPT],
    group: 'TICKET',
    description: 'টিকেট প্রক্রিয়াকরণের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.AUTOMATION_SCRIPT]: {
    category: SCRIPT_CATEGORY.AUTOMATION_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.AUTOMATION_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.AUTOMATION_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.AUTOMATION_SCRIPT],
    group: 'AUTOMATION',
    description: 'অটোমেশন কাজের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.REPORT_SCRIPT]: {
    category: SCRIPT_CATEGORY.REPORT_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.REPORT_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.REPORT_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.REPORT_SCRIPT],
    group: 'REPORTING',
    description: 'রিপোর্ট তৈরির জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.INTEGRATION_SCRIPT]: {
    category: SCRIPT_CATEGORY.INTEGRATION_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.INTEGRATION_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.INTEGRATION_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.INTEGRATION_SCRIPT],
    group: 'INTEGRATION',
    description: 'তৃতীয় পক্ষের সাথে ইন্টিগ্রেশনের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.MIGRATION_SCRIPT]: {
    category: SCRIPT_CATEGORY.MIGRATION_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.MIGRATION_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.MIGRATION_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.MIGRATION_SCRIPT],
    group: 'DATA',
    description: 'ডেটা মাইগ্রেশনের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.DATA_SCRIPT]: {
    category: SCRIPT_CATEGORY.DATA_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.DATA_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.DATA_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.DATA_SCRIPT],
    group: 'DATA',
    description: 'ডেটা প্রক্রিয়াকরণের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.UTILITY_SCRIPT]: {
    category: SCRIPT_CATEGORY.UTILITY_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.UTILITY_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.UTILITY_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.UTILITY_SCRIPT],
    group: 'UTILITY',
    description: 'সাধারণ ইউটিলিটি কাজের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.MAINTENANCE_SCRIPT]: {
    category: SCRIPT_CATEGORY.MAINTENANCE_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.MAINTENANCE_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.MAINTENANCE_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.MAINTENANCE_SCRIPT],
    group: 'MAINTENANCE',
    description: 'সিস্টেম মেইনটেন্যান্সের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.SECURITY_SCRIPT]: {
    category: SCRIPT_CATEGORY.SECURITY_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.SECURITY_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.SECURITY_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.SECURITY_SCRIPT],
    group: 'SECURITY',
    description: 'সিকিউরিটি সংক্রান্ত কাজের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.TESTING_SCRIPT]: {
    category: SCRIPT_CATEGORY.TESTING_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.TESTING_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.TESTING_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.TESTING_SCRIPT],
    group: 'TESTING',
    description: 'টেস্টিং অটোমেশনের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.DEPLOYMENT_SCRIPT]: {
    category: SCRIPT_CATEGORY.DEPLOYMENT_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.DEPLOYMENT_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.DEPLOYMENT_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.DEPLOYMENT_SCRIPT],
    group: 'MAINTENANCE',
    description: 'ডিপ্লয়মেন্টের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.BACKUP_SCRIPT]: {
    category: SCRIPT_CATEGORY.BACKUP_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.BACKUP_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.BACKUP_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.BACKUP_SCRIPT],
    group: 'DATA',
    description: 'ব্যাকআপ নেওয়ার জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.CLEANUP_SCRIPT]: {
    category: SCRIPT_CATEGORY.CLEANUP_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.CLEANUP_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.CLEANUP_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.CLEANUP_SCRIPT],
    group: 'MAINTENANCE',
    description: 'ক্লিনআপ কাজের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.VALIDATION_SCRIPT]: {
    category: SCRIPT_CATEGORY.VALIDATION_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.VALIDATION_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.VALIDATION_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.VALIDATION_SCRIPT],
    group: 'UTILITY',
    description: 'ভ্যালিডেশন কাজের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.NOTIFICATION_SCRIPT]: {
    category: SCRIPT_CATEGORY.NOTIFICATION_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.NOTIFICATION_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.NOTIFICATION_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.NOTIFICATION_SCRIPT],
    group: 'COMMUNICATION',
    description: 'নোটিফিকেশন পাঠানোর জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.EMAIL_SCRIPT]: {
    category: SCRIPT_CATEGORY.EMAIL_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.EMAIL_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.EMAIL_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.EMAIL_SCRIPT],
    group: 'COMMUNICATION',
    description: 'ইমেইল পাঠানোর জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.CHATBOT_SCRIPT]: {
    category: SCRIPT_CATEGORY.CHATBOT_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.CHATBOT_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.CHATBOT_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.CHATBOT_SCRIPT],
    group: 'AUTOMATION',
    description: 'চ্যাটবট ইন্টিগ্রেশনের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.WORKFLOW_SCRIPT]: {
    category: SCRIPT_CATEGORY.WORKFLOW_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.WORKFLOW_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.WORKFLOW_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.WORKFLOW_SCRIPT],
    group: 'AUTOMATION',
    description: 'ওয়ার্কফ্লো অটোমেশনের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.ANALYTICS_SCRIPT]: {
    category: SCRIPT_CATEGORY.ANALYTICS_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.ANALYTICS_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.ANALYTICS_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.ANALYTICS_SCRIPT],
    group: 'REPORTING',
    description: 'অ্যানালিটিক্স প্রক্রিয়াকরণের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.SYNC_SCRIPT]: {
    category: SCRIPT_CATEGORY.SYNC_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.SYNC_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.SYNC_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.SYNC_SCRIPT],
    group: 'INTEGRATION',
    description: 'ডেটা সিঙ্ক্রোনাইজেশনের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.IMPORT_SCRIPT]: {
    category: SCRIPT_CATEGORY.IMPORT_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.IMPORT_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.IMPORT_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.IMPORT_SCRIPT],
    group: 'INTEGRATION',
    description: 'ডেটা ইমপোর্টের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.EXPORT_SCRIPT]: {
    category: SCRIPT_CATEGORY.EXPORT_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.EXPORT_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.EXPORT_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.EXPORT_SCRIPT],
    group: 'INTEGRATION',
    description: 'ডেটা এক্সপোর্টের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.MONITORING_SCRIPT]: {
    category: SCRIPT_CATEGORY.MONITORING_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.MONITORING_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.MONITORING_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.MONITORING_SCRIPT],
    group: 'SECURITY',
    description: 'সিস্টেম মনিটরিংয়ের জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.ALERT_SCRIPT]: {
    category: SCRIPT_CATEGORY.ALERT_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.ALERT_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.ALERT_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.ALERT_SCRIPT],
    group: 'SECURITY',
    description: 'অ্যালার্ট পাঠানোর জন্য স্ক্রিপ্ট',
  },
  [SCRIPT_CATEGORY.RECOVERY_SCRIPT]: {
    category: SCRIPT_CATEGORY.RECOVERY_SCRIPT,
    displayName: SCRIPT_CATEGORY_DISPLAY_NAMES[SCRIPT_CATEGORY.RECOVERY_SCRIPT],
    icon: SCRIPT_CATEGORY_ICONS[SCRIPT_CATEGORY.RECOVERY_SCRIPT],
    color: SCRIPT_CATEGORY_COLORS[SCRIPT_CATEGORY.RECOVERY_SCRIPT],
    group: 'DATA',
    description: 'ডেটা রিকাভারির জন্য স্ক্রিপ্ট',
  },
};

/**
 * স্ক্রিপ্ট ক্যাটাগরি গ্রুপ কনফিগারেশন
 */
export const SCRIPT_CATEGORY_GROUP_CONFIGS: Record<
  ScriptCategoryGroup,
  {
    group: ScriptCategoryGroup;
    displayName: string;
    icon: string;
    color: string;
    categories: readonly ScriptCategory[];
    description?: string;
  }
> = {
  TICKET: {
    group: 'TICKET',
    displayName: 'টিকেট',
    icon: 'ticket',
    color: '#e67e22',
    categories: ['ticket_script'] as const,
    description: 'টিকেট সম্পর্কিত স্ক্রিপ্ট',
  },
  AUTOMATION: {
    group: 'AUTOMATION',
    displayName: 'অটোমেশন',
    icon: 'zap',
    color: '#2ecc71',
    categories: ['automation_script', 'workflow_script', 'chatbot_script'] as const,
    description: 'অটোমেশন সম্পর্কিত স্ক্রিপ্ট',
  },
  REPORTING: {
    group: 'REPORTING',
    displayName: 'রিপোর্টিং',
    icon: 'file-text',
    color: '#3498db',
    categories: ['report_script', 'analytics_script'] as const,
    description: 'রিপোর্ট ও অ্যানালিটিক্স স্ক্রিপ্ট',
  },
  INTEGRATION: {
    group: 'INTEGRATION',
    displayName: 'ইন্টিগ্রেশন',
    icon: 'link',
    color: '#9b59b6',
    categories: ['integration_script', 'sync_script', 'import_script', 'export_script'] as const,
    description: 'ইন্টিগ্রেশন সম্পর্কিত স্ক্রিপ্ট',
  },
  DATA: {
    group: 'DATA',
    displayName: 'ডেটা',
    icon: 'database',
    color: '#1abc9c',
    categories: ['data_script', 'migration_script', 'backup_script', 'recovery_script'] as const,
    description: 'ডেটা সম্পর্কিত স্ক্রিপ্ট',
  },
  UTILITY: {
    group: 'UTILITY',
    displayName: 'ইউটিলিটি',
    icon: 'tool',
    color: '#95a5a6',
    categories: ['utility_script', 'validation_script'] as const,
    description: 'ইউটিলিটি স্ক্রিপ্ট',
  },
  MAINTENANCE: {
    group: 'MAINTENANCE',
    displayName: 'মেইনটেন্যান্স',
    icon: 'wrench',
    color: '#e67e22',
    categories: ['maintenance_script', 'cleanup_script', 'deployment_script'] as const,
    description: 'মেইনটেন্যান্স সম্পর্কিত স্ক্রিপ্ট',
  },
  SECURITY: {
    group: 'SECURITY',
    displayName: 'সিকিউরিটি',
    icon: 'shield',
    color: '#e74c3c',
    categories: ['security_script', 'monitoring_script', 'alert_script'] as const,
    description: 'সিকিউরিটি সম্পর্কিত স্ক্রিপ্ট',
  },
  TESTING: {
    group: 'TESTING',
    displayName: 'টেস্টিং',
    icon: 'beaker',
    color: '#3498db',
    categories: ['testing_script'] as const,
    description: 'টেস্টিং সম্পর্কিত স্ক্রিপ্ট',
  },
  COMMUNICATION: {
    group: 'COMMUNICATION',
    displayName: 'যোগাযোগ',
    icon: 'mail',
    color: '#2980b9',
    categories: ['notification_script', 'email_script'] as const,
    description: 'যোগাযোগ সম্পর্কিত স্ক্রিপ্ট',
  },
};

/**
 * স্ক্রিপ্ট ক্যাটাগরি স্ট্যাটাস
 */
export const SCRIPT_CATEGORY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEPRECATED: 'deprecated',
} as const;

export type ScriptCategoryStatus =
  (typeof SCRIPT_CATEGORY_STATUS)[keyof typeof SCRIPT_CATEGORY_STATUS];
