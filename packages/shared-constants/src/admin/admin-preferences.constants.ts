/**
 * Admin Preferences Constants (EXTENDS common/types)
 * @module shared-constants/admin/admin-preferences.constants
 */

import { TYPES } from '../common/types.constants';

export const ADMIN_PREFERENCES = {
  // Base types from common
  ...TYPES,

  // Preference categories
  CATEGORIES: {
    GENERAL: 'general',
    NOTIFICATIONS: 'notifications',
    DISPLAY: 'display',
    LANGUAGE: 'language',
    REGIONAL: 'regional',
    ACCESSIBILITY: 'accessibility',
    PRIVACY: 'privacy',
    CONTENT: 'content',
    DASHBOARD: 'dashboard',
    REPORTS: 'reports',
    ANALYTICS: 'analytics',
    WORKFLOW: 'workflow',
    AUTOMATION: 'automation',
  } as const,

  // Preference types
  TYPES: {
    SWITCH: 'switch',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    SLIDER: 'slider',
    INPUT: 'input',
    TEXTAREA: 'textarea',
    DATE: 'date',
    TIME: 'time',
    COLOR: 'color',
    FILE: 'file',
    IMAGE: 'image',
    RANGE: 'range',
  } as const,

  // Dashboard preferences
  DASHBOARD: {
    LAYOUT: 'dashboard_layout',
    WIDGETS: 'dashboard_widgets',
    WIDGET_ORDER: 'widget_order',
    WIDGET_SIZE: 'widget_size',
    DEFAULT_VIEW: 'default_view',
    REFRESH_INTERVAL: 'refresh_interval',
    SHOW_ANNOUNCEMENTS: 'show_announcements',
    SHOW_NOTIFICATIONS: 'show_notifications',
    SHOW_STATISTICS: 'show_statistics',
    SHOW_CHARTS: 'show_charts',
    SHOW_TABLES: 'show_tables',
    SHOW_ALERTS: 'show_alerts',
  } as const,

  // Report preferences
  REPORTS: {
    DEFAULT_REPORT_TYPE: 'default_report_type',
    REPORT_FORMAT: 'report_format',
    AUTO_GENERATE: 'auto_generate',
    AUTO_SEND: 'auto_send',
    SEND_SCHEDULE: 'send_schedule',
    RECIPIENTS: 'recipients',
    INCLUDE_CHARTS: 'include_charts',
    INCLUDE_TABLES: 'include_tables',
    INCLUDE_SUMMARY: 'include_summary',
    INCLUDE_DETAILS: 'include_details',
    REPORT_TEMPLATE: 'report_template',
  } as const,

  // Analytics preferences
  ANALYTICS: {
    ENABLED: 'analytics_enabled',
    TRACK_PAGE_VIEWS: 'track_page_views',
    TRACK_USER_ACTIONS: 'track_user_actions',
    TRACK_PERFORMANCE: 'track_performance',
    TRACK_ERRORS: 'track_errors',
    ANONYMIZE_DATA: 'anonymize_data',
    DATA_RETENTION_DAYS: 'data_retention_days',
    AUTO_GENERATE_REPORTS: 'auto_generate_reports',
    REPORT_FREQUENCY: 'report_frequency',
    SHARE_DATA: 'share_data',
  } as const,

  // Workflow preferences
  WORKFLOW: {
    AUTO_APPROVE: 'auto_approve',
    AUTO_REJECT: 'auto_reject',
    ESCALATION_THRESHOLD: 'escalation_threshold',
    APPROVAL_CHAIN: 'approval_chain',
    NOTIFICATION_ON_APPROVAL: 'notification_on_approval',
    NOTIFICATION_ON_REJECTION: 'notification_on_rejection',
    NOTIFICATION_ON_ESCALATION: 'notification_on_escalation',
    TIMEOUT_DAYS: 'timeout_days',
    REMINDER_INTERVAL: 'reminder_interval',
  } as const,

  // Automation preferences
  AUTOMATION: {
    AUTO_BACKUP: 'auto_backup',
    AUTO_CLEANUP: 'auto_cleanup',
    AUTO_UPDATE: 'auto_update',
    AUTO_SCALE: 'auto_scale',
    AUTO_RESTART: 'auto_restart',
    AUTO_REPAIR: 'auto_repair',
    AUTO_OPTIMIZE: 'auto_optimize',
    SCHEDULE_BACKUP: 'schedule_backup',
    SCHEDULE_CLEANUP: 'schedule_cleanup',
    SCHEDULE_MAINTENANCE: 'schedule_maintenance',
    NOTIFICATION_ON_AUTO_ACTION: 'notification_on_auto_action',
  } as const,

  // Default values
  DEFAULTS: {
    DASHBOARD_LAYOUT: 'grid',
    DEFAULT_VIEW: 'overview',
    REFRESH_INTERVAL: 60,
    SHOW_ANNOUNCEMENTS: true,
    SHOW_NOTIFICATIONS: true,
    SHOW_STATISTICS: true,
    SHOW_CHARTS: true,
    SHOW_TABLES: true,
    SHOW_ALERTS: true,
    REPORT_FORMAT: 'pdf',
    AUTO_GENERATE: true,
    AUTO_SEND: false,
    INCLUDE_CHARTS: true,
    INCLUDE_TABLES: true,
    INCLUDE_SUMMARY: true,
    ANALYTICS_ENABLED: true,
    TRACK_PAGE_VIEWS: true,
    TRACK_USER_ACTIONS: true,
    TRACK_PERFORMANCE: true,
    TRACK_ERRORS: true,
    ANONYMIZE_DATA: true,
    DATA_RETENTION_DAYS: 90,
    AUTO_APPROVE: false,
    AUTO_REJECT: false,
    ESCALATION_THRESHOLD: 3,
    TIMEOUT_DAYS: 7,
    REMINDER_INTERVAL: 24,
    AUTO_BACKUP: true,
    AUTO_CLEANUP: true,
    AUTO_UPDATE: false,
    AUTO_OPTIMIZE: true,
  },
} as const;

export type AdminPreferenceCategory =
  (typeof ADMIN_PREFERENCES.CATEGORIES)[keyof typeof ADMIN_PREFERENCES.CATEGORIES];
export type AdminPreferenceType =
  (typeof ADMIN_PREFERENCES.TYPES)[keyof typeof ADMIN_PREFERENCES.TYPES];
