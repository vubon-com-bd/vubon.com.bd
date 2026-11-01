import { GetWarehouseHandler } from './get-warehouse.handler.js';
import { GetWarehouseByCodeHandler } from './get-warehouse-by-code.handler.js';
import { ListWarehousesHandler } from './list-warehouses.handler.js';
import { ListOperationalWarehousesHandler } from './list-operational-warehouses.handler.js';
import { ListWarehousesByZoneHandler } from './list-warehouses-by-zone.handler.js';
import { GetDefaultWarehouseHandler } from './get-default-warehouse.handler.js';
import { GetWarehouseStatsHandler } from './get-warehouse-stats.handler.js';

export const WAREHOUSE_QUERY_HANDLERS = [
  GetWarehouseHandler,
  GetWarehouseByCodeHandler,
  ListWarehousesHandler,
  ListOperationalWarehousesHandler,
  ListWarehousesByZoneHandler,
  GetDefaultWarehouseHandler,
  GetWarehouseStatsHandler,
] as const;
