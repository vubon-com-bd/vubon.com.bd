import { CreateInventoryLocationHandler } from './create-inventory-location.handler.js';
import { UpdateInventoryLocationHandler } from './update.handler.js';
import { ActivateInventoryLocationHandler } from './activate.handler.js';
import { DeactivateInventoryLocationHandler } from './deactivate.handler.js';
import { QuarantineInventoryLocationHandler } from './quarantine.handler.js';
import { UnquarantineInventoryLocationHandler } from './unquarantine.handler.js';
import { ArchiveInventoryLocationHandler } from './archive.handler.js';
import { AddStockInventoryLocationHandler } from './add-stock.handler.js';
import { RemoveStockInventoryLocationHandler } from './remove-stock.handler.js';

export const INVENTORY_LOCATION_COMMAND_HANDLERS = [
  CreateInventoryLocationHandler,
  UpdateInventoryLocationHandler,
  ActivateInventoryLocationHandler,
  DeactivateInventoryLocationHandler,
  QuarantineInventoryLocationHandler,
  UnquarantineInventoryLocationHandler,
  ArchiveInventoryLocationHandler,
  AddStockInventoryLocationHandler,
  RemoveStockInventoryLocationHandler,
] as const;
