// application/queries/inventory/index.ts
export * from './list-inventory-by-product.query.js';
export * from './list-inventory-by-product.handler.js';
export * from './list-low-stock.query.js';
export * from './list-low-stock.handler.js';

import { ListInventoryByProductHandler } from './list-inventory-by-product.handler.js';
import { ListLowStockHandler } from './list-low-stock.handler.js';

export const INVENTORY_QUERY_HANDLERS = [
  ListInventoryByProductHandler,
  ListLowStockHandler,
] as const;
