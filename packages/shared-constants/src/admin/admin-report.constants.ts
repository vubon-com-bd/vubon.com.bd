/**
 * Admin Report Constants
 * @module shared-constants/admin/admin-report
 */

export const ADMIN_REPORT = {
  TYPE: {
    SALES: 'sales',
    ORDERS: 'orders',
    REVENUE: 'revenue',
    INVENTORY: 'inventory',
    CUSTOMERS: 'customers',
    PRODUCTS: 'products',
    PAYMENTS: 'payments',
    SHIPPING: 'shipping',
    TAX: 'tax',
    COMMISSION: 'commission',
    PERFORMANCE: 'performance',
    AUDIT: 'audit',
    SECURITY: 'security',
    SYSTEM: 'system',
    CUSTOM: 'custom',
  } as const,

  FREQUENCY: {
    ONCE: 'once',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

export type AdminReportType = (typeof ADMIN_REPORT.TYPE)[keyof typeof ADMIN_REPORT.TYPE];
export type AdminReportFrequency =
  (typeof ADMIN_REPORT.FREQUENCY)[keyof typeof ADMIN_REPORT.FREQUENCY];
