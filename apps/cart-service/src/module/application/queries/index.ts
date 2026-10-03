// application/queries/index.ts — All queries barrel export
export * from './cart/index.js';
export * from './item/index.js';
export * from './totals/index.js';
export * from './saved/index.js';
export * from './abandoned/index.js';
export * from './analytics/index.js';

import { CART_QUERY_HANDLERS } from './cart/index.js';
import { ITEM_QUERY_HANDLERS } from './item/index.js';
import { TOTALS_QUERY_HANDLERS } from './totals/index.js';
import { SAVED_QUERY_HANDLERS } from './saved/index.js';
import { ABANDONED_QUERY_HANDLERS } from './abandoned/index.js';
import { ANALYTICS_QUERY_HANDLERS } from './analytics/index.js';

export const ALL_QUERY_HANDLERS = [
  ...CART_QUERY_HANDLERS,
  ...ITEM_QUERY_HANDLERS,
  ...TOTALS_QUERY_HANDLERS,
  ...SAVED_QUERY_HANDLERS,
  ...ABANDONED_QUERY_HANDLERS,
  ...ANALYTICS_QUERY_HANDLERS,
] as const;
