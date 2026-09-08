import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { FILTER } from '../../common/filter.constants';
import { PRODUCT_STATUS } from '../../business/product/product-status.constants';
import { VENDOR_STATUS } from '../../business/vendor/vendor-status.constants';

export const SEARCH_FILTER = {
  TYPES: {
    ...COMMON_TYPES,
    ...FILTER,
    CATEGORY: 'category',
    BRAND: 'brand',
    PRICE_RANGE: 'price_range',
    RATING: 'rating',
    COLOR: 'color',
    SIZE: 'size',
    MATERIAL: 'material',
    STYLE: 'style',
    GENDER: 'gender',
    AGE_GROUP: 'age_group',
    AVAILABILITY: 'availability',
    DISCOUNT: 'discount',
    SHIPPING: 'shipping',
    VENDOR: 'vendor',
    LOCATION: 'location',
    DATE_RANGE: 'date_range',
    STATUS: 'status',
  },
  FILTER: { ...FILTER },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  FILTER_OPERATORS: {
    EQUAL: 'eq',
    NOT_EQUAL: 'ne',
    GREATER_THAN: 'gt',
    GREATER_THAN_EQUAL: 'gte',
    LESS_THAN: 'lt',
    LESS_THAN_EQUAL: 'lte',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'nin',
    CONTAINS: 'contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
  },
  MAX_FILTERS: 20,
  MAX_FILTER_VALUES: 50,
} as const;
