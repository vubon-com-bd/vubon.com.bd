/**
 * Stripe Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const STRIPE_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('STRIPE_ENABLED', false),
  publishableKey: getOptionalEnv('STRIPE_PUBLISHABLE_KEY', ''),
  secretKey: getOptionalEnv('STRIPE_SECRET_KEY', ''),
  webhookSecret: getOptionalEnv('STRIPE_WEBHOOK_SECRET', ''),
  apiVersion: getOptionalEnv('STRIPE_API_VERSION', '2024-10-28.acacia'),
  timeoutMs: getOptionalEnvInt('STRIPE_TIMEOUT_MS', 30_000),
  maxRetries: getOptionalEnvInt('STRIPE_MAX_RETRIES', 3),
  captureMethod: getOptionalEnv('STRIPE_CAPTURE_METHOD', 'automatic'),
});

export type StripeInfraConfig = typeof STRIPE_INFRA_CONFIG;
