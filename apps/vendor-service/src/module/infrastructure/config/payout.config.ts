/**
 * Payout configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const PAYOUT_CONFIG = Object.freeze({
  minAmount: getOptionalEnvInt('PAYOUT_MIN_AMOUNT', 100),
  maxAmount: getOptionalEnvInt('PAYOUT_MAX_AMOUNT', 10_000_000),
  holdDays: getOptionalEnvInt('PAYOUT_HOLD_DAYS', 7),
  processingDays: getOptionalEnvInt('PAYOUT_PROCESSING_DAYS', 3),
  autoPayout: getOptionalEnvBool('PAYOUT_AUTO', false),
  requireApproval: getOptionalEnvBool('PAYOUT_REQUIRE_APPROVAL', true),
  maxPayoutsPerDay: getOptionalEnvInt('PAYOUT_MAX_PER_DAY', 1),
} as const);
