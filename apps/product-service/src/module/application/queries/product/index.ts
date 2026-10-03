// application/queries/product/index.ts
export * from './get-product.query.js';
export * from './get-product.handler.js';
export * from './get-product-by-slug.query.js';
export * from './get-product-by-slug.handler.js';
export * from './get-product-detail.query.js';
export * from './get-product-detail.handler.js';
export * from './list-products.query.js';
export * from './list-products.handler.js';
export * from './search-products.query.js';
export * from './search-products.handler.js';

import { GetProductHandler } from './get-product.handler.js';
import { GetProductBySlugHandler } from './get-product-by-slug.handler.js';
import { GetProductDetailHandler } from './get-product-detail.handler.js';
import { ListProductsHandler } from './list-products.handler.js';
import { SearchProductsHandler } from './search-products.handler.js';

export const PRODUCT_QUERY_HANDLERS = [
  GetProductHandler,
  GetProductBySlugHandler,
  GetProductDetailHandler,
  ListProductsHandler,
  SearchProductsHandler,
] as const;
