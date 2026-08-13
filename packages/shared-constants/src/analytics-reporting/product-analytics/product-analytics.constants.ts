/**
 * @fileoverview Product analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Product tracking settings
 */
export interface ProductTrackingSettings {
  /** Enable product view tracking */
  enableProductViewTracking: boolean;
  /** Enable product interaction tracking */
  enableProductInteractionTracking: boolean;
  /** Enable product purchase tracking */
  enableProductPurchaseTracking: boolean;
  /** Enable product review tracking */
  enableProductReviewTracking: boolean;
  /** Enable product rating tracking */
  enableProductRatingTracking: boolean;
  /** Enable product comparison tracking */
  enableProductComparisonTracking: boolean;
  /** Enable product recommendation tracking */
  enableProductRecommendationTracking: boolean;
  /** Enable product inventory tracking */
  enableProductInventoryTracking: boolean;
  /** Track product impressions */
  trackProductImpressions: boolean;
  /** Track product clicks */
  trackProductClicks: boolean;
  /** Track product add to cart */
  trackProductAddToCart: boolean;
  /** Track product wishlist */
  trackProductWishlist: boolean;
  /** Track product share */
  trackProductShare: boolean;
  /** Track product search */
  trackProductSearch: boolean;
  /** Track product filter */
  trackProductFilter: boolean;
  /** Track product sort */
  trackProductSort: boolean;
}

export const DEFAULT_PRODUCT_TRACKING_SETTINGS: ProductTrackingSettings = {
  enableProductViewTracking: true,
  enableProductInteractionTracking: true,
  enableProductPurchaseTracking: true,
  enableProductReviewTracking: true,
  enableProductRatingTracking: true,
  enableProductComparisonTracking: true,
  enableProductRecommendationTracking: true,
  enableProductInventoryTracking: true,
  trackProductImpressions: true,
  trackProductClicks: true,
  trackProductAddToCart: true,
  trackProductWishlist: true,
  trackProductShare: true,
  trackProductSearch: true,
  trackProductFilter: true,
  trackProductSort: true,
};

/**
 * Product view thresholds
 */
export interface ProductViewThresholds {
  /** Minimum views to consider product popular */
  popularViewThreshold: number;
  /** Minimum views to consider product trending */
  trendingViewThreshold: number;
  /** Views threshold for product recommendation */
  recommendationViewThreshold: number;
  /** Views threshold for product alert */
  alertViewThreshold: number;
  /** Views per session threshold */
  viewsPerSessionThreshold: number;
}

export const DEFAULT_PRODUCT_VIEW_THRESHOLDS: ProductViewThresholds = {
  popularViewThreshold: 1000,
  trendingViewThreshold: 500,
  recommendationViewThreshold: 100,
  alertViewThreshold: 50,
  viewsPerSessionThreshold: 10,
};

/**
 * Product comparison settings
 */
export interface ProductComparisonSettings {
  /** Maximum products to compare */
  maxProductsToCompare: number;
  /** Enable product attribute comparison */
  enableAttributeComparison: boolean;
  /** Enable product price comparison */
  enablePriceComparison: boolean;
  /** Enable product rating comparison */
  enableRatingComparison: boolean;
  /** Enable product review comparison */
  enableReviewComparison: boolean;
  /** Enable product availability comparison */
  enableAvailabilityComparison: boolean;
  /** Enable product shipping comparison */
  enableShippingComparison: boolean;
  /** Enable product warranty comparison */
  enableWarrantyComparison: boolean;
}

export const DEFAULT_PRODUCT_COMPARISON_SETTINGS: ProductComparisonSettings = {
  maxProductsToCompare: 5,
  enableAttributeComparison: true,
  enablePriceComparison: true,
  enableRatingComparison: true,
  enableReviewComparison: true,
  enableAvailabilityComparison: true,
  enableShippingComparison: true,
  enableWarrantyComparison: true,
};

/**
 * Product recommendation settings
 */
