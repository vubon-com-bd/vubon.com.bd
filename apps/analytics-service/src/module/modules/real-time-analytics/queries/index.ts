/**
 * Real-Time Analytics Query Handlers Barrel
 */
import { GetRealTimeAnalyticsHandler } from '../../../application/queries/analytics/get-real-time-analytics.handler.js';

export const REAL_TIME_ANALYTICS_QUERY_HANDLERS = [
  GetRealTimeAnalyticsHandler,
] as const;

export { GetRealTimeAnalyticsHandler };
