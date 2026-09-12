import { UserPreferences } from '../user/user-preferences.types';

/**
 * Admin preferences interface
 *
 * Design notes:
 * - Extends UserPreferences (inherits value/type/isDefault).
 * - `adminId` only — no Admin summary embed.
 * - Dashboard/quick-action customization lives here.
 */
export interface AdminPreferences extends UserPreferences {
  adminId: string;
  dashboardWidgets: string[];
  quickActions: string[];
  shortcutKeys: Record<string, string>;
}
