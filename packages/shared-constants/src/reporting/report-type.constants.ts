/**
 * Report Type Constants
 * Types of reports available in the system
 */

export const REPORT_TYPE = {
  // Report Types
  TYPES: {
    // Sales Reports
    SALES_SUMMARY: 'sales_summary',
    SALES_DETAILED: 'sales_detailed',
    SALES_BY_PRODUCT: 'sales_by_product',
    SALES_BY_CATEGORY: 'sales_by_category',
    SALES_BY_VENDOR: 'sales_by_vendor',
    SALES_BY_REGION: 'sales_by_region',
    SALES_TREND: 'sales_trend',
    TOP_SELLING: 'top_selling',
    BOTTOM_SELLING: 'bottom_selling',

    // Financial Reports
    FINANCIAL_SUMMARY: 'financial_summary',
    REVENUE_REPORT: 'revenue_report',
    EXPENSE_REPORT: 'expense_report',
    PROFIT_LOSS: 'profit_loss',
    BALANCE_SHEET: 'balance_sheet',
    CASH_FLOW: 'cash_flow',
    TAX_REPORT: 'tax_report',
    COMMISSION_REPORT: 'commission_report',

    // Customer Reports
    CUSTOMER_SUMMARY: 'customer_summary',
    CUSTOMER_ACQUISITION: 'customer_acquisition',
    CUSTOMER_RETENTION: 'customer_retention',
    CUSTOMER_SEGMENTATION: 'customer_segmentation',
    CUSTOMER_LIFETIME_VALUE: 'customer_lifetime_value',
    CUSTOMER_CHURN: 'customer_churn',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',

    // Product Reports
    PRODUCT_SUMMARY: 'product_summary',
    PRODUCT_INVENTORY: 'product_inventory',
    PRODUCT_PERFORMANCE: 'product_performance',
    PRODUCT_RETURNS: 'product_returns',
    PRODUCT_REVIEWS: 'product_reviews',
    PRODUCT_RANKING: 'product_ranking',

    // Marketing Reports
    MARKETING_SUMMARY: 'marketing_summary',
    CAMPAIGN_PERFORMANCE: 'campaign_performance',
    ROI_REPORT: 'roi_report',
    LEAD_GENERATION: 'lead_generation',
    CONVERSION_RATE: 'conversion_rate',
    CHANNEL_PERFORMANCE: 'channel_performance',

    // Operational Reports
    OPERATIONAL_SUMMARY: 'operational_summary',
    ORDER_FULFILLMENT: 'order_fulfillment',
    SHIPPING_PERFORMANCE: 'shipping_performance',
    INVENTORY_TURNOVER: 'inventory_turnover',
    SUPPLIER_PERFORMANCE: 'supplier_performance',

    // Vendor Reports
    VENDOR_SUMMARY: 'vendor_summary',
    VENDOR_PERFORMANCE: 'vendor_performance',
    VENDOR_PAYOUT: 'vendor_payout',
    VENDOR_SETTLEMENT: 'vendor_settlement',

    // Logistics Reports
    LOGISTICS_SUMMARY: 'logistics_summary',
    SHIPMENT_REPORT: 'shipment_report',
    DELIVERY_PERFORMANCE: 'delivery_performance',
    WAREHOUSE_REPORT: 'warehouse_report',
    CARRIER_PERFORMANCE: 'carrier_performance',

    // Support Reports
    SUPPORT_SUMMARY: 'support_summary',
    TICKET_REPORT: 'ticket_report',
    RESOLUTION_RATE: 'resolution_rate',
    SLA_COMPLIANCE: 'sla_compliance',

    // Analytics Reports
    ANALYTICAL_SUMMARY: 'analytical_summary',
    TREND_ANALYSIS: 'trend_analysis',
    PREDICTIVE_ANALYSIS: 'predictive_analysis',
    FORECAST_REPORT: 'forecast_report',
    SEASONAL_REPORT: 'seasonal_report',

    // Custom Reports
    CUSTOM: 'custom',
  } as const,

  // Report Sub-Types
  SUB_TYPES: {
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    TREND: 'trend',
    COMPARISON: 'comparison',
    FORECAST: 'forecast',
    PERFORMANCE: 'performance',
    COMPLIANCE: 'compliance',
    AUDIT: 'audit',
  } as const,

  // Report Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
  } as const,

  // Report Access Levels
  ACCESS_LEVELS: {
    PUBLIC: 'public',
    RESTRICTED: 'restricted',
    CONFIDENTIAL: 'confidential',
    TOP_SECRET: 'top_secret',
  } as const,
} as const;

