/**
 * Admin Preferences Type Constants
 * Detailed preferences type definitions
 */

export const ADMIN_PREFERENCES_TYPE = {
  // Display preferences
  THEME: 'theme',
  THEME_LIGHT: 'theme_light',
  THEME_DARK: 'theme_dark',
  THEME_SYSTEM: 'theme_system',
  COLOR_SCHEME: 'color_scheme',
  FONT_SIZE: 'font_size',
  FONT_FAMILY: 'font_family',
  LAYOUT: 'layout',
  LAYOUT_COMPACT: 'layout_compact',
  LAYOUT_COMFORTABLE: 'layout_comfortable',
  SIDEBAR_POSITION: 'sidebar_position',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',

  // Language preferences
  LANGUAGE: 'language',
  LANGUAGE_FALLBACK: 'language_fallback',
  TIMEZONE: 'timezone',
  DATE_FORMAT: 'date_format',
  TIME_FORMAT: 'time_format',
  NUMBER_FORMAT: 'number_format',
  CURRENCY: 'currency',
  CURRENCY_POSITION: 'currency_position',
  FIRST_DAY_OF_WEEK: 'first_day_of_week',

  // Notification preferences
  NOTIFICATION_ENABLED: 'notification_enabled',
  NOTIFICATION_SOUND: 'notification_sound',
  NOTIFICATION_POPUP: 'notification_popup',
  NOTIFICATION_EMAIL: 'notification_email',
  NOTIFICATION_SMS: 'notification_sms',
  NOTIFICATION_PUSH: 'notification_push',
  NOTIFICATION_FREQUENCY: 'notification_frequency',
  NOTIFICATION_DIGEST: 'notification_digest',

  // Accessibility preferences
  HIGH_CONTRAST: 'high_contrast',
  REDUCED_MOTION: 'reduced_motion',
  SCREEN_READER: 'screen_reader',
  KEYBOARD_NAVIGATION: 'keyboard_navigation',
  FONT_SCALING: 'font_scaling',
  COLOR_BLIND_MODE: 'color_blind_mode',

  // Dashboard preferences
  DASHBOARD_LAYOUT: 'dashboard_layout',
  DASHBOARD_WIDGETS: 'dashboard_widgets',
  DASHBOARD_REFRESH: 'dashboard_refresh',
  DEFAULT_DASHBOARD: 'default_dashboard',

  // Reporting preferences
  REPORT_DEFAULT: 'report_default',
  REPORT_AUTO_GENERATE: 'report_auto_generate',
  REPORT_SCHEDULE: 'report_schedule',
  REPORT_FORMAT: 'report_format',
  REPORT_DELIVERY: 'report_delivery',

  // Analytics preferences
  ANALYTICS_ENABLED: 'analytics_enabled',
  ANALYTICS_ANONYMOUS: 'analytics_anonymous',
  ANALYTICS_COOKIES: 'analytics_cookies',
  ANALYTICS_TRACKING: 'analytics_tracking',

  // Workflow preferences
  WORKFLOW_AUTO_SAVE: 'workflow_auto_save',
  WORKFLOW_AUTO_APPROVE: 'workflow_auto_approve',
  WORKFLOW_NOTIFY: 'workflow_notify',
  WORKFLOW_ESCALATE: 'workflow_escalate',
  WORKFLOW_DEADLINE: 'workflow_deadline',

  // Team preferences
  TEAM_NOTIFICATIONS: 'team_notifications',
  TEAM_COLLABORATION: 'team_collaboration',
  TEAM_VISIBILITY: 'team_visibility',
  TEAM_EDITING: 'team_editing',
  TEAM_COMMENTS: 'team_comments',

  // Security preferences
  SESSION_TIMEOUT: 'session_timeout',
  TWO_FA_ENABLED: 'two_fa_enabled',
  PASSWORD_EXPIRY: 'password_expiry',
  LOGIN_ALERTS: 'login_alerts',
  DEVICE_MANAGEMENT: 'device_management',

  // Privacy preferences
  DATA_SHARING: 'data_sharing',
  PROFILE_VISIBILITY: 'profile_visibility',
  ACTIVITY_VISIBILITY: 'activity_visibility',
  DATA_EXPORT: 'data_export',
  DATA_DELETION: 'data_deletion',

  // Performance preferences
  CACHE_ENABLED: 'cache_enabled',
  PREFETCH_ENABLED: 'prefetch_enabled',
  LAZY_LOADING: 'lazy_loading',
  BATCH_SIZE: 'batch_size',
  DEBOUNCE_DELAY: 'debounce_delay',

  // Shortcut preferences
  KEYBOARD_SHORTCUTS: 'keyboard_shortcuts',
  SHORTCUT_CONFLICTS: 'shortcut_conflicts',
  SHORTCUT_CUSTOM: 'shortcut_custom',
} as const;

