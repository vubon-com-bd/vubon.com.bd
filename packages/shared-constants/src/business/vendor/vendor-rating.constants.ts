import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { RATING } from '../../common/rating.constants';

export const VENDOR_RATING = {
  TYPES: {
    ...COMMON_TYPES,
    ...RATING,
    OVERALL: 'overall',
    PRODUCT_QUALITY: 'product_quality',
    SHIPPING_SPEED: 'shipping_speed',
    CUSTOMER_SERVICE: 'customer_service',
    VALUE_FOR_MONEY: 'value_for_money',
    PACKAGING: 'packaging',
  },
  RATING: { ...RATING },
  RATING_CRITERIA: [
    'product_quality',
    'shipping_speed',
    'customer_service',
    'value_for_money',
    'packaging',
    'accuracy',
  ],
  MIN_RATINGS_FOR_AVERAGE: 5,
  RATING_SCALE: 5,
  RATING_WEIGHTS: {
    PRODUCT_QUALITY: 0.25,
    SHIPPING_SPEED: 0.2,
    CUSTOMER_SERVICE: 0.25,
    VALUE_FOR_MONEY: 0.15,
    PACKAGING: 0.1,
    ACCURACY: 0.05,
  },
} as const;
