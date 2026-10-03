// Note: Cannot import from higher layer (layer isolation) — hardcode + comment
export const REPORT_PERMISSION = {
  VIEW: 'report:view',
  CREATE: 'report:create',
  UPDATE: 'report:update',
  DELETE: 'report:delete',
  EXPORT: 'report:export',
  SHARE: 'report:share',
  SCHEDULE: 'report:schedule',
  SCHEDULE_MANAGE: 'report:schedule:manage',

  DASHBOARD_VIEW: 'report:dashboard:view',
  DASHBOARD_CREATE: 'report:dashboard:create',
  DASHBOARD_UPDATE: 'report:dashboard:update',
  DASHBOARD_DELETE: 'report:dashboard:delete',
  DASHBOARD_SHARE: 'report:dashboard:share',

  TEMPLATE_VIEW: 'report:template:view',
  TEMPLATE_CREATE: 'report:template:create',
  TEMPLATE_UPDATE: 'report:template:update',
  TEMPLATE_DELETE: 'report:template:delete',

  WIDGET_VIEW: 'report:widget:view',
  WIDGET_MANAGE: 'report:widget:manage',

  FINANCIAL_VIEW: 'report:financial:view',
  FINANCIAL_EXPORT: 'report:financial:export',
  SENSITIVE_DATA_VIEW: 'report:sensitive:view',

  ADMIN_VIEW: 'admin:view',
  ADMIN_MANAGE: 'admin:manage',
} as const;

export type ReportPermissionType = (typeof REPORT_PERMISSION)[keyof typeof REPORT_PERMISSION];
