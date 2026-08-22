/**
 * Admin Report Type Constants
 * Detailed report type definitions
 */

export const ADMIN_REPORT_TYPE = {
  // Summary reports
  EXECUTIVE_SUMMARY: 'executive_summary',
  OPERATIONAL_SUMMARY: 'operational_summary',
  FINANCIAL_SUMMARY: 'financial_summary',
  WEEKLY_SUMMARY: 'weekly_summary',
  MONTHLY_SUMMARY: 'monthly_summary',
  QUARTERLY_SUMMARY: 'quarterly_summary',
  ANNUAL_SUMMARY: 'annual_summary',

  // Performance reports
  TEAM_PERFORMANCE: 'team_performance',
  INDIVIDUAL_PERFORMANCE: 'individual_performance',
  DEPARTMENT_PERFORMANCE: 'department_performance',
  KPI_PERFORMANCE: 'kpi_performance',
  GOAL_PROGRESS: 'goal_progress',
  PRODUCTIVITY: 'productivity',
  EFFICIENCY: 'efficiency',

  // Financial reports
  REVENUE: 'revenue',
  PROFIT_LOSS: 'profit_loss',
  CASH_FLOW: 'cash_flow',
  BALANCE_SHEET: 'balance_sheet',
  BUDGET_VARIANCE: 'budget_variance',
  EXPENSE: 'expense',
  TAX: 'tax',
  AUDIT_FINANCIAL: 'audit_financial',

  // Sales reports
  SALES_OVERVIEW: 'sales_overview',
  SALES_TREND: 'sales_trend',
  SALES_BY_PRODUCT: 'sales_by_product',
  SALES_BY_REGION: 'sales_by_region',
  SALES_BY_CATEGORY: 'sales_by_category',
  SALES_FORECAST: 'sales_forecast',
  COMPARATIVE_SALES: 'comparative_sales',

  // Product reports
  PRODUCT_PERFORMANCE: 'product_performance',
  PRODUCT_INVENTORY: 'product_inventory',
  PRODUCT_STOCK: 'product_stock',
  PRODUCT_ANALYTICS: 'product_analytics',
  PRODUCT_REVIEWS: 'product_reviews',
  PRODUCT_RETURNS: 'product_returns',

  // Order reports
  ORDER_VOLUME: 'order_volume',
  ORDER_VALUE: 'order_value',
  ORDER_STATUS: 'order_status',
  ORDER_FULFILLMENT: 'order_fulfillment',
  ORDER_RETURNS: 'order_returns',
  ORDER_ANALYTICS: 'order_analytics',

  // Payment reports
  PAYMENT_TRANSACTIONS: 'payment_transactions',
  PAYMENT_METHODS: 'payment_methods',
  PAYMENT_STATUS: 'payment_status',
  PAYMENT_RECONCILIATION: 'payment_reconciliation',
  PAYMENT_DISPUTES: 'payment_disputes',

  // User reports
  USER_ACTIVITY: 'user_activity',
  USER_ENGAGEMENT: 'user_engagement',
  USER_RETENTION: 'user_retention',
  USER_ACQUISITION: 'user_acquisition',
  USER_DEMOGRAPHICS: 'user_demographics',
  USER_BEHAVIOR: 'user_behavior',

  // Security reports
  SECURITY_AUDIT: 'security_audit',
  SECURITY_INCIDENTS: 'security_incidents',
  SECURITY_LOGS: 'security_logs',
  ACCESS_CONTROL: 'access_control',
  COMPLIANCE_STATUS: 'compliance_status',

  // Marketing reports
  CAMPAIGN_PERFORMANCE: 'campaign_performance',
  MARKETING_ROI: 'marketing_roi',
  CHANNEL_ANALYTICS: 'channel_analytics',
  CONVERSION_RATE: 'conversion_rate',
  CUSTOMER_ACQUISITION: 'customer_acquisition',

  // Support reports
  TICKET_VOLUME: 'ticket_volume',
  TICKET_RESOLUTION: 'ticket_resolution',
  TICKET_SATISFACTION: 'ticket_satisfaction',
  SUPPORT_PERFORMANCE: 'support_performance',
  ESCALATION_RATE: 'escalation_rate',

  // Logistics reports
  SHIPPING_PERFORMANCE: 'shipping_performance',
  DELIVERY_TIME: 'delivery_time',
  SHIPPING_COST: 'shipping_cost',
  WAREHOUSE_INVENTORY: 'warehouse_inventory',
  SUPPLY_CHAIN: 'supply_chain',

  // Analytics reports
  CUSTOM_ANALYTICS: 'custom_analytics',
  DATA_INSIGHTS: 'data_insights',
  TREND_ANALYSIS: 'trend_analysis',
  PREDICTIVE_ANALYTICS: 'predictive_analytics',
  COMPARATIVE_ANALYTICS: 'comparative_analytics',

  // Custom reports
  CUSTOM_TABLE: 'custom_table',
  CUSTOM_CHART: 'custom_chart',
  CUSTOM_DASHBOARD: 'custom_dashboard',
  CUSTOM_EXPORT: 'custom_export',
} as const;

