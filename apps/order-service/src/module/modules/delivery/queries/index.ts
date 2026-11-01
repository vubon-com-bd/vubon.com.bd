/**
 * Delivery Query Handlers Barrel
 * @module order-service/modules/delivery/queries
 */
import { GetDeliveryHandler } from '../../../application/queries/delivery/get-delivery.handler.js';
import { ListDeliveriesHandler } from '../../../application/queries/delivery/list-deliveries.handler.js';
import { GetDeliveryMethodsHandler } from '../../../application/queries/delivery/get-delivery-methods.handler.js';

export const DELIVERY_QUERY_HANDLERS = [
  GetDeliveryHandler,
  ListDeliveriesHandler,
  GetDeliveryMethodsHandler,
] as const;

export {
  GetDeliveryHandler,
  ListDeliveriesHandler,
  GetDeliveryMethodsHandler,
};
