/**
 * ProductInventory Command Handlers Barrel
 * @module product-service/modules/product-inventory/commands
 */
import { UpdateInventoryHandler } from '../../../application/commands/inventory/update-inventory.handler.js';
import { AdjustInventoryHandler } from '../../../application/commands/inventory/adjust-inventory.handler.js';
import { ReserveInventoryHandler } from '../../../application/commands/inventory/reserve-inventory.handler.js';
import { ReleaseInventoryHandler } from '../../../application/commands/inventory/release-inventory.handler.js';

export const INVENTORY_COMMAND_HANDLERS = [
  UpdateInventoryHandler,
  AdjustInventoryHandler,
  ReserveInventoryHandler,
  ReleaseInventoryHandler,
] as const;

export {
  UpdateInventoryHandler,
  AdjustInventoryHandler,
  ReserveInventoryHandler,
  ReleaseInventoryHandler,
};
