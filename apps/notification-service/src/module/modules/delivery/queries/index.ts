/**
 * Delivery Query Handlers Barrel
 * @module notification-service/modules/delivery/queries
 */
import { GetDeliveryHandler } from '@application/queries/delivery/get-delivery.handler.js';
import { ListDeliveriesHandler } from '@application/queries/delivery/list-deliveries.handler.js';
import { GetDeliveryAttemptsHandler } from '@application/queries/delivery/get-delivery-attempts.handler.js';

export const DELIVERY_QUERY_HANDLERS = [
  GetDeliveryHandler,
  ListDeliveriesHandler,
  GetDeliveryAttemptsHandler,
] as const;

export {
  GetDeliveryHandler,
  ListDeliveriesHandler,
  GetDeliveryAttemptsHandler,
};
