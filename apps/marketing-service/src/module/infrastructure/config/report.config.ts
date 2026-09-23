import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const REPORT_CONFIG = Object.freeze({
  defaultFormat: getOptionalEnv('REPORT_DEFAULT_FORMAT', 'json'),
  maxConcurrentGenerations: getOptionalEnvInt('REPORT_MAX_CONCURRENT', 3),
  retentionDays: getOptionalEnvInt('REPORT_RETENTION_DAYS', 90),
} as const);
