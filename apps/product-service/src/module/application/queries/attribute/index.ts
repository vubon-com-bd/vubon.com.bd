// application/queries/attribute/index.ts
export * from './list-attributes-by-product.query.js';
export * from './list-attributes-by-product.handler.js';

import { ListAttributesByProductHandler } from './list-attributes-by-product.handler.js';

export const ATTRIBUTE_QUERY_HANDLERS = [ListAttributesByProductHandler] as const;
