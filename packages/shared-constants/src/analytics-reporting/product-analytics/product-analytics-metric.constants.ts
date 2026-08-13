/**
 * @fileoverview Product analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Product analytics metrics
 */
export enum ProductAnalyticsMetric {
  /** Total number of products */
  TOTAL_PRODUCTS = 'TOTAL_PRODUCTS',
  /** Total product views */
  PRODUCT_VIEWS = 'PRODUCT_VIEWS',
  /** Product add to cart rate percentage */
  PRODUCT_ADD_TO_CART_RATE = 'PRODUCT_ADD_TO_CART_RATE',
  /** Product purchase rate percentage */
  PRODUCT_PURCHASE_RATE = 'PRODUCT_PURCHASE_RATE',
  /** Product conversion rate percentage */
  PRODUCT_CONVERSION_RATE = 'PRODUCT_CONVERSION_RATE',
  /** Product return rate percentage */
  PRODUCT_RETURN_RATE = 'PRODUCT_RETURN_RATE',
  /** Average product rating */
  PRODUCT_AVG_RATING = 'PRODUCT_AVG_RATING',
  /** Total product review count */
  PRODUCT_REVIEW_COUNT = 'PRODUCT_REVIEW_COUNT',
  /** Product wishlist count */
  PRODUCT_WISHLIST_COUNT = 'PRODUCT_WISHLIST_COUNT',
  /** Product share count */
  PRODUCT_SHARE_COUNT = 'PRODUCT_SHARE_COUNT',
  /** Product search count */
  PRODUCT_SEARCH_COUNT = 'PRODUCT_SEARCH_COUNT',
  /** Product category performance score */
  PRODUCT_CATEGORY_PERFORMANCE = 'PRODUCT_CATEGORY_PERFORMANCE',
  /** Product brand performance score */
  PRODUCT_BRAND_PERFORMANCE = 'PRODUCT_BRAND_PERFORMANCE',
  /** Product price elasticity */
  PRODUCT_PRICE_ELASTICITY = 'PRODUCT_PRICE_ELASTICITY',
  /** Product inventory turnover rate */
  PRODUCT_INVENTORY_TURNOVER = 'PRODUCT_INVENTORY_TURNOVER',
  /** Product revenue */
  PRODUCT_REVENUE = 'PRODUCT_REVENUE',
  /** Product profit margin percentage */
  PRODUCT_PROFIT_MARGIN = 'PRODUCT_PROFIT_MARGIN',
  /** Average days to sell product */
  PRODUCT_DAYS_TO_SELL = 'PRODUCT_DAYS_TO_SELL',
  /** Product stockout rate percentage */
  PRODUCT_STOCKOUT_RATE = 'PRODUCT_STOCKOUT_RATE',
  /** Product seasonal demand index */
  PRODUCT_SEASONAL_DEMAND = 'PRODUCT_SEASONAL_DEMAND',
  /** Product cross-sell rate percentage */
  PRODUCT_CROSS_SELL_RATE = 'PRODUCT_CROSS_SELL_RATE',
  /** Product up-sell rate percentage */
  PRODUCT_UPSELL_RATE = 'PRODUCT_UPSELL_RATE',
  /** Average product price */
  PRODUCT_AVG_PRICE = 'PRODUCT_AVG_PRICE',
  /** Product discount rate percentage */
  PRODUCT_DISCOUNT_RATE = 'PRODUCT_DISCOUNT_RATE',
  /** Product stock level */
  PRODUCT_STOCK_LEVEL = 'PRODUCT_STOCK_LEVEL',
  /** Product popularity score */
  PRODUCT_POPULARITY_SCORE = 'PRODUCT_POPULARITY_SCORE',
  /** Product engagement score */
  PRODUCT_ENGAGEMENT_SCORE = 'PRODUCT_ENGAGEMENT_SCORE',
  /** Product quality score */
  PRODUCT_QUALITY_SCORE = 'PRODUCT_QUALITY_SCORE',
  /** Product value score */
  PRODUCT_VALUE_SCORE = 'PRODUCT_VALUE_SCORE',
  /** Product availability percentage */
  PRODUCT_AVAILABILITY = 'PRODUCT_AVAILABILITY',
  /** Product return on investment */
  PRODUCT_ROI = 'PRODUCT_ROI',
  /** Product customer satisfaction */
  PRODUCT_CUSTOMER_SATISFACTION = 'PRODUCT_CUSTOMER_SATISFACTION',
}

