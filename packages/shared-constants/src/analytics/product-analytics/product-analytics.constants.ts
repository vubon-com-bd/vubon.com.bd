/**
 * Product Analytics Constants
 * Configuration for product performance analytics and tracking
 */

export const PRODUCT_ANALYTICS = {
  // Product Analytics Types
  TYPES: {
    // Performance Analytics
    PERFORMANCE: 'performance',
    SALES: 'sales',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    MARGIN: 'margin',

    // Product Metrics
    VIEWS: 'views',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    RETENTION: 'retention',

    // Category Analytics
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    COLLECTION: 'collection',

    // Inventory Analytics
    INVENTORY: 'inventory',
    STOCK: 'stock',
    TURNOVER: 'turnover',
    AVAILABILITY: 'availability',

    // Pricing Analytics
    PRICING: 'pricing',
    DISCOUNT: 'discount',
    PROMOTION: 'promotion',
    COMPETITIVE: 'competitive',
  } as const,

  // Product Analytics Status
  STATUS: {
    TRACKING: 'tracking',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    UPDATING: 'updating',
  } as const,

  // Product Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    COLLECTION: 'collection',
    ALL_PRODUCTS: 'all_products',
    TOP_PRODUCTS: 'top_products',
    NEW_PRODUCTS: 'new_products',
    DISCOUNTED: 'discounted',
    OUT_OF_STOCK: 'out_of_stock',
  } as const,

  // Product Analytics Events
  EVENTS: {
    // Product Lifecycle Events
    PRODUCT_CREATED: 'product_created',
    PRODUCT_UPDATED: 'product_updated',
    PRODUCT_DELETED: 'product_deleted',
    PRODUCT_PUBLISHED: 'product_published',
    PRODUCT_UNPUBLISHED: 'product_unpublished',
    PRODUCT_ARCHIVED: 'product_archived',

    // Product View Events
    PRODUCT_VIEW: 'product_view',
    PRODUCT_DETAIL_VIEW: 'product_detail_view',
    PRODUCT_IMAGE_VIEW: 'product_image_view',
    PRODUCT_VIDEO_VIEW: 'product_video_view',
    PRODUCT_ZOOM: 'product_zoom',

    // Product Interaction Events
    PRODUCT_CLICK: 'product_click',
    PRODUCT_HOVER: 'product_hover',
    PRODUCT_SCROLL: 'product_scroll',
    PRODUCT_SEARCH: 'product_search',
    PRODUCT_FILTER: 'product_filter',
    PRODUCT_SORT: 'product_sort',
    PRODUCT_COMPARE: 'product_compare',

    // Product Cart Events
    ADD_TO_CART: 'add_to_cart',
    REMOVE_FROM_CART: 'remove_from_cart',
    UPDATE_CART: 'update_cart',
    ADD_TO_WISHLIST: 'add_to_wishlist',
    REMOVE_FROM_WISHLIST: 'remove_from_wishlist',

    // Product Purchase Events
    PRODUCT_PURCHASE: 'product_purchase',
    PRODUCT_RETURN: 'product_return',
    PRODUCT_REFUND: 'product_refund',
    PRODUCT_EXCHANGE: 'product_exchange',

    // Product Review Events
    PRODUCT_REVIEW: 'product_review',
    PRODUCT_RATING: 'product_rating',
    PRODUCT_QUESTION: 'product_question',
    PRODUCT_ANSWER: 'product_answer',
    PRODUCT_REVIEW_LIKE: 'product_review_like',

    // Product Share Events
    PRODUCT_SHARE: 'product_share',
    PRODUCT_EMAIL: 'product_email',
    PRODUCT_SOCIAL: 'product_social',
    PRODUCT_REFERRAL: 'product_referral',
  } as const,

  // Product Analytics Dimensions
  DIMENSIONS: {
    // Product Attributes
    PRODUCT_ID: 'product_id',
    PRODUCT_NAME: 'product_name',
    PRODUCT_SKU: 'product_sku',
    PRODUCT_TYPE: 'product_type',
    PRODUCT_STATUS: 'product_status',

    // Category Attributes
    CATEGORY_ID: 'category_id',
    CATEGORY_NAME: 'category_name',
    CATEGORY_PATH: 'category_path',
    SUB_CATEGORY: 'sub_category',

    // Brand Attributes
    BRAND_ID: 'brand_id',
    BRAND_NAME: 'brand_name',
    BRAND_CATEGORY: 'brand_category',

    // Vendor Attributes
    VENDOR_ID: 'vendor_id',
    VENDOR_NAME: 'vendor_name',
    VENDOR_TYPE: 'vendor_type',

    // Pricing Attributes
    PRICE: 'price',
    DISCOUNT_PRICE: 'discount_price',
    DISCOUNT_PERCENTAGE: 'discount_percentage',
    CURRENCY: 'currency',
    PRICE_RANGE: 'price_range',

    // Inventory Attributes
    STOCK_QUANTITY: 'stock_quantity',
    STOCK_STATUS: 'stock_status',
    WAREHOUSE_LOCATION: 'warehouse_location',

    // Performance Attributes
    RATING: 'rating',
    REVIEW_COUNT: 'review_count',
    VIEW_COUNT: 'view_count',
    PURCHASE_COUNT: 'purchase_count',
    RETURN_COUNT: 'return_count',
  } as const,

  // Product Analytics Metrics
  METRICS: {
    // Product Count Metrics
    TOTAL_PRODUCTS: 'total_products',
    ACTIVE_PRODUCTS: 'active_products',
    INACTIVE_PRODUCTS: 'inactive_products',
    NEW_PRODUCTS: 'new_products',
    DISCOUNTED_PRODUCTS: 'discounted_products',
    OUT_OF_STOCK_PRODUCTS: 'out_of_stock_products',

    // Product Performance Metrics
    PRODUCT_VIEWS: 'product_views',
    UNIQUE_PRODUCT_VIEWS: 'unique_product_views',
    AVG_VIEWS_PER_PRODUCT: 'avg_views_per_product',

    // Product Engagement Metrics
    CLICK_THROUGH_RATE: 'click_through_rate',
    ADD_TO_CART_RATE: 'add_to_cart_rate',
    WISHLIST_RATE: 'wishlist_rate',
    COMPARE_RATE: 'compare_rate',

    // Product Conversion Metrics
    CONVERSION_RATE: 'conversion_rate',
    PURCHASE_RATE: 'purchase_rate',
    RETURN_RATE: 'return_rate',
    REFUND_RATE: 'refund_rate',

    // Product Revenue Metrics
    PRODUCT_REVENUE: 'product_revenue',
    AVG_ORDER_VALUE: 'avg_order_value',
    REVENUE_PER_PRODUCT: 'revenue_per_product',
    REVENUE_PER_CATEGORY: 'revenue_per_category',

    // Product Profit Metrics
    PRODUCT_PROFIT: 'product_profit',
    PRODUCT_MARGIN: 'product_margin',
    PROFIT_PER_PRODUCT: 'profit_per_product',

    // Product Inventory Metrics
    TURNOVER_RATE: 'turnover_rate',
    STOCK_DAYS: 'stock_days',
    REORDER_POINT: 'reorder_point',
    INVENTORY_VALUE: 'inventory_value',
  } as const,

  // Product Analytics Segments
  SEGMENTS: {
    // Category Segments
    BY_CATEGORY: 'by_category',
    BY_SUB_CATEGORY: 'by_sub_category',
    BY_BRAND: 'by_brand',
    BY_VENDOR: 'by_vendor',

    // Performance Segments
    TOP_SELLING: 'top_selling',
    BEST_SELLING: 'best_selling',
    HIGHEST_RATED: 'highest_rated',
    MOST_VIEWED: 'most_viewed',
    MOST_REVIEWED: 'most_reviewed',

    // Price Segments
    UNDER_500: 'under_500',
    UNDER_1000: 'under_1000',
    UNDER_2000: 'under_2000',
    UNDER_5000: 'under_5000',
    ABOVE_5000: 'above_5000',

    // Status Segments
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    DISCOUNTED: 'discounted',
    NEW_ARRIVALS: 'new_arrivals',
    BEST_DEALS: 'best_deals',

    // Custom Segments
    HIGH_VALUE: 'high_value',
    LOW_VALUE: 'low_value',
    HIGH_MARGIN: 'high_margin',
    LOW_MARGIN: 'low_margin',
    FAST_MOVING: 'fast_moving',
    SLOW_MOVING: 'slow_moving',
  } as const,

  // Product Analytics Cohorts
  COHORTS: {
    ADDED_DATE: 'added_date',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    PRICE_RANGE: 'price_range',
    FIRST_PURCHASE: 'first_purchase',
  } as const,

  // Product Analytics Granularity
  GRANULARITY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Product Analytics Types
