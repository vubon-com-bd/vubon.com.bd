/**
 * @fileoverview Product analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Product analytics types enum for different product-related analytics
 */
export enum ProductAnalyticsType {
  /** Product view analytics */
  PRODUCT_VIEW = 'PRODUCT_VIEW',
  /** Product add to cart analytics */
  PRODUCT_ADD_TO_CART = 'PRODUCT_ADD_TO_CART',
  /** Product purchase analytics */
  PRODUCT_PURCHASE = 'PRODUCT_PURCHASE',
  /** Product return analytics */
  PRODUCT_RETURN = 'PRODUCT_RETURN',
  /** Product review analytics */
  PRODUCT_REVIEW = 'PRODUCT_REVIEW',
  /** Product rating analytics */
  PRODUCT_RATING = 'PRODUCT_RATING',
  /** Product comparison analytics */
  PRODUCT_COMPARISON = 'PRODUCT_COMPARISON',
  /** Product wishlist analytics */
  PRODUCT_WISHLIST = 'PRODUCT_WISHLIST',
  /** Product share analytics */
  PRODUCT_SHARE = 'PRODUCT_SHARE',
  /** Product search analytics */
  PRODUCT_SEARCH = 'PRODUCT_SEARCH',
  /** Product filter analytics */
  PRODUCT_FILTER = 'PRODUCT_FILTER',
  /** Product category view analytics */
  PRODUCT_CATEGORY_VIEW = 'PRODUCT_CATEGORY_VIEW',
  /** Product brand view analytics */
  PRODUCT_BRAND_VIEW = 'PRODUCT_BRAND_VIEW',
  /** Product related view analytics */
  PRODUCT_RELATED_VIEW = 'PRODUCT_RELATED_VIEW',
  /** Product recommendation analytics */
  PRODUCT_RECOMMENDATION = 'PRODUCT_RECOMMENDATION',
  /** Product availability check analytics */
  PRODUCT_AVAILABILITY_CHECK = 'PRODUCT_AVAILABILITY_CHECK',
  /** Product price track analytics */
  PRODUCT_PRICE_TRACK = 'PRODUCT_PRICE_TRACK',
  /** Product stock alert analytics */
  PRODUCT_STOCK_ALERT = 'PRODUCT_STOCK_ALERT',
  /** Product discount view analytics */
  PRODUCT_DISCOUNT_VIEW = 'PRODUCT_DISCOUNT_VIEW',
  /** Product bundle view analytics */
  PRODUCT_BUNDLE_VIEW = 'PRODUCT_BUNDLE_VIEW',
  /** Product inventory analytics */
  PRODUCT_INVENTORY = 'PRODUCT_INVENTORY',
  /** Product performance analytics */
  PRODUCT_PERFORMANCE = 'PRODUCT_PERFORMANCE',
  /** Product seasonal analytics */
  PRODUCT_SEASONAL = 'PRODUCT_SEASONAL',
  /** Product trend analytics */
  PRODUCT_TREND = 'PRODUCT_TREND',
  /** Product customer analytics */
  PRODUCT_CUSTOMER = 'PRODUCT_CUSTOMER',
  /** Product pricing analytics */
  PRODUCT_PRICING = 'PRODUCT_PRICING',
  /** Product promotion analytics */
  PRODUCT_PROMOTION = 'PRODUCT_PROMOTION',
  /** Product bundle analytics */
  PRODUCT_BUNDLE = 'PRODUCT_BUNDLE',
  /** Product cross-sell analytics */
  PRODUCT_CROSS_SELL = 'PRODUCT_CROSS_SELL',
  /** Product up-sell analytics */
  PRODUCT_UP_SELL = 'PRODUCT_UP_SELL',
}

/**
 * Product analytics category for grouping
 */
