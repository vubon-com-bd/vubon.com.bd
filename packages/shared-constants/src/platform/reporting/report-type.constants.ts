export const REPORT_TYPE = {
  SALES: 'sales',
  REVENUE: 'revenue',
  ORDERS: 'orders',
  PRODUCTS: 'products',
  INVENTORY: 'inventory',
  CUSTOMERS: 'customers',
  VENDORS: 'vendors',
  PAYMENTS: 'payments',
  REFUNDS: 'refunds',
  SHIPPING: 'shipping',
  TAX: 'tax',
  COMMISSION: 'commission',
  PERFORMANCE: 'performance',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  SUPPORT: 'support',
  LOGISTICS: 'logistics',
  FINANCIAL: 'financial',
  OPERATIONAL: 'operational',
  CUSTOM: 'custom',
} as const;

export type ReportTypeType = (typeof REPORT_TYPE)[keyof typeof REPORT_TYPE];
