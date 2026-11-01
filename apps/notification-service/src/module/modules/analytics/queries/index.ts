/**
 * Analytics Query Handlers Barrel
 * @module notification-service/modules/analytics/queries
 */
import { GetDeliveryRateHandler } from '@application/queries/analytics/get-delivery-rate.handler.js';
import { GetChannelStatsHandler } from '@application/queries/analytics/get-channel-stats.handler.js';
import { GetEngagementHandler } from '@application/queries/analytics/get-engagement.handler.js';
import { GetTemplatePerformanceHandler } from '@application/queries/analytics/get-template-performance.handler.js';

export const ANALYTICS_QUERY_HANDLERS = [
  GetDeliveryRateHandler,
  GetChannelStatsHandler,
  GetEngagementHandler,
  GetTemplatePerformanceHandler,
] as const;

export {
  GetDeliveryRateHandler,
  GetChannelStatsHandler,
  GetEngagementHandler,
  GetTemplatePerformanceHandler,
};
