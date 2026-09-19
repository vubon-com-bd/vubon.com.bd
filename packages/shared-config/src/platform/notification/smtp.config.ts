/**
 * SMTP configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SMTP_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SMTP_ENABLED', false),
  host: getOptionalEnv('SMTP_HOST', ''),
  port: getOptionalEnvInt('SMTP_PORT', 587),
  secure: getOptionalEnvBool('SMTP_SECURE', false),
  user: getOptionalEnv('SMTP_USER', ''),
  password: getOptionalEnv('SMTP_PASSWORD', ''),
  pool: getOptionalEnvBool('SMTP_POOL', true),
  maxConnections: getOptionalEnvInt('SMTP_MAX_CONNECTIONS', 5),
  maxMessages: getOptionalEnvInt('SMTP_MAX_MESSAGES', 100),
  connectionTimeoutMs: getOptionalEnvInt('SMTP_CONNECTION_TIMEOUT_MS', 10000),
  greetingTimeoutMs: getOptionalEnvInt('SMTP_GREETING_TIMEOUT_MS', 10000),
  socketTimeoutMs: getOptionalEnvInt('SMTP_SOCKET_TIMEOUT_MS', 30000),
  tlsRejectUnauthorized: getOptionalEnvBool('SMTP_TLS_STRICT', true),
});
