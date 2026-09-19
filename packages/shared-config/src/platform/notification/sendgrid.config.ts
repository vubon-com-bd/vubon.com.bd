/**
 * SendGrid configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SENDGRID_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SENDGRID_ENABLED', false),
  apiKey: getOptionalEnv('SENDGRID_API_KEY', ''),
  webhookSecret: getOptionalEnv('SENDGRID_WEBHOOK_SECRET', ''),
  sandboxMode: getOptionalEnvBool('SENDGRID_SANDBOX', false),
  timeoutMs: getOptionalEnvInt('SENDGRID_TIMEOUT_MS', 10000),
  maxRetries: getOptionalEnvInt('SENDGRID_MAX_RETRIES', 3),
});
