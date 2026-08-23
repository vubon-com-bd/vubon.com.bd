/**
 * Product Analytics Type Constants
 * Types of product analytics data and analysis
 */

export const PRODUCT_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Performance Analysis
    PERFORMANCE: 'performance',
    SALES_ANALYSIS: 'sales_analysis',
    REVENUE_ANALYSIS: 'revenue_analysis',
    PROFIT_ANALYSIS: 'profit_analysis',
    MARGIN_ANALYSIS: 'margin_analysis',

    // Category Analysis
    CATEGORY_ANALYSIS: 'category_analysis',
    BRAND_ANALYSIS: 'brand_analysis',
    VENDOR_ANALYSIS: 'vendor_analysis',
    COLLECTION_ANALYSIS: 'collection_analysis',

    // Inventory Analysis
    INVENTORY_ANALYSIS: 'inventory_analysis',
    STOCK_ANALYSIS: 'stock_analysis',
    TURNOVER_ANALYSIS: 'turnover_analysis',
    AVAILABILITY_ANALYSIS: 'availability_analysis',

    // Pricing Analysis
    PRICING_ANALYSIS: 'pricing_analysis',
    DISCOUNT_ANALYSIS: 'discount_analysis',
    PROMOTION_ANALYSIS: 'promotion_analysis',
    COMPETITIVE_ANALYSIS: 'competitive_analysis',

    // Customer Analysis
    CUSTOMER_ANALYSIS: 'customer_analysis',
    PURCHASE_ANALYSIS: 'purchase_analysis',
    RETURN_ANALYSIS: 'return_analysis',
    REVIEW_ANALYSIS: 'review_analysis',

    // Comparative Analysis
    COMPARATIVE: 'comparative',
    YEAR_OVER_YEAR: 'year_over_year',
    PERIOD_OVER_PERIOD: 'period_over_period',
    BENCHMARK: 'benchmark',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
    DEMAND: 'demand',
  } as const,

  // Data Types
  DATA_TYPES: {
    // Product Data
    PRODUCT_DATA: 'product_data',
    CATEGORY_DATA: 'category_data',
    BRAND_DATA: 'brand_data',
    VENDOR_DATA: 'vendor_data',

    // Transaction Data
    TRANSACTION_DATA: 'transaction_data',
    PURCHASE_DATA: 'purchase_data',
    RETURN_DATA: 'return_data',
    REFUND_DATA: 'refund_data',

    // Behavioral Data
    VIEW_DATA: 'view_data',
    CLICK_DATA: 'click_data',
    CART_DATA: 'cart_data',
    WISHLIST_DATA: 'wishlist_data',

    // Review Data
    REVIEW_DATA: 'review_data',
    RATING_DATA: 'rating_data',
    FEEDBACK_DATA: 'feedback_data',

    // Inventory Data
    INVENTORY_DATA: 'inventory_data',
    STOCK_DATA: 'stock_data',
    SUPPLY_DATA: 'supply_data',
  } as const,

  // Product Categories
  PRODUCT_CATEGORIES: {
    // Main Categories
    ELECTRONICS: 'electronics',
    FASHION: 'fashion',
    HOME: 'home',
    BEAUTY: 'beauty',
    FOOD: 'food',
    HEALTH: 'health',
    BOOKS: 'books',
    SPORTS: 'sports',
    TOYS: 'toys',
    AUTO: 'auto',

    // Sub Categories
    ELECTRONICS_MOBILE: 'electronics_mobile',
    ELECTRONICS_LAPTOP: 'electronics_laptop',
    ELECTRONICS_TV: 'electronics_tv',
    ELECTRONICS_AUDIO: 'electronics_audio',
    FASHION_MEN: 'fashion_men',
    FASHION_WOMEN: 'fashion_women',
    FASHION_KIDS: 'fashion_kids',
    HOME_FURNITURE: 'home_furniture',
    HOME_DECOR: 'home_decor',
    HOME_KITCHEN: 'home_kitchen',
    BEAUTY_SKINCARE: 'beauty_skincare',
    BEAUTY_MAKEUP: 'beauty_makeup',
    BEAUTY_FRAGRANCE: 'beauty_fragrance',
    HEALTH_SUPPLEMENTS: 'health_supplements',
    HEALTH_EQUIPMENT: 'health_equipment',
    FOOD_GROCERY: 'food_grocery',
    FOOD_BEVERAGE: 'food_beverage',
    BOOKS_FICTION: 'books_fiction',
    BOOKS_NON_FICTION: 'books_non_fiction',
    BOOKS_EDUCATIONAL: 'books_educational',
  } as const,

  // Product Status
  PRODUCT_STATUS: {
    DRAFT: 'draft',
    PENDING: 'pending',
    PUBLISHED: 'published',
    UNPUBLISHED: 'unpublished',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued',
  } as const,

  // Product Types
  PRODUCT_TYPES: {
    SIMPLE: 'simple',
    VARIABLE: 'variable',
    BUNDLE: 'bundle',
    DIGITAL: 'digital',
    DOWNLOADABLE: 'downloadable',
    SUBSCRIPTION: 'subscription',
    SERVICE: 'service',
  } as const,

  // Product Stock Status
  STOCK_STATUS: {
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    LOW_STOCK: 'low_stock',
    BACK_ORDER: 'back_order',
    PRE_ORDER: 'pre_order',
    DISCONTINUED: 'discontinued',
  } as const,

  // Product Pricing Types
  PRICING_TYPES: {
    FIXED: 'fixed',
    VARIABLE: 'variable',
    DYNAMIC: 'dynamic',
    DISCOUNTED: 'discounted',
    PROMOTIONAL: 'promotional',
    BUNDLED: 'bundled',
  } as const,

  // Product Performance Levels
  PERFORMANCE_LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Product Review Types
  REVIEW_TYPES: {
    POSITIVE: 'positive',
    NEGATIVE: 'negative',
    NEUTRAL: 'neutral',
    SPAM: 'spam',
    FLAGGED: 'flagged',
  } as const,
} as const;

