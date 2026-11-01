/**
 * OrderCancel Query Handlers Barrel
 * @module order-service/modules/order-cancel/queries
 */
import { GetCancelHandler } from '../../../application/queries/cancel/get-cancel.handler.js';
import { ListCancelsHandler } from '../../../application/queries/cancel/list-cancels.handler.js';

export const ORDER_CANCEL_QUERY_HANDLERS = [
  GetCancelHandler,
  ListCancelsHandler,
] as const;

export { GetCancelHandler, ListCancelsHandler };