// Report Types
export type ReportTypeType = (typeof REPORT_TYPE.TYPES)[keyof typeof REPORT_TYPE.TYPES];

// Report Sub-Types
export type ReportSubType = (typeof REPORT_TYPE.SUB_TYPES)[keyof typeof REPORT_TYPE.SUB_TYPES];

// Report Scope
export type ReportScope = (typeof REPORT_TYPE.SCOPE)[keyof typeof REPORT_TYPE.SCOPE];

// Report Access Levels
export type ReportAccessLevel =
  (typeof REPORT_TYPE.ACCESS_LEVELS)[keyof typeof REPORT_TYPE.ACCESS_LEVELS];

// Utility Functions
export function getReportTypeLabel(reportType: ReportTypeType): string {
  const labels: Record<ReportTypeType, string> = {
    [REPORT_TYPE.TYPES.SALES_SUMMARY]: 'Sales Summary',
    [REPORT_TYPE.TYPES.SALES_DETAILED]: 'Detailed Sales',
    [REPORT_TYPE.TYPES.SALES_BY_PRODUCT]: 'Sales by Product',
    [REPORT_TYPE.TYPES.SALES_BY_CATEGORY]: 'Sales by Category',
    [REPORT_TYPE.TYPES.SALES_BY_VENDOR]: 'Sales by Vendor',
    [REPORT_TYPE.TYPES.SALES_BY_REGION]: 'Sales by Region',
    [REPORT_TYPE.TYPES.SALES_TREND]: 'Sales Trend',
    [REPORT_TYPE.TYPES.TOP_SELLING]: 'Top Selling Products',
    [REPORT_TYPE.TYPES.BOTTOM_SELLING]: 'Bottom Selling Products',
    [REPORT_TYPE.TYPES.FINANCIAL_SUMMARY]: 'Financial Summary',
    [REPORT_TYPE.TYPES.REVENUE_REPORT]: 'Revenue Report',
    [REPORT_TYPE.TYPES.EXPENSE_REPORT]: 'Expense Report',
    [REPORT_TYPE.TYPES.PROFIT_LOSS]: 'Profit & Loss',
    [REPORT_TYPE.TYPES.BALANCE_SHEET]: 'Balance Sheet',
    [REPORT_TYPE.TYPES.CASH_FLOW]: 'Cash Flow',
    [REPORT_TYPE.TYPES.TAX_REPORT]: 'Tax Report',
    [REPORT_TYPE.TYPES.COMMISSION_REPORT]: 'Commission Report',
    [REPORT_TYPE.TYPES.CUSTOMER_SUMMARY]: 'Customer Summary',
    [REPORT_TYPE.TYPES.CUSTOMER_ACQUISITION]: 'Customer Acquisition',
    [REPORT_TYPE.TYPES.CUSTOMER_RETENTION]: 'Customer Retention',
    [REPORT_TYPE.TYPES.CUSTOMER_SEGMENTATION]: 'Customer Segmentation',
    [REPORT_TYPE.TYPES.CUSTOMER_LIFETIME_VALUE]: 'Customer Lifetime Value',
    [REPORT_TYPE.TYPES.CUSTOMER_CHURN]: 'Customer Churn',
    [REPORT_TYPE.TYPES.CUSTOMER_SATISFACTION]: 'Customer Satisfaction',
    [REPORT_TYPE.TYPES.PRODUCT_SUMMARY]: 'Product Summary',
    [REPORT_TYPE.TYPES.PRODUCT_INVENTORY]: 'Product Inventory',
    [REPORT_TYPE.TYPES.PRODUCT_PERFORMANCE]: 'Product Performance',
    [REPORT_TYPE.TYPES.PRODUCT_RETURNS]: 'Product Returns',
    [REPORT_TYPE.TYPES.PRODUCT_REVIEWS]: 'Product Reviews',
    [REPORT_TYPE.TYPES.PRODUCT_RANKING]: 'Product Ranking',
    [REPORT_TYPE.TYPES.MARKETING_SUMMARY]: 'Marketing Summary',
    [REPORT_TYPE.TYPES.CAMPAIGN_PERFORMANCE]: 'Campaign Performance',
    [REPORT_TYPE.TYPES.ROI_REPORT]: 'ROI Report',
    [REPORT_TYPE.TYPES.LEAD_GENERATION]: 'Lead Generation',
    [REPORT_TYPE.TYPES.CONVERSION_RATE]: 'Conversion Rate',
    [REPORT_TYPE.TYPES.CHANNEL_PERFORMANCE]: 'Channel Performance',
    [REPORT_TYPE.TYPES.OPERATIONAL_SUMMARY]: 'Operational Summary',
    [REPORT_TYPE.TYPES.ORDER_FULFILLMENT]: 'Order Fulfillment',
    [REPORT_TYPE.TYPES.SHIPPING_PERFORMANCE]: 'Shipping Performance',
    [REPORT_TYPE.TYPES.INVENTORY_TURNOVER]: 'Inventory Turnover',
    [REPORT_TYPE.TYPES.SUPPLIER_PERFORMANCE]: 'Supplier Performance',
    [REPORT_TYPE.TYPES.VENDOR_SUMMARY]: 'Vendor Summary',
    [REPORT_TYPE.TYPES.VENDOR_PERFORMANCE]: 'Vendor Performance',
    [REPORT_TYPE.TYPES.VENDOR_PAYOUT]: 'Vendor Payout',
    [REPORT_TYPE.TYPES.VENDOR_SETTLEMENT]: 'Vendor Settlement',
    [REPORT_TYPE.TYPES.LOGISTICS_SUMMARY]: 'Logistics Summary',
    [REPORT_TYPE.TYPES.SHIPMENT_REPORT]: 'Shipment Report',
    [REPORT_TYPE.TYPES.DELIVERY_PERFORMANCE]: 'Delivery Performance',
    [REPORT_TYPE.TYPES.WAREHOUSE_REPORT]: 'Warehouse Report',
    [REPORT_TYPE.TYPES.CARRIER_PERFORMANCE]: 'Carrier Performance',
    [REPORT_TYPE.TYPES.SUPPORT_SUMMARY]: 'Support Summary',
    [REPORT_TYPE.TYPES.TICKET_REPORT]: 'Ticket Report',
    [REPORT_TYPE.TYPES.RESOLUTION_RATE]: 'Resolution Rate',
    [REPORT_TYPE.TYPES.SLA_COMPLIANCE]: 'SLA Compliance',
    [REPORT_TYPE.TYPES.ANALYTICAL_SUMMARY]: 'Analytical Summary',
    [REPORT_TYPE.TYPES.TREND_ANALYSIS]: 'Trend Analysis',
    [REPORT_TYPE.TYPES.PREDICTIVE_ANALYSIS]: 'Predictive Analysis',
    [REPORT_TYPE.TYPES.FORECAST_REPORT]: 'Forecast Report',
    [REPORT_TYPE.TYPES.SEASONAL_REPORT]: 'Seasonal Report',
    [REPORT_TYPE.TYPES.CUSTOM]: 'Custom Report',
  };
  return labels[reportType] || 'Unknown Report Type';
}

