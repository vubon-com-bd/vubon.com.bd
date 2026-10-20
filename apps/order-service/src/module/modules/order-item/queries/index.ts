/**
 * OrderItem Query Handlers Barrel
 * @module order-service/modules/order-item/queries
 */
import { GetOrderItemHandler } from '../../../application/queries/order-item/get-order-item.handler.js';
import { ListOrderItemsHandler } from '../../../application/queries/order-item/list-order-items.handler.js';

export const ORDER_ITEM_QUERY_HANDLERS = [
  GetOrderItemHandler,
  ListOrderItemsHandler,
] as const;

export { GetOrderItemHandler, ListOrderItemsHandler };