export enum ProductAnalyticsCategory {
  /** View and impression analytics */
  VIEW = 'VIEW',
  /** Cart and purchase analytics */
  TRANSACTION = 'TRANSACTION',
  /** Review and rating analytics */
  FEEDBACK = 'FEEDBACK',
  /** Search and discovery analytics */
  DISCOVERY = 'DISCOVERY',
  /** Recommendation analytics */
  RECOMMENDATION = 'RECOMMENDATION',
  /** Inventory and availability analytics */
  INVENTORY = 'INVENTORY',
  /** Pricing and discount analytics */
  PRICING = 'PRICING',
  /** Performance analytics */
  PERFORMANCE = 'PERFORMANCE',
  /** Seasonal and trend analytics */
  TREND = 'TREND',
  /** Customer behavior analytics */
  CUSTOMER = 'CUSTOMER',
}

/**
 * Product analytics category mapping
 */
export const PRODUCT_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  ProductAnalyticsType,
  ProductAnalyticsCategory
> = {
  [ProductAnalyticsType.PRODUCT_VIEW]: ProductAnalyticsCategory.VIEW,
  [ProductAnalyticsType.PRODUCT_ADD_TO_CART]: ProductAnalyticsCategory.TRANSACTION,
  [ProductAnalyticsType.PRODUCT_PURCHASE]: ProductAnalyticsCategory.TRANSACTION,
  [ProductAnalyticsType.PRODUCT_RETURN]: ProductAnalyticsCategory.TRANSACTION,
  [ProductAnalyticsType.PRODUCT_REVIEW]: ProductAnalyticsCategory.FEEDBACK,
  [ProductAnalyticsType.PRODUCT_RATING]: ProductAnalyticsCategory.FEEDBACK,
  [ProductAnalyticsType.PRODUCT_COMPARISON]: ProductAnalyticsCategory.DISCOVERY,
  [ProductAnalyticsType.PRODUCT_WISHLIST]: ProductAnalyticsCategory.CUSTOMER,
  [ProductAnalyticsType.PRODUCT_SHARE]: ProductAnalyticsCategory.CUSTOMER,
  [ProductAnalyticsType.PRODUCT_SEARCH]: ProductAnalyticsCategory.DISCOVERY,
  [ProductAnalyticsType.PRODUCT_FILTER]: ProductAnalyticsCategory.DISCOVERY,
  [ProductAnalyticsType.PRODUCT_CATEGORY_VIEW]: ProductAnalyticsCategory.VIEW,
  [ProductAnalyticsType.PRODUCT_BRAND_VIEW]: ProductAnalyticsCategory.VIEW,
  [ProductAnalyticsType.PRODUCT_RELATED_VIEW]: ProductAnalyticsCategory.VIEW,
  [ProductAnalyticsType.PRODUCT_RECOMMENDATION]: ProductAnalyticsCategory.RECOMMENDATION,
  [ProductAnalyticsType.PRODUCT_AVAILABILITY_CHECK]: ProductAnalyticsCategory.INVENTORY,
  [ProductAnalyticsType.PRODUCT_PRICE_TRACK]: ProductAnalyticsCategory.PRICING,
  [ProductAnalyticsType.PRODUCT_STOCK_ALERT]: ProductAnalyticsCategory.INVENTORY,
  [ProductAnalyticsType.PRODUCT_DISCOUNT_VIEW]: ProductAnalyticsCategory.PRICING,
  [ProductAnalyticsType.PRODUCT_BUNDLE_VIEW]: ProductAnalyticsCategory.VIEW,
  [ProductAnalyticsType.PRODUCT_INVENTORY]: ProductAnalyticsCategory.INVENTORY,
  [ProductAnalyticsType.PRODUCT_PERFORMANCE]: ProductAnalyticsCategory.PERFORMANCE,
  [ProductAnalyticsType.PRODUCT_SEASONAL]: ProductAnalyticsCategory.TREND,
  [ProductAnalyticsType.PRODUCT_TREND]: ProductAnalyticsCategory.TREND,
  [ProductAnalyticsType.PRODUCT_CUSTOMER]: ProductAnalyticsCategory.CUSTOMER,
  [ProductAnalyticsType.PRODUCT_PRICING]: ProductAnalyticsCategory.PRICING,
  [ProductAnalyticsType.PRODUCT_PROMOTION]: ProductAnalyticsCategory.PRICING,
  [ProductAnalyticsType.PRODUCT_BUNDLE]: ProductAnalyticsCategory.RECOMMENDATION,
  [ProductAnalyticsType.PRODUCT_CROSS_SELL]: ProductAnalyticsCategory.RECOMMENDATION,
  [ProductAnalyticsType.PRODUCT_UP_SELL]: ProductAnalyticsCategory.RECOMMENDATION,
};

