// commands/shipping-method/index.ts
export * from './create-shipping-method.command.js'; export * from './create-shipping-method.handler.js';
export * from './update-shipping-method.command.js'; export * from './update-shipping-method.handler.js';
export * from './activate-shipping-method.command.js'; export * from './activate-shipping-method.handler.js';
export * from './deactivate-shipping-method.command.js'; export * from './deactivate-shipping-method.handler.js';
export * from './suspend-shipping-method.command.js'; export * from './suspend-shipping-method.handler.js';
export * from './calculate-shipping.command.js'; export * from './calculate-shipping.handler.js';

import { CreateShippingMethodHandler } from './create-shipping-method.handler.js';
import { UpdateShippingMethodHandler } from './update-shipping-method.handler.js';
import { ActivateShippingMethodHandler } from './activate-shipping-method.handler.js';
import { DeactivateShippingMethodHandler } from './deactivate-shipping-method.handler.js';
import { SuspendShippingMethodHandler } from './suspend-shipping-method.handler.js';
import { CalculateShippingHandler } from './calculate-shipping.handler.js';

export const SHIPPING_METHOD_COMMAND_HANDLERS = [
  CreateShippingMethodHandler, UpdateShippingMethodHandler, ActivateShippingMethodHandler,
  DeactivateShippingMethodHandler, SuspendShippingMethodHandler, CalculateShippingHandler,
] as const;
