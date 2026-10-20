/**
 * Order Command Handlers Barrel
 * @module order-service/modules/order/commands
 */
import { CreateOrderHandler } from '../../../application/commands/order/create-order.handler.js';
import { UpdateOrderHandler } from '../../../application/commands/order/update-order.handler.js';
import { DeleteOrderHandler } from '../../../application/commands/order/delete-order.handler.js';
import { ConfirmOrderHandler } from '../../../application/commands/order/confirm-order.handler.js';
import { HoldOrderHandler } from '../../../application/commands/order/hold-order.handler.js';
import { ReleaseOrderHandler } from '../../../application/commands/order/release-order.handler.js';

export const ORDER_COMMAND_HANDLERS = [
  CreateOrderHandler,
  UpdateOrderHandler,
  DeleteOrderHandler,
  ConfirmOrderHandler,
  HoldOrderHandler,
  ReleaseOrderHandler,
] as const;

export {
  CreateOrderHandler,
  UpdateOrderHandler,
  DeleteOrderHandler,
  ConfirmOrderHandler,
  HoldOrderHandler,
  ReleaseOrderHandler,
};
