/**
 * LOGIN_ATTEMPT_CONFIG — Attempt tracking configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const LOGIN_ATTEMPT_CONFIG = Object.freeze({
  trackingWindowSeconds: getOptionalEnvInt('LOGIN_ATTEMPT_WINDOW', 900),
  suspiciousIpThreshold: getOptionalEnvInt('LOGIN_ATTEMPT_IP_THRESHOLD', 20),
  suspiciousEmailThreshold: getOptionalEnvInt('LOGIN_ATTEMPT_EMAIL_THRESHOLD', 5),
  retentionDays: getOptionalEnvInt('LOGIN_ATTEMPT_RETENTION_DAYS', 90),
} as const);