// Product Analytics Analysis Types
export type ProductAnalyticsAnalysisType =
  (typeof PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Product Analytics Data Types
export type ProductAnalyticsDataType =
  (typeof PRODUCT_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof PRODUCT_ANALYTICS_TYPE.DATA_TYPES];

// Product Analytics Product Categories
export type ProductAnalyticsProductCategory =
  (typeof PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES)[keyof typeof PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES];

// Product Analytics Product Status
export type ProductAnalyticsProductStatus =
  (typeof PRODUCT_ANALYTICS_TYPE.PRODUCT_STATUS)[keyof typeof PRODUCT_ANALYTICS_TYPE.PRODUCT_STATUS];

// Product Analytics Product Types
export type ProductAnalyticsProductType =
  (typeof PRODUCT_ANALYTICS_TYPE.PRODUCT_TYPES)[keyof typeof PRODUCT_ANALYTICS_TYPE.PRODUCT_TYPES];

// Product Analytics Stock Status
export type ProductAnalyticsStockStatus =
  (typeof PRODUCT_ANALYTICS_TYPE.STOCK_STATUS)[keyof typeof PRODUCT_ANALYTICS_TYPE.STOCK_STATUS];

// Product Analytics Pricing Types
export type ProductAnalyticsPricingType =
  (typeof PRODUCT_ANALYTICS_TYPE.PRICING_TYPES)[keyof typeof PRODUCT_ANALYTICS_TYPE.PRICING_TYPES];

// Product Analytics Performance Levels
export type ProductAnalyticsPerformanceLevel =
  (typeof PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS)[keyof typeof PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS];

// Product Analytics Review Types
export type ProductAnalyticsReviewType =
  (typeof PRODUCT_ANALYTICS_TYPE.REVIEW_TYPES)[keyof typeof PRODUCT_ANALYTICS_TYPE.REVIEW_TYPES];

// Product Analytics Analysis Type Labels
export function getProductAnalyticsAnalysisTypeLabel(type: ProductAnalyticsAnalysisType): string {
  const labels: Record<ProductAnalyticsAnalysisType, string> = {
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE]: 'Performance Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.SALES_ANALYSIS]: 'Sales Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_ANALYSIS]: 'Revenue Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_ANALYSIS]: 'Profit Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.MARGIN_ANALYSIS]: 'Margin Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.CATEGORY_ANALYSIS]: 'Category Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND_ANALYSIS]: 'Brand Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.VENDOR_ANALYSIS]: 'Vendor Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.COLLECTION_ANALYSIS]: 'Collection Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.INVENTORY_ANALYSIS]: 'Inventory Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.STOCK_ANALYSIS]: 'Stock Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.TURNOVER_ANALYSIS]: 'Turnover Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.AVAILABILITY_ANALYSIS]: 'Availability Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.PRICING_ANALYSIS]: 'Pricing Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.DISCOUNT_ANALYSIS]: 'Discount Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.PROMOTION_ANALYSIS]: 'Promotion Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPETITIVE_ANALYSIS]: 'Competitive Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.CUSTOMER_ANALYSIS]: 'Customer Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.PURCHASE_ANALYSIS]: 'Purchase Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.RETURN_ANALYSIS]: 'Return Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.REVIEW_ANALYSIS]: 'Review Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.PERIOD_OVER_PERIOD]: 'Period Over Period',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.BENCHMARK]: 'Benchmark Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
    [PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMAND]: 'Demand Analysis',
  };
  return labels[type] || 'Unknown';
}