/**
 * Product metric type classification
 */
export enum ProductAnalyticsMetricType {
  /** Product count metrics */
  COUNT = 'COUNT',
  /** Product rate metrics */
  RATE = 'RATE',
  /** Product financial metrics */
  FINANCIAL = 'FINANCIAL',
  /** Product engagement metrics */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Product performance metrics */
  PERFORMANCE = 'PERFORMANCE',
  /** Product inventory metrics */
  INVENTORY = 'INVENTORY',
  /** Product quality metrics */
  QUALITY = 'QUALITY',
  /** Product sales metrics */
  SALES = 'SALES',
}

/**
 * Product metric category mapping
 */
export const PRODUCT_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  ProductAnalyticsMetric,
  ProductAnalyticsMetricType
> = {
  [ProductAnalyticsMetric.TOTAL_PRODUCTS]: ProductAnalyticsMetricType.COUNT,
  [ProductAnalyticsMetric.PRODUCT_VIEWS]: ProductAnalyticsMetricType.ENGAGEMENT,
  [ProductAnalyticsMetric.PRODUCT_ADD_TO_CART_RATE]: ProductAnalyticsMetricType.RATE,
  [ProductAnalyticsMetric.PRODUCT_PURCHASE_RATE]: ProductAnalyticsMetricType.RATE,
  [ProductAnalyticsMetric.PRODUCT_CONVERSION_RATE]: ProductAnalyticsMetricType.RATE,
  [ProductAnalyticsMetric.PRODUCT_RETURN_RATE]: ProductAnalyticsMetricType.RATE,
  [ProductAnalyticsMetric.PRODUCT_AVG_RATING]: ProductAnalyticsMetricType.QUALITY,
  [ProductAnalyticsMetric.PRODUCT_REVIEW_COUNT]: ProductAnalyticsMetricType.ENGAGEMENT,
  [ProductAnalyticsMetric.PRODUCT_WISHLIST_COUNT]: ProductAnalyticsMetricType.ENGAGEMENT,
  [ProductAnalyticsMetric.PRODUCT_SHARE_COUNT]: ProductAnalyticsMetricType.ENGAGEMENT,
  [ProductAnalyticsMetric.PRODUCT_SEARCH_COUNT]: ProductAnalyticsMetricType.ENGAGEMENT,
  [ProductAnalyticsMetric.PRODUCT_CATEGORY_PERFORMANCE]: ProductAnalyticsMetricType.PERFORMANCE,
  [ProductAnalyticsMetric.PRODUCT_BRAND_PERFORMANCE]: ProductAnalyticsMetricType.PERFORMANCE,
  [ProductAnalyticsMetric.PRODUCT_PRICE_ELASTICITY]: ProductAnalyticsMetricType.FINANCIAL,
  [ProductAnalyticsMetric.PRODUCT_INVENTORY_TURNOVER]: ProductAnalyticsMetricType.INVENTORY,
  [ProductAnalyticsMetric.PRODUCT_REVENUE]: ProductAnalyticsMetricType.FINANCIAL,
  [ProductAnalyticsMetric.PRODUCT_PROFIT_MARGIN]: ProductAnalyticsMetricType.FINANCIAL,
  [ProductAnalyticsMetric.PRODUCT_DAYS_TO_SELL]: ProductAnalyticsMetricType.SALES,
  [ProductAnalyticsMetric.PRODUCT_STOCKOUT_RATE]: ProductAnalyticsMetricType.INVENTORY,
  [ProductAnalyticsMetric.PRODUCT_SEASONAL_DEMAND]: ProductAnalyticsMetricType.SALES,
  [ProductAnalyticsMetric.PRODUCT_CROSS_SELL_RATE]: ProductAnalyticsMetricType.SALES,
  [ProductAnalyticsMetric.PRODUCT_UPSELL_RATE]: ProductAnalyticsMetricType.SALES,
  [ProductAnalyticsMetric.PRODUCT_AVG_PRICE]: ProductAnalyticsMetricType.FINANCIAL,
  [ProductAnalyticsMetric.PRODUCT_DISCOUNT_RATE]: ProductAnalyticsMetricType.FINANCIAL,
  [ProductAnalyticsMetric.PRODUCT_STOCK_LEVEL]: ProductAnalyticsMetricType.INVENTORY,
  [ProductAnalyticsMetric.PRODUCT_POPULARITY_SCORE]: ProductAnalyticsMetricType.PERFORMANCE,
  [ProductAnalyticsMetric.PRODUCT_ENGAGEMENT_SCORE]: ProductAnalyticsMetricType.ENGAGEMENT,
  [ProductAnalyticsMetric.PRODUCT_QUALITY_SCORE]: ProductAnalyticsMetricType.QUALITY,
  [ProductAnalyticsMetric.PRODUCT_VALUE_SCORE]: ProductAnalyticsMetricType.PERFORMANCE,
  [ProductAnalyticsMetric.PRODUCT_AVAILABILITY]: ProductAnalyticsMetricType.INVENTORY,
  [ProductAnalyticsMetric.PRODUCT_ROI]: ProductAnalyticsMetricType.FINANCIAL,
  [ProductAnalyticsMetric.PRODUCT_CUSTOMER_SATISFACTION]: ProductAnalyticsMetricType.QUALITY,
};

