import { CreateGuestCartHandler } from '../../../application/commands/guest/create-guest-cart.handler.js';
import { MergeGuestCartHandler } from '../../../application/commands/guest/merge-guest-cart.handler.js';

export const GUEST_CART_COMMAND_HANDLERS = [
  CreateGuestCartHandler,
  MergeGuestCartHandler,
] as const;

export { CreateGuestCartHandler, MergeGuestCartHandler };
