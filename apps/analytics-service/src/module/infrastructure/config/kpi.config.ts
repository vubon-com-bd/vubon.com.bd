import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const KPI_CONFIG = Object.freeze({
  defaultThresholdPercent: getOptionalEnvInt('KPI_DEFAULT_THRESHOLD', 80),
  breachCheckIntervalSeconds: getOptionalEnvInt('KPI_BREACH_CHECK_INTERVAL', 300),
  maxKpisPerOwner: getOptionalEnvInt('KPI_MAX_PER_OWNER', 100),
  evaluateOnRecord: getOptionalEnvBool('KPI_EVALUATE_ON_RECORD', true),
  notifyOnBreach: getOptionalEnvBool('KPI_NOTIFY_ON_BREACH', true),
  historyRetentionDays: getOptionalEnvInt('KPI_HISTORY_RETENTION_DAYS', 365),
} as const);
