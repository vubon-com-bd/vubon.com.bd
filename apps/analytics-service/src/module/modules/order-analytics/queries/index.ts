/**
 * Order Analytics Query Handlers Barrel
 */
import { GetOrderAnalyticsHandler } from '../../../application/queries/analytics/get-order-analytics.handler.js';

export const ORDER_ANALYTICS_QUERY_HANDLERS = [
  GetOrderAnalyticsHandler,
] as const;

export { GetOrderAnalyticsHandler };
