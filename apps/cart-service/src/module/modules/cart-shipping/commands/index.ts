import { SetShippingMethodHandler } from '../../../application/commands/shipping/set-shipping-method.handler.js';
import { CalculateShippingHandler } from '../../../application/commands/shipping/calculate-shipping.handler.js';

export const CART_SHIPPING_COMMAND_HANDLERS = [
  SetShippingMethodHandler,
  CalculateShippingHandler,
] as const;

export { SetShippingMethodHandler, CalculateShippingHandler };
