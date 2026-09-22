import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PRICING_CONFIG = Object.freeze({
  defaultCurrency: getOptionalEnv('PRICING_DEFAULT_CURRENCY', 'BDT'),
  maxPrice: getOptionalEnvInt('PRICING_MAX_PRICE', 1000000000),
  minPrice: getOptionalEnvInt('PRICING_MIN_PRICE', 0),
  allowNegativeAdjust: false,
  maxRulesPerPricing: getOptionalEnvInt('PRICING_MAX_RULES', 10),
} as const);
