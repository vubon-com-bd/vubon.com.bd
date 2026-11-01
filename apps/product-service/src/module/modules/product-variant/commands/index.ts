/**
 * ProductVariant Command Handlers Barrel
 * @module product-service/modules/product-variant/commands
 */
import { AddVariantHandler } from '../../../application/commands/variant/add-variant.handler.js';
import { UpdateVariantHandler } from '../../../application/commands/variant/update-variant.handler.js';
import { RemoveVariantHandler } from '../../../application/commands/variant/remove-variant.handler.js';
import { SetDefaultVariantHandler } from '../../../application/commands/variant/set-default-variant.handler.js';

export const VARIANT_COMMAND_HANDLERS = [
  AddVariantHandler,
  UpdateVariantHandler,
  RemoveVariantHandler,
  SetDefaultVariantHandler,
] as const;

export {
  AddVariantHandler,
  UpdateVariantHandler,
  RemoveVariantHandler,
  SetDefaultVariantHandler,
};
