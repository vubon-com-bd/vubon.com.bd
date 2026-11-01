/**
 * ProductInventory Query Handlers Barrel
 * @module product-service/modules/product-inventory/queries
 */
import { GetInventoryHandler } from '../../../application/queries/inventory/get-inventory.handler.js';
import { CheckStockHandler } from '../../../application/queries/inventory/check-stock.handler.js';

export const INVENTORY_QUERY_HANDLERS = [
  GetInventoryHandler,
  CheckStockHandler,
] as const;

export { GetInventoryHandler, CheckStockHandler };
