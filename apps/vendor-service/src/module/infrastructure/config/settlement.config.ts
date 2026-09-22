import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SETTLEMENT_CONFIG = Object.freeze({
  cycleDays: getOptionalEnvInt('SETTLEMENT_CYCLE_DAYS', 15),
  minimumAmount: getOptionalEnvInt('SETTLEMENT_MINIMUM_AMOUNT', 100),
  autoCreate: true,
} as const);