export type ProductAnalyticsType =
  (typeof PRODUCT_ANALYTICS.TYPES)[keyof typeof PRODUCT_ANALYTICS.TYPES];

// Product Analytics Status
export type ProductAnalyticsStatus =
  (typeof PRODUCT_ANALYTICS.STATUS)[keyof typeof PRODUCT_ANALYTICS.STATUS];

// Product Analytics Scopes
export type ProductAnalyticsScope =
  (typeof PRODUCT_ANALYTICS.SCOPES)[keyof typeof PRODUCT_ANALYTICS.SCOPES];

// Product Analytics Events
export type ProductAnalyticsEvent =
  (typeof PRODUCT_ANALYTICS.EVENTS)[keyof typeof PRODUCT_ANALYTICS.EVENTS];

// Product Analytics Dimensions
export type ProductAnalyticsDimension =
  (typeof PRODUCT_ANALYTICS.DIMENSIONS)[keyof typeof PRODUCT_ANALYTICS.DIMENSIONS];

// Product Analytics Metrics
export type ProductAnalyticsMetric =
  (typeof PRODUCT_ANALYTICS.METRICS)[keyof typeof PRODUCT_ANALYTICS.METRICS];

// Product Analytics Segments
export type ProductAnalyticsSegment =
  (typeof PRODUCT_ANALYTICS.SEGMENTS)[keyof typeof PRODUCT_ANALYTICS.SEGMENTS];

