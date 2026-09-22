import { getOptionalEnvInt } from '@vubon/shared-config/common';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';

export const REFUND_CONFIG = Object.freeze({
  windowDays: getOptionalEnvInt('REFUND_WINDOW_DAYS', PAYMENT_LIMIT.REFUND_WINDOW_DAYS),
  allowPartial: getOptionalEnvInt('REFUND_ALLOW_PARTIAL', PAYMENT_LIMIT.PARTIAL_REFUND_ALLOWED ? 1 : 0) === 1,
  autoApproveBelow: getOptionalEnvInt('REFUND_AUTO_APPROVE_BELOW', 1000),
  maxRetries: getOptionalEnvInt('REFUND_MAX_RETRIES', 3),
} as const);
