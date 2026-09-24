import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const WEBHOOK_CONFIG = Object.freeze({
  timeoutMs: getOptionalEnvInt('WEBHOOK_TIMEOUT_MS', 10000),
  maxRetries: getOptionalEnvInt('WEBHOOK_MAX_RETRIES', 3),
  signatureHeader: getOptionalEnv('WEBHOOK_SIGNATURE_HEADER', 'x-vubon-signature'),
  maxActivePerUser: getOptionalEnvInt('WEBHOOK_MAX_ACTIVE', 50),
});
