import { UserSettings, NotificationPreferences } from '../user/user-settings.types';
import { AdminSecurityLevel } from '@vubon/shared-constants/src/admin/admin-settings.constants';

/**
 * Admin notification preferences interface
 */
export interface AdminNotificationPreferences extends NotificationPreferences {
  adminAlerts: boolean;
  systemUpdates: boolean;
  securityAlerts: boolean;
}

/**
 * Admin settings interface
 *
 * Design notes:
 * - Extends UserSettings (inherits theme, language, timezone, currency).
 * - `adminId` only — no Admin summary embed.
 */
export interface AdminSettings extends UserSettings {
  adminId: string;
  dashboardLayout: string;
  defaultReport: string;
  adminNotifications: AdminNotificationPreferences;
  securityLevel: AdminSecurityLevel;
}