export type AdminPreferenceTypeDetail =
  (typeof ADMIN_PREFERENCES_TYPE)[keyof typeof ADMIN_PREFERENCES_TYPE];

export const ADMIN_PREFERENCES_TYPE_CATEGORIES: Record<AdminPreferenceTypeDetail, string> = {
  // Display preferences
  [ADMIN_PREFERENCES_TYPE.THEME]: 'display',
  [ADMIN_PREFERENCES_TYPE.THEME_LIGHT]: 'display',
  [ADMIN_PREFERENCES_TYPE.THEME_DARK]: 'display',
  [ADMIN_PREFERENCES_TYPE.THEME_SYSTEM]: 'display',
  [ADMIN_PREFERENCES_TYPE.COLOR_SCHEME]: 'display',
  [ADMIN_PREFERENCES_TYPE.FONT_SIZE]: 'display',
  [ADMIN_PREFERENCES_TYPE.FONT_FAMILY]: 'display',
  [ADMIN_PREFERENCES_TYPE.LAYOUT]: 'display',
  [ADMIN_PREFERENCES_TYPE.LAYOUT_COMPACT]: 'display',
  [ADMIN_PREFERENCES_TYPE.LAYOUT_COMFORTABLE]: 'display',
  [ADMIN_PREFERENCES_TYPE.SIDEBAR_POSITION]: 'display',
  [ADMIN_PREFERENCES_TYPE.SIDEBAR_COLLAPSED]: 'display',

  // Language preferences
  [ADMIN_PREFERENCES_TYPE.LANGUAGE]: 'language',
  [ADMIN_PREFERENCES_TYPE.LANGUAGE_FALLBACK]: 'language',
  [ADMIN_PREFERENCES_TYPE.TIMEZONE]: 'language',
  [ADMIN_PREFERENCES_TYPE.DATE_FORMAT]: 'language',
  [ADMIN_PREFERENCES_TYPE.TIME_FORMAT]: 'language',
  [ADMIN_PREFERENCES_TYPE.NUMBER_FORMAT]: 'language',
  [ADMIN_PREFERENCES_TYPE.CURRENCY]: 'language',
  [ADMIN_PREFERENCES_TYPE.CURRENCY_POSITION]: 'language',
  [ADMIN_PREFERENCES_TYPE.FIRST_DAY_OF_WEEK]: 'language',

  // Notification preferences
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_ENABLED]: 'notification',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_SOUND]: 'notification',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_POPUP]: 'notification',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_EMAIL]: 'notification',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_SMS]: 'notification',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_PUSH]: 'notification',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_FREQUENCY]: 'notification',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_DIGEST]: 'notification',

  // Accessibility preferences
  [ADMIN_PREFERENCES_TYPE.HIGH_CONTRAST]: 'accessibility',
  [ADMIN_PREFERENCES_TYPE.REDUCED_MOTION]: 'accessibility',
  [ADMIN_PREFERENCES_TYPE.SCREEN_READER]: 'accessibility',
  [ADMIN_PREFERENCES_TYPE.KEYBOARD_NAVIGATION]: 'accessibility',
  [ADMIN_PREFERENCES_TYPE.FONT_SCALING]: 'accessibility',
  [ADMIN_PREFERENCES_TYPE.COLOR_BLIND_MODE]: 'accessibility',

  // Dashboard preferences
  [ADMIN_PREFERENCES_TYPE.DASHBOARD_LAYOUT]: 'dashboard',
  [ADMIN_PREFERENCES_TYPE.DASHBOARD_WIDGETS]: 'dashboard',
  [ADMIN_PREFERENCES_TYPE.DASHBOARD_REFRESH]: 'dashboard',
  [ADMIN_PREFERENCES_TYPE.DEFAULT_DASHBOARD]: 'dashboard',

  // Reporting preferences
  [ADMIN_PREFERENCES_TYPE.REPORT_DEFAULT]: 'reporting',
  [ADMIN_PREFERENCES_TYPE.REPORT_AUTO_GENERATE]: 'reporting',
  [ADMIN_PREFERENCES_TYPE.REPORT_SCHEDULE]: 'reporting',
  [ADMIN_PREFERENCES_TYPE.REPORT_FORMAT]: 'reporting',
  [ADMIN_PREFERENCES_TYPE.REPORT_DELIVERY]: 'reporting',

  // Analytics preferences
  [ADMIN_PREFERENCES_TYPE.ANALYTICS_ENABLED]: 'analytics',
  [ADMIN_PREFERENCES_TYPE.ANALYTICS_ANONYMOUS]: 'analytics',
  [ADMIN_PREFERENCES_TYPE.ANALYTICS_COOKIES]: 'analytics',
  [ADMIN_PREFERENCES_TYPE.ANALYTICS_TRACKING]: 'analytics',

  // Workflow preferences
  [ADMIN_PREFERENCES_TYPE.WORKFLOW_AUTO_SAVE]: 'workflow',
  [ADMIN_PREFERENCES_TYPE.WORKFLOW_AUTO_APPROVE]: 'workflow',
  [ADMIN_PREFERENCES_TYPE.WORKFLOW_NOTIFY]: 'workflow',
  [ADMIN_PREFERENCES_TYPE.WORKFLOW_ESCALATE]: 'workflow',
  [ADMIN_PREFERENCES_TYPE.WORKFLOW_DEADLINE]: 'workflow',

  // Team preferences
  [ADMIN_PREFERENCES_TYPE.TEAM_NOTIFICATIONS]: 'team',
  [ADMIN_PREFERENCES_TYPE.TEAM_COLLABORATION]: 'team',
  [ADMIN_PREFERENCES_TYPE.TEAM_VISIBILITY]: 'team',
  [ADMIN_PREFERENCES_TYPE.TEAM_EDITING]: 'team',
  [ADMIN_PREFERENCES_TYPE.TEAM_COMMENTS]: 'team',

  // Security preferences
  [ADMIN_PREFERENCES_TYPE.SESSION_TIMEOUT]: 'security',
  [ADMIN_PREFERENCES_TYPE.TWO_FA_ENABLED]: 'security',
  [ADMIN_PREFERENCES_TYPE.PASSWORD_EXPIRY]: 'security',
  [ADMIN_PREFERENCES_TYPE.LOGIN_ALERTS]: 'security',
  [ADMIN_PREFERENCES_TYPE.DEVICE_MANAGEMENT]: 'security',

  // Privacy preferences
  [ADMIN_PREFERENCES_TYPE.DATA_SHARING]: 'privacy',
  [ADMIN_PREFERENCES_TYPE.PROFILE_VISIBILITY]: 'privacy',
  [ADMIN_PREFERENCES_TYPE.ACTIVITY_VISIBILITY]: 'privacy',
  [ADMIN_PREFERENCES_TYPE.DATA_EXPORT]: 'privacy',
  [ADMIN_PREFERENCES_TYPE.DATA_DELETION]: 'privacy',

  // Performance preferences
  [ADMIN_PREFERENCES_TYPE.CACHE_ENABLED]: 'performance',
  [ADMIN_PREFERENCES_TYPE.PREFETCH_ENABLED]: 'performance',
  [ADMIN_PREFERENCES_TYPE.LAZY_LOADING]: 'performance',
  [ADMIN_PREFERENCES_TYPE.BATCH_SIZE]: 'performance',
  [ADMIN_PREFERENCES_TYPE.DEBOUNCE_DELAY]: 'performance',

  // Shortcut preferences
  [ADMIN_PREFERENCES_TYPE.KEYBOARD_SHORTCUTS]: 'shortcuts',
  [ADMIN_PREFERENCES_TYPE.SHORTCUT_CONFLICTS]: 'shortcuts',
  [ADMIN_PREFERENCES_TYPE.SHORTCUT_CUSTOM]: 'shortcuts',
};

