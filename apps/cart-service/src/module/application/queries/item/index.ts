export * from './list-items.query.js';
export * from './list-items.handler.js';
export * from './get-item.query.js';
export * from './get-item.handler.js';

import { ListItemsHandler } from './list-items.handler.js';
import { GetItemHandler } from './get-item.handler.js';

export const ITEM_QUERY_HANDLERS = [
  ListItemsHandler,
  GetItemHandler,
] as const;
