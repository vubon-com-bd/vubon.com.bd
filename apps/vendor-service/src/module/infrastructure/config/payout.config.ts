import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYOUT_CONFIG = Object.freeze({
  minimumAmount: getOptionalEnvInt('PAYOUT_MINIMUM_AMOUNT', 500),
  maximumAmount: getOptionalEnvInt('PAYOUT_MAXIMUM_AMOUNT', 500000),
  processingDays: getOptionalEnvInt('PAYOUT_PROCESSING_DAYS', 3),
  maxAttempts: getOptionalEnvInt('PAYOUT_MAX_ATTEMPTS', 3),
} as const);
