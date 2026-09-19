/**
 * Pricing configuration
 * @module shared-config/business/product
 */
import { CURRENCY } from '@vubon/shared-constants/common';
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PRICING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PRICING_ENABLED', true),
  defaultCurrency: getOptionalEnv('PRICING_CURRENCY', CURRENCY.BDT),
  decimalPlaces: getOptionalEnvInt('PRICING_DECIMALS', 2),
  minPrice: getOptionalEnvInt('PRICING_MIN', 0),
  maxPrice: getOptionalEnvInt('PRICING_MAX', 100000000),
  maxDiscountPercent: getOptionalEnvInt('PRICING_MAX_DISCOUNT_PERCENT', 90),
  allowCompareAtPrice: getOptionalEnvBool('PRICING_COMPARE_AT', true),
  taxInclusiveDefault: getOptionalEnvBool('PRICING_TAX_INCLUSIVE', true),
  dynamicPricingEnabled: getOptionalEnvBool('PRICING_DYNAMIC', false),
});