export type AdminReportTypeDetail = (typeof ADMIN_REPORT_TYPE)[keyof typeof ADMIN_REPORT_TYPE];

export const ADMIN_REPORT_TYPE_CATEGORIES: Record<AdminReportTypeDetail, string> = {
  // Summary reports
  [ADMIN_REPORT_TYPE.EXECUTIVE_SUMMARY]: 'summary',
  [ADMIN_REPORT_TYPE.OPERATIONAL_SUMMARY]: 'summary',
  [ADMIN_REPORT_TYPE.FINANCIAL_SUMMARY]: 'summary',
  [ADMIN_REPORT_TYPE.WEEKLY_SUMMARY]: 'summary',
  [ADMIN_REPORT_TYPE.MONTHLY_SUMMARY]: 'summary',
  [ADMIN_REPORT_TYPE.QUARTERLY_SUMMARY]: 'summary',
  [ADMIN_REPORT_TYPE.ANNUAL_SUMMARY]: 'summary',

  // Performance reports
  [ADMIN_REPORT_TYPE.TEAM_PERFORMANCE]: 'performance',
  [ADMIN_REPORT_TYPE.INDIVIDUAL_PERFORMANCE]: 'performance',
  [ADMIN_REPORT_TYPE.DEPARTMENT_PERFORMANCE]: 'performance',
  [ADMIN_REPORT_TYPE.KPI_PERFORMANCE]: 'performance',
  [ADMIN_REPORT_TYPE.GOAL_PROGRESS]: 'performance',
  [ADMIN_REPORT_TYPE.PRODUCTIVITY]: 'performance',
  [ADMIN_REPORT_TYPE.EFFICIENCY]: 'performance',

  // Financial reports
  [ADMIN_REPORT_TYPE.REVENUE]: 'financial',
  [ADMIN_REPORT_TYPE.PROFIT_LOSS]: 'financial',
  [ADMIN_REPORT_TYPE.CASH_FLOW]: 'financial',
  [ADMIN_REPORT_TYPE.BALANCE_SHEET]: 'financial',
  [ADMIN_REPORT_TYPE.BUDGET_VARIANCE]: 'financial',
  [ADMIN_REPORT_TYPE.EXPENSE]: 'financial',
  [ADMIN_REPORT_TYPE.TAX]: 'financial',
  [ADMIN_REPORT_TYPE.AUDIT_FINANCIAL]: 'financial',

  // Sales reports
  [ADMIN_REPORT_TYPE.SALES_OVERVIEW]: 'sales',
  [ADMIN_REPORT_TYPE.SALES_TREND]: 'sales',
  [ADMIN_REPORT_TYPE.SALES_BY_PRODUCT]: 'sales',
  [ADMIN_REPORT_TYPE.SALES_BY_REGION]: 'sales',
  [ADMIN_REPORT_TYPE.SALES_BY_CATEGORY]: 'sales',
  [ADMIN_REPORT_TYPE.SALES_FORECAST]: 'sales',
  [ADMIN_REPORT_TYPE.COMPARATIVE_SALES]: 'sales',

  // Product reports
  [ADMIN_REPORT_TYPE.PRODUCT_PERFORMANCE]: 'product',
  [ADMIN_REPORT_TYPE.PRODUCT_INVENTORY]: 'product',
  [ADMIN_REPORT_TYPE.PRODUCT_STOCK]: 'product',
  [ADMIN_REPORT_TYPE.PRODUCT_ANALYTICS]: 'product',
  [ADMIN_REPORT_TYPE.PRODUCT_REVIEWS]: 'product',
  [ADMIN_REPORT_TYPE.PRODUCT_RETURNS]: 'product',

  // Order reports
  [ADMIN_REPORT_TYPE.ORDER_VOLUME]: 'order',
  [ADMIN_REPORT_TYPE.ORDER_VALUE]: 'order',
  [ADMIN_REPORT_TYPE.ORDER_STATUS]: 'order',
  [ADMIN_REPORT_TYPE.ORDER_FULFILLMENT]: 'order',
  [ADMIN_REPORT_TYPE.ORDER_RETURNS]: 'order',
  [ADMIN_REPORT_TYPE.ORDER_ANALYTICS]: 'order',

  // Payment reports
  [ADMIN_REPORT_TYPE.PAYMENT_TRANSACTIONS]: 'payment',
  [ADMIN_REPORT_TYPE.PAYMENT_METHODS]: 'payment',
  [ADMIN_REPORT_TYPE.PAYMENT_STATUS]: 'payment',
  [ADMIN_REPORT_TYPE.PAYMENT_RECONCILIATION]: 'payment',
  [ADMIN_REPORT_TYPE.PAYMENT_DISPUTES]: 'payment',

  // User reports
  [ADMIN_REPORT_TYPE.USER_ACTIVITY]: 'user',
  [ADMIN_REPORT_TYPE.USER_ENGAGEMENT]: 'user',
  [ADMIN_REPORT_TYPE.USER_RETENTION]: 'user',
  [ADMIN_REPORT_TYPE.USER_ACQUISITION]: 'user',
  [ADMIN_REPORT_TYPE.USER_DEMOGRAPHICS]: 'user',
  [ADMIN_REPORT_TYPE.USER_BEHAVIOR]: 'user',

  // Security reports
  [ADMIN_REPORT_TYPE.SECURITY_AUDIT]: 'security',
  [ADMIN_REPORT_TYPE.SECURITY_INCIDENTS]: 'security',
  [ADMIN_REPORT_TYPE.SECURITY_LOGS]: 'security',
  [ADMIN_REPORT_TYPE.ACCESS_CONTROL]: 'security',
  [ADMIN_REPORT_TYPE.COMPLIANCE_STATUS]: 'security',

  // Marketing reports
  [ADMIN_REPORT_TYPE.CAMPAIGN_PERFORMANCE]: 'marketing',
  [ADMIN_REPORT_TYPE.MARKETING_ROI]: 'marketing',
  [ADMIN_REPORT_TYPE.CHANNEL_ANALYTICS]: 'marketing',
  [ADMIN_REPORT_TYPE.CONVERSION_RATE]: 'marketing',
  [ADMIN_REPORT_TYPE.CUSTOMER_ACQUISITION]: 'marketing',

  // Support reports
  [ADMIN_REPORT_TYPE.TICKET_VOLUME]: 'support',
  [ADMIN_REPORT_TYPE.TICKET_RESOLUTION]: 'support',
  [ADMIN_REPORT_TYPE.TICKET_SATISFACTION]: 'support',
  [ADMIN_REPORT_TYPE.SUPPORT_PERFORMANCE]: 'support',
  [ADMIN_REPORT_TYPE.ESCALATION_RATE]: 'support',

  // Logistics reports
  [ADMIN_REPORT_TYPE.SHIPPING_PERFORMANCE]: 'logistics',
  [ADMIN_REPORT_TYPE.DELIVERY_TIME]: 'logistics',
  [ADMIN_REPORT_TYPE.SHIPPING_COST]: 'logistics',
  [ADMIN_REPORT_TYPE.WAREHOUSE_INVENTORY]: 'logistics',
  [ADMIN_REPORT_TYPE.SUPPLY_CHAIN]: 'logistics',

  // Analytics reports
  [ADMIN_REPORT_TYPE.CUSTOM_ANALYTICS]: 'analytics',
  [ADMIN_REPORT_TYPE.DATA_INSIGHTS]: 'analytics',
  [ADMIN_REPORT_TYPE.TREND_ANALYSIS]: 'analytics',
  [ADMIN_REPORT_TYPE.PREDICTIVE_ANALYTICS]: 'analytics',
  [ADMIN_REPORT_TYPE.COMPARATIVE_ANALYTICS]: 'analytics',

  // Custom reports
  [ADMIN_REPORT_TYPE.CUSTOM_TABLE]: 'custom',
  [ADMIN_REPORT_TYPE.CUSTOM_CHART]: 'custom',
  [ADMIN_REPORT_TYPE.CUSTOM_DASHBOARD]: 'custom',
  [ADMIN_REPORT_TYPE.CUSTOM_EXPORT]: 'custom',
};

