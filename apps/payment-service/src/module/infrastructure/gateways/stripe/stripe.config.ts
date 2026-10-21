/**
 * Stripe Gateway Config
 * @module payment-service/infrastructure/gateways/stripe
 */
import { STRIPE_CONFIG } from '@vubon/shared-config/business';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYMENT_STRIPE_CONFIG = Object.freeze({
  enabled: STRIPE_CONFIG.enabled,
  secretKey: STRIPE_CONFIG.secretKey,
  publishableKey: STRIPE_CONFIG.publishableKey,
  webhookSecret: STRIPE_CONFIG.webhookSecret,
  apiVersion: STRIPE_CONFIG.apiVersion,
  timeoutMs: getOptionalEnvInt('PAYMENT_STRIPE_TIMEOUT_MS', STRIPE_CONFIG.timeoutMs),
  maxRetries: getOptionalEnvInt('PAYMENT_STRIPE_MAX_RETRIES', STRIPE_CONFIG.maxRetries),
  captureMethod: getOptionalEnv('PAYMENT_STRIPE_CAPTURE_METHOD', STRIPE_CONFIG.captureMethod),
  returnUrl: getOptionalEnv('PAYMENT_STRIPE_RETURN_URL', ''),
  successUrl: getOptionalEnv('PAYMENT_STRIPE_SUCCESS_URL', ''),
  cancelUrl: getOptionalEnv('PAYMENT_STRIPE_CANCEL_URL', ''),
});
