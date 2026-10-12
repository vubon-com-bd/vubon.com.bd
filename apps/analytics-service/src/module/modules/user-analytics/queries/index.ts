/**
 * User Analytics Query Handlers Barrel
 */
import { GetUserAnalyticsHandler } from '../../../application/queries/analytics/get-user-analytics.handler.js';

export const USER_ANALYTICS_QUERY_HANDLERS = [
  GetUserAnalyticsHandler,
] as const;

export { GetUserAnalyticsHandler };
