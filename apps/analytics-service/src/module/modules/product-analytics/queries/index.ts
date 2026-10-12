/**
 * Product Analytics Query Handlers Barrel
 */
import { GetProductAnalyticsHandler } from '../../../application/queries/analytics/get-product-analytics.handler.js';

export const PRODUCT_ANALYTICS_QUERY_HANDLERS = [
  GetProductAnalyticsHandler,
] as const;

export { GetProductAnalyticsHandler };