// Product Analytics Cohorts
export type ProductAnalyticsCohort =
  (typeof PRODUCT_ANALYTICS.COHORTS)[keyof typeof PRODUCT_ANALYTICS.COHORTS];

// Product Analytics Granularity
export type ProductAnalyticsGranularity =
  (typeof PRODUCT_ANALYTICS.GRANULARITY)[keyof typeof PRODUCT_ANALYTICS.GRANULARITY];

// Product Analytics Status Labels
export function getProductAnalyticsStatusLabel(status: ProductAnalyticsStatus): string {
  const labels: Record<ProductAnalyticsStatus, string> = {
    [PRODUCT_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [PRODUCT_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [PRODUCT_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [PRODUCT_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [PRODUCT_ANALYTICS.STATUS.FAILED]: 'Failed',
    [PRODUCT_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [PRODUCT_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [PRODUCT_ANALYTICS.STATUS.UPDATING]: 'Updating',
  };
  return labels[status] || 'Unknown';
}

// Product Analytics Event Labels
export function getProductAnalyticsEventLabel(event: ProductAnalyticsEvent): string {
  const labels: Record<ProductAnalyticsEvent, string> = {
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_CREATED]: 'Product Created',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_UPDATED]: 'Product Updated',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_DELETED]: 'Product Deleted',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_PUBLISHED]: 'Product Published',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_UNPUBLISHED]: 'Product Unpublished',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_ARCHIVED]: 'Product Archived',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_VIEW]: 'Product View',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_DETAIL_VIEW]: 'Product Detail View',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_IMAGE_VIEW]: 'Product Image View',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_VIDEO_VIEW]: 'Product Video View',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_ZOOM]: 'Product Zoom',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_CLICK]: 'Product Click',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_HOVER]: 'Product Hover',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_SCROLL]: 'Product Scroll',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_SEARCH]: 'Product Search',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_FILTER]: 'Product Filter',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_SORT]: 'Product Sort',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_COMPARE]: 'Product Compare',
    [PRODUCT_ANALYTICS.EVENTS.ADD_TO_CART]: 'Add to Cart',
    [PRODUCT_ANALYTICS.EVENTS.REMOVE_FROM_CART]: 'Remove from Cart',
    [PRODUCT_ANALYTICS.EVENTS.UPDATE_CART]: 'Update Cart',
    [PRODUCT_ANALYTICS.EVENTS.ADD_TO_WISHLIST]: 'Add to Wishlist',
    [PRODUCT_ANALYTICS.EVENTS.REMOVE_FROM_WISHLIST]: 'Remove from Wishlist',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_PURCHASE]: 'Product Purchase',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_RETURN]: 'Product Return',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_REFUND]: 'Product Refund',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_EXCHANGE]: 'Product Exchange',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_REVIEW]: 'Product Review',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_RATING]: 'Product Rating',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_QUESTION]: 'Product Question',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_ANSWER]: 'Product Answer',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_REVIEW_LIKE]: 'Product Review Like',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_SHARE]: 'Product Share',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_EMAIL]: 'Product Email',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_SOCIAL]: 'Product Social',
    [PRODUCT_ANALYTICS.EVENTS.PRODUCT_REFERRAL]: 'Product Referral',
  };
  return labels[event] || 'Unknown';
}

