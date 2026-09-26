export const SUBSTITUTE_TYPE = {
  DIRECT: 'direct',
  SIMILAR_ATTRIBUTES: 'similar_attributes',
  SAME_CATEGORY: 'same_category',
  SAME_BRAND: 'same_brand',
  PRICE_RANGE: 'price_range',
  BETTER_RATED: 'better_rated',
  IN_STOCK: 'in_stock',
} as const;

export const SUBSTITUTE = {
  MAX_ITEMS: 20,
  DEFAULT_ITEMS: 6,
  MIN_SIMILARITY: 0.5,
  PRICE_RANGE_PERCENT: 30,
  SAME_CATEGORY_REQUIRED: false,
  SAME_BRAND_PREFERRED: true,
  INCLUDE_OUT_OF_STOCK: false,
  RATING_THRESHOLD: 3.0,
  RETENTION_DAYS: 90,
} as const;

export type SubstituteTypeType = (typeof SUBSTITUTE_TYPE)[keyof typeof SUBSTITUTE_TYPE];
