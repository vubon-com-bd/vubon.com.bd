import { CreateShippingMethodHandler } from './create-shipping-method.handler.js';
import { UpdateShippingMethodHandler } from './update.handler.js';
import { ActivateShippingMethodHandler } from './activate.handler.js';
import { DeactivateShippingMethodHandler } from './deactivate.handler.js';
import { SuspendShippingMethodHandler } from './suspend.handler.js';

export const SHIPPING_METHOD_COMMAND_HANDLERS = [
  CreateShippingMethodHandler,
  UpdateShippingMethodHandler,
  ActivateShippingMethodHandler,
  DeactivateShippingMethodHandler,
  SuspendShippingMethodHandler,
] as const;
