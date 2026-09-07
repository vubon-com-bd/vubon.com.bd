import { UserSettings } from '../user/user-settings.types';
import { Admin } from './admin.types';

export interface AdminNotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

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