export const ADMIN_PREFERENCES_TYPE_LABELS_DETAIL: Record<AdminPreferenceTypeDetail, string> = {
  // Display preferences
  [ADMIN_PREFERENCES_TYPE.THEME]: 'Theme',
  [ADMIN_PREFERENCES_TYPE.THEME_LIGHT]: 'Light Theme',
  [ADMIN_PREFERENCES_TYPE.THEME_DARK]: 'Dark Theme',
  [ADMIN_PREFERENCES_TYPE.THEME_SYSTEM]: 'System Theme',
  [ADMIN_PREFERENCES_TYPE.COLOR_SCHEME]: 'Color Scheme',
  [ADMIN_PREFERENCES_TYPE.FONT_SIZE]: 'Font Size',
  [ADMIN_PREFERENCES_TYPE.FONT_FAMILY]: 'Font Family',
  [ADMIN_PREFERENCES_TYPE.LAYOUT]: 'Layout',
  [ADMIN_PREFERENCES_TYPE.LAYOUT_COMPACT]: 'Compact Layout',
  [ADMIN_PREFERENCES_TYPE.LAYOUT_COMFORTABLE]: 'Comfortable Layout',
  [ADMIN_PREFERENCES_TYPE.SIDEBAR_POSITION]: 'Sidebar Position',
  [ADMIN_PREFERENCES_TYPE.SIDEBAR_COLLAPSED]: 'Collapsed Sidebar',

  // Language preferences
  [ADMIN_PREFERENCES_TYPE.LANGUAGE]: 'Language',
  [ADMIN_PREFERENCES_TYPE.LANGUAGE_FALLBACK]: 'Fallback Language',
  [ADMIN_PREFERENCES_TYPE.TIMEZONE]: 'Timezone',
  [ADMIN_PREFERENCES_TYPE.DATE_FORMAT]: 'Date Format',
  [ADMIN_PREFERENCES_TYPE.TIME_FORMAT]: 'Time Format',
  [ADMIN_PREFERENCES_TYPE.NUMBER_FORMAT]: 'Number Format',
  [ADMIN_PREFERENCES_TYPE.CURRENCY]: 'Currency',
  [ADMIN_PREFERENCES_TYPE.CURRENCY_POSITION]: 'Currency Position',
  [ADMIN_PREFERENCES_TYPE.FIRST_DAY_OF_WEEK]: 'First Day of Week',

  // Notification preferences
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_ENABLED]: 'Enable Notifications',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_SOUND]: 'Notification Sound',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_POPUP]: 'Popup Notifications',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_EMAIL]: 'Email Notifications',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_SMS]: 'SMS Notifications',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_PUSH]: 'Push Notifications',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_FREQUENCY]: 'Notification Frequency',
  [ADMIN_PREFERENCES_TYPE.NOTIFICATION_DIGEST]: 'Notification Digest',

  // Accessibility preferences
  [ADMIN_PREFERENCES_TYPE.HIGH_CONTRAST]: 'High Contrast',
  [ADMIN_PREFERENCES_TYPE.REDUCED_MOTION]: 'Reduced Motion',
  [ADMIN_PREFERENCES_TYPE.SCREEN_READER]: 'Screen Reader',
  [ADMIN_PREFERENCES_TYPE.KEYBOARD_NAVIGATION]: 'Keyboard Navigation',
  [ADMIN_PREFERENCES_TYPE.FONT_SCALING]: 'Font Scaling',
  [ADMIN_PREFERENCES_TYPE.COLOR_BLIND_MODE]: 'Color Blind Mode',

  // Dashboard preferences
  [ADMIN_PREFERENCES_TYPE.DASHBOARD_LAYOUT]: 'Dashboard Layout',
  [ADMIN_PREFERENCES_TYPE.DASHBOARD_WIDGETS]: 'Dashboard Widgets',
  [ADMIN_PREFERENCES_TYPE.DASHBOARD_REFRESH]: 'Dashboard Refresh',
  [ADMIN_PREFERENCES_TYPE.DEFAULT_DASHBOARD]: 'Default Dashboard',

  // Reporting preferences
  [ADMIN_PREFERENCES_TYPE.REPORT_DEFAULT]: 'Default Report',
  [ADMIN_PREFERENCES_TYPE.REPORT_AUTO_GENERATE]: 'Auto Generate Reports',
  [ADMIN_PREFERENCES_TYPE.REPORT_SCHEDULE]: 'Report Schedule',
  [ADMIN_PREFERENCES_TYPE.REPORT_FORMAT]: 'Report Format',
  [ADMIN_PREFERENCES_TYPE.REPORT_DELIVERY]: 'Report Delivery',

  // Analytics preferences
  [ADMIN_PREFERENCES_TYPE.ANALYTICS_ENABLED]: 'Enable Analytics',
  [ADMIN_PREFERENCES_TYPE.ANALYTICS_ANONYMOUS]: 'Anonymous Analytics',
  [ADMIN_PREFERENCES_TYPE.ANALYTICS_COOKIES]: 'Analytics Cookies',
  [ADMIN_PREFERENCES_TYPE.ANALYTICS_TRACKING]: 'Analytics Tracking',

  // Workflow preferences
  [ADMIN_PREFERENCES_TYPE.WORKFLOW_AUTO_SAVE]: 'Auto Save',
  [ADMIN_PREFERENCES_TYPE.WORKFLOW_AUTO_APPROVE]: 'Auto Approve',
  [ADMIN_PREFERENCES_TYPE.WORKFLOW_NOTIFY]: 'Workflow Notifications',
  [ADMIN_PREFERENCES_TYPE.WORKFLOW_ESCALATE]: 'Auto Escalate',
  [ADMIN_PREFERENCES_TYPE.WORKFLOW_DEADLINE]: 'Workflow Deadline',

  // Team preferences
  [ADMIN_PREFERENCES_TYPE.TEAM_NOTIFICATIONS]: 'Team Notifications',
  [ADMIN_PREFERENCES_TYPE.TEAM_COLLABORATION]: 'Team Collaboration',
  [ADMIN_PREFERENCES_TYPE.TEAM_VISIBILITY]: 'Team Visibility',
  [ADMIN_PREFERENCES_TYPE.TEAM_EDITING]: 'Team Editing',
  [ADMIN_PREFERENCES_TYPE.TEAM_COMMENTS]: 'Team Comments',

  // Security preferences
  [ADMIN_PREFERENCES_TYPE.SESSION_TIMEOUT]: 'Session Timeout',
  [ADMIN_PREFERENCES_TYPE.TWO_FA_ENABLED]: 'Two-Factor Auth',
  [ADMIN_PREFERENCES_TYPE.PASSWORD_EXPIRY]: 'Password Expiry',
  [ADMIN_PREFERENCES_TYPE.LOGIN_ALERTS]: 'Login Alerts',
  [ADMIN_PREFERENCES_TYPE.DEVICE_MANAGEMENT]: 'Device Management',

  // Privacy preferences
  [ADMIN_PREFERENCES_TYPE.DATA_SHARING]: 'Data Sharing',
  [ADMIN_PREFERENCES_TYPE.PROFILE_VISIBILITY]: 'Profile Visibility',
  [ADMIN_PREFERENCES_TYPE.ACTIVITY_VISIBILITY]: 'Activity Visibility',
  [ADMIN_PREFERENCES_TYPE.DATA_EXPORT]: 'Data Export',
  [ADMIN_PREFERENCES_TYPE.DATA_DELETION]: 'Data Deletion',

  // Performance preferences
  [ADMIN_PREFERENCES_TYPE.CACHE_ENABLED]: 'Enable Cache',
  [ADMIN_PREFERENCES_TYPE.PREFETCH_ENABLED]: 'Enable Prefetch',
  [ADMIN_PREFERENCES_TYPE.LAZY_LOADING]: 'Lazy Loading',
  [ADMIN_PREFERENCES_TYPE.BATCH_SIZE]: 'Batch Size',
  [ADMIN_PREFERENCES_TYPE.DEBOUNCE_DELAY]: 'Debounce Delay',

  // Shortcut preferences
  [ADMIN_PREFERENCES_TYPE.KEYBOARD_SHORTCUTS]: 'Keyboard Shortcuts',
  [ADMIN_PREFERENCES_TYPE.SHORTCUT_CONFLICTS]: 'Shortcut Conflicts',
  [ADMIN_PREFERENCES_TYPE.SHORTCUT_CUSTOM]: 'Custom Shortcuts',
};

