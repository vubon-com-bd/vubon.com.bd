export * from './create-guest-cart.command.js';
export * from './create-guest-cart.handler.js';
export * from './merge-guest-cart.command.js';
export * from './merge-guest-cart.handler.js';

import { CreateGuestCartHandler } from './create-guest-cart.handler.js';
import { MergeGuestCartHandler } from './merge-guest-cart.handler.js';

export const GUEST_COMMAND_HANDLERS = [
  CreateGuestCartHandler,
  MergeGuestCartHandler,
] as const;
