/**
 * bKash Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const BKASH_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('BKASH_ENABLED', false),
  appKey: getOptionalEnv('BKASH_APP_KEY', ''),
  appSecret: getOptionalEnv('BKASH_APP_SECRET', ''),
  username: getOptionalEnv('BKASH_USERNAME', ''),
  password: getOptionalEnv('BKASH_PASSWORD', ''),
  baseUrl: getOptionalEnv('BKASH_BASE_URL', 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'),
  callbackUrl: getOptionalEnv('BKASH_CALLBACK_URL', ''),
  timeoutMs: getOptionalEnvInt('BKASH_TIMEOUT_MS', 30_000),
  tokenCacheTtlSeconds: getOptionalEnvInt('BKASH_TOKEN_TTL_SECONDS', 3300),
  intent: getOptionalEnv('BKASH_INTENT', 'sale'),
});

export type BkashInfraConfig = typeof BKASH_INFRA_CONFIG;
