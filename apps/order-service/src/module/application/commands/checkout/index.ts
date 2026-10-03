import { StartCheckoutHandler } from './start-checkout.handler.js';
import { SelectAddressHandler } from './select-address.handler.js';
import { SelectShippingHandler } from './select-shipping.handler.js';
import { SelectPaymentHandler } from './select-payment.handler.js';
import { ConfirmCheckoutHandler } from './confirm-checkout.handler.js';
import { AbandonCheckoutHandler } from './abandon-checkout.handler.js';

export * from './start-checkout.command.js';
export * from './start-checkout.handler.js';
export * from './select-address.command.js';
export * from './select-address.handler.js';
export * from './select-shipping.command.js';
export * from './select-shipping.handler.js';
export * from './select-payment.command.js';
export * from './select-payment.handler.js';
export * from './confirm-checkout.command.js';
export * from './confirm-checkout.handler.js';
export * from './abandon-checkout.command.js';
export * from './abandon-checkout.handler.js';

export const CHECKOUT_COMMAND_HANDLERS = [
  StartCheckoutHandler,
  SelectAddressHandler,
  SelectShippingHandler,
  SelectPaymentHandler,
  ConfirmCheckoutHandler,
  AbandonCheckoutHandler,
] as const;
