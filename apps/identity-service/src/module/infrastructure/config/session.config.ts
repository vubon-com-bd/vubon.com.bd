/**
 * Session Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';
import { SESSION } from '@vubon/shared-constants/infrastructure';

export const AUTH_SESSION_CONFIG = Object.freeze({
  defaultExpirySeconds: getOptionalEnvInt('SESSION_EXPIRY', SESSION.EXPIRY_SECONDS),
  rememberMeExpirySeconds: getOptionalEnvInt(
    'SESSION_REMEMBER_EXPIRY',
    SESSION.EXPIRY_REMEMBER_SECONDS,
  ),
  idleTimeoutSeconds: getOptionalEnvInt('SESSION_IDLE_TIMEOUT', SESSION.IDLE_TIMEOUT_SECONDS),
  absoluteTimeoutSeconds: getOptionalEnvInt(
    'SESSION_ABSOLUTE_TIMEOUT',
    SESSION.ABSOLUTE_TIMEOUT_SECONDS,
  ),
  maxSessionsPerUser: getOptionalEnvInt(
    'SESSION_MAX_PER_USER',
    SESSION.MAX_SESSIONS_PER_USER,
  ),
  rotateOnRefresh: getOptionalEnvBool('SESSION_ROTATE_ON_REFRESH', true),
  trackIp: getOptionalEnvBool('SESSION_TRACK_IP', true),
  trackUserAgent: getOptionalEnvBool('SESSION_TRACK_UA', true),
});
