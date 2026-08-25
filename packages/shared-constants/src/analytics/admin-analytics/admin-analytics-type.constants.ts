/**
 * Admin Analytics Type Constants
 * Type-specific constants for admin analytics
 * @module AdminAnalyticsTypeConstants
 */

/**
 * Admin analytics type categories
 */
export const ADMIN_ANALYTICS_TYPE_CATEGORIES = {
  USER_ANALYTICS: 'USER',
  ORDER_ANALYTICS: 'ORDER',
  REVENUE_ANALYTICS: 'FINANCIAL',
  PRODUCT_ANALYTICS: 'PRODUCT',
  INVENTORY_ANALYTICS: 'OPERATIONAL',
  SUPPORT_ANALYTICS: 'SUPPORT',
  MARKETING_ANALYTICS: 'MARKETING',
  SALES_ANALYTICS: 'SALES',
  PERFORMANCE_ANALYTICS: 'PERFORMANCE',
  CUSTOM_ANALYTICS: 'CUSTOM',
} as const;

/**
 * Admin analytics type labels (detailed)
 */
export const ADMIN_ANALYTICS_TYPE_LABELS_DETAIL = {
  USER_ANALYTICS: 'User Analytics',
  ORDER_ANALYTICS: 'Order Analytics',
  REVENUE_ANALYTICS: 'Revenue Analytics',
  PRODUCT_ANALYTICS: 'Product Analytics',
  INVENTORY_ANALYTICS: 'Inventory Analytics',
  SUPPORT_ANALYTICS: 'Support Analytics',
  MARKETING_ANALYTICS: 'Marketing Analytics',
  SALES_ANALYTICS: 'Sales Analytics',
  PERFORMANCE_ANALYTICS: 'Performance Analytics',
  CUSTOM_ANALYTICS: 'Custom Analytics',
} as const;

/**
 * Admin analytics type descriptions
 */
export const ADMIN_ANALYTICS_TYPE_DESCRIPTIONS = {
  USER_ANALYTICS: 'Analytics related to user behavior and demographics',
  ORDER_ANALYTICS: 'Analytics related to orders and purchasing patterns',
  REVENUE_ANALYTICS: 'Analytics related to revenue and financial metrics',
  PRODUCT_ANALYTICS: 'Analytics related to product performance and sales',
  INVENTORY_ANALYTICS: 'Analytics related to inventory levels and turnover',
  SUPPORT_ANALYTICS: 'Analytics related to customer support and tickets',
  MARKETING_ANALYTICS: 'Analytics related to marketing campaigns and ROI',
  SALES_ANALYTICS: 'Analytics related to sales performance and targets',
  PERFORMANCE_ANALYTICS: 'Analytics related to system and team performance',
  CUSTOM_ANALYTICS: 'Custom analytics reports and dashboards',
} as const;

/**
 * Admin analytics type icons
 */
export const ADMIN_ANALYTICS_TYPE_ICONS = {
  USER_ANALYTICS: '👤',
  ORDER_ANALYTICS: '📦',
  REVENUE_ANALYTICS: '💰',
  PRODUCT_ANALYTICS: '📊',
  INVENTORY_ANALYTICS: '📋',
  SUPPORT_ANALYTICS: '🎫',
  MARKETING_ANALYTICS: '📢',
  SALES_ANALYTICS: '📈',
  PERFORMANCE_ANALYTICS: '⚡',
  CUSTOM_ANALYTICS: '🔧',
} as const;

// ============================================================
// Types
// ============================================================

/**
 * Admin analytics type detail
 */
export type AdminAnalyticsTypeDetail = keyof typeof ADMIN_ANALYTICS_TYPE_LABELS_DETAIL;

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get analytics type category
 */
export const getAdminAnalyticsTypeCategory = (type: AdminAnalyticsTypeDetail): string =>
  ADMIN_ANALYTICS_TYPE_CATEGORIES[type] || 'UNKNOWN';

/**
 * Get analytics type label (detailed)
 */
export const getAdminAnalyticsTypeLabel = (type: AdminAnalyticsTypeDetail): string =>
  ADMIN_ANALYTICS_TYPE_LABELS_DETAIL[type] || type;

/**
 * Get analytics type description
 */
export const getAdminAnalyticsTypeDescription = (type: AdminAnalyticsTypeDetail): string =>
  ADMIN_ANALYTICS_TYPE_DESCRIPTIONS[type] || '';

/**
 * Get analytics type icon
 */
export const getAdminAnalyticsTypeIcon = (type: AdminAnalyticsTypeDetail): string =>
  ADMIN_ANALYTICS_TYPE_ICONS[type] || '📊';

/**
 * Check if analytics type is user analytics
 */
export const isUserAnalytics = (type: AdminAnalyticsTypeDetail): boolean =>
  type === 'USER_ANALYTICS';

/**
 * Check if analytics type is order analytics
 */
export const isOrderAnalytics = (type: AdminAnalyticsTypeDetail): boolean =>
  type === 'ORDER_ANALYTICS';

/**
 * Check if analytics type is revenue analytics
 */
export const isRevenueAnalytics = (type: AdminAnalyticsTypeDetail): boolean =>
  type === 'REVENUE_ANALYTICS';

/**
 * Check if analytics type is product analytics
 */
export const isProductAnalytics = (type: AdminAnalyticsTypeDetail): boolean =>
  type === 'PRODUCT_ANALYTICS';

/**
 * Check if analytics type is inventory analytics
 */
export const isInventoryAnalytics = (type: AdminAnalyticsTypeDetail): boolean =>
  type === 'INVENTORY_ANALYTICS';

/**
 * Check if analytics type is support analytics
 */
export const isSupportAnalytics = (type: AdminAnalyticsTypeDetail): boolean =>
  type === 'SUPPORT_ANALYTICS';

/**
 * Check if analytics type is marketing analytics
 */
export const isMarketingAnalytics = (type: AdminAnalyticsTypeDetail): boolean =>
  type === 'MARKETING_ANALYTICS';

/**
 * Check if analytics type is sales analytics
 */
export const isSalesAnalytics = (type: AdminAnalyticsTypeDetail): boolean =>
  type === 'SALES_ANALYTICS';

/**
 * Check if analytics type is performance analytics
 */
export const isPerformanceAnalytics = (type: AdminAnalyticsTypeDetail): boolean =>
  type === 'PERFORMANCE_ANALYTICS';
