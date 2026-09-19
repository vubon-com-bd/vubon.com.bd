import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SESSION_CONFIG = Object.freeze({
  ttlSeconds: getOptionalEnvInt('SESSION_TTL', 86400),
  maxSessionsPerUser: getOptionalEnvInt('SESSION_MAX_PER_USER', 10),
  refreshTtlSeconds: getOptionalEnvInt('SESSION_REFRESH_TTL', 604800),
  cleanupIntervalSeconds: getOptionalEnvInt('SESSION_CLEANUP_INTERVAL', 3600),
} as const);
