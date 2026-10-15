/**
 * Cart Query Handlers Barrel
 * @module cart-service/modules/cart/queries
 */
import { GetCartHandler } from '../../../application/queries/cart/get-cart.handler.js';
import { GetCartByUserHandler } from '../../../application/queries/cart/get-cart-by-user.handler.js';
import { GetCartSummaryHandler } from '../../../application/queries/cart/get-cart-summary.handler.js';
import { GetCartCountHandler } from '../../../application/queries/cart/get-cart-count.handler.js';

export const CART_QUERY_HANDLERS = [
  GetCartHandler,
  GetCartByUserHandler,
  GetCartSummaryHandler,
  GetCartCountHandler,
] as const;

export {
  GetCartHandler,
  GetCartByUserHandler,
  GetCartSummaryHandler,
  GetCartCountHandler,
};
