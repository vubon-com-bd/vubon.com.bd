/**
 * Admin Settings Constants
 * @module shared-constants/admin/admin-settings
 */

export const ADMIN_SETTINGS_CONST = {
  SECURITY_LEVEL: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  DASHBOARD_LAYOUT: {
    COMPACT: 'compact',
    COMFORTABLE: 'comfortable',
    WIDE: 'wide',
  } as const,
} as const;

export type AdminSecurityLevel =
  (typeof ADMIN_SETTINGS_CONST.SECURITY_LEVEL)[keyof typeof ADMIN_SETTINGS_CONST.SECURITY_LEVEL];

export type AdminDashboardLayout =
  (typeof ADMIN_SETTINGS_CONST.DASHBOARD_LAYOUT)[keyof typeof ADMIN_SETTINGS_CONST.DASHBOARD_LAYOUT];
