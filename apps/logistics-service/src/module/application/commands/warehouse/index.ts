// commands/warehouse/index.ts
export * from './create-warehouse.command.js'; export * from './create-warehouse.handler.js';
export * from './update-warehouse.command.js'; export * from './update-warehouse.handler.js';
export * from './activate-warehouse.command.js'; export * from './activate-warehouse.handler.js';
export * from './deactivate-warehouse.command.js'; export * from './deactivate-warehouse.handler.js';

import { CreateWarehouseHandler } from './create-warehouse.handler.js';
import { UpdateWarehouseHandler } from './update-warehouse.handler.js';
import { ActivateWarehouseHandler } from './activate-warehouse.handler.js';
import { DeactivateWarehouseHandler } from './deactivate-warehouse.handler.js';

export const WAREHOUSE_COMMAND_HANDLERS = [
  CreateWarehouseHandler, UpdateWarehouseHandler, ActivateWarehouseHandler, DeactivateWarehouseHandler,
] as const;
