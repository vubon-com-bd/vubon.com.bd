import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const COMMISSION_CONFIG = Object.freeze({
  defaultRate: getOptionalEnvInt('COMMISSION_DEFAULT_RATE', 10),
  minRate: getOptionalEnvInt('COMMISSION_MIN_RATE', 0),
  maxRate: getOptionalEnvInt('COMMISSION_MAX_RATE', 30),
  settlementCycleDays: getOptionalEnvInt('COMMISSION_SETTLEMENT_CYCLE', 15),
} as const);
