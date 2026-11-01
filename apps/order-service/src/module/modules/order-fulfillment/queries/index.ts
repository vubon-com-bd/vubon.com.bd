/**
 * OrderFulfillment Query Handlers Barrel
 * @module order-service/modules/order-fulfillment/queries
 */
import { GetFulfillmentHandler } from '../../../application/queries/fulfillment/get-fulfillment.handler.js';
import { ListFulfillmentsHandler } from '../../../application/queries/fulfillment/list-fulfillments.handler.js';

export const ORDER_FULFILLMENT_QUERY_HANDLERS = [
  GetFulfillmentHandler,
  ListFulfillmentsHandler,
] as const;

export { GetFulfillmentHandler, ListFulfillmentsHandler };
