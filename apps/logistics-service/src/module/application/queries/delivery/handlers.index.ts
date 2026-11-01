import { GetDeliveryHandler } from './get-delivery.handler.js';
import { GetDeliveryPublicHandler } from './get-delivery-public.handler.js';
import { GetDeliveryByShipmentHandler } from './get-delivery-by-shipment.handler.js';
import { ListDeliveriesHandler } from './list-deliveries.handler.js';
import { ListDeliveriesByOrderHandler } from './list-deliveries-by-order.handler.js';
import { ListDeliveriesByDriverHandler } from './list-deliveries-by-driver.handler.js';
import { ListInTransitDeliveriesHandler } from './list-in-transit-deliveries.handler.js';
import { ListScheduledDeliveriesHandler } from './list-scheduled-deliveries.handler.js';
import { GetDeliveryStatsHandler } from './get-delivery-stats.handler.js';

export const DELIVERY_QUERY_HANDLERS = [
  GetDeliveryHandler,
  GetDeliveryPublicHandler,
  GetDeliveryByShipmentHandler,
  ListDeliveriesHandler,
  ListDeliveriesByOrderHandler,
  ListDeliveriesByDriverHandler,
  ListInTransitDeliveriesHandler,
  ListScheduledDeliveriesHandler,
  GetDeliveryStatsHandler,
] as const;
