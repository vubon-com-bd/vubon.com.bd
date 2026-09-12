/**
 * Platform Support Analytics Constants
 * @module shared-constants/platform/analytics/support-analytics
 *
 * Note: Named PLATFORM_SUPPORT_ANALYTICS to avoid collision with
 * support/support-analytics.constants (SUPPORT_ANALYTICS).
 */

export const PLATFORM_SUPPORT_ANALYTICS = {
  METRICS: {
    TICKETS_OPEN: 'tickets_open',
    TICKETS_CLOSED: 'tickets_closed',
    AVG_RESPONSE_TIME: 'avg_response_time',
    AVG_RESOLUTION_TIME: 'avg_resolution_time',
    SATISFACTION_SCORE: 'satisfaction_score',
    FIRST_CONTACT_RESOLUTION: 'first_contact_resolution',
    ESCALATION_RATE: 'escalation_rate',
    REOPEN_RATE: 'reopen_rate',
  },
  PERIODS: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  },
} as const;

export type PlatformSupportAnalyticsMetric =
  (typeof PLATFORM_SUPPORT_ANALYTICS.METRICS)[keyof typeof PLATFORM_SUPPORT_ANALYTICS.METRICS];
