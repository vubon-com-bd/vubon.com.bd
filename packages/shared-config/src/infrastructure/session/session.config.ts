/**
 * Session configuration
 * @module shared-config/infrastructure/session
 *
 * Values আসে shared-constants/infrastructure/session.constants থেকে।
 */
import { SESSION } from '@vubon/shared-constants/infrastructure';
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SESSION_CONFIG = Object.freeze({
  driver: getOptionalEnv('SESSION_DRIVER', 'redis'),
  secret: getOptionalEnv('SESSION_SECRET', ''),
  name: getOptionalEnv('SESSION_NAME', 'vubon.sid'),
  ttlSeconds: getOptionalEnvInt('SESSION_TTL_SECONDS', SESSION.EXPIRY_SECONDS),
  rememberMeTtlSeconds: getOptionalEnvInt(
    'SESSION_REMEMBER_TTL_SECONDS',
    SESSION.EXPIRY_REMEMBER_SECONDS
  ),
  idleTimeoutSeconds: getOptionalEnvInt(
    'SESSION_IDLE_TIMEOUT_SECONDS',
    SESSION.IDLE_TIMEOUT_SECONDS
  ),
  absoluteTimeoutSeconds: getOptionalEnvInt(
    'SESSION_ABSOLUTE_TIMEOUT_SECONDS',
    SESSION.ABSOLUTE_TIMEOUT_SECONDS
  ),
  refreshThresholdSeconds: getOptionalEnvInt(
    'SESSION_REFRESH_THRESHOLD_SECONDS',
    SESSION.REFRESH_THRESHOLD_SECONDS
  ),
  maxSessionsPerUser: getOptionalEnvInt('SESSION_MAX_PER_USER', SESSION.MAX_SESSIONS_PER_USER),
  maxDevicesPerUser: getOptionalEnvInt(
    'SESSION_MAX_DEVICES_PER_USER',
    SESSION.MAX_DEVICES_PER_USER
  ),
  cleanupIntervalSeconds: getOptionalEnvInt(
    'SESSION_CLEANUP_INTERVAL_SECONDS',
    SESSION.CLEANUP_INTERVAL_SECONDS
  ),
  rolling: getOptionalEnvBool('SESSION_ROLLING', true),
  saveUninitialized: getOptionalEnvBool('SESSION_SAVE_UNINITIALIZED', false),
  resave: getOptionalEnvBool('SESSION_RESAVE', false),
} as const);

export type SessionConfig = typeof SESSION_CONFIG;
