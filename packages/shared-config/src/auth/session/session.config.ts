/**
 * Auth session configuration
 * @module shared-config/auth/session
 *
 * Values আসে shared-constants/auth থেকে।
 */
import { AUTH_SESSION } from '@vubon/shared-constants/auth';
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const AUTH_SESSION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AUTH_SESSION_ENABLED', true),
  expirySeconds: AUTH_SESSION.EXPIRY_SECONDS,
  rememberMeExpirySeconds: AUTH_SESSION.REMEMBER_ME_EXPIRY_SECONDS,
  idleTimeoutSeconds: AUTH_SESSION.IDLE_TIMEOUT_SECONDS,
  absoluteTimeoutSeconds: AUTH_SESSION.ABSOLUTE_TIMEOUT_SECONDS,
  refreshThresholdSeconds: AUTH_SESSION.REFRESH_THRESHOLD_SECONDS,
  maxSessionsPerUser: AUTH_SESSION.MAX_SESSIONS_PER_USER,
  concurrentLoginAllowed: AUTH_SESSION.CONCURRENT_LOGIN_ALLOWED,
  storeIp: AUTH_SESSION.STORE_IP,
  storeUserAgent: AUTH_SESSION.STORE_USER_AGENT,
  maxActiveSessions: getOptionalEnvInt('AUTH_MAX_ACTIVE_SESSIONS', 10),
});
