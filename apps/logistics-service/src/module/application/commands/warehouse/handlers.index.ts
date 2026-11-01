import { CreateWarehouseHandler } from './create-warehouse.handler.js';
import { UpdateWarehouseHandler } from './update-warehouse.handler.js';
import { ActivateWarehouseHandler } from './activate-warehouse.handler.js';
import { DeactivateWarehouseHandler } from './deactivate-warehouse.handler.js';
import { StartMaintenanceHandler } from './start-maintenance.handler.js';
import { EndMaintenanceHandler } from './end-maintenance.handler.js';
import { CloseWarehouseHandler } from './close-warehouse.handler.js';
import { ArchiveWarehouseHandler } from './archive-warehouse.handler.js';
import { UpdateCapacityHandler } from './update-capacity.handler.js';

export const WAREHOUSE_COMMAND_HANDLERS = [
  CreateWarehouseHandler,
  UpdateWarehouseHandler,
  ActivateWarehouseHandler,
  DeactivateWarehouseHandler,
  StartMaintenanceHandler,
  EndMaintenanceHandler,
  CloseWarehouseHandler,
  ArchiveWarehouseHandler,
  UpdateCapacityHandler,
] as const;
