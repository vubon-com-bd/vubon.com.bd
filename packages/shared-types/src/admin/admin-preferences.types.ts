import { UserPreferences } from '../user/user-preferences.types';
import { AdminPublic } from './admin.types';

/**
 * Admin preferences interface
 */
export interface AdminPreferences extends UserPreferences {
  adminId: string;
  admin: AdminPublic;
  dashboardWidgets: string[];
  quickActions: string[];
  shortcutKeys: Record<string, string>;
}
