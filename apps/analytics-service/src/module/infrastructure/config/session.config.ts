import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const SESSION_CONFIG = Object.freeze({
  timeoutMinutes: getOptionalEnvInt('SESSION_TIMEOUT_MINUTES', 30),
  bounceThresholdSeconds: getOptionalEnvInt('SESSION_BOUNCE_THRESHOLD', 10),
  engagedMinPageViews: getOptionalEnvInt('SESSION_ENGAGED_MIN_PAGES', 3),
  engagedMinDurationSeconds: getOptionalEnvInt('SESSION_ENGAGED_MIN_DURATION', 60),
  cleanupIntervalMinutes: getOptionalEnvInt('SESSION_CLEANUP_INTERVAL', 60),
  autoCleanupEnabled: getOptionalEnvBool('SESSION_AUTO_CLEANUP', true),
  cleanupOlderThanDays: getOptionalEnvInt('SESSION_CLEANUP_OLDER_DAYS', 90),
} as const);
