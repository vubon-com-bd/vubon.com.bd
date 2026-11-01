/**
 * PayPal Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYPAL_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PAYPAL_ENABLED', false),
  clientId: getOptionalEnv('PAYPAL_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('PAYPAL_CLIENT_SECRET', ''),
  webhookId: getOptionalEnv('PAYPAL_WEBHOOK_ID', ''),
  baseUrl: getOptionalEnv('PAYPAL_BASE_URL', 'https://api-m.sandbox.paypal.com'),
  timeoutMs: getOptionalEnvInt('PAYPAL_TIMEOUT_MS', 30_000),
  brandName: getOptionalEnv('PAYPAL_BRAND_NAME', 'Vubon'),
  landingPage: getOptionalEnv('PAYPAL_LANDING_PAGE', 'LOGIN'),
  tokenCacheTtlSeconds: getOptionalEnvInt('PAYPAL_TOKEN_TTL_SECONDS', 3000),
});

export type PaypalInfraConfig = typeof PAYPAL_INFRA_CONFIG;
