import { AddOrderItemHandler } from './add-order-item.handler.js';
import { UpdateOrderItemHandler } from './update-order-item.handler.js';
import { RemoveOrderItemHandler } from './remove-order-item.handler.js';

export * from './add-order-item.command.js';
export * from './add-order-item.handler.js';
export * from './update-order-item.command.js';
export * from './update-order-item.handler.js';
export * from './remove-order-item.command.js';
export * from './remove-order-item.handler.js';

export const ORDER_ITEM_COMMAND_HANDLERS = [
  AddOrderItemHandler,
  UpdateOrderItemHandler,
  RemoveOrderItemHandler,
] as const;
