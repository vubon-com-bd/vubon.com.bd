// application/commands/variant/index.ts
export * from './add-variant.command.js';
export * from './add-variant.handler.js';
export * from './update-variant.command.js';
export * from './update-variant.handler.js';
export * from './remove-variant.command.js';
export * from './remove-variant.handler.js';
export * from './regenerate-variant-matrix.command.js';
export * from './regenerate-variant-matrix.handler.js';

import { AddVariantHandler } from './add-variant.handler.js';
import { UpdateVariantHandler } from './update-variant.handler.js';
import { RemoveVariantHandler } from './remove-variant.handler.js';
import { RegenerateVariantMatrixHandler } from './regenerate-variant-matrix.handler.js';

export const VARIANT_COMMAND_HANDLERS = [
  AddVariantHandler,
  UpdateVariantHandler,
  RemoveVariantHandler,
  RegenerateVariantMatrixHandler,
] as const;
