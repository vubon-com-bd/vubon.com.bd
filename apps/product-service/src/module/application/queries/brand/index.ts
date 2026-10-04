// application/queries/brand/index.ts
export * from './get-brand.query.js';
export * from './get-brand.handler.js';
export * from './get-brand-by-slug.query.js';
export * from './get-brand-by-slug.handler.js';
export * from './list-featured-brands.query.js';
export * from './list-featured-brands.handler.js';

import { GetBrandHandler } from './get-brand.handler.js';
import { GetBrandBySlugHandler } from './get-brand-by-slug.handler.js';
import { ListFeaturedBrandsHandler } from './list-featured-brands.handler.js';

export const BRAND_QUERY_HANDLERS = [
  GetBrandHandler,
  GetBrandBySlugHandler,
  ListFeaturedBrandsHandler,
] as const;
