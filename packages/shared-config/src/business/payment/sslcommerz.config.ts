/**
 * SSLCommerz payment gateway configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SSLCOMMERZ_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SSLCOMMERZ_ENABLED', false),
  storeId: getOptionalEnv('SSLCOMMERZ_STORE_ID', ''),
  storePassword: getOptionalEnv('SSLCOMMERZ_STORE_PASSWORD', ''),
  baseUrl: getOptionalEnv('SSLCOMMERZ_BASE_URL', 'https://sandbox.sslcommerz.com'),
  successUrl: getOptionalEnv('SSLCOMMERZ_SUCCESS_URL', ''),
  failUrl: getOptionalEnv('SSLCOMMERZ_FAIL_URL', ''),
  cancelUrl: getOptionalEnv('SSLCOMMERZ_CANCEL_URL', ''),
  timeoutMs: getOptionalEnvInt('SSLCOMMERZ_TIMEOUT_MS', 30000),
});
