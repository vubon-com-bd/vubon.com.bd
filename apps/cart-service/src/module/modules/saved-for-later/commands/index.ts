import { SaveForLaterHandler } from '../../../application/commands/saved/save-for-later.handler.js';
import { MoveToCartHandler } from '../../../application/commands/saved/move-to-cart.handler.js';
import { RemoveSavedHandler } from '../../../application/commands/saved/remove-saved.handler.js';

export const SAVED_FOR_LATER_COMMAND_HANDLERS = [
  SaveForLaterHandler,
  MoveToCartHandler,
  RemoveSavedHandler,
] as const;

export { SaveForLaterHandler, MoveToCartHandler, RemoveSavedHandler };
