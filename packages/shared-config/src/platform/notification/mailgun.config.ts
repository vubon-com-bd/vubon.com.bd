/**
 * Mailgun configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const MAILGUN_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('MAILGUN_ENABLED', false),
  apiKey: getOptionalEnv('MAILGUN_API_KEY', ''),
  domain: getOptionalEnv('MAILGUN_DOMAIN', ''),
  region: getOptionalEnv('MAILGUN_REGION', 'us'), // us | eu
  webhookSecret: getOptionalEnv('MAILGUN_WEBHOOK_SECRET', ''),
  timeoutMs: getOptionalEnvInt('MAILGUN_TIMEOUT_MS', 10000),
});
