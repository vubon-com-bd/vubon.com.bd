/**
 * Admin Analytics Constants
 * @module shared-constants/admin/admin-analytics
 */

export const ADMIN_ANALYTICS = {
  PERIOD: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

export type AnalyticsPeriod = (typeof ADMIN_ANALYTICS.PERIOD)[keyof typeof ADMIN_ANALYTICS.PERIOD];