/**
 * Product analytics type configuration
 */
export interface ProductAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresProductId: boolean;
}

export const PRODUCT_ANALYTICS_TYPE_CONFIG: Record<
  ProductAnalyticsType,
  ProductAnalyticsTypeConfig
> = {
  [ProductAnalyticsType.PRODUCT_VIEW]: {
    label: 'Product View',
    description: 'Analytics for product page views and impressions',
    icon: 'Eye',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_ADD_TO_CART]: {
    label: 'Add to Cart',
    description: 'Analytics for product add to cart actions',
    icon: 'ShoppingCart',
    color: '#F59E0B',
    priority: 1,
    isRealtime: true,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_PURCHASE]: {
    label: 'Product Purchase',
    description: 'Analytics for product purchases and transactions',
    icon: 'ShoppingBag',
    color: '#22C55E',
    priority: 1,
    isRealtime: true,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_RETURN]: {
    label: 'Product Return',
    description: 'Analytics for product returns and refunds',
    icon: 'Undo',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_REVIEW]: {
    label: 'Product Review',
    description: 'Analytics for product reviews and feedback',
    icon: 'MessageSquare',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_RATING]: {
    label: 'Product Rating',
    description: 'Analytics for product ratings and scores',
    icon: 'Star',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_COMPARISON]: {
    label: 'Product Comparison',
    description: 'Analytics for product comparison actions',
    icon: 'GitCompare',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_WISHLIST]: {
    label: 'Product Wishlist',
    description: 'Analytics for product wishlist actions',
    icon: 'Heart',
    color: '#EC4899',
    priority: 2,
    isRealtime: true,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_SHARE]: {
    label: 'Product Share',
    description: 'Analytics for product sharing on social media',
    icon: 'Share2',
    color: '#1DA1F2',
    priority: 2,
    isRealtime: true,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_SEARCH]: {
    label: 'Product Search',
    description: 'Analytics for product search queries and results',
    icon: 'Search',
    color: '#4285F4',
    priority: 1,
    isRealtime: true,
    requiresProductId: false,
  },
  [ProductAnalyticsType.PRODUCT_FILTER]: {
    label: 'Product Filter',
    description: 'Analytics for product filter applications',
    icon: 'Filter',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresProductId: false,
  },
  [ProductAnalyticsType.PRODUCT_CATEGORY_VIEW]: {
    label: 'Category View',
    description: 'Analytics for product category page views',
    icon: 'Folder',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresProductId: false,
  },
  [ProductAnalyticsType.PRODUCT_BRAND_VIEW]: {
    label: 'Brand View',
    description: 'Analytics for product brand page views',
    icon: 'Tag',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresProductId: false,
  },
  [ProductAnalyticsType.PRODUCT_RELATED_VIEW]: {
    label: 'Related View',
    description: 'Analytics for related product views',
    icon: 'Link',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_RECOMMENDATION]: {
    label: 'Product Recommendation',
    description: 'Analytics for product recommendation effectiveness',
    icon: 'Sparkles',
    color: '#F472B6',
    priority: 1,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_AVAILABILITY_CHECK]: {
    label: 'Availability Check',
    description: 'Analytics for product availability checks',
    icon: 'Package',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_PRICE_TRACK]: {
    label: 'Price Track',
    description: 'Analytics for product price tracking and changes',
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_STOCK_ALERT]: {
    label: 'Stock Alert',
    description: 'Analytics for product stock alert notifications',
    icon: 'Bell',
    color: '#EF4444',
    priority: 2,
    isRealtime: true,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_DISCOUNT_VIEW]: {
    label: 'Discount View',
    description: 'Analytics for product discount and offer views',
    icon: 'Percent',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_BUNDLE_VIEW]: {
    label: 'Bundle View',
    description: 'Analytics for product bundle views',
    icon: 'Layers',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_INVENTORY]: {
    label: 'Product Inventory',
    description: 'Analytics for product inventory management',
    icon: 'Database',
    color: '#3B82F6',
    priority: 1,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_PERFORMANCE]: {
    label: 'Product Performance',
    description: 'Analytics for product performance metrics',
    icon: 'Activity',
    color: '#10B981',
    priority: 1,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_SEASONAL]: {
    label: 'Product Seasonal',
    description: 'Analytics for product seasonal patterns',
    icon: 'Calendar',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_TREND]: {
    label: 'Product Trend',
    description: 'Analytics for product trend analysis',
    icon: 'TrendingUp',
    color: '#6366F1',
    priority: 1,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_CUSTOMER]: {
    label: 'Product Customer',
    description: 'Analytics for customer behavior with products',
    icon: 'Users',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_PRICING]: {
    label: 'Product Pricing',
    description: 'Analytics for product pricing strategies',
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_PROMOTION]: {
    label: 'Product Promotion',
    description: 'Analytics for product promotional campaigns',
    icon: 'Megaphone',
    color: '#F97316',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_BUNDLE]: {
    label: 'Product Bundle',
    description: 'Analytics for product bundle performance',
    icon: 'Package',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_CROSS_SELL]: {
    label: 'Cross-Sell',
    description: 'Analytics for cross-selling product performance',
    icon: 'ArrowRight',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
  [ProductAnalyticsType.PRODUCT_UP_SELL]: {
    label: 'Up-Sell',
    description: 'Analytics for up-selling product performance',
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresProductId: true,
  },
};

/**
 * Get product analytics type label
 */
export function getProductAnalyticsTypeLabel(type: ProductAnalyticsType): string {
  return PRODUCT_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get product analytics type description
 */
export function getProductAnalyticsTypeDescription(type: ProductAnalyticsType): string {
  return PRODUCT_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get product analytics type category
 */
export function getProductAnalyticsTypeCategory(
  type: ProductAnalyticsType
): ProductAnalyticsCategory {
  return PRODUCT_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get product analytics types by category
 */
export function getProductAnalyticsTypesByCategory(
  category: ProductAnalyticsCategory
): ProductAnalyticsType[] {
  return Object.entries(PRODUCT_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as ProductAnalyticsType);
}

/**
 * Check if product analytics type requires product ID
 */
export function productAnalyticsTypeRequiresProductId(type: ProductAnalyticsType): boolean {
  return PRODUCT_ANALYTICS_TYPE_CONFIG[type]?.requiresProductId || false;
}

/**
 * Check if product analytics type is real-time
 */
export function isProductAnalyticsTypeRealtime(type: ProductAnalyticsType): boolean {
  return PRODUCT_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get product analytics type priority
 */
export function getProductAnalyticsTypePriority(type: ProductAnalyticsType): number {
  return PRODUCT_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Product analytics type status
 */
export enum ProductAnalyticsTypeStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive and not collecting data */
  INACTIVE = 'INACTIVE',
  /** Paused temporarily */
  PAUSED = 'PAUSED',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated and will be removed */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for product analytics types
 */
export const PRODUCT_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  ProductAnalyticsType,
  ProductAnalyticsTypeStatus
> = {
  [ProductAnalyticsType.PRODUCT_VIEW]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_ADD_TO_CART]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_PURCHASE]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_RETURN]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_REVIEW]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_RATING]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_COMPARISON]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_WISHLIST]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_SHARE]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_SEARCH]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_FILTER]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_CATEGORY_VIEW]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_BRAND_VIEW]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_RELATED_VIEW]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_RECOMMENDATION]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_AVAILABILITY_CHECK]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_PRICE_TRACK]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_STOCK_ALERT]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_DISCOUNT_VIEW]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_BUNDLE_VIEW]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_INVENTORY]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_PERFORMANCE]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_SEASONAL]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_TREND]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_CUSTOMER]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_PRICING]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_PROMOTION]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_BUNDLE]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_CROSS_SELL]: ProductAnalyticsTypeStatus.ACTIVE,
  [ProductAnalyticsType.PRODUCT_UP_SELL]: ProductAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get product analytics type status
 */