// Product Analytics Dimension Labels
export function getProductAnalyticsDimensionLabel(dimension: ProductAnalyticsDimension): string {
  const labels: Record<ProductAnalyticsDimension, string> = {
    [PRODUCT_ANALYTICS.DIMENSIONS.PRODUCT_ID]: 'Product ID',
    [PRODUCT_ANALYTICS.DIMENSIONS.PRODUCT_NAME]: 'Product Name',
    [PRODUCT_ANALYTICS.DIMENSIONS.PRODUCT_SKU]: 'Product SKU',
    [PRODUCT_ANALYTICS.DIMENSIONS.PRODUCT_TYPE]: 'Product Type',
    [PRODUCT_ANALYTICS.DIMENSIONS.PRODUCT_STATUS]: 'Product Status',
    [PRODUCT_ANALYTICS.DIMENSIONS.CATEGORY_ID]: 'Category ID',
    [PRODUCT_ANALYTICS.DIMENSIONS.CATEGORY_NAME]: 'Category Name',
    [PRODUCT_ANALYTICS.DIMENSIONS.CATEGORY_PATH]: 'Category Path',
    [PRODUCT_ANALYTICS.DIMENSIONS.SUB_CATEGORY]: 'Sub-Category',
    [PRODUCT_ANALYTICS.DIMENSIONS.BRAND_ID]: 'Brand ID',
    [PRODUCT_ANALYTICS.DIMENSIONS.BRAND_NAME]: 'Brand Name',
    [PRODUCT_ANALYTICS.DIMENSIONS.BRAND_CATEGORY]: 'Brand Category',
    [PRODUCT_ANALYTICS.DIMENSIONS.VENDOR_ID]: 'Vendor ID',
    [PRODUCT_ANALYTICS.DIMENSIONS.VENDOR_NAME]: 'Vendor Name',
    [PRODUCT_ANALYTICS.DIMENSIONS.VENDOR_TYPE]: 'Vendor Type',
    [PRODUCT_ANALYTICS.DIMENSIONS.PRICE]: 'Price',
    [PRODUCT_ANALYTICS.DIMENSIONS.DISCOUNT_PRICE]: 'Discount Price',
    [PRODUCT_ANALYTICS.DIMENSIONS.DISCOUNT_PERCENTAGE]: 'Discount Percentage',
    [PRODUCT_ANALYTICS.DIMENSIONS.CURRENCY]: 'Currency',
    [PRODUCT_ANALYTICS.DIMENSIONS.PRICE_RANGE]: 'Price Range',
    [PRODUCT_ANALYTICS.DIMENSIONS.STOCK_QUANTITY]: 'Stock Quantity',
    [PRODUCT_ANALYTICS.DIMENSIONS.STOCK_STATUS]: 'Stock Status',
    [PRODUCT_ANALYTICS.DIMENSIONS.WAREHOUSE_LOCATION]: 'Warehouse Location',
    [PRODUCT_ANALYTICS.DIMENSIONS.RATING]: 'Rating',
    [PRODUCT_ANALYTICS.DIMENSIONS.REVIEW_COUNT]: 'Review Count',
    [PRODUCT_ANALYTICS.DIMENSIONS.VIEW_COUNT]: 'View Count',
    [PRODUCT_ANALYTICS.DIMENSIONS.PURCHASE_COUNT]: 'Purchase Count',
    [PRODUCT_ANALYTICS.DIMENSIONS.RETURN_COUNT]: 'Return Count',
  };
  return labels[dimension] || 'Unknown';
}

