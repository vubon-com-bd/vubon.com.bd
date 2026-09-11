import { UserSettings, NotificationPreferences } from '../user/user-settings.types';
import { AdminPublic } from './admin.types';

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
 */
export interface AdminSettings extends UserSettings {
  adminId: string;
  admin: AdminPublic;
  dashboardLayout: string;
  defaultReport: string;
  adminNotifications: AdminNotificationPreferences;
  securityLevel: 'high' | 'medium' | 'low';
}
