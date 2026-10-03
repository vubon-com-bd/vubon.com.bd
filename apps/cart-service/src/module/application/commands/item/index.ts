export * from './add-item.command.js';
export * from './add-item.handler.js';
export * from './update-item.command.js';
export * from './update-item.handler.js';
export * from './remove-item.command.js';
export * from './remove-item.handler.js';
export * from './update-quantity.command.js';
export * from './update-quantity.handler.js';
export * from './select-item.command.js';
export * from './select-item.handler.js';
export * from './move-to-saved.command.js';
export * from './move-to-saved.handler.js';

import { AddItemHandler } from './add-item.handler.js';
import { UpdateItemHandler } from './update-item.handler.js';
import { RemoveItemHandler } from './remove-item.handler.js';
import { UpdateQuantityHandler } from './update-quantity.handler.js';
import { SelectItemHandler } from './select-item.handler.js';
import { MoveToSavedHandler } from './move-to-saved.handler.js';

export const ITEM_COMMAND_HANDLERS = [
  AddItemHandler,
  UpdateItemHandler,
  RemoveItemHandler,
  UpdateQuantityHandler,
  SelectItemHandler,
  MoveToSavedHandler,
] as const;