// Product Analytics Segment Labels
export function getProductAnalyticsSegmentLabel(segment: ProductAnalyticsSegment): string {
  const labels: Record<ProductAnalyticsSegment, string> = {
    [PRODUCT_ANALYTICS.SEGMENTS.BY_CATEGORY]: 'By Category',
    [PRODUCT_ANALYTICS.SEGMENTS.BY_SUB_CATEGORY]: 'By Sub-Category',
    [PRODUCT_ANALYTICS.SEGMENTS.BY_BRAND]: 'By Brand',
    [PRODUCT_ANALYTICS.SEGMENTS.BY_VENDOR]: 'By Vendor',
    [PRODUCT_ANALYTICS.SEGMENTS.TOP_SELLING]: 'Top Selling',
    [PRODUCT_ANALYTICS.SEGMENTS.BEST_SELLING]: 'Best Selling',
    [PRODUCT_ANALYTICS.SEGMENTS.HIGHEST_RATED]: 'Highest Rated',
    [PRODUCT_ANALYTICS.SEGMENTS.MOST_VIEWED]: 'Most Viewed',
    [PRODUCT_ANALYTICS.SEGMENTS.MOST_REVIEWED]: 'Most Reviewed',
    [PRODUCT_ANALYTICS.SEGMENTS.UNDER_500]: 'Under 500 BDT',
    [PRODUCT_ANALYTICS.SEGMENTS.UNDER_1000]: 'Under 1000 BDT',
    [PRODUCT_ANALYTICS.SEGMENTS.UNDER_2000]: 'Under 2000 BDT',
    [PRODUCT_ANALYTICS.SEGMENTS.UNDER_5000]: 'Under 5000 BDT',
    [PRODUCT_ANALYTICS.SEGMENTS.ABOVE_5000]: 'Above 5000 BDT',
    [PRODUCT_ANALYTICS.SEGMENTS.IN_STOCK]: 'In Stock',
    [PRODUCT_ANALYTICS.SEGMENTS.OUT_OF_STOCK]: 'Out of Stock',
    [PRODUCT_ANALYTICS.SEGMENTS.DISCOUNTED]: 'Discounted',
    [PRODUCT_ANALYTICS.SEGMENTS.NEW_ARRIVALS]: 'New Arrivals',
    [PRODUCT_ANALYTICS.SEGMENTS.BEST_DEALS]: 'Best Deals',
    [PRODUCT_ANALYTICS.SEGMENTS.HIGH_VALUE]: 'High Value',
    [PRODUCT_ANALYTICS.SEGMENTS.LOW_VALUE]: 'Low Value',
    [PRODUCT_ANALYTICS.SEGMENTS.HIGH_MARGIN]: 'High Margin',
    [PRODUCT_ANALYTICS.SEGMENTS.LOW_MARGIN]: 'Low Margin',
    [PRODUCT_ANALYTICS.SEGMENTS.FAST_MOVING]: 'Fast Moving',
    [PRODUCT_ANALYTICS.SEGMENTS.SLOW_MOVING]: 'Slow Moving',
  };
  return labels[segment] || 'Unknown';
}

