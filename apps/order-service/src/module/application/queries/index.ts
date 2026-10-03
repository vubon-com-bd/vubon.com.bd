// application/queries/index.ts — Queries barrel + ALL_QUERY_HANDLERS

export * from './order/index.js';
export * from './order-item/index.js';
export * from './checkout/index.js';
export * from './delivery/index.js';
export * from './cancel/index.js';
export * from './return/index.js';
export * from './fulfillment/index.js';
export * from './tracking/index.js';

import { ORDER_QUERY_HANDLERS } from './order/index.js';
import { ORDER_ITEM_QUERY_HANDLERS } from './order-item/index.js';
import { CHECKOUT_QUERY_HANDLERS } from './checkout/index.js';
import { DELIVERY_QUERY_HANDLERS } from './delivery/index.js';
import { CANCEL_QUERY_HANDLERS } from './cancel/index.js';
import { RETURN_QUERY_HANDLERS } from './return/index.js';
import { FULFILLMENT_QUERY_HANDLERS } from './fulfillment/index.js';
import { TRACKING_QUERY_HANDLERS } from './tracking/index.js';

export const ALL_QUERY_HANDLERS = [
  ...ORDER_QUERY_HANDLERS,
  ...ORDER_ITEM_QUERY_HANDLERS,
  ...CHECKOUT_QUERY_HANDLERS,
  ...DELIVERY_QUERY_HANDLERS,
  ...CANCEL_QUERY_HANDLERS,
  ...RETURN_QUERY_HANDLERS,
  ...FULFILLMENT_QUERY_HANDLERS,
  ...TRACKING_QUERY_HANDLERS,
] as const;
