import { GetDeliveryHandler } from './get-delivery.handler.js';
import { ListDeliveriesHandler } from './list-deliveries.handler.js';
import { GetDeliveryMethodsHandler } from './get-delivery-methods.handler.js';

export * from './get-delivery.query.js';
export * from './get-delivery.handler.js';
export * from './list-deliveries.query.js';
export * from './list-deliveries.handler.js';
export * from './get-delivery-methods.query.js';
export * from './get-delivery-methods.handler.js';

export const DELIVERY_QUERY_HANDLERS = [
  GetDeliveryHandler,
  ListDeliveriesHandler,
  GetDeliveryMethodsHandler,
] as const;
