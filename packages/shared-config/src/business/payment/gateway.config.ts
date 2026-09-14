/**
 * Payment gateway base configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PAYMENT_GATEWAY_CONFIG = Object.freeze({
  activeGateway: getOptionalEnv('PAYMENT_ACTIVE_GATEWAY', 'bkash'),
  environment: getOptionalEnv('PAYMENT_GATEWAY_ENV', 'sandbox'), // sandbox | production
  timeoutMs: getOptionalEnvInt('PAYMENT_GATEWAY_TIMEOUT_MS', 30000),
  retryAttempts: getOptionalEnvInt('PAYMENT_GATEWAY_RETRIES', 3),
  retryDelayMs: getOptionalEnvInt('PAYMENT_GATEWAY_RETRY_DELAY_MS', 5000),
  webhookVerification: getOptionalEnvBool('PAYMENT_WEBHOOK_VERIFY', true),
  use3ds: getOptionalEnvBool('PAYMENT_3DS_ENABLED', true),
  supportedGateways: Object.freeze([
    'bkash',
    'nagad',
    'rocket',
    'stripe',
    'paypal',
    'sslcommerz',
    'aamarpay',
  ] as const),
});
