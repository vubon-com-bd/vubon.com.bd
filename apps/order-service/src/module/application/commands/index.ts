// application/commands/index.ts — Commands barrel + ALL_COMMAND_HANDLERS

export * from './order/index.js';
export * from './order-item/index.js';
export * from './checkout/index.js';
export * from './delivery/index.js';
export * from './cancel/index.js';
export * from './return/index.js';
export * from './fulfillment/index.js';
export * from './tracking/index.js';

import { ORDER_COMMAND_HANDLERS } from './order/index.js';
import { ORDER_ITEM_COMMAND_HANDLERS } from './order-item/index.js';
import { CHECKOUT_COMMAND_HANDLERS } from './checkout/index.js';
import { DELIVERY_COMMAND_HANDLERS } from './delivery/index.js';
import { CANCEL_COMMAND_HANDLERS } from './cancel/index.js';
import { RETURN_COMMAND_HANDLERS } from './return/index.js';
import { FULFILLMENT_COMMAND_HANDLERS } from './fulfillment/index.js';
import { TRACKING_COMMAND_HANDLERS } from './tracking/index.js';

export const ALL_COMMAND_HANDLERS = [
  ...ORDER_COMMAND_HANDLERS,
  ...ORDER_ITEM_COMMAND_HANDLERS,
  ...CHECKOUT_COMMAND_HANDLERS,
  ...DELIVERY_COMMAND_HANDLERS,
  ...CANCEL_COMMAND_HANDLERS,
  ...RETURN_COMMAND_HANDLERS,
  ...FULFILLMENT_COMMAND_HANDLERS,
  ...TRACKING_COMMAND_HANDLERS,
] as const;