// Product Analytics Data Type Labels
export function getProductAnalyticsDataTypeLabel(type: ProductAnalyticsDataType): string {
  const labels: Record<ProductAnalyticsDataType, string> = {
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.PRODUCT_DATA]: 'Product Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.CATEGORY_DATA]: 'Category Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.BRAND_DATA]: 'Brand Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.VENDOR_DATA]: 'Vendor Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.TRANSACTION_DATA]: 'Transaction Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.PURCHASE_DATA]: 'Purchase Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.RETURN_DATA]: 'Return Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.REFUND_DATA]: 'Refund Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.VIEW_DATA]: 'View Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.CLICK_DATA]: 'Click Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.CART_DATA]: 'Cart Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.WISHLIST_DATA]: 'Wishlist Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.REVIEW_DATA]: 'Review Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.RATING_DATA]: 'Rating Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.FEEDBACK_DATA]: 'Feedback Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.INVENTORY_DATA]: 'Inventory Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.STOCK_DATA]: 'Stock Data',
    [PRODUCT_ANALYTICS_TYPE.DATA_TYPES.SUPPLY_DATA]: 'Supply Data',
  };
  return labels[type] || 'Unknown';
}

// Product Analytics Product Category Labels
export function getProductAnalyticsProductCategoryLabel(
  category: ProductAnalyticsProductCategory
): string {
  const labels: Record<ProductAnalyticsProductCategory, string> = {
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.ELECTRONICS]: 'Electronics',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.FASHION]: 'Fashion',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.HOME]: 'Home',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.BEAUTY]: 'Beauty',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.FOOD]: 'Food',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.HEALTH]: 'Health',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.BOOKS]: 'Books',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.SPORTS]: 'Sports',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.TOYS]: 'Toys',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.AUTO]: 'Auto',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.ELECTRONICS_MOBILE]: 'Mobile Phones',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.ELECTRONICS_LAPTOP]: 'Laptops',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.ELECTRONICS_TV]: 'Televisions',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.ELECTRONICS_AUDIO]: 'Audio',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.FASHION_MEN]: "Men's Fashion",
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.FASHION_WOMEN]: "Women's Fashion",
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.FASHION_KIDS]: "Kids' Fashion",
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.HOME_FURNITURE]: 'Furniture',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.HOME_DECOR]: 'Home Decor',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.HOME_KITCHEN]: 'Kitchen',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.BEAUTY_SKINCARE]: 'Skincare',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.BEAUTY_MAKEUP]: 'Makeup',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.BEAUTY_FRAGRANCE]: 'Fragrance',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.HEALTH_SUPPLEMENTS]: 'Supplements',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.HEALTH_EQUIPMENT]: 'Health Equipment',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.FOOD_GROCERY]: 'Grocery',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.FOOD_BEVERAGE]: 'Beverage',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.BOOKS_FICTION]: 'Fiction Books',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.BOOKS_NON_FICTION]: 'Non-Fiction Books',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_CATEGORIES.BOOKS_EDUCATIONAL]: 'Educational Books',
  };
  return labels[category] || 'Unknown';
}

// Product Analytics Product Status Labels
export function getProductAnalyticsProductStatusLabel(
  status: ProductAnalyticsProductStatus
): string {
  const labels: Record<ProductAnalyticsProductStatus, string> = {
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_STATUS.DRAFT]: 'Draft',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_STATUS.PENDING]: 'Pending',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_STATUS.PUBLISHED]: 'Published',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_STATUS.UNPUBLISHED]: 'Unpublished',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_STATUS.ARCHIVED]: 'Archived',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_STATUS.DELETED]: 'Deleted',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_STATUS.OUT_OF_STOCK]: 'Out of Stock',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_STATUS.DISCONTINUED]: 'Discontinued',
  };
  return labels[status] || 'Unknown';
}

// Product Analytics Product Type Labels
export function getProductAnalyticsProductTypeLabel(type: ProductAnalyticsProductType): string {
  const labels: Record<ProductAnalyticsProductType, string> = {
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_TYPES.SIMPLE]: 'Simple',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_TYPES.VARIABLE]: 'Variable',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_TYPES.BUNDLE]: 'Bundle',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_TYPES.DIGITAL]: 'Digital',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_TYPES.DOWNLOADABLE]: 'Downloadable',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_TYPES.SUBSCRIPTION]: 'Subscription',
    [PRODUCT_ANALYTICS_TYPE.PRODUCT_TYPES.SERVICE]: 'Service',
  };
  return labels[type] || 'Unknown';
}

