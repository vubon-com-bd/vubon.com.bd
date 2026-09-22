import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const ACTIVITY_CONFIG = Object.freeze({
  maxActivitiesPerUser: getOptionalEnvInt('ACTIVITY_MAX_PER_USER', 1000),
  retentionDays: getOptionalEnvInt('ACTIVITY_RETENTION_DAYS', 90),
  defaultLimit: 50,
} as const);