/**
 * Product metric format type
 */
export enum ProductAnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Score format (0-100) */
  SCORE = 'SCORE',
  /** Ratio format */
  RATIO = 'RATIO',
  /** Rating format (0-5) */
  RATING = 'RATING',
  /** Time format (days) */
  TIME = 'TIME',
}

/**
 * Product metric configuration
 */
export interface ProductAnalyticsMetricConfig {
  label: string;
  description: string;
  format: ProductAnalyticsMetricFormat;
  icon?: string;
  color?: string;
  isReversed: boolean;
  priority: number;
  threshold?: {
    good: number;
    average: number;
    poor: number;
  };
}

export const PRODUCT_ANALYTICS_METRIC_CONFIG: Record<
  ProductAnalyticsMetric,
  ProductAnalyticsMetricConfig
> = {
  [ProductAnalyticsMetric.TOTAL_PRODUCTS]: {
    label: 'Total Products',
    description: 'Total number of products in catalog',
    format: ProductAnalyticsMetricFormat.NUMBER,
    icon: 'Package',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [ProductAnalyticsMetric.PRODUCT_VIEWS]: {
    label: 'Product Views',
    description: 'Total number of product views',
    format: ProductAnalyticsMetricFormat.NUMBER,
    icon: 'Eye',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_ADD_TO_CART_RATE]: {
    label: 'Add to Cart Rate',
    description: 'Rate of products added to cart',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'ShoppingCart',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 0.15,
      average: 0.1,
      poor: 0.05,
    },
  },
  [ProductAnalyticsMetric.PRODUCT_PURCHASE_RATE]: {
    label: 'Purchase Rate',
    description: 'Rate of products purchased',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'ShoppingBag',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 0.1,
      average: 0.05,
      poor: 0.02,
    },
  },
  [ProductAnalyticsMetric.PRODUCT_CONVERSION_RATE]: {
    label: 'Conversion Rate',
    description: 'Product view to purchase conversion rate',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 0.03,
      average: 0.02,
      poor: 0.01,
    },
  },
  [ProductAnalyticsMetric.PRODUCT_RETURN_RATE]: {
    label: 'Return Rate',
    description: 'Rate of product returns',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Undo',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 0.02,
      average: 0.05,
      poor: 0.1,
    },
  },
  [ProductAnalyticsMetric.PRODUCT_AVG_RATING]: {
    label: 'Average Rating',
    description: 'Average product rating (0-5)',
    format: ProductAnalyticsMetricFormat.RATING,
    icon: 'Star',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 4.0,
      average: 3.0,
      poor: 2.0,
    },
  },
  [ProductAnalyticsMetric.PRODUCT_REVIEW_COUNT]: {
    label: 'Review Count',
    description: 'Total number of product reviews',
    format: ProductAnalyticsMetricFormat.NUMBER,
    icon: 'MessageSquare',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_WISHLIST_COUNT]: {
    label: 'Wishlist Count',
    description: 'Number of products added to wishlist',
    format: ProductAnalyticsMetricFormat.NUMBER,
    icon: 'Heart',
    color: '#EC4899',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_SHARE_COUNT]: {
    label: 'Share Count',
    description: 'Number of product shares',
    format: ProductAnalyticsMetricFormat.NUMBER,
    icon: 'Share2',
    color: '#1DA1F2',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_SEARCH_COUNT]: {
    label: 'Search Count',
    description: 'Number of product searches',
    format: ProductAnalyticsMetricFormat.NUMBER,
    icon: 'Search',
    color: '#4285F4',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_CATEGORY_PERFORMANCE]: {
    label: 'Category Performance',
    description: 'Product category performance score',
    format: ProductAnalyticsMetricFormat.SCORE,
    icon: 'Folder',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_BRAND_PERFORMANCE]: {
    label: 'Brand Performance',
    description: 'Product brand performance score',
    format: ProductAnalyticsMetricFormat.SCORE,
    icon: 'Tag',
    color: '#6B7280',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_PRICE_ELASTICITY]: {
    label: 'Price Elasticity',
    description: 'Product price elasticity of demand',
    format: ProductAnalyticsMetricFormat.RATIO,
    icon: 'DollarSign',
    color: '#F59E0B',
    isReversed: false,
    priority: 3,
  },
  [ProductAnalyticsMetric.PRODUCT_INVENTORY_TURNOVER]: {
    label: 'Inventory Turnover',
    description: 'Rate of inventory turnover',
    format: ProductAnalyticsMetricFormat.RATIO,
    icon: 'Refresh',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_REVENUE]: {
    label: 'Revenue',
    description: 'Total revenue generated by products',
    format: ProductAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [ProductAnalyticsMetric.PRODUCT_PROFIT_MARGIN]: {
    label: 'Profit Margin',
    description: 'Product profit margin percentage',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 0.3,
      average: 0.2,
      poor: 0.1,
    },
  },
  [ProductAnalyticsMetric.PRODUCT_DAYS_TO_SELL]: {
    label: 'Days to Sell',
    description: 'Average days to sell a product',
    format: ProductAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_STOCKOUT_RATE]: {
    label: 'Stockout Rate',
    description: 'Rate of product stockouts',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'AlertTriangle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 0.05,
      average: 0.1,
      poor: 0.2,
    },
  },
  [ProductAnalyticsMetric.PRODUCT_SEASONAL_DEMAND]: {
    label: 'Seasonal Demand',
    description: 'Product seasonal demand index',
    format: ProductAnalyticsMetricFormat.SCORE,
    icon: 'Calendar',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_CROSS_SELL_RATE]: {
    label: 'Cross-Sell Rate',
    description: 'Rate of product cross-selling',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'ArrowRight',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_UPSELL_RATE]: {
    label: 'Up-Sell Rate',
    description: 'Rate of product up-selling',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'ArrowUp',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_AVG_PRICE]: {
    label: 'Average Price',
    description: 'Average product price',
    format: ProductAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#6B7280',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_DISCOUNT_RATE]: {
    label: 'Discount Rate',
    description: 'Average product discount rate',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Percent',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_STOCK_LEVEL]: {
    label: 'Stock Level',
    description: 'Current product stock level',
    format: ProductAnalyticsMetricFormat.NUMBER,
    icon: 'Package',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_POPULARITY_SCORE]: {
    label: 'Popularity Score',
    description: 'Product popularity score',
    format: ProductAnalyticsMetricFormat.SCORE,
    icon: 'TrendingUp',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_ENGAGEMENT_SCORE]: {
    label: 'Engagement Score',
    description: 'Product engagement score',
    format: ProductAnalyticsMetricFormat.SCORE,
    icon: 'Activity',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_QUALITY_SCORE]: {
    label: 'Quality Score',
    description: 'Product quality score',
    format: ProductAnalyticsMetricFormat.SCORE,
    icon: 'Shield',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_VALUE_SCORE]: {
    label: 'Value Score',
    description: 'Product value score',
    format: ProductAnalyticsMetricFormat.SCORE,
    icon: 'DollarSign',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_AVAILABILITY]: {
    label: 'Availability',
    description: 'Product availability percentage',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Package',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [ProductAnalyticsMetric.PRODUCT_ROI]: {
    label: 'ROI',
    description: 'Product return on investment',
    format: ProductAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [ProductAnalyticsMetric.PRODUCT_CUSTOMER_SATISFACTION]: {
    label: 'Customer Satisfaction',
    description: 'Product customer satisfaction score',
    format: ProductAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
  },
};

