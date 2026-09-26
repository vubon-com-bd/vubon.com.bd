import { getEnv, getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const BKASH_CONFIG = Object.freeze({
  appKey: getEnv('BKASH_APP_KEY'),
  appSecret: getEnv('BKASH_APP_SECRET'),
  username: getEnv('BKASH_USERNAME'),
  password: getEnv('BKASH_PASSWORD'),
  baseUrl: getEnv('BKASH_BASE_URL'),
  callbackUrl: getOptionalEnv('BKASH_CALLBACK_URL', ''),
  webhookSecret: getEnv('BKASH_WEBHOOK_SECRET'),
  timeoutMs: getOptionalEnvInt('BKASH_TIMEOUT_MS', 30000),
} as const);
