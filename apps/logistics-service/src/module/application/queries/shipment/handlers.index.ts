// queries/shipment/handlers.index.ts — Handler barrel
import { GetShipmentHandler } from './get-shipment.handler.js';
import { GetShipmentPublicHandler } from './get-shipment-public.handler.js';
import { GetShipmentByNumberHandler } from './get-shipment-by-number.handler.js';
import { GetShipmentByTrackingHandler } from './get-shipment-by-tracking.handler.js';
import { ListShipmentsHandler } from './list-shipments.handler.js';
import { ListShipmentsByOrderHandler } from './list-shipments-by-order.handler.js';
import { ListShipmentsByUserHandler } from './list-shipments-by-user.handler.js';
import { ListShipmentsByVendorHandler } from './list-shipments-by-vendor.handler.js';
import { SearchShipmentsHandler } from './search-shipments.handler.js';
import { GetShipmentStatsHandler } from './get-shipment-stats.handler.js';
import { GetShipmentTimelineHandler } from './get-shipment-timeline.handler.js';
import { GetShipmentSummaryHandler } from './get-shipment-summary.handler.js';

export const SHIPMENT_QUERY_HANDLERS = [
  GetShipmentHandler,
  GetShipmentPublicHandler,
  GetShipmentByNumberHandler,
  GetShipmentByTrackingHandler,
  ListShipmentsHandler,
  ListShipmentsByOrderHandler,
  ListShipmentsByUserHandler,
  ListShipmentsByVendorHandler,
  SearchShipmentsHandler,
  GetShipmentStatsHandler,
  GetShipmentTimelineHandler,
  GetShipmentSummaryHandler,
] as const;
