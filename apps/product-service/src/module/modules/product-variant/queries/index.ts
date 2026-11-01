/**
 * ProductVariant Query Handlers Barrel
 * @module product-service/modules/product-variant/queries
 */
import { GetVariantHandler } from '../../../application/queries/variant/get-variant.handler.js';
import { ListVariantsHandler } from '../../../application/queries/variant/list-variants.handler.js';

export const VARIANT_QUERY_HANDLERS = [
  GetVariantHandler,
  ListVariantsHandler,
] as const;

export { GetVariantHandler, ListVariantsHandler };
