/**
 * KPI Configuration
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const KPI_CONFIG = Object.freeze({
  evaluationEnabled: getOptionalEnvBool('ANALYTICS_KPI_EVAL_ENABLED', true),
  evaluationIntervalMs: getOptionalEnvInt('ANALYTICS_KPI_EVAL_INTERVAL_MS', 300000),
  maxKpisPerTenant: getOptionalEnvInt('ANALYTICS_KPI_MAX_PER_TENANT', 200),
  defaultThresholdPercent: getOptionalEnvInt('ANALYTICS_KPI_DEFAULT_THRESHOLD', 80),
  breachThresholdPercent: getOptionalEnvInt('ANALYTICS_KPI_BREACH_THRESHOLD', 50),
  alertOnWarning: getOptionalEnvBool('ANALYTICS_KPI_ALERT_WARNING', true),
  alertOnBreach: getOptionalEnvBool('ANALYTICS_KPI_ALERT_BREACH', true),
  notifyEmails: getOptionalEnvBool('ANALYTICS_KPI_NOTIFY_EMAILS', true),
});
