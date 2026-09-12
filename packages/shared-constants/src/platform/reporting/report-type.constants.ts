import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const REPORT_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    // Sales Reports
    SALES_SUMMARY: 'sales_summary',
    SALES_DETAILED: 'sales_detailed',
    SALES_BY_PRODUCT: 'sales_by_product',
    SALES_BY_CATEGORY: 'sales_by_category',
    SALES_BY_VENDOR: 'sales_by_vendor',
    SALES_BY_REGION: 'sales_by_region',
    SALES_BY_CHANNEL: 'sales_by_channel',

    // Revenue Reports
    REVENUE_SUMMARY: 'revenue_summary',
    REVENUE_TREND: 'revenue_trend',
    REVENUE_BY_PRODUCT: 'revenue_by_product',
    REVENUE_BY_VENDOR: 'revenue_by_vendor',

    // Product Reports
    PRODUCT_PERFORMANCE: 'product_performance',
    PRODUCT_INVENTORY: 'product_inventory',
    PRODUCT_RETURNS: 'product_returns',
    PRODUCT_REVIEWS: 'product_reviews',
    BEST_SELLING_PRODUCTS: 'best_selling_products',
    MOST_VIEWED_PRODUCTS: 'most_viewed_products',

    // User Reports
    USER_ACTIVITY: 'user_activity',
    USER_ACQUISITION: 'user_acquisition',
    USER_RETENTION: 'user_retention',
    USER_DEMOGRAPHICS: 'user_demographics',
    USER_SEGMENTATION: 'user_segmentation',

    // Vendor Reports
    VENDOR_PERFORMANCE: 'vendor_performance',
    VENDOR_SALES: 'vendor_sales',
    VENDOR_COMMISSION: 'vendor_commission',
    VENDOR_RATINGS: 'vendor_ratings',

    // Order Reports
    ORDER_SUMMARY: 'order_summary',
    ORDER_FULFILLMENT: 'order_fulfillment',
    ORDER_RETURNS: 'order_returns',
    ORDER_CANCELLATIONS: 'order_cancellations',

    // Payment Reports
    PAYMENT_SUMMARY: 'payment_summary',
    PAYMENT_REFUNDS: 'payment_refunds',
    PAYMENT_METHODS: 'payment_methods',
    PAYMENT_FAILURES: 'payment_failures',

    // Support Reports
    SUPPORT_TICKETS: 'support_tickets',
    SUPPORT_SATISFACTION: 'support_satisfaction',
    SUPPORT_RESPONSE_TIME: 'support_response_time',
    SUPPORT_AGENT_PERFORMANCE: 'support_agent_performance',

    // Marketing Reports
    MARKETING_CAMPAIGN: 'marketing_campaign',
    MARKETING_ROI: 'marketing_roi',
    MARKETING_CHANNEL: 'marketing_channel',
    MARKETING_CONVERSION: 'marketing_conversion',

    // Traffic Reports
    TRAFFIC_SUMMARY: 'traffic_summary',
    TRAFFIC_SOURCE: 'traffic_source',
    TRAFFIC_DEVICE: 'traffic_device',
    TRAFFIC_GEOGRAPHY: 'traffic_geography',

    // Inventory Reports
    INVENTORY_STATUS: 'inventory_status',
    INVENTORY_MOVEMENT: 'inventory_movement',
    INVENTORY_VALUATION: 'inventory_valuation',

    // Financial Reports
    FINANCIAL_SUMMARY: 'financial_summary',
    FINANCIAL_PL: 'financial_pl',
    FINANCIAL_BALANCE_SHEET: 'financial_balance_sheet',
    FINANCIAL_CASH_FLOW: 'financial_cash_flow',
  },
  REPORT_CATEGORIES: {
    SALES: 'sales',
    REVENUE: 'revenue',
    PRODUCT: 'product',
    USER: 'user',
    VENDOR: 'vendor',
    ORDER: 'order',
    PAYMENT: 'payment',
    SUPPORT: 'support',
    MARKETING: 'marketing',
    TRAFFIC: 'traffic',
    INVENTORY: 'inventory',
    FINANCIAL: 'financial',
  },
} as const;
