/**
 * Health API endpoint paths.
 * @module shared-api/endpoints/health
 */

export const HEALTH_ENDPOINTS = {
  GET: '/health',
  CHECK: '/health/check',
  READY: '/health/ready',
  LIVE: '/health/live',
  METRICS: '/health/metrics',
} as const;