export const ADMIN_REPORT_TYPE_LABELS_DETAIL: Record<AdminReportTypeDetail, string> = {
  // Summary reports
  [ADMIN_REPORT_TYPE.EXECUTIVE_SUMMARY]: 'Executive Summary',
  [ADMIN_REPORT_TYPE.OPERATIONAL_SUMMARY]: 'Operational Summary',
  [ADMIN_REPORT_TYPE.FINANCIAL_SUMMARY]: 'Financial Summary',
  [ADMIN_REPORT_TYPE.WEEKLY_SUMMARY]: 'Weekly Summary',
  [ADMIN_REPORT_TYPE.MONTHLY_SUMMARY]: 'Monthly Summary',
  [ADMIN_REPORT_TYPE.QUARTERLY_SUMMARY]: 'Quarterly Summary',
  [ADMIN_REPORT_TYPE.ANNUAL_SUMMARY]: 'Annual Summary',

  // Performance reports
  [ADMIN_REPORT_TYPE.TEAM_PERFORMANCE]: 'Team Performance',
  [ADMIN_REPORT_TYPE.INDIVIDUAL_PERFORMANCE]: 'Individual Performance',
  [ADMIN_REPORT_TYPE.DEPARTMENT_PERFORMANCE]: 'Department Performance',
  [ADMIN_REPORT_TYPE.KPI_PERFORMANCE]: 'KPI Performance',
  [ADMIN_REPORT_TYPE.GOAL_PROGRESS]: 'Goal Progress',
  [ADMIN_REPORT_TYPE.PRODUCTIVITY]: 'Productivity',
  [ADMIN_REPORT_TYPE.EFFICIENCY]: 'Efficiency',

  // Financial reports
  [ADMIN_REPORT_TYPE.REVENUE]: 'Revenue Report',
  [ADMIN_REPORT_TYPE.PROFIT_LOSS]: 'Profit & Loss',
  [ADMIN_REPORT_TYPE.CASH_FLOW]: 'Cash Flow',
  [ADMIN_REPORT_TYPE.BALANCE_SHEET]: 'Balance Sheet',
  [ADMIN_REPORT_TYPE.BUDGET_VARIANCE]: 'Budget Variance',
  [ADMIN_REPORT_TYPE.EXPENSE]: 'Expense Report',
  [ADMIN_REPORT_TYPE.TAX]: 'Tax Report',
  [ADMIN_REPORT_TYPE.AUDIT_FINANCIAL]: 'Financial Audit',

  // Sales reports
  [ADMIN_REPORT_TYPE.SALES_OVERVIEW]: 'Sales Overview',
  [ADMIN_REPORT_TYPE.SALES_TREND]: 'Sales Trend',
  [ADMIN_REPORT_TYPE.SALES_BY_PRODUCT]: 'Sales by Product',
  [ADMIN_REPORT_TYPE.SALES_BY_REGION]: 'Sales by Region',
  [ADMIN_REPORT_TYPE.SALES_BY_CATEGORY]: 'Sales by Category',
  [ADMIN_REPORT_TYPE.SALES_FORECAST]: 'Sales Forecast',
  [ADMIN_REPORT_TYPE.COMPARATIVE_SALES]: 'Comparative Sales',

  // Product reports
  [ADMIN_REPORT_TYPE.PRODUCT_PERFORMANCE]: 'Product Performance',
  [ADMIN_REPORT_TYPE.PRODUCT_INVENTORY]: 'Product Inventory',
  [ADMIN_REPORT_TYPE.PRODUCT_STOCK]: 'Product Stock',
  [ADMIN_REPORT_TYPE.PRODUCT_ANALYTICS]: 'Product Analytics',
  [ADMIN_REPORT_TYPE.PRODUCT_REVIEWS]: 'Product Reviews',
  [ADMIN_REPORT_TYPE.PRODUCT_RETURNS]: 'Product Returns',

  // Order reports
  [ADMIN_REPORT_TYPE.ORDER_VOLUME]: 'Order Volume',
  [ADMIN_REPORT_TYPE.ORDER_VALUE]: 'Order Value',
  [ADMIN_REPORT_TYPE.ORDER_STATUS]: 'Order Status',
  [ADMIN_REPORT_TYPE.ORDER_FULFILLMENT]: 'Order Fulfillment',
  [ADMIN_REPORT_TYPE.ORDER_RETURNS]: 'Order Returns',
  [ADMIN_REPORT_TYPE.ORDER_ANALYTICS]: 'Order Analytics',

  // Payment reports
  [ADMIN_REPORT_TYPE.PAYMENT_TRANSACTIONS]: 'Payment Transactions',
  [ADMIN_REPORT_TYPE.PAYMENT_METHODS]: 'Payment Methods',
  [ADMIN_REPORT_TYPE.PAYMENT_STATUS]: 'Payment Status',
  [ADMIN_REPORT_TYPE.PAYMENT_RECONCILIATION]: 'Payment Reconciliation',
  [ADMIN_REPORT_TYPE.PAYMENT_DISPUTES]: 'Payment Disputes',

  // User reports
  [ADMIN_REPORT_TYPE.USER_ACTIVITY]: 'User Activity',
  [ADMIN_REPORT_TYPE.USER_ENGAGEMENT]: 'User Engagement',
  [ADMIN_REPORT_TYPE.USER_RETENTION]: 'User Retention',
  [ADMIN_REPORT_TYPE.USER_ACQUISITION]: 'User Acquisition',
  [ADMIN_REPORT_TYPE.USER_DEMOGRAPHICS]: 'User Demographics',
  [ADMIN_REPORT_TYPE.USER_BEHAVIOR]: 'User Behavior',

  // Security reports
  [ADMIN_REPORT_TYPE.SECURITY_AUDIT]: 'Security Audit',
  [ADMIN_REPORT_TYPE.SECURITY_INCIDENTS]: 'Security Incidents',
  [ADMIN_REPORT_TYPE.SECURITY_LOGS]: 'Security Logs',
  [ADMIN_REPORT_TYPE.ACCESS_CONTROL]: 'Access Control',
  [ADMIN_REPORT_TYPE.COMPLIANCE_STATUS]: 'Compliance Status',

  // Marketing reports
  [ADMIN_REPORT_TYPE.CAMPAIGN_PERFORMANCE]: 'Campaign Performance',
  [ADMIN_REPORT_TYPE.MARKETING_ROI]: 'Marketing ROI',
  [ADMIN_REPORT_TYPE.CHANNEL_ANALYTICS]: 'Channel Analytics',
  [ADMIN_REPORT_TYPE.CONVERSION_RATE]: 'Conversion Rate',
  [ADMIN_REPORT_TYPE.CUSTOMER_ACQUISITION]: 'Customer Acquisition',

  // Support reports
  [ADMIN_REPORT_TYPE.TICKET_VOLUME]: 'Ticket Volume',
  [ADMIN_REPORT_TYPE.TICKET_RESOLUTION]: 'Ticket Resolution',
  [ADMIN_REPORT_TYPE.TICKET_SATISFACTION]: 'Ticket Satisfaction',
  [ADMIN_REPORT_TYPE.SUPPORT_PERFORMANCE]: 'Support Performance',
  [ADMIN_REPORT_TYPE.ESCALATION_RATE]: 'Escalation Rate',

  // Logistics reports
  [ADMIN_REPORT_TYPE.SHIPPING_PERFORMANCE]: 'Shipping Performance',
  [ADMIN_REPORT_TYPE.DELIVERY_TIME]: 'Delivery Time',
  [ADMIN_REPORT_TYPE.SHIPPING_COST]: 'Shipping Cost',
  [ADMIN_REPORT_TYPE.WAREHOUSE_INVENTORY]: 'Warehouse Inventory',
  [ADMIN_REPORT_TYPE.SUPPLY_CHAIN]: 'Supply Chain',

  // Analytics reports
  [ADMIN_REPORT_TYPE.CUSTOM_ANALYTICS]: 'Custom Analytics',
  [ADMIN_REPORT_TYPE.DATA_INSIGHTS]: 'Data Insights',
  [ADMIN_REPORT_TYPE.TREND_ANALYSIS]: 'Trend Analysis',
  [ADMIN_REPORT_TYPE.PREDICTIVE_ANALYTICS]: 'Predictive Analytics',
  [ADMIN_REPORT_TYPE.COMPARATIVE_ANALYTICS]: 'Comparative Analytics',

  // Custom reports
  [ADMIN_REPORT_TYPE.CUSTOM_TABLE]: 'Custom Table',
  [ADMIN_REPORT_TYPE.CUSTOM_CHART]: 'Custom Chart',
  [ADMIN_REPORT_TYPE.CUSTOM_DASHBOARD]: 'Custom Dashboard',
  [ADMIN_REPORT_TYPE.CUSTOM_EXPORT]: 'Custom Export',
};

export function getAdminReportTypeCategory(type: AdminReportTypeDetail): string {
  return ADMIN_REPORT_TYPE_CATEGORIES[type] || 'other';
}

export function getAdminReportTypeLabel(type: AdminReportTypeDetail): string {
  return ADMIN_REPORT_TYPE_LABELS_DETAIL[type] || 'Unknown Type';
}

export function isSummaryReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'summary';
}

export function isPerformanceReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'performance';
}

export function isFinancialReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'financial';
}

export function isSalesReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'sales';
}

export function isProductReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'product';
}

export function isOrderReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'order';
}

export function isPaymentReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'payment';
}

export function isUserReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'user';
}

export function isSecurityReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'security';
}

export function isMarketingReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'marketing';
}

export function isSupportReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'support';
}

export function isLogisticsReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'logistics';
}

export function isAnalyticsReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'analytics';
}

export function isCustomReport(type: AdminReportTypeDetail): boolean {
  return getAdminReportTypeCategory(type) === 'custom';
}
