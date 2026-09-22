import { getEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SSLCOMMERZ_CONFIG = Object.freeze({
  storeId: getEnv('SSLCOMMERZ_STORE_ID'),
  storePassword: getEnv('SSLCOMMERZ_STORE_PASSWORD'),
  baseUrl: getEnv('SSLCOMMERZ_BASE_URL'),
  webhookSecret: getEnv('SSLCOMMERZ_WEBHOOK_SECRET'),
  timeoutMs: getOptionalEnvInt('SSLCOMMERZ_TIMEOUT_MS', 30000),
} as const);
