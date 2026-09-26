import { getEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const AAMARPAY_CONFIG = Object.freeze({
  storeId: getEnv('AAMARPAY_STORE_ID'),
  signatureKey: getEnv('AAMARPAY_SIGNATURE_KEY'),
  baseUrl: getEnv('AAMARPAY_BASE_URL'),
  timeoutMs: getOptionalEnvInt('AAMARPAY_TIMEOUT_MS', 30000),
} as const);
