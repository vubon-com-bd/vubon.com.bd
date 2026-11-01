import { UpdateShippingHandler } from '../../../application/commands/shipping/update-shipping.handler.js';
import { SetShippingMethodsHandler } from '../../../application/commands/shipping/set-shipping-methods.handler.js';

export const VENDOR_SHIPPING_COMMAND_HANDLERS = [
  UpdateShippingHandler,
  SetShippingMethodsHandler,
] as const;

export { UpdateShippingHandler, SetShippingMethodsHandler };