export function getReportSubTypeLabel(subType: ReportSubType): string {
  const labels: Record<ReportSubType, string> = {
    [REPORT_TYPE.SUB_TYPES.SUMMARY]: 'Summary',
    [REPORT_TYPE.SUB_TYPES.DETAILED]: 'Detailed',
    [REPORT_TYPE.SUB_TYPES.TREND]: 'Trend',
    [REPORT_TYPE.SUB_TYPES.COMPARISON]: 'Comparison',
    [REPORT_TYPE.SUB_TYPES.FORECAST]: 'Forecast',
    [REPORT_TYPE.SUB_TYPES.PERFORMANCE]: 'Performance',
    [REPORT_TYPE.SUB_TYPES.COMPLIANCE]: 'Compliance',
    [REPORT_TYPE.SUB_TYPES.AUDIT]: 'Audit',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function getReportScopeLabel(scope: ReportScope): string {
  const labels: Record<ReportScope, string> = {
    [REPORT_TYPE.SCOPE.GLOBAL]: 'Global',
    [REPORT_TYPE.SCOPE.REGIONAL]: 'Regional',
    [REPORT_TYPE.SCOPE.LOCAL]: 'Local',
    [REPORT_TYPE.SCOPE.DEPARTMENT]: 'Department',
    [REPORT_TYPE.SCOPE.TEAM]: 'Team',
    [REPORT_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function getReportAccessLevelLabel(accessLevel: ReportAccessLevel): string {
  const labels: Record<ReportAccessLevel, string> = {
    [REPORT_TYPE.ACCESS_LEVELS.PUBLIC]: 'Public',
    [REPORT_TYPE.ACCESS_LEVELS.RESTRICTED]: 'Restricted',
    [REPORT_TYPE.ACCESS_LEVELS.CONFIDENTIAL]: 'Confidential',
    [REPORT_TYPE.ACCESS_LEVELS.TOP_SECRET]: 'Top Secret',
  };
  return labels[accessLevel] || 'Unknown Access Level';
}

export function isSalesReport(reportType: ReportTypeType): boolean {
  const salesReports: ReportTypeType[] = [
    REPORT_TYPE.TYPES.SALES_SUMMARY,
    REPORT_TYPE.TYPES.SALES_DETAILED,
    REPORT_TYPE.TYPES.SALES_BY_PRODUCT,
    REPORT_TYPE.TYPES.SALES_BY_CATEGORY,
    REPORT_TYPE.TYPES.SALES_BY_VENDOR,
    REPORT_TYPE.TYPES.SALES_BY_REGION,
    REPORT_TYPE.TYPES.SALES_TREND,
    REPORT_TYPE.TYPES.TOP_SELLING,
    REPORT_TYPE.TYPES.BOTTOM_SELLING,
  ];
  return salesReports.includes(reportType);
}

export function isFinancialReport(reportType: ReportTypeType): boolean {
  const financialReports: ReportTypeType[] = [
    REPORT_TYPE.TYPES.FINANCIAL_SUMMARY,
    REPORT_TYPE.TYPES.REVENUE_REPORT,
    REPORT_TYPE.TYPES.EXPENSE_REPORT,
    REPORT_TYPE.TYPES.PROFIT_LOSS,
    REPORT_TYPE.TYPES.BALANCE_SHEET,
    REPORT_TYPE.TYPES.CASH_FLOW,
    REPORT_TYPE.TYPES.TAX_REPORT,
    REPORT_TYPE.TYPES.COMMISSION_REPORT,
  ];
  return financialReports.includes(reportType);
}

export function isCustomerReport(reportType: ReportTypeType): boolean {
  const customerReports: ReportTypeType[] = [
    REPORT_TYPE.TYPES.CUSTOMER_SUMMARY,
    REPORT_TYPE.TYPES.CUSTOMER_ACQUISITION,
    REPORT_TYPE.TYPES.CUSTOMER_RETENTION,
    REPORT_TYPE.TYPES.CUSTOMER_SEGMENTATION,
    REPORT_TYPE.TYPES.CUSTOMER_LIFETIME_VALUE,
    REPORT_TYPE.TYPES.CUSTOMER_CHURN,
    REPORT_TYPE.TYPES.CUSTOMER_SATISFACTION,
  ];
  return customerReports.includes(reportType);
}
