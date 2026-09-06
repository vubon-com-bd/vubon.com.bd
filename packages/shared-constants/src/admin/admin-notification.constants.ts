/**
 * Admin Notification Constants (EXTENDS common/types + user-notification.constants)
 * @module shared-constants/admin/admin-notification.constants
 */

import { TYPES } from '../common/types.constants';
import { NOTIFICATION } from '../common/notification.constants';

export const ADMIN_NOTIFICATION = {
  // Base types from common
  ...TYPES,

  // Base notification from common
  ...NOTIFICATION,

  // Admin notification channels
  ADMIN_CHANNEL: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
    SLACK: 'slack',
    TELEGRAM: 'telegram',
    WHATSAPP: 'whatsapp',
    SYSTEM: 'system',
    DASHBOARD: 'dashboard',
    ALERT: 'alert',
    PAGER_DUTY: 'pager_duty',
    OPS_GENIE: 'ops_genie',
  } as const,

  // Admin notification types
  ADMIN_TYPE: {
    // System
    SYSTEM_ALERT: 'system_alert',
    SYSTEM_UPDATE: 'system_update',
    SYSTEM_MAINTENANCE: 'system_maintenance',
    SYSTEM_ERROR: 'system_error',
    SYSTEM_WARNING: 'system_warning',

    // Security
    SECURITY_ALERT: 'security_alert',
    SECURITY_BREACH: 'security_breach',
    LOGIN_ALERT: 'login_alert',
    LOGIN_FAILED: 'login_failed',
    SUSPICIOUS_ACTIVITY: 'suspicious_activity',
    IP_BLOCKED: 'ip_blocked',
    IP_UNBLOCKED: 'ip_unblocked',

    // Admin actions
    ADMIN_CREATED: 'admin_created',
    ADMIN_UPDATED: 'admin_updated',
    ADMIN_DELETED: 'admin_deleted',
    ADMIN_BLOCKED: 'admin_blocked',
    ADMIN_UNBLOCKED: 'admin_unblocked',
    ADMIN_ROLE_CHANGED: 'admin_role_changed',
    ADMIN_PERMISSION_CHANGED: 'admin_permission_changed',

    // Audit
    AUDIT_ALERT: 'audit_alert',
    AUDIT_REPORT: 'audit_report',
    COMPLIANCE_ALERT: 'compliance_alert',
    REGULATORY_ALERT: 'regulatory_alert',

    // Performance
    PERFORMANCE_ALERT: 'performance_alert',
    SLOW_RESPONSE: 'slow_response',
    HIGH_LOAD: 'high_load',
    HIGH_MEMORY: 'high_memory',
    HIGH_CPU: 'high_cpu',
    DISK_SPACE_WARNING: 'disk_space_warning',

    // Backup
    BACKUP_COMPLETED: 'backup_completed',
    BACKUP_FAILED: 'backup_failed',
    BACKUP_RESTORED: 'backup_restored',
    BACKUP_RESTORE_FAILED: 'backup_restore_failed',

    // Update
    UPDATE_AVAILABLE: 'update_available',
    UPDATE_INSTALLED: 'update_installed',
    UPDATE_FAILED: 'update_failed',

    // Approval
    APPROVAL_REQUEST: 'approval_request',
    APPROVAL_GRANTED: 'approval_granted',
    APPROVAL_REJECTED: 'approval_rejected',
    APPROVAL_EXPIRED: 'approval_expired',

    // Custom
    CUSTOM_ALERT: 'custom_alert',
    CUSTOM_NOTIFICATION: 'custom_notification',
  } as const,

  // Admin notification priority
  ADMIN_PRIORITY: {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
    URGENT: 3,
    CRITICAL: 4,
    EMERGENCY: 5,
  } as const,

  // Admin notification status
  ADMIN_STATUS: {
    PENDING: 'pending',
    QUEUED: 'queued',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    ACKNOWLEDGED: 'acknowledged',
    RESOLVED: 'resolved',
    ESCALATED: 'escalated',
  } as const,

  // Admin notification settings
  SETTINGS: {
    EMAIL_ENABLED: true,
    SMS_ENABLED: true,
    PUSH_ENABLED: true,
    IN_APP_ENABLED: true,
    SLACK_ENABLED: false,
    TELEGRAM_ENABLED: false,
    DASHBOARD_ENABLED: true,
    ALERT_ENABLED: true,
    PAGER_DUTY_ENABLED: false,
    OPS_GENIE_ENABLED: false,
    MAX_RETRY: 3,
    RETRY_DELAY: 300,
    BATCH_SIZE: 50,
    CONCURRENCY: 5,
  },

  // Admin notification limits
  LIMITS: {
    MAX_PER_DAY: 1000,
    MAX_PER_HOUR: 100,
    MAX_PER_MINUTE: 20,
    MAX_PER_ADMIN: 500,
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY_SECONDS: 300,
    BATCH_SIZE: 50,
    QUEUE_SIZE: 10000,
  },

  // Admin notification templates
  TEMPLATES: {
    SYSTEM_ALERT: 'system_alert',
    SECURITY_ALERT: 'security_alert',
    PERFORMANCE_ALERT: 'performance_alert',
    BACKUP_COMPLETED: 'backup_completed',
    BACKUP_FAILED: 'backup_failed',
    UPDATE_AVAILABLE: 'update_available',
    APPROVAL_REQUEST: 'approval_request',
    ADMIN_CREATED: 'admin_created',
    ADMIN_UPDATED: 'admin_updated',
    ADMIN_DELETED: 'admin_deleted',
    AUDIT_ALERT: 'audit_alert',
  } as const,

  // Default values
  DEFAULTS: {
    PRIORITY: 'medium',
    STATUS: 'pending',
    CHANNEL: 'email',
    RETRY_ATTEMPTS: 0,
    ACKNOWLEDGED: false,
    RESOLVED: false,
    ESCALATED: false,
  },
} as const;

export type AdminNotificationChannel =
  (typeof ADMIN_NOTIFICATION.ADMIN_CHANNEL)[keyof typeof ADMIN_NOTIFICATION.ADMIN_CHANNEL];
export type AdminNotificationType =
  (typeof ADMIN_NOTIFICATION.ADMIN_TYPE)[keyof typeof ADMIN_NOTIFICATION.ADMIN_TYPE];
export type AdminNotificationPriority =
  (typeof ADMIN_NOTIFICATION.ADMIN_PRIORITY)[keyof typeof ADMIN_NOTIFICATION.ADMIN_PRIORITY];
export type AdminNotificationStatus =
  (typeof ADMIN_NOTIFICATION.ADMIN_STATUS)[keyof typeof ADMIN_NOTIFICATION.ADMIN_STATUS];
export type AdminNotificationTemplate =
  (typeof ADMIN_NOTIFICATION.TEMPLATES)[keyof typeof ADMIN_NOTIFICATION.TEMPLATES];
