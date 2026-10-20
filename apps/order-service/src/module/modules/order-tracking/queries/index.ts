/**
 * OrderTracking Query Handlers Barrel
 * @module order-service/modules/order-tracking/queries
 */
import { GetTrackingHandler } from '../../../application/queries/tracking/get-tracking.handler.js';
import { ListTrackingEventsHandler } from '../../../application/queries/tracking/list-tracking-events.handler.js';

export const ORDER_TRACKING_QUERY_HANDLERS = [
  GetTrackingHandler,
  ListTrackingEventsHandler,
] as const;

export { GetTrackingHandler, ListTrackingEventsHandler };