export interface ProductRecommendationSettings {
  /** Number of recommendations to show */
  recommendationCount: number;
  /** Enable personalized recommendations */
  enablePersonalizedRecommendations: boolean;
  /** Enable trending recommendations */
  enableTrendingRecommendations: boolean;
  /** Enable frequently bought together */
  enableFrequentlyBoughtTogether: boolean;
  /** Enable recently viewed recommendations */
  enableRecentlyViewed: boolean;
  /** Enable top rated recommendations */
  enableTopRated: boolean;
  /** Enable best seller recommendations */
  enableBestSellers: boolean;
  /** Enable category based recommendations */
  enableCategoryBased: boolean;
  /** Enable cross-sell recommendations */
  enableCrossSell: boolean;
  /** Enable up-sell recommendations */
  enableUpSell: boolean;
}

export const DEFAULT_PRODUCT_RECOMMENDATION_SETTINGS: ProductRecommendationSettings = {
  recommendationCount: 10,
  enablePersonalizedRecommendations: true,
  enableTrendingRecommendations: true,
  enableFrequentlyBoughtTogether: true,
  enableRecentlyViewed: true,
  enableTopRated: true,
  enableBestSellers: true,
  enableCategoryBased: true,
  enableCrossSell: true,
  enableUpSell: true,
};

/**
 * Product review tracking
 */
export interface ProductReviewTracking {
  /** Enable product review collection */
  enableReviewCollection: boolean;
  /** Minimum review length */
  minReviewLength: number;
  /** Maximum review length */
  maxReviewLength: number;
  /** Enable review moderation */
  enableReviewModeration: boolean;
  /** Enable review verification */
  enableReviewVerification: boolean;
  /** Enable review helpfulness voting */
  enableHelpfulnessVoting: boolean;
  /** Review verification threshold */
  verificationThreshold: number;
  /** Minimum helpful votes for featured review */
  featuredReviewVotes: number;
}

export const DEFAULT_PRODUCT_REVIEW_TRACKING: ProductReviewTracking = {
  enableReviewCollection: true,
  minReviewLength: 10,
  maxReviewLength: 1000,
  enableReviewModeration: true,
  enableReviewVerification: true,
  enableHelpfulnessVoting: true,
  verificationThreshold: 3,
  featuredReviewVotes: 10,
};

/**
 * Product rating thresholds
 */
export interface ProductRatingThresholds {
  /** Minimum rating to consider product good */
  goodRatingThreshold: number;
  /** Minimum rating to consider product average */
  averageRatingThreshold: number;
  /** Minimum reviews for reliable rating */
  reliableRatingReviewCount: number;
  /** Rating threshold for product badge */
  badgeRatingThreshold: number;
  /** Rating threshold for product promotion */
  promotionRatingThreshold: number;
}

export const DEFAULT_PRODUCT_RATING_THRESHOLDS: ProductRatingThresholds = {
  goodRatingThreshold: 4.0,
  averageRatingThreshold: 3.0,
  reliableRatingReviewCount: 10,
  badgeRatingThreshold: 4.5,
  promotionRatingThreshold: 4.0,
};

/**
 * Product inventory alert settings
 */
export interface ProductInventoryAlert {
  /** Enable inventory alerts */
  enableInventoryAlerts: boolean;
  /** Low stock threshold */
  lowStockThreshold: number;
  /** Critical stock threshold */
  criticalStockThreshold: number;
  /** Out of stock alert threshold */
  outOfStockAlertThreshold: number;
  /** Restock notification threshold */
  restockNotificationThreshold: number;
  /** Pre-order threshold */
  preOrderThreshold: number;
}

export const DEFAULT_PRODUCT_INVENTORY_ALERT: ProductInventoryAlert = {
  enableInventoryAlerts: true,
  lowStockThreshold: 50,
  criticalStockThreshold: 20,
  outOfStockAlertThreshold: 0,
  restockNotificationThreshold: 10,
  preOrderThreshold: 5,
};

/**
 * Product performance benchmarks
 */
