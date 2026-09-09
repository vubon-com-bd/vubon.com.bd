import { UserSettings } from '../user/user-settings.types';
import { Admin } from './admin.types';
import { NotificationPreferences } from '../auth/auth-preferences.types';

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
  settingsId: string;
  adminId: string;
  admin: Admin;
  dashboardLayout: string;
  defaultReport: string;
  adminNotifications: AdminNotificationPreferences;
  securityLevel: 'high' | 'medium' | 'low';
  metadata: Record<string, unknown>;
}
