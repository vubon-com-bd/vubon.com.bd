/**
 * SSLCommerz Gateway Config
 * @module payment-service/infrastructure/gateways/sslcommerz
 */
import { SSLCOMMERZ_CONFIG } from '@vubon/shared-config/business';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYMENT_SSLCOMMERZ_CONFIG = Object.freeze({
  enabled: SSLCOMMERZ_CONFIG.enabled,
  storeId: SSLCOMMERZ_CONFIG.storeId,
  storePassword: SSLCOMMERZ_CONFIG.storePassword,
  baseUrl: SSLCOMMERZ_CONFIG.baseUrl,
  successUrl: SSLCOMMERZ_CONFIG.successUrl,
  failUrl: SSLCOMMERZ_CONFIG.failUrl,
  cancelUrl: SSLCOMMERZ_CONFIG.cancelUrl,
  ipnUrl: getOptionalEnv('PAYMENT_SSLCOMMERZ_IPN_URL', ''),
  timeoutMs: getOptionalEnvInt(
    'PAYMENT_SSLCOMMERZ_TIMEOUT_MS',
    SSLCOMMERZ_CONFIG.timeoutMs,
  ),
  sandbox: getOptionalEnv('PAYMENT_SSLCOMMERZ_SANDBOX', 'true') === 'true',
});