export interface ProductPerformanceBenchmark {
  /** Conversion rate benchmark */
  conversionRateBenchmark: number;
  /** View to cart benchmark */
  viewToCartBenchmark: number;
  /** Cart to purchase benchmark */
  cartToPurchaseBenchmark: number;
  /** Average order value benchmark */
  averageOrderValueBenchmark: number;
  /** Return rate benchmark */
  returnRateBenchmark: number;
  /** Review rate benchmark */
  reviewRateBenchmark: number;
  /** Rating average benchmark */
  ratingAverageBenchmark: number;
}

export const DEFAULT_PRODUCT_PERFORMANCE_BENCHMARK: ProductPerformanceBenchmark = {
  conversionRateBenchmark: 0.03, // 3%
  viewToCartBenchmark: 0.1, // 10%
  cartToPurchaseBenchmark: 0.3, // 30%
  averageOrderValueBenchmark: 50,
  returnRateBenchmark: 0.05, // 5%
  reviewRateBenchmark: 0.02, // 2%
  ratingAverageBenchmark: 4.0,
};

/**
 * Product seasonality tracking
 */
export interface ProductSeasonalityTracking {
  /** Enable seasonality tracking */
  enableSeasonalityTracking: boolean;
  /** Seasonality analysis period in days */
  analysisPeriodDays: number;
  /** Seasonal peak threshold */
  peakThreshold: number;
  /** Seasonal low threshold */
  lowThreshold: number;
  /** Seasonal trend window in days */
  trendWindowDays: number;
  /** Enable seasonal forecasting */
  enableForecasting: boolean;
}

export const DEFAULT_PRODUCT_SEASONALITY_TRACKING: ProductSeasonalityTracking = {
  enableSeasonalityTracking: true,
  analysisPeriodDays: 365,
  peakThreshold: 1.5,
  lowThreshold: 0.5,
  trendWindowDays: 30,
  enableForecasting: true,
};

/**
 * Product categories
 */
export enum ProductCategory {
  /** Electronics products */
  ELECTRONICS = 'ELECTRONICS',
  /** Clothing products */
  CLOTHING = 'CLOTHING',
  /** Books products */
  BOOKS = 'BOOKS',
  /** Home and garden products */
  HOME_GARDEN = 'HOME_GARDEN',
  /** Sports products */
  SPORTS = 'SPORTS',
  /** Beauty products */
  BEAUTY = 'BEAUTY',
  /** Food products */
  FOOD = 'FOOD',
  /** Toys products */
  TOYS = 'TOYS',
  /** Automotive products */
  AUTOMOTIVE = 'AUTOMOTIVE',
  /** Health products */
  HEALTH = 'HEALTH',
  /** Office products */
  OFFICE = 'OFFICE',
  /** Pet products */
  PET = 'PET',
  /** Baby products */
  BABY = 'BABY',
  /** Jewelry products */
  JEWELRY = 'JEWELRY',
  /** Furniture products */
  FURNITURE = 'FURNITURE',
  /** Tools products */
  TOOLS = 'TOOLS',
}

/**
 * Product category configuration
 */
export const PRODUCT_CATEGORY_CONFIG: Record<
  ProductCategory,
  { label: string; description: string; icon?: string; color?: string }
