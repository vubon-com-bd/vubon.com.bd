import { CURRENCY } from '../../common/currency.constants';

export const PRICING_TYPE = {
  FIXED: 'fixed',
  DYNAMIC: 'dynamic',
  TIERED: 'tiered',
  AUCTION: 'auction',
  NEGOTIABLE: 'negotiable',
} as const;

export const PRICING = {
  DEFAULT_CURRENCY: CURRENCY.BDT,
  MIN_PRICE: 0,
  MAX_PRICE: 100000000,
  MAX_DISCOUNT_PERCENT: 90,
  DECIMAL_PLACES: 2,
  TAX_INCLUSIVE_DEFAULT: true,
  PRICE_ROUNDING: 'none',
} as const;

export const COST_TYPE = {
  COST: 'cost',
  SELLING: 'selling',
  COMPARE_AT: 'compare_at',
  MSRP: 'msrp',
  WHOLESALE: 'wholesale',
} as const;

export type PricingTypeType = (typeof PRICING_TYPE)[keyof typeof PRICING_TYPE];
export type CostTypeType = (typeof COST_TYPE)[keyof typeof COST_TYPE];
