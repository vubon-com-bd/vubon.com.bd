/**
 * Payment base configuration
 * @module shared-config/business/payment
 */
import { CURRENCY } from '@vubon/shared-constants/common';
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PAYMENT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PAYMENT_ENABLED', true),
  defaultCurrency: getOptionalEnv('PAYMENT_CURRENCY', CURRENCY.BDT),
  minAmount: getOptionalEnvInt('PAYMENT_MIN_AMOUNT', 1),
  maxAmount: getOptionalEnvInt('PAYMENT_MAX_AMOUNT', 10000000),
  captureMode: getOptionalEnv('PAYMENT_CAPTURE_MODE', 'auto'), // auto | manual
  sessionTtlSeconds: getOptionalEnvInt('PAYMENT_SESSION_TTL', 1800),
  authTtlSeconds: getOptionalEnvInt('PAYMENT_AUTH_TTL', 604800),
  captureWindowHours: getOptionalEnvInt('PAYMENT_CAPTURE_WINDOW_HOURS', 168),
  idempotencyEnabled: getOptionalEnvBool('PAYMENT_IDEMPOTENCY', true),
  idempotencyTtlSeconds: getOptionalEnvInt('PAYMENT_IDEMPOTENCY_TTL', 86400),
  currencyDecimals: 2,
  partialCaptureAllowed: getOptionalEnvBool('PAYMENT_PARTIAL_CAPTURE', true),
});
