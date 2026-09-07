import { NOTIFICATION_TYPES } from '../common/notification.constants';

export const ADMIN_NOTIFICATION = {
  ...NOTIFICATION_TYPES,
  ADMIN_ALERT: 'admin_alert',
  SYSTEM_MONITOR: 'system_monitor',
  USER_REPORT: 'user_report',
  AUDIT_LOG: 'audit_log',
} as const;
