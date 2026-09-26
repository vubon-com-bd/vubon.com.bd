export const TAX_RATE = {
  ZERO: 0,
  REDUCED_5: 5,
  REDUCED_7_5: 7.5,
  STANDARD_10: 10,
  STANDARD_12: 12,
  STANDARD_15: 15,
  STANDARD_18: 18,
  HIGH_20: 20,
  HIGH_28: 28,
} as const;

export const TAX_RATE_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
  COMPOUND: 'compound',
  TIERED: 'tiered',
} as const;

export const TAX_INCLUSION = {
  INCLUSIVE: 'inclusive',
  EXCLUSIVE: 'exclusive',
} as const;

export const TAX_RATE_LIMIT = {
  MIN_RATE: 0,
  MAX_RATE: 100,
  DECIMAL_PLACES: 2,
  DEFAULT_RATE: 0,
  MAX_RATES_PER_REGION: 50,
} as const;

export type TaxRateType = (typeof TAX_RATE)[keyof typeof TAX_RATE];
export type TaxRateTypeType = (typeof TAX_RATE_TYPE)[keyof typeof TAX_RATE_TYPE];
export type TaxInclusionType = (typeof TAX_INCLUSION)[keyof typeof TAX_INCLUSION];
