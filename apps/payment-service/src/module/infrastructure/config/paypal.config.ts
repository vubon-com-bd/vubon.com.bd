import { getEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYPAL_CONFIG = Object.freeze({
  clientId: getEnv('PAYPAL_CLIENT_ID'),
  clientSecret: getEnv('PAYPAL_CLIENT_SECRET'),
  webhookId: getEnv('PAYPAL_WEBHOOK_ID'),
  baseUrl: getEnv('PAYPAL_BASE_URL'),
  timeoutMs: getOptionalEnvInt('PAYPAL_TIMEOUT_MS', 30000),
} as const);
