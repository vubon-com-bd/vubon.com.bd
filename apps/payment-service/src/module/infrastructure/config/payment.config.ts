import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';

export const PAYMENT_CONFIG = Object.freeze({
  minAmount: getOptionalEnvInt('PAYMENT_MIN_AMOUNT', PAYMENT_LIMIT.MIN_AMOUNT),
  maxAmount: getOptionalEnvInt('PAYMENT_MAX_AMOUNT', PAYMENT_LIMIT.MAX_AMOUNT),
  maxAttempts: getOptionalEnvInt('PAYMENT_MAX_ATTEMPTS', PAYMENT_LIMIT.MAX_ATTEMPTS),
  sessionTtlSeconds: getOptionalEnvInt('PAYMENT_SESSION_TTL', PAYMENT_LIMIT.SESSION_TTL_SECONDS),
  authorizationTtlSeconds: getOptionalEnvInt('PAYMENT_AUTH_TTL', PAYMENT_LIMIT.AUTHORIZATION_TTL_SECONDS),
  captureWindowHours: getOptionalEnvInt('PAYMENT_CAPTURE_WINDOW', PAYMENT_LIMIT.CAPTURE_WINDOW_HOURS),
  refundWindowDays: getOptionalEnvInt('PAYMENT_REFUND_WINDOW', PAYMENT_LIMIT.REFUND_WINDOW_DAYS),
  allowPartialRefund: getOptionalEnv('PAYMENT_PARTIAL_REFUND', String(PAYMENT_LIMIT.PARTIAL_REFUND_ALLOWED)) === 'true',
  currencyDecimals: getOptionalEnvInt('PAYMENT_CURRENCY_DECIMALS', PAYMENT_LIMIT.CURRENCY_DECIMALS),
} as const);