// Product Analytics Cohort Labels
export function getProductAnalyticsCohortLabel(cohort: ProductAnalyticsCohort): string {
  const labels: Record<ProductAnalyticsCohort, string> = {
    [PRODUCT_ANALYTICS.COHORTS.ADDED_DATE]: 'Added Date',
    [PRODUCT_ANALYTICS.COHORTS.CATEGORY]: 'Category',
    [PRODUCT_ANALYTICS.COHORTS.BRAND]: 'Brand',
    [PRODUCT_ANALYTICS.COHORTS.VENDOR]: 'Vendor',
    [PRODUCT_ANALYTICS.COHORTS.PRICE_RANGE]: 'Price Range',
    [PRODUCT_ANALYTICS.COHORTS.FIRST_PURCHASE]: 'First Purchase',
  };
  return labels[cohort] || 'Unknown';
}

// Product Analytics Granularity Labels
export function getProductAnalyticsGranularityLabel(
  granularity: ProductAnalyticsGranularity
): string {
  const labels: Record<ProductAnalyticsGranularity, string> = {
    [PRODUCT_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [PRODUCT_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [PRODUCT_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [PRODUCT_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [PRODUCT_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if product analytics is active
export function isProductAnalyticsActive(status: ProductAnalyticsStatus): boolean {
  const activeStatuses: ProductAnalyticsStatus[] = [
    PRODUCT_ANALYTICS.STATUS.TRACKING,
    PRODUCT_ANALYTICS.STATUS.PROCESSING,
    PRODUCT_ANALYTICS.STATUS.ANALYZING,
    PRODUCT_ANALYTICS.STATUS.UPDATING,
  ];
  return activeStatuses.includes(status);
}

// Check if product analytics is completed
export function isProductAnalyticsCompleted(status: ProductAnalyticsStatus): boolean {
  return status === PRODUCT_ANALYTICS.STATUS.COMPLETED;
}

// Check if product analytics has failed
export function isProductAnalyticsFailed(status: ProductAnalyticsStatus): boolean {
  return status === PRODUCT_ANALYTICS.STATUS.FAILED;
}

// Check if event is product lifecycle event
export function isProductAnalyticsLifecycleEvent(event: ProductAnalyticsEvent): boolean {
  const lifecycleEvents: ProductAnalyticsEvent[] = [
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_CREATED,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_UPDATED,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_DELETED,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_PUBLISHED,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_UNPUBLISHED,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_ARCHIVED,
  ];
  return lifecycleEvents.includes(event);
}

// Check if event is product view event
export function isProductAnalyticsViewEvent(event: ProductAnalyticsEvent): boolean {
  const viewEvents: ProductAnalyticsEvent[] = [
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_VIEW,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_DETAIL_VIEW,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_IMAGE_VIEW,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_VIDEO_VIEW,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_ZOOM,
  ];
  return viewEvents.includes(event);
}

// Check if event is product cart event
export function isProductAnalyticsCartEvent(event: ProductAnalyticsEvent): boolean {
  const cartEvents: ProductAnalyticsEvent[] = [
    PRODUCT_ANALYTICS.EVENTS.ADD_TO_CART,
    PRODUCT_ANALYTICS.EVENTS.REMOVE_FROM_CART,
    PRODUCT_ANALYTICS.EVENTS.UPDATE_CART,
    PRODUCT_ANALYTICS.EVENTS.ADD_TO_WISHLIST,
    PRODUCT_ANALYTICS.EVENTS.REMOVE_FROM_WISHLIST,
  ];
  return cartEvents.includes(event);
}

// Check if event is product purchase event
export function isProductAnalyticsPurchaseEvent(event: ProductAnalyticsEvent): boolean {
  const purchaseEvents: ProductAnalyticsEvent[] = [
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_PURCHASE,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_RETURN,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_REFUND,
    PRODUCT_ANALYTICS.EVENTS.PRODUCT_EXCHANGE,
  ];
  return purchaseEvents.includes(event);
}
