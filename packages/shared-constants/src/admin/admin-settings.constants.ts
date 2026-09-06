/**
 * Admin Settings Constants (EXTENDS common/types)
 * @module shared-constants/admin/admin-settings.constants
 */

import { TYPES } from '../common/types.constants';

export const ADMIN_SETTINGS = {
  // Base types from common
  ...TYPES,

  // Setting categories
  CATEGORIES: {
    ACCOUNT: 'account',
    SECURITY: 'security',
    PRIVACY: 'privacy',
    NOTIFICATIONS: 'notifications',
    PREFERENCES: 'preferences',
    APPEARANCE: 'appearance',
    LANGUAGE: 'language',
    REGIONAL: 'regional',
    ACCESSIBILITY: 'accessibility',
    INTEGRATIONS: 'integrations',
    ADVANCED: 'advanced',
    SYSTEM: 'system',
    MONITORING: 'monitoring',
    MAINTENANCE: 'maintenance',
  } as const,

  // Setting types
  TYPES: {
    BOOLEAN: 'boolean',
    STRING: 'string',
    NUMBER: 'number',
    SELECT: 'select',
    MULTI_SELECT: 'multi_select',
    TEXT: 'text',
    TEXTAREA: 'textarea',
    JSON: 'json',
    DATE: 'date',
    TIME: 'time',
    DATETIME: 'datetime',
    COLOR: 'color',
    FILE: 'file',
    IMAGE: 'image',
    PASSWORD: 'password',
    URL: 'url',
    EMAIL: 'email',
    PHONE: 'phone',
    RANGE: 'range',
  } as const,

  // System settings
  SYSTEM: {
    SYSTEM_NAME: 'system_name',
    SYSTEM_URL: 'system_url',
    SYSTEM_EMAIL: 'system_email',
    SYSTEM_TIMEZONE: 'system_timezone',
    SYSTEM_LANGUAGE: 'system_language',
    SYSTEM_CURRENCY: 'system_currency',
    MAINTENANCE_MODE: 'maintenance_mode',
    DEBUG_MODE: 'debug_mode',
    LOG_LEVEL: 'log_level',
    CACHE_ENABLED: 'cache_enabled',
    CACHE_TTL: 'cache_ttl',
    SESSION_TIMEOUT: 'session_timeout',
    MAX_LOGIN_ATTEMPTS: 'max_login_attempts',
    PASSWORD_POLICY: 'password_policy',
    TWO_FACTOR_AUTH: 'two_factor_auth',
  } as const,

  // Security settings
  SECURITY: {
    IP_WHITELIST: 'ip_whitelist',
    IP_BLACKLIST: 'ip_blacklist',
    ALLOWED_ORIGINS: 'allowed_origins',
    CORS_ENABLED: 'cors_enabled',
    SSL_ENABLED: 'ssl_enabled',
    SSL_CERTIFICATE: 'ssl_certificate',
    API_KEY_REQUIRED: 'api_key_required',
    RATE_LIMIT_ENABLED: 'rate_limit_enabled',
    RATE_LIMIT_MAX: 'rate_limit_max',
    RATE_LIMIT_WINDOW: 'rate_limit_window',
    CSRF_ENABLED: 'csrf_enabled',
    XSS_PROTECTION: 'xss_protection',
    SQL_INJECTION_PROTECTION: 'sql_injection_protection',
  } as const,

  // Monitoring settings
  MONITORING: {
    ENABLED: 'monitoring_enabled',
    METRICS_ENABLED: 'metrics_enabled',
    TRACING_ENABLED: 'tracing_enabled',
    LOGGING_ENABLED: 'logging_enabled',
    ALERTING_ENABLED: 'alerting_enabled',
    METRICS_RETENTION_DAYS: 'metrics_retention_days',
    LOGS_RETENTION_DAYS: 'logs_retention_days',
    ALERT_CHANNELS: 'alert_channels',
    ALERT_THRESHOLDS: 'alert_thresholds',
    HEALTH_CHECK_ENABLED: 'health_check_enabled',
    PERFORMANCE_MONITORING: 'performance_monitoring',
    ERROR_TRACKING: 'error_tracking',
  } as const,

  // Maintenance settings
  MAINTENANCE: {
    AUTO_BACKUP_ENABLED: 'auto_backup_enabled',
    AUTO_BACKUP_INTERVAL: 'auto_backup_interval',
    AUTO_BACKUP_RETENTION: 'auto_backup_retention',
    AUTO_CLEANUP_ENABLED: 'auto_cleanup_enabled',
    AUTO_CLEANUP_INTERVAL: 'auto_cleanup_interval',
    AUTO_CLEANUP_RETENTION: 'auto_cleanup_retention',
    AUTO_UPDATE_ENABLED: 'auto_update_enabled',
    AUTO_UPDATE_INTERVAL: 'auto_update_interval',
    MAINTENANCE_SCHEDULE: 'maintenance_schedule',
    MAINTENANCE_WINDOW: 'maintenance_window',
    EMAIL_REPORTS: 'email_reports',
    EMAIL_REPORT_INTERVAL: 'email_report_interval',
  } as const,

  // Default values
  DEFAULTS: {
    SYSTEM_NAME: 'Admin Panel',
    SYSTEM_LANGUAGE: 'bn',
    SYSTEM_TIMEZONE: 'Asia/Dhaka',
    SYSTEM_CURRENCY: 'BDT',
    MAINTENANCE_MODE: false,
    DEBUG_MODE: false,
    LOG_LEVEL: 'info',
    CACHE_ENABLED: true,
    CACHE_TTL: 3600,
    SESSION_TIMEOUT: 28800,
    MAX_LOGIN_ATTEMPTS: 5,
    TWO_FACTOR_AUTH: true,
    CORS_ENABLED: true,
    SSL_ENABLED: true,
    API_KEY_REQUIRED: true,
    RATE_LIMIT_ENABLED: true,
    RATE_LIMIT_MAX: 1000,
    RATE_LIMIT_WINDOW: 60,
    CSRF_ENABLED: true,
    XSS_PROTECTION: true,
    SQL_INJECTION_PROTECTION: true,
    MONITORING_ENABLED: true,
    METRICS_ENABLED: true,
    TRACING_ENABLED: true,
    LOGGING_ENABLED: true,
    ALERTING_ENABLED: true,
    HEALTH_CHECK_ENABLED: true,
    PERFORMANCE_MONITORING: true,
    ERROR_TRACKING: true,
    AUTO_BACKUP_ENABLED: true,
    AUTO_BACKUP_INTERVAL: 'daily',
    AUTO_BACKUP_RETENTION: 30,
    AUTO_CLEANUP_ENABLED: true,
    AUTO_CLEANUP_INTERVAL: 'weekly',
    AUTO_CLEANUP_RETENTION: 90,
    AUTO_UPDATE_ENABLED: false,
  },
} as const;

export type AdminSettingCategory =
  (typeof ADMIN_SETTINGS.CATEGORIES)[keyof typeof ADMIN_SETTINGS.CATEGORIES];
export type AdminSettingType = (typeof ADMIN_SETTINGS.TYPES)[keyof typeof ADMIN_SETTINGS.TYPES];
