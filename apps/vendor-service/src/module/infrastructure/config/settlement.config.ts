/**
 * Settlement configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SETTLEMENT_CONFIG = Object.freeze({
  minAmount: getOptionalEnvInt('SETTLEMENT_MIN_AMOUNT', 1000),
  maxAmount: getOptionalEnvInt('SETTLEMENT_MAX_AMOUNT', 1_000_000),
  holdPeriodDays: getOptionalEnvInt('SETTLEMENT_HOLD_DAYS', 7),
  processingSlaHours: getOptionalEnvInt('SETTLEMENT_PROCESSING_SLA_HOURS', 48),
} as const);
