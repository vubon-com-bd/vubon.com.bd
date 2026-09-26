/**
 * SESSION_CONFIG — Session lifecycle configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';
import { SESSION } from '@vubon/shared-constants/infrastructure';

export const SESSION_CONFIG = Object.freeze({
  expirySeconds: getOptionalEnvInt('SESSION_EXPIRY_SECONDS', SESSION.EXPIRY_SECONDS),
  rememberMeExpirySeconds: getOptionalEnvInt('SESSION_REMEMBER_EXPIRY', SESSION.EXPIRY_REMEMBER_SECONDS),
  idleTimeoutSeconds: getOptionalEnvInt('SESSION_IDLE_TIMEOUT', SESSION.IDLE_TIMEOUT_SECONDS),
  absoluteTimeoutSeconds: getOptionalEnvInt('SESSION_ABSOLUTE_TIMEOUT', SESSION.ABSOLUTE_TIMEOUT_SECONDS),
  refreshThresholdSeconds: getOptionalEnvInt('SESSION_REFRESH_THRESHOLD', SESSION.REFRESH_THRESHOLD_SECONDS),
  maxSessionsPerUser: getOptionalEnvInt('SESSION_MAX_PER_USER', SESSION.MAX_SESSIONS_PER_USER),
  maxDevicesPerUser: getOptionalEnvInt('SESSION_MAX_DEVICES', SESSION.MAX_DEVICES_PER_USER),
  cleanupIntervalSeconds: getOptionalEnvInt('SESSION_CLEANUP_INTERVAL', SESSION.CLEANUP_INTERVAL_SECONDS),
  storeIp: getOptionalEnvBool('SESSION_STORE_IP', true),
  storeUserAgent: getOptionalEnvBool('SESSION_STORE_UA', true),
} as const);