> = {
  [ProductCategory.ELECTRONICS]: {
    label: 'Electronics',
    description: 'Electronic devices and gadgets',
    icon: 'Monitor',
    color: '#3B82F6',
  },
  [ProductCategory.CLOTHING]: {
    label: 'Clothing',
    description: 'Apparel and fashion items',
    icon: 'Shirt',
    color: '#8B5CF6',
  },
  [ProductCategory.BOOKS]: {
    label: 'Books',
    description: 'Books and publications',
    icon: 'Book',
    color: '#F59E0B',
  },
  [ProductCategory.HOME_GARDEN]: {
    label: 'Home & Garden',
    description: 'Home improvement and garden supplies',
    icon: 'Home',
    color: '#10B981',
  },
  [ProductCategory.SPORTS]: {
    label: 'Sports',
    description: 'Sports equipment and accessories',
    icon: 'Activity',
    color: '#EF4444',
  },
  [ProductCategory.BEAUTY]: {
    label: 'Beauty',
    description: 'Beauty and personal care products',
    icon: 'Sparkles',
    color: '#F472B6',
  },
  [ProductCategory.FOOD]: {
    label: 'Food',
    description: 'Food and beverage products',
    icon: 'Utensils',
    color: '#F59E0B',
  },
  [ProductCategory.TOYS]: {
    label: 'Toys',
    description: 'Toys and games',
    icon: 'Gamepad',
    color: '#EC4899',
  },
  [ProductCategory.AUTOMOTIVE]: {
    label: 'Automotive',
    description: 'Automotive parts and accessories',
    icon: 'Car',
    color: '#6B7280',
  },
  [ProductCategory.HEALTH]: {
    label: 'Health',
    description: 'Health and wellness products',
    icon: 'Heart',
    color: '#22C55E',
  },
  [ProductCategory.OFFICE]: {
    label: 'Office',
    description: 'Office supplies and equipment',
    icon: 'Briefcase',
    color: '#6366F1',
  },
  [ProductCategory.PET]: {
    label: 'Pet',
    description: 'Pet supplies and accessories',
    icon: 'Paw',
    color: '#F59E0B',
  },
  [ProductCategory.BABY]: {
    label: 'Baby',
    description: 'Baby products and supplies',
    icon: 'Baby',
    color: '#F472B6',
  },
  [ProductCategory.JEWELRY]: {
    label: 'Jewelry',
    description: 'Jewelry and accessories',
    icon: 'Gem',
    color: '#F59E0B',
  },
  [ProductCategory.FURNITURE]: {
    label: 'Furniture',
    description: 'Furniture and home decor',
    icon: 'Layout',
    color: '#8B5CF6',
  },
  [ProductCategory.TOOLS]: {
    label: 'Tools',
    description: 'Tools and hardware',
    icon: 'Wrench',
    color: '#6B7280',
  },
};

/**
 * Product status
 */
export enum ProductStatus {
  /** Product is active and available */
  ACTIVE = 'ACTIVE',
  /** Product is inactive */
  INACTIVE = 'INACTIVE',
  /** Product is out of stock */
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  /** Product is discontinued */
  DISCONTINUED = 'DISCONTINUED',
  /** Product is coming soon */
  COMING_SOON = 'COMING_SOON',
  /** Product is on pre-order */
  PRE_ORDER = 'PRE_ORDER',
  /** Product is on sale */
  ON_SALE = 'ON_SALE',
  /** Product is featured */
  FEATURED = 'FEATURED',
  /** Product is new arrival */
  NEW_ARRIVAL = 'NEW_ARRIVAL',
  /** Product is best seller */
  BEST_SELLER = 'BEST_SELLER',
}

/**
 * Product analytics configuration
 */
