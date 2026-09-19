export const REPORT_DASHBOARD_TYPE = {
  EXECUTIVE: 'executive',
  OPERATIONAL: 'operational',
  ANALYTICAL: 'analytical',
  FINANCIAL: 'financial',
  MARKETING: 'marketing',
  SALES: 'sales',
  SUPPORT: 'support',
  CUSTOM: 'custom',
} as const;

export const REPORT_DASHBOARD_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  SHARED: 'shared',
} as const;

export const REPORT_DASHBOARD_LAYOUT = {
  GRID: 'grid',
  MASONRY: 'masonry',
  FLEX: 'flex',
  FREE_FORM: 'free_form',
} as const;

export const REPORT_DASHBOARD = {
  NAME_MAX_LENGTH: 150,
  DESCRIPTION_MAX_LENGTH: 1000,
  MAX_WIDGETS: 50,
  MAX_DASHBOARDS_PER_USER: 50,
  MAX_SHARED_USERS: 100,
  REFRESH_INTERVAL_SECONDS: 300,
  AUTO_REFRESH: true,
  ALLOW_FULLSCREEN: true,
  ALLOW_EXPORT: true,
  THEME_DEFAULT: 'light',
  RETENTION_DAYS: 365,
} as const;

export type ReportDashboardTypeType =
  (typeof REPORT_DASHBOARD_TYPE)[keyof typeof REPORT_DASHBOARD_TYPE];
export type ReportDashboardStatusType =
  (typeof REPORT_DASHBOARD_STATUS)[keyof typeof REPORT_DASHBOARD_STATUS];
export type ReportDashboardLayoutType =
  (typeof REPORT_DASHBOARD_LAYOUT)[keyof typeof REPORT_DASHBOARD_LAYOUT];
