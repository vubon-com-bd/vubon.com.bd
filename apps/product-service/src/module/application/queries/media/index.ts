// application/queries/media/index.ts
export * from './list-media-by-product.query.js';
export * from './list-media-by-product.handler.js';

import { ListMediaByProductHandler } from './list-media-by-product.handler.js';

export const MEDIA_QUERY_HANDLERS = [ListMediaByProductHandler] as const;
