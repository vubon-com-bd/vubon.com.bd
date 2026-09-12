/**
 * Analytics API endpoint paths.
 * @module shared-api/endpoints/analytics
 */

export const ANALYTICS_ENDPOINTS = {
  QUERY: '/analytics/query',
  METRICS: '/analytics/metrics',
  METRIC: (metricId: string) => `/analytics/metrics/${metricId}`,
  DASHBOARD: '/analytics/dashboard',
  EXPORT: '/analytics/export',
  EVENTS: '/analytics/events',
  EVENT: (eventId: string) => `/analytics/events/${eventId}`,
  REALTIME: '/analytics/realtime',
  HISTORICAL: '/analytics/historical',
} as const;
