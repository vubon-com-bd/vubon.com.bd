import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const TRACKING_CONFIG = Object.freeze({
  updateFrequencySeconds: getOptionalEnvInt('TRACKING_UPDATE_FREQUENCY', 600),
  retentionDays: getOptionalEnvInt('TRACKING_RETENTION_DAYS', 90),
  maxEventsPerTracking: getOptionalEnvInt('TRACKING_MAX_EVENTS', 100),
} as const);
