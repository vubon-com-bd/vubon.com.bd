/**
 * Cart Command Handlers Barrel
 * @module cart-service/modules/cart/commands
 */
import { CreateCartHandler } from '../../../application/commands/cart/create-cart.handler.js';
import { UpdateCartHandler } from '../../../application/commands/cart/update-cart.handler.js';
import { ClearCartHandler } from '../../../application/commands/cart/clear-cart.handler.js';
import { DeleteCartHandler } from '../../../application/commands/cart/delete-cart.handler.js';
import { RecoverCartHandler } from '../../../application/commands/cart/recover-cart.handler.js';

export const CART_COMMAND_HANDLERS = [
  CreateCartHandler,
  UpdateCartHandler,
  ClearCartHandler,
  DeleteCartHandler,
  RecoverCartHandler,
] as const;

export {
  CreateCartHandler,
  UpdateCartHandler,
  ClearCartHandler,
  DeleteCartHandler,
  RecoverCartHandler,
};
