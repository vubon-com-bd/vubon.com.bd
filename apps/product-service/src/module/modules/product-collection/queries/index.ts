/**
 * ProductCollection Query Handlers Barrel
 * @module product-service/modules/product-collection/queries
 */
import { GetCollectionHandler } from '../../../application/queries/collection/get-collection.handler.js';
import { ListCollectionsHandler } from '../../../application/queries/collection/list-collections.handler.js';

export const COLLECTION_QUERY_HANDLERS = [
  GetCollectionHandler,
  ListCollectionsHandler,
] as const;

export { GetCollectionHandler, ListCollectionsHandler };
