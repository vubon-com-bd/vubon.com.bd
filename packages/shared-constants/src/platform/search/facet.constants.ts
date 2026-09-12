import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const FACET = {
  TYPES: {
    ...COMMON_TYPES,
    CATEGORY: 'category',
    BRAND: 'brand',
    PRICE_RANGE: 'price_range',
    RATING: 'rating',
    COLOR: 'color',
    SIZE: 'size',
    MATERIAL: 'material',
    STYLE: 'style',
    GENDER: 'gender',
    AVAILABILITY: 'availability',
    DISCOUNT: 'discount',
    SHIPPING: 'shipping',
    VENDOR: 'vendor',
    LOCATION: 'location',
  },
  FACET_TYPES: {
    SINGLE: 'single',
    MULTI: 'multi',
    RANGE: 'range',
    DATE: 'date',
    BOOLEAN: 'boolean',
  },
  FACET_SORT: {
    COUNT: 'count',
    ALPHA: 'alpha',
    CUSTOM: 'custom',
  },
  MAX_FACET_VALUES: 50,
  MIN_FACET_COUNT: 1,
  DEFAULT_FACET_LIMIT: 10,
} as const;
