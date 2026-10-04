// application/commands/attribute/index.ts
export * from './add-attribute.command.js';
export * from './add-attribute.handler.js';
export * from './update-attribute.command.js';
export * from './update-attribute.handler.js';
export * from './remove-attribute.command.js';
export * from './remove-attribute.handler.js';

import { AddAttributeHandler } from './add-attribute.handler.js';
import { UpdateAttributeHandler } from './update-attribute.handler.js';
import { RemoveAttributeHandler } from './remove-attribute.handler.js';

export const ATTRIBUTE_COMMAND_HANDLERS = [
  AddAttributeHandler,
  UpdateAttributeHandler,
  RemoveAttributeHandler,
] as const;
