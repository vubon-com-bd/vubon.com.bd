// queries/analytics/index.ts
export * from './get-analytics-overview.query.js';
export * from './get-analytics-overview.handler.js';
export * from './get-analytics-time-series.query.js';
export * from './get-analytics-time-series.handler.js';
export * from './get-channel-performance.query.js';
export * from './get-channel-performance.handler.js';

import { GetAnalyticsOverviewHandler } from './get-analytics-overview.handler.js';
import { GetAnalyticsTimeSeriesHandler } from './get-analytics-time-series.handler.js';
import { GetChannelPerformanceHandler } from './get-channel-performance.handler.js';

export const ANALYTICS_QUERY_HANDLERS = [
  GetAnalyticsOverviewHandler,
  GetAnalyticsTimeSeriesHandler,
  GetChannelPerformanceHandler,
] as const;
