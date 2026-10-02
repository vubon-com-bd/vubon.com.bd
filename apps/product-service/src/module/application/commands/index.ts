// application/commands/index.ts — All commands barrel export
export * from './product/index.js';
export * from './variant/index.js';
export * from './attribute/index.js';
export * from './inventory/index.js';
export * from './pricing/index.js';
export * from './collection/index.js';
export * from './review/index.js';
export * from './brand/index.js';
export * from './category/index.js';

import { PRODUCT_COMMAND_HANDLERS } from './product/index.js';
import { VARIANT_COMMAND_HANDLERS } from './variant/index.js';
import { ATTRIBUTE_COMMAND_HANDLERS } from './attribute/index.js';
import { INVENTORY_COMMAND_HANDLERS } from './inventory/index.js';
import { PRICING_COMMAND_HANDLERS } from './pricing/index.js';
import { COLLECTION_COMMAND_HANDLERS } from './collection/index.js';
import { REVIEW_COMMAND_HANDLERS } from './review/index.js';
import { BRAND_COMMAND_HANDLERS } from './brand/index.js';
import { CATEGORY_COMMAND_HANDLERS } from './category/index.js';

export const ALL_COMMAND_HANDLERS = [
  ...PRODUCT_COMMAND_HANDLERS,
  ...VARIANT_COMMAND_HANDLERS,
  ...ATTRIBUTE_COMMAND_HANDLERS,
  ...INVENTORY_COMMAND_HANDLERS,
  ...PRICING_COMMAND_HANDLERS,
  ...COLLECTION_COMMAND_HANDLERS,
  ...REVIEW_COMMAND_HANDLERS,
  ...BRAND_COMMAND_HANDLERS,
  ...CATEGORY_COMMAND_HANDLERS,
] as const;
