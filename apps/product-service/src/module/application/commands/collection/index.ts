// application/commands/collection/index.ts
export * from './create-collection.command.js';
export * from './create-collection.handler.js';
export * from './update-collection.command.js';
export * from './update-collection.handler.js';
export * from './delete-collection.command.js';
export * from './delete-collection.handler.js';
export * from './add-product-to-collection.command.js';
export * from './add-product-to-collection.handler.js';
export * from './remove-product-from-collection.command.js';
export * from './remove-product-from-collection.handler.js';

import { CreateCollectionHandler } from './create-collection.handler.js';
import { UpdateCollectionHandler } from './update-collection.handler.js';
import { DeleteCollectionHandler } from './delete-collection.handler.js';
import { AddProductToCollectionHandler } from './add-product-to-collection.handler.js';
import { RemoveProductFromCollectionHandler } from './remove-product-from-collection.handler.js';

export const COLLECTION_COMMAND_HANDLERS = [
  CreateCollectionHandler,
  UpdateCollectionHandler,
  DeleteCollectionHandler,
  AddProductToCollectionHandler,
  RemoveProductFromCollectionHandler,
] as const;
