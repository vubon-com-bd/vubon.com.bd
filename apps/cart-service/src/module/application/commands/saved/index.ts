export * from './save-for-later.command.js';
export * from './save-for-later.handler.js';
export * from './move-to-cart.command.js';
export * from './move-to-cart.handler.js';
export * from './remove-saved.command.js';
export * from './remove-saved.handler.js';

import { SaveForLaterHandler } from './save-for-later.handler.js';
import { MoveToCartHandler } from './move-to-cart.handler.js';
import { RemoveSavedHandler } from './remove-saved.handler.js';

export const SAVED_COMMAND_HANDLERS = [
  SaveForLaterHandler,
  MoveToCartHandler,
  RemoveSavedHandler,
] as const;
