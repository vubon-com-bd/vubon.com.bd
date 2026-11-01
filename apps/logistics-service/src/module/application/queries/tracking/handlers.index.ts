import { GetTrackingHandler } from './get-tracking.handler.js';
import { GetTrackingByNumberHandler } from './get-tracking-by-number.handler.js';
import { GetTrackingByShipmentHandler } from './get-tracking-by-shipment.handler.js';
import { ListTrackingsHandler } from './list-trackings.handler.js';
import { ListTrackingsByOrderHandler } from './list-trackings-by-order.handler.js';
import { GetTrackingStatsHandler } from './get-tracking-stats.handler.js';

export const TRACKING_QUERY_HANDLERS = [
  GetTrackingHandler,
  GetTrackingByNumberHandler,
  GetTrackingByShipmentHandler,
  ListTrackingsHandler,
  ListTrackingsByOrderHandler,
  GetTrackingStatsHandler,
] as const;
