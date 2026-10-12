// application/queries/shipment/index.ts
export * from './get-shipment-by-id.query.js';
export * from './get-shipment-by-id.handler.js';
export * from './get-shipment-by-tracking.query.js';
export * from './get-shipment-by-tracking.handler.js';
export * from './list-shipments.query.js';
export * from './list-shipments.handler.js';
export * from './list-shipments-by-order.query.js';
export * from './list-shipments-by-order.handler.js';
export * from './get-shipment-stats.query.js';
export * from './get-shipment-stats.handler.js';
export * from './get-public-shipment.query.js';
export * from './get-public-shipment.handler.js';

import { GetShipmentByIdHandler } from './get-shipment-by-id.handler.js';
import { GetShipmentByTrackingHandler } from './get-shipment-by-tracking.handler.js';
import { ListShipmentsHandler } from './list-shipments.handler.js';
import { ListShipmentsByOrderHandler } from './list-shipments-by-order.handler.js';
import { GetShipmentStatsHandler } from './get-shipment-stats.handler.js';
import { GetPublicShipmentHandler } from './get-public-shipment.handler.js';

export const SHIPMENT_QUERY_HANDLERS = [
  GetShipmentByIdHandler,
  GetShipmentByTrackingHandler,
  ListShipmentsHandler,
  ListShipmentsByOrderHandler,
  GetShipmentStatsHandler,
  GetPublicShipmentHandler,
] as const;