/**
 * Get product metric category
 */
export function getProductMetricCategory(
  metric: ProductAnalyticsMetric
): ProductAnalyticsMetricType {
  return PRODUCT_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get product metric label
 */
export function getProductMetricLabel(metric: ProductAnalyticsMetric): string {
  return PRODUCT_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get product metric description
 */
export function getProductMetricDescription(metric: ProductAnalyticsMetric): string {
  return PRODUCT_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get product metric format
 */
export function getProductMetricFormat(
  metric: ProductAnalyticsMetric
): ProductAnalyticsMetricFormat {
  return PRODUCT_ANALYTICS_METRIC_CONFIG[metric]?.format || ProductAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if product metric is reversed (lower is better)
 */
export function isProductMetricReversed(metric: ProductAnalyticsMetric): boolean {
  return PRODUCT_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get product metrics by category
 */
export function getProductMetricsByCategory(
  category: ProductAnalyticsMetricType
): ProductAnalyticsMetric[] {
  return Object.entries(PRODUCT_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as ProductAnalyticsMetric);
}

/**
 * Format product metric value
 */
export function formatProductMetricValue(metric: ProductAnalyticsMetric, value: number): string {
  const format = getProductMetricFormat(metric);

  switch (format) {
    case ProductAnalyticsMetricFormat.CURRENCY:
      return `$${value.toFixed(2)}`;
    case ProductAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case ProductAnalyticsMetricFormat.RATING:
      return value.toFixed(1);
    case ProductAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case ProductAnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    case ProductAnalyticsMetricFormat.TIME:
      return `${Math.round(value)} days`;
    default:
      return value.toLocaleString();
  }
}

/**
 * Get product metric priority
 */
export function getProductMetricPriority(metric: ProductAnalyticsMetric): number {
  return PRODUCT_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority product metrics
 */
export function getHighPriorityProductMetrics(): ProductAnalyticsMetric[] {
  return Object.values(ProductAnalyticsMetric).filter(
    (metric) => getProductMetricPriority(metric) === 1
  );
}

/**
 * Get product metric thresholds
 */
export function getProductMetricThreshold(
  metric: ProductAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return PRODUCT_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate product metric performance
 */
export function evaluateProductMetricPerformance(
  metric: ProductAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getProductMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isProductMetricReversed(metric);

  if (isReversed) {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.average) return 'average';
    return 'poor';
  } else {
    if (value >= threshold.good) return 'good';
    if (value >= threshold.average) return 'average';
    return 'poor';
  }
}

/**
 * Product dashboard metrics
 */
export const PRODUCT_DASHBOARD_METRICS: ProductAnalyticsMetric[] = [
  ProductAnalyticsMetric.TOTAL_PRODUCTS,
  ProductAnalyticsMetric.PRODUCT_VIEWS,
  ProductAnalyticsMetric.PRODUCT_CONVERSION_RATE,
  ProductAnalyticsMetric.PRODUCT_AVG_RATING,
  ProductAnalyticsMetric.PRODUCT_REVENUE,
  ProductAnalyticsMetric.PRODUCT_PROFIT_MARGIN,
  ProductAnalyticsMetric.PRODUCT_INVENTORY_TURNOVER,
  ProductAnalyticsMetric.PRODUCT_DAYS_TO_SELL,
];

/**
 * Product performance metrics
 */
export const PRODUCT_PERFORMANCE_METRICS: ProductAnalyticsMetric[] = [
  ProductAnalyticsMetric.PRODUCT_CONVERSION_RATE,
  ProductAnalyticsMetric.PRODUCT_PURCHASE_RATE,
  ProductAnalyticsMetric.PRODUCT_ADD_TO_CART_RATE,
  ProductAnalyticsMetric.PRODUCT_RETURN_RATE,
  ProductAnalyticsMetric.PRODUCT_AVG_RATING,
  ProductAnalyticsMetric.PRODUCT_REVIEW_COUNT,
];

/**
 * Product financial metrics
 */
export const PRODUCT_FINANCIAL_METRICS: ProductAnalyticsMetric[] = [
  ProductAnalyticsMetric.PRODUCT_REVENUE,
  ProductAnalyticsMetric.PRODUCT_PROFIT_MARGIN,
  ProductAnalyticsMetric.PRODUCT_AVG_PRICE,
  ProductAnalyticsMetric.PRODUCT_DISCOUNT_RATE,
  ProductAnalyticsMetric.PRODUCT_ROI,
  ProductAnalyticsMetric.PRODUCT_PRICE_ELASTICITY,
];

/**
 * Product inventory metrics
 */
export const PRODUCT_INVENTORY_METRICS: ProductAnalyticsMetric[] = [
  ProductAnalyticsMetric.PRODUCT_INVENTORY_TURNOVER,
  ProductAnalyticsMetric.PRODUCT_STOCK_LEVEL,
  ProductAnalyticsMetric.PRODUCT_STOCKOUT_RATE,
  ProductAnalyticsMetric.PRODUCT_AVAILABILITY,
  ProductAnalyticsMetric.PRODUCT_DAYS_TO_SELL,
];

/**
 * Product engagement metrics
 */
export const PRODUCT_ENGAGEMENT_METRICS: ProductAnalyticsMetric[] = [
  ProductAnalyticsMetric.PRODUCT_VIEWS,
  ProductAnalyticsMetric.PRODUCT_WISHLIST_COUNT,
  ProductAnalyticsMetric.PRODUCT_SHARE_COUNT,
  ProductAnalyticsMetric.PRODUCT_SEARCH_COUNT,
  ProductAnalyticsMetric.PRODUCT_ENGAGEMENT_SCORE,
  ProductAnalyticsMetric.PRODUCT_POPULARITY_SCORE,
];

/**
 * Product quality metrics
 */
export const PRODUCT_QUALITY_METRICS: ProductAnalyticsMetric[] = [
  ProductAnalyticsMetric.PRODUCT_AVG_RATING,
  ProductAnalyticsMetric.PRODUCT_REVIEW_COUNT,
  ProductAnalyticsMetric.PRODUCT_QUALITY_SCORE,
  ProductAnalyticsMetric.PRODUCT_CUSTOMER_SATISFACTION,
  ProductAnalyticsMetric.PRODUCT_VALUE_SCORE,
];
