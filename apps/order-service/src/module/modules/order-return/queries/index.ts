/**
 * OrderReturn Query Handlers Barrel
 * @module order-service/modules/order-return/queries
 */
import { GetReturnHandler } from '../../../application/queries/return/get-return.handler.js';
import { ListReturnsHandler } from '../../../application/queries/return/list-returns.handler.js';

export const ORDER_RETURN_QUERY_HANDLERS = [
  GetReturnHandler,
  ListReturnsHandler,
] as const;

export { GetReturnHandler, ListReturnsHandler };
