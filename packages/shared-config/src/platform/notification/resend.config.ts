/**
 * Resend email provider configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const RESEND_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('RESEND_ENABLED', false),
  apiKey: getOptionalEnv('RESEND_API_KEY', ''),
  baseUrl: getOptionalEnv('RESEND_BASE_URL', 'https://api.resend.com'),
  fromEmail: getOptionalEnv('RESEND_FROM_EMAIL', 'onboarding@resend.dev'),
  fromName: getOptionalEnv('RESEND_FROM_NAME', 'Vubon'),
  webhookSecret: getOptionalEnv('RESEND_WEBHOOK_SECRET', ''),
  timeoutMs: getOptionalEnvInt('RESEND_TIMEOUT_MS', 15000),
  maxRetries: getOptionalEnvInt('RESEND_MAX_RETRIES', 3),
});
