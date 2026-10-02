// application/queries/index.ts — All queries barrel export
export * from './product/index.js';
export * from './variant/index.js';
export * from './attribute/index.js';
export * from './inventory/index.js';
export * from './pricing/index.js';
export * from './collection/index.js';
export * from './review/index.js';
export * from './brand/index.js';
export * from './category/index.js';
export * from './media/index.js';

import { PRODUCT_QUERY_HANDLERS } from './product/index.js';
import { VARIANT_QUERY_HANDLERS } from './variant/index.js';
import { ATTRIBUTE_QUERY_HANDLERS } from './attribute/index.js';
import { INVENTORY_QUERY_HANDLERS } from './inventory/index.js';
import { PRICING_QUERY_HANDLERS } from './pricing/index.js';
import { COLLECTION_QUERY_HANDLERS } from './collection/index.js';
import { REVIEW_QUERY_HANDLERS } from './review/index.js';
import { BRAND_QUERY_HANDLERS } from './brand/index.js';
import { CATEGORY_QUERY_HANDLERS } from './category/index.js';
import { MEDIA_QUERY_HANDLERS } from './media/index.js';

export const ALL_QUERY_HANDLERS = [
  ...PRODUCT_QUERY_HANDLERS,
  ...VARIANT_QUERY_HANDLERS,
  ...ATTRIBUTE_QUERY_HANDLERS,
  ...INVENTORY_QUERY_HANDLERS,
  ...PRICING_QUERY_HANDLERS,
  ...COLLECTION_QUERY_HANDLERS,
  ...REVIEW_QUERY_HANDLERS,
  ...BRAND_QUERY_HANDLERS,
  ...CATEGORY_QUERY_HANDLERS,
  ...MEDIA_QUERY_HANDLERS,
] as const;
