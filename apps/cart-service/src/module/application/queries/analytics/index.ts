export * from './get-cart-analytics.query.js';
export * from './get-cart-analytics.handler.js';
export * from './get-abandonment-rate.query.js';
export * from './get-abandonment-rate.handler.js';

import { GetCartAnalyticsHandler } from './get-cart-analytics.handler.js';
import { GetAbandonmentRateHandler } from './get-abandonment-rate.handler.js';

export const ANALYTICS_QUERY_HANDLERS = [
  GetCartAnalyticsHandler,
  GetAbandonmentRateHandler,
] as const;
