/**
 * PayPal Gateway Config
 * @module payment-service/infrastructure/gateways/paypal
 */
import { PAYPAL_CONFIG } from '@vubon/shared-config/business';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYMENT_PAYPAL_CONFIG = Object.freeze({
  enabled: PAYPAL_CONFIG.enabled,
  clientId: PAYPAL_CONFIG.clientId,
  clientSecret: PAYPAL_CONFIG.clientSecret,
  webhookId: PAYPAL_CONFIG.webhookId,
  baseUrl: PAYPAL_CONFIG.baseUrl,
  timeoutMs: getOptionalEnvInt('PAYMENT_PAYPAL_TIMEOUT_MS', PAYPAL_CONFIG.timeoutMs),
  brandName: getOptionalEnv('PAYMENT_PAYPAL_BRAND_NAME', PAYPAL_CONFIG.brandName),
  landingPage: getOptionalEnv('PAYMENT_PAYPAL_LANDING_PAGE', PAYPAL_CONFIG.landingPage),
  returnUrl: getOptionalEnv('PAYMENT_PAYPAL_RETURN_URL', ''),
  cancelUrl: getOptionalEnv('PAYMENT_PAYPAL_CANCEL_URL', ''),
  tokenCacheTtlSeconds: getOptionalEnvInt('PAYMENT_PAYPAL_TOKEN_TTL_SECONDS', 3000),
});
