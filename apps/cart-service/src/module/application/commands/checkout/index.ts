export * from './proceed-to-checkout.command.js';
export * from './proceed-to-checkout.handler.js';

import { ProceedToCheckoutHandler } from './proceed-to-checkout.handler.js';

export const CHECKOUT_COMMAND_HANDLERS = [
  ProceedToCheckoutHandler,
] as const;
