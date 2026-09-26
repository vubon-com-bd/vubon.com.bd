import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const FUNNEL_CONFIG = Object.freeze({
  minSteps: getOptionalEnvInt('FUNNEL_MIN_STEPS', 2),
  maxSteps: getOptionalEnvInt('FUNNEL_MAX_STEPS', 20),
  analysisCacheTtlSeconds: getOptionalEnvInt('FUNNEL_ANALYSIS_CACHE_TTL', 1800),
  maxFunnelsPerOwner: getOptionalEnvInt('FUNNEL_MAX_PER_OWNER', 20),
  alertOnDropOffAbove: getOptionalEnvInt('FUNNEL_ALERT_DROPOFF', 70),
  enableAlerts: getOptionalEnvBool('FUNNEL_ENABLE_ALERTS', true),
} as const);
