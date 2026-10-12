// queries/delivery/index.ts
export * from './get-delivery.query.js'; export * from './get-delivery.handler.js';
export * from './get-delivery-by-shipment.query.js'; export * from './get-delivery-by-shipment.handler.js';
export * from './list-deliveries.query.js'; export * from './list-deliveries.handler.js';

import { GetDeliveryHandler } from './get-delivery.handler.js';
import { GetDeliveryByShipmentHandler } from './get-delivery-by-shipment.handler.js';
import { ListDeliveriesHandler } from './list-deliveries.handler.js';

export const DELIVERY_QUERY_HANDLERS = [GetDeliveryHandler, GetDeliveryByShipmentHandler, ListDeliveriesHandler] as const;
