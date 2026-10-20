/**
 * Checkout Command Handlers Barrel
 * @module order-service/modules/checkout/commands
 */
import { StartCheckoutHandler } from '../../../application/commands/checkout/start-checkout.handler.js';
import { SelectAddressHandler } from '../../../application/commands/checkout/select-address.handler.js';
import { SelectShippingHandler } from '../../../application/commands/checkout/select-shipping.handler.js';
import { SelectPaymentHandler } from '../../../application/commands/checkout/select-payment.handler.js';
import { ConfirmCheckoutHandler } from '../../../application/commands/checkout/confirm-checkout.handler.js';
import { AbandonCheckoutHandler } from '../../../application/commands/checkout/abandon-checkout.handler.js';

export const CHECKOUT_COMMAND_HANDLERS = [
  StartCheckoutHandler,
  SelectAddressHandler,
  SelectShippingHandler,
  SelectPaymentHandler,
  ConfirmCheckoutHandler,
  AbandonCheckoutHandler,
] as const;

export {
  StartCheckoutHandler,
  SelectAddressHandler,
  SelectShippingHandler,
  SelectPaymentHandler,
  ConfirmCheckoutHandler,
  AbandonCheckoutHandler,
};
