export * from './set-shipping-method.command.js';
export * from './set-shipping-method.handler.js';
export * from './calculate-shipping.command.js';
export * from './calculate-shipping.handler.js';

import { SetShippingMethodHandler } from './set-shipping-method.handler.js';
import { CalculateShippingHandler } from './calculate-shipping.handler.js';

export const SHIPPING_COMMAND_HANDLERS = [
  SetShippingMethodHandler,
  CalculateShippingHandler,
] as const;
