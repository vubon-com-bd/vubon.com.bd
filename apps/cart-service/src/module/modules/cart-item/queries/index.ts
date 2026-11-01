/**
 * CartItem Query Handlers Barrel
 */
import { ListItemsHandler } from '../../../application/queries/item/list-items.handler.js';
import { GetItemHandler } from '../../../application/queries/item/get-item.handler.js';

export const CART_ITEM_QUERY_HANDLERS = [
  ListItemsHandler,
  GetItemHandler,
] as const;

export { ListItemsHandler, GetItemHandler };
