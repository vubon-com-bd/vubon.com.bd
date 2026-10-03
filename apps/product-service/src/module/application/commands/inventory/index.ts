// application/commands/inventory/index.ts
export * from './update-inventory.command.js';
export * from './update-inventory.handler.js';
export * from './adjust-inventory.command.js';
export * from './adjust-inventory.handler.js';
export * from './reserve-inventory.command.js';
export * from './reserve-inventory.handler.js';
export * from './release-inventory.command.js';
export * from './release-inventory.handler.js';

import { UpdateInventoryHandler } from './update-inventory.handler.js';
import { AdjustInventoryHandler } from './adjust-inventory.handler.js';
import { ReserveInventoryHandler } from './reserve-inventory.handler.js';
import { ReleaseInventoryHandler } from './release-inventory.handler.js';

export const INVENTORY_COMMAND_HANDLERS = [
  UpdateInventoryHandler,
  AdjustInventoryHandler,
  ReserveInventoryHandler,
  ReleaseInventoryHandler,
] as const;