export function getProductAnalyticsTypeStatus(
  type: ProductAnalyticsType
): ProductAnalyticsTypeStatus {
  return PRODUCT_ANALYTICS_TYPE_DEFAULT_STATUS[type] || ProductAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set product analytics type status
 */
export function setProductAnalyticsTypeStatus(
  type: ProductAnalyticsType,
  status: ProductAnalyticsTypeStatus
): void {
  PRODUCT_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Product analytics priority levels
 */
export const PRODUCT_ANALYTICS_PRIORITY_LEVELS = {
  /** Critical priority - essential analytics */
  CRITICAL: 1,
  /** High priority - important analytics */
  HIGH: 2,
  /** Medium priority - useful analytics */
  MEDIUM: 3,
  /** Low priority - nice to have */
  LOW: 4,
} as const;

/**
 * Get product analytics types by priority
 */
export function getProductAnalyticsTypesByPriority(priority: number): ProductAnalyticsType[] {
  return Object.entries(PRODUCT_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as ProductAnalyticsType);
}

/**
 * Get critical product analytics types
 */
export function getCriticalProductAnalyticsTypes(): ProductAnalyticsType[] {
  return getProductAnalyticsTypesByPriority(PRODUCT_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Product analytics sub-categories
 */
export enum ProductAnalyticsSubCategory {
  /** Product views and impressions */
  VIEWS = 'VIEWS',
  /** Cart actions */
  CART = 'CART',
  /** Purchase actions */
  PURCHASE = 'PURCHASE',
  /** Returns and refunds */
  RETURNS = 'RETURNS',
  /** Reviews and ratings */
  REVIEWS = 'REVIEWS',
  /** Search and discovery */
  DISCOVERY = 'DISCOVERY',
  /** Recommendations */
  RECOMMENDATIONS = 'RECOMMENDATIONS',
  /** Inventory management */
  INVENTORY = 'INVENTORY',
  /** Pricing analytics */
  PRICING = 'PRICING',
  /** Performance metrics */
  PERFORMANCE = 'PERFORMANCE',
  /** Trends and seasonality */
  TRENDS = 'TRENDS',
  /** Customer insights */
  CUSTOMER = 'CUSTOMER',
  /** Promotions and discounts */
  PROMOTIONS = 'PROMOTIONS',
  /** Bundles and packages */
  BUNDLES = 'BUNDLES',
}

/**
 * Mapping of product analytics types to sub-categories
 */
export const PRODUCT_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  ProductAnalyticsType,
  ProductAnalyticsSubCategory
> = {
  [ProductAnalyticsType.PRODUCT_VIEW]: ProductAnalyticsSubCategory.VIEWS,
  [ProductAnalyticsType.PRODUCT_CATEGORY_VIEW]: ProductAnalyticsSubCategory.VIEWS,
  [ProductAnalyticsType.PRODUCT_BRAND_VIEW]: ProductAnalyticsSubCategory.VIEWS,
  [ProductAnalyticsType.PRODUCT_RELATED_VIEW]: ProductAnalyticsSubCategory.VIEWS,
  [ProductAnalyticsType.PRODUCT_BUNDLE_VIEW]: ProductAnalyticsSubCategory.VIEWS,
  [ProductAnalyticsType.PRODUCT_ADD_TO_CART]: ProductAnalyticsSubCategory.CART,
  [ProductAnalyticsType.PRODUCT_PURCHASE]: ProductAnalyticsSubCategory.PURCHASE,
  [ProductAnalyticsType.PRODUCT_RETURN]: ProductAnalyticsSubCategory.RETURNS,
  [ProductAnalyticsType.PRODUCT_REVIEW]: ProductAnalyticsSubCategory.REVIEWS,
  [ProductAnalyticsType.PRODUCT_RATING]: ProductAnalyticsSubCategory.REVIEWS,
  [ProductAnalyticsType.PRODUCT_SEARCH]: ProductAnalyticsSubCategory.DISCOVERY,
  [ProductAnalyticsType.PRODUCT_FILTER]: ProductAnalyticsSubCategory.DISCOVERY,
  [ProductAnalyticsType.PRODUCT_COMPARISON]: ProductAnalyticsSubCategory.DISCOVERY,
  [ProductAnalyticsType.PRODUCT_RECOMMENDATION]: ProductAnalyticsSubCategory.RECOMMENDATIONS,
  [ProductAnalyticsType.PRODUCT_CROSS_SELL]: ProductAnalyticsSubCategory.RECOMMENDATIONS,
  [ProductAnalyticsType.PRODUCT_UP_SELL]: ProductAnalyticsSubCategory.RECOMMENDATIONS,
  [ProductAnalyticsType.PRODUCT_BUNDLE]: ProductAnalyticsSubCategory.BUNDLES,
  [ProductAnalyticsType.PRODUCT_AVAILABILITY_CHECK]: ProductAnalyticsSubCategory.INVENTORY,
  [ProductAnalyticsType.PRODUCT_STOCK_ALERT]: ProductAnalyticsSubCategory.INVENTORY,
  [ProductAnalyticsType.PRODUCT_INVENTORY]: ProductAnalyticsSubCategory.INVENTORY,
  [ProductAnalyticsType.PRODUCT_PRICE_TRACK]: ProductAnalyticsSubCategory.PRICING,
  [ProductAnalyticsType.PRODUCT_DISCOUNT_VIEW]: ProductAnalyticsSubCategory.PROMOTIONS,
  [ProductAnalyticsType.PRODUCT_PRICING]: ProductAnalyticsSubCategory.PRICING,
  [ProductAnalyticsType.PRODUCT_PROMOTION]: ProductAnalyticsSubCategory.PROMOTIONS,
  [ProductAnalyticsType.PRODUCT_PERFORMANCE]: ProductAnalyticsSubCategory.PERFORMANCE,
  [ProductAnalyticsType.PRODUCT_SEASONAL]: ProductAnalyticsSubCategory.TRENDS,
  [ProductAnalyticsType.PRODUCT_TREND]: ProductAnalyticsSubCategory.TRENDS,
  [ProductAnalyticsType.PRODUCT_CUSTOMER]: ProductAnalyticsSubCategory.CUSTOMER,
  [ProductAnalyticsType.PRODUCT_WISHLIST]: ProductAnalyticsSubCategory.CUSTOMER,
  [ProductAnalyticsType.PRODUCT_SHARE]: ProductAnalyticsSubCategory.CUSTOMER,
};

/**
 * Get product analytics type sub-category
 */
export function getProductAnalyticsTypeSubCategory(
  type: ProductAnalyticsType
): ProductAnalyticsSubCategory {
  return PRODUCT_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get product analytics types by sub-category
 */
export function getProductAnalyticsTypesBySubCategory(
  subCategory: ProductAnalyticsSubCategory
): ProductAnalyticsType[] {
  return Object.entries(PRODUCT_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as ProductAnalyticsType);
}
