import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const DASHBOARD_CONFIG = Object.freeze({
  maxWidgetsPerDashboard: getOptionalEnvInt('DASHBOARD_MAX_WIDGETS', 20),
  maxDashboardsPerOwner: getOptionalEnvInt('DASHBOARD_MAX_PER_OWNER', 10),
  defaultLayout: 'grid' as const,
  cacheTtlSeconds: getOptionalEnvInt('DASHBOARD_CACHE_TTL', 900),
  autoRefreshEnabled: getOptionalEnvBool('DASHBOARD_AUTO_REFRESH', true),
  autoRefreshIntervalSeconds: getOptionalEnvInt('DASHBOARD_REFRESH_INTERVAL', 60),
  enableRealtime: getOptionalEnvBool('DASHBOARD_ENABLE_REALTIME', false),
} as const);
