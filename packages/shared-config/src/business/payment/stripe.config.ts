/**
 * Stripe payment gateway configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const STRIPE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('STRIPE_ENABLED', false),
  publishableKey: getOptionalEnv('STRIPE_PUBLISHABLE_KEY', ''),
  secretKey: getOptionalEnv('STRIPE_SECRET_KEY', ''),
  webhookSecret: getOptionalEnv('STRIPE_WEBHOOK_SECRET', ''),
  apiVersion: getOptionalEnv('STRIPE_API_VERSION', '2024-10-28.acacia'),
  timeoutMs: getOptionalEnvInt('STRIPE_TIMEOUT_MS', 30000),
  maxRetries: getOptionalEnvInt('STRIPE_MAX_RETRIES', 3),
  captureMethod: getOptionalEnv('STRIPE_CAPTURE_METHOD', 'automatic'),
});
