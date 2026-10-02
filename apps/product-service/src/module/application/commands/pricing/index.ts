// application/commands/pricing/index.ts
export * from './update-price.command.js';
export * from './update-price.handler.js';
export * from './apply-discount.command.js';
export * from './apply-discount.handler.js';
export * from './remove-discount.command.js';
export * from './remove-discount.handler.js';

import { UpdatePriceHandler } from './update-price.handler.js';
import { ApplyDiscountHandler } from './apply-discount.handler.js';
import { RemoveDiscountHandler } from './remove-discount.handler.js';

export const PRICING_COMMAND_HANDLERS = [
  UpdatePriceHandler,
  ApplyDiscountHandler,
  RemoveDiscountHandler,
] as const;
