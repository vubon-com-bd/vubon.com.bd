/**
 * Commission configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const COMMISSION_CONFIG = Object.freeze({
  minPercent: getOptionalEnvInt('COMMISSION_MIN_PERCENT', 1),
  maxPercent: getOptionalEnvInt('COMMISSION_MAX_PERCENT', 50),
  defaultPercent: getOptionalEnvInt('COMMISSION_DEFAULT_PERCENT', 15),
  decimalPlaces: getOptionalEnvInt('COMMISSION_DECIMAL_PLACES', 2),
} as const);
