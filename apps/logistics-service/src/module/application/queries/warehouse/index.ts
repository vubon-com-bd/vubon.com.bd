// queries/warehouse/index.ts
export * from './get-warehouse.query.js'; export * from './get-warehouse.handler.js';
export * from './list-warehouses.query.js'; export * from './list-warehouses.handler.js';

import { GetWarehouseHandler } from './get-warehouse.handler.js';
import { ListWarehousesHandler } from './list-warehouses.handler.js';

export const WAREHOUSE_QUERY_HANDLERS = [GetWarehouseHandler, ListWarehousesHandler] as const;
