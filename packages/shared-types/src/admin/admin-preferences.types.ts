import { UserPreferences } from '../user/user-preferences.types';
import { Admin } from './admin.types';

export interface AdminPreferences extends UserPreferences {
  preferenceId: string;
  adminId: string;
  admin: Admin;
  dashboardWidgets: string[];
  quickActions: string[];
  shortcutKeys: Record<string, string>;
  metadata: Record<string, unknown>;
}
