/**
 * Brand Query Handlers Barrel
 * @module product-service/modules/brand/queries
 */
import { GetBrandHandler } from '../../../application/queries/brand/get-brand.handler.js';
import { ListBrandsHandler } from '../../../application/queries/brand/list-brands.handler.js';

export const BRAND_QUERY_HANDLERS = [
  GetBrandHandler,
  ListBrandsHandler,
] as const;

export { GetBrandHandler, ListBrandsHandler };
