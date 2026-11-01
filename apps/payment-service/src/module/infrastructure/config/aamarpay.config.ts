/**
 * aamarPay Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const AAMARPAY_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AAMARPAY_ENABLED', false),
  storeId: getOptionalEnv('AAMARPAY_STORE_ID', ''),
  signatureKey: getOptionalEnv('AAMARPAY_SIGNATURE_KEY', ''),
  baseUrl: getOptionalEnv('AAMARPAY_BASE_URL', 'https://sandbox.aamarpay.com'),
  successUrl: getOptionalEnv('AAMARPAY_SUCCESS_URL', ''),
  failUrl: getOptionalEnv('AAMARPAY_FAIL_URL', ''),
  cancelUrl: getOptionalEnv('AAMARPAY_CANCEL_URL', ''),
  ipnUrl: getOptionalEnv('AAMARPAY_IPN_URL', ''),
  timeoutMs: getOptionalEnvInt('AAMARPAY_TIMEOUT_MS', 30_000),
});

export type AamarpayInfraConfig = typeof AAMARPAY_INFRA_CONFIG;
