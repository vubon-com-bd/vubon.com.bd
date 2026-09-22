import { getEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const STRIPE_CONFIG = Object.freeze({
  secretKey: getEnv('STRIPE_SECRET_KEY'),
  publishableKey: getEnv('STRIPE_PUBLISHABLE_KEY'),
  webhookSecret: getEnv('STRIPE_WEBHOOK_SECRET'),
  apiVersion: getEnv('STRIPE_API_VERSION'),
  timeoutMs: getOptionalEnvInt('STRIPE_TIMEOUT_MS', 30000),
} as const);
