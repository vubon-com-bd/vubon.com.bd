/**
 * aamarPay payment gateway configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const AAMARPAY_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AAMARPAY_ENABLED', false),
  storeId: getOptionalEnv('AAMARPAY_STORE_ID', ''),
  signatureKey: getOptionalEnv('AAMARPAY_SIGNATURE_KEY', ''),
  baseUrl: getOptionalEnv('AAMARPAY_BASE_URL', 'https://sandbox.aamarpay.com'),
  successUrl: getOptionalEnv('AAMARPAY_SUCCESS_URL', ''),
  failUrl: getOptionalEnv('AAMARPAY_FAIL_URL', ''),
  cancelUrl: getOptionalEnv('AAMARPAY_CANCEL_URL', ''),
  timeoutMs: getOptionalEnvInt('AAMARPAY_TIMEOUT_MS', 30000),
});
