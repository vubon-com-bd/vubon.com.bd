/**
 * PayPal payment gateway configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PAYPAL_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PAYPAL_ENABLED', false),
  clientId: getOptionalEnv('PAYPAL_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('PAYPAL_CLIENT_SECRET', ''),
  webhookId: getOptionalEnv('PAYPAL_WEBHOOK_ID', ''),
  baseUrl: getOptionalEnv('PAYPAL_BASE_URL', 'https://api-m.sandbox.paypal.com'),
  timeoutMs: getOptionalEnvInt('PAYPAL_TIMEOUT_MS', 30000),
  brandName: getOptionalEnv('PAYPAL_BRAND_NAME', 'Vubon'),
  landingPage: getOptionalEnv('PAYPAL_LANDING_PAGE', 'LOGIN'),
});
