import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PRODUCT_STATUS } from '../../business/product/product-status.constants';

export const PRODUCT_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    PERFORMANCE: 'performance',
    INVENTORY: 'inventory',
    PRICING: 'pricing',
    REVIEWS: 'reviews',
  },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  METRICS: {
    TOTAL_PRODUCTS: 'total_products',
    ACTIVE_PRODUCTS: 'active_products',
    OUT_OF_STOCK: 'out_of_stock',
    BEST_SELLERS: 'best_sellers',
    TOP_RATED: 'top_rated',
    MOST_VIEWED: 'most_viewed',
    AVERAGE_RATING: 'average_rating',
    REVIEW_COUNT: 'review_count',
  },
  PERFORMANCE_INDICATORS: {
    CONVERSION_RATE: 'conversion_rate',
    ADD_TO_CART_RATE: 'add_to_cart_rate',
    WISHLIST_RATE: 'wishlist_rate',
    RETURN_RATE: 'return_rate',
  },
} as const;
