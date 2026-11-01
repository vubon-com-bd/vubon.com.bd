/**
 * ProductAttribute Command Handlers Barrel
 * @module product-service/modules/product-attribute/commands
 */
import { AddAttributeHandler } from '../../../application/commands/attribute/add-attribute.handler.js';
import { UpdateAttributeHandler } from '../../../application/commands/attribute/update-attribute.handler.js';
import { RemoveAttributeHandler } from '../../../application/commands/attribute/remove-attribute.handler.js';

export const ATTRIBUTE_COMMAND_HANDLERS = [
  AddAttributeHandler,
  UpdateAttributeHandler,
  RemoveAttributeHandler,
] as const;

export { AddAttributeHandler, UpdateAttributeHandler, RemoveAttributeHandler };
