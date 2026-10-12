// commands/packaging/index.ts
export * from './create-packaging.command.js'; export * from './create-packaging.handler.js';
export * from './update-packaging.command.js'; export * from './update-packaging.handler.js';
export * from './restock-packaging.command.js'; export * from './restock-packaging.handler.js';
export * from './consume-packaging.command.js'; export * from './consume-packaging.handler.js';
export * from './adjust-packaging-stock.command.js'; export * from './adjust-packaging-stock.handler.js';
export * from './select-packaging.command.js'; export * from './select-packaging.handler.js';

import { CreatePackagingHandler } from './create-packaging.handler.js';
import { UpdatePackagingHandler } from './update-packaging.handler.js';
import { RestockPackagingHandler } from './restock-packaging.handler.js';
import { ConsumePackagingHandler } from './consume-packaging.handler.js';
import { AdjustPackagingStockHandler } from './adjust-packaging-stock.handler.js';
import { SelectPackagingHandler } from './select-packaging.handler.js';

export const PACKAGING_COMMAND_HANDLERS = [
  CreatePackagingHandler, UpdatePackagingHandler, RestockPackagingHandler,
  ConsumePackagingHandler, AdjustPackagingStockHandler, SelectPackagingHandler,
] as const;