export const PRODUCT_ANALYTICS_CONFIG = {
  /** Maximum products to analyze */
  MAX_PRODUCTS_ANALYZE: 10000,
  /** Product analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Product analytics query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum products in report */
  MAX_PRODUCTS_IN_REPORT: 1000,
  /** Product data export limit */
  EXPORT_LIMIT: 50000,
  /** Product analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Product event types
 */
export enum ProductEventType {
  /** Product viewed */
  PRODUCT_VIEW = 'PRODUCT_VIEW',
  /** Product clicked */
  PRODUCT_CLICK = 'PRODUCT_CLICK',
  /** Product added to cart */
  ADD_TO_CART = 'ADD_TO_CART',
  /** Product removed from cart */
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  /** Product purchased */
  PRODUCT_PURCHASE = 'PRODUCT_PURCHASE',
  /** Product added to wishlist */
  ADD_TO_WISHLIST = 'ADD_TO_WISHLIST',
  /** Product removed from wishlist */
  REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST',
  /** Product reviewed */
  PRODUCT_REVIEW = 'PRODUCT_REVIEW',
  /** Product rated */
  PRODUCT_RATING = 'PRODUCT_RATING',
  /** Product compared */
  PRODUCT_COMPARE = 'PRODUCT_COMPARE',
  /** Product shared */
  PRODUCT_SHARE = 'PRODUCT_SHARE',
  /** Product searched */
  PRODUCT_SEARCH = 'PRODUCT_SEARCH',
  /** Product filtered */
  PRODUCT_FILTER = 'PRODUCT_FILTER',
  /** Product sorted */
  PRODUCT_SORT = 'PRODUCT_SORT',
  /** Product recommended */
  PRODUCT_RECOMMENDATION = 'PRODUCT_RECOMMENDATION',
  /** Product back in stock */
  PRODUCT_BACK_IN_STOCK = 'PRODUCT_BACK_IN_STOCK',
  /** Product price drop */
  PRODUCT_PRICE_DROP = 'PRODUCT_PRICE_DROP',
  /** Product restock alert */
  PRODUCT_RESTOCK_ALERT = 'PRODUCT_RESTOCK_ALERT',
}

/**
 * Product event configuration
 */
export const PRODUCT_EVENT_CONFIG: Record<
  ProductEventType,
  { label: string; description: string; isCritical: boolean }
> = {
  [ProductEventType.PRODUCT_VIEW]: {
    label: 'Product View',
    description: 'User viewed a product',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_CLICK]: {
    label: 'Product Click',
    description: 'User clicked on a product',
    isCritical: false,
  },
  [ProductEventType.ADD_TO_CART]: {
    label: 'Add to Cart',
    description: 'User added product to cart',
    isCritical: true,
  },
  [ProductEventType.REMOVE_FROM_CART]: {
    label: 'Remove from Cart',
    description: 'User removed product from cart',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_PURCHASE]: {
    label: 'Product Purchase',
    description: 'User purchased a product',
    isCritical: true,
  },
  [ProductEventType.ADD_TO_WISHLIST]: {
    label: 'Add to Wishlist',
    description: 'User added product to wishlist',
    isCritical: false,
  },
  [ProductEventType.REMOVE_FROM_WISHLIST]: {
    label: 'Remove from Wishlist',
    description: 'User removed product from wishlist',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_REVIEW]: {
    label: 'Product Review',
    description: 'User reviewed a product',
    isCritical: true,
  },
  [ProductEventType.PRODUCT_RATING]: {
    label: 'Product Rating',
    description: 'User rated a product',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_COMPARE]: {
    label: 'Product Compare',
    description: 'User compared products',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_SHARE]: {
    label: 'Product Share',
    description: 'User shared a product',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_SEARCH]: {
    label: 'Product Search',
    description: 'User searched for products',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_FILTER]: {
    label: 'Product Filter',
    description: 'User filtered products',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_SORT]: {
    label: 'Product Sort',
    description: 'User sorted products',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_RECOMMENDATION]: {
    label: 'Product Recommendation',
    description: 'Product was recommended to user',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_BACK_IN_STOCK]: {
    label: 'Product Back in Stock',
    description: 'Product came back in stock',
    isCritical: true,
  },
  [ProductEventType.PRODUCT_PRICE_DROP]: {
    label: 'Product Price Drop',
    description: 'Product price decreased',
    isCritical: false,
  },
  [ProductEventType.PRODUCT_RESTOCK_ALERT]: {
    label: 'Product Restock Alert',
    description: 'Product restock alert sent',
    isCritical: false,
  },
};

/**
 * Product analytics functions
 */
export function getProductCategoryLabel(category: ProductCategory): string {
  return PRODUCT_CATEGORY_CONFIG[category]?.label || category;
}

export function getProductStatusLabel(status: ProductStatus): string {
  return status;
}

export function getProductEventLabel(event: ProductEventType): string {
  return PRODUCT_EVENT_CONFIG[event]?.label || event;
}

export function isProductEventCritical(event: ProductEventType): boolean {
  return PRODUCT_EVENT_CONFIG[event]?.isCritical || false;
}
