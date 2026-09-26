import { getEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const ROCKET_CONFIG = Object.freeze({
  merchantId: getEnv('ROCKET_MERCHANT_ID'),
  apiKey: getEnv('ROCKET_API_KEY'),
  apiSecret: getEnv('ROCKET_API_SECRET'),
  baseUrl: getEnv('ROCKET_BASE_URL'),
  webhookSecret: getEnv('ROCKET_WEBHOOK_SECRET'),
  timeoutMs: getOptionalEnvInt('ROCKET_TIMEOUT_MS', 30000),
} as const);
