/**
 * Product Analytics Metric Constants
 * Metrics for measuring product performance and analytics
 */

export const PRODUCT_ANALYTICS_METRIC = {
  // Product Count Metrics
  COUNT_METRICS: {
    TOTAL_PRODUCTS: 'total_products',
    ACTIVE_PRODUCTS: 'active_products',
    INACTIVE_PRODUCTS: 'inactive_products',
    NEW_PRODUCTS: 'new_products',
    DISCOUNTED_PRODUCTS: 'discounted_products',
    OUT_OF_STOCK_PRODUCTS: 'out_of_stock_products',
    LOW_STOCK_PRODUCTS: 'low_stock_products',
    PRE_ORDER_PRODUCTS: 'pre_order_products',
    DISCONTINUED_PRODUCTS: 'discontinued_products',
    BUNDLE_PRODUCTS: 'bundle_products',
    DIGITAL_PRODUCTS: 'digital_products',
  } as const,

  // Product View Metrics
  VIEW_METRICS: {
    TOTAL_VIEWS: 'total_views',
    UNIQUE_VIEWS: 'unique_views',
    AVG_VIEWS_PER_DAY: 'avg_views_per_day',
    AVG_VIEWS_PER_PRODUCT: 'avg_views_per_product',
    VIEWS_PER_CATEGORY: 'views_per_category',
    VIEWS_PER_BRAND: 'views_per_brand',
    VIEWS_PER_VENDOR: 'views_per_vendor',
  } as const,

  // Product Engagement Metrics
  ENGAGEMENT_METRICS: {
    CLICK_THROUGH_RATE: 'click_through_rate',
    VIEW_TO_CART_RATE: 'view_to_cart_rate',
    CART_TO_PURCHASE_RATE: 'cart_to_purchase_rate',
    WISHLIST_RATE: 'wishlist_rate',
    COMPARE_RATE: 'compare_rate',
    SHARE_RATE: 'share_rate',
    REVIEW_RATE: 'review_rate',
    ENGAGEMENT_SCORE: 'engagement_score',
  } as const,

  // Product Sales Metrics
  SALES_METRICS: {
    TOTAL_SALES: 'total_sales',
    UNITS_SOLD: 'units_sold',
    AVG_DAILY_SALES: 'avg_daily_sales',
    AVG_WEEKLY_SALES: 'avg_weekly_sales',
    AVG_MONTHLY_SALES: 'avg_monthly_sales',
    SALES_PER_CATEGORY: 'sales_per_category',
    SALES_PER_BRAND: 'sales_per_brand',
    SALES_PER_VENDOR: 'sales_per_vendor',
    SALES_PER_PRODUCT: 'sales_per_product',
  } as const,

  // Product Revenue Metrics
  REVENUE_METRICS: {
    TOTAL_REVENUE: 'total_revenue',
    AVG_DAILY_REVENUE: 'avg_daily_revenue',
    AVG_WEEKLY_REVENUE: 'avg_weekly_revenue',
    AVG_MONTHLY_REVENUE: 'avg_monthly_revenue',
    REVENUE_PER_PRODUCT: 'revenue_per_product',
    REVENUE_PER_CATEGORY: 'revenue_per_category',
    REVENUE_PER_BRAND: 'revenue_per_brand',
    REVENUE_PER_VENDOR: 'revenue_per_vendor',
    REVENUE_PER_ORDER: 'revenue_per_order',
  } as const,

  // Product Profit Metrics
  PROFIT_METRICS: {
    TOTAL_PROFIT: 'total_profit',
    AVG_DAILY_PROFIT: 'avg_daily_profit',
    PROFIT_PER_PRODUCT: 'profit_per_product',
    PROFIT_PER_CATEGORY: 'profit_per_category',
    PROFIT_PER_BRAND: 'profit_per_brand',
    PROFIT_PER_VENDOR: 'profit_per_vendor',
    PROFIT_MARGIN: 'profit_margin',
    GROSS_MARGIN: 'gross_margin',
    NET_MARGIN: 'net_margin',
  } as const,

  // Product Inventory Metrics
  INVENTORY_METRICS: {
    TOTAL_INVENTORY_VALUE: 'total_inventory_value',
    AVG_INVENTORY_VALUE: 'avg_inventory_value',
    TURNOVER_RATE: 'turnover_rate',
    INVENTORY_TURNOVER: 'inventory_turnover',
    STOCK_DAYS: 'stock_days',
    REORDER_POINT: 'reorder_point',
    SAFETY_STOCK: 'safety_stock',
    STOCK_RATE: 'stock_rate',
    OUT_OF_STOCK_RATE: 'out_of_stock_rate',
  } as const,

  // Product Performance Metrics
  PERFORMANCE_METRICS: {
    PERFORMANCE_SCORE: 'performance_score',
    CONVERSION_RATE: 'conversion_rate',
    RETURN_RATE: 'return_rate',
    REFUND_RATE: 'refund_rate',
    SATISFACTION_SCORE: 'satisfaction_score',
    RECOMMENDATION_SCORE: 'recommendation_score',
    COMPETITIVE_SCORE: 'competitive_score',
    GROWTH_RATE: 'growth_rate',
    DECLINE_RATE: 'decline_rate',
  } as const,

  // Product Review Metrics
  REVIEW_METRICS: {
    TOTAL_REVIEWS: 'total_reviews',
    AVG_RATING: 'avg_rating',
    POSITIVE_REVIEW_RATE: 'positive_review_rate',
    NEGATIVE_REVIEW_RATE: 'negative_review_rate',
    NEUTRAL_REVIEW_RATE: 'neutral_review_rate',
    REVIEWS_PER_PRODUCT: 'reviews_per_product',
    REVIEWS_PER_DAY: 'reviews_per_day',
    FLAGGED_REVIEWS: 'flagged_reviews',
    SPAM_REVIEWS: 'spam_reviews',
  } as const,

  // Metric Categories
  CATEGORIES: {
    COUNT: 'count',
    VIEW: 'view',
    ENGAGEMENT: 'engagement',
    SALES: 'sales',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    INVENTORY: 'inventory',
    PERFORMANCE: 'performance',
    REVIEW: 'review',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    SCORE: 'score',
    RATE: 'rate',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    DURATION: 'duration',
    RATING: 'rating',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Product Analytics Count Metrics
export type ProductAnalyticsCountMetric =
  (typeof PRODUCT_ANALYTICS_METRIC.COUNT_METRICS)[keyof typeof PRODUCT_ANALYTICS_METRIC.COUNT_METRICS];

// Product Analytics View Metrics
export type ProductAnalyticsViewMetric =
  (typeof PRODUCT_ANALYTICS_METRIC.VIEW_METRICS)[keyof typeof PRODUCT_ANALYTICS_METRIC.VIEW_METRICS];

// Product Analytics Engagement Metrics
export type ProductAnalyticsEngagementMetric =
  (typeof PRODUCT_ANALYTICS_METRIC.ENGAGEMENT_METRICS)[keyof typeof PRODUCT_ANALYTICS_METRIC.ENGAGEMENT_METRICS];

// Product Analytics Sales Metrics
export type ProductAnalyticsSalesMetric =
  (typeof PRODUCT_ANALYTICS_METRIC.SALES_METRICS)[keyof typeof PRODUCT_ANALYTICS_METRIC.SALES_METRICS];

// Product Analytics Revenue Metrics
export type ProductAnalyticsRevenueMetric =
  (typeof PRODUCT_ANALYTICS_METRIC.REVENUE_METRICS)[keyof typeof PRODUCT_ANALYTICS_METRIC.REVENUE_METRICS];

// Product Analytics Profit Metrics
export type ProductAnalyticsProfitMetric =
  (typeof PRODUCT_ANALYTICS_METRIC.PROFIT_METRICS)[keyof typeof PRODUCT_ANALYTICS_METRIC.PROFIT_METRICS];

// Product Analytics Inventory Metrics
export type ProductAnalyticsInventoryMetric =
  (typeof PRODUCT_ANALYTICS_METRIC.INVENTORY_METRICS)[keyof typeof PRODUCT_ANALYTICS_METRIC.INVENTORY_METRICS];

// Product Analytics Performance Metrics
export type ProductAnalyticsPerformanceMetric =
  (typeof PRODUCT_ANALYTICS_METRIC.PERFORMANCE_METRICS)[keyof typeof PRODUCT_ANALYTICS_METRIC.PERFORMANCE_METRICS];

// Product Analytics Review Metrics
export type ProductAnalyticsReviewMetric =
  (typeof PRODUCT_ANALYTICS_METRIC.REVIEW_METRICS)[keyof typeof PRODUCT_ANALYTICS_METRIC.REVIEW_METRICS];

// Product Analytics Metric Categories
export type ProductAnalyticsMetricCategory =
  (typeof PRODUCT_ANALYTICS_METRIC.CATEGORIES)[keyof typeof PRODUCT_ANALYTICS_METRIC.CATEGORIES];

// Product Analytics Metric Types
export type ProductAnalyticsMetricType =
  (typeof PRODUCT_ANALYTICS_METRIC.TYPES)[keyof typeof PRODUCT_ANALYTICS_METRIC.TYPES];

// Product Analytics Metric Formats
export type ProductAnalyticsMetricFormat =
  (typeof PRODUCT_ANALYTICS_METRIC.FORMATS)[keyof typeof PRODUCT_ANALYTICS_METRIC.FORMATS];

// Product Analytics Metric Priority
export type ProductAnalyticsMetricPriority =
  (typeof PRODUCT_ANALYTICS_METRIC.PRIORITY)[keyof typeof PRODUCT_ANALYTICS_METRIC.PRIORITY];

// Product Analytics Metric Labels
export function getProductAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Count Metrics
    total_products: 'Total Products',
    active_products: 'Active Products',
    inactive_products: 'Inactive Products',
    new_products: 'New Products',
    discounted_products: 'Discounted Products',
    out_of_stock_products: 'Out of Stock Products',
    low_stock_products: 'Low Stock Products',
    pre_order_products: 'Pre-Order Products',
    discontinued_products: 'Discontinued Products',
    bundle_products: 'Bundle Products',
    digital_products: 'Digital Products',

    // View Metrics
    total_views: 'Total Views',
    unique_views: 'Unique Views',
    avg_views_per_day: 'Avg Views Per Day',
    avg_views_per_product: 'Avg Views Per Product',
    views_per_category: 'Views Per Category',
    views_per_brand: 'Views Per Brand',
    views_per_vendor: 'Views Per Vendor',

    // Engagement Metrics
    click_through_rate: 'Click-through Rate',
    view_to_cart_rate: 'View to Cart Rate',
    cart_to_purchase_rate: 'Cart to Purchase Rate',
    wishlist_rate: 'Wishlist Rate',
    compare_rate: 'Compare Rate',
    share_rate: 'Share Rate',
    review_rate: 'Review Rate',
    engagement_score: 'Engagement Score',

    // Sales Metrics
    total_sales: 'Total Sales',
    units_sold: 'Units Sold',
    avg_daily_sales: 'Avg Daily Sales',
    avg_weekly_sales: 'Avg Weekly Sales',
    avg_monthly_sales: 'Avg Monthly Sales',
    sales_per_category: 'Sales Per Category',
    sales_per_brand: 'Sales Per Brand',
    sales_per_vendor: 'Sales Per Vendor',
    sales_per_product: 'Sales Per Product',

    // Revenue Metrics
    total_revenue: 'Total Revenue',
    avg_daily_revenue: 'Avg Daily Revenue',
    avg_weekly_revenue: 'Avg Weekly Revenue',
    avg_monthly_revenue: 'Avg Monthly Revenue',
    revenue_per_product: 'Revenue Per Product',
    revenue_per_category: 'Revenue Per Category',
    revenue_per_brand: 'Revenue Per Brand',
    revenue_per_vendor: 'Revenue Per Vendor',
    revenue_per_order: 'Revenue Per Order',

    // Profit Metrics
    total_profit: 'Total Profit',
    avg_daily_profit: 'Avg Daily Profit',
    profit_per_product: 'Profit Per Product',
    profit_per_category: 'Profit Per Category',
    profit_per_brand: 'Profit Per Brand',
    profit_per_vendor: 'Profit Per Vendor',
    profit_margin: 'Profit Margin',
    gross_margin: 'Gross Margin',
    net_margin: 'Net Margin',

    // Inventory Metrics
    total_inventory_value: 'Total Inventory Value',
    avg_inventory_value: 'Avg Inventory Value',
    turnover_rate: 'Turnover Rate',
    inventory_turnover: 'Inventory Turnover',
    stock_days: 'Stock Days',
    reorder_point: 'Reorder Point',
    safety_stock: 'Safety Stock',
    stock_rate: 'Stock Rate',
    out_of_stock_rate: 'Out of Stock Rate',

    // Performance Metrics
    performance_score: 'Performance Score',
    conversion_rate: 'Conversion Rate',
    return_rate: 'Return Rate',
    refund_rate: 'Refund Rate',
    satisfaction_score: 'Satisfaction Score',
    recommendation_score: 'Recommendation Score',
    competitive_score: 'Competitive Score',
    growth_rate: 'Growth Rate',
    decline_rate: 'Decline Rate',

    // Review Metrics
    total_reviews: 'Total Reviews',
    avg_rating: 'Avg Rating',
    positive_review_rate: 'Positive Review Rate',
    negative_review_rate: 'Negative Review Rate',
    neutral_review_rate: 'Neutral Review Rate',
    reviews_per_product: 'Reviews Per Product',
    reviews_per_day: 'Reviews Per Day',
    flagged_reviews: 'Flagged Reviews',
    spam_reviews: 'Spam Reviews',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Product Analytics Metric Category Labels
export function getProductAnalyticsMetricCategoryLabel(
  category: ProductAnalyticsMetricCategory
): string {
  const labels: Record<ProductAnalyticsMetricCategory, string> = {
    [PRODUCT_ANALYTICS_METRIC.CATEGORIES.COUNT]: 'Count',
    [PRODUCT_ANALYTICS_METRIC.CATEGORIES.VIEW]: 'View',
    [PRODUCT_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [PRODUCT_ANALYTICS_METRIC.CATEGORIES.SALES]: 'Sales',
    [PRODUCT_ANALYTICS_METRIC.CATEGORIES.REVENUE]: 'Revenue',
    [PRODUCT_ANALYTICS_METRIC.CATEGORIES.PROFIT]: 'Profit',
    [PRODUCT_ANALYTICS_METRIC.CATEGORIES.INVENTORY]: 'Inventory',
    [PRODUCT_ANALYTICS_METRIC.CATEGORIES.PERFORMANCE]: 'Performance',
    [PRODUCT_ANALYTICS_METRIC.CATEGORIES.REVIEW]: 'Review',
  };
  return labels[category] || 'Unknown';
}

// Product Analytics Metric Type Labels
export function getProductAnalyticsMetricTypeLabel(type: ProductAnalyticsMetricType): string {
  const labels: Record<ProductAnalyticsMetricType, string> = {
    [PRODUCT_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [PRODUCT_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [PRODUCT_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [PRODUCT_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [PRODUCT_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
    [PRODUCT_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
  };
  return labels[type] || 'Unknown';
}

// Product Analytics Metric Format Labels
export function getProductAnalyticsMetricFormatLabel(format: ProductAnalyticsMetricFormat): string {
  const labels: Record<ProductAnalyticsMetricFormat, string> = {
    [PRODUCT_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [PRODUCT_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [PRODUCT_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [PRODUCT_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [PRODUCT_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [PRODUCT_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Product Analytics Metric Priority Labels
export function getProductAnalyticsMetricPriorityLabel(
  priority: ProductAnalyticsMetricPriority
): string {
  const labels: Record<ProductAnalyticsMetricPriority, string> = {
    [PRODUCT_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [PRODUCT_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [PRODUCT_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [PRODUCT_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getProductAnalyticsMetricCategory(metric: string): ProductAnalyticsMetricCategory {
  const countMetrics: readonly string[] = Object.values(PRODUCT_ANALYTICS_METRIC.COUNT_METRICS);
  const viewMetrics: readonly string[] = Object.values(PRODUCT_ANALYTICS_METRIC.VIEW_METRICS);
  const engagementMetrics: readonly string[] = Object.values(
    PRODUCT_ANALYTICS_METRIC.ENGAGEMENT_METRICS
  );
  const salesMetrics: readonly string[] = Object.values(PRODUCT_ANALYTICS_METRIC.SALES_METRICS);
  const revenueMetrics: readonly string[] = Object.values(PRODUCT_ANALYTICS_METRIC.REVENUE_METRICS);
  const profitMetrics: readonly string[] = Object.values(PRODUCT_ANALYTICS_METRIC.PROFIT_METRICS);
  const inventoryMetrics: readonly string[] = Object.values(
    PRODUCT_ANALYTICS_METRIC.INVENTORY_METRICS
  );
  const performanceMetrics: readonly string[] = Object.values(
    PRODUCT_ANALYTICS_METRIC.PERFORMANCE_METRICS
  );
  const reviewMetrics: readonly string[] = Object.values(PRODUCT_ANALYTICS_METRIC.REVIEW_METRICS);

  if (countMetrics.includes(metric)) return PRODUCT_ANALYTICS_METRIC.CATEGORIES.COUNT;
  if (viewMetrics.includes(metric)) return PRODUCT_ANALYTICS_METRIC.CATEGORIES.VIEW;
  if (engagementMetrics.includes(metric)) return PRODUCT_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT;
  if (salesMetrics.includes(metric)) return PRODUCT_ANALYTICS_METRIC.CATEGORIES.SALES;
  if (revenueMetrics.includes(metric)) return PRODUCT_ANALYTICS_METRIC.CATEGORIES.REVENUE;
  if (profitMetrics.includes(metric)) return PRODUCT_ANALYTICS_METRIC.CATEGORIES.PROFIT;
  if (inventoryMetrics.includes(metric)) return PRODUCT_ANALYTICS_METRIC.CATEGORIES.INVENTORY;
  if (performanceMetrics.includes(metric)) return PRODUCT_ANALYTICS_METRIC.CATEGORIES.PERFORMANCE;
  if (reviewMetrics.includes(metric)) return PRODUCT_ANALYTICS_METRIC.CATEGORIES.REVIEW;

  return PRODUCT_ANALYTICS_METRIC.CATEGORIES.COUNT;
}

// Get metric type
export function getProductAnalyticsMetricType(metric: string): ProductAnalyticsMetricType {
  const percentageMetrics: readonly string[] = [
    'rate',
    'percentage',
    'margin',
    'conversion',
    'return',
    'refund',
    'growth',
    'decline',
    'turnover',
    'stock',
  ];

  const averageMetrics: readonly string[] = ['avg', 'average', 'mean'];

  const scoreMetrics: readonly string[] = ['score', 'rating', 'nps', 'csat'];

  const lowerMetric = metric.toLowerCase();

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return PRODUCT_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am: string) => lowerMetric.includes(am))) {
    return PRODUCT_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm: string) => lowerMetric.includes(sm))) {
    return PRODUCT_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return PRODUCT_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getProductAnalyticsMetricFormat(metric: string): ProductAnalyticsMetricFormat {
  const currencyMetrics: readonly string[] = [
    'revenue',
    'profit',
    'value',
    'price',
    'cost',
    'margin',
  ];

  const percentageMetrics: readonly string[] = [
    'rate',
    'percentage',
    'margin',
    'turnover',
    'stock',
  ];

  const ratingMetrics: readonly string[] = ['score', 'rating', 'nps', 'csat'];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm: string) => lowerMetric.includes(cm))) {
    return PRODUCT_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (ratingMetrics.some((rm: string) => lowerMetric.includes(rm))) {
    return PRODUCT_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm: string) => lowerMetric.includes(pm))) {
    return PRODUCT_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return PRODUCT_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate product conversion rate
export function calculateProductAnalyticsConversionRate(purchases: number, views: number): number {
  if (views === 0) return 0;
  return (purchases / views) * 100;
}

// Calculate product return rate
export function calculateProductAnalyticsReturnRate(returns: number, purchases: number): number {
  if (purchases === 0) return 0;
  return (returns / purchases) * 100;
}

// Calculate product profit margin
export function calculateProductAnalyticsProfitMargin(profit: number, revenue: number): number {
  if (revenue === 0) return 0;
  return (profit / revenue) * 100;
}

// Calculate product turnover rate
export function calculateProductAnalyticsTurnoverRate(
  unitsSold: number,
  avgInventory: number
): number {
  if (avgInventory === 0) return 0;
  return unitsSold / avgInventory;
}
