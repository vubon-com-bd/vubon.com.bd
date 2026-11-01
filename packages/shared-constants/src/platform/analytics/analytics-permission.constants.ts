// Note: Cannot import from higher layer (layer isolation) — hardcode + comment
export const ANALYTICS_PERMISSION = {
  DASHBOARD_VIEW: 'analytics:dashboard:view',
  DASHBOARD_MANAGE: 'analytics:dashboard:manage',

  REPORT_VIEW: 'analytics:report:view',
  REPORT_CREATE: 'analytics:report:create',
  REPORT_UPDATE: 'analytics:report:update',
  REPORT_DELETE: 'analytics:report:delete',
  REPORT_EXPORT: 'analytics:report:export',

  DATA_VIEW: 'analytics:data:view',
  DATA_EXPORT: 'analytics:data:export',
  DATA_DELETE: 'analytics:data:delete',

  EVENT_TRACK: 'analytics:event:track',
  EVENT_MANAGE: 'analytics:event:manage',

  METRIC_VIEW: 'analytics:metric:view',
  METRIC_MANAGE: 'analytics:metric:manage',

  SEGMENT_VIEW: 'analytics:segment:view',
  SEGMENT_MANAGE: 'analytics:segment:manage',

  FUNNEL_VIEW: 'analytics:funnel:view',
  FUNNEL_MANAGE: 'analytics:funnel:manage',

  COHORT_VIEW: 'analytics:cohort:view',
  COHORT_MANAGE: 'analytics:cohort:manage',

  ATTRIBUTION_VIEW: 'analytics:attribution:view',
  ATTRIBUTION_MANAGE: 'analytics:attribution:manage',

  ADMIN_VIEW: 'admin:view',
  ADMIN_MANAGE: 'admin:manage',
} as const;

export type AnalyticsPermissionType =
  (typeof ANALYTICS_PERMISSION)[keyof typeof ANALYTICS_PERMISSION];