export function getAdminPreferenceTypeCategory(type: AdminPreferenceTypeDetail): string {
  return ADMIN_PREFERENCES_TYPE_CATEGORIES[type] || 'other';
}

export function getAdminPreferenceTypeLabel(type: AdminPreferenceTypeDetail): string {
  return ADMIN_PREFERENCES_TYPE_LABELS_DETAIL[type] || 'Unknown Type';
}

export function isAdminPreferenceDisplayType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'display';
}

export function isAdminPreferenceLanguageType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'language';
}

export function isAdminPreferenceNotificationType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'notification';
}

export function isAdminPreferenceAccessibilityType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'accessibility';
}

export function isAdminPreferenceDashboardType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'dashboard';
}

export function isAdminPreferenceReportingType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'reporting';
}

export function isAdminPreferenceAnalyticsType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'analytics';
}

export function isAdminPreferenceWorkflowType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'workflow';
}

export function isAdminPreferenceTeamType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'team';
}

export function isAdminPreferenceSecurityType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'security';
}

export function isAdminPreferencePrivacyType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'privacy';
}

export function isAdminPreferencePerformanceType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'performance';
}

export function isAdminPreferenceShortcutType(type: AdminPreferenceTypeDetail): boolean {
  return getAdminPreferenceTypeCategory(type) === 'shortcuts';
}

export function getAdminPreferenceTypeCategoryDuplicate(type: AdminPreferenceTypeDetail): string {
  return ADMIN_PREFERENCES_TYPE_CATEGORIES[type] || 'other';
}
