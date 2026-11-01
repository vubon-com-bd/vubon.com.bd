import { GetReturnShipmentHandler } from './get-return-shipment.handler.js';
import { GetReturnShipmentByRmaHandler } from './get-return-shipment-by-rma.handler.js';
import { ListReturnShipmentsHandler } from './list-return-shipments.handler.js';
import { ListReturnShipmentsByOrderHandler } from './list-return-shipments-by-order.handler.js';
import { ListReturnShipmentsByUserHandler } from './list-return-shipments-by-user.handler.js';
import { ListPendingReturnsHandler } from './list-pending-returns.handler.js';
import { GetReturnShipmentStatsHandler } from './get-return-shipment-stats.handler.js';

export const RETURN_SHIPMENT_QUERY_HANDLERS = [
  GetReturnShipmentHandler,
  GetReturnShipmentByRmaHandler,
  ListReturnShipmentsHandler,
  ListReturnShipmentsByOrderHandler,
  ListReturnShipmentsByUserHandler,
  ListPendingReturnsHandler,
  GetReturnShipmentStatsHandler,
] as const;
