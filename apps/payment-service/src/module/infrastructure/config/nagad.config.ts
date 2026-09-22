import { getEnv, getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const NAGAD_CONFIG = Object.freeze({
  merchantId: getEnv('NAGAD_MERCHANT_ID'),
  merchantPrivateKey: getEnv('NAGAD_MERCHANT_PRIVATE_KEY'),
  nagadPublicKey: getEnv('NAGAD_PUBLIC_KEY'),
  baseUrl: getEnv('NAGAD_BASE_URL'),
  callbackUrl: getOptionalEnv('NAGAD_CALLBACK_URL', ''),
  webhookSecret: getEnv('NAGAD_WEBHOOK_SECRET'),
  timeoutMs: getOptionalEnvInt('NAGAD_TIMEOUT_MS', 30000),
} as const);
