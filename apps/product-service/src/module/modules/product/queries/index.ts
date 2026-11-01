/**
 * Product Query Handlers Barrel
 * @module product-service/modules/product/queries
 */
import { GetProductHandler } from '../../../application/queries/product/get-product.handler.js';
import { GetProductBySlugHandler } from '../../../application/queries/product/get-product-by-slug.handler.js';
import { ListProductsHandler } from '../../../application/queries/product/list-products.handler.js';
import { SearchProductsHandler } from '../../../application/queries/product/search-products.handler.js';
import { GetRelatedProductsHandler } from '../../../application/queries/product/get-related-products.handler.js';
import { GetFeaturedProductsHandler } from '../../../application/queries/product/get-featured-products.handler.js';

export const PRODUCT_QUERY_HANDLERS = [
  GetProductHandler,
  GetProductBySlugHandler,
  ListProductsHandler,
  SearchProductsHandler,
  GetRelatedProductsHandler,
  GetFeaturedProductsHandler,
] as const;

export {
  GetProductHandler,
  GetProductBySlugHandler,
  ListProductsHandler,
  SearchProductsHandler,
  GetRelatedProductsHandler,
  GetFeaturedProductsHandler,
};
