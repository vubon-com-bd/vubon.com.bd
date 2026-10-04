// application/queries/collection/index.ts
export * from './get-collection.query.js';
export * from './get-collection.handler.js';
export * from './list-featured-collections.query.js';
export * from './list-featured-collections.handler.js';
export * from './list-active-collections.query.js';
export * from './list-active-collections.handler.js';

import { GetCollectionHandler } from './get-collection.handler.js';
import { ListFeaturedCollectionsHandler } from './list-featured-collections.handler.js';
import { ListActiveCollectionsHandler } from './list-active-collections.handler.js';

export const COLLECTION_QUERY_HANDLERS = [
  GetCollectionHandler,
  ListFeaturedCollectionsHandler,
  ListActiveCollectionsHandler,
] as const;
