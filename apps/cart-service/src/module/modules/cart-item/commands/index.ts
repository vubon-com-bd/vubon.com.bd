/**
 * CartItem Command Handlers Barrel
 * @module cart-service/modules/cart-item/commands
 */
import { AddItemHandler } from '../../../application/commands/item/add-item.handler.js';
import { UpdateItemHandler } from '../../../application/commands/item/update-item.handler.js';
import { UpdateQuantityHandler } from '../../../application/commands/item/update-quantity.handler.js';
import { RemoveItemHandler } from '../../../application/commands/item/remove-item.handler.js';
import { SelectItemHandler } from '../../../application/commands/item/select-item.handler.js';
import { MoveToSavedHandler } from '../../../application/commands/item/move-to-saved.handler.js';

export const CART_ITEM_COMMAND_HANDLERS = [
  AddItemHandler,
  UpdateItemHandler,
  UpdateQuantityHandler,
  RemoveItemHandler,
  SelectItemHandler,
  MoveToSavedHandler,
] as const;

export {
  AddItemHandler,
  UpdateItemHandler,
  UpdateQuantityHandler,
  RemoveItemHandler,
  SelectItemHandler,
  MoveToSavedHandler,
};