// Product Analytics Stock Status Labels
export function getProductAnalyticsStockStatusLabel(status: ProductAnalyticsStockStatus): string {
  const labels: Record<ProductAnalyticsStockStatus, string> = {
    [PRODUCT_ANALYTICS_TYPE.STOCK_STATUS.IN_STOCK]: 'In Stock',
    [PRODUCT_ANALYTICS_TYPE.STOCK_STATUS.OUT_OF_STOCK]: 'Out of Stock',
    [PRODUCT_ANALYTICS_TYPE.STOCK_STATUS.LOW_STOCK]: 'Low Stock',
    [PRODUCT_ANALYTICS_TYPE.STOCK_STATUS.BACK_ORDER]: 'Back Order',
    [PRODUCT_ANALYTICS_TYPE.STOCK_STATUS.PRE_ORDER]: 'Pre Order',
    [PRODUCT_ANALYTICS_TYPE.STOCK_STATUS.DISCONTINUED]: 'Discontinued',
  };
  return labels[status] || 'Unknown';
}

// Product Analytics Pricing Type Labels
export function getProductAnalyticsPricingTypeLabel(type: ProductAnalyticsPricingType): string {
  const labels: Record<ProductAnalyticsPricingType, string> = {
    [PRODUCT_ANALYTICS_TYPE.PRICING_TYPES.FIXED]: 'Fixed',
    [PRODUCT_ANALYTICS_TYPE.PRICING_TYPES.VARIABLE]: 'Variable',
    [PRODUCT_ANALYTICS_TYPE.PRICING_TYPES.DYNAMIC]: 'Dynamic',
    [PRODUCT_ANALYTICS_TYPE.PRICING_TYPES.DISCOUNTED]: 'Discounted',
    [PRODUCT_ANALYTICS_TYPE.PRICING_TYPES.PROMOTIONAL]: 'Promotional',
    [PRODUCT_ANALYTICS_TYPE.PRICING_TYPES.BUNDLED]: 'Bundled',
  };
  return labels[type] || 'Unknown';
}

// Product Analytics Performance Level Labels
export function getProductAnalyticsPerformanceLevelLabel(
  level: ProductAnalyticsPerformanceLevel
): string {
  const labels: Record<ProductAnalyticsPerformanceLevel, string> = {
    [PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT]: 'Excellent',
    [PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD]: 'Good',
    [PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE]: 'Average',
    [PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR]: 'Poor',
    [PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Product Analytics Review Type Labels
export function getProductAnalyticsReviewTypeLabel(type: ProductAnalyticsReviewType): string {
  const labels: Record<ProductAnalyticsReviewType, string> = {
    [PRODUCT_ANALYTICS_TYPE.REVIEW_TYPES.POSITIVE]: 'Positive',
    [PRODUCT_ANALYTICS_TYPE.REVIEW_TYPES.NEGATIVE]: 'Negative',
    [PRODUCT_ANALYTICS_TYPE.REVIEW_TYPES.NEUTRAL]: 'Neutral',
    [PRODUCT_ANALYTICS_TYPE.REVIEW_TYPES.SPAM]: 'Spam',
    [PRODUCT_ANALYTICS_TYPE.REVIEW_TYPES.FLAGGED]: 'Flagged',
  };
  return labels[type] || 'Unknown';
}

// Check if product analytics is performance analysis
export function isProductAnalyticsPerformanceAnalysis(type: ProductAnalyticsAnalysisType): boolean {
  const performanceTypes: ProductAnalyticsAnalysisType[] = [
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.SALES_ANALYSIS,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_ANALYSIS,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_ANALYSIS,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.MARGIN_ANALYSIS,
  ];
  return performanceTypes.includes(type);
}

// Check if product analytics is category analysis
export function isProductAnalyticsCategoryAnalysis(type: ProductAnalyticsAnalysisType): boolean {
  const categoryTypes: ProductAnalyticsAnalysisType[] = [
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.CATEGORY_ANALYSIS,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND_ANALYSIS,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.VENDOR_ANALYSIS,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.COLLECTION_ANALYSIS,
  ];
  return categoryTypes.includes(type);
}

// Check if product analytics is inventory analysis
export function isProductAnalyticsInventoryAnalysis(type: ProductAnalyticsAnalysisType): boolean {
  const inventoryTypes: ProductAnalyticsAnalysisType[] = [
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.INVENTORY_ANALYSIS,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.STOCK_ANALYSIS,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.TURNOVER_ANALYSIS,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.AVAILABILITY_ANALYSIS,
  ];
  return inventoryTypes.includes(type);
}

// Check if product analytics is predictive
export function isProductAnalyticsPredictive(type: ProductAnalyticsAnalysisType): boolean {
  const predictiveTypes: ProductAnalyticsAnalysisType[] = [
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
    PRODUCT_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMAND,
  ];
  return predictiveTypes.includes(type);
}

// Get performance level from score
export function getProductAnalyticsPerformanceLevel(
  score: number
): ProductAnalyticsPerformanceLevel {
  if (score >= 90) return PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT;
  if (score >= 70) return PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD;
  if (score >= 50) return PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE;
  if (score >= 30) return PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR;
  return PRODUCT_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL;
}
