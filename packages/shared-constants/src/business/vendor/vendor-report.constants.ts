/**
 * Vendor Report Constants
 * ভেন্ডর রিপোর্ট সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const VENDOR_REPORT = {
  // Report types (TYPES ব্যবহার করে)
  TYPES: {
    SALES: 'sales',
    ORDERS: 'orders',
    PRODUCTS: 'products',
    PAYMENTS: 'payments',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    CUSTOMERS: 'customers',
    ANALYTICS: 'analytics',
    PERFORMANCE: 'performance',
    INVENTORY: 'inventory',
    TAX: TYPES.VAT,
    COMPARISON: 'comparison',
  },

  // Report formats
  FORMATS: {
    PDF: 'pdf',
    CSV: 'csv',
    EXCEL: 'excel',
    JSON: 'json',
    HTML: 'html',
  },

  // Report periods
  PERIODS: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CUSTOM: 'custom',
  },

  // Report status
  STATUS: {
    PENDING: TYPES.PENDING,
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },

  // Default values
  DEFAULTS: {
    MAX_ROWS: 10000,
    MAX_COLUMNS: 50,
    EXPIRY_DAYS: 30,
  },
} as const;

export type VendorReportType = (typeof VENDOR_REPORT.TYPES)[keyof typeof VENDOR_REPORT.TYPES];
export type VendorReportFormat = (typeof VENDOR_REPORT.FORMATS)[keyof typeof VENDOR_REPORT.FORMATS];
export type VendorReportPeriod = (typeof VENDOR_REPORT.PERIODS)[keyof typeof VENDOR_REPORT.PERIODS];
export type VendorReportStatus = (typeof VENDOR_REPORT.STATUS)[keyof typeof VENDOR_REPORT.STATUS];
