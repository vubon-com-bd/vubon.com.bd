import { getOptionalEnvInt } from './_helpers.js';
import { PRICING } from '@vubon/shared-constants/business/product';

const PRICING_CONFIG = Object.freeze({
  DEFAULT_CURRENCY: PRICING.DEFAULT_CURRENCY,
  MIN_PRICE: PRICING.MIN_PRICE,
  MAX_PRICE: PRICING.MAX_PRICE,
  MAX_DISCOUNT_PERCENT: PRICING.MAX_DISCOUNT_PERCENT,
  DECIMAL_PLACES: PRICING.DECIMAL_PLACES,
  TAX_INCLUSIVE_DEFAULT: PRICING.TAX_INCLUSIVE_DEFAULT,
  CACHE_TTL_SECONDS: getOptionalEnvInt('PRICING_CACHE_TTL', 300),
} as const);

export type PricingConfig = typeof PRICING_CONFIG;
export const pricingConfig = PRICING_CONFIG;
export function getPricingConfig(): PricingConfig { return PRICING_CONFIG; }
