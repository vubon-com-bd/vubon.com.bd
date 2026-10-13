/**
 * ProductCollection Command Handlers Barrel
 * @module product-service/modules/product-collection/commands
 */
import { CreateCollectionHandler } from '../../../application/commands/collection/create-collection.handler.js';
import { UpdateCollectionHandler } from '../../../application/commands/collection/update-collection.handler.js';
import { DeleteCollectionHandler } from '../../../application/commands/collection/delete-collection.handler.js';
import { AddProductToCollectionHandler } from '../../../application/commands/collection/add-product-to-collection.handler.js';

export const COLLECTION_COMMAND_HANDLERS = [
  CreateCollectionHandler,
  UpdateCollectionHandler,
  DeleteCollectionHandler,
  AddProductToCollectionHandler,
] as const;

export {
  CreateCollectionHandler,
  UpdateCollectionHandler,
  DeleteCollectionHandler,
  AddProductToCollectionHandler,
};
