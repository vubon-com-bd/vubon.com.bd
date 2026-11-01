import { CreatePackagingHandler } from './create-packaging.handler.js';
import { UpdatePackagingHandler } from './update.handler.js';
import { ActivatePackagingHandler } from './activate.handler.js';
import { DeactivatePackagingHandler } from './deactivate.handler.js';
import { DiscontinuePackagingHandler } from './discontinue.handler.js';
import { AddStockPackagingHandler } from './add-stock.handler.js';
import { ConsumeStockPackagingHandler } from './consume-stock.handler.js';
import { UpdateSizePackagingHandler } from './update-size.handler.js';

export const PACKAGING_COMMAND_HANDLERS = [
  CreatePackagingHandler,
  UpdatePackagingHandler,
  ActivatePackagingHandler,
  DeactivatePackagingHandler,
  DiscontinuePackagingHandler,
  AddStockPackagingHandler,
  ConsumeStockPackagingHandler,
  UpdateSizePackagingHandler,
] as const;
