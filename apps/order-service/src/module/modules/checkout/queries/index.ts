/**
 * Checkout Query Handlers Barrel
 * @module order-service/modules/checkout/queries
 */
import { GetCheckoutHandler } from '../../../application/queries/checkout/get-checkout.handler.js';
import { GetCheckoutSessionHandler } from '../../../application/queries/checkout/get-checkout-session.handler.js';

export const CHECKOUT_QUERY_HANDLERS = [
  GetCheckoutHandler,
  GetCheckoutSessionHandler,
] as const;

export { GetCheckoutHandler, GetCheckoutSessionHandler };
