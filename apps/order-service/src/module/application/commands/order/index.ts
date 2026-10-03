import { CreateOrderHandler } from './create-order.handler.js';
import { UpdateOrderHandler } from './update-order.handler.js';
import { DeleteOrderHandler } from './delete-order.handler.js';
import { ConfirmOrderHandler } from './confirm-order.handler.js';
import { HoldOrderHandler } from './hold-order.handler.js';
import { ReleaseOrderHandler } from './release-order.handler.js';

export * from './create-order.command.js';
export * from './create-order.handler.js';
export * from './update-order.command.js';
export * from './update-order.handler.js';
export * from './delete-order.command.js';
export * from './delete-order.handler.js';
export * from './confirm-order.command.js';
export * from './confirm-order.handler.js';
export * from './hold-order.command.js';
export * from './hold-order.handler.js';
export * from './release-order.command.js';
export * from './release-order.handler.js';

export const ORDER_COMMAND_HANDLERS = [
  CreateOrderHandler,
  UpdateOrderHandler,
  DeleteOrderHandler,
  ConfirmOrderHandler,
  HoldOrderHandler,
  ReleaseOrderHandler,
] as const;
