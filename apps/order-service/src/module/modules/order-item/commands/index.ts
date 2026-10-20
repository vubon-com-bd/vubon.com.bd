/**
 * OrderItem Command Handlers Barrel
 * @module order-service/modules/order-item/commands
 */
import { AddOrderItemHandler } from '../../../application/commands/order-item/add-order-item.handler.js';
import { UpdateOrderItemHandler } from '../../../application/commands/order-item/update-order-item.handler.js';
import { RemoveOrderItemHandler } from '../../../application/commands/order-item/remove-order-item.handler.js';

export const ORDER_ITEM_COMMAND_HANDLERS = [
  AddOrderItemHandler,
  UpdateOrderItemHandler,
  RemoveOrderItemHandler,
] as const;

export { AddOrderItemHandler, UpdateOrderItemHandler, RemoveOrderItemHandler };
