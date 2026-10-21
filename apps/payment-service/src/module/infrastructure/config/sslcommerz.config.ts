/**
 * SSLCommerz Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SSLCOMMERZ_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SSLCOMMERZ_ENABLED', false),
  storeId: getOptionalEnv('SSLCOMMERZ_STORE_ID', ''),
  storePassword: getOptionalEnv('SSLCOMMERZ_STORE_PASSWORD', ''),
  baseUrl: getOptionalEnv('SSLCOMMERZ_BASE_URL', 'https://sandbox.sslcommerz.com'),
  successUrl: getOptionalEnv('SSLCOMMERZ_SUCCESS_URL', ''),
  failUrl: getOptionalEnv('SSLCOMMERZ_FAIL_URL', ''),
  cancelUrl: getOptionalEnv('SSLCOMMERZ_CANCEL_URL', ''),
  ipnUrl: getOptionalEnv('SSLCOMMERZ_IPN_URL', ''),
  timeoutMs: getOptionalEnvInt('SSLCOMMERZ_TIMEOUT_MS', 30_000),
});

export type SslcommerzInfraConfig = typeof SSLCOMMERZ_INFRA_CONFIG;
