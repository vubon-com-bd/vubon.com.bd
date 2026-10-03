// application/queries/variant/index.ts
export * from './list-variants-by-product.query.js';
export * from './list-variants-by-product.handler.js';

import { ListVariantsByProductHandler } from './list-variants-by-product.handler.js';

export const VARIANT_QUERY_HANDLERS = [ListVariantsByProductHandler] as const;
