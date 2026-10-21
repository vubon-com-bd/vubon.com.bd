/**
 * Payment Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYMENT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PAYMENT_ENABLED', true),
  defaultCurrency: getOptionalEnv('PAYMENT_CURRENCY', 'BDT'),
  minAmount: getOptionalEnvInt('PAYMENT_MIN_AMOUNT', 1),
  maxAmount: getOptionalEnvInt('PAYMENT_MAX_AMOUNT', 10_000_000),
  captureMode: getOptionalEnv('PAYMENT_CAPTURE_MODE', 'auto'),
  sessionTtlSeconds: getOptionalEnvInt('PAYMENT_SESSION_TTL', 1800),
  authTtlSeconds: getOptionalEnvInt('PAYMENT_AUTH_TTL', 604_800),
  captureWindowHours: getOptionalEnvInt('PAYMENT_CAPTURE_WINDOW_HOURS', 168),
  idempotencyEnabled: getOptionalEnvBool('PAYMENT_IDEMPOTENCY', true),
  idempotencyTtlSeconds: getOptionalEnvInt('PAYMENT_IDEMPOTENCY_TTL', 86_400),
  partialCaptureAllowed: getOptionalEnvBool('PAYMENT_PARTIAL_CAPTURE', true),
  currencyDecimals: 2,
});

export type PaymentConfig = typeof PAYMENT_CONFIG;
