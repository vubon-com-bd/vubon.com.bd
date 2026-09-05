/**
 * Vendor Analytics Config
 * ভেন্ডর অ্যানালিটিক্স কনফিগারেশন
 */

export interface VendorAnalyticsConfig {
  enabled: boolean;
  retentionDays: number;
  maxReports: number;
  metrics: {
    sales: boolean;
    orders: boolean;
    revenue: boolean;
    profit: boolean;
    conversion: boolean;
    customer: boolean;
    products: boolean;
    ratings: boolean;
    completion: boolean;
  };
  periods: {
    daily: string;
    weekly: string;
    monthly: string;
    quarterly: string;
    yearly: string;
  };
  defaults: {
    retentionDays: number;
    maxReports: number;
  };
}

export const vendorAnalyticsConfig: VendorAnalyticsConfig = {
  enabled: true,
  retentionDays: 30,
  maxReports: 100,

  metrics: {
    sales: true,
    orders: true,
    revenue: true,
    profit: true,
    conversion: true,
    customer: true,
    products: true,
    ratings: true,
    completion: true,
  },

  periods: {
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly',
    quarterly: 'quarterly',
    yearly: 'yearly',
  },

  defaults: {
    retentionDays: 30,
    maxReports: 100,
  },
} as const;

export type VendorAnalyticsConfigType = typeof vendorAnalyticsConfig;
